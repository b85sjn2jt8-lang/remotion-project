import type { AnimatableProp, Keyframe, Keyframes } from "../types";
import { mix, progress } from "./easing";

/**
 * Evaluates a keyframed property at a frame relative to the item start.
 * Each keyframe's easing describes how the value travels INTO that keyframe.
 */
export const evalKeyframes = (
  kfs: Keyframe[] | undefined,
  frame: number,
  fallback: number,
  fps: number,
): number => {
  if (!kfs || kfs.length === 0) {
    return fallback;
  }
  const sorted =
    kfs.length > 1 ? [...kfs].sort((a, b) => a.frame - b.frame) : kfs;
  if (frame <= sorted[0].frame) {
    return sorted[0].value;
  }
  const last = sorted[sorted.length - 1];
  if (frame >= last.frame) {
    return last.value;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const t = progress(b.easing, frame - a.frame, b.frame - a.frame, fps);
      return mix(a.value, b.value, t);
    }
  }
  return fallback;
};

export const resolveProp = (
  keyframes: Keyframes | undefined,
  prop: AnimatableProp,
  frame: number,
  fallback: number,
  fps: number,
) => evalKeyframes(keyframes?.[prop], frame, fallback, fps);

export const hasKeyframes = (keyframes: Keyframes | undefined) =>
  Boolean(keyframes && Object.values(keyframes).some((k) => k && k.length > 0));
