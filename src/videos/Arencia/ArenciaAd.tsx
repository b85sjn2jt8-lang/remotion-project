import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { A1TargetLock } from "./A1TargetLock";
import { A2ProductReveal } from "./A2ProductReveal";
import { A3Concentrated } from "./A3Concentrated";
import { A4ToneBalance } from "./A4ToneBalance";
import { A5Ingredients } from "./A5Ingredients";
import { A6FinalHero } from "./A6FinalHero";
import { chromeRise, depthDolly, glassEdge, lightBlade, pulseFill } from "./transitions";

/**
 * ARENCIA TXA Booster Shot — "Target the spot".
 * ONE continuous 15s looping spot, 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 522 frames, minus 72 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "ArenciaAd" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const ArenciaAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#12020C" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 Target lock" durationInFrames={86} premountFor={30}>
          <A1TargetLock />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={pulseFill()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 TXA product reveal" durationInFrames={90} premountFor={30}>
          <A2ProductReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={chromeRise()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="03 Concentrated booster" durationInFrames={88} premountFor={30}>
          <A3Concentrated />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={lightBlade()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 Tone balance" durationInFrames={88} premountFor={30}>
          <A4ToneBalance />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={depthDolly()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="05 Niacinamide + peptides" durationInFrames={82} premountFor={30}>
          <A5Ingredients />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={glassEdge()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="06 Final booster hero" durationInFrames={88} premountFor={30}>
          <A6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
