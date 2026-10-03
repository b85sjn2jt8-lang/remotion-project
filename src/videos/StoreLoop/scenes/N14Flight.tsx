import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Bokeh } from "../fx/Atmosphere";
import { Glass } from "../fx/Layers";
import { Product } from "../fx/Product";
import type { ProductId } from "../products";

// N · PRODUCT FLIGHT (0:47.5–0:53, 165 f). A 3D beauty space: real product plates and pink glass
// panels live at Z-depths; the camera flies THROUGH them (perspective projection), so they pass
// above, below, left, right and straight past the lens with parallax, depth blur and fade-in.
// Only plates with complete silhouettes fly free (Anua/Manee plates are cropped in the references).
const F = 1400;
const camZ = (f: number) => interpolate(f, [0, 60, 120, 165], [0, 7, 15, 22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const camX = (f: number) => Math.sin(f / 40) * 0.25;
const camY = (f: number) => Math.cos(f / 55) * 0.12;
const roll = (f: number) => Math.sin(f / 45) * 3;

const Fly: React.FC<{ name: string; id: ProductId; X: number; Y: number; Z: number; size: number; yaw: number }> = ({ name, id, X, Y, Z, size, yaw }) => {
  const frame = useCurrentFrame();
  const dz = Z - camZ(frame);
  if (dz < 0.25 || dz > 8.5) return null;
  const k = F / dz;
  return (
    <Product
      name={name}
      id={id}
      x={960 + (X - camX(frame)) * k}
      y={540 + (Y - camY(frame)) * k}
      width={size * k}
      rotateY={yaw + Math.sin(frame / 25 + Z) * 3}
      rotateZ={Math.sin(frame / 33 + X) * 4}
      blur={Math.min(34, Math.abs(dz - 3) * 1.2 + (dz < 1.4 ? (1.4 - dz) * 26 : 0))}
      opacity={interpolate(dz, [6.5, 8.5], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      sweep={((frame + Z * 10) % 60) / 60}
    />
  );
};

const Pane: React.FC<{ X: number; Y: number; Z: number; w: number; h: number; rot: number }> = ({ X, Y, Z, w, h, rot }) => {
  const frame = useCurrentFrame();
  const dz = Z - camZ(frame);
  if (dz < 0.25 || dz > 12) return null;
  const k = F / dz;
  return (
    <Glass
      x={960 + (X - camX(frame)) * k}
      y={540 + (Y - camY(frame)) * k}
      w={w * k}
      h={h * k}
      rot={rot}
      tint="255,150,190"
      blur={Math.min(30, Math.abs(dz - 3) * 3)}
      opacity={interpolate(dz, [9, 12], [0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      radius={60}
    />
  );
};

export const N14Flight: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, #fff4f6 0%, #f9d7df 45%, #eba9ba 100%)", overflow: "hidden" }}>
      <AbsoluteFill style={{ rotate: `${roll(frame)}deg`, scale: "1.06" }}>
        <Bokeh seed="n14" count={22} colors={["rgba(255,255,255,0.9)", "rgba(250,170,195,0.9)"]} minSize={60} maxSize={220} zoom={0.008} opacity={0.6} blur={12} />
        {/* far → near (draw order) */}
        <Pane X={-1.1} Y={0.2} Z={21} w={1.4} h={2.2} rot={14} />
        <Fly name="Flight · Brilliant (far)" id="brilliant" X={0.35} Y={-0.05} Z={20} size={1.99} yaw={-4} />
        <Fly name="Flight · Hikari (left, low)" id="hikari" X={-0.55} Y={0.38} Z={17.5} size={1.42} yaw={8} />
        <Pane X={0.9} Y={-0.5} Z={16} w={1.2} h={1.8} rot={-18} />
        <Fly name="Flight · Dr.Althea box (right, high)" id="altheaBox" X={0.6} Y={-0.42} Z={15} size={0.8} yaw={-6} />
        <Fly name="Flight · Dr.Althea tube (left)" id="altheaTube" X={-0.62} Y={-0.1} Z={12.5} size={0.53} yaw={6} />
        <Pane X={-0.6} Y={0.55} Z={11} w={1.6} h={1.0} rot={8} />
        <Fly name="Flight · Brilliant (below)" id="brilliant" X={0.15} Y={0.6} Z={10} size={1.99} yaw={4} />
        <Fly name="Flight · Hikari (right)" id="hikari" X={0.7} Y={0.05} Z={7.5} size={1.42} yaw={-8} />
        <Fly name="Flight · Dr.Althea box (above)" id="altheaBox" X={-0.25} Y={-0.62} Z={5} size={0.8} yaw={5} />
        <Pane X={0.2} Y={0.1} Z={3.5} w={1.0} h={1.6} rot={-10} />
      </AbsoluteFill>
      {/* light sweep through the space */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(100deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 60%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${100 - ((frame % 80) / 80) * 100}% 0%`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
