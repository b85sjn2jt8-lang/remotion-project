import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { J1JellyHook } from "./J1JellyHook";
import { J2ProductReveal } from "./J2ProductReveal";
import { J3CaviarPearls } from "./J3CaviarPearls";
import { J4JellyToMist } from "./J4JellyToMist";
import { J5DewyGlow } from "./J5DewyGlow";
import { J6FinalHero } from "./J6FinalHero";
import { jellyStretch, jellyWall, mistVeil, sphereRoll, throughSphere } from "./transitions";

/**
 * BIODANCE Caviar PDRN Jelly Serum Mist 50 ml — "Jelly → Mist → Glow".
 * ONE continuous 15s looping spot, 1920×1080 @ 30fps, exactly 450 frames (0–449).
 * Shots sum to 522 frames, minus 72 transition frames = 450.
 * If you change a shot or transition length, keep that sum at 450 and keep
 * `durationInFrames` of "BiodanceAd" in src/Root.tsx at 450.
 * Double-click a shot in the Studio timeline to edit it on its own timeline.
 */
export const BiodanceAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#E1D6F6" }}>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="01 Jelly hook" durationInFrames={86} premountFor={30}>
          <J1JellyHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={jellyStretch()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="02 Product reveal" durationInFrames={90} premountFor={30}>
          <J2ProductReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={throughSphere()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="03 Caviar pearl world" durationInFrames={88} premountFor={30}>
          <J3CaviarPearls />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={jellyWall()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="04 Jelly to mist" durationInFrames={88} premountFor={30}>
          <J4JellyToMist />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={mistVeil()} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="05 Hydration + glow" durationInFrames={82} premountFor={30}>
          <J5DewyGlow />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={sphereRoll()} timing={linearTiming({ durationInFrames: 16 })} />
        <TransitionSeries.Sequence name="06 Final Caviar PDRN hero" durationInFrames={88} premountFor={30}>
          <J6FinalHero />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
