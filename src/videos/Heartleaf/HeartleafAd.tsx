import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { H1PoreHook } from "./H1PoreHook";
import { H2ProductReveal } from "./H2ProductReveal";
import { H3RichFoam } from "./H3RichFoam";
import { H4PoreReset } from "./H4PoreReset";
import { H5Calm } from "./H5Calm";
import { H6FinalHero } from "./H6FinalHero";
import { dropletLens, foamPlunge, foamWipe, leafShadow, waterRinse } from "./transitions";

/**
 * ANUA Heartleaf Quercetinol Pore Deep Cleansing Foam — ONE continuous 15s
 * looping spot, 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 524 frames, minus 74 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "HeartleafAd" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const HeartleafAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F5EF" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 Pore hook" durationInFrames={88} premountFor={30}>
          <H1PoreHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={foamWipe()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 Product reveal" durationInFrames={90} premountFor={30}>
          <H2ProductReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={foamPlunge()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="03 Rich foam" durationInFrames={88} premountFor={30}>
          <H3RichFoam />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={dropletLens()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="04 Pore reset" durationInFrames={92} premountFor={30}>
          <H4PoreReset />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={waterRinse()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="05 Calm + hydrating finish" durationInFrames={78} premountFor={30}>
          <H5Calm />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={leafShadow()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="06 Final hero" durationInFrames={88} premountFor={30}>
          <H6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
