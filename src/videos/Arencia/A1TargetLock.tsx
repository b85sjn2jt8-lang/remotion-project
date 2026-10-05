import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { LightRing, TargetVoid } from "./materials";

// SHOT 01 — TARGET LOCK (0:00–0:02.3)
// Opens on the dark magenta void with its single lit point (the loop seam).
// The point dims; a razor-thin pink-white beam travels precisely to the spot
// under the glass; a soft circular pulse spreads and reveals TARGET / THE SPOT.
export const A1TargetLock: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#12020C" }}>
      <AbsoluteFill name="Target void">
        <TargetVoid
          glow={interpolate(frame, [0, 10, 33, 38, 76], [1, 0.12, 0.12, 1, 0.35], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>
      <Interactive.Div
        name="Glass reflection gliding"
        style={{
          position: "absolute",
          left: -1300,
          top: -200,
          width: 600,
          height: 1500,
          rotate: "22deg",
          background:
            "linear-gradient(90deg, rgba(255,190,220,0) 0%, rgba(255,190,220,0.07) 50%, rgba(255,190,220,0) 100%)",
          translate: interpolate(frame, [10, 86], ["0px 0px", "3200px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Precision beam"
        style={{
          position: "absolute",
          left: 0,
          top: 539,
          width: 960,
          height: 2,
          background: "linear-gradient(90deg, rgba(255,210,230,0) 0%, rgba(255,210,230,0.6) 40%, #FFF2F8 100%)",
          boxShadow: "0 0 8px 1px rgba(255,150,200,0.7)",
          clipPath: `inset(-10px ${interpolate(frame, [8, 34], [100, 0], {
            easing: Easing.bezier(0.45, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% -10px 0)`,
          opacity: interpolate(frame, [8, 10, 36, 52], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Beam head"
        style={{
          position: "absolute",
          left: -8,
          top: 532,
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#FFF5FA",
          boxShadow: "0 0 18px 6px rgba(255,160,205,0.8)",
          translate: interpolate(frame, [8, 34], ["0px 0px", "960px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [8, 10, 33, 36], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Circular pulse"
        style={{
          position: "absolute",
          left: 60,
          top: -360,
          width: 1800,
          height: 1800,
          scale: interpolate(frame, [34, 76], [0.02, 1], {
            easing: Easing.bezier(0.2, 0.6, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [34, 38, 76], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <LightRing />
      </Interactive.Div>
      <Interactive.Div
        name="Spot softening"
        style={{
          position: "absolute",
          left: 910,
          top: 500,
          width: 100,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,190,215,0.6), rgba(255,190,215,0))",
          filter: "blur(4px)",
          opacity: interpolate(frame, [36, 70], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        name="Type revealed by the pulse"
        style={{
          clipPath: `circle(${interpolate(frame, [36, 72], [0, 1100], {
            easing: Easing.bezier(0.2, 0.6, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 960px 540px)`,
        }}
      >
        <Interactive.Div
          name="Title — TARGET"
          style={{
            position: "absolute",
            left: 0,
            top: 240,
            width: 1920,
            textAlign: "center",
            fontFamily: "Archivo",
            fontWeight: 800,
            fontSize: 210,
            lineHeight: 1,
            letterSpacing: 24,
            color: "#FFE3EE",
          }}
        >
          TARGET
        </Interactive.Div>
        <Interactive.Div
          name="Title — THE SPOT"
          style={{
            position: "absolute",
            left: 0,
            top: 670,
            width: 1920,
            textAlign: "center",
            fontFamily: "Archivo",
            fontWeight: 300,
            fontSize: 96,
            lineHeight: 1,
            letterSpacing: 44,
            color: "#F4A3C4",
          }}
        >
          THE SPOT
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
