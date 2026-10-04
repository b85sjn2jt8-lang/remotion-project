import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// K · FILIPINA MORNING (0:37–0:42, 150 f). Bright apartment, big window, natural sun; she does
// her morning skincare (hands to cheeks). FRESH START. rises over the bright window wall.
// The real Anua jar sits on the vanity in the right foreground (cropped corner off-frame).
// Slow handheld-style dolly (micro drift).
export const K11Morning: React.FC = () => {
  const frame = useCurrentFrame();
  const hx = Math.sin(frame / 13) * 5;
  const hy = Math.cos(frame / 17) * 4;
  const x = interpolate(frame, [0, 150], [1020, 940]) + hx;
  const zoom = interpolate(frame, [0, 150], [1.02, 1.12], { output: "perceptual-scale" });
  return (
    <AbsoluteFill style={{ background: "linear-gradient(95deg, #fffaf3 0%, #f7ebe0 50%, #eedbcb 100%)", overflow: "hidden" }}>
      <ModelPlate name="Model · morning (Filipina)" id="morning" x={x} y={560 + hy} height={1200} zoom={zoom} originX="58%" originY="38%" feather={[12, 0, 0, 0]} />
      <Headline tier="h1" name="FRESH START." lines={["FRESH", "START."]} x={90} y={230}  color="#c2416b" inAt={18} outAt={128} driftX={-50} shadow="0 6px 30px rgba(255,255,255,0.7)" />
      {/* sun rays from the window */}
      <AbsoluteFill
        style={{
          background: "repeating-linear-gradient(115deg, rgba(255,250,235,0) 0px, rgba(255,250,235,0.22) 60px, rgba(255,250,235,0) 140px)",
          maskImage: "linear-gradient(to left, black 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 60%)",
          translate: interpolate(frame, [0, 150], ["30px 0px", "-30px 0px"]),
          filter: "blur(6px)",
        }}
      />
      {/* vanity foreground: real product + pink glass */}
      <div style={{ position: "absolute", inset: 0, translate: interpolate(frame, [0, 150], ["40px 0px", "-90px 0px"]) }}>
        <Product
          name="Anua · morning vanity"
          id="anua"
          anchor="bottom-right"
          x={2030}
          y={1094}
          width={600}
          sweep={interpolate(frame, [60, 100], [0, 1], c)}
          wrap="255,238,215"
          cast="110,70,40"
        />
      </div>
      <Glass x={interpolate(frame, [0, 150], [260, 120])} y={1000} w={600} h={260} rot={-6} tint="250,180,200" blur={16} opacity={0.6} />
      <Dust seed="k11" count={30} color="255,250,240" vy={-0.25} vx={0.3} opacity={0.65} />
      {/* soft handheld shutter of light */}
      <AbsoluteFill style={{ background: "radial-gradient(circle at 85% 10%, rgba(255,252,240,0.6), rgba(255,252,240,0) 40%)", opacity: interpolate(frame, [0, 75, 150], [0.8, 1, 0.85], { easing: Easing.bezier(0.45, 0, 0.55, 1) }) }} />
    </AbsoluteFill>
  );
};
