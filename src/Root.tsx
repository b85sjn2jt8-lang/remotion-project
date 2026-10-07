import { Composition, Folder } from "remotion";
import "./fonts";
import { arabicSocialVideoSchema, socialVideoSchema } from "./schema";
import { ExampleVideo } from "./videos/Example/ExampleVideo";
import { Hook as ExampleHook } from "./videos/Example/Hook";
import { Outro as ExampleOutro } from "./videos/Example/Outro";
import { CompareCard as Ray391CompareCard } from "./videos/Ray391/CompareCard";
import { CouponCard as Ray391CouponCard } from "./videos/Ray391/CouponCard";
import { HookPrices as Ray391HookPrices } from "./videos/Ray391/HookPrices";
import { PriceCard as Ray391PriceCard } from "./videos/Ray391/PriceCard";
import { Ray391Video } from "./videos/Ray391/Ray391Video";

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
      <Folder name="Ray391-Scenes">
        <Composition
          id="Ray391-Hook"
          component={Ray391HookPrices}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={186}
        />
        <Composition
          id="Ray391-Coupon"
          component={Ray391CouponCard}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={66}
        />
        <Composition
          id="Ray391-Compare"
          component={Ray391CompareCard}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={66}
        />
        <Composition
          id="Ray391-Price"
          component={Ray391PriceCard}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={304}
        />
      </Folder>
      <Composition
        id="Ray391"
        component={Ray391Video}
        schema={arabicSocialVideoSchema}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={916}
        defaultProps={{
          accentColor: "#F2B33D",
          sfxVolume: 1,
          showProgressBar: false,
          showSafeZones: false,
          captions: {
            enabled: true,
            fontFamily: "Tajawal",
            fontSize: 74,
            emphasisFontSize: 118,
            textColor: "#FFFFFF",
            highlightColor: "#F2B33D",
            negativeColor: "#FF4D4D",
            strokeColor: "#000000",
            strokeWidth: 10,
            distanceFromBottom: 1200,
          },
        }}
      />
    </>
  );
};
