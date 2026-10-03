import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { HairStrands, ModelPlate } from "../fx/Layers";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 8 — HAIR / HUMAN MOTION (00:32.00–00:37.00, 150 f) — V2.
// Full-bleed hair-and-face plate with a lateral track; dark hair strands sweep through the
// foreground as natural wipes (in at the start, out at the end into Scene 9). The real Dr.Althea
// box + tube stand large on a vanity in the right foreground (no haircare product was uploaded,
// so no hair claim is made). Placeholder plate: replace with a real hair-motion clip when available.
export const S08Vanity: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#2a1c16", overflow: "hidden" }}>
      <ModelPlate
        name="Model A · hair"
        id="hairWide"
        x={interpolate(frame, [0, 150], [1060, 860], { easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        y={560}
        height={1220}
        zoom={interpolate(frame, [0, 150], [1.0, 1.08], { output: "perceptual-scale" })}
        originX="55%"
        originY="40%"
        blur={interpolate(frame, [0, 14, 100, 125], [6, 0, 0, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        filter="saturate(0.9) sepia(0.08)"
      />
      {/* Warm window light rolling across her */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(100deg, rgba(255,240,215,0) 20%, rgba(255,240,215,0.35) 40%, rgba(255,240,215,0) 60%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [0, 150], [100, 0])}% 0%`,
          mixBlendMode: "screen",
        }}
      />

      {/* Vanity ledge + real products, right foreground (fastest layer) */}
      <AbsoluteFill style={{ translate: interpolate(frame, [0, 150], ["120px 0px", "-150px 0px"]) }}>
        <div
          style={{
            position: "absolute",
            left: 1100,
            top: 930,
            width: 1100,
            height: 300,
            background: "linear-gradient(to bottom, #f6ecdf 0%, #e3d0b6 12%, #cdb491 100%)",
            boxShadow: "0 -6px 30px rgba(0,0,0,0.25)",
          }}
        />
        <FloorShadow x={1420} y={936} width={380} opacity={0.4} color="70,45,25" />
        <Product
          name="Dr.Althea box · vanity"
          id="altheaBox"
          x={1420}
          y={936 - 330}
          width={340}
          rotateY={interpolate(frame, [0, 150], [-4, 3])}
          blur={interpolate(frame, [0, 14, 100, 125], [0, 4, 4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
        <FloorShadow x={1720} y={940} width={300} opacity={0.4} color="70,45,25" />
        <Product
          name="Dr.Althea tube · vanity"
          id="altheaTube"
          x={1720}
          y={940 - 305}
          width={200}
          rotateY={interpolate(frame, [0, 150], [5, -3])}
          blur={interpolate(frame, [0, 14, 100, 125], [0, 4, 4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          sweep={interpolate(frame, [104, 134], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      </AbsoluteFill>

      {/* Foreground hair strands: wipe-in at the start, drifting strands, wipe-out at the end */}
      <HairStrands
        seed="v2s8-in"
        progress={interpolate(frame, [0, 22], [0.42, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.6, 1) })}
        count={140}
        thickness={9}
        blur={4}
        spread={1500}
      />
      <HairStrands
        seed="v2s8-drift"
        progress={interpolate(frame, [20, 130], [0.08, 0.62])}
        count={14}
        thickness={3}
        blur={6}
        opacity={0.5}
        spread={700}
      />
      <HairStrands
        seed="v2s8-out"
        progress={interpolate(frame, [124, 150], [0.0, 0.62], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.8, 1) })}
        count={160}
        thickness={10}
        blur={4}
        spread={1500}
      />
      <Dust seed="v2s8" count={28} color="255,240,220" vy={-0.2} vx={0.3} opacity={0.6} />
    </AbsoluteFill>
  );
};
