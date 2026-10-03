import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";

// SCENE 13 — FINAL HERO / LOOP (00:56.00–01:00.00, 120 f) — V2.
// Match cut on the Dr.Althea tube from 12c. Five real products, large and layered in depth,
// the model soft in the background. Slow pull-back, products drift outward, the Anua jar
// approaches the lens and hands over to the LoopBridge (main frames 1781+ → frame 0).
const ease = Easing.bezier(0.5, 0, 0.9, 0.6);

export const S13FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 40% 30%, #fff6f5 0%, #f9dfe1 50%, #efc4c9 100%)",
        overflow: "hidden",
      }}
    >
      {/* Model, soft in the background */}
      <ModelPlate
        name="Hero · model A (soft)"
        id="cheekTall"
        x={interpolate(frame, [0, 120], [820, 860])}
        y={520}
        height={1160}
        zoom={interpolate(frame, [0, 120], [1.12, 1.0], { output: "perceptual-scale" })}
        blur={9}
        feather={[30, 30, 0, 20]}
        opacity={0.62}
      />
      <Bokeh seed="v2s13" count={12} colors={["rgba(248,190,200,0.9)", "rgba(255,255,255,0.9)"]} minSize={90} maxSize={260} zoom={-0.0015} opacity={0.5} blur={14} />

      {/* Pull-back on the product group */}
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 72], [1.08, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.3, 0, 0.5, 1),
            output: "perceptual-scale",
          }),
          transformOrigin: "760px 560px",
        }}
      >
        <Product
          name="Hero · Brilliant"
          id="brilliant"
          x={interpolate(frame, [46, 92], [400, -420], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}
          y={interpolate(frame, [0, 40, 92], [440, 430, 380], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          width={560}
          rotateY={interpolate(frame, [0, 92], [4, -3])}
          sweep={interpolate(frame, [6, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        <Product
          name="Hero · Hikari"
          id="hikari"
          x={interpolate(frame, [50, 94], [1010, 1500], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}
          y={interpolate(frame, [0, 50, 94], [300, 292, -360], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}
          width={380}
          rotateY={interpolate(frame, [0, 94], [-5, 5])}
        />
        <Product
          name="Hero · Dr.Althea tube"
          id="altheaTube"
          x={interpolate(frame, [54, 98], [760, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}
          y={interpolate(frame, [0, 54, 98], [560, 556, 1560], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}
          width={220}
          sweep={interpolate(frame, [10, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />

        {/* Manee upper pouch rising from a glossy pink liquid (hides the plate's bottom cut, y ≥ 949) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            translate: interpolate(frame, [44, 90], ["0px 0px", "-560px 460px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            }),
          }}
        >
          <Product name="Hero · Manee" id="maneeUpper" x={330} y={interpolate(frame, [0, 40, 80], [838, 836, 838])} width={420} />
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <defs>
              <linearGradient id="v2-s13-liq" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff8cc0" />
                <stop offset="0.25" stopColor="#ef4797" />
                <stop offset="1" stopColor="#b80d5c" />
              </linearGradient>
            </defs>
            <path
              d={`M -120 ${928 + Math.sin(frame / 9) * 3} C 120 ${920 + Math.sin(frame / 11) * 3}, 420 ${936 - Math.sin(frame / 10) * 3}, 640 ${944} S 900 ${1010}, 1040 1100 L -120 1100 Z`}
              fill="url(#v2-s13-liq)"
            />
            <path
              d={`M -120 ${940 + Math.sin(frame / 9) * 3} C 120 ${932 + Math.sin(frame / 11) * 3}, 420 ${948 - Math.sin(frame / 10) * 3}, 640 ${956}`}
              stroke="rgba(255,236,246,0.85)"
              strokeWidth={7}
              fill="none"
              style={{ filter: "blur(3px)" }}
            />
          </svg>
        </div>
      </AbsoluteFill>

      {/* Anua — front-right, cropped edges off-frame; approaches the lens into the LoopBridge */}
      <Product
        name="Hero · Anua (loop approach)"
        id="anua"
        anchor="bottom-right"
        x={interpolate(frame, [0, 60, 100], [1930, 1934, 2300], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.95, 0.7) })}
        y={interpolate(frame, [0, 60, 100], [1092, 1094, 1300], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.95, 0.7) })}
        width={interpolate(frame, [0, 60, 100], [760, 780, 1200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.95, 0.7) })}
        blur={interpolate(frame, [70, 100], [0, 32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={interpolate(frame, [99, 104], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        sweep={interpolate(frame, [20, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Dust seed="v2s13d" count={26} color="255,240,244" vy={-0.3} opacity={0.6} />
    </AbsoluteFill>
  );
};
