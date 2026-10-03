import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Droplet, Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { FloorShadow, Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Leaf: React.FC<{ x: number; y: number; w: number; rot: number; color: string; blur: number; opacity?: number }> = ({ x, y, w, rot, color, blur, opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y - w * 0.22,
      width: w,
      height: w * 0.44,
      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
      background: `linear-gradient(170deg, ${color}, rgba(16,52,26,0.97))`,
      rotate: `${rot}deg`,
      filter: `blur(${blur}px)`,
      opacity,
    }}
  />
);

// F · GREEN BOTANICAL (0:20–0:25, 150 f). AXIS-Y slot (no AXIS-Y reference → Dr.Althea 345).
// The camera reveals the model from behind a foreground leaf; the real box + tube stand large on
// a white glass plinth at the right; SKIN FIRST. sits behind the box; pink only as glass accent.
export const F06Green: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 70% 30%, #f1f8ec 0%, #cfe6c8 50%, #8fbf88 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="Model · green"
        id="green"
        x={interpolate(frame, [0, 150], [620, 680])}
        y={560}
        height={1220}
        zoom={interpolate(frame, [0, 150], [1.12, 1.0], { output: "perceptual-scale" })}
        originX="45%"
        originY="35%"
        blur={interpolate(frame, [0, 30, 110, 150], [6, 0, 0, 3], c)}
        feather={[0, 22, 0, 0]}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 80% 15%, rgba(255,255,255,0.6), rgba(255,255,255,0) 40%)", translate: interpolate(frame, [0, 150], ["40px 0px", "-60px 10px"]) }} />

      <Headline name="SKIN FIRST." lines={["SKIN", "FIRST."]} x={1880} y={34} size={100} align="right" color="#1f4a2a" inAt={30} outAt={130} driftX={-40} shadow="0 6px 30px rgba(255,255,255,0.6)" />

      {/* white glass plinth + real products (right, mid-ground) */}
      <div style={{ position: "absolute", inset: 0, translate: interpolate(frame, [0, 150], ["30px 0px", "-50px 0px"]) }}>
        <div style={{ position: "absolute", left: 1160, top: 930, width: 820, height: 200, background: "linear-gradient(to bottom, #ffffff, #e6efe2)", boxShadow: "0 -2px 0 rgba(255,255,255,0.9), 0 30px 70px rgba(30,70,30,0.25)" }} />
        <FloorShadow x={1400} y={934} width={420} opacity={0.35} color="30,60,30" />
        <FloorShadow x={1710} y={934} width={300} opacity={0.35} color="30,60,30" />
        <Product name="Dr.Althea box · green" id="altheaBox" x={1400} y={934 - 340} width={350} rotateY={interpolate(frame, [0, 150], [-5, 2])} sweep={interpolate(frame, [70, 110], [0, 1], c)} />
        <Product name="Dr.Althea tube · green" id="altheaTube" x={1710} y={934 - 330} width={216} rotateY={interpolate(frame, [0, 150], [6, -2])} />
        <Droplet x={1250} y={924} size={34} tint="215,236,222" stretch={0.82} />
      </div>

      {/* pink glass accent + foreground leaves (fastest layers) */}
      <Glass x={interpolate(frame, [0, 150], [1900, 1700])} y={1010} w={520} h={240} rot={-10} tint="250,170,190" blur={14} opacity={0.55} />
      <Leaf x={interpolate(frame, [0, 40], [520, -700], { ...c, easing: Easing.bezier(0.5, 0, 0.6, 1) })} y={interpolate(frame, [0, 40], [520, 640], c)} w={1500} rot={-18} color="#4f8f4c" blur={24} />
      <Leaf x={interpolate(frame, [0, 150], [-120, 60])} y={interpolate(frame, [0, 150], [1060, 990])} w={700} rot={-24} color="#5f9a5c" blur={20} />
      <Leaf x={interpolate(frame, [0, 150], [2080, 1960])} y={interpolate(frame, [0, 150], [-60, 20])} w={640} rot={150} color="#5a965a" blur={22} />
      <Dust seed="f06" count={28} color="255,255,250" vy={-0.3} vx={0.2} opacity={0.6} />
    </AbsoluteFill>
  );
};
