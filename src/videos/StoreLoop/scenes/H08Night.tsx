import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// H · NIGHT SKINCARE (0:26–0:31, 150 f). Luxe Organix slot (no reference → Brilliant Rejuv Set).
// Model at her vanity with a cotton pad, candles and pink-magenta edge light; the camera pushes
// through a foreground glass object; NIGHT RESET sits behind her (person cut-out on top);
// the real box large in the right foreground on the glossy vanity, with its reflection.
export const H08Night: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 150], [1.0, 1.1], { output: "perceptual-scale" });
  const x = interpolate(frame, [0, 150], [760, 700]);
  const driftX = Math.sin(frame / 31) * 8;
  const driftY = Math.cos(frame / 43) * 5;
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 40% 40%, #4a1f63 0%, #2a1040 55%, #13061f 100%)", overflow: "hidden" }}>
     <AbsoluteFill style={{ translate: `${driftX}px ${driftY}px`, scale: "1.02" }}>
      <ModelPlate name="Model · night vanity" id="night" x={x} y={560} height={1200} zoom={zoom} originX="40%" originY="40%" feather={[0, 26, 0, 6]} />
      <Headline tier="h1" name="NIGHT RESET" lines={["NIGHT", "RESET"]} x={1130} y={70}  inAt={26} outAt={130} driftX={-50} color="#ffe6f1" shadow="0 0 40px rgba(255,80,170,0.55)" />
      <ModelPlate name="Model · night cut-out" id="nightCut" x={x} y={560} height={1200} zoom={zoom} originX="40%" originY="40%" feather={[0, 26, 0, 6]} />
      {/* pink-magenta edge light from the right */}
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(255,60,160,0) 45%, rgba(255,60,160,0.22) 80%, rgba(255,90,180,0.35) 100%)", mixBlendMode: "screen" }} />

      {/* glossy vanity top + real box with reflection */}
      <div style={{ position: "absolute", left: -100, right: -100, top: 950, bottom: -100, background: "linear-gradient(to bottom, #3a1a52 0%, #1b0a2c 50%, #0e0519 100%)", boxShadow: "inset 0 2px 0 rgba(255,160,220,0.45)" }} />
      <div style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 0 40px rgba(255,90,180,0.35))" }}>
        <Product
          name="Brilliant · night hero"
          id="brilliant"
          x={interpolate(frame, [0, 150], [1500, 1440], { easing: Easing.bezier(0.45, 0, 0.55, 1) })}
          y={interpolate(frame, [0, 75, 150], [660, 650, 656])}
          width={interpolate(frame, [0, 150], [700, 740])}
          rotateY={interpolate(frame, [0, 150], [-5, 3])}
          sweep={interpolate(frame, [60, 100], [0, 1], c)}
          reflectionGap={interpolate(frame, [0, 75, 150], [10, 22, 16])}
          reflectionOpacity={0.22}
          wrap="255,110,200"
          cast="20,0,30"
          ground={interpolate(frame, [0, 75, 150], [10, 22, 16])}
          groundOpacity={0.6}
        />
      </div>

      {/* foreground glass the camera pushes through */}
      <Glass
        x={interpolate(frame, [0, 46], [700, -500], { ...c, easing: Easing.bezier(0.5, 0, 0.7, 1) })}
        y={540}
        w={interpolate(frame, [0, 46], [900, 1600], c)}
        h={1300}
        rot={8}
        tint="255,120,200"
        blur={26}
        opacity={interpolate(frame, [0, 46], [0.85, 0.4], c)}
        radius={400}
      />
      {/* candle / practical bokeh */}
      <div style={{ position: "absolute", left: interpolate(frame, [0, 150], [60, 140]), top: 760, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,170,120,0.5), rgba(255,170,120,0))", filter: "blur(14px)" }} />
      <Dust seed="h08" count={40} color="255,210,240" vy={-0.7} opacity={0.6} maxSize={2.5} />
     </AbsoluteFill>
      {/* persistent foreground glass reflection: a soft diagonal sheen sliding across the lens */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(118deg, rgba(255,255,255,0) 30%, rgba(255,170,220,0.16) 42%, rgba(255,255,255,0.10) 46%, rgba(255,255,255,0) 58%)",
          backgroundSize: "260% 100%",
          backgroundPosition: `${interpolate(frame, [0, 150], [90, 10])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      <div style={{ position: "absolute", left: interpolate(frame, [0, 150], [1500, 1300]), top: -120, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,120,200,0.35), rgba(255,120,200,0))", filter: "blur(26px)" }} />
    </AbsoluteFill>
  );
};
