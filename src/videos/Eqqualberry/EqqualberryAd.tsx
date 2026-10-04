import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { E1Flood } from "./E1Flood";
import { E2Hero } from "./E2Hero";
import { E3Glacier } from "./E3Glacier";
import { E4Layers } from "./E4Layers";
import { E5Ceramides } from "./E5Ceramides";
import { E6FinalHero } from "./E6FinalHero";
import {
  frostClear,
  macroPlunge,
  rippleRefract,
  sphereApproach,
  waterWall,
} from "./transitions";

/**
 * EQQUALBERRY Blue Blow Hyaltoin Flooding Serum — ONE continuous 15s
 * looping spot, 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 522 frames, minus 72 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "EqqualberryAd" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const EqqualberryAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A5794" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 The flood" durationInFrames={85} premountFor={30}>
          <E1Flood />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={rippleRefract()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="02 Product hero" durationInFrames={88} premountFor={30}>
          <E2Hero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={waterWall()} timing={linearTiming({ durationInFrames: 18 })} />
        <TransitionSeries.Sequence name="03 Glacier water" durationInFrames={90} premountFor={30}>
          <E3Glacier />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={frostClear()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 Multi-layer hydration" durationInFrames={88} premountFor={30}>
          <E4Layers />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={macroPlunge()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="05 5 Ceramides" durationInFrames={76} premountFor={30}>
          <E5Ceramides />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={sphereApproach()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="06 Final flood hero" durationInFrames={95} premountFor={30}>
          <E6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
