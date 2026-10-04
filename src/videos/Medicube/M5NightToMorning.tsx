import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { StretchFilm } from "./materials";

// SHOT 05 — NIGHT → MORNING (0:09.9–0:12.6)
// Midnight rose gives way to soft champagne light entering from the left.
// The film and a glossy, hydrated surface catch the new light; MORNING GLOW
// is uncovered by the light itself.
export const M5NightToMorning: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#3A1529" }}>
      <AbsoluteFill
        name="Night"
        style={{
          background:
            "radial-gradient(90% 100% at 60% 40%, #8A4062 0%, #5A2443 45%, #2E1022 100%)",
        }}
      />
      <AbsoluteFill
        name="Morning light arriving"
        style={{
          background:
            "radial-gradient(90% 110% at 20% 40%, #FFF7EE 0%, #FBE6DC 35%, #F2CBC4 70%, #E3AAB0 100%)",
          maskImage: `linear-gradient(90deg, rgba(0,0,0,1) ${interpolate(frame, [8, 70], [-40, 110], {
            easing: Easing.bezier(0.4, 0, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%, rgba(0,0,0,0) ${interpolate(frame, [8, 70], [0, 150], {
            easing: Easing.bezier(0.4, 0, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%)`,
        }}
      />
      <Interactive.Div
        name="Glossy hydrated surface"
        style={{
          position: "absolute",
          left: -200,
          top: 760,
          width: 2320,
          height: 400,
          background:
            "linear-gradient(180deg, rgba(240,200,200,0.0) 0%, rgba(232,180,186,0.7) 12%, rgba(196,130,150,0.8) 100%)",
        }}
      />
      <Interactive.Div
        name="Morning reflection on the surface"
        style={{
          position: "absolute",
          left: -300,
          top: 800,
          width: 1400,
          height: 70,
          borderRadius: "50%",
          backgroundColor: "rgba(255,246,236,0.85)",
          filter: "blur(16px)",
          translate: interpolate(frame, [8, 80], ["-600px 0px", "1300px 0px"], {
            easing: Easing.bezier(0.4, 0, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Film catching the light"
        style={{
          position: "absolute",
          left: 200,
          top: 60,
          width: 1920,
          height: 1080,
          rotate: "-12deg",
          scale: "0.8",
          opacity: 0.9,
        }}
      >
        <StretchFilm
          tension={1}
          phase={interpolate(frame, [0, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          tone="morning"
        />
      </Interactive.Div>

      <Interactive.Div
        name="Title — OVERNIGHT CARE"
        style={{
          position: "absolute",
          left: 130,
          top: 300,
          fontFamily: "Jost",
          fontWeight: 300,
          fontSize: 96,
          lineHeight: 1,
          letterSpacing: 14,
          color: "#F7E6DC",
          opacity: interpolate(frame, [10, 22, 40, 52], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        OVERNIGHT CARE
      </Interactive.Div>
      <Interactive.Div
        name="Title — MORNING GLOW"
        style={{
          position: "absolute",
          left: 128,
          top: 300,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 130,
          lineHeight: 1,
          letterSpacing: 8,
          color: "#5A2443",
          maskImage: `linear-gradient(90deg, rgba(0,0,0,1) ${interpolate(frame, [44, 74], [-30, 120], {
            easing: Easing.bezier(0.4, 0, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%, rgba(0,0,0,0) ${interpolate(frame, [44, 74], [0, 150], {
            easing: Easing.bezier(0.4, 0, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%)`,
        }}
      >
        MORNING GLOW
      </Interactive.Div>
    </AbsoluteFill>
  );
};
