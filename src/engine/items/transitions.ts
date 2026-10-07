import type { CSSProperties } from "react";
import { easingFns } from "../animation/easing";
import type { TransitionId } from "../types";

export const TRANSITIONS: { id: TransitionId; label: string }[] = [
  { id: "cut", label: "Cut" },
  { id: "fade", label: "Fade (through black)" },
  { id: "crossDissolve", label: "Cross Dissolve" },
  { id: "push", label: "Push" },
  { id: "slide", label: "Slide" },
  { id: "zoom", label: "Zoom" },
  { id: "blur", label: "Blur" },
  { id: "wipe", label: "Wipe" },
  { id: "mask", label: "Mask (circle)" },
];

/** Style for the INCOMING clip, p = 0..1 through the transition. */
export const incomingStyle = (id: TransitionId, raw: number): CSSProperties => {
  const p = easingFns.easeInOut(Math.min(1, Math.max(0, raw)));
  switch (id) {
    case "cut":
      return {};
    case "fade":
      return { opacity: Math.max(0, p * 2 - 1) };
    case "crossDissolve":
      return { opacity: p };
    case "push":
    case "slide":
      return { translate: `${(1 - p) * -100}% 0` };
    case "zoom":
      return { opacity: p, scale: String(1.25 - 0.25 * p) };
    case "blur":
      return { opacity: p, filter: `blur(${(1 - p) * 30}px)` };
    case "wipe":
      return { clipPath: `inset(0 0 0 ${((1 - p) * 100).toFixed(2)}%)` };
    case "mask":
      return { clipPath: `circle(${(p * 75).toFixed(2)}% at 50% 50%)` };
  }
};

/** Style for the OUTGOING clip during the transition tail. */
export const outgoingStyle = (id: TransitionId, raw: number): CSSProperties => {
  const p = easingFns.easeInOut(Math.min(1, Math.max(0, raw)));
  switch (id) {
    case "fade":
      return { opacity: Math.max(0, 1 - p * 2) };
    case "push":
      return { translate: `${p * 100}% 0` };
    case "blur":
      return { filter: `blur(${p * 30}px)` };
    default:
      return {};
  }
};
