import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { G1ForestHook } from "./G1ForestHook";
import { G2TriangleReveal } from "./G2TriangleReveal";
import { G3BotanicalWorld } from "./G3BotanicalWorld";
import { G4FoamCleanse } from "./G4FoamCleanse";
import { G5TriangleLanguage } from "./G5TriangleLanguage";
import { G6FinalHero } from "./G6FinalHero";
import { dropletLens, foamCurtain, leafPass, mistDrift } from "./transitions";

/**
 * NATURE SEVEN GREEN Cacumen Biotae | Isatis Indigotica Shampoo Bar —
 * "Botanical Root Ritual". ONE continuous 15s looping spot,
 * 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 522 frames, minus 72 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "SevenGreenAd" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const SevenGreenAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#040C08" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 Forest hook" durationInFrames={86} premountFor={30}>
          <G1ForestHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={leafPass()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 Triangle reveal" durationInFrames={90} premountFor={30}>
          <G2TriangleReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={mistDrift()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="03 Botanical macro world" durationInFrames={88} premountFor={30}>
          <G3BotanicalWorld />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={dropletLens()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 Rich foam" durationInFrames={88} premountFor={30}>
          <G4FoamCleanse />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={foamCurtain()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="05 Triangle language" durationInFrames={82} premountFor={30}>
          <G5TriangleLanguage />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={leafPass()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="06 Final hero" durationInFrames={88} premountFor={30}>
          <G6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
