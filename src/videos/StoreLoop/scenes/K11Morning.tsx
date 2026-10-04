import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Headline } from "../fx/Type";
import { GlassWipe } from "../fx/Wipes";

// K1 · the model alone in morning light: hands to her cheeks, window behind. FRESH START. fades
// in over the bright wall beside her. Camera: slow handheld-style push (tiny drift).
const ModelBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const hx = Math.sin(frame / 23) * 3;
  const hy = Math.cos(frame / 29) * 2;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(95deg, #fffaf3 0%, #f7ebe0 50%, #eedbcb 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="Model · morning (Filipina)"
        id="morning"
        x={interpolate(frame, [0, 104], [1040, 1010]) + hx}
        y={560 + hy}
        height={1200}
        zoom={interpolate(frame, [0, 104], [1.0, 1.05], { output: "perceptual-scale" })}
        originX="58%"
        originY="38%"
        feather={[14, 0, 0, 0]}
      />
      <Headline tier="h1" name="FRESH START." lines={["FRESH", "START."]} x={90} y={240} color="#c2416b" inAt={18} outAt={84} driftX={-24} shadow="0 6px 30px rgba(255,255,255,0.7)" />
      <AbsoluteFill
        style={{
          background: "repeating-linear-gradient(115deg, rgba(255,250,235,0) 0px, rgba(255,250,235,0.2) 60px, rgba(255,250,235,0) 140px)",
          maskImage: "linear-gradient(to left, black 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 60%)",
          translate: interpolate(frame, [0, 104], ["16px 0px", "-16px 0px"]),
          filter: "blur(6px)",
        }}
      />
      <Glass x={interpolate(frame, [0, 104], [240, 180])} y={1010} w={640} h={240} rot={-6} tint="250,185,205" blur={18} opacity={0.5} />
      <Dust seed="k11m" count={20} color="255,250,240" vy={-0.2} vx={0.2} opacity={0.55} />
    </AbsoluteFill>
  );
};

// K2 · environment only: her vanity in the window light (glassware, flowers). Slow push.
const VanityBeat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#f6e5e3", overflow: "hidden" }}>
      <ModelPlate
        name="Morning · vanity (environment)"
        id="macroVanity"
        x={interpolate(frame, [0, 64], [980, 940])}
        y={540}
        height={1440}
        zoom={interpolate(frame, [0, 64], [1.0, 1.05], { output: "perceptual-scale" })}
        originX="55%"
        originY="55%"
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(255,248,236,0.35) 50%, rgba(255,255,255,0) 62%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [0, 64], [90, 20])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      <Dust seed="k11v" count={20} color="255,250,240" vy={-0.2} vx={0.2} opacity={0.55} />
    </AbsoluteFill>
  );
};

// K · FILIPINA MORNING (0:37–0:42, 150 f): the model (K1) → glass refraction → her vanity (K2).
// No product is forced into this lifestyle beat.
export const K11Morning: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="K1 model only" durationInFrames={104}>
      <ModelBeat />
    </Sequence>
    <Sequence name="K2 vanity environment" from={86} durationInFrames={64}>
      <VanityBeat />
    </Sequence>
    <Sequence name="K · glass refraction" from={72} durationInFrames={30}>
      <GlassWipe tint="252,200,210" frames={30} />
    </Sequence>
  </AbsoluteFill>
);

