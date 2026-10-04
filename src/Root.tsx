import { Composition, Folder } from "remotion";
import "./fonts";
import { socialVideoSchema } from "./schema";
import { ExampleVideo } from "./videos/Example/ExampleVideo";
import { Hook as ExampleHook } from "./videos/Example/Hook";
import { Outro as ExampleOutro } from "./videos/Example/Outro";
import { AnuaAd } from "./videos/Anua/AnuaAd";
import { S1PinkDrop } from "./videos/Anua/S1PinkDrop";
import { S2Hero } from "./videos/Anua/S2Hero";
import { S3PadSwipe } from "./videos/Anua/S3PadSwipe";
import { S4SerumMacro } from "./videos/Anua/S4SerumMacro";
import { S5Halfmoon } from "./videos/Anua/S5Halfmoon";
import { S6Liquid } from "./videos/Anua/S6Liquid";
import { S7FinalHero } from "./videos/Anua/S7FinalHero";

// Social videos are 1080x1920 @ 30fps (the ANUA spot is a 1920x1080 exception). Each video gets:
//  - a main <Composition> with its global props (captions, colors) editable in the Props panel
//  - a <Folder> of its scenes so each can be opened and edited on its own timeline
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ANUA Brightening Pad — horizontal 1920x1080 store-display spot (loops). */}
      <Folder name="AnuaAd-Scenes">
        <Composition
          id="Anua-S1-PinkDrop"
          component={S1PinkDrop}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={85}
        />
        <Composition
          id="Anua-S2-Hero"
          component={S2Hero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="Anua-S3-PadSwipe"
          component={S3PadSwipe}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={100}
        />
        <Composition
          id="Anua-S4-SerumMacro"
          component={S4SerumMacro}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="Anua-S5-Halfmoon"
          component={S5Halfmoon}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="Anua-S6-Liquid"
          component={S6Liquid}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={105}
        />
        <Composition
          id="Anua-S7-FinalHero"
          component={S7FinalHero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={132}
        />
      </Folder>
      <Composition
        id="AnuaAd"
        component={AnuaAd}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={600}
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
