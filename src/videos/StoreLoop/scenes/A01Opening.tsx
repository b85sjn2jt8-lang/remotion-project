import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Droplet, Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// A · OPENING (0:00–0:05, 150 f).
// 0.0–0.7 s  the real Anua jar crosses the lens (LoopBridge in the main timeline, ~100% → 0%).
// 0.7–1.8 s  revealed behind it: Korean-inspired model, macro beauty light, camera pushing in.
// 1.8–3.0 s  the real Hikari pouch enters from the opposite (left) side in the foreground.
// 3.0–5.0 s  camera travels between pouch and model; GLOW DIFFERENT is revealed behind the pouch;
//            the Dr.Althea box crosses the lens into scene B (LensPass in the main timeline).
export const A01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 65% 35%, #fde4e6 0%, #f4c3c9 50%, #e59aa8 100%)", overflow: "hidden" }}>
      <Bokeh seed="a01" count={12} colors={["rgba(255,240,242,0.9)", "rgba(246,170,185,0.9)"]} minSize={140} maxSize={360} zoom={0.004} opacity={0.5} blur={18} />
      <ModelPlate
        name="Model · opening (Korean-inspired)"
        id="openingFace"
        x={interpolate(frame, [0, 150], [1290, 1190], { easing: Easing.bezier(0.3, 0, 0.6, 1) })}
        y={560}
        height={1020}
        zoom={interpolate(frame, [0, 150], [1.0, 1.16], { ...c, easing: Easing.bezier(0.35, 0, 0.6, 1), output: "perceptual-scale" })}
        originX="55%"
        originY="42%"
        blur={interpolate(frame, [0, 22, 60, 72, 100, 118], [9, 0, 0, 4, 4, 0], c)}
        feather={[30, 8, 0, 10]}
      />
      {/* micro handheld drift on a light leak */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(120deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 35%)",
          translate: `${Math.sin(frame / 17) * 6}px ${Math.cos(frame / 23) * 4}px`,
        }}
      />
      <Droplet x={interpolate(frame, [0, 150], [930, 850])} y={interpolate(frame, [0, 150], [250, 220])} size={58} blur={1} />

      <Headline tier="h1"
        name="GLOW DIFFERENT"
        lines={["GLOW", "DIFFERENT"]}
        x={150}
        y={600} 
        inAt={84}
        outAt={136}
        driftX={-70}
        shadow="0 8px 40px rgba(150,40,80,0.35)"
      />

      {/* Hikari: enters from the left foreground, holds, then the camera pushes past it */}
      <Product
        name="Hikari · foreground"
        id="hikari"
        x={interpolate(frame, [36, 66, 96, 140], [-560, 470, 440, -760], { ...c, easing: Easing.bezier(0.25, 0.8, 0.35, 1) })}
        y={interpolate(frame, [36, 66, 140], [660, 560, 610], c)}
        width={interpolate(frame, [36, 66, 96, 140], [980, 640, 660, 1300], { ...c, easing: Easing.bezier(0.5, 0, 0.75, 1) })}
        rotateY={interpolate(frame, [36, 66, 140], [14, 4, -8], c)}
        rotateZ={interpolate(frame, [36, 66], [-7, 0], c)}
        blur={interpolate(frame, [36, 60, 96, 132], [26, 0, 0, 22], c)}
        sweep={interpolate(frame, [62, 92], [0, 1], c)}
        wrap="255,190,205"
        cast="120,30,60"
        opacity={interpolate(frame, [36, 39], [0, 1], c)}
      />
      <Glass
        x={interpolate(frame, [0, 150], [1640, 2140])}
        y={interpolate(frame, [0, 150], [940, 990])}
        w={760}
        h={280}
        rot={-14}
        tint="250,170,185"
        blur={16}
        opacity={0.7}
      />
      <Dust seed="a01d" count={30} color="255,245,240" vy={-0.4} opacity={0.6} />
    </AbsoluteFill>
  );
};
