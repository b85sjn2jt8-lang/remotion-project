import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { S1PinkDrop } from "./S1PinkDrop";
import { S2Hero } from "./S2Hero";
import { S3PadSwipe } from "./S3PadSwipe";
import { S4SerumMacro } from "./S4SerumMacro";
import { S5Halfmoon } from "./S5Halfmoon";
import { S6Liquid } from "./S6Liquid";
import { S7FinalHero } from "./S7FinalHero";
import {
  glassPass,
  lightSweep,
  padIris,
  rackFocus,
  rippleReveal,
} from "./transitions";

/**
 * ANUA Niacinamide 5 + TXA Brightening Pad — 20s looping store-display spot.
 * 1920×1080 @ 30fps. Scenes sum to 692 frames, minus 92 transition frames = 600.
 * If you change a scene or transition length, update `durationInFrames` of
 * "AnuaAd" in src/Root.tsx (sum of scenes − sum of transitions).
 * Double-click a scene in the Studio timeline to edit it on its own timeline.
 */
export const AnuaAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FBEAEE" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence
          name="01 Pink drop"
          durationInFrames={85}
          premountFor={30}
        >
          <S1PinkDrop />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={rackFocus()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="02 Product hero"
          durationInFrames={90}
          premountFor={30}
        >
          <S2Hero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={lightSweep()}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence
          name="03 Pad swipe"
          durationInFrames={100}
          premountFor={30}
        >
          <S3PadSwipe />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={padIris()}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="04 Serum macro"
          durationInFrames={90}
          premountFor={30}
        >
          <S4SerumMacro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={rippleReveal()}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="05 Halfmoon"
          durationInFrames={90}
          premountFor={30}
        >
          <S5Halfmoon />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={glassPass()}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence
          name="06 Product + liquid"
          durationInFrames={105}
          premountFor={30}
        >
          <S6Liquid />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={lightSweep()}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence
          name="07 Final hero"
          durationInFrames={132}
          premountFor={30}
        >
          <S7FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
