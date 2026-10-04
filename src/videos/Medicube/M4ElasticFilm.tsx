import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { StretchFilm, TUBE_SRC } from "./materials";

// SHOT 04 — ELASTIC FILM (0:07.3–0:10.3)
// The signature shot: a clear skincare film stretched between two off-screen
// anchors, pulling taut and catching pink, champagne, pearl and moonlight.
// The tube is behind it; focus moves from the film to the tube.
export const M4ElasticFilm: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#3A1529" }}>
      <AbsoluteFill
        name="Midnight rose"
        style={{
          background:
            "radial-gradient(85% 100% at 64% 46%, #9C5070 0%, #6A2C4C 40%, #3A1529 78%, #220B18 100%)",
        }}
      />
      <Interactive.Div
        name="Moonlight"
        style={{
          position: "absolute",
          left: 1300,
          top: -300,
          width: 900,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(228,230,252,0.45), rgba(228,230,252,0))",
        }}
      />
      <Img
        name="MEDICUBE tube (behind the film)"
        src={staticFile(TUBE_SRC)}
        style={{
          position: "absolute",
          left: 1150,
          top: 250,
          width: 260,
          filter: `blur(${interpolate(frame, [0, 50, 80], [9, 8, 0], {
            easing: Easing.bezier(0.4, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px) drop-shadow(0 0 14px rgba(250,190,170,0.6))`,
        }}
      />
      <Interactive.Div
        name="Soft shadow under tube"
        style={{
          position: "absolute",
          left: 1130,
          top: 805,
          width: 300,
          height: 28,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(20,5,14,0.55), rgba(20,5,14,0))",
          filter: "blur(6px)",
        }}
      />

      <Interactive.Div
        name="Word — PEEL."
        style={{
          position: "absolute",
          left: 130,
          top: 300,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 120,
          lineHeight: 1,
          letterSpacing: 10,
          color: "#F7E6DC",
          opacity: interpolate(frame, [18, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [18, 40], ["-40px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        PEEL.
      </Interactive.Div>
      <Interactive.Div
        name="Word — REVEAL."
        style={{
          position: "absolute",
          left: 130,
          top: 440,
          fontFamily: "Jost",
          fontWeight: 300,
          fontSize: 120,
          lineHeight: 1,
          letterSpacing: 10,
          color: "#F7E6DC",
          opacity: interpolate(frame, [36, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          filter: `blur(${interpolate(frame, [36, 50], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}
      >
        REVEAL.
      </Interactive.Div>
      <Interactive.Div
        name="Word — GLOW."
        style={{
          position: "absolute",
          left: 130,
          top: 580,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 120,
          lineHeight: 1,
          letterSpacing: 10,
          color: "rgba(0,0,0,0)",
          backgroundImage: "linear-gradient(100deg, #FBE2D4 0%, #E9A48C 50%, #FBE2D4 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: `${interpolate(frame, [54, 88], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}% 0%`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          opacity: interpolate(frame, [54, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          textShadow: "0 0 40px rgba(250,190,170,0.35)",
        }}
      >
        GLOW.
      </Interactive.Div>

      <Interactive.Div
        name="Stretched wrapping film"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          filter: `blur(${interpolate(frame, [50, 80], [0, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          rotate: interpolate(frame, [0, 90], ["-6deg", "-3deg"], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          scale: interpolate(frame, [0, 90], [1.12, 1.04], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <StretchFilm
          tension={interpolate(frame, [0, 70], [0, 1], {
            easing: Easing.bezier(0.3, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          phase={interpolate(frame, [0, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          tone="night"
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
