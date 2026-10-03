import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const out = Easing.bezier(0.5, 0, 0.9, 0.6);

// P · FINAL HERO (0:55–1:00, 150 f). Four real products, large, at different depths, standing in
// shallow pink water; the model softly visible behind. YOUR SKIN. YOUR RITUAL. Camera pulls back,
// products separate, then the Anua jar accelerates toward camera and hands over to the LoopBridge
// (main frames 1781+), which continues into frame 0.
export const P16FinalHero: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 45% 35%, #fff2f4 0%, #f7d0d8 50%, #e9a3b4 100%)", overflow: "hidden" }}>
      <ModelPlate name="Model · soft background" id="pool" x={interpolate(frame, [0, 150], [700, 760])} y={430} height={1000} zoom={interpolate(frame, [0, 150], [1.12, 1.0], { output: "perceptual-scale" })} blur={10} opacity={0.55} feather={[25, 25, 0, 30]} filter="saturate(0.8)" />
      <Headline name="YOUR SKIN. YOUR RITUAL." lines={["YOUR SKIN.", "YOUR RITUAL."]} x={110} y={90} size={96} color="#b33a64" inAt={6} outAt={84} driftX={-40} shadow="0 4px 26px rgba(255,255,255,0.75)" />

      {/* shallow pink water floor */}
      <div style={{ position: "absolute", left: -100, right: -100, top: 860, bottom: -100, background: "linear-gradient(180deg, rgba(255,200,215,0.95) 0%, rgba(240,150,175,0.95) 100%)" }} />
      <div
        style={{
          position: "absolute",
          left: -300,
          right: -300,
          top: 860,
          bottom: -100,
          background: "repeating-radial-gradient(ellipse 100% 20% at 50% 0%, rgba(255,255,255,0) 0px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0) 22px)",
          backgroundPositionY: `${frame * 2}px`,
          opacity: 0.5,
        }}
      />

      <AbsoluteFill style={{ scale: interpolate(frame, [0, 80], [1.08, 1.0], { ...c, easing: Easing.bezier(0.3, 0, 0.5, 1) }), transformOrigin: "900px 600px" }}>
        {/* back: Brilliant (soft) */}
        <Product name="Hero · Brilliant (back)" id="brilliant" x={interpolate(frame, [52, 96], [980, 1400], { ...c, easing: out })} y={interpolate(frame, [52, 96], [560, 420], { ...c, easing: out })} width={600} blur={3} reflectionGap={4} reflectionOpacity={0.18} rotateY={-3} />
        {/* mid-left: Hikari */}
        <Product name="Hero · Hikari" id="hikari" x={interpolate(frame, [48, 92], [560, -420], { ...c, easing: out })} y={interpolate(frame, [0, 48, 92], [560, 556, 520], c)} width={560} reflectionGap={6} reflectionOpacity={0.2} rotateY={interpolate(frame, [0, 92], [6, -4])} sweep={interpolate(frame, [10, 44], [0, 1], c)} />
        {/* front-left: Dr.Althea tube */}
        <Product name="Hero · Dr.Althea tube" id="altheaTube" x={interpolate(frame, [56, 98], [930, 700], { ...c, easing: out })} y={interpolate(frame, [0, 56, 98], [600, 596, 1500], { ...c, easing: out })} width={250} reflectionGap={2} reflectionOpacity={0.2} sweep={interpolate(frame, [20, 52], [0, 1], c)} />
      </AbsoluteFill>

      {/* front-right: Anua — accelerates toward camera into the loop bridge */}
      <Product
        name="Hero · Anua (to lens)"
        id="anua"
        anchor="bottom-right"
        x={interpolate(frame, [0, 70, 128], [1932, 1936, 2500], { ...c, easing: Easing.bezier(0.6, 0, 0.95, 0.7) })}
        y={interpolate(frame, [0, 70, 128], [1094, 1096, 1450], { ...c, easing: Easing.bezier(0.6, 0, 0.95, 0.7) })}
        width={interpolate(frame, [0, 70, 128], [800, 820, 1650], { ...c, easing: Easing.bezier(0.6, 0, 0.95, 0.7) })}
        blur={interpolate(frame, [86, 128], [0, 26], c)}
        opacity={interpolate(frame, [124, 132], [1, 0], c)}
        sweep={interpolate(frame, [24, 60], [0, 1], c)}
      />
      <Glass x={interpolate(frame, [0, 150], [300, 80])} y={1000} w={640} h={240} rot={-8} tint="255,170,195" blur={18} opacity={0.6} />
      <Dust seed="p16" count={26} color="255,240,244" vy={-0.3} opacity={0.6} />
    </AbsoluteFill>
  );
};
