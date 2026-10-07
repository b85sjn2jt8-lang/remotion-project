import { createCaptionItem, uid } from "../../../src/engine/factory";
import type {
  CaptionItem,
  Project,
  VideoItem,
} from "../../../src/engine/types";
import { trackFor } from "../project/actions";

type SrcWord = { text: string; startMs: number; endMs: number };

const ENDS_PHRASE = /[.!?؟،,:;]$/;

/**
 * Turns word-level captions (source-time) into caption clips on the timeline for every clip of
 * the given source, following the cut: words outside a clip's trimmed range are skipped.
 * Groups 2–4 words, breaking on punctuation and pauses.
 */
export const captionsFromWords = (
  project: Project,
  src: string,
  words: SrcWord[],
): CaptionItem[] => {
  const fps = project.fps;
  const clips = project.items.filter(
    (i): i is VideoItem => i.type === "video" && i.src === src,
  );
  const trackId = trackFor(project, "captions");
  const out: CaptionItem[] = [];
  for (const clip of clips) {
    const inClip = words
      .map((w) => ({
        ...w,
        text: w.text.trim(),
        s: (w.startMs / 1000) * fps - clip.trimBefore,
        e: (w.endMs / 1000) * fps - clip.trimBefore,
      }))
      .filter((w) => w.text && w.s >= 0 && w.s < clip.durationInFrames);
    let group: typeof inClip = [];
    const flush = () => {
      if (!group.length) return;
      const from = clip.from + Math.floor(group[0].s);
      const endF = Math.min(
        clip.from + clip.durationInFrames,
        clip.from + Math.ceil(group[group.length - 1].e) + 6,
      );
      out.push(
        createCaptionItem(project, {
          trackId,
          from,
          durationInFrames: Math.max(1, endF - from),
          words: group.map((w) => ({
            id: uid("w"),
            text: w.text,
            start: +(clip.from + w.s - from).toFixed(2),
            end: +(Math.min(clip.from + w.e, endF) - from).toFixed(2),
            ...(/\d/.test(w.text) ? { emphasis: true } : {}),
          })),
        }),
      );
      group = [];
    };
    for (let i = 0; i < inClip.length; i++) {
      const w = inClip[i];
      group.push(w);
      const next = inClip[i + 1];
      const pause = next ? next.s - w.e > fps * 0.3 : true;
      if (
        group.length >= 4 ||
        ENDS_PHRASE.test(w.text) ||
        pause ||
        (group.length >= 3 && w.text.length > 6)
      )
        flush();
    }
    flush();
  }
  // Keep captions from overlapping: each ends where the next starts.
  out.sort((a, b) => a.from - b.from);
  for (let i = 0; i < out.length - 1; i++) {
    const maxDur = out[i + 1].from - out[i].from;
    if (out[i].durationInFrames > maxDur)
      out[i].durationInFrames = Math.max(1, maxDur);
  }
  return out;
};
