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
export const splitAtPlayhead = () => {
  const frame = usePlayback.getState().frame;
  const { selection, project } = useEditor.getState();
  if (!project) return;
  const targets = project.items.filter(
    (i) =>
      (selection.length ? selection.includes(i.id) : true) &&
      frame > i.from &&
      frame < i.from + i.durationInFrames &&
      !isLocked(project, i),
  );
  if (!targets.length) return;
  const newIds: string[] = [];
  commit((p) => {
    for (const t of targets) {
      const it = p.items.find((i) => i.id === t.id)!;
      const cut = frame - it.from;
      const right = cloneWithIds(it);
      right.from = frame;
      right.durationInFrames = it.durationInFrames - cut;
      it.durationInFrames = cut;
      if (
        (right.type === "video" ||
          right.type === "brollVideo" ||
          right.type === "audio") &&
        "trimBefore" in right
      ) {
        right.trimBefore += cut;
      }
      if (right.keyframes) {
        for (const k of Object.values(right.keyframes)) {
          if (k) for (const kf of k) kf.frame -= cut;
        }
      }
      if (it.type === "caption" && right.type === "caption") {
        it.words = it.words.filter((w) => w.start < cut);
        right.words = right.words
          .filter((w) => w.start >= cut)
          .map((w) => ({ ...w, start: w.start - cut, end: w.end - cut }));
        it.name = it.words
          .map((w) => w.text)
          .join(" ")
          .slice(0, 40);
        right.name = right.words
          .map((w) => w.text)
          .join(" ")
          .slice(0, 40);
      }
      if (right.type === "video") right.transitionIn = undefined;
      // A split is one continuous element: only the first half animates in, only the second out.
      if ("animation" in it && "animation" in right) {
        it.animation.out = "none";
        right.animation.in = "none";
      }
      p.items.push(right);
      newIds.push(right.id);
    }
    p.items = p.items.filter(
      (i) => !(i.type === "caption" && i.words.length === 0),
    );
  });
  select(newIds);
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
