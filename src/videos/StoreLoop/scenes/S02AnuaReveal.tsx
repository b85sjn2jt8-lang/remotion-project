import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Droplet } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";

// SCENE 2 — ANUA PINK WORLD · HUMAN (00:04.00–00:08.00, 120 f) — V2.
// Wet-look Korean-inspired model on the left; the real Anua jar large at the right (anchored by
// its cropped bottom-right corner, off-frame). Translucent pink glass + droplets in front.
// Focus starts on her eyes, racks to the jar at 1.6–2.4 s; slow push throughout.
export const S02AnuaReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 35% 40%, #fbe1df 0%, #f2bfc2 50%, #e29aa5 100%)",
        overflow: "hidden",
      }}
    >
      <ModelPlate
        name="Model B · wet-look"
        id="wetFace"
        x={interpolate(frame, [0, 120], [600, 640])}
        y={540}
        height={1100}
        zoom={interpolate(frame, [0, 120], [1.0, 1.1], { output: "perceptual-scale" })}
        originX="40%"
        originY="38%"
        blur={interpolate(frame, [0, 48, 72], [0, 0, 7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        })}
        feather={[0, 26, 0, 8]}
      />
      <Bokeh
        seed="v2s2"
        count={8}
        colors={["rgba(255,240,242,0.9)", "rgba(248,170,185,0.9)"]}
        minSize={120}
        maxSize={280}
        driftX={-0.8}
        opacity={0.5}
        blur={16}
      />
      <Product
        name="Anua jar · beside model"
        id="anua"
        anchor="bottom-right"
        x={1930}
        y={1092}
        width={interpolate(frame, [0, 120], [640, 700], { easing: Easing.bezier(0.45, 0, 0.55, 1) })}
        blur={interpolate(frame, [0, 48, 72], [9, 9, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        })}
        sweep={interpolate(frame, [78, 112], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />

      {/* Foreground: translucent pink glass + large defocused droplets (fast parallax) */}
      <Glass
        x={interpolate(frame, [0, 120], [180, -60])}
        y={interpolate(frame, [0, 120], [880, 900])}
        w={760}
        h={420}
        rot={18}
        tint="248,160,175"
        blur={18}
        opacity={0.75}
      />
      <Droplet x={interpolate(frame, [0, 120], [1180, 1080])} y={interpolate(frame, [0, 120], [180, 150])} size={230} blur={10} opacity={0.8} />
      <Droplet x={interpolate(frame, [0, 120], [1060, 1020])} y={interpolate(frame, [0, 120], [560, 620])} size={46} blur={0.5} />
    </AbsoluteFill>
  );
};
