import type {
  AnimatableProp,
  EasingName,
  Item,
  Keyframe,
  Transform,
} from "../../../src/engine/types";

export const ANIMATABLE: {
  prop: AnimatableProp;
  label: string;
  step: number;
  display?: number;
  suffix?: string;
}[] = [
  { prop: "x", label: "Position X", step: 1, suffix: "px" },
  { prop: "y", label: "Position Y", step: 1, suffix: "px" },
  { prop: "scale", label: "Scale", step: 0.01, display: 100, suffix: "%" },
  { prop: "rotation", label: "Rotation", step: 0.5, suffix: "°" },
  { prop: "opacity", label: "Opacity", step: 0.01, display: 100, suffix: "%" },
  { prop: "blur", label: "Blur", step: 0.5, suffix: "px" },
  { prop: "radius", label: "Radius", step: 1, suffix: "px" },
];

export const hasTransform = (i: Item): i is Item & { transform: Transform } =>
  "transform" in i;

export const baseValue = (item: Item, prop: AnimatableProp): number => {
  if (prop === "radius")
    return "radius" in item ? (item as { radius: number }).radius : 0;
  return hasTransform(item) ? item.transform[prop] : 0;
};

const setBase = (item: Item, prop: AnimatableProp, v: number) => {
  if (prop === "radius") {
    if ("radius" in item) (item as { radius: number }).radius = v;
    return;
  }
  if (hasTransform(item)) item.transform[prop] = v;
};

/** Current value of a prop at a timeline frame (keyframes aware). */
export const valueAt = (
  item: Item,
  prop: AnimatableProp,
  localFrame: number,
): number => {
  const kfs = item.keyframes?.[prop];
  if (!kfs?.length) return baseValue(item, prop);
  const s = [...kfs].sort((a, b) => a.frame - b.frame);
  if (localFrame <= s[0].frame) return s[0].value;
  if (localFrame >= s[s.length - 1].frame) return s[s.length - 1].value;
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i];
    const b = s[i + 1];
    if (localFrame >= a.frame && localFrame <= b.frame) {
      const t = (localFrame - a.frame) / Math.max(1, b.frame - a.frame);
      return a.value + (b.value - a.value) * t;
    }
  }
  return baseValue(item, prop);
};

/**
 * Sets a property from the inspector or the canvas. If the property is keyframed, the keyframe at
 * the current frame is created/updated; otherwise the static value changes.
 */
export const setAnimatable = (
  item: Item,
  prop: AnimatableProp,
  value: number,
  localFrame: number,
) => {
  const kfs = item.keyframes?.[prop];
  if (kfs && kfs.length) {
    const f = Math.round(localFrame);
    const existing = kfs.find((k) => k.frame === f);
    if (existing) existing.value = value;
    else kfs.push({ frame: f, value, easing: "easeInOut" });
    kfs.sort((a, b) => a.frame - b.frame);
    return;
  }
  setBase(item, prop, value);
};

export const toggleKeyframe = (
  item: Item,
  prop: AnimatableProp,
  localFrame: number,
) => {
  const f = Math.round(localFrame);
  item.keyframes = item.keyframes ?? {};
  const kfs = item.keyframes[prop] ?? [];
  const idx = kfs.findIndex((k) => k.frame === f);
  if (idx >= 0) {
    kfs.splice(idx, 1);
  } else {
    kfs.push({ frame: f, value: valueAt(item, prop, f), easing: "easeInOut" });
    kfs.sort((a, b) => a.frame - b.frame);
  }
  item.keyframes[prop] = kfs;
  if (!kfs.length) delete item.keyframes[prop];
};

export const keyframeState = (
  item: Item,
  prop: AnimatableProp,
  localFrame: number,
): "none" | "has" | "on" => {
  const kfs = item.keyframes?.[prop];
  if (!kfs?.length) return "none";
  return kfs.some((k) => k.frame === Math.round(localFrame)) ? "on" : "has";
};

export const allKeyframeFrames = (item: Item): number[] => {
  const set = new Set<number>();
  for (const k of Object.values(item.keyframes ?? {}))
    for (const kf of k ?? []) set.add(kf.frame);
  return [...set].sort((a, b) => a - b);
};

export const setKeyframeEasing = (
  item: Item,
  frame: number,
  easing: EasingName,
) => {
  for (const k of Object.values(item.keyframes ?? {}) as Keyframe[][]) {
    for (const kf of k ?? []) if (kf.frame === frame) kf.easing = easing;
  }
};

export const moveKeyframes = (
  item: Item,
  fromFrame: number,
  toFrame: number,
) => {
  for (const k of Object.values(item.keyframes ?? {}) as Keyframe[][]) {
    for (const kf of k ?? []) if (kf.frame === fromFrame) kf.frame = toFrame;
  }
};
