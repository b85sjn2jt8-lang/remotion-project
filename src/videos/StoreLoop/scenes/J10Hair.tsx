import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { HairStrands, ModelPlate } from "../fx/Layers";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const HairPortrait: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + frame;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(110deg, #e9d9c8 0%, #d9c2aa 50%, #c7a88c 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="Model · hair (Japanese-inspired)"
        id="hair"
        x={interpolate(t, [0, 150], [1020, 940], { easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        y={560}
        height={1230}
        zoom={interpolate(t, [0, 150], [1.0, 1.05], { output: "perceptual-scale" })}
        originX="58%"
        originY="40%"
        feather={[14, 0, 0, 0]}
      />
      {/* light travelling across the hair strands */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(105deg, rgba(255,230,210,0) 38%, rgba(255,226,214,0.42) 48%, rgba(255,190,210,0.25) 52%, rgba(255,230,210,0) 62%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(t, [0, 150], [100, -10])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      {/* warm-pink rim light */}
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(255,150,180,0.28) 0%, rgba(255,150,180,0) 25%, rgba(255,150,180,0) 75%, rgba(255,150,180,0.3) 100%)", mixBlendMode: "screen" }} />
      <HairStrands seed="j10-drift" progress={interpolate(t, [0, 150], [0.12, 0.6])} count={16} thickness={3} blur={6} opacity={0.5} spread={700} />
      {/* a loose lock sweeping through the foreground every ~1.2 s */}
      <HairStrands seed="j10-lock-a" progress={interpolate(t, [18, 58], [0.15, 0.95], c)} count={34} thickness={7} blur={5} opacity={0.75} spread={420} />
      <Dust seed="j10" count={26} color="255,240,225" vy={-0.2} vx={0.3} opacity={0.55} />
    </AbsoluteFill>
  );
};

const HairMacro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#2a1a1a", overflow: "hidden" }}>
      <ModelPlate name="Macro · hair" id="macroHair" x={interpolate(frame, [0, 26], [990, 930])} y={540} height={2300} zoom={1.05} />
    </AbsoluteFill>
  );
};

const StrandCut: React.FC = () => {
  const frame = useCurrentFrame();
  return <HairStrands seed="j10-cut" progress={interpolate(frame, [0, 20], [0.15, 0.95], c)} count={150} thickness={9} blur={4} spread={1500} />;
};

// J · HAIR BEAUTY (0:32–0:37, 150 f): lateral track on the hair portrait, a hair macro insert
// (f66–92), and hair strands crossing the lens as wipes (in/out are in the main timeline).
export const J10Hair: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="J1 portrait" durationInFrames={66}>
      <HairPortrait from={0} />
    </Sequence>
    <Sequence name="J2 hair macro" from={66} durationInFrames={26}>
      <HairMacro />
    </Sequence>
    <Sequence name="J3 portrait (continues)" from={92} durationInFrames={58}>
      <HairPortrait from={92} />
    </Sequence>
    <Sequence name="J · strands into the macro" from={56} durationInFrames={20}>
      <StrandCut />
    </Sequence>
    <Sequence name="J · strands out of the macro" from={84} durationInFrames={20}>
      <StrandCut />
    </Sequence>
  </AbsoluteFill>
);
