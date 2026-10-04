import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// P · FINAL HERO (0:55–1:00, 150 f) — final-polish language.
// Four real products, large and STILL, at different depths in shallow pink water, with
// reflections; the model soft behind; YOUR SKIN. YOUR RITUAL. Only the camera moves: a slow push.
// The secondary products dissolve away one by one (defocus + fade, no flying), leaving the Anua
// jar; the camera approaches it until its pink fills the lens, handing over to the LoopBridge
// (main frames 1781+), which continues into frame 0.
export const P16FinalHero: React.FC = () => {
  const frame = useCurrentFrame();
  const approach = interpolate(frame, [0, 96, 140], [1.0, 1.04, 1.5], { ...c, easing: Easing.bezier(0.55, 0, 0.9, 0.5) });
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 45% 35%, #fff2f4 0%, #f7d0d8 50%, #e9a3b4 100%)", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: approach, transformOrigin: "1600px 760px" }}>
        <ModelPlate name="Model · soft background" id="pool" x={760} y={430} height={1000} zoom={1.05} blur={10} opacity={0.5} feather={[25, 25, 0, 30]} filter="saturate(0.8)" />
        <Headline tier="h1" name="YOUR SKIN. YOUR RITUAL." lines={["YOUR SKIN.", "YOUR RITUAL."]} x={110} y={60} color="#b33a64" inAt={8} outAt={78} driftX={-20} shadow="0 4px 26px rgba(255,255,255,0.75)" />

        {/* shallow pink water floor */}
        <div style={{ position: "absolute", left: -300, right: -300, top: 860, bottom: -300, background: "linear-gradient(180deg, rgba(255,200,215,0.95) 0%, rgba(240,150,175,0.95) 100%)" }} />
        <div
          style={{
            position: "absolute",
            left: -300,
            right: -300,
            top: 860,
            bottom: -300,
            background: "repeating-radial-gradient(ellipse 100% 20% at 50% 0%, rgba(255,255,255,0) 0px, rgba(255,255,255,0.4) 5px, rgba(255,255,255,0) 24px)",
            backgroundPositionY: `${frame * 1.2}px`,
            opacity: 0.45,
          }}
        />

        {/* back: Brilliant (soft) — dissolves last of the secondaries */}
        <Product name="Hero · Brilliant (back)" id="brilliant" x={1000} y={560} width={600} blur={interpolate(frame, [0, 88, 112], [3, 3, 16], c)} opacity={interpolate(frame, [88, 112], [1, 0], c)} reflectionGap={4} reflectionOpacity={0.18} wrap="255,205,220" cast="130,40,70" ground={4} />
        {/* mid-left: Hikari — dissolves first */}
        <Product name="Hero · Hikari" id="hikari" x={560} y={556} width={560} blur={interpolate(frame, [64, 86], [0, 14], c)} opacity={interpolate(frame, [64, 86], [1, 0], c)} reflectionGap={6} reflectionOpacity={0.2} sweep={interpolate(frame, [10, 60], [0, 1], c)} wrap="255,205,220" cast="130,40,70" ground={6} />
        {/* front: Dr.Althea tube — dissolves second */}
        <Product name="Hero · Dr.Althea tube" id="altheaTube" x={960} y={600} width={250} blur={interpolate(frame, [76, 98], [0, 14], c)} opacity={interpolate(frame, [76, 98], [1, 0], c)} reflectionGap={2} reflectionOpacity={0.2} sweep={interpolate(frame, [24, 70], [0, 1], c)} wrap="255,205,220" cast="130,40,70" ground={2} />

        {/* front-right: Anua — the hero that remains */}
        <Product
          name="Hero · Anua"
          id="anua"
          anchor="bottom-right"
          x={1932}
          y={1094}
          width={800}
          blur={interpolate(frame, [104, 140], [0, 22], c)}
          opacity={interpolate(frame, [138, 146], [1, 0], c)}
          sweep={interpolate(frame, [30, 90], [0, 1], { ...c, easing: Easing.bezier(0.45, 0, 0.55, 1) })}
          wrap="255,200,215"
          cast="130,40,70"
        />
      </AbsoluteFill>

      {/* slow light sweep across the set */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(100deg, rgba(255,255,255,0) 40%, rgba(255,245,248,0.3) 50%, rgba(255,255,255,0) 60%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [0, 120], [100, 0], c)}% 0%`,
          mixBlendMode: "screen",
        }}
      />
      <Glass x={interpolate(frame, [0, 150], [300, 220])} y={1010} w={640} h={240} rot={-8} tint="255,170,195" blur={20} opacity={0.5} />
      <Dust seed="p16p" count={20} color="255,240,244" vy={-0.2} opacity={0.5} />
    </AbsoluteFill>
  );
};
