import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CentellaLeaf, EarthTexture, LensLeafWarm, SandDrift } from "./materials";

// SHOT 01 — MADAGASCAR ORIGIN (0:00–0:02.3)
// Opens behind a warm out-of-focus Centella leaf (the loop seam), which drifts
// off to reveal sunlit Madagascar earth seen from very low. The camera glides
// over the ripples, sand skates across the surface, and the shadow of a
// single Centella leaf crosses the ground, leaving MADAGASCAR behind it.
export const K1Origin: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E9C894" }}>
      <AbsoluteFill name="Low camera over the earth" style={{ perspective: 900, perspectiveOrigin: "50% 0%" }}>
        <Interactive.Div
          name="Earth plane"
          style={{
            position: "absolute",
            left: -4200,
            top: -1700,
            width: 10320,
            height: 2900,
            transformOrigin: "50% 100%",
            rotate: "x 68deg",
            overflow: "hidden",
          }}
        >
          <Interactive.Div
            name="Earth texture (glide)"
            style={{
              position: "absolute",
              left: 0,
              top: -600,
              width: 10320,
              height: 3500,
              translate: interpolate(frame, [0, 86], ["0px 0px", "-120px 520px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <EarthTexture />
          </Interactive.Div>
        </Interactive.Div>
      </AbsoluteFill>
      <AbsoluteFill
        name="Golden morning haze on the horizon"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,226,180,1) 0%, rgba(246,214,160,0.85) 18%, rgba(240,200,140,0.3) 38%, rgba(240,200,140,0) 55%)",
        }}
      />
      <AbsoluteFill
        name="Low sun"
        style={{
          background:
            "radial-gradient(45% 40% at 78% 4%, rgba(255,240,205,0.9) 0%, rgba(255,226,170,0.35) 45%, rgba(255,226,170,0) 100%)",
        }}
      />
      <AbsoluteFill name="Sand skating across the surface" style={{ opacity: 0.8 }}>
        <SandDrift
          t={interpolate(frame, [0, 86], [0, 86], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Centella leaf shadow crossing the earth"
        style={{
          position: "absolute",
          left: -1400,
          top: 180,
          width: 1000,
          height: 1150,
          rotate: "24deg",
          filter: "blur(20px)",
          opacity: 0.42,
          mixBlendMode: "multiply",
          translate: interpolate(frame, [8, 72], ["0px 0px", "3600px -120px"], {
            easing: Easing.bezier(0.35, 0.1, 0.55, 0.95),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CentellaLeaf tone="shadow" />
      </Interactive.Div>

      <Interactive.Div
        name="Title — MADAGASCAR"
        style={{
          position: "absolute",
          left: 0,
          top: 400,
          width: 1920,
          textAlign: "center",
          fontFamily: "Albert Sans",
          fontWeight: 300,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 34,
          color: "#4A2F1C",
          clipPath: `inset(-40px ${interpolate(frame, [8, 72], [2820, -780], {
            easing: Easing.bezier(0.35, 0.1, 0.55, 0.95),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px -40px -40px)`,
        }}
      >
        MADAGASCAR
      </Interactive.Div>
      <Interactive.Div
        name="Small — CENTELLA ASIATICA"
        style={{
          position: "absolute",
          left: 0,
          top: 600,
          width: 1920,
          textAlign: "center",
          fontFamily: "Albert Sans",
          fontWeight: 500,
          fontSize: 46,
          lineHeight: 1,
          color: "#55623A",
          letterSpacing: interpolate(frame, [50, 84], [30, 20], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [50, 64], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        CENTELLA ASIATICA
      </Interactive.Div>

      <Interactive.Div
        name="Warm leaf leaving the lens (loop seam)"
        style={{
          position: "absolute",
          left: -1000,
          top: -1000,
          width: 3920,
          height: 3080,
          maskImage: "radial-gradient(ellipse 1500px 2000px at 1960px 1540px, #000 90%, rgba(0,0,0,0) 100%)",
          translate: interpolate(frame, [0, 24], ["0px 0px", "3000px -200px"], {
            easing: Easing.bezier(0.2, 0.4, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <LensLeafWarm />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
