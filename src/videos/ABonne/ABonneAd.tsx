import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { B1MilkReveal } from "./B1MilkReveal";
import { B2CollagenHero } from "./B2CollagenHero";
import { B3MoistureWave } from "./B3MoistureWave";
import { B4MilkCollagenWorld } from "./B4MilkCollagenWorld";
import { B5UVProtection } from "./B5UVProtection";
import { B6FinalHero } from "./B6FinalHero";
import {
  lotionSweep,
  milkCurtain,
  milkRise,
  sphereLens,
  sunBloom,
} from "./transitions";

/**
 * A BONNE Milk Power Lightening Lotion Plus Collagen — 15s looping
 * store-display spot, 1920×1080 @ 30fps.
 * Scenes sum to 534 frames, minus 84 transition frames = 450 (exactly 15s).
 * If you change a scene or transition length, update `durationInFrames` of
 * "ABonneAd" in src/Root.tsx (sum of scenes − sum of transitions).
 * Double-click a scene in the Studio timeline to edit it on its own timeline.
 */
export const ABonneAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence
          name="01 Milk reveal"
          durationInFrames={85}
          premountFor={30}
        >
          <B1MilkReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={milkCurtain()}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence
          name="02 3X Collagen hero"
          durationInFrames={90}
          premountFor={30}
        >
          <B2CollagenHero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={lotionSweep()}
          timing={linearTiming({ durationInFrames: 22 })}
        />
        <TransitionSeries.Sequence
          name="03 Moisture wave"
          durationInFrames={92}
          premountFor={30}
        >
          <B3MoistureWave />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={sphereLens()}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="04 Milk + collagen world"
          durationInFrames={92}
          premountFor={30}
        >
          <B4MilkCollagenWorld />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={sunBloom()}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence
          name="05 UV protection"
          durationInFrames={88}
          premountFor={30}
        >
          <B5UVProtection />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={milkRise()}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence
          name="06 Final hero"
          durationInFrames={87}
          premountFor={30}
        >
          <B6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
