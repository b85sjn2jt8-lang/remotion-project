import { Composition, Folder } from "remotion";
import "./fonts";
import { socialVideoSchema } from "./schema";
import { ExampleVideo } from "./videos/Example/ExampleVideo";
import { Hook as ExampleHook } from "./videos/Example/Hook";
import { Outro as ExampleOutro } from "./videos/Example/Outro";
import { AnuaAd } from "./videos/Anua/AnuaAd";
import { H1PoreHook } from "./videos/Heartleaf/H1PoreHook";
import { H2ProductReveal } from "./videos/Heartleaf/H2ProductReveal";
import { H3RichFoam } from "./videos/Heartleaf/H3RichFoam";
import { H4PoreReset } from "./videos/Heartleaf/H4PoreReset";
import { H5Calm } from "./videos/Heartleaf/H5Calm";
import { H6FinalHero as HeartleafH6FinalHero } from "./videos/Heartleaf/H6FinalHero";
import { HeartleafAd } from "./videos/Heartleaf/HeartleafAd";
import { E1Flood } from "./videos/Eqqualberry/E1Flood";
import { E2Hero } from "./videos/Eqqualberry/E2Hero";
import { E3Glacier } from "./videos/Eqqualberry/E3Glacier";
import { E4Layers } from "./videos/Eqqualberry/E4Layers";
import { E5Ceramides } from "./videos/Eqqualberry/E5Ceramides";
import { E6FinalHero } from "./videos/Eqqualberry/E6FinalHero";
import { EqqualberryAd } from "./videos/Eqqualberry/EqqualberryAd";
import { H1SunlightHook } from "./videos/Hikari/H1SunlightHook";
import { H2HeroReveal } from "./videos/Hikari/H2HeroReveal";
import { H3LightFilter } from "./videos/Hikari/H3LightFilter";
import { H4WaterFresh } from "./videos/Hikari/H4WaterFresh";
import { H5GelMacro } from "./videos/Hikari/H5GelMacro";
import { H6FinalHero } from "./videos/Hikari/H6FinalHero";
import { HikariAd } from "./videos/Hikari/HikariAd";
import { ABonneAd } from "./videos/ABonne/ABonneAd";
import { B1MilkReveal } from "./videos/ABonne/B1MilkReveal";
import { B2CollagenHero } from "./videos/ABonne/B2CollagenHero";
import { B3MoistureWave } from "./videos/ABonne/B3MoistureWave";
import { B4MilkCollagenWorld } from "./videos/ABonne/B4MilkCollagenWorld";
import { B5UVProtection } from "./videos/ABonne/B5UVProtection";
import { B6FinalHero } from "./videos/ABonne/B6FinalHero";
import { S1PinkDrop } from "./videos/Anua/S1PinkDrop";
import { S2Hero } from "./videos/Anua/S2Hero";
import { S3PadSwipe } from "./videos/Anua/S3PadSwipe";
import { S4SerumMacro } from "./videos/Anua/S4SerumMacro";
import { S5Halfmoon } from "./videos/Anua/S5Halfmoon";
import { S6Liquid } from "./videos/Anua/S6Liquid";
import { S7FinalHero } from "./videos/Anua/S7FinalHero";

// Social videos are 1080x1920 @ 30fps (the store-display spots — ANUA, A BONNE, HIKARI, EQQUALBERRY, ANUA Heartleaf — are 1920x1080). Each video gets:
//  - a main <Composition> with its global props (captions, colors) editable in the Props panel
//  - a <Folder> of its scenes so each can be opened and edited on its own timeline
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ANUA Heartleaf cleansing foam — ONE 15s 1920x1080 store-display spot (450 frames, loops). */}
      <Folder name="HeartleafAd-Shots">
        <Composition
          id="Heartleaf-H1-PoreHook"
          component={H1PoreHook}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={88}
        />
        <Composition
          id="Heartleaf-H2-ProductReveal"
          component={H2ProductReveal}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="Heartleaf-H3-RichFoam"
          component={H3RichFoam}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={88}
        />
        <Composition
          id="Heartleaf-H4-PoreReset"
          component={H4PoreReset}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={92}
        />
        <Composition
          id="Heartleaf-H5-Calm"
          component={H5Calm}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={78}
        />
        <Composition
          id="Heartleaf-H6-FinalHero"
          component={HeartleafH6FinalHero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={88}
        />
      </Folder>
      <Composition
        id="HeartleafAd"
        component={HeartleafAd}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={450}
      />
      {/* EQQUALBERRY Blue Blow serum — ONE 15s 1920x1080 store-display spot (450 frames, loops). */}
      <Folder name="EqqualberryAd-Shots">
        <Composition
          id="Eqqualberry-E1-Flood"
          component={E1Flood}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={85}
        />
        <Composition
          id="Eqqualberry-E2-Hero"
          component={E2Hero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={88}
        />
        <Composition
          id="Eqqualberry-E3-Glacier"
          component={E3Glacier}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="Eqqualberry-E4-Layers"
          component={E4Layers}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={88}
        />
        <Composition
          id="Eqqualberry-E5-Ceramides"
          component={E5Ceramides}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={76}
        />
        <Composition
          id="Eqqualberry-E6-FinalHero"
          component={E6FinalHero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={95}
        />
      </Folder>
      <Composition
        id="EqqualberryAd"
        component={EqqualberryAd}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={450}
      />
      {/* HIKARI UltraFresh Sunscreen — horizontal 1920x1080 store-display spot (15s loop). */}
      <Folder name="HikariAd-Scenes">
        <Composition
          id="Hikari-H1-SunlightHook"
          component={H1SunlightHook}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={76}
        />
        <Composition
          id="Hikari-H2-HeroReveal"
          component={H2HeroReveal}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={82}
        />
        <Composition
          id="Hikari-H3-LightFilter"
          component={H3LightFilter}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={80}
        />
        <Composition
          id="Hikari-H4-WaterFresh"
          component={H4WaterFresh}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={82}
        />
        <Composition
          id="Hikari-H5-GelMacro"
          component={H5GelMacro}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={82}
        />
        <Composition
          id="Hikari-H6-FinalHero"
          component={H6FinalHero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={110}
        />
      </Folder>
      <Composition
        id="HikariAd"
        component={HikariAd}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={450}
      />
      {/* A BONNE Milk Lotion — horizontal 1920x1080 store-display spot (15s loop). */}
      <Folder name="ABonneAd-Scenes">
        <Composition
          id="ABonne-B1-MilkReveal"
          component={B1MilkReveal}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={85}
        />
        <Composition
          id="ABonne-B2-CollagenHero"
          component={B2CollagenHero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={90}
        />
        <Composition
          id="ABonne-B3-MoistureWave"
          component={B3MoistureWave}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={92}
        />
        <Composition
          id="ABonne-B4-MilkCollagenWorld"
          component={B4MilkCollagenWorld}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={92}
        />
        <Composition
          id="ABonne-B5-UVProtection"
          component={B5UVProtection}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={88}
        />
        <Composition
          id="ABonne-B6-FinalHero"
          component={B6FinalHero}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={87}
        />
      </Folder>
      <Composition
        id="ABonneAd"
        component={ABonneAd}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={450}
      />
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
