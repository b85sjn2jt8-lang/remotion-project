import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { JellyMass, MistField } from "./materials";

// SHOT 04 — JELLY → MIST (0:08.2–0:11.1) — the signature shot.
// A translucent lavender jelly mass floats in pearl-white space. It stretches
// gently, then separates into hundreds of ultra-fine droplets that drift
// toward the camera — no explosion, no smoke. JELLY → MIST.
// Jelly mass centre: (960, 640).
export const J4JellyToMist: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F6F3FB" }}>
      <AbsoluteFill
        name="Pearl-white space"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 60%, #FBF9FE 0%, #ECE5F8 50%, #D6CAEE 100%)",
        }}
      />
      <Interactive.Div
        name="Soft floor glow"
        style={{
          position: "absolute",
          left: 460,
          top: 820,
          width: 1000,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(170,145,225,0.3), rgba(170,145,225,0))",
          filter: "blur(10px)",
          opacity: interpolate(frame, [30, 70], [1, 0.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Title — JELLY"
        style={{
          position: "absolute",
          left: 0,
          top: 120,
          width: 840,
          textAlign: "right",
          fontFamily: "DM Sans",
          fontWeight: 700,
          fontSize: 170,
          lineHeight: 1,
          letterSpacing: 4,
          color: "#6A54B0",
          opacity: interpolate(frame, [2, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        JELLY
      </Interactive.Div>
      <Interactive.Div
        name="Arrow"
        style={{
          position: "absolute",
          left: 0,
          top: 128,
          width: 1920,
          textAlign: "center",
          fontFamily: "DM Sans",
          fontWeight: 200,
          fontSize: 150,
          lineHeight: 1,
          color: "#A493D6",
          opacity: interpolate(frame, [40, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [40, 60], ["-30px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        →
      </Interactive.Div>
      <Interactive.Div
        name="Title — MIST"
        style={{
          position: "absolute",
          left: 1080,
          top: 120,
          fontFamily: "DM Sans",
          fontWeight: 200,
          fontSize: 170,
          lineHeight: 1,
          letterSpacing: 18,
          color: "#8D7BC9",
          opacity: interpolate(frame, [48, 64], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [48, 74], [14, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        MIST
      </Interactive.Div>

      <Interactive.Div
        name="Jelly mass (stretches, then separates)"
        style={{
          position: "absolute",
          left: 510,
          top: 340,
          width: 900,
          height: 600,
          scale: interpolate(frame, [0, 28, 72], ["1 1", "1.12 0.94", "0.86 0.8"], {
            easing: [Easing.bezier(0.33, 0, 0.67, 1), Easing.bezier(0.4, 0, 0.6, 1)],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [30, 72], [1, 0], {
            easing: Easing.bezier(0.4, 0, 0.7, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [40, 72], [0, 4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <JellyMass
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>
      <AbsoluteFill name="Ultra-fine mist leaving the jelly">
        <MistField
          progress={interpolate(frame, [28, 86], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          cx={960}
          cy={640}
          rx={330}
          ry={190}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
