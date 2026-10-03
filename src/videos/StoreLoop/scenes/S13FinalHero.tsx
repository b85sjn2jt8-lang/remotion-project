import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Dust } from "../fx/Atmosphere";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 13 — FINAL HERO / LOOP (00:56.00–01:00.00, 120 f).
// Match cut on the Dr.Althea tube from 12c. Hero hold, slow pull-back, products drift outward;
// the Anua jar approaches the lens and hands over to the LoopBridge (main frames 1781+).
export const S13FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 22% 10%, #ffffff 0%, #fdf3f4 40%, #f8dfe3 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          top: 780,
          bottom: -200,
          background: "linear-gradient(to bottom, #f5e4e6 0%, #fbf1f2 30%, #f3dadd 100%)",
        }}
      />
      <Bokeh
        seed="s13"
        count={12}
        colors={["rgba(248,190,200,0.9)", "rgba(255,255,255,0.9)"]}
        minSize={90}
        maxSize={260}
        zoom={-0.0015}
        opacity={0.5}
        blur={14}
      />

      {/* Pull-back on the whole composition */}
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 72], [1.06, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.3, 0, 0.5, 1),
            output: "perceptual-scale",
          }),
          transformOrigin: "1180px 560px",
        }}
      >
        <FloorShadow
          x={interpolate(frame, [48, 92], [420, -350], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          y={810}
          width={380}
          opacity={0.2}
        />
        <Product
          name="Hero · Brilliant"
          id="brilliant"
          x={interpolate(frame, [48, 92], [420, -350], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          y={interpolate(frame, [0, 40, 80], [470, 462, 440])}
          width={380}
          rotateY={interpolate(frame, [0, 92], [3, -3])}
        />
        <Product
          name="Hero · Dr.Althea box"
          id="altheaBox"
          x={interpolate(frame, [52, 95], [790, -150], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          y={interpolate(frame, [0, 52, 95], [545, 540, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          width={150}
          rotateY={-3}
        />
        <Product
          name="Hero · Dr.Althea tube"
          id="altheaTube"
          x={interpolate(frame, [56, 98], [1180, 820], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          y={interpolate(frame, [0, 56, 98], [560, 556, 1500], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          width={160}
          sweep={interpolate(frame, [8, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        <Product
          name="Hero · Hikari"
          id="hikari"
          x={interpolate(frame, [50, 94], [1560, 2350], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          y={interpolate(frame, [0, 50, 94], [300, 292, -260], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.9, 0.6) })}
          width={250}
          rotateY={interpolate(frame, [0, 94], [-4, 4])}
        />

        {/* Manee upper pouch rising from a glossy pink liquid crest (hides the plate's bottom cut) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            translate: interpolate(frame, [46, 90], ["0px 0px", "-520px 420px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.5, 0, 0.9, 0.6),
            }),
          }}
        >
          <Product
            name="Hero · Manee"
            id="maneeUpper"
            x={330}
            y={interpolate(frame, [0, 40, 80], [868, 866, 868])}
            width={300}
          />
          {/* liquid surface: top stays above y 941 across the pouch (x 180–480) */}
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <defs>
              <linearGradient id="s13-liq" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff8cc0" />
                <stop offset="0.25" stopColor="#ef4797" />
                <stop offset="1" stopColor="#b80d5c" />
              </linearGradient>
            </defs>
            <path
              d={`M -120 ${930 + Math.sin(frame / 9) * 3} C 120 ${922 + Math.sin(frame / 11) * 3}, 420 ${938 - Math.sin(frame / 10) * 3}, 640 ${946} S 900 ${1010}, 1040 1100 L -120 1100 Z`}
              fill="url(#s13-liq)"
            />
            <path
              d={`M -120 ${942 + Math.sin(frame / 9) * 3} C 120 ${934 + Math.sin(frame / 11) * 3}, 420 ${950 - Math.sin(frame / 10) * 3}, 640 ${958}`}
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
        x={interpolate(frame, [0, 60, 100], [1928, 1932, 2300], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.6, 0, 0.95, 0.7),
        })}
        y={interpolate(frame, [0, 60, 100], [1090, 1092, 1300], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.6, 0, 0.95, 0.7),
        })}
        width={interpolate(frame, [0, 60, 100], [600, 620, 1200], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.6, 0, 0.95, 0.7),
        })}
        blur={interpolate(frame, [70, 100], [0, 32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={interpolate(frame, [99, 104], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        sweep={interpolate(frame, [20, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Dust seed="s13d" count={26} color="255,240,244" vy={-0.3} opacity={0.6} />
    </AbsoluteFill>
  );
};
