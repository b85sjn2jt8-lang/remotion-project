import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BlushSurface, TonalAreas } from "./materials";

// SHOT 04 — TONE CORRECTION VISUAL (0:08.2–0:11.1)
// An abstract ivory-blush surface (not skin) with a few extremely soft uneven
// tonal areas. A narrow wave of clear pink serum crosses it; behind the wave
// the areas read softer and more balanced — texture kept, nothing erased.
// The wave's front runs from x -300 to 2300 over frames 6–62.
export const A4ToneBalance: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8E1E6" }}>
      <AbsoluteFill name="Blush surface">
        <BlushSurface />
      </AbsoluteFill>
      <AbsoluteFill
        name="Tonal areas — ahead of the wave"
        style={{
          opacity: 0.17,
          maskImage: `linear-gradient(90deg, rgba(0,0,0,0) ${interpolate(frame, [6, 62], [-420, 2180], {
            easing: Easing.bezier(0.35, 0.1, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px, #000 ${interpolate(frame, [6, 62], [-260, 2340], {
            easing: Easing.bezier(0.35, 0.1, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <TonalAreas seed={5} />
      </AbsoluteFill>
      <AbsoluteFill
        name="Tonal areas — balanced behind the wave"
        style={{
          opacity: 0.07,
          maskImage: `linear-gradient(90deg, #000 ${interpolate(frame, [6, 62], [-420, 2180], {
            easing: Easing.bezier(0.35, 0.1, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px, rgba(0,0,0,0) ${interpolate(frame, [6, 62], [-260, 2340], {
            easing: Easing.bezier(0.35, 0.1, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <TonalAreas seed={5} />
      </AbsoluteFill>

      <AbsoluteFill
        name="Type revealed behind the wave"
        style={{
          maskImage: `linear-gradient(90deg, #000 ${interpolate(frame, [6, 62], [-460, 2140], {
            easing: Easing.bezier(0.35, 0.1, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px, rgba(0,0,0,0) ${interpolate(frame, [6, 62], [-300, 2300], {
            easing: Easing.bezier(0.35, 0.1, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <Interactive.Div
          name="Title — EVEN-LOOKING"
          style={{
            position: "absolute",
            left: 130,
            top: 330,
            fontFamily: "Archivo",
            fontWeight: 300,
            fontSize: 120,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#7A1E4A",
          }}
        >
          EVEN-LOOKING
        </Interactive.Div>
        <Interactive.Div
          name="Title — TONE"
          style={{
            position: "absolute",
            left: 124,
            top: 460,
            fontFamily: "Archivo",
            fontWeight: 800,
            fontSize: 230,
            lineHeight: 1,
            letterSpacing: 16,
            color: "#B8306F",
          }}
        >
          TONE
        </Interactive.Div>
      </AbsoluteFill>
      <Interactive.Div
        name="Small — TARGETED SPOT CARE"
        style={{
          position: "absolute",
          left: 134,
          top: 740,
          fontFamily: "Archivo",
          fontWeight: 500,
          fontSize: 42,
          lineHeight: 1,
          color: "#9A3A66",
          letterSpacing: interpolate(frame, [56, 86], [30, 18], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [56, 68], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        TARGETED SPOT CARE
      </Interactive.Div>

      <Interactive.Div
        name="Narrow wave of clear pink serum"
        style={{
          position: "absolute",
          left: -260,
          top: -60,
          width: 300,
          height: 1200,
          translate: interpolate(frame, [6, 62], ["-300px 0px", "2300px 0px"], {
            easing: Easing.bezier(0.35, 0.1, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background:
            "linear-gradient(90deg, rgba(255,150,195,0) 0%, rgba(255,150,195,0.16) 35%, rgba(255,180,212,0.32) 80%, rgba(255,240,247,0.9) 96%, rgba(255,150,195,0) 100%)",
          boxShadow: "18px 0 30px rgba(220,80,140,0.18)",
          filter: "blur(1.5px)",
        }}
      />
    </AbsoluteFill>
  );
};
