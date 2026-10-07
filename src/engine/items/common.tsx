import React from "react";
import { resolveProp } from "../animation/keyframes";
import type { AnimState } from "../animation/presets";
import { revealClip } from "../animation/presets";
import type { Background, Keyframes, Shadow, Transform } from "../types";

export type ResolvedTransform = Transform & { radius?: number };

/** Static transform values overridden by keyframes (frame relative to item start). */
export const resolveTransform = (
  t: Transform,
  keyframes: Keyframes | undefined,
  frame: number,
  fps: number,
  radius?: number,
): ResolvedTransform => ({
  x: resolveProp(keyframes, "x", frame, t.x, fps),
  y: resolveProp(keyframes, "y", frame, t.y, fps),
  scale: resolveProp(keyframes, "scale", frame, t.scale, fps),
  rotation: resolveProp(keyframes, "rotation", frame, t.rotation, fps),
  opacity: resolveProp(keyframes, "opacity", frame, t.opacity, fps),
  blur: resolveProp(keyframes, "blur", frame, t.blur, fps),
  radius:
    radius === undefined
      ? undefined
      : resolveProp(keyframes, "radius", frame, radius, fps),
});

export const hexToRgba = (hex: string, alpha: number) => {
  const h = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    return hex;
  }
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};

export const shadowCss = (s: Shadow) =>
  s.enabled ? `${s.x}px ${s.y}px ${s.blur}px ${s.color}` : undefined;

export const backgroundCss = (b: Background): React.CSSProperties =>
  b.enabled
    ? {
        backgroundColor: hexToRgba(b.color, b.opacity),
        borderRadius: b.radius,
        padding: `${b.paddingY}px ${b.paddingX}px`,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }
    : {};

const ARABIC =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
export const isRtlText = (text: string) => ARABIC.test(text);

/**
 * Positions children with their CENTER at (x, y) in composition space and applies the
 * resolved transform + an animation state. `data-item-id` lets the editor find the element.
 */
export const TransformBox: React.FC<{
  itemId: string;
  t: ResolvedTransform;
  anim?: AnimState;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ itemId, t, anim, children, style }) => {
  const opacity = t.opacity * (anim?.opacity ?? 1);
  const blur = t.blur + (anim?.blur ?? 0);
  return (
    <div
      data-item-id={itemId}
      style={{
        position: "absolute",
        left: t.x,
        top: t.y,
        translate: `calc(-50% + ${anim?.tx ?? 0}px) calc(-50% + ${anim?.ty ?? 0}px)`,
        scale: String(t.scale * (anim?.scale ?? 1)),
        rotate: `${t.rotation + (anim?.rotate ?? 0)}deg`,
        opacity,
        filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
        clipPath: anim
          ? revealClip(anim.reveal, anim.revealDirection)
          : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
