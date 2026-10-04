import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, DirectionalBlur } from "../fx/Atmosphere";
import { Glass } from "../fx/Layers";
import { Product } from "../fx/Product";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// N · PRODUCT FLIGHT (0:47.5–0:53, 165 f) — V3.1.
// Fake-3D flight through a beauty-product space. Three depth layers cross the frame right → left
// at speeds set by their Z-depth (background slow, midground medium, foreground very fast), while
// the whole space pushes forward and banks slightly:
//   background  20–35 % frame height · defocused · ≈ 4 px/f
//   midground   40–60 % frame height · sharp     · ≈ 14 px/f
//   foreground  80–120 % frame height · heavy blur + horizontal motion blur · ≈ 70–90 px/f
// One foreground pass (Dr.Althea box, 2200 px wide) fully covers the lens around f106–108.
// Only plates with complete silhouettes fly free (the Anua/Manee plates are cropped).
export const N14Flight: React.FC = () => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 165], [1.0, 1.12]);
  const bank = Math.sin(frame / 40) * 2.5;
  const bg = (start: number) => start - frame * 4;
  const mid = (start: number) => start - frame * 14;
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, #fff3f6 0%, #f8d3dd 50%, #e8a2b6 100%)", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: push, rotate: `${bank}deg` }}>
        <Bokeh seed="n14v31" count={24} colors={["rgba(255,255,255,0.9)", "rgba(250,170,195,0.9)"]} minSize={50} maxSize={180} driftX={-3} opacity={0.6} blur={10} />

        {/* BACKGROUND — small, soft, slow */}
        <Product name="BG · Brilliant" id="brilliant" x={bg(1500)} y={300} width={360} blur={7} opacity={0.85} wrap="255,200,215" />
        <Product name="BG · Dr.Althea tube" id="altheaTube" x={bg(800)} y={760} width={110} blur={7} opacity={0.85} />
        <Product name="BG · Hikari" id="hikari" x={bg(2100)} y={760} width={290} blur={7} opacity={0.85} />
        <Product name="BG · Dr.Althea box" id="altheaBox" x={bg(300)} y={330} width={160} blur={7} opacity={0.85} />
        <Product name="BG · Brilliant 2" id="brilliant" x={bg(2650)} y={500} width={330} blur={7} opacity={0.85} />
        <Glass x={bg(1150)} y={540} w={420} h={760} rot={12} tint="255,160,195" blur={10} opacity={0.4} />

        {/* MIDGROUND — 40–60 % height, sharp, staggered entrances */}
        <Product name="MID · Hikari" id="hikari" x={mid(1500)} y={interpolate(frame, [0, 165], [470, 430])} width={500} rotateY={interpolate(frame, [0, 165], [10, -8])} rotateZ={-4} sweep={interpolate(frame, [10, 60], [0, 1], c)} wrap="255,190,210" />
        <Product name="MID · Dr.Althea box" id="altheaBox" x={mid(2300)} y={600} width={300} rotateY={-6} sweep={interpolate(frame, [60, 110], [0, 1], c)} wrap="255,190,210" />
        <Product name="MID · Brilliant" id="brilliant" x={mid(3000)} y={interpolate(frame, [0, 165], [430, 470])} width={600} rotateY={5} rotateZ={3} sweep={interpolate(frame, [100, 150], [0, 1], c)} wrap="255,190,210" />
        <Product name="MID · Dr.Althea tube" id="altheaTube" x={mid(3550)} y={580} width={190} rotateZ={-6} wrap="255,190,210" />
        <Glass x={mid(2700)} y={820} w={520} h={300} rot={-14} tint="255,150,190" blur={4} opacity={0.5} />
      </AbsoluteFill>

      {/* FOREGROUND — huge, fast, horizontally motion-blurred */}
      <DirectionalBlur id="n14-fg-mb" amount={34}>
        <Product
          name="FG · Hikari (lens pass)"
          id="hikari"
          x={interpolate(frame, [30, 74], [2700, -900], c)}
          y={560}
          width={1000}
          rotateZ={-10}
          blur={16}
          opacity={interpolate(frame, [29, 31], [0, 1], c)}
        />
        <Product
          name="FG · Dr.Althea box (covers the lens)"
          id="altheaBox"
          x={interpolate(frame, [86, 128], [3400, -1500], { ...c, easing: Easing.linear })}
          y={540}
          width={2200}
          rotateZ={8}
          blur={20}
          opacity={interpolate(frame, [85, 87], [0, 1], c)}
        />
        <Glass x={interpolate(frame, [0, 60], [1200, -900], c)} y={900} w={900} h={420} rot={-10} tint="255,150,190" blur={24} opacity={0.6} />
      </DirectionalBlur>

      {/* light sweep travelling through the space */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(100deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 60%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${100 - ((frame % 70) / 70) * 100}% 0%`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
