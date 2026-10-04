import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";
import { GlassWipe } from "../fx/Wipes";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// H1 · the model alone at her vanity: candles, purple room, pink-magenta edge light.
// NIGHT RESET sits behind her (person cut-out on top). Camera: slow push through foreground glass.
const ModelBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 96], [1.0, 1.05], { output: "perceptual-scale" });
  const x = interpolate(frame, [0, 96], [900, 880]);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 45% 40%, #4a1f63 0%, #2a1040 55%, #13061f 100%)", overflow: "hidden" }}>
      <ModelPlate name="Model · night vanity" id="night" x={x} y={560} height={1200} zoom={zoom} originX="40%" originY="40%" feather={[8, 22, 0, 6]} />
      <Headline tier="h1" name="NIGHT RESET" lines={["NIGHT", "RESET"]} x={1270} y={330} inAt={22} outAt={80} driftX={-20} color="#ffe6f1" shadow="0 0 40px rgba(255,80,170,0.5)" />
      <ModelPlate name="Model · night cut-out" id="nightCut" x={x} y={560} height={1200} zoom={zoom} originX="40%" originY="40%" feather={[8, 22, 0, 6]} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(255,60,160,0) 50%, rgba(255,60,160,0.18) 82%, rgba(255,90,180,0.3) 100%)", mixBlendMode: "screen" }} />
      {/* foreground glass the camera slowly passes through + a soft sheen across the lens */}
      <Glass x={interpolate(frame, [0, 96], [260, -240], { easing: Easing.bezier(0.45, 0, 0.55, 1) })} y={560} w={760} h={1300} rot={8} tint="255,120,200" blur={28} opacity={0.55} radius={380} />
      <AbsoluteFill
        style={{
          background: "linear-gradient(118deg, rgba(255,255,255,0) 32%, rgba(255,170,220,0.14) 44%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0) 58%)",
          backgroundSize: "260% 100%",
          backgroundPosition: `${interpolate(frame, [0, 96], [85, 25])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      <Dust seed="h08m" count={26} color="255,210,240" vy={-0.4} opacity={0.5} maxSize={2.5} />
    </AbsoluteFill>
  );
};

// H2 · the product alone and still on the glossy vanity, its reflection below, candle bokeh
// behind, a single highlight travelling across it. Camera: slow push.
const ProductBeat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #44195c 0%, #250d3b 55%, #10051b 100%)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 220, top: 380, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,170,120,0.45), rgba(255,170,120,0))", filter: "blur(16px)" }} />
      <div style={{ position: "absolute", left: 1480, top: 300, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,110,200,0.35), rgba(255,110,200,0))", filter: "blur(22px)" }} />
      <div style={{ position: "absolute", left: -100, right: -100, top: 860, bottom: -100, background: "linear-gradient(to bottom, #3a1a52 0%, #1b0a2c 50%, #0e0519 100%)", boxShadow: "inset 0 2px 0 rgba(255,160,220,0.45)" }} />
      <AbsoluteFill style={{ scale: interpolate(frame, [0, 66], [1.0, 1.05], { easing: Easing.bezier(0.4, 0, 0.6, 1) }), transformOrigin: "960px 640px" }}>
        <Product
          name="Brilliant · night hero"
          id="brilliant"
          x={960}
          y={860 - 286}
          width={650}
          sweep={interpolate(frame, [6, 60], [0, 1], { ...c, easing: Easing.bezier(0.45, 0, 0.55, 1) })}
          reflectionGap={2}
          reflectionOpacity={0.24}
          wrap="255,110,200"
          cast="20,0,30"
          ground={2}
          groundOpacity={0.6}
        />
      </AbsoluteFill>
      <Dust seed="h08p" count={22} color="255,210,240" vy={-0.4} opacity={0.5} maxSize={2.5} />
    </AbsoluteFill>
  );
};

// H · NIGHT (0:26–0:31, 150 f): model first (H1) → glass refraction → product alone (H2).
// Luxe Organix slot (no reference → Brilliant Rejuv Set). No added copy on the product.
export const H08Night: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="H1 model only" durationInFrames={96}>
      <ModelBeat />
    </Sequence>
    <Sequence name="H2 Brilliant hero" from={84} durationInFrames={66}>
      <ProductBeat />
    </Sequence>
    <Sequence name="H · magenta glass refraction" from={70} durationInFrames={30}>
      <GlassWipe tint="255,100,180" frames={30} />
    </Sequence>
  </AbsoluteFill>
);
