import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { FrostedPearl, GlossyPearl, MistDrift, SettledDew } from "./materials";

// SHOT 05 — HYDRATION + GLOW (0:11.1–0:12.8)
// The mist reaches a large pearl-glass surface (abstract, no skin). Tiny
// droplets settle; where they land the frosted, matte glass turns clear and
// luminous, showing HYDRATION and DEWY GLOW beneath. A lavender highlight
// travels across the hydrated glass.
export const J5DewyGlow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#EEE7FB" }}>
      <AbsoluteFill name="Hydrated, glossy pearl glass">
        <GlossyPearl />
      </AbsoluteFill>
      <Interactive.Div
        name="Title — HYDRATION (beneath the glass)"
        style={{
          position: "absolute",
          left: 0,
          top: 330,
          width: 1920,
          textAlign: "center",
          fontFamily: "DM Sans",
          fontWeight: 300,
          fontSize: 170,
          lineHeight: 1,
          letterSpacing: 26,
          color: "#6A54B0",
        }}
      >
        HYDRATION
      </Interactive.Div>
      <Interactive.Div
        name="Title — DEWY GLOW (beneath the glass)"
        style={{
          position: "absolute",
          left: 0,
          top: 560,
          width: 1920,
          textAlign: "center",
          fontFamily: "DM Sans",
          fontWeight: 600,
          fontSize: 72,
          lineHeight: 1,
          color: "#8D7BC9",
          letterSpacing: interpolate(frame, [38, 70], [40, 24], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [38, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DEWY GLOW
      </Interactive.Div>
      <AbsoluteFill
        name="Frosted, matte glass (clears where the dew lands)"
        style={{
          maskImage: `radial-gradient(circle at 960px 540px, rgba(0,0,0,0) ${interpolate(frame, [6, 62], [-300, 1300], {
            easing: Easing.bezier(0.3, 0.2, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px, #000 ${interpolate(frame, [6, 62], [0, 1600], {
            easing: Easing.bezier(0.3, 0.2, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <FrostedPearl />
      </AbsoluteFill>
      <AbsoluteFill name="Dew settling">
        <SettledDew
          progress={interpolate(frame, [0, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>
      <Interactive.Div
        name="Lavender highlight travelling"
        style={{
          position: "absolute",
          left: -900,
          top: -200,
          width: 700,
          height: 1500,
          rotate: "20deg",
          background:
            "linear-gradient(90deg, rgba(220,200,255,0) 0%, rgba(235,220,255,0.55) 50%, rgba(220,200,255,0) 100%)",
          mixBlendMode: "screen",
          translate: interpolate(frame, [36, 82], ["0px 0px", "2900px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill
        name="Mist arriving"
        style={{
          opacity: interpolate(frame, [0, 26], [0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MistDrift
          t={interpolate(frame, [0, 82], [40, 122], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          count={400}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
