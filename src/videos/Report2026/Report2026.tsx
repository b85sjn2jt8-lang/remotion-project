import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";
import { ProgressBar } from "../../components/ProgressBar";
import { AudienceScene } from "./AudienceScene";
import { Background } from "./Background";
import { FutureScene } from "./FutureScene";
import { IntroScene } from "./IntroScene";
import { PlatformsScene } from "./PlatformsScene";
import { ProductionScene } from "./ProductionScene";
import { ProjectsScene } from "./ProjectsScene";
import { QuickStatsScene } from "./QuickStatsScene";
import { ReachScene } from "./ReachScene";

/**
 * Motion summary of the July–August 2026 business report.
 * Each scene is its own file and its own composition (folder "Report2026-Scenes"):
 * double-click a scene in the timeline to edit it on its own.
 * Drag a scene's right edge to change its length, then update durationInFrames
 * in src/Root.tsx (sum of scenes − 12 frames per transition).
 */
export const Report2026: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries name="Scenes">
        <TransitionSeries.Sequence
          name="Intro"
          durationInFrames={90}
          premountFor={30}
        >
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Reach"
          durationInFrames={150}
          premountFor={30}
        >
          <ReachScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Platforms"
          durationInFrames={165}
          premountFor={30}
        >
          <PlatformsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Audience"
          durationInFrames={150}
          premountFor={30}
        >
          <AudienceScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Production"
          durationInFrames={180}
          premountFor={30}
        >
          <ProductionScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Projects"
          durationInFrames={150}
          premountFor={30}
        >
          <ProjectsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Quick stats"
          durationInFrames={150}
          premountFor={30}
        >
          <QuickStatsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Future"
          durationInFrames={120}
          premountFor={30}
        >
          <FutureScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <ProgressBar color="#5CE1D6" />
    </AbsoluteFill>
  );
};
