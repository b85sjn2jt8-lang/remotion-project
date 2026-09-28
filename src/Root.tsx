import { Composition, Folder } from "remotion";
import "./fonts";
import { socialVideoSchema } from "./schema";
import { ExampleVideo } from "./videos/Example/ExampleVideo";
import { Hook as ExampleHook } from "./videos/Example/Hook";
import { Outro as ExampleOutro } from "./videos/Example/Outro";
import { AudienceScene } from "./videos/Report2026/AudienceScene";
import { FutureScene } from "./videos/Report2026/FutureScene";
import { IntroScene } from "./videos/Report2026/IntroScene";
import { PlatformsScene } from "./videos/Report2026/PlatformsScene";
import { ProductionScene } from "./videos/Report2026/ProductionScene";
import { ProjectsScene } from "./videos/Report2026/ProjectsScene";
import { QuickStatsScene } from "./videos/Report2026/QuickStatsScene";
import { ReachScene } from "./videos/Report2026/ReachScene";
import { Report2026 } from "./videos/Report2026/Report2026";

// Every video is 1080x1920 @ 30fps. Each video gets:
//  - a main <Composition> with its global props (captions, colors) editable in the Props panel
//  - a <Folder> of its scenes so each can be opened and edited on its own timeline
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Example-Scenes">
        <Composition
          id="Example-Hook"
          component={ExampleHook}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={75}
        />
        <Composition
          id="Example-Outro"
          component={ExampleOutro}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={75}
        />
      </Folder>
      <Composition
        id="Example"
        component={ExampleVideo}
        schema={socialVideoSchema}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={309}
        defaultProps={{
          accentColor: "#FF3B5C",
          showProgressBar: true,
          showSafeZones: false,
          captions: {
            enabled: true,
            fontFamily: "Montserrat",
            fontSize: 84,
            textColor: "#FFFFFF",
            highlightColor: "#FFD23F",
            highlightStyle: "text",
            strokeColor: "#000000",
            strokeWidth: 12,
            uppercase: true,
            distanceFromBottom: 560,
            combineWordsWithinMs: 900,
          },
        }}
      />
      <Folder name="Report2026-Scenes">
        <Composition
          id="Report2026-Intro"
          component={IntroScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="Report2026-Reach"
          component={ReachScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={150}
        />
        <Composition
          id="Report2026-Platforms"
          component={PlatformsScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={165}
        />
        <Composition
          id="Report2026-Audience"
          component={AudienceScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={150}
        />
        <Composition
          id="Report2026-Production"
          component={ProductionScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
        />
        <Composition
          id="Report2026-Projects"
          component={ProjectsScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={150}
        />
        <Composition
          id="Report2026-QuickStats"
          component={QuickStatsScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={150}
        />
        <Composition
          id="Report2026-Future"
          component={FutureScene}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={120}
        />
      </Folder>
      <Composition
        id="Report2026"
        component={Report2026}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={1071}
      />
    </>
  );
};
