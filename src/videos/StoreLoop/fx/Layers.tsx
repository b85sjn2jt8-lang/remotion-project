import React from "react";
import { Img, random, staticFile, useCurrentFrame } from "remotion";
import { MODELS, type ModelId } from "../models";

// V2 depth layers: human plates, translucent foreground glass, hair strands.

/**
 * A human plate placed by its CENTER (x, y) with a given box height. Edges can be feathered
 * so a cropped plate melts into the CG environment. `zoom` scales the image inside the box
 * around (originX, originY) — use it for push-ins; `blur` simulates rack focus.
 */
export const ModelPlate: React.FC<{
  name: string;
  id: ModelId;
  x: number;
  y: number;
  height: number;
  zoom?: number;
  originX?: string;
  originY?: string;
  blur?: number;
  /** feather widths in % of the box: [left, right, top, bottom] */
  feather?: [number, number, number, number];
  filter?: string;
  flip?: boolean;
  opacity?: number;
}> = ({
  name,
  id,
  x,
  y,
  height,
  zoom = 1,
  originX = "50%",
  originY = "40%",
  blur = 0,
  feather = [0, 0, 0, 0],
  filter = "",
  flip = false,
  opacity = 1,
}) => {
  const m = MODELS[id];
  const width = height * m.aspect;
  const [fl, fr, ft, fb] = feather;
  const mask = `linear-gradient(to right, transparent 0%, black ${fl}%, black ${100 - fr}%, transparent 100%), linear-gradient(to bottom, transparent 0%, black ${ft}%, black ${100 - fb}%, transparent 100%)`;
  return (
    <div
      data-name={name}
      style={{
        position: "absolute",
        left: x - width / 2,
        top: y - height / 2,
        width,
        height,
        overflow: "hidden",
        opacity,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <Img
        src={staticFile(m.src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: flip ? `${-zoom} ${zoom}` : `${zoom}`,
          transformOrigin: `${originX} ${originY}`,
          filter: `${blur > 0.05 ? `blur(${blur}px) ` : ""}${filter}`.trim() || undefined,
        }}
      />
    </div>
  );
};

/** A translucent glass slab/shard in the foreground (depth + soft wipes). */
export const Glass: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  tint: string;
  blur?: number;
  opacity?: number;
  radius?: number;
}> = ({ x, y, w, h, rot, tint, blur = 8, opacity = 0.6, radius = 40 }) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y - h / 2,
      width: w,
      height: h,
      borderRadius: radius,
      rotate: `${rot}deg`,
      background: `linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(${tint},0.35) 35%, rgba(${tint},0.15) 70%, rgba(255,255,255,0.5) 100%)`,
      boxShadow: `inset 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(${tint},0.25)`,
      filter: `blur(${blur}px)`,
      opacity,
    }}
  />
);

/**
 * Fine dark hair strands sweeping across the lens. `progress` 0→1 moves the bundle from
 * off-left to off-right; `density` controls how much of the frame it covers.
 */
export const HairStrands: React.FC<{
  seed: string;
  progress: number;
  count: number;
  thickness?: number;
  blur?: number;
  color?: string;
  opacity?: number;
  spread?: number;
}> = ({ seed, progress, count, thickness = 6, blur = 3, color = "28,18,14", opacity = 0.9, spread = 900 }) => {
  const frame = useCurrentFrame();
  const cx = -1400 + progress * 4700;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible", filter: `blur(${blur}px)` }}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const off = (r("o") - 0.5) * spread;
        const x0 = cx + off;
        const sway = Math.sin(frame / 9 + r("p") * 6) * 40;
        const d = `M ${x0 - 300} -80 C ${x0 - 60 + sway} 300, ${x0 + 140 - sway} 700, ${x0 + 380} 1160`;
        return (
          <path
            key={i}
            d={d}
            stroke={`rgba(${color},${opacity * (0.35 + 0.65 * r("a"))})`}
            strokeWidth={thickness * (0.3 + r("t") * 1.4)}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};
