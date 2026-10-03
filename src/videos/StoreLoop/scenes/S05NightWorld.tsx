import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";

// SCENE 5 — PURPLE NIGHT WORLD (00:18.00–00:23.00, 150 f) — V2. Luxe Organix Retinol slot (no
// reference uploaded → Brilliant Rejuv Set, its box art has sun + moon). A model resting in soft
// moonlight behind; the real box large in the foreground on a glossy vanity top with its mirror
// reflection; moon arc + travelling highlight; slow push with lateral drift. No added copy.
export const S05NightWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const arcR = 560;
  const arcLen = 2 * Math.PI * arcR;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 35% 40%, #3b1b5e 0%, #25103f 50%, #12071f 100%)",
        overflow: "hidden",
      }}
    >
      {/* Model — graded to night: cool purple, moonlight from the right */}
      <AbsoluteFill style={{ translate: interpolate(frame, [0, 150], ["40px 0px", "-50px 0px"]) }}>
        <ModelPlate
          name="Model E · night"
          id="resting"
          x={700}
          y={470}
          height={980}
          zoom={interpolate(frame, [0, 150], [1.02, 1.12], { output: "perceptual-scale" })}
          originX="45%"
          originY="40%"
          blur={interpolate(frame, [0, 150], [1.5, 3.5])}
          feather={[16, 22, 10, 26]}
          filter="grayscale(0.55) sepia(0.35) hue-rotate(215deg) saturate(1.5) brightness(0.6) contrast(1.1)"
        />
      </AbsoluteFill>

      {/* Moon arc behind the product */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, translate: interpolate(frame, [0, 150], ["30px 20px", "-40px -10px"]) }}>
        <defs>
          <filter id="v2-moon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <g transform="rotate(120 1480 470)">
          <circle cx={1480} cy={470} r={arcR} fill="none" stroke="rgba(200,185,255,0.6)" strokeWidth={46} strokeDasharray={`${arcLen * 0.4} ${arcLen}`} filter="url(#v2-moon-glow)" />
          <circle cx={1480} cy={470} r={arcR} fill="none" stroke="#f6f3ff" strokeWidth={3.5} strokeDasharray={`${arcLen * 0.4} ${arcLen}`} />
          <circle
            cx={1480}
            cy={470}
            r={arcR}
            fill="none"
            stroke="#ffffff"
            strokeWidth={interpolate(frame, [60, 150], [10, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            strokeLinecap="round"
            strokeDasharray={`${arcLen * 0.05} ${arcLen}`}
            strokeDashoffset={interpolate(frame, [60, 150], [0, -arcLen * 0.35], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.6, 0, 0.9, 0.4),
            })}
            opacity={interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            filter="url(#v2-moon-glow)"
          />
        </g>
      </svg>

      {/* Glossy vanity top */}
      <div
        style={{
          position: "absolute",
          left: -100,
          right: -100,
          top: 880,
          bottom: -100,
          background: "linear-gradient(to bottom, #2b1648 0%, #1a0b2e 40%, #0e0519 100%)",
          boxShadow: "inset 0 2px 0 rgba(220,205,255,0.35)",
        }}
      />

      {/* The real box — large, foreground right, with its reflection on the vanity */}
      <div style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 0 42px rgba(190,170,255,0.35))" }}>
        <Product
          name="Brilliant · night hero"
          id="brilliant"
          x={interpolate(frame, [0, 150], [1430, 1370], { easing: Easing.bezier(0.45, 0, 0.55, 1) })}
          y={interpolate(frame, [0, 20, 70, 120, 150], [560, 540, 532, 540, 534], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          width={interpolate(frame, [0, 150], [700, 760])}
          rotateY={interpolate(frame, [0, 75, 150], [-5, -1, 3])}
          sweep={interpolate(frame, [70, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          reflectionGap={interpolate(frame, [0, 20, 70, 120, 150], [20, 40, 48, 40, 46], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          reflectionOpacity={0.16}
        />
      </div>

      {/* Foreground: soft violet practical-light bokeh passing (depth) */}
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [-200, 300]),
          top: 760,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(200,150,255,0.45), rgba(200,150,255,0))",
          filter: "blur(20px)",
        }}
      />
      <Dust seed="v2s5" count={45} color="225,215,255" vy={-0.8} opacity={0.65} maxSize={2.5} />
    </AbsoluteFill>
  );
};
