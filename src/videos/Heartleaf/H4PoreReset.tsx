import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { FoamMass, PoreSurface } from "./materials";

// SHOT 04 — PORE RESET (0:07.4–0:10.5)
// Back on the pore surface: a band of foam passes over, a clear water wave
// follows, and behind the water the impurity particles are gone. The pores
// themselves stay — only what was inside them is rinsed away.
export const H4PoreReset: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E6EBDD" }}>
      <Interactive.Div
        name="Pore surface"
        style={{ position: "absolute", left: -200, top: -150, width: 2560, height: 1440 }}
      >
        <PoreSurface
          cleanX={interpolate(frame, [30, 66], [-200, 2400], {
            easing: Easing.bezier(0.4, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          sheen={interpolate(frame, [36, 66, 92], [0, 1, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Title — REMOVES IMPURITIES"
        style={{
          position: "absolute",
          left: 128,
          top: 300,
          fontFamily: "Figtree",
          fontWeight: 700,
          fontSize: 100,
          lineHeight: 1,
          letterSpacing: 0,
          color: "#2E4A35",
          clipPath: `polygon(-100px -50px, ${interpolate(frame, [30, 66], [-528, 2072], {
            easing: Easing.bezier(0.4, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px -50px, ${interpolate(frame, [30, 66], [-528, 2072], {
            easing: Easing.bezier(0.4, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px 200px, -100px 200px)`,
        }}
      >
        REMOVES IMPURITIES
      </Interactive.Div>
      <Interactive.Div
        name="Title — + EXCESS SEBUM"
        style={{
          position: "absolute",
          left: 132,
          top: 420,
          fontFamily: "Figtree",
          fontWeight: 300,
          fontSize: 100,
          lineHeight: 1,
          letterSpacing: 2,
          color: "#3F6248",
          clipPath: `polygon(-100px -50px, ${interpolate(frame, [30, 66], [-532, 2068], {
            easing: Easing.bezier(0.4, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px -50px, ${interpolate(frame, [30, 66], [-532, 2068], {
            easing: Easing.bezier(0.4, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px 200px, -100px 200px)`,
        }}
      >
        + EXCESS SEBUM
      </Interactive.Div>
      <Interactive.Div
        name="Title — REFRESH."
        style={{
          position: "absolute",
          left: 124,
          top: 600,
          fontFamily: "Figtree",
          fontWeight: 800,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: -2,
          color: "#5C8A63",
          opacity: interpolate(frame, [66, 76], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [66, 80], [10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        REFRESH.
      </Interactive.Div>

      <Interactive.Div
        name="Foam band passing"
        style={{
          position: "absolute",
          left: 0,
          top: -110,
          width: 1500,
          height: 1300,
          translate: interpolate(frame, [8, 50], ["-1700px 0px", "2100px 0px"], {
            easing: Easing.bezier(0.4, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(-20px 16px 30px rgba(60,85,62,0.22))",
        }}
      >
        <FoamMass
          t={interpolate(frame, [0, 92], [0, 92], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          w={1500}
          h={1300}
          edge="both"
          seed={33}
          bubbleScale={1.4}
        />
      </Interactive.Div>
      <AbsoluteFill
        name="Clear water wave"
        style={{
          translate: interpolate(frame, [30, 66], ["-200px 0px", "2400px 0px"], {
            easing: Easing.bezier(0.4, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          style={{
            left: -2400,
            width: 2400,
            background:
              "linear-gradient(90deg, rgba(230,242,228,0) 0%, rgba(230,242,228,0.12) 70%, rgba(220,236,218,0.3) 100%)",
          }}
        />
        <AbsoluteFill
          style={{
            left: -420,
            width: 480,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(220,236,216,0.35) 50%, rgba(255,255,255,0.85) 86%, rgba(255,255,255,0) 100%)",
            backdropFilter: "blur(5px) brightness(1.04)",
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
