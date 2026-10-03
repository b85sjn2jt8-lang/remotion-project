import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Droplet, Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 4 — GREEN / WHITE WORLD (00:13.00–00:18.00, 150 f) — V2. AXIS-Y slot (no AXIS-Y
// reference uploaded → Dr.Althea 345 box + tube). Camera starts close on the products and pulls
// back to reveal the model softly in the background among generic, unidentifiable foliage.
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
      boxShadow: "inset 0 -10px 30px rgba(255,255,255,0.15)",
      rotate: `${rot}deg`,
      filter: `blur(${blur}px)`,
      opacity,
    }}
  />
);

export const S04GreenWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const pull = (from: number, to: number) =>
    interpolate(frame, [0, 120], [from, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.5, 0, 0.3, 1),
    });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 75% 30%, #f3f8ef 0%, #dfeedb 45%, #b9d6b5 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background: model with cotton pad among foliage (slowest layer) */}
      <ModelPlate
        name="Model F · green"
        id="greenPad"
        x={pull(1560, 1450)}
        y={540}
        height={1180}
        zoom={pull(1.18, 1.02)}
        originX="60%"
        originY="35%"
        blur={interpolate(frame, [0, 60, 110], [12, 8, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        feather={[30, 0, 0, 6]}
      />
      <Leaf x={pull(260, 160)} y={pull(220, 180)} w={520} rot={30} color="#7cad78" blur={16} opacity={0.7} />

      {/* Midground: white stone plinth + products (pull-back = scale down toward the plinth) */}
      <AbsoluteFill
        style={{
          scale: pull(1.55, 1.0),
          transformOrigin: "700px 640px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 260,
            top: 900,
            width: 960,
            height: 300,
            background: "linear-gradient(to right, #f4f6f1, #ffffff 40%, #eef1ea 80%, #e1e6dc)",
            boxShadow: "0 40px 90px rgba(40,70,40,0.18)",
          }}
        />
        <div style={{ position: "absolute", left: 260, top: 880, width: 960, height: 34, background: "linear-gradient(#ffffff,#eef1ea)" }} />
        <FloorShadow x={600} y={895} width={420} opacity={0.32} color="40,60,40" />
        <FloorShadow x={930} y={895} width={300} opacity={0.32} color="40,60,40" />
        <Product
          name="Dr.Althea box · green hero"
          id="altheaBox"
          x={600}
          y={895 - 340}
          width={350}
          rotateY={interpolate(frame, [0, 150], [-5, 2])}
          sweep={interpolate(frame, [96, 136], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        <Product
          name="Dr.Althea tube · green hero"
          id="altheaTube"
          x={930}
          y={895 - 312}
          width={205}
          rotateY={interpolate(frame, [0, 150], [6, -2])}
        />
        <Droplet x={1110} y={872} size={36} tint="215,236,222" stretch={0.82} />
        <Droplet x={350} y={876} size={22} tint="215,236,222" stretch={0.82} />
      </AbsoluteFill>

      {/* Water highlights drifting across */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5), rgba(255,255,255,0) 40%)",
          translate: interpolate(frame, [0, 150], ["-120px 0px", "160px 30px"]),
        }}
      />

      {/* Foreground leaves (fastest layer, frame the reveal) */}
      <Leaf
        x={pull(-200, 40)}
        y={pull(1180, 980)}
        w={760}
        rot={-24}
        color="#5f9a5c"
        blur={22}
      />
      <Leaf x={pull(2250, 1880)} y={pull(-160, 80)} w={640} rot={152} color="#5a965a" blur={24} />
      <Dust seed="v2s4" count={28} color="255,255,250" vy={-0.3} vx={0.2} opacity={0.6} />
    </AbsoluteFill>
  );
};
