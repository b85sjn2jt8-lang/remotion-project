import React from "react";
import { random, useCurrentFrame } from "remotion";

// Decorative, deterministic particle fields. These are background effects, not editable
// overlays, so they are generated from a seed.

export const Bokeh: React.FC<{
  seed: string;
  count: number;
  colors: string[];
  minSize: number;
  maxSize: number;
  /** px per frame drift */
  driftX?: number;
  driftY?: number;
  /** extra outward drift from frame centre per frame (fake forward camera) */
  zoom?: number;
  opacity?: number;
  blur?: number;
}> = ({ seed, count, colors, minSize, maxSize, driftX = 0, driftY = 0, zoom = 0, opacity = 0.5, blur = 6 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = minSize + r("s") * (maxSize - minSize);
        const sx = r("x") * 2200 - 140;
        const sy = r("y") * 1260 - 90;
        const grow = 1 + zoom * frame * (0.5 + r("z"));
        const x = 960 + (sx - 960) * grow + driftX * frame * (0.6 + r("v") * 0.8);
        const y = 540 + (sy - 540) * grow + driftY * frame * (0.6 + r("w") * 0.8);
        const flicker = 0.75 + 0.25 * Math.sin(frame / (14 + r("f") * 20) + r("p") * 6.28);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - (size * grow) / 2,
              top: y - (size * grow) / 2,
              width: size * grow,
              height: size * grow,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, ${colors[i % colors.length]} 45%, rgba(255,255,255,0) 72%)`,
              opacity: opacity * flicker * (0.5 + r("o") * 0.5),
              filter: `blur(${blur}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export const Dust: React.FC<{
  seed: string;
  count: number;
  color?: string;
  vy?: number;
  vx?: number;
  area?: [number, number, number, number];
  maxSize?: number;
  opacity?: number;
}> = ({ seed, count, color = "255,255,255", vy = -0.6, vx = 0.15, area = [0, 0, 1920, 1080], maxSize = 3.5, opacity = 0.7 }) => {
  const frame = useCurrentFrame();
  const [ax, ay, aw, ah] = area;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const s = 1 + r("s") * maxSize;
        const x = ax + ((r("x") * aw + vx * frame * (0.5 + r("v")) + Math.sin(frame / 30 + r("p") * 6) * 6) % aw + aw) % aw;
        const y = ay + ((r("y") * ah + vy * frame * (0.5 + r("w"))) % ah + ah) % ah;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: "50%",
              background: `rgba(${color},${opacity * (0.4 + 0.6 * r("o"))})`,
              boxShadow: `0 0 ${s * 3}px rgba(${color},${0.5 * opacity})`,
            }}
          />
        );
      })}
    </div>
  );
};

// A clear liquid sphere (serum / water droplet) with refraction-like shading.
export const Droplet: React.FC<{
  x: number;
  y: number;
  size: number;
  tint?: string;
  blur?: number;
  opacity?: number;
  stretch?: number;
}> = ({ x, y, size, tint = "255,170,180", blur = 0, opacity = 1, stretch = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - (size * stretch) / 2,
      width: size,
      height: size * stretch,
      borderRadius: "50%",
      opacity,
      filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
      background: `radial-gradient(circle at 50% 70%, rgba(${tint},0.10) 0%, rgba(${tint},0.28) 55%, rgba(${tint},0.75) 92%, rgba(${tint},0.35) 100%)`,
      boxShadow: `inset 0 -${size * 0.08}px ${size * 0.12}px rgba(255,255,255,0.55), inset 0 ${size * 0.06}px ${size * 0.1}px rgba(${tint},0.5), 0 ${size * 0.06}px ${size * 0.18}px rgba(120,40,60,0.18)`,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: "22%",
        top: "16%",
        width: "26%",
        height: "18%",
        borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0))",
        rotate: "-30deg",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: "18%",
        bottom: "12%",
        width: "20%",
        height: "10%",
        borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(255,255,255,0.7), rgba(255,255,255,0))",
      }}
    />
  </div>
);

// Fine film grain shared by every scene so the plates and CG sit in one texture.
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "overlay", pointerEvents: "none" }}
    >
      <filter id="store-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={frame % 24} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={1920} height={1080} filter="url(#store-grain)" />
    </svg>
  );
};

// Horizontal-only motion blur (whip pans): wrap content; strength in px.
export const DirectionalBlur: React.FC<{ id: string; amount: number; children: React.ReactNode }> = ({
  id,
  amount,
  children,
}) => (
  <div style={{ position: "absolute", inset: 0, filter: amount > 0.3 ? `url(#${id})` : undefined }}>
    <svg width={0} height={0} style={{ position: "absolute" }}>
      <filter id={id} x="-10%" y="0%" width="120%" height="100%">
        <feGaussianBlur stdDeviation={`${amount} 0`} />
      </filter>
    </svg>
    {children}
  </div>
);
