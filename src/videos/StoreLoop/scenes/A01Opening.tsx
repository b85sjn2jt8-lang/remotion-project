import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// A · OPENING (0:00–0:05, 150 f) — final-polish language.
// 0.0–0.7 s  the real Anua jar crosses the lens (LoopBridge, main timeline) — the one fast move.
// 0.7–5.0 s  a calm beauty close-up: the camera alone moves (slow push + slight drift), focus
//            settles onto her eyes, soft pink glass drifts in the foreground, GLOW DIFFERENT
//            fades in through light beside her. No product on screen: the face is the hero.
export const A01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 68% 38%, #fbe7e8 0%, #f2cdd2 45%, #e4a9b5 100%)", overflow: "hidden" }}>
      <Bokeh seed="a01p" count={9} colors={["rgba(255,244,245,0.9)", "rgba(240,180,195,0.9)"]} minSize={160} maxSize={380} driftX={-0.25} opacity={0.4} blur={22} />
      <ModelPlate
        name="Model · opening (Korean-inspired)"
        id="openingFace"
        x={interpolate(frame, [0, 150], [1390, 1355], { easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        y={560}
        height={1060}
        zoom={interpolate(frame, [0, 150], [1.0, 1.07], { output: "perceptual-scale" })}
        originX="52%"
        originY="40%"
        blur={interpolate(frame, [0, 26, 48], [7, 2, 0], { ...c, easing: Easing.bezier(0.3, 0, 0.3, 1) })}
        feather={[34, 8, 0, 12]}
      />
      {/* soft light breathing across her skin */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(115deg, rgba(255,255,255,0) 35%, rgba(255,246,240,0.22) 50%, rgba(255,255,255,0) 65%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [0, 150], [90, 10])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      <Headline
        tier="h1"
        name="GLOW DIFFERENT"
        lines={["GLOW", "DIFFERENT"]}
        x={110}
        y={380}
        inAt={52}
        outAt={128}
        driftX={-30}
        shadow="0 8px 40px rgba(150,40,80,0.30)"
      />
      {/* foreground pink glass, very slow (it carries the depth, not the product) */}
      <Glass x={interpolate(frame, [0, 150], [420, 300])} y={interpolate(frame, [0, 150], [990, 1000])} w={980} h={300} rot={-9} tint="248,175,192" blur={22} opacity={0.6} />
      <Dust seed="a01pd" count={18} color="255,246,242" vy={-0.25} vx={0.05} opacity={0.5} />
    </AbsoluteFill>
  );
};
