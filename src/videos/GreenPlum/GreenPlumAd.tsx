import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { P1PlumReset } from "./P1PlumReset";
import { P2ProductReveal } from "./P2ProductReveal";
import { P3GreenPlum } from "./P3GreenPlum";
import { P4AhaBha } from "./P4AhaBha";
import { P5Refreshing } from "./P5Refreshing";
import { P6FinalHero } from "./P6FinalHero";
import { liquidDrain, liquidRise, organicPass, rippleOptic, sideSheets } from "./transitions";

/**
 * BEAUTY OF JOSEON Green Plum Refreshing Toner : AHA + BHA — "Plum Reset".
 * ONE continuous 15s looping spot, 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 522 frames, minus 72 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "GreenPlumAd" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const GreenPlumAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F6F3EC" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 Plum reset hook" durationInFrames={86} premountFor={30}>
          <P1PlumReset />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={rippleOptic()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 Product + box reveal" durationInFrames={90} premountFor={30}>
          <P2ProductReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={organicPass()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="03 Green plum identity" durationInFrames={88} premountFor={30}>
          <P3GreenPlum />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={sideSheets()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 AHA + BHA" durationInFrames={88} premountFor={30}>
          <P4AhaBha />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={liquidRise()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="05 Refreshing toner" durationInFrames={82} premountFor={30}>
          <P5Refreshing />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={liquidDrain()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="06 Final plum hero" durationInFrames={88} premountFor={30}>
          <P6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
