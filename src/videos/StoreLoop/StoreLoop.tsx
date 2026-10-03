import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Grain } from "./fx/Atmosphere";
import {
  CurtainWipe,
  DropletWipe,
  FrondWipe,
  GoldenBloom,
  LeafWipe,
  LiquidWipe,
  LoopBridge,
  TubeWipe,
  WhiteBloom,
} from "./fx/Wipes";
import { S01ProductFlight } from "./scenes/S01ProductFlight";
import { S02AnuaReveal } from "./scenes/S02AnuaReveal";
import { S03AnuaPinkWorld } from "./scenes/S03AnuaPinkWorld";
import { S04GreenWorld } from "./scenes/S04GreenWorld";
import { S05NightWorld } from "./scenes/S05NightWorld";
import { S06CreamMacro } from "./scenes/S06CreamMacro";
import { S07HikariSun } from "./scenes/S07HikariSun";
import { S08Vanity } from "./scenes/S08Vanity";
import { S09PinkCollagen } from "./scenes/S09PinkCollagen";
import { S10MorningLifestyle } from "./scenes/S10MorningLifestyle";
import { S11ProductTunnel } from "./scenes/S11ProductTunnel";
import { S12Montage } from "./scenes/S12Montage";
import { S13FinalHero } from "./scenes/S13FinalHero";

/**
 * 60 s in-store beauty loop — production/store-loop/PRODUCTION_PLAN.md.
 * Authored in 1920x1080 design pixels; render with --scale=2 for the 3840x2160 master.
 * Scene frame ranges follow the plan's frame map exactly (1800 frames @ 30 fps).
 * Transitions are single elements placed ACROSS each cut (above the scenes), and the
 * LoopBridge is split across the loop point (frames 1781–1799 and 0–9).
 */
export const StoreLoop: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <Sequence name="S01 Product Flight"  durationInFrames={120} premountFor={30}>
        <S01ProductFlight />
      </Sequence>
      <Sequence name="S02 Anua Reveal (model slot)" from={120} durationInFrames={120} premountFor={30}>
        <S02AnuaReveal />
      </Sequence>
      <Sequence name="S03 Anua Pink World" from={240} durationInFrames={150} premountFor={30}>
        <S03AnuaPinkWorld />
      </Sequence>
      <Sequence name="S04 Green World (AXIS-Y slot)" from={390} durationInFrames={150} premountFor={30}>
        <S04GreenWorld />
      </Sequence>
      <Sequence name="S05 Night (Luxe Organix slot)" from={540} durationInFrames={150} premountFor={30}>
        <S05NightWorld />
      </Sequence>
      <Sequence name="S06 Cream Macro" from={690} durationInFrames={120} premountFor={30}>
        <S06CreamMacro />
      </Sequence>
      <Sequence name="S07 Hikari Sun" from={810} durationInFrames={150} premountFor={30}>
        <S07HikariSun />
      </Sequence>
      <Sequence name="S08 Vanity (hair model slot)" from={960} durationInFrames={150} premountFor={30}>
        <S08Vanity />
      </Sequence>
      <Sequence name="S09 Pink Collagen (A Bonne slot)" from={1110} durationInFrames={150} premountFor={30}>
        <S09PinkCollagen />
      </Sequence>
      <Sequence name="S10 Morning Lifestyle (model slot)" from={1260} durationInFrames={150} premountFor={30}>
        <S10MorningLifestyle />
      </Sequence>
      <Sequence name="S11 Product Tunnel" from={1410} durationInFrames={150} premountFor={30}>
        <S11ProductTunnel />
      </Sequence>
      <Sequence name="S12 Montage (model slots)" from={1560} durationInFrames={120} premountFor={30}>
        <S12Montage />
      </Sequence>
      <Sequence name="S13 Final Hero" from={1680} durationInFrames={120} premountFor={30}>
        <S13FinalHero />
      </Sequence>

      {/* Transitions across the cuts */}
      <Sequence name="T1→2 tube lens pass" from={108} durationInFrames={18}>
        <TubeWipe />
      </Sequence>
      <Sequence name="T3→4 droplet lens wipe" from={376} durationInFrames={24}>
        <DropletWipe />
      </Sequence>
      <Sequence name="T4→5 leaf wipe" from={532} durationInFrames={24}>
        <LeafWipe />
      </Sequence>
      <Sequence name="T5→6 moonlight bloom" from={670} durationInFrames={30}>
        <WhiteBloom peakAt={18} hold={3} fadeOut={9} />
      </Sequence>
      <Sequence name="T6→7 golden bloom" from={797} durationInFrames={25}>
        <GoldenBloom />
      </Sequence>
      <Sequence name="T7→8 palm frond wipe" from={952} durationInFrames={24}>
        <FrondWipe />
      </Sequence>
      <Sequence name="T9→10 liquid surge" from={1230} durationInFrames={45}>
        <LiquidWipe coverAt={22} drainEnd={45} />
      </Sequence>
      <Sequence name="T10→11 sheer curtain" from={1398} durationInFrames={30}>
        <CurtainWipe />
      </Sequence>

      {/* Loop bridge: end part (t 0–18) and start part (t 19–28) of ONE element */}
      <Sequence name="Loop bridge · out" from={1781} durationInFrames={19}>
        <LoopBridge offset={0} />
      </Sequence>
      <Sequence name="Loop bridge · in"  durationInFrames={10}>
        <LoopBridge offset={19} />
      </Sequence>

      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
