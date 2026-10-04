import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Droplet, Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Leaf: React.FC<{ x: number; y: number; w: number; rot: number; color: string; blur: number; opacity?: number }> = ({ x, y, w, rot, color, blur, opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y - w * 0.22,
      width: w,
      height: w * 0.44,
      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
      background: `linear-gradient(170deg, ${color}, rgba(16,52,26,0.97))`,
      rotate: `${rot}deg`,
      filter: `blur(${blur}px)`,
      opacity,
    }}
  />
);

// F1 · the model alone, revealed from behind a foreground leaf. Camera: slow push only.
const ModelBeat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 70% 30%, #f1f8ec 0%, #cfe6c8 50%, #8fbf88 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="Model · green"
        id="green"
        x={interpolate(frame, [0, 92], [900, 880])}
        y={560}
        height={1220}
        zoom={interpolate(frame, [0, 92], [1.0, 1.05], { output: "perceptual-scale" })}
        originX="45%"
        originY="35%"
        feather={[24, 24, 0, 0]}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 80% 15%, rgba(255,255,255,0.5), rgba(255,255,255,0) 40%)" }} />
      {/* foreground leaf slowly uncovering her (the reveal), a second leaf frames the corner */}
      <Leaf x={interpolate(frame, [0, 56], [760, -500], { ...c, easing: Easing.bezier(0.45, 0, 0.35, 1) })} y={540} w={1500} rot={-16} color="#4f8f4c" blur={26} />
      <Leaf x={2010} y={60} w={600} rot={150} color="#5a965a" blur={24} />
      <Glass x={1700} y={1010} w={520} h={220} rot={-10} tint="250,170,190" blur={18} opacity={0.45} />
    </AbsoluteFill>
  );
};

// F2 · the product, alone and still, on white glass in a green-white set. Camera: slow push.
const ProductBeat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #f6faf3 0%, #e3efdd 50%, #c3dcbc 100%)", overflow: "hidden" }}>
      {/* soft leaf shadows drifting on the back wall */}
      <div style={{ position: "absolute", left: interpolate(frame, [0, 70], [1150, 1110]), top: 80, width: 760, height: 460, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(50,90,50,0.16), rgba(50,90,50,0))", filter: "blur(30px)" }} />
      <div style={{ position: "absolute", left: interpolate(frame, [0, 70], [180, 210]), top: 160, width: 560, height: 320, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(50,90,50,0.12), rgba(50,90,50,0))", filter: "blur(26px)" }} />
      <Headline tier="h2" name="SKIN FIRST." lines={["SKIN", "FIRST."]} x={150} y={300} color="#2a5634" inAt={14} outAt={60} driftX={-20} shadow="0 6px 30px rgba(255,255,255,0.6)" />
      <AbsoluteFill style={{ scale: interpolate(frame, [0, 70], [1.0, 1.05], { easing: Easing.bezier(0.4, 0, 0.6, 1) }), transformOrigin: "1240px 700px" }}>
        <div style={{ position: "absolute", left: 820, top: 900, width: 900, height: 220, background: "linear-gradient(to bottom, #ffffff, #e3ece0)", boxShadow: "0 -2px 0 rgba(255,255,255,0.95), 0 30px 70px rgba(30,70,30,0.22)" }} />
        <Product name="Dr.Althea box · hero" id="altheaBox" x={1120} y={904 - 330} width={340} sweep={interpolate(frame, [8, 62], [0, 1], c)} wrap="236,250,236" cast="30,60,30" ground={4} reflectionGap={4} reflectionOpacity={0.12} />
        <Product name="Dr.Althea tube · hero" id="altheaTube" x={1420} y={904 - 318} width={209} wrap="236,250,236" cast="30,60,30" ground={4} reflectionGap={4} reflectionOpacity={0.12} />
        <Droplet x={930} y={892} size={30} tint="215,236,222" stretch={0.82} />
      </AbsoluteFill>
      <Leaf x={interpolate(frame, [0, 70], [-120, -60])} y={1040} w={720} rot={-24} color="#5f9a5c" blur={22} />
      <Dust seed="f06p" count={18} color="255,255,250" vy={-0.2} opacity={0.5} />
    </AbsoluteFill>
  );
};

// F · GREEN (0:20–0:25, 150 f): model alone (F1) → leaf wipe → Dr.Althea hero (F2).
// AXIS-Y slot (no AXIS-Y reference uploaded → Dr.Althea 345). No ingredient imagery.
export const F06Green: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="F1 model only" durationInFrames={86}>
      <ModelBeat />
    </Sequence>
    <Sequence name="F2 Dr.Althea hero" from={80} durationInFrames={70}>
      <ProductBeat />
    </Sequence>
    <Sequence name="F · leaf passes the lens between the beats" from={70} durationInFrames={20}>
      <LeafPass />
    </Sequence>
  </AbsoluteFill>
);

const LeafPass: React.FC = () => {
  const frame = useCurrentFrame();
  return <Leaf x={interpolate(frame, [0, 20], [2700, -800])} y={560} w={2600} rot={-12} color="#3f7d3e" blur={30} />;
};
