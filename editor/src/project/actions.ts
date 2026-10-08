import { uid } from "../../../src/engine/factory";
import type {
  CaptionItem,
  CaptionWord,
  Item,
  Project,
  TrackKind,
} from "../../../src/engine/types";
import { usePlayback } from "./playback";
import { commit, select, useEditor } from "./store";

/** Which track kinds accept which item types. */
export const TRACK_ACCEPTS: Record<TrackKind, Item["type"][]> = {
  video: ["video"],
  broll: ["brollVideo", "image"],
  captions: ["caption"],
  text: ["text"],
  graphics: ["component", "overlay", "image"],
  overlays: ["overlay", "image", "text"],
  sfx: ["audio"],
  music: ["audio"],
  voice: ["audio"],
};

export const trackFor = (p: Project, kind: TrackKind) =>
  p.tracks.find((t) => t.kind === kind)?.id ?? p.tracks[0].id;

export const addItem = (item: Item) => {
  commit((p) => {
    p.items.push(item);
  });
  select([item.id]);
};

export const deleteSelected = () => {
  const { selection, wordId } = useEditor.getState();
  if (wordId) {
    deleteWord(selection[0], wordId);
    return;
  }
  if (!selection.length) return;
  commit((p) => {
    p.items = p.items.filter(
      (i) => !selection.includes(i.id) || isLocked(p, i),
    );
  });
  select([]);
};

const isLocked = (p: Project, i: Item) =>
  Boolean(p.tracks.find((t) => t.id === i.trackId)?.locked);

const cloneWithIds = (i: Item): Item => {
  const c = structuredClone(i);
  c.id = uid(i.type.slice(0, 3));
  if (c.type === "caption")
    c.words = c.words.map((w) => ({ ...w, id: uid("w") }));
  return c;
};

export const duplicateSelected = () => {
  const { selection, project } = useEditor.getState();
  if (!project || !selection.length) return;
  const copies: Item[] = [];
  commit((p) => {
    for (const id of selection) {
      const it = p.items.find((i) => i.id === id);
      if (!it) continue;
      const c = cloneWithIds(it);
      c.from = it.from + it.durationInFrames;
      p.items.push(c);
      copies.push(c);
    }
  });
  select(copies.map((c) => c.id));
};

export const copySelected = () => {
  const { selection, project } = useEditor.getState();
  if (!project) return;
  useEditor.setState({
    clipboard: project.items
      .filter((i) => selection.includes(i.id))
      .map((i) => structuredClone(i)),
  });
};

export const paste = () => {
  const { clipboard } = useEditor.getState();
  if (!clipboard.length) return;
  const at = usePlayback.getState().frame;
  const minFrom = Math.min(...clipboard.map((c) => c.from));
  const pasted = clipboard.map((c) => {
    const n = cloneWithIds(c);
    n.from = at + (c.from - minFrom);
    return n;
  });
  commit((p) => {
    p.items.push(
      ...pasted.filter((n) => p.tracks.some((t) => t.id === n.trackId)),
    );
  });
  select(pasted.map((n) => n.id));
};

/** Splits selected items (or all unlocked items under the playhead) at the playhead. */
/**
 * Splits `it` (already inside the draft `p`) at timeline `frame`; pushes and returns the right half.
 * Media keeps its place in the source (trimBefore), caption words and keyframes follow the cut.
 */
export const splitItemInDraft = (
  p: Project,
  it: Item,
  frame: number,
): Item | null => {
  const cut = Math.round(frame - it.from);
  if (cut <= 0 || cut >= it.durationInFrames) return null;
  const right = cloneWithIds(it);
  right.from = it.from + cut;
  right.durationInFrames = it.durationInFrames - cut;
  it.durationInFrames = cut;
  if ("trimBefore" in right)
    (right as { trimBefore: number }).trimBefore += cut;
  if (right.keyframes) {
    for (const k of Object.values(right.keyframes)) {
      if (k) for (const kf of k) kf.frame -= cut;
    }
  }
  if (it.type === "caption" && right.type === "caption") {
    it.words = it.words
      .filter((w) => w.start < cut)
      .map((w) => ({ ...w, end: Math.min(w.end, cut) }));
    right.words = right.words
      .filter((w) => w.start >= cut)
      .map((w) => ({ ...w, start: w.start - cut, end: w.end - cut }));
    it.name = captionName(it);
    right.name = captionName(right);
  }
  if (right.type === "video") right.transitionIn = undefined;
  // A split is one continuous element: only the first half animates in, only the second out.
  if ("animation" in it && "animation" in right) {
    it.animation.out = "none";
    right.animation.in = "none";
  }
  p.items.push(right);
  return right;
};

const dropEmptyCaptions = (p: Project) => {
  p.items = p.items.filter(
    (i) => !(i.type === "caption" && i.words.length === 0),
  );
};

/** Splits selected items (or all unlocked items under the playhead) at `frame` (default: playhead). */
export const splitAt = (frame: number, ids?: string[]) => {
  const { selection, project } = useEditor.getState();
  if (!project) return;
  const only = ids ?? (selection.length ? selection : null);
  const targets = project.items.filter(
    (i) =>
      (only ? only.includes(i.id) : true) &&
      frame > i.from &&
      frame < i.from + i.durationInFrames &&
      !isLocked(project, i),
  );
  if (!targets.length) return;
  const newIds: string[] = [];
  commit((p) => {
    for (const t of targets) {
      const it = p.items.find((i) => i.id === t.id)!;
      const right = splitItemInDraft(p, it, frame);
      if (right) newIds.push(right.id);
    }
    dropEmptyCaptions(p);
  });
  select(newIds);
};

export const splitAtPlayhead = () => splitAt(usePlayback.getState().frame);

/**
 * Removes the timeline range [a, b) and closes the gap: everything after moves left so picture,
 * captions, text and SFX stay in sync. Items crossing the edges are split; music is shortened
 * instead (no audible jump). `trackIds` limits the ripple to some tracks (default: all).
 */
export const rippleRangeInDraft = (
  p: Project,
  a: number,
  b: number,
  trackIds?: string[],
) => {
  const d = Math.round(b - a);
  if (d <= 0) return;
  const inScope = (i: Item) =>
    (!trackIds || trackIds.includes(i.trackId)) && !isLocked(p, i);
  const isMusic = (i: Item) => i.type === "audio" && i.role === "music";
  // Music spanning the range: shorten in place.
  for (const it of p.items.filter((i) => inScope(i) && isMusic(i))) {
    const s = it.from;
    const e = s + it.durationInFrames;
    if (s < a && e > b) it.durationInFrames -= d;
  }
  for (const it of [...p.items].filter((i) => inScope(i) && !isMusic(i))) {
    if (it.from < a && it.from + it.durationInFrames > a)
      splitItemInDraft(p, it, a);
  }
  for (const it of [...p.items].filter((i) => inScope(i) && !isMusic(i))) {
    if (it.from < b && it.from + it.durationInFrames > b)
      splitItemInDraft(p, it, b);
  }
  p.items = p.items.filter((i) => {
    if (!inScope(i)) return true;
    const e = i.from + i.durationInFrames;
    if (isMusic(i)) return !(i.from >= a && e <= b);
    return !(i.from >= a && e <= b);
  });
  for (const it of p.items) {
    if (inScope(it) && it.from >= b) it.from -= d;
  }
  dropEmptyCaptions(p);
};

/**
 * Delete + close the gap. Main video clips ripple the whole timeline (keeps sync);
 * other items only close the gap on their own track.
 */
export const rippleDeleteSelected = () => {
  const { selection, project } = useEditor.getState();
  if (!project || !selection.length) return;
  const items = project.items
    .filter((i) => selection.includes(i.id) && !isLocked(project, i))
    .sort((x, y) => y.from - x.from);
  if (!items.length) return;
  const videoTrack = project.tracks.find((t) => t.kind === "video")?.id;
  commit((p) => {
    for (const it of items) {
      const a = it.from;
      const b = it.from + it.durationInFrames;
      if (it.trackId === videoTrack) rippleRangeInDraft(p, a, b);
      else {
        p.items = p.items.filter((i) => i.id !== it.id);
        rippleRangeInDraft(p, a, b, [it.trackId]);
      }
    }
  });
  select([]);
};

/** Removes several timeline ranges (sorted, non-overlapping) in one undo step. */
export const rippleRanges = (ranges: [number, number][]) => {
  if (!ranges.length) return;
  commit((p) => {
    for (const [a, b] of [...ranges].sort((x, y) => y[0] - x[0]))
      rippleRangeInDraft(p, a, b);
  });
  select([]);
};

// ---------- captions ----------

const captionName = (c: CaptionItem) =>
  c.words
    .map((w) => w.text)
    .join(" ")
    .slice(0, 40) || "Caption";

/** Splits a caption before the given word. */
export const splitCaptionAtWord = (captionId: string, wordId: string) => {
  let newId = "";
  commit((p) => {
    const c = p.items.find((i) => i.id === captionId) as
      | CaptionItem
      | undefined;
    if (!c) return;
    const idx = c.words.findIndex((w) => w.id === wordId);
    if (idx <= 0) return;
    const cut = Math.round(c.words[idx].start);
    const right = cloneWithIds(c) as CaptionItem;
    right.words = c.words.slice(idx).map((w) => ({
      ...w,
      id: uid("w"),
      start: w.start - cut,
      end: w.end - cut,
    }));
    right.from = c.from + cut;
    right.durationInFrames = c.durationInFrames - cut;
    c.words = c.words.slice(0, idx);
    c.durationInFrames = cut;
    c.name = captionName(c);
    right.name = captionName(right);
    p.items.push(right);
    newId = right.id;
  });
  if (newId) select([newId]);
};

/** Merges a caption with the next caption on the same track. */
export const mergeCaptionWithNext = (captionId: string) => {
  commit((p) => {
    const c = p.items.find((i) => i.id === captionId) as
      | CaptionItem
      | undefined;
    if (!c) return;
    const next = p.items
      .filter(
        (i): i is CaptionItem =>
          i.type === "caption" &&
          i.trackId === c.trackId &&
          i.from >= c.from + 1 &&
          i.id !== c.id,
      )
      .sort((a, b) => a.from - b.from)[0];
    if (!next) return;
    const offset = next.from - c.from;
    c.words = [
      ...c.words,
      ...next.words.map((w) => ({
        ...w,
        start: w.start + offset,
        end: w.end + offset,
      })),
    ];
    c.durationInFrames = next.from + next.durationInFrames - c.from;
    c.name = captionName(c);
    p.items = p.items.filter((i) => i.id !== next.id);
  });
};

export const updateWord = (
  captionId: string,
  wordId: string,
  fn: (w: CaptionWord) => void,
) =>
  commit((p) => {
    const c = p.items.find((i) => i.id === captionId) as
      | CaptionItem
      | undefined;
    const w = c?.words.find((x) => x.id === wordId);
    if (w && c) {
      fn(w);
      c.name = captionName(c);
    }
  });

export const deleteWord = (captionId: string, wordId: string) => {
  commit((p) => {
    const c = p.items.find((i) => i.id === captionId) as
      | CaptionItem
      | undefined;
    if (!c) return;
    c.words = c.words.filter((w) => w.id !== wordId);
    c.name = captionName(c);
    if (!c.words.length) p.items = p.items.filter((i) => i.id !== c.id);
  });
  select([captionId]);
};

/** Replaces caption text. Keeps existing word timings where the word count matches, otherwise re-spaces. */
export const setCaptionText = (captionId: string, text: string) =>
  commit((p) => {
    const c = p.items.find((i) => i.id === captionId) as
      | CaptionItem
      | undefined;
    if (!c) return;
    const parts = text.trim().split(/\s+/).filter(Boolean);
    if (parts.length === c.words.length) {
      c.words.forEach((w, i) => (w.text = parts[i]));
    } else {
      const start = c.words[0]?.start ?? 0;
      const end = c.words[c.words.length - 1]?.end ?? c.durationInFrames;
      const step = (end - start) / Math.max(1, parts.length);
      const old = c.words;
      c.words = parts.map((t, i) => ({
        ...(old[i] ?? {}),
        id: old[i]?.id ?? uid("w"),
        text: t,
        start: +(start + i * step).toFixed(2),
        end: +(start + (i + 1) * step).toFixed(2),
      }));
    }
    c.name = captionName(c);
  });

export const reorderTrack = (trackId: string, delta: number) =>
  commit((p) => {
    const i = p.tracks.findIndex((t) => t.id === trackId);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= p.tracks.length) return;
    const [t] = p.tracks.splice(i, 1);
    p.tracks.splice(j, 0, t);
  });
