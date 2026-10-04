import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Wave: React.FC<{ base: number; amp: number; phase: number; id: string; top: string; bottom: string }> = ({ base, amp, phase: p, id, top, bottom }) => {
  const d = `M -100 ${base + Math.sin(p) * amp} C 300 ${base - amp * 1.4 + Math.sin(p + 1) * amp}, 700 ${base + amp * 1.2 + Math.sin(p + 2) * amp}, 1000 ${base + Math.sin(p + 2.6) * amp * 0.6} S 1700 ${base - amp + Math.sin(p + 4) * amp}, 2020 ${base + Math.sin(p + 5) * amp}`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <path d={`${d} L 2020 1300 L -100 1300 Z`} fill={`url(#${id})`} />
      <path d={d} transform="translate(0 12)" stroke="rgba(255,236,246,0.85)" strokeWidth={9} fill="none" style={{ filter: "blur(4px)" }} />
    </svg>
  );
};

// L · PINK COLLAGEN HERO (0:42–0:46, 120 f). A Bonne slot (no reference → Manee Gluta Collagen
// Pink, upper pouch only). Pink liquid macro world behind; the pouch rises fast out of glossy pink
// liquid (which always hides the plate's flat bottom cut), decelerates, light sweeps across it.
export const L12PinkCollagen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#e85b97", overflow: "hidden" }}>
      <ModelPlate name="Macro · pink liquid world" id="macroPinkLiquid" x={interpolate(frame, [0, 120], [1000, 900])} y={520} height={1440} zoom={interpolate(frame, [0, 120], [1.0, 1.05])} blur={4} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(255,120,180,0) 30%, rgba(200,20,100,0.45) 100%)" }} />
      <Wave id="l12-back" base={interpolate(frame, [0, 120], [780, 720], c)} amp={36} phase={frame / 22} top="#ff7fb6" bottom="#c3105f" />
      <Headline tier="h2" name="GLOW MODE." lines={["GLOW MODE."]} x={120} y={110}  inAt={34} outAt={108} driftX={-40} shadow="0 6px 30px rgba(120,0,60,0.35)" />
      <Product
        name="Manee · rise"
        id="maneeUpper"
        x={960}
        y={interpolate(frame, [0, 120], [600, 548], { ...c, easing: Easing.bezier(0.3, 0, 0.4, 1) })}
        width={480}
        sweep={interpolate(frame, [20, 100], [0, 1], c)}
        wrap="255,170,210"
        cast="120,10,60"
      />
      {/* front liquid surface: plate bottom ≥ y 674 at its highest; surface stays ≤ y 671 */}
      <Wave id="l12-front" base={667} amp={1.2} phase={frame / 18 + 1} top="#ff86bd" bottom="#b80d5c" />
      <Dust seed="l12" count={28} color="255,220,240" vy={-0.6} opacity={0.6} />
    </AbsoluteFill>
  );
};
