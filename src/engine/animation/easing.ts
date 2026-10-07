import { Easing, spring } from "remotion";
import type { EasingName } from "../types";

export const easingFns: Record<
  Exclude<EasingName, "spring">,
  (t: number) => number
> = {
  linear: Easing.linear,
  easeIn: Easing.bezier(0.42, 0, 1, 1),
  easeOut: Easing.bezier(0.16, 1, 0.3, 1),
  easeInOut: Easing.bezier(0.65, 0, 0.35, 1),
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Progress 0..1 (spring may overshoot) of a segment of `length` frames. */
export const progress = (
  easing: EasingName,
  frame: number,
  length: number,
  fps: number,
  springConfig?: { stiffness: number; damping: number },
): number => {
  if (length <= 0) {
    return frame >= 0 ? 1 : 0;
  }
  if (frame <= 0) {
    return 0;
  }
  if (easing === "spring") {
    return spring({
      frame,
      fps,
      durationInFrames: length,
      config: {
        stiffness: springConfig?.stiffness ?? 170,
        damping: springConfig?.damping ?? 18,
      },
    });
  }
  if (frame >= length) {
    return 1;
  }
  return easingFns[easing](frame / length);
};

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
