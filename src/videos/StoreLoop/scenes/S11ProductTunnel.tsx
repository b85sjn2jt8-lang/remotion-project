import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh } from "../fx/Atmosphere";
import { Product } from "../fx/Product";
import type { ProductId } from "../products";

// SCENE 11 — PRODUCT TUNNEL (00:47.00–00:52.00, 150 f).
// Camera flies forward through a white space past exact product plates placed in 3D.
// Only plates with complete silhouettes fly free here (Dr.Althea box + tube, Hikari, Brilliant);
// Anua and Manee plates are cropped in their references, so they are not used as free floaters.
const FOCAL = 1700;

// Camera z over the shot: accelerating forward flight (scene units).
const camZ = (f: number) =>
  interpolate(f, [0, 45, 90, 150], [0, 5.5, 13.5, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const camX = (f: number) => Math.sin(f / 48) * 0.35;

const TunnelItem: React.FC<{ name: string; id: ProductId; X: number; Y: number; Z: number; size: number; yaw: number }> = ({
  name,
  id,
  X,
  Y,
  Z,
  size,
  yaw,
}) => {
  const frame = useCurrentFrame();
  const dz = Z - camZ(frame);
  if (dz < 0.35) return null;
  const k = FOCAL / dz;
  const bob = Math.sin(frame / 22 + Z) * 0.04;
  return (
    <Product
      name={name}
      id={id}
      x={960 + (X - camX(frame)) * k}
      y={540 + (Y + bob) * k}
      width={size * k}
      rotateY={yaw + Math.sin(frame / 30 + X) * 2}
      blur={Math.min(30, Math.abs(dz - 3.5) * 0.45 + (dz < 1.8 ? (1.8 - dz) * 18 : 0))}
      opacity={interpolate(dz, [18, 24], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
    />
  );
};

export const S11ProductTunnel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 52%, #ffffff 0%, #f8f6f5 40%, #ebe7e5 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          top: 600,
          bottom: -200,
          background: "linear-gradient(to bottom, rgba(232,228,226,0.0), rgba(232,228,226,0.9))",
        }}
      />
      <Bokeh
        seed="s11"
        count={18}
        colors={["rgba(250,205,215,0.9)", "rgba(255,230,190,0.9)", "rgba(255,255,255,0.9)"]}
        minSize={60}
        maxSize={200}
        zoom={0.006}
        opacity={0.5}
        blur={12}
      />

      {/* Furthest first so nearer plates draw on top */}
      <TunnelItem name="Tunnel · Brilliant 2" id="brilliant" X={0.37} Y={-0.1} Z={28} size={2.47} yaw={-3} />
      <TunnelItem name="Tunnel · Hikari 2" id="hikari" X={-0.62} Y={-0.42} Z={24} size={1.48} yaw={6} />
      <TunnelItem name="Tunnel · Dr.Althea box 2" id="altheaBox" X={0.87} Y={0.07} Z={21} size={0.88} yaw={-5} />
      <TunnelItem name="Tunnel · Dr.Althea tube 2" id="altheaTube" X={-0.93} Y={0.17} Z={18} size={0.6} yaw={4} />
      <TunnelItem name="Tunnel · Brilliant 1" id="brilliant" X={1.05} Y={0.39} Z={15} size={2.47} yaw={-4} />
      <TunnelItem name="Tunnel · Hikari 1" id="hikari" X={-1.12} Y={-0.39} Z={12} size={1.48} yaw={6} />
      <TunnelItem name="Tunnel · Dr.Althea tube 1" id="altheaTube" X={0.99} Y={-0.35} Z={9} size={0.6} yaw={-4} />
      <TunnelItem name="Tunnel · Dr.Althea box 1" id="altheaBox" X={-0.93} Y={0.24} Z={6.5} size={0.88} yaw={5} />

      {/* Final lens pass: Brilliant box crosses R→L, then a magenta cover for the hard cut */}
      <Product
        name="Tunnel · Brilliant lens pass"
        id="brilliant"
        x={interpolate(frame, [118, 149], [2300, -900], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.4, 0, 0.9, 0.6),
        })}
        y={540}
        width={interpolate(frame, [118, 149], [500, 2600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        blur={interpolate(frame, [118, 140], [4, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        opacity={interpolate(frame, [116, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          bottom: -60,
          left: interpolate(frame, [134, 144], [1920, -200], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.5, 0, 1, 1),
          }),
          width: 2600,
          background: "linear-gradient(to right, rgba(214,30,120,0) 0px, #d81e78 260px, #e2368a 1400px, #cc1a6e 2600px)",
          filter: "blur(10px)",
        }}
      />
    </AbsoluteFill>
  );
};
