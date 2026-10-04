import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { PRODUCTS } from "../products";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// E · SUNSCREEN HERO OVER WATER (0:15.8–0:20, 125 f) — final-polish language.
// One product, important and still: the real Hikari pouch just above a calm sea surface, its
// reflection in the water, the beach (and the woman) as soft bokeh behind. Only the camera moves
// (slow push); ripples roll toward the lens; one highlight travels across the pouch. A splash
// carries the cut into scene F (main timeline).
export const E05PoolHero: React.FC = () => {
  const frame = useCurrentFrame();
  const p = PRODUCTS.hikari;
  const w = 560;
  const h = w * p.aspect;
  const cx = 960;
  const cy = 392;
  const waterY = 690;
  return (
    <AbsoluteFill style={{ backgroundColor: "#8fcbe8", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: interpolate(frame, [0, 125], [1.0, 1.06], { easing: Easing.bezier(0.4, 0, 0.6, 1) }), transformOrigin: "960px 520px" }}>
        {/* the beach behind: same woman/sea, deeply out of focus */}
        <ModelPlate name="E · beach bokeh" id="beach" x={1260} y={330} height={2300} zoom={1.0} blur={30} feather={[30, 22, 0, 0]} filter="saturate(1.1) brightness(1.04)" />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(150,205,240,0.0) 0%, rgba(150,205,240,0.35) 55%, rgba(150,205,240,0.6) 64%)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(circle at 80% 10%, rgba(255,248,228,0.9) 0%, rgba(255,226,200,0.3) 22%, rgba(255,220,200,0) 45%)" }} />
        {/* calm sea surface */}
        <div style={{ position: "absolute", left: -100, right: -100, top: waterY, bottom: -100, background: "linear-gradient(180deg, #9fd6ee 0%, #4aa9d6 38%, #1f80b6 100%)" }} />
        <div
          style={{
            position: "absolute",
            left: -400,
            right: -400,
            top: waterY,
            bottom: -100,
            background: "repeating-radial-gradient(ellipse 100% 16% at 50% 0%, rgba(255,255,255,0) 0px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0) 26px)",
            backgroundPositionY: `${frame * 1.6}px`,
            opacity: 0.55,
            filter: "blur(1.5px)",
          }}
        />
        {/* pink sun glint on the water (the accent; the sea stays blue) */}
        <div style={{ position: "absolute", left: 1400, top: waterY, width: 240, height: 420, background: "linear-gradient(180deg, rgba(255,190,212,0.6), rgba(255,190,212,0))", filter: "blur(20px)" }} />
        {/* reflection */}
        <svg width={0} height={0} style={{ position: "absolute" }}>
          <filter id="e05f-wobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves={2} seed={Math.floor(frame / 2) % 40} />
            <feDisplacementMap in="SourceGraphic" scale={16} />
          </filter>
        </svg>
        <Img
          src={staticFile(p.src)}
          style={{
            position: "absolute",
            left: cx - w / 2,
            top: waterY + (waterY - (cy + h / 2)),
            width: w,
            height: h,
            scale: "1 -1",
            opacity: 0.4,
            filter: "url(#e05f-wobble) blur(2px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
          }}
        />
        <Product
          name="Hikari · hero over water"
          id="hikari"
          x={cx}
          y={cy}
          width={w}
          sweep={interpolate(frame, [18, 96], [0, 1], { ...c, easing: Easing.bezier(0.45, 0, 0.55, 1) })}
          wrap="255,226,214"
          cast="20,70,110"
        />
      </AbsoluteFill>
      <Dust seed="e05f" count={26} color="255,255,255" vy={-0.15} vx={-0.3} area={[0, 640, 1920, 440]} opacity={0.85} maxSize={3} />
    </AbsoluteFill>
  );
};
