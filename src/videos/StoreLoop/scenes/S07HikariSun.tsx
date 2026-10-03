import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Droplet, Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";

// SCENE 7 — SUNSCREEN WORLD (00:27.00–00:32.00, 150 f) — V2.
// Model enjoying the sun under a blue sky (right); the real Hikari pouch large in the left
// foreground, floating with a counter-yaw "orbit"; moving palm shadows, water caustics, sun flare.
// Copy: SPF 50 PA++++ (verbatim pack claim).
const Frond: React.FC<{ x: number; y: number; scale: number; rot: number; opacity: number; blur: number; color?: string }> = ({
  x,
  y,
  scale,
  rot,
  opacity,
  blur,
  color = "#6a4a2a",
}) => (
  <svg
    width={900}
    height={900}
    viewBox="-450 -450 900 900"
    style={{
      position: "absolute",
      left: x - 450,
      top: y - 450,
      scale,
      rotate: `${rot}deg`,
      opacity,
      filter: `blur(${blur}px)`,
    }}
  >
    <path d="M -420 40 Q 0 -60 420 -10" stroke={color} strokeWidth={10} fill="none" />
    {[-360, -290, -220, -150, -80, -10, 60, 130, 200, 270, 340].map((p, i) => (
      <React.Fragment key={p}>
        <ellipse cx={p} cy={-70 + i * 2} rx={24} ry={150} fill={color} transform={`rotate(-38 ${p} ${-70 + i * 2})`} />
        <ellipse cx={p} cy={90 - i * 4} rx={24} ry={150} fill={color} transform={`rotate(38 ${p} ${90 - i * 4})`} />
      </React.Fragment>
    ))}
  </svg>
);

export const S07HikariSun: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sway = Math.sin(frame / 10);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #5f9fe0 0%, #8fc0ee 45%, #d8ecfb 80%, #fff3df 100%)",
        overflow: "hidden",
      }}
    >
      {/* Model in the sun (slow layer) */}
      <ModelPlate
        name="Model C · sunlight"
        id="sunSky"
        x={interpolate(frame, [0, 150], [1565, 1535])}
        y={560}
        height={1400}
        zoom={interpolate(frame, [0, 150], [1.02, 1.12], { output: "perceptual-scale" })}
        originX="45%"
        originY="30%"
        feather={[24, 0, 0, 0]}
      />
      {/* Sun flare from upper left */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at 8% 4%, rgba(255,252,235,1) 0%, rgba(255,240,200,0.65) 14%, rgba(255,230,180,0) 42%)",
          opacity: interpolate(frame, [0, 75, 150], [0.85, 1, 0.9]),
        }}
      />
      {/* Moving palm shadows across the frame */}
      <AbsoluteFill style={{ mixBlendMode: "multiply", translate: interpolate(frame, [0, 150], ["-40px 0px", "50px 0px"]) }}>
        <Frond x={1000} y={-120} scale={1.9} rot={150 + sway * 3} opacity={0.18} blur={12} />
        <Frond x={300} y={1040} scale={1.6} rot={-30 - sway * 2} opacity={0.16} blur={14} />
      </AbsoluteFill>

      {/* Water band with caustics at the bottom */}
      <div
        style={{
          position: "absolute",
          left: -100,
          right: -100,
          top: 900,
          bottom: -50,
          background: "linear-gradient(to bottom, rgba(150,210,235,0.95), rgba(90,170,210,0.95))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -100,
          right: -100,
          top: 900,
          bottom: -50,
          background:
            "repeating-radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0) 0px, rgba(255,255,255,0.55) 7px, rgba(255,255,255,0) 20px)",
          backgroundPositionX: `${Math.sin(frame / 9) * 40 + frame * 1.5}px`,
          filter: "blur(2.5px)",
          opacity: 0.7,
        }}
      />

      {/* The real pouch — large foreground hero */}
      <Product
        name="Hikari · sun hero"
        id="hikari"
        x={interpolate(frame, [0, 150], [600, 640], { easing: Easing.bezier(0.45, 0, 0.55, 1) })}
        y={interpolate(frame, [0, 38, 76, 114, 150], [560, 538, 552, 536, 546], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        })}
        width={interpolate(frame, [0, 150], [620, 660])}
        rotateY={interpolate(frame, [0, 75, 150], [-7, 0, 7])}
        sweep={interpolate(frame, [70, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        reflectionGap={interpolate(frame, [0, 38, 76, 114, 150], [10, 32, 18, 34, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        reflectionOpacity={0.22}
      />

      {/* Splash droplet + ripple in the water, away from the pouch */}
      <Droplet
        x={1060}
        y={interpolate(frame, [62, 84], [-60, 930], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.5, 0, 1, 1),
        })}
        size={30}
        tint="230,245,255"
        opacity={interpolate(frame, [83, 86], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <div
        style={{
          position: "absolute",
          left: 1060 - interpolate(frame, [84, 140], [10, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          top: 930 - interpolate(frame, [84, 140], [3, 44], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          width: interpolate(frame, [84, 140], [20, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          height: interpolate(frame, [84, 140], [6, 88], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.85)",
          opacity: interpolate(frame, [84, 140], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />

      {/* Foreground palm frond drifting across the lens (depth) */}
      <Frond
        x={interpolate(frame, [0, 150], [2100, 1700])}
        y={interpolate(frame, [0, 150], [-80, -20])}
        scale={2.2}
        rot={200 + sway * 4}
        opacity={0.85}
        blur={18}
        color="#3a2a18"
      />
      <Dust seed="v2s7" count={30} color="255,250,230" vy={-0.3} vx={0.4} opacity={0.6} />

      <Interactive.Div
        name="SPF 50 PA++++"
        style={{
          position: "absolute",
          left: 120,
          top: 70,
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 96,
          letterSpacing: "0.04em",
          color: "#ffffff",
          textShadow: "0 4px 24px rgba(40,80,140,0.45)",
          opacity: interpolate(frame, [0.6 * fps, 0.6 * fps + 10, 4.2 * fps, 4.2 * fps + 8], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0.6 * fps, 0.6 * fps + 10], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        SPF 50 PA++++
      </Interactive.Div>
    </AbsoluteFill>
  );
};
