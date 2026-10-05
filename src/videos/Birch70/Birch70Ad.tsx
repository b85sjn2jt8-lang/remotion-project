import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { B1SeventyHook } from "./B1SeventyHook";
import { B2ProductReveal } from "./B2ProductReveal";
import { B3BirchDew } from "./B3BirchDew";
import { B4MoistureLayer } from "./B4MoistureLayer";
import { B5DewAtmosphere } from "./B5DewAtmosphere";
import { B6FinalHero } from "./B6FinalHero";
import { dewRoll, focusShift, frostedGlassSlide, serumSpread } from "./transitions";

/**
 * ANUA Birch 70 Moisture Boosting Serum — "70% Moisture Atmosphere".
 * ONE continuous 15s looping spot, 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 522 frames, minus 72 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "Birch70Ad" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const Birch70Ad: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F7FA" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 The 70 hook" durationInFrames={86} premountFor={30}>
          <B1SeventyHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={frostedGlassSlide("right")} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 Product reveal" durationInFrames={90} premountFor={30}>
          <B2ProductReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={dewRoll()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="03 Birch and dew" durationInFrames={88} premountFor={30}>
          <B3BirchDew />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={serumSpread()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 Moisture layer" durationInFrames={88} premountFor={30}>
          <B4MoistureLayer />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={focusShift()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="05 Dew atmosphere" durationInFrames={82} premountFor={30}>
          <B5DewAtmosphere />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={frostedGlassSlide("left")} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="06 Final 70 hero" durationInFrames={88} premountFor={30}>
          <B6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
