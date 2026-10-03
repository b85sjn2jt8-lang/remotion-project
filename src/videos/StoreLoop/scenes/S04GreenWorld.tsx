import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Droplet } from "../fx/Atmosphere";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 4 — GREEN BOTANICAL WORLD (00:13.00–00:18.00, 150 f). AXIS-Y slot, filled with
// Dr.Althea 345 Relief Cream (box + tube) until an AXIS-Y reference exists.
// Macro on a water droplet on the white stone plinth → pull back + crane to the wide set.
// Foliage is generic and unidentifiable (no ingredient implication).
const Leaf: React.FC<{ x: number; y: number; w: number; rot: number; color: string; blur: number; opacity?: number }> = ({
  x,
  y,
  w,
  rot,
  color,
  blur,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y - w * 0.22,
      width: w,
      height: w * 0.44,
      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
      background: `linear-gradient(170deg, ${color}, rgba(20,60,30,0.95))`,
      boxShadow: "inset 0 -10px 30px rgba(255,255,255,0.12)",
      rotate: `${rot}deg`,
      filter: `blur(${blur}px)`,
      opacity,
    }}
  />
);

export const S04GreenWorld: React.FC = () => {
  const frame = useCurrentFrame();
  // pull-back: scale from deep macro (around the droplet) to the final wide framing
  return (
    <AbsoluteFill style={{ backgroundColor: "#eef2ea", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transformOrigin: "640px 792px",
          scale: interpolate(frame, [0, 30, 110, 150], [5.2, 4.9, 1.12, 1.08], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.6, 0, 0.3, 1),
            output: "perceptual-scale",
          }),
          translate: interpolate(frame, [0, 30, 110, 150], ["-40px 0px", "-60px 0px", "0px -30px", "-20px -30px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.6, 0, 0.3, 1),
          }),
        }}
      >
        {/* Wall + dappled leaf light */}
        <AbsoluteFill
          style={{ background: "radial-gradient(ellipse at 20% 10%, #ffffff 0%, #f4f6f1 45%, #e3e9df 100%)" }}
        />
        <div
          style={{
            position: "absolute",
            left: interpolate(frame, [0, 150], [1100, 1180]),
            top: 80,
            width: 700,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(60,100,60,0.16), rgba(60,100,60,0))",
            filter: "blur(30px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: interpolate(frame, [0, 150], [260, 200]),
            top: 140,
            width: 520,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(60,100,60,0.12), rgba(60,100,60,0))",
            filter: "blur(26px)",
          }}
        />
        {/* Floor */}
        <div
          style={{
            position: "absolute",
            left: -400,
            right: -400,
            top: 900,
            bottom: -400,
            background: "linear-gradient(to bottom, #e4e9e0, #f2f4ef)",
          }}
        />
        {/* Background foliage (soft) */}
        <Leaf x={1640} y={300} w={420} rot={-30} color="#7fae7a" blur={10} opacity={0.75} />
        <Leaf x={1780} y={470} w={360} rot={20} color="#6a9d68" blur={12} opacity={0.7} />
        <Leaf x={1500} y={160} w={300} rot={-60} color="#8dbb86" blur={14} opacity={0.6} />
        <Leaf x={190} y={260} w={380} rot={35} color="#7eb07a" blur={12} opacity={0.65} />
        {/* Plinth */}
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 792,
            width: 760,
            height: 420,
            background: "linear-gradient(to right, #f7f8f5 0%, #ffffff 35%, #eef0eb 80%, #e2e5df 100%)",
            boxShadow: "0 40px 80px rgba(60,80,60,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 772,
            width: 760,
            height: 40,
            background: "linear-gradient(to bottom, #ffffff, #f1f3ee)",
          }}
        />
        <FloorShadow x={800} y={792} width={320} opacity={0.3} blur={10} color="40,60,40" />
        <FloorShadow x={1090} y={792} width={210} opacity={0.3} blur={10} color="40,60,40" />
        {/* Products stand on the plinth (static hero; the camera reveals them) */}
        <Product
          name="Dr.Althea box · plinth"
          id="altheaBox"
          x={800}
          y={792 - 233}
          width={240}
          opacity={interpolate(frame, [45, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          blur={interpolate(frame, [0, 60, 100], [16, 8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          sweep={interpolate(frame, [104, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        <Product
          name="Dr.Althea tube · plinth"
          id="altheaTube"
          x={1090}
          y={792 - 207}
          width={136}
          opacity={interpolate(frame, [45, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          rotateY={interpolate(frame, [90, 135], [6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          blur={interpolate(frame, [0, 60, 100], [16, 8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        {/* The macro droplet on the plinth top, front-left — never on a product */}
        <Droplet x={640} y={786} size={40} tint="215,236,222" stretch={0.82} />
        <Droplet
          x={672}
          y={interpolate(frame, [0, 36], [779, 790], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          size={9}
          tint="215,236,222"
          stretch={0.85}
        />
        <Droplet x={1210} y={789} size={14} tint="215,236,222" stretch={0.8} />
      </AbsoluteFill>

      {/* Foreground foliage framing (parallax faster than the set) */}
      <Leaf
        x={interpolate(frame, [30, 120], [-300, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        y={interpolate(frame, [30, 120], [1300, 940], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        w={620}
        rot={-25}
        color="#5f9a5c"
        blur={18}
      />
      <Leaf
        x={interpolate(frame, [30, 120], [2300, 1860], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        y={interpolate(frame, [30, 120], [-200, 110], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        w={560}
        rot={150}
        color="#5a965a"
        blur={20}
      />
      {/* Cool daylight wash */}
      <AbsoluteFill
        style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 45%)" }}
      />
    </AbsoluteFill>
  );
};
