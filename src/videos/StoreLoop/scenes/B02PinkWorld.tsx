import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Bokeh, Droplet, Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";
import { GlassWipe } from "../fx/Wipes";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// B1 · the model alone: wet-look skin, fingertip on her cheek. Camera: slow push only.
const ModelBeat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 35% 45%, #fbe4e6 0%, #f0c3cb 55%, #dc9aaa 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="Model · cheek touch (wet look)"
        id="cheekWet"
        x={interpolate(frame, [0, 96], [720, 700])}
        y={560}
        height={1120}
        zoom={interpolate(frame, [0, 96], [1.0, 1.05], { output: "perceptual-scale" })}
        originX="52%"
        originY="40%"
        flip
        feather={[0, 22, 0, 6]}
      />
      <Headline tier="h2" name="HYDRATE GLOW CARE" lines={["HYDRATE", "GLOW", "CARE"]} x={1820} y={330} align="right" inAt={12} outAt={70} driftX={-24} shadow="0 6px 30px rgba(160,40,80,0.30)" />
      <Bokeh seed="b02p" count={6} colors={["rgba(255,242,244,0.9)", "rgba(246,182,198,0.9)"]} minSize={160} maxSize={320} driftX={-0.3} opacity={0.35} blur={20} />
    </AbsoluteFill>
  );
};

// B2 · the product, alone and important: the real Anua jar in a layered pink-glass set.
// The jar is still; the camera pushes in slowly; a highlight travels; glass drifts in front.
const ProductBeat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #fdeef0 0%, #f6d2d9 40%, #eab0be 75%, #d98ea2 100%)", overflow: "hidden" }}>
      {/* layered translucent pink planes (depth through materials, not flat colour) */}
      <div style={{ position: "absolute", left: 120, top: -160, width: 640, height: 1400, borderRadius: 80, rotate: "14deg", background: "linear-gradient(170deg, rgba(255,255,255,0.55), rgba(255,200,212,0.12))", boxShadow: "inset 0 0 90px rgba(255,255,255,0.45)", translate: interpolate(frame, [0, 75], ["0px 0px", "-18px 0px"]) }} />
      <div style={{ position: "absolute", left: 760, top: -260, width: 520, height: 1500, borderRadius: 300, background: "linear-gradient(200deg, rgba(255,255,255,0.42), rgba(240,150,175,0.10))", filter: "blur(4px)", translate: interpolate(frame, [0, 75], ["0px 0px", "-30px 0px"]) }} />
      <Bokeh seed="b02h" count={8} colors={["rgba(255,255,255,0.9)", "rgba(244,170,190,0.9)"]} minSize={120} maxSize={300} driftX={-0.2} opacity={0.4} blur={18} />
      <AbsoluteFill style={{ scale: interpolate(frame, [0, 75], [1.0, 1.05], { easing: Easing.bezier(0.4, 0, 0.6, 1) }), transformOrigin: "1920px 1080px" }}>
        <Product
          name="Anua · hero"
          id="anua"
          anchor="bottom-right"
          x={1934}
          y={1094}
          width={760}
          sweep={interpolate(frame, [10, 70], [0, 1], { ...c, easing: Easing.bezier(0.45, 0, 0.55, 1) })}
          wrap="255,205,218"
          cast="130,40,70"
        />
        <Droplet x={1120} y={540} size={44} blur={0.5} />
      </AbsoluteFill>
      <Glass x={interpolate(frame, [0, 75], [520, 440])} y={980} w={1000} h={320} rot={-8} tint="248,170,190" blur={24} opacity={0.6} />
      <Dust seed="b02hd" count={16} color="255,244,246" vy={-0.2} opacity={0.5} />
    </AbsoluteFill>
  );
};

// B · PINK WORLD (0:05–0:10, 150 f): model alone (B1) → slow glass refraction → Anua hero (B2).
export const B02PinkWorld: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="B1 model only" durationInFrames={80}>
      <ModelBeat />
    </Sequence>
    <Sequence name="B2 Anua hero" from={75} durationInFrames={75}>
      <ProductBeat />
    </Sequence>
    <Sequence name="B · glass refraction between the beats" from={58} durationInFrames={34}>
      <GlassWipe tint="250,175,195" frames={34} />
    </Sequence>
  </AbsoluteFill>
);
