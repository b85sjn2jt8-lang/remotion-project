import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Pink-magenta lens reflections (the pink accent in a blue/gold world).
const PinkFlare: React.FC<{ progress: number }> = ({ progress }) => (
  <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
    {[0.15, 0.32, 0.55, 0.8].map((k, i) => (
      <div
        key={k}
        style={{
          position: "absolute",
          left: 1700 - k * 1500 - progress * 120 * (i + 1),
          top: 80 + k * 820,
          width: 70 + i * 60,
          height: 70 + i * 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,120,180,${0.32 - i * 0.05}) 0%, rgba(255,120,180,0) 70%)`,
          filter: "blur(2px)",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: -200,
        top: 60,
        width: 2400,
        height: 18,
        rotate: "-8deg",
        background: "linear-gradient(90deg, rgba(255,140,190,0), rgba(255,140,190,0.35), rgba(255,220,200,0.5), rgba(255,140,190,0))",
        filter: "blur(6px)",
        opacity: 0.6 + 0.3 * Math.sin(progress * 6),
      }}
    />
  </AbsoluteFill>
);

const BeachModel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 100], [1.0, 1.32], { ...c, easing: Easing.bezier(0.4, 0, 0.5, 1), output: "perceptual-scale" });
  const x = interpolate(frame, [0, 100], [1440, 1360], c);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #74b9ec 0%, #a9d6f5 38%, #36a6d6 46%, #1f8fc4 60%, #f4dcc0 78%, #efcfae 100%)", overflow: "hidden" }}>
      {/* ocean shimmer */}
      <div
        style={{
          position: "absolute",
          left: -100,
          right: -100,
          top: 470,
          height: 300,
          background: "repeating-linear-gradient(178deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0) 14px)",
          backgroundPositionX: `${frame * 4}px`,
          opacity: 0.55,
          filter: "blur(1px)",
        }}
      />
      <ModelPlate name="Beach · model" id="beach" x={x} y={560} height={1340} zoom={zoom} originX="40%" originY="24%" feather={[22, 0, 0, 0]} />
      <Headline
        name="SUN-KISSED. PROTECTED."
        lines={["SUN-KISSED.", "PROTECTED."]}
        x={120}
        y={330}
        size={128}
        inAt={10}
        outAt={88}
        driftX={-60}
        shadow="0 6px 34px rgba(20,70,120,0.45)"
      />
      {/* person cut-out on top: the copy passes behind her hat and hair */}
      <ModelPlate name="Beach · model cut-out" id="beachCut" x={x} y={560} height={1340} zoom={zoom} originX="40%" originY="24%" feather={[22, 0, 0, 0]} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 92% 2%, rgba(255,248,225,0.95) 0%, rgba(255,235,190,0.5) 16%, rgba(255,230,180,0) 40%)" }} />
      <PinkFlare progress={frame / 100} />
      <Dust seed="d04" count={34} color="255,255,240" vy={-0.2} vx={-0.6} area={[0, 420, 1920, 360]} opacity={0.8} maxSize={3} />
    </AbsoluteFill>
  );
};

const ShoulderMacro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#3aa6d4", overflow: "hidden" }}>
      <ModelPlate
        name="Beach · shoulder macro"
        id="shoulderSea"
        x={interpolate(frame, [0, 25], [1010, 900])}
        y={540}
        height={1200}
        zoom={interpolate(frame, [0, 25], [1.05, 1.15], { output: "perceptual-scale" })}
        originX="60%"
      />
      <PinkFlare progress={1 + frame / 25} />
    </AbsoluteFill>
  );
};

const SunscreenHero: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#3aa6d4", overflow: "hidden" }}>
      <ModelPlate name="Beach · sea bokeh" id="shoulderSea" x={960} y={540} height={1300} zoom={1.1} blur={16} filter="saturate(1.15)" />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 85% 8%, rgba(255,250,230,0.9) 0%, rgba(255,240,200,0.3) 20%, rgba(255,230,180,0) 45%)" }} />
      <Product
        name="Hikari · beach hero"
        id="hikari"
        x={interpolate(frame, [0, 40], [900, 960], { easing: Easing.bezier(0.3, 0, 0.5, 1) })}
        y={interpolate(frame, [0, 14, 40], [600, 528, 540], { ...c, easing: Easing.bezier(0.2, 0.8, 0.3, 1) })}
        width={interpolate(frame, [0, 40], [600, 650])}
        rotateY={interpolate(frame, [0, 40], [-8, 5])}
        rotateZ={interpolate(frame, [0, 14, 40], [-5, 1, 0], c)}
        sweep={interpolate(frame, [6, 36], [0, 1], c)}
      />
      <PinkFlare progress={2 + frame / 40} />
      <Dust seed="d04h" count={26} color="255,255,245" vy={-0.6} opacity={0.7} />
    </AbsoluteFill>
  );
};

// D · BEACH / SUNSCREEN (0:11.5–0:17.0, 165 f): wide → medium (push) → shoulder macro → product hero.
// The model plate shows sunscreen on her cheek; the REAL Hikari pouch appears separately.
export const D04Beach: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="D1 wide → medium (model)" durationInFrames={100}>
      <BeachModel />
    </Sequence>
    <Sequence name="D2 shoulder macro" from={100} durationInFrames={25}>
      <ShoulderMacro />
    </Sequence>
    <Sequence name="D3 Hikari hero" from={125} durationInFrames={40}>
      <SunscreenHero />
    </Sequence>
  </AbsoluteFill>
);
