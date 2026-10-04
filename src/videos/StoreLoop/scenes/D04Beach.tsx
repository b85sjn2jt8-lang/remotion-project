import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
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
  const zoom = interpolate(frame, [0, 72], [1.0, 1.3], { ...c, easing: Easing.bezier(0.4, 0, 0.5, 1), output: "perceptual-scale" });
  const x = interpolate(frame, [0, 72], [1440, 1370], c);
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
        inAt={8}
        outAt={60}
        driftX={-60}
        shadow="0 6px 34px rgba(20,70,120,0.45)"
      />
      {/* person cut-out on top: the copy passes behind her hat and hair */}
      <ModelPlate name="Beach · model cut-out" id="beachCut" x={x} y={560} height={1340} zoom={zoom} originX="40%" originY="24%" feather={[22, 0, 0, 0]} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 92% 2%, rgba(255,248,225,0.95) 0%, rgba(255,235,190,0.5) 16%, rgba(255,230,180,0) 40%)" }} />
      <PinkFlare progress={frame / 72} />
      <Dust seed="d04" count={34} color="255,255,240" vy={-0.2} vx={-0.6} area={[0, 420, 1920, 360]} opacity={0.8} maxSize={3} />
    </AbsoluteFill>
  );
};

const SunscreenMacro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#d9a98a", overflow: "hidden" }}>
      <ModelPlate
        name="Beach · sunscreen texture macro"
        id="beach"
        x={interpolate(frame, [0, 30], [1000, 920])}
        y={1053}
        height={2700}
        zoom={interpolate(frame, [0, 30], [1.34, 1.5], { output: "perceptual-scale" })}
        originX="50%"
        originY="31%"
      />
      {/* sun glint sliding across the cream + skin */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(255,246,225,0.55) 50%, rgba(255,255,255,0) 62%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [0, 30], [100, 0])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      <PinkFlare progress={1 + frame / 30} />
    </AbsoluteFill>
  );
};

const SunscreenHero: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 16, 67], [600, 404, 416], { ...c, easing: Easing.bezier(0.2, 0.8, 0.3, 1) });
  const w = interpolate(frame, [0, 67], [700, 740]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#3aa6d4", overflow: "hidden" }}>
      <ModelPlate name="Beach · sea bokeh" id="shoulderSea" x={interpolate(frame, [0, 67], [1000, 920])} y={420} height={1200} zoom={1.12} blur={16} filter="saturate(1.15)" />
      {/* reflective wet-sand / water band under the product */}
      <div style={{ position: "absolute", left: -100, right: -100, top: 860, bottom: -100, background: "linear-gradient(180deg, rgba(120,200,235,0.9) 0%, rgba(40,140,195,0.95) 100%)" }} />
      <div
        style={{
          position: "absolute",
          left: -300,
          right: -300,
          top: 860,
          bottom: -100,
          background: "repeating-radial-gradient(ellipse 100% 18% at 50% 0%, rgba(255,255,255,0) 0px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0) 22px)",
          backgroundPositionY: `${frame * 2.5}px`,
          opacity: 0.55,
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 86% 6%, rgba(255,250,230,0.95) 0%, rgba(255,240,200,0.35) 20%, rgba(255,230,180,0) 45%)" }} />
      <Product
        name="Hikari · beach hero"
        id="hikari"
        x={interpolate(frame, [0, 67], [930, 990], { easing: Easing.bezier(0.3, 0, 0.5, 1) })}
        y={y}
        width={w}
        rotateY={interpolate(frame, [0, 67], [-8, 6])}
        rotateZ={interpolate(frame, [0, 16, 40], [-5, 1, 0], c)}
        sweep={interpolate(frame, [10, 50], [0, 1], c)}
        wrap="255,226,180"
        cast="20,70,110"
        reflectionGap={Math.max(6, 868 - (y + (w * 1.108) / 2))}
        reflectionOpacity={0.3}
      />
      <PinkFlare progress={2 + frame / 67} />
      <Dust seed="d04h" count={30} color="255,255,245" vy={-0.6} opacity={0.75} />
    </AbsoluteFill>
  );
};

// D · BEACH / SUNSCREEN (0:11.5–0:17.0, 165 f): beauty model in sunlight → macro of the sunscreen
// texture on her skin → sun flare → large Hikari hero over reflective water → water rises into E.
// The model plate shows sunscreen on her cheek; the REAL Hikari pouch appears separately.
export const D04Beach: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence name="D1 model in sunlight (wide → medium)" durationInFrames={72}>
        <BeachModel />
      </Sequence>
      <Sequence name="D2 sunscreen texture macro" from={72} durationInFrames={30}>
        <SunscreenMacro />
      </Sequence>
      <Sequence name="D3 Hikari hero" from={98} durationInFrames={67}>
        <SunscreenHero />
      </Sequence>
      <Sequence name="D · sun flare across the macro → hero cut" from={88} durationInFrames={24}>
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
