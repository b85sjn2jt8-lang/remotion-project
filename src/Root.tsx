import { Composition, Folder } from "remotion";
import "./fonts";
import { socialVideoSchema } from "./schema";
import { ExampleVideo } from "./videos/Example/ExampleVideo";
import { Hook as ExampleHook } from "./videos/Example/Hook";
import { Outro as ExampleOutro } from "./videos/Example/Outro";
import { StoreLoop } from "./videos/StoreLoop/StoreLoop";

// Every video is 1080x1920 @ 30fps. Each video gets:
//  - a main <Composition> with its global props (captions, colors) editable in the Props panel
//  - a <Folder> of its scenes so each can be opened and edited on its own timeline
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 60 s in-store 16:9 loop. Authored at 1920x1080; render with --scale=2 for 3840x2160. */}
      <Composition
        id="StoreLoop"
        component={StoreLoop}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={1800}
      />
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
    </>
  );
};
