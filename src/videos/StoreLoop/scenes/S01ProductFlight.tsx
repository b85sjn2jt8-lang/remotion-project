import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Dust } from "../fx/Atmosphere";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 1 — PRODUCT FLIGHT HOOK (00:00.00–00:04.00, 120 f).
// Camera already flying forward through a white studio; products arrive from different depths;
// the Dr.Althea tube crosses the lens into the white TubeWipe (main timeline).
export const S01ProductFlight: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#f3f1ef", overflow: "hidden" }}>
      {/* Studio: forward dolly = slow scale-up from the vanishing point */}
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 120], [1, 1.12]),
          transformOrigin: "50% 58%",
          background:
            "radial-gradient(ellipse at 22% 8%, #ffffff 0%, #fbfaf9 30%, #efecea 70%, #e6e2df 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -200,
            right: -200,
            top: 690,
            bottom: -200,
            background: "linear-gradient(to bottom, #ebe7e4 0%, #f6f4f2 22%, #fbfaf9 60%, #f1eeec 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -200,
            right: -200,
            top: 640,
            height: 120,
            background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.85), rgba(255,255,255,0))",
            filter: "blur(20px)",
          }}
        />
      </AbsoluteFill>

      <Bokeh
        seed="s1"
        count={14}
        colors={["rgba(250,200,210,0.9)", "rgba(240,215,170,0.9)", "rgba(255,255,255,0.9)"]}
        minSize={80}
        maxSize={220}
        zoom={0.004}
        opacity={0.45}
        blur={14}
      />
      <Dust seed="s1d" count={30} color="255,250,245" vy={-0.3} vx={0.2} opacity={0.6} />

      {/* Floor shadows (follow their products) */}
      <FloorShadow
        x={interpolate(frame, [0, 35, 75], [520, 520, -420], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        y={interpolate(frame, [0, 75], [740, 860], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        width={interpolate(frame, [0, 75], [220, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={0.18}
      />
      <FloorShadow
        x={interpolate(frame, [36, 66, 119], [960, 960, 960], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        y={interpolate(frame, [36, 119], [770, 800], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        width={interpolate(frame, [36, 66, 119], [0, 540, 660], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={0.22}
      />

      {/* Hikari — far upper-left, descending, then passing out of frame left as we fly by */}
      <Product
        name="Hikari · flight"
        id="hikari"
        x={interpolate(frame, [0, 35, 80], [560, 520, -420], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.45, 0, 0.7, 1),
        })}
        y={interpolate(frame, [0, 35, 80], [280, 360, 430], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.2, 0.8, 0.3, 1),
        })}
        width={interpolate(frame, [0, 35, 80], [280, 360, 720], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.5, 0, 0.8, 1),
        })}
        rotateY={interpolate(frame, [0, 35], [6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        blur={interpolate(frame, [0, 45, 80], [1.5, 0, 7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />

      {/* Dr.Althea box — slides in from the right at mid depth, then exits right */}
      <Product
        name="Dr.Althea box · flight"
        id="altheaBox"
        x={interpolate(frame, [0, 35, 85], [2200, 1500, 2450], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.25, 0.9, 0.35, 1),
        })}
        y={interpolate(frame, [0, 35, 85], [560, 540, 620], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        width={interpolate(frame, [0, 35, 85], [210, 245, 520], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.5, 0, 0.8, 1),
        })}
        rotateY={interpolate(frame, [0, 35, 85], [-6, -2, -5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        blur={interpolate(frame, [40, 85], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />

      {/* Brilliant Rejuv Set — rises from below into the far centre and becomes the hero */}
      <Product
        name="Brilliant · flight"
        id="brilliant"
        x={960}
        y={interpolate(frame, [36, 66, 119], [1500, 470, 455], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}
        width={interpolate(frame, [36, 66, 119], [460, 560, 640], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        rotateY={interpolate(frame, [36, 119], [4, -1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        sweep={interpolate(frame, [70, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        reflectionGap={interpolate(frame, [36, 66, 119], [0, 60, 50], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        reflectionOpacity={0.12}
      />

      {/* Dr.Althea tube — foreground, rises diagonally then crosses the lens right → left */}
      <Product
        name="Dr.Althea tube · lens pass"
        id="altheaTube"
        x={interpolate(frame, [66, 96, 119], [1980, 1500, -500], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.55, 0, 0.9, 0.6),
        })}
        y={interpolate(frame, [66, 96, 119], [1200, 690, 560], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.2, 0.7, 0.4, 1),
        })}
        width={interpolate(frame, [66, 96, 119], [190, 205, 1100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.7, 0, 1, 1),
        })}
        rotateZ={interpolate(frame, [66, 96], [-4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        blur={interpolate(frame, [96, 116], [0, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={interpolate(frame, [64, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};
