import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { K1Origin } from "./K1Origin";
import { K2AmberReveal } from "./K2AmberReveal";
import { K3Centella } from "./K3Centella";
import { K4WateryEssence } from "./K4WateryEssence";
import { K5SootheHydrate } from "./K5SootheHydrate";
import { K6FinalHero } from "./K6FinalHero";
import { amberSwell, centellaGlide, dropSplit, sandVeil, shadowPass } from "./transitions";

/**
 * SKIN1004 Madagascar Centella — "From Madagascar. Back to calm."
 * ONE continuous 15s looping spot, 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 522 frames, minus 72 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "Skin1004Ad" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const Skin1004Ad: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#8E6C35" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 Madagascar origin" durationInFrames={86} premountFor={30}>
          <K1Origin />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={centellaGlide()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 Amber product reveal" durationInFrames={90} premountFor={30}>
          <K2AmberReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={sandVeil()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="03 Centella" durationInFrames={88} premountFor={30}>
          <K3Centella />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={dropSplit()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 Watery essence" durationInFrames={88} premountFor={30}>
          <K4WateryEssence />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={amberSwell()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="05 Soothe and hydrate" durationInFrames={82} premountFor={30}>
          <K5SootheHydrate />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={shadowPass()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="06 Final Madagascar hero" durationInFrames={88} premountFor={30}>
          <K6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
