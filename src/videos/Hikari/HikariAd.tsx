import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { H1SunlightHook } from "./H1SunlightHook";
import { H2HeroReveal } from "./H2HeroReveal";
import { H3LightFilter } from "./H3LightFilter";
import { H4WaterFresh } from "./H4WaterFresh";
import { H5GelMacro } from "./H5GelMacro";
import { H6FinalHero } from "./H6FinalHero";
import {
  dropletTrail,
  flareSweep,
  glassRefract,
  waterWave,
} from "./transitions";

/**
 * HIKARI Skin Essentials UltraFresh Sunscreen SPF 50 PA++++ — 15s looping
 * store-display spot, 1920×1080 @ 30fps.
 * Scenes sum to 512 frames, minus 62 transition frames = 450 (exactly 15s).
 * Scene 04 → 05 is a hard cut into the macro. If you change a scene or
 * transition length, update `durationInFrames` of "HikariAd" in src/Root.tsx.
 * Double-click a scene in the Studio timeline to edit it on its own timeline.
 */
export const HikariAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFD66B" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence
          name="01 Sunlight hook"
          durationInFrames={76}
          premountFor={30}
        >
          <H1SunlightHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={glassRefract()}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence
          name="02 Hero reveal"
          durationInFrames={82}
          premountFor={30}
        >
          <H2HeroReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={flareSweep()}
          timing={linearTiming({ durationInFrames: 14 })}
        />
        <TransitionSeries.Sequence
          name="03 UVA / UVB light"
          durationInFrames={80}
          premountFor={30}
        >
          <H3LightFilter />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={waterWave()}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="04 Water freshness"
          durationInFrames={82}
          premountFor={30}
        >
          <H4WaterFresh />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="05 Gel-cream macro"
          durationInFrames={82}
          premountFor={30}
        >
          <H5GelMacro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={dropletTrail()}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence
          name="06 Final sun + water hero"
          durationInFrames={110}
          premountFor={30}
        >
          <H6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
