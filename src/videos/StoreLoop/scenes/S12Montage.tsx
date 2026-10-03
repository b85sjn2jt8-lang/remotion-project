import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Bokeh, Droplet } from "../fx/Atmosphere";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 12 — BEAUTY MONTAGE (00:52.00–00:56.00, 3 × 40 f, hard cuts).
// Production-plan slot: three adult beauty portraits (Korean-, Japanese-inspired, Filipina).
// No generated talent in this build → three fast product "portraits" that keep the plan's colour
// worlds, rhythm and a different camera move per beat. 12c's tube position matches Scene 13.
const PortraitA: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 30% 30%, #ffe6e8 0%, #f8c7ce 50%, #efaeb9 100%)",
        overflow: "hidden",
        scale: interpolate(frame, [0, 40], [1, 1.05], { output: "perceptual-scale" }),
      }}
    >
      <Bokeh seed="s12a" count={8} colors={["rgba(255,255,255,0.9)", "rgba(250,180,195,0.9)"]} minSize={120} maxSize={300} driftX={-1} opacity={0.6} blur={16} />
      <Product name="Anua · portrait" id="anua" anchor="bottom-right" x={1928} y={1090} width={700} sweep={interpolate(frame, [6, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Droplet x={1120} y={interpolate(frame, [0, 40], [180, 300])} size={44} />
    </AbsoluteFill>
  );
};

const PortraitB: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 15% 10%, #fff3d6 0%, #ffd27a 40%, #f6a64a 100%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ background: "radial-gradient(circle at 8% 4%, rgba(255,255,240,0.95) 0%, rgba(255,255,240,0) 35%)" }} />
      <Product
        name="Hikari · portrait"
        id="hikari"
        x={interpolate(frame, [0, 40], [1180, 1080], { easing: Easing.bezier(0.3, 0, 0.5, 1) })}
        y={540}
        width={440}
        rotateY={interpolate(frame, [0, 40], [-4, 4])}
        sweep={interpolate(frame, [4, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};

const PortraitC: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 25% 20%, #f7eee3 0%, #eadbc8 50%, #d9c3a8 100%)",
        overflow: "hidden",
      }}
    >
      <FloorShadow x={1180} y={interpolate(frame, [0, 40], [840, 808])} width={220} opacity={0.3} color="110,80,50" />
      <Product
        name="Dr.Althea tube · portrait"
        id="altheaTube"
        x={1180}
        y={interpolate(frame, [0, 40], [600, 560], { easing: Easing.bezier(0.3, 0, 0.4, 1) })}
        width={160}
        sweep={interpolate(frame, [6, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};

export const S12Montage: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="12a · Anua (pink)" durationInFrames={40}>
      <PortraitA />
    </Sequence>
    <Sequence name="12b · Hikari (gold)" from={40} durationInFrames={40}>
      <PortraitB />
    </Sequence>
    <Sequence name="12c · Dr.Althea (sand)" from={80} durationInFrames={40}>
      <PortraitC />
    </Sequence>
  </AbsoluteFill>
);
