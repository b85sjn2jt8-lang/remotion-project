import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { M1NightWrap } from "./M1NightWrap";
import { M2Hero } from "./M2Hero";
import { M3GelToFilm } from "./M3GelToFilm";
import { M4ElasticFilm } from "./M4ElasticFilm";
import { M5NightToMorning } from "./M5NightToMorning";
import { M6FinalHero } from "./M6FinalHero";
import { filmPeel, pearlRefract, roseGoldSweep } from "./transitions";

/**
 * MEDICUBE Collagen Night Wrapping Mask — ONE continuous 15s looping spot,
 * 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 520 frames, minus 70 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "MedicubeAd" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const MedicubeAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#2A0F1E" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 The night wrap" durationInFrames={86} premountFor={30}>
          <M1NightWrap />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={filmPeel()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 Product hero" durationInFrames={88} premountFor={30}>
          <M2Hero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={roseGoldSweep()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="03 Gel becomes film" durationInFrames={88} premountFor={30}>
          <M3GelToFilm />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={pearlRefract()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 Elastic film" durationInFrames={90} premountFor={30}>
          <M4ElasticFilm />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={pearlRefract()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="05 Night to morning" durationInFrames={80} premountFor={30}>
          <M5NightToMorning />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={filmPeel()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="06 Final pearl hero" durationInFrames={88} premountFor={30}>
          <M6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
