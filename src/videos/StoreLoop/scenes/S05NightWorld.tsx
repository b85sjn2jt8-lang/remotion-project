import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Product } from "../fx/Product";

// SCENE 5 — NIGHT WORLD (00:18.00–00:23.00, 150 f). Luxe Organix Retinol slot, filled with the
// Brilliant Rejuv Set (the box's own sun/moon art motivates the night world). No copy is added
// to this regulated product. Lateral truck; the moon-arc highlight blooms into WhiteBloom.
export const S05NightWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const arcR = 620;
  const arcLen = 2 * Math.PI * arcR;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 60% 40%, #3a1a5c 0%, #24103f 45%, #12071f 100%)",
        overflow: "hidden",
      }}
    >
      {/* Moonlight arc (slowest parallax layer) */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          inset: 0,
          translate: interpolate(frame, [0, 150], ["40px 30px", "-60px -10px"]),
        }}
      >
        <defs>
          <filter id="moon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="moon-glow-wide" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
        <g transform="rotate(140 1180 470)">
          <circle
            cx={1180}
            cy={470}
            r={arcR}
            fill="none"
            stroke="rgba(190,170,255,0.55)"
            strokeWidth={60}
            strokeDasharray={`${arcLen * 0.42} ${arcLen}`}
            filter="url(#moon-glow-wide)"
          />
          <circle
            cx={1180}
            cy={470}
            r={arcR}
            fill="none"
            stroke="rgba(235,230,255,0.9)"
            strokeWidth={14}
            strokeDasharray={`${arcLen * 0.42} ${arcLen}`}
            filter="url(#moon-glow)"
          />
          <circle
            cx={1180}
            cy={470}
            r={arcR}
            fill="none"
            stroke="#f6f3ff"
            strokeWidth={3.5}
            strokeDasharray={`${arcLen * 0.42} ${arcLen}`}
          />
          {/* travelling highlight along the arc (right end → left end, accelerating) */}
          <circle
            cx={1180}
            cy={470}
            r={arcR}
            fill="none"
            stroke="#ffffff"
            strokeWidth={interpolate(frame, [75, 150], [10, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            strokeLinecap="round"
            strokeDasharray={`${arcLen * 0.05} ${arcLen}`}
            strokeDashoffset={interpolate(frame, [75, 150], [0, -arcLen * 0.37], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.6, 0, 0.9, 0.4),
            })}
            opacity={interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            filter="url(#moon-glow)"
          />
        </g>
      </svg>

      {/* Glossy dark floor + mist layers drifting against the truck */}
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          top: 820,
          bottom: -100,
          background: "linear-gradient(to bottom, #1d0d33, #0d0518)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [-300, -120]),
          top: 760,
          width: 1500,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(210,190,255,0.16), rgba(210,190,255,0))",
          filter: "blur(30px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [700, 980]),
          top: 820,
          width: 1600,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(200,180,255,0.14), rgba(200,180,255,0))",
          filter: "blur(36px)",
        }}
      />

      {/* Brilliant Rejuv Set — floats, slow yaw, cool rim light */}
      <div style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 0 38px rgba(190,170,255,0.35))" }}>
        <Product
          name="Brilliant · night hero"
          id="brilliant"
          x={interpolate(frame, [0, 150], [840, 1000])}
          y={interpolate(frame, [0, 10, 55, 105, 150], [580, 556, 546, 556, 548], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          width={520}
          rotateY={interpolate(frame, [0, 75, 120], [5, 1, -3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          sweep={interpolate(frame, [75, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          reflectionGap={80}
          reflectionOpacity={0.1}
        />
      </div>

      <Dust seed="s5" count={45} color="225,215,255" vy={-0.8} vx={0.1} opacity={0.65} maxSize={2.5} />
    </AbsoluteFill>
  );
};
