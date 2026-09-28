import { Video } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Captions } from "../../components/Captions";
import { ProgressBar } from "../../components/ProgressBar";
import { SafeZones } from "../../components/SafeZones";
import type { SocialVideoProps } from "../../schema";
import { Hook } from "./Hook";
import { Outro } from "./Outro";

/**
 * TIMELINE (ripple edit): each "Clip N" is one cut of the footage.
 *  - Drag a clip's right edge in the Studio timeline to lengthen/shorten it; later clips move with it.
 *  - `trimBefore` on "Clip N · source" = the source frame where the clip starts (30 fps).
 *    Captions sit inside the same Sequence, so they stay in sync with the cut.
 *  - `scale` on the footage = punch-in zoom for that cut.
 * After changing clip lengths, update `durationInFrames` of this video in src/Root.tsx
 * (sum of all clips + outro − transition frames).
 */
export const ExampleVideo: React.FC<SocialVideoProps> = ({
  accentColor,
  showProgressBar,
  showSafeZones,
  captions,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries name="Edit timeline">
        <TransitionSeries.Sequence
          name="Clip 1"
          durationInFrames={80}
          premountFor={30}
        >
          <Sequence
            name="Clip 1 · source"
            trimBefore={0}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/sample.mp4")}
              objectFit="cover"
              style={{ width: "100%", height: "100%", scale: 1 }}
            />
            <Captions src="captions/sample.json" captionStyle={captions} />
          </Sequence>
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Clip 2"
          durationInFrames={83}
          premountFor={30}
        >
          <Sequence
            name="Clip 2 · source"
            trimBefore={118}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/sample.mp4")}
              objectFit="cover"
              style={{ width: "100%", height: "100%", scale: 1.15 }}
            />
            <Captions src="captions/sample.json" captionStyle={captions} />
          </Sequence>
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Clip 3"
          durationInFrames={83}
          premountFor={30}
        >
          <Sequence
            name="Clip 3 · source"
            trimBefore={238}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/sample.mp4")}
              objectFit="cover"
              style={{ width: "100%", height: "100%", scale: 1 }}
            />
            <Captions src="captions/sample.json" captionStyle={captions} />
          </Sequence>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Outro"
          durationInFrames={75}
          premountFor={30}
        >
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence name="Hook" durationInFrames={75}>
        <Hook />
      </Sequence>

      <Sequence
        name="Callout"
        from={120}
        durationInFrames={70}
        premountFor={15}
      >
        <Callout />
      </Sequence>

      {showProgressBar ? <ProgressBar color={accentColor} /> : null}
      {showSafeZones ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};

// A sticker-style text callout. Copy this component (and its <Sequence>) for more callouts.
const Callout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{ alignItems: "flex-start", paddingTop: 520, paddingLeft: 90 }}
    >
      <Interactive.Div
        name="Callout text"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 900,
          fontSize: 64,
          color: "#0B0B12",
          backgroundColor: "#FFD23F",
          padding: "14px 30px",
          borderRadius: 20,
          rotate: interpolate(frame, [0, 0.4 * fps], ["-12deg", "-4deg"], {
            easing: Easing.spring({ damping: 10 }),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(
            frame,
            [0, 0.4 * fps, durationInFrames - 6, durationInFrames - 1],
            [0, 1, 1, 0],
            {
              easing: [
                Easing.spring({ damping: 10 }),
                Easing.linear,
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        TIP #1
      </Interactive.Div>
    </AbsoluteFill>
  );
};
