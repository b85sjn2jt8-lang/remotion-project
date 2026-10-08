import type { Project, VideoItem } from "../../../src/engine/types";

type Peaks = { peaksPerSecond: number; peaks: number[] };

/**
 * Finds silent stretches inside a clip from the cached waveform peaks.
 * Threshold adapts to the clip: a bit above the noise floor, well below speech level.
 * Returns TIMELINE ranges [a, b) to remove (padding keeps word edges natural).
 */
export const findClipSilences = (
  clip: VideoItem,
  data: Peaks,
  fps: number,
  opts: { minSilenceSec?: number; padSec?: number } = {},
): [number, number][] => {
  const minSilence = opts.minSilenceSec ?? 0.35;
  const pad = opts.padSec ?? 0.08;
  const pps = data.peaksPerSecond;
  const start = Math.floor((clip.trimBefore / fps) * pps);
  const end = Math.min(
    data.peaks.length,
    Math.ceil(((clip.trimBefore + clip.durationInFrames) / fps) * pps),
  );
  const slice = data.peaks.slice(start, end);
  if (slice.length < pps) return [];
  const sorted = [...slice].sort((a, b) => a - b);
  const floor = sorted[Math.floor(sorted.length * 0.1)] ?? 0;
  const speech = sorted[Math.floor(sorted.length * 0.9)] ?? 1;
  const threshold = floor + (speech - floor) * 0.12;
  const ranges: [number, number][] = [];
  let runStart = -1;
  for (let i = 0; i <= slice.length; i++) {
    const quiet = i < slice.length && slice[i] <= threshold;
    if (quiet && runStart < 0) runStart = i;
    if (!quiet && runStart >= 0) {
      const lenSec = (i - runStart) / pps;
      if (lenSec >= minSilence) {
        const atStart = runStart === 0;
        const atEnd = i === slice.length;
        const a = (runStart / pps + (atStart ? 0 : pad)) * fps;
        const b = (i / pps - (atEnd ? 0 : pad)) * fps;
        if (b - a >= 3)
          ranges.push([Math.round(clip.from + a), Math.round(clip.from + b)]);
      }
      runStart = -1;
    }
  }
  return ranges.filter(([a, b]) => b > a);
};

export const loadPeaks = async (src: string): Promise<Peaks | null> => {
  const r = await fetch(`/api/waveform?src=${encodeURIComponent(src)}`);
  return r.ok ? r.json() : null;
};

/** All silent ranges of the given video clips, as timeline ranges. */
export const silencesForClips = async (project: Project, ids: string[]) => {
  const clips = project.items.filter(
    (i): i is VideoItem => i.type === "video" && ids.includes(i.id),
  );
  const out: [number, number][] = [];
  for (const c of clips) {
    const data = await loadPeaks(c.src);
    if (data) out.push(...findClipSilences(c, data, project.fps));
  }
  return out;
};
