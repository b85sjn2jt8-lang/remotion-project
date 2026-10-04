import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Pink-magenta lens reflections (the pink accent in a blue/gold world).
const PinkFlare: React.FC<{ progress: number }> = ({ progress }) => (
  <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
    {[0.15, 0.32, 0.55, 0.8].map((k, i) => (
      <div
        key={k}
        style={{
          position: "absolute",
          left: 1700 - k * 1500 - progress * 120 * (i + 1),
          top: 80 + k * 820,
          width: 70 + i * 60,
          height: 70 + i * 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,120,180,${0.32 - i * 0.05}) 0%, rgba(255,120,180,0) 70%)`,
          filter: "blur(2px)",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: -200,
        top: 60,
        width: 2400,
        height: 18,
        rotate: "-8deg",
        background: "linear-gradient(90deg, rgba(255,140,190,0), rgba(255,140,190,0.35), rgba(255,220,200,0.5), rgba(255,140,190,0))",
        filter: "blur(6px)",
        opacity: 0.6 + 0.3 * Math.sin(progress * 6),
      }}
    />
  </AbsoluteFill>
);

const BeachModel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 88], [1.0, 1.07], { ...c, easing: Easing.bezier(0.4, 0, 0.6, 1), output: "perceptual-scale" });
  const x = interpolate(frame, [0, 88], [1440, 1415], c);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #74b9ec 0%, #a9d6f5 38%, #36a6d6 46%, #1f8fc4 60%, #f4dcc0 78%, #efcfae 100%)", overflow: "hidden" }}>
      {/* ocean shimmer */}
      <div
        style={{
          position: "absolute",
          left: -100,
          right: -100,
          top: 470,
          height: 300,
          background: "repeating-linear-gradient(178deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0) 14px)",
          backgroundPositionX: `${frame * 4}px`,
          opacity: 0.55,
          filter: "blur(1px)",
        }}
      />
      <ModelPlate name="Beach · model" id="beach" x={x} y={560} height={1340} zoom={zoom} originX="40%" originY="24%" feather={[22, 0, 0, 0]} />
      <Headline tier="h1"
        name="SUN-KISSED. PROTECTED."
        lines={["SUN-KISSED.", "PROTECTED."]}
        x={120}
        y={330} 
        inAt={14}
        outAt={74}
        driftX={-60}
        shadow="0 6px 34px rgba(20,70,120,0.45)"
      />
      {/* person cut-out on top: the copy passes behind her hat and hair */}
      <ModelPlate name="Beach · model cut-out" id="beachCut" x={x} y={560} height={1340} zoom={zoom} originX="40%" originY="24%" feather={[22, 0, 0, 0]} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 92% 2%, rgba(255,248,225,0.95) 0%, rgba(255,235,190,0.5) 16%, rgba(255,230,180,0) 40%)" }} />
      <PinkFlare progress={frame / 160} />
      <Dust seed="d04" count={34} color="255,255,240" vy={-0.2} vx={-0.6} area={[0, 420, 1920, 360]} opacity={0.8} maxSize={3} />
    </AbsoluteFill>
  );
};

const SkinSunlight: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#3aa6d4", overflow: "hidden" }}>
      <ModelPlate
        name="Beach · skin in sunlight (macro)"
        id="shoulderSea"
        x={interpolate(frame, [0, 42], [985, 950])}
        y={540}
        height={1200}
        zoom={interpolate(frame, [0, 42], [1.06, 1.1], { output: "perceptual-scale" })}
        originX="60%"
      />
      {/* sunlight travelling across the skin */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(255,244,220,0.45) 50%, rgba(255,255,255,0) 62%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [0, 42], [95, 15])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      <PinkFlare progress={1 + frame / 80} />
    </AbsoluteFill>
  );
};

// D · BEACH (0:11.5–0:15.8, 130 f) — final-polish language. Lifestyle first, no product:
// D1 the woman in warm sunlight (slow push; SUN-KISSED. PROTECTED. fades in behind her) →
// D2 macro of sunlit skin with the sea beyond. Water then rises (main timeline) into the
// Hikari hero over water (scene E). The plate shows sunscreen on her cheek; the REAL pouch
// appears only in E.
export const D04Beach: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence name="D1 model in sunlight" durationInFrames={90}>
        <BeachModel />
      </Sequence>
      <Sequence name="D2 skin in sunlight (macro)" from={88} durationInFrames={42}>
        <SkinSunlight />
      </Sequence>
      <Sequence name="D · sun flare across the cut" from={78} durationInFrames={24}>
        <SunFlare />
      </Sequence>
    </AbsoluteFill>
  );
};

const SunFlare: React.FC = () => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [0, 10, 14, 24], [0, 1, 1, 0], c);
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 70% 25%, rgba(255,250,232,1) 0%, rgba(255,226,170,0.8) 25%, rgba(255,200,150,0.25) 60%, rgba(255,200,150,0) 85%)", opacity: k * 0.85 }} />
      <PinkFlare progress={frame / 8} />
    </AbsoluteFill>
  );
};
