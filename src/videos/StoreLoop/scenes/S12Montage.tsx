import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Bokeh, Droplet } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";

// SCENE 12 — BEAUTY MONTAGE (00:52.00–00:56.00, 3 × 40 f, hard cuts on the eye line) — V2.
// Three human beauty beats, each with the real product large beside her and a different move.
// 12c's tube matches Scene 13's tube for the match cut.
const BeatA: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 35% 40%, #fbe1df 0%, #f2bfc2 55%, #e29aa5 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="12a · model B"
        id="wetFace"
        x={760}
        y={540}
        height={1240}
        zoom={interpolate(frame, [0, 40], [1.06, 1.16], { output: "perceptual-scale" })}
        originX="40%"
        originY="40%"
        feather={[0, 22, 0, 0]}
      />
      <Bokeh seed="v2s12a" count={6} colors={["rgba(255,240,242,0.9)"]} minSize={160} maxSize={300} driftX={-2} opacity={0.5} blur={16} />
      <Product name="12a · Anua" id="anua" anchor="bottom-right" x={1930} y={1092} width={720} sweep={interpolate(frame, [4, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Droplet x={interpolate(frame, [0, 40], [1240, 1180])} y={interpolate(frame, [0, 40], [150, 210])} size={60} />
    </AbsoluteFill>
  );
};

const BeatB: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #5f9fe0 0%, #9cc8f0 55%, #fff1db 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="12b · model C"
        id="sunSky"
        x={interpolate(frame, [0, 40], [1560, 1520], { easing: Easing.bezier(0.3, 0, 0.5, 1) })}
        y={580}
        height={1420}
        zoom={1.06}
        originX="45%"
        originY="28%"
        feather={[24, 0, 0, 0]}
      />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 6% 4%, rgba(255,252,235,1) 0%, rgba(255,240,200,0.5) 16%, rgba(255,230,180,0) 40%)" }} />
      <Product
        name="12b · Hikari"
        id="hikari"
        x={interpolate(frame, [0, 40], [560, 640], { easing: Easing.bezier(0.3, 0, 0.5, 1) })}
        y={560}
        width={620}
        rotateY={interpolate(frame, [0, 40], [6, -4])}
        sweep={interpolate(frame, [4, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};

const BeatC: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 70% 30%, #f3f8ef 0%, #dfeedb 45%, #b9d6b5 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="12c · model F"
        id="greenPad"
        x={1500}
        y={interpolate(frame, [0, 40], [600, 540], { easing: Easing.bezier(0.3, 0, 0.4, 1) })}
        height={1300}
        zoom={1.04}
        originX="60%"
        originY="32%"
        feather={[26, 0, 0, 0]}
      />
      <Product
        name="12c · Dr.Althea tube"
        id="altheaTube"
        x={760}
        y={interpolate(frame, [0, 40], [600, 560], { easing: Easing.bezier(0.3, 0, 0.4, 1) })}
        width={220}
        sweep={interpolate(frame, [6, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};

export const S12Montage: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="12a · Korean-inspired + Anua" durationInFrames={40}>
      <BeatA />
    </Sequence>
    <Sequence name="12b · sunlight + Hikari" from={40} durationInFrames={40}>
      <BeatB />
    </Sequence>
    <Sequence name="12c · green + Dr.Althea" from={80} durationInFrames={40}>
      <BeatC />
    </Sequence>
  </AbsoluteFill>
);
