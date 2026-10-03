import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Droplet, Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";

// SCENE 1 — OPENING (00:00.00–00:04.00, 120 f) — V2.
// 0–1 s  the Anua jar passes extremely close to the lens (LoopBridge, main timeline) and clears.
// 1–2 s  a Korean-inspired model is revealed behind it, focus pulling onto her as she looks to camera.
// 2–3 s  the real Hikari pouch enters large from the opposite (left) side in the foreground.
// 3–4 s  the camera pushes between the pouch and the model; the Dr.Althea tube crosses the lens.
export const S01ProductFlight: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 70% 30%, #fbe6e3 0%, #f4cfcd 45%, #e9b3b4 100%)",
        overflow: "hidden",
      }}
    >
      <Bokeh
        seed="v2s1"
        count={12}
        colors={["rgba(255,236,232,0.9)", "rgba(246,180,176,0.9)"]}
        minSize={140}
        maxSize={340}
        zoom={0.004}
        opacity={0.55}
        blur={18}
      />

      {/* Model — revealed behind the jar pass; push-in toward her eyes, rack focus */}
      <ModelPlate
        name="Model A · cheek touch"
        id="cheekTall"
        x={interpolate(frame, [0, 120], [1330, 1250], { easing: Easing.bezier(0.3, 0, 0.6, 1) })}
        y={540}
        height={1200}
        zoom={interpolate(frame, [0, 70, 120], [1.0, 1.08, 1.24], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.4, 0, 0.6, 1),
          output: "perceptual-scale",
        })}
        originX="45%"
        originY="32%"
        blur={interpolate(frame, [0, 12, 34, 44, 66, 84, 104], [14, 12, 0, 0, 5, 5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
        feather={[22, 14, 0, 0]}
      />

      {/* Midground serum droplets between model and camera */}
      <Droplet x={interpolate(frame, [0, 120], [860, 760])} y={interpolate(frame, [0, 120], [300, 270])} size={54} blur={1} />
      <Droplet x={interpolate(frame, [0, 120], [960, 900])} y={interpolate(frame, [0, 120], [760, 800])} size={30} blur={2} />

      {/* Hikari — enters big from the left foreground, settles, then the camera pushes past it */}
      <Product
        name="Hikari · foreground entrance"
        id="hikari"
        x={interpolate(frame, [30, 62, 84, 118], [-520, 470, 430, -700], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.2, 0.75, 0.35, 1),
        })}
        y={interpolate(frame, [30, 62, 84, 118], [640, 560, 552, 600], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
        width={interpolate(frame, [30, 62, 84, 118], [900, 580, 600, 1300], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.5, 0, 0.7, 1),
        })}
        rotateY={interpolate(frame, [30, 62, 118], [12, 4, -6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        rotateZ={interpolate(frame, [30, 62], [-6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        blur={interpolate(frame, [30, 56, 84, 112], [26, 0, 0, 22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        sweep={interpolate(frame, [58, 84], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={interpolate(frame, [30, 33], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />

      {/* Foreground glass slab (depth, slides opposite to the push) */}
      <Glass
        x={interpolate(frame, [0, 120], [1700, 2100])}
        y={interpolate(frame, [0, 120], [930, 980])}
        w={700}
        h={260}
        rot={-14}
        tint="250,170,180"
        blur={14}
        opacity={0.7}
      />

      {/* Dr.Althea tube — crosses the lens right → left into the white TubeWipe */}
      <Product
        name="Dr.Althea tube · lens pass"
        id="altheaTube"
        x={interpolate(frame, [92, 119], [2150, -300], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.5, 0, 0.9, 0.7),
        })}
        y={interpolate(frame, [92, 119], [700, 540], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        width={interpolate(frame, [92, 119], [380, 1100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.6, 0, 1, 1),
        })}
        rotateZ={-8}
        blur={interpolate(frame, [92, 112], [10, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={interpolate(frame, [91, 94], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Dust seed="v2s1d" count={30} color="255,245,240" vy={-0.4} opacity={0.6} />
    </AbsoluteFill>
  );
};
