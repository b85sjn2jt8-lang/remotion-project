import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Product } from "../fx/Product";
import { PRODUCTS } from "../products";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// E · WATER PRODUCT HERO (0:17–0:20, 90 f). No people. The real Hikari pouch hovers just above
// reflective water; camera very low at the surface; ripples roll toward camera; pink sunlight
// on the water; its reflection wobbles. A splash crosses the lens into scene F (main timeline).
export const E05PoolHero: React.FC = () => {
  const frame = useCurrentFrame();
  const p = PRODUCTS.hikari;
  const w = 560;
  const h = w * p.aspect;
  const cx = 960;
  const cy = interpolate(frame, [0, 30, 60, 90], [380, 360, 372, 358]);
  const waterY = 640;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #d6f1fb 0%, #bfe6f7 45%, #9fd7f0 59%)", overflow: "hidden", scale: interpolate(frame, [0, 90], [1, 1.06]) }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 78% 12%, rgba(255,214,226,0.95) 0%, rgba(255,190,210,0.35) 22%, rgba(255,190,210,0) 45%)" }} />
      {/* water */}
      <div style={{ position: "absolute", left: -100, right: -100, top: waterY, bottom: -100, background: "linear-gradient(180deg, #8fd0ec 0%, #3ea4d2 35%, #1a7fb6 100%)" }} />
      {/* ripples rolling toward camera */}
      <div
        style={{
          position: "absolute",
          left: -400,
          right: -400,
          top: waterY,
          bottom: -100,
          background: "repeating-radial-gradient(ellipse 100% 18% at 50% 0%, rgba(255,255,255,0) 0px, rgba(255,255,255,0.45) 6px, rgba(255,255,255,0) 26px)",
          backgroundSize: `100% ${interpolate(frame, [0, 90], [100, 140])}%`,
          backgroundPositionY: `${frame * 3}px`,
          opacity: 0.6,
          filter: "blur(1.5px)",
        }}
      />
      {/* pink sunlight column on the water */}
      <div style={{ position: "absolute", left: 1380, top: waterY, width: 260, height: 500, background: "linear-gradient(180deg, rgba(255,180,205,0.75), rgba(255,180,205,0))", filter: "blur(18px)" }} />
      {/* product reflection (wobbling) */}
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id="e05-wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves={2} seed={frame % 30} />
          <feDisplacementMap in="SourceGraphic" scale={26} />
        </filter>
      </svg>
      <Img
        src={staticFile(p.src)}
        style={{
          position: "absolute",
          left: cx - w / 2,
          top: waterY + (waterY - cy - h / 2) * 0.35,
          width: w,
          height: h,
          scale: "1 -1",
          opacity: 0.45,
          filter: "url(#e05-wobble) blur(2px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 75%)",
        }}
      />
      <div style={{ position: "absolute", left: cx - 300, top: waterY - 14, width: 600, height: 28, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(20,60,90,0.35), rgba(20,60,90,0))", filter: "blur(6px)" }} />
      <Product
        name="Hikari · above water"
        id="hikari"
        x={cx}
        y={cy}
        width={w}
        rotateY={interpolate(frame, [0, 90], [6, -6])}
        rotateZ={interpolate(frame, [0, 45, 90], [-2, 1, -1])}
        sweep={interpolate(frame, [20, 70], [0, 1], { ...c, easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        wrap="255,215,232"
        cast="20,60,90"
      />
      <Dust seed="e05" count={30} color="255,255,255" vy={-0.3} vx={-0.5} area={[0, 560, 1920, 520]} opacity={0.9} maxSize={3.5} />
    </AbsoluteFill>
  );
};
