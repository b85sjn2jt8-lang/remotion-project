export const formatTimecode = (frame: number, fps: number) => {
  const f = Math.max(0, Math.round(frame));
  const totalSec = Math.floor(f / fps);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  const ff = f % fps;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(ff).padStart(2, "0")}`;
};

/** Snaps `value` to the nearest candidate within `threshold`; returns the snapped value and the target. */
export const snapTo = (
  value: number,
  candidates: number[],
  threshold: number,
) => {
  let best: number | null = null;
  let dist = threshold;
  for (const c of candidates) {
    const d = Math.abs(c - value);
    if (d <= dist) {
      dist = d;
      best = c;
    }
  }
  return best === null
    ? { value, target: null }
    : { value: best, target: best };
};

/** Picks a "nice" ruler step (in frames) so labels are at least `minPx` apart. */
export const rulerStep = (pxPerFrame: number, fps: number, minPx = 70) => {
  const steps = [
    1,
    2,
    5,
    10,
    15,
    fps,
    fps * 2,
    fps * 5,
    fps * 10,
    fps * 15,
    fps * 30,
    fps * 60,
  ];
  return steps.find((s) => s * pxPerFrame >= minPx) ?? fps * 60;
};
