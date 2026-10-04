import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Grain } from "./fx/Atmosphere";
import {
  GlassWipe,
  GoldenBloom,
  LeafWipe,
  LensPass,
  LiquidWipe,
  LoopBridge,
  SplashWipe,
} from "./fx/Wipes";
import { HairStrands } from "./fx/Layers";
import { A01Opening } from "./scenes/A01Opening";
import { B02PinkWorld } from "./scenes/B02PinkWorld";
import { D04Beach } from "./scenes/D04Beach";
import { E05PoolHero } from "./scenes/E05PoolHero";
import { F06Green } from "./scenes/F06Green";
import { H08Night } from "./scenes/H08Night";
import { J10Hair } from "./scenes/J10Hair";
import { K11Morning } from "./scenes/K11Morning";
import { L12PinkCollagen } from "./scenes/L12PinkCollagen";
import { C03Dropper, G07Cream, I09EyeTexture, M13BrandPhoto, O15FlowerDrop } from "./scenes/Macros";
import { N14Flight } from "./scenes/N14Flight";
import { P16FinalHero } from "./scenes/P16FinalHero";
import { interpolate, staticFile, useCurrentFrame } from "remotion";

const HairWipe: React.FC<{ seed: string }> = ({ seed }) => {
  const frame = useCurrentFrame();
  return (
    <HairStrands
      seed={seed}
      progress={interpolate(frame, [0, 24], [0.1, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      count={220}
      thickness={10}
      blur={4}
      spread={1700}
    />
  );
};

/**
 * VERSION 3 — 60 s in-store beauty loop. 1920x1080 @ 30 fps is the FINAL master (no 4K).
 * Scene ranges (frames): A 0–150 · B 150–300 · C 300–345 · D 345–510 · E 510–600 · F 600–750 ·
 * G 750–780 · H 780–930 · I 930–960 · J 960–1110 · K 1110–1260 · L 1260–1380 · M 1380–1425 ·
 * N 1425–1590 · O 1590–1650 · P 1650–1800.
 * Every transition is ONE element placed ACROSS its cut; the LoopBridge (real Anua jar lens pass)
 * is split across the loop point (frames 1781–1799 and 0–20).
 */
export const StoreLoop: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f6d6dc" }}>
      <Sequence name="A Opening"  durationInFrames={150} premountFor={30}>
        <A01Opening />
      </Sequence>
      <Sequence name="B Pink K-beauty world" from={150} durationInFrames={150} premountFor={30}>
        <B02PinkWorld />
      </Sequence>
      <Sequence name="C Macro · dropper" from={300} durationInFrames={45} premountFor={30}>
        <C03Dropper />
      </Sequence>
      <Sequence name="D Beach / sunscreen" from={345} durationInFrames={165} premountFor={30}>
        <D04Beach />
      </Sequence>
      <Sequence name="E Water product hero" from={510} durationInFrames={90} premountFor={30}>
        <E05PoolHero />
      </Sequence>
      <Sequence name="F Green botanical (AXIS-Y slot)" from={600} durationInFrames={150} premountFor={30}>
        <F06Green />
      </Sequence>
      <Sequence name="G Macro · cream" from={750} durationInFrames={30} premountFor={30}>
        <G07Cream />
      </Sequence>
      <Sequence name="H Night skincare (Luxe Organix slot)" from={780} durationInFrames={150} premountFor={30}>
        <H08Night />
      </Sequence>
      <Sequence name="I Macro · skin texture" from={930} durationInFrames={30} premountFor={30}>
        <I09EyeTexture />
      </Sequence>
      <Sequence name="J Hair beauty" from={960} durationInFrames={150} premountFor={30}>
        <J10Hair />
      </Sequence>
      <Sequence name="K Filipina morning" from={1110} durationInFrames={150} premountFor={30}>
        <K11Morning />
      </Sequence>
      <Sequence name="L Pink collagen (A Bonne slot)" from={1260} durationInFrames={120} premountFor={30}>
        <L12PinkCollagen />
      </Sequence>
      <Sequence name="M Manee brand photo" from={1380} durationInFrames={45} premountFor={30}>
        <M13BrandPhoto />
      </Sequence>
      <Sequence name="N Product flight" from={1425} durationInFrames={165} premountFor={30}>
        <N14Flight />
      </Sequence>
      <Sequence name="O Macro · flower drop" from={1590} durationInFrames={60} premountFor={30}>
        <O15FlowerDrop />
      </Sequence>
      <Sequence name="P Final hero" from={1650} durationInFrames={150} premountFor={30}>
        <P16FinalHero />
      </Sequence>

      {/* ---- transitions across the cuts ---- */}
      <Sequence name="A→B Dr.Althea box lens pass" from={136} durationInFrames={26}>
        <LensPass id="altheaBox" filterId="t-ab" fromX={3000} toX={-1100} frames={26} y={560} width={1500} rotate={8} blur={10} motionBlur={36} />
      </Sequence>
      <Sequence name="B→C serum glass refraction" from={290} durationInFrames={24}>
        <GlassWipe tint="250,170,195" />
      </Sequence>
      <Sequence name="C→D sun bloom" from={333} durationInFrames={25}>
        <GoldenBloom />
      </Sequence>
      <Sequence name="D→E reflective water rises" from={490} durationInFrames={34}>
        <LiquidWipe id="liq-water" coverAt={20} drainEnd={34} colors={["#bfe9fb", "#5cb8e0", "#1f86bd"]} ripples peak={360} bodyOpacity={0.78} />
      </Sequence>
      <Sequence name="E→F water splash" from={588} durationInFrames={26}>
        <SplashWipe />
      </Sequence>
      <Sequence name="F→G leaf" from={742} durationInFrames={24}>
        <LeafWipe />
      </Sequence>
      <Sequence name="G→H Brilliant lens pass (no white frame)" from={764} durationInFrames={26}>
        <LensPass id="brilliant" filterId="t-gh" fromX={3400} toX={-1500} frames={26} y={540} width={2600} rotate={6} blur={12} motionBlur={34} />
      </Sequence>
      <Sequence name="H→I magenta glass refraction" from={918} durationInFrames={24}>
        <GlassWipe tint="255,90,170" />
      </Sequence>
      <Sequence name="I→J hair across lens" from={948} durationInFrames={24}>
        <HairWipe seed="t-ij" />
      </Sequence>
      <Sequence name="J→K hair across lens" from={1098} durationInFrames={24}>
        <HairWipe seed="t-jk" />
      </Sequence>
      <Sequence name="K→L pink liquid rises" from={1238} durationInFrames={36}>
        <LiquidWipe id="liq-pink" coverAt={22} drainEnd={36} texture={staticFile("store-loop/v3/m_pink_liquid.jpg")} />
      </Sequence>
      <Sequence name="L→M glass refraction" from={1368} durationInFrames={24}>
        <GlassWipe tint="255,140,190" />
      </Sequence>
      <Sequence name="M→N Dr.Althea tube lens pass" from={1413} durationInFrames={24}>
        <LensPass id="altheaTube" filterId="t-mn" fromX={2700} toX={-800} frames={24} y={540} width={900} rotate={-12} blur={10} motionBlur={30} />
      </Sequence>
      <Sequence name="N→O Brilliant lens pass" from={1578} durationInFrames={24}>
        <LensPass id="brilliant" filterId="t-no" fromX={3600} toX={-1700} frames={24} y={540} width={3000} rotate={-6} blur={12} motionBlur={36} />
      </Sequence>
      <Sequence name="O→P glass refraction" from={1638} durationInFrames={24}>
        <GlassWipe tint="250,180,200" />
      </Sequence>

      {/* ---- loop bridge: ONE real-product lens pass split across 1799 → 0 ---- */}
      <Sequence name="Loop bridge · out" from={1781} durationInFrames={19}>
        <LoopBridge offset={0} />
      </Sequence>
      <Sequence name="Loop bridge · in"  durationInFrames={21}>
        <LoopBridge offset={19} />
      </Sequence>

      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
