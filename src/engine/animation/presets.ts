import { spring } from "remotion";
import type {
  AnimationParams,
  AnimationSet,
  EmphasisAnimationId,
  InAnimationId,
  OutAnimationId,
} from "../types";
import { clamp01, easingFns, mix } from "./easing";

/**
 * Animation library. Every animation is a pure function of (frame, params) that returns a partial
 * visual state. States are combined (in × emphasis × out) by `combine()`.
 */
export type AnimState = {
  opacity: number;
  tx: number;
  ty: number;
  scale: number;
  rotate: number;
  blur: number;
  /** 0..1 clip reveal (mask / wipe). 1 = fully visible. */
  reveal: number;
  revealDirection: AnimationParams["direction"];
  /** Extra letter spacing in em (tracking reveal). */
  tracking: number;
  /** 0..1 portion of characters shown (typewriter). */
  chars: number;
  /** 0..1 flash of highlight color. */
  flash: number;
  /** 0..1 underline / highlight sweep. */
  underline: number;
  highlight: number;
};

export const identityState = (): AnimState => ({
  opacity: 1,
  tx: 0,
  ty: 0,
  scale: 1,
  rotate: 0,
  blur: 0,
  reveal: 1,
  revealDirection: "right",
  tracking: 0,
  chars: 1,
  flash: 0,
  underline: 0,
  highlight: 0,
});

export const defaultParams = (
  overrides: Partial<AnimationParams> = {},
): AnimationParams => ({
  duration: 8,
  delay: 0,
  stiffness: 180,
  damping: 14,
  intensity: 1,
  direction: "up",
  ...overrides,
});

export const defaultAnimationSet = (
  overrides: Partial<AnimationSet> = {},
): AnimationSet => ({
  in: "fade",
  inParams: defaultParams({ duration: 6 }),
  emphasis: "none",
  emphasisParams: defaultParams({ duration: 8 }),
  out: "none",
  outParams: defaultParams({ duration: 5 }),
  ...overrides,
});

const easeOut = easingFns.easeOut;

const springP = (frame: number, fps: number, p: AnimationParams) =>
  spring({
    frame,
    fps,
    config: { stiffness: p.stiffness, damping: p.damping },
    durationInFrames: Math.max(1, p.duration * 2),
  });

const dirVec = (d: AnimationParams["direction"]): [number, number] => {
  switch (d) {
    case "up":
      return [0, 1];
    case "down":
      return [0, -1];
    case "left":
      return [1, 0];
    case "right":
      return [-1, 0];
  }
};

export const IN_ANIMATIONS: { id: InAnimationId; label: string }[] = [
  { id: "none", label: "None" },
  { id: "fade", label: "Fade" },
  { id: "pop", label: "Pop" },
  { id: "bounce", label: "Bounce" },
  { id: "scale", label: "Scale" },
  { id: "slideUp", label: "Slide Up" },
  { id: "slideDown", label: "Slide Down" },
  { id: "slideLeft", label: "Slide Left" },
  { id: "slideRight", label: "Slide Right" },
  { id: "blurIn", label: "Blur In" },
  { id: "maskReveal", label: "Mask Reveal" },
  { id: "spring", label: "Spring" },
  { id: "overshoot", label: "Overshoot" },
  { id: "elastic", label: "Elastic" },
  { id: "rotate", label: "Rotate" },
  { id: "trackingReveal", label: "Tracking Reveal" },
  { id: "wipe", label: "Wipe" },
  { id: "typewriter", label: "Typewriter" },
  { id: "wordReveal", label: "Word Reveal" },
];

export const OUT_ANIMATIONS: { id: OutAnimationId; label: string }[] = [
  { id: "none", label: "None (cut)" },
  { id: "fadeOut", label: "Fade Out" },
  { id: "scaleOut", label: "Scale Out" },
  { id: "slideOut", label: "Slide Out" },
  { id: "blurOut", label: "Blur Out" },
  { id: "quickDisappear", label: "Quick Disappear" },
];

export const EMPHASIS_ANIMATIONS: { id: EmphasisAnimationId; label: string }[] =
  [
    { id: "none", label: "None" },
    { id: "punch", label: "Punch" },
    { id: "shake", label: "Shake" },
    { id: "microShake", label: "Micro Shake" },
    { id: "bounce", label: "Bounce" },
    { id: "scalePulse", label: "Scale Pulse" },
    { id: "colorFlash", label: "Color Flash" },
    { id: "highlight", label: "Highlight" },
    { id: "underlineReveal", label: "Underline Reveal" },
    { id: "floating", label: "Floating" },
    { id: "pulse", label: "Pulse" },
  ];

/** `f` = frames since the element started (before delay is applied). */
export const evalIn = (
  id: InAnimationId,
  p: AnimationParams,
  f: number,
  fps: number,
): Partial<AnimState> => {
  const frame = f - p.delay;
  const d = Math.max(1, p.duration);
  const k = p.intensity;
  if (id === "none") {
    return {};
  }
  if (frame < 0) {
    return { opacity: 0 };
  }
  const t = clamp01(frame / d);
  const e = easeOut(t);
  switch (id) {
    case "fade":
      return { opacity: e };
    case "pop": {
      const s = springP(frame, fps, { ...p, damping: Math.min(p.damping, 12) });
      return { opacity: clamp01(t * 3), scale: mix(1 - 0.45 * k, 1, s) };
    }
    case "bounce": {
      const s = springP(frame, fps, { ...p, damping: 8, stiffness: 220 });
      return { opacity: clamp01(t * 3), ty: (1 - s) * 60 * k };
    }
    case "scale":
      return { opacity: e, scale: mix(1 - 0.25 * k, 1, e) };
    case "slideUp":
      return { opacity: e, ty: (1 - e) * 70 * k };
    case "slideDown":
      return { opacity: e, ty: -(1 - e) * 70 * k };
    case "slideLeft":
      return { opacity: e, tx: (1 - e) * 90 * k };
    case "slideRight":
      return { opacity: e, tx: -(1 - e) * 90 * k };
    case "blurIn":
      return { opacity: e, blur: (1 - e) * 18 * k, scale: mix(1.06, 1, e) };
    case "maskReveal":
    case "wipe":
      return {
        reveal: easingFns.easeInOut(t),
        revealDirection: p.direction,
        ty: id === "maskReveal" ? (1 - e) * 24 * k : 0,
      };
    case "spring": {
      const s = springP(frame, fps, p);
      const [vx, vy] = dirVec(p.direction);
      return {
        opacity: clamp01(t * 2.5),
        tx: (1 - s) * 80 * k * vx,
        ty: (1 - s) * 80 * k * vy,
      };
    }
    case "overshoot": {
      const s = springP(frame, fps, { ...p, damping: 9, stiffness: 260 });
      return { opacity: clamp01(t * 3), scale: mix(0.6, 1, s) };
    }
    case "elastic": {
      const s = springP(frame, fps, { ...p, damping: 6, stiffness: 300 });
      return { opacity: clamp01(t * 3), scale: mix(0.7, 1, s) };
    }
    case "rotate":
      return {
        opacity: e,
        rotate: (1 - e) * -10 * k,
        scale: mix(0.9, 1, e),
      };
    case "trackingReveal":
      return { opacity: e, tracking: (1 - e) * 0.35 * k, blur: (1 - e) * 4 };
    case "typewriter":
      return { chars: t };
    case "wordReveal":
      return { opacity: e, ty: (1 - e) * 16 * k };
  }
};

/** `fromEnd` = frames remaining until the element ends. */
export const evalOut = (
  id: OutAnimationId,
  p: AnimationParams,
  fromEnd: number,
): Partial<AnimState> => {
  if (id === "none") {
    return {};
  }
  const d = Math.max(
    1,
    id === "quickDisappear" ? Math.min(p.duration, 3) : p.duration,
  );
  if (fromEnd > d) {
    return {};
  }
  const t = clamp01(1 - fromEnd / d); // 0 → 1 while leaving
  const e = easingFns.easeIn(t);
  const k = p.intensity;
  switch (id) {
    case "fadeOut":
      return { opacity: 1 - e };
    case "scaleOut":
      return { opacity: 1 - e, scale: mix(1, 1 - 0.3 * k, e) };
    case "slideOut": {
      const [vx, vy] = dirVec(p.direction);
      return { opacity: 1 - e, tx: -vx * 80 * k * e, ty: -vy * 80 * k * e };
    }
    case "blurOut":
      return { opacity: 1 - e, blur: e * 16 * k };
    case "quickDisappear":
      return { opacity: 1 - t, scale: mix(1, 0.9, t) };
  }
};

/** `f` = frames since the emphasis was triggered (e.g. word spoken). */
export const evalEmphasis = (
  id: EmphasisAnimationId,
  p: AnimationParams,
  f: number,
  fps: number,
): Partial<AnimState> => {
  const frame = f - p.delay;
  if (id === "none" || frame < 0) {
    return {};
  }
  const d = Math.max(1, p.duration);
  const t = clamp01(frame / d);
  const k = p.intensity;
  switch (id) {
    case "punch": {
      const s = springP(frame, fps, { ...p, damping: 10, stiffness: 300 });
      return { scale: mix(1.35 * k + (1 - k), 1, s) };
    }
    case "shake": {
      if (t >= 1) return {};
      const amp = (1 - t) * 14 * k;
      return {
        tx: Math.sin(frame * 2.6) * amp,
        rotate: Math.sin(frame * 2.1) * amp * 0.15,
      };
    }
    case "microShake": {
      if (t >= 1) return {};
      const amp = (1 - t) * 5 * k;
      return {
        tx: Math.sin(frame * 3.1) * amp,
        ty: Math.cos(frame * 2.7) * amp * 0.6,
      };
    }
    case "bounce": {
      if (t >= 1) return {};
      return { ty: -Math.abs(Math.sin(t * Math.PI * 2)) * (1 - t) * 26 * k };
    }
    case "scalePulse":
      return { scale: 1 + Math.sin(t * Math.PI) * 0.12 * k };
    case "colorFlash":
      return { flash: t >= 1 ? 0 : Math.sin(t * Math.PI) };
    case "highlight":
      return { highlight: easingFns.easeOut(t) };
    case "underlineReveal":
      return { underline: easingFns.easeOut(t) };
    case "floating":
      return { ty: Math.sin((frame / fps) * Math.PI * 0.8) * 8 * k };
    case "pulse":
      return { scale: 1 + Math.sin((frame / fps) * Math.PI * 2) * 0.03 * k };
  }
};

export const combine = (...parts: Partial<AnimState>[]): AnimState => {
  const s = identityState();
  for (const p of parts) {
    if (p.opacity !== undefined) s.opacity *= p.opacity;
    if (p.scale !== undefined) s.scale *= p.scale;
    if (p.tx !== undefined) s.tx += p.tx;
    if (p.ty !== undefined) s.ty += p.ty;
    if (p.rotate !== undefined) s.rotate += p.rotate;
    if (p.blur !== undefined) s.blur += p.blur;
    if (p.reveal !== undefined) {
      s.reveal = Math.min(s.reveal, p.reveal);
      s.revealDirection = p.revealDirection ?? s.revealDirection;
    }
    if (p.tracking !== undefined) s.tracking += p.tracking;
    if (p.chars !== undefined) s.chars = Math.min(s.chars, p.chars);
    if (p.flash !== undefined) s.flash = Math.max(s.flash, p.flash);
    if (p.underline !== undefined)
      s.underline = Math.max(s.underline, p.underline);
    if (p.highlight !== undefined)
      s.highlight = Math.max(s.highlight, p.highlight);
  }
  return s;
};

/** CSS clip-path for mask / wipe reveals. */
export const revealClip = (
  reveal: number,
  dir: AnimationParams["direction"],
): string | undefined => {
  if (reveal >= 1) {
    return undefined;
  }
  const hidden = `${((1 - reveal) * 100).toFixed(2)}%`;
  switch (dir) {
    case "up":
      return `inset(${hidden} 0 0 0)`;
    case "down":
      return `inset(0 0 ${hidden} 0)`;
    case "left":
      return `inset(0 0 0 ${hidden})`;
    case "right":
      return `inset(0 ${hidden} 0 0)`;
  }
};

/** Evaluates a full in/emphasis/out set for an element living `duration` frames. */
export const evalAnimationSet = (
  set: AnimationSet,
  frame: number,
  duration: number,
  fps: number,
  emphasisAt = 0,
): AnimState =>
  combine(
    evalIn(set.in, set.inParams, frame, fps),
    evalEmphasis(set.emphasis, set.emphasisParams, frame - emphasisAt, fps),
    evalOut(set.out, set.outParams, duration - frame),
  );
