import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { DewDrop, FrostedGlass, SerumFilm } from "./materials";

// SHOT 04 — MOISTURE LAYER (0:08.2–0:11.1)
// Cosmetic macro: a thin, watery layer of serum spreads smoothly across
// frosted glass, catching pale-blue highlights. Tiny drops merge into it as
// its edge arrives. The type only exists where the layer has spread.
export const B4MoistureLayer: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E9F0F6" }}>
      <AbsoluteFill
        name="Frosted glass (macro)"
        style={{
          scale: interpolate(frame, [0, 88], [1.06, 1], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <FrostedGlass />
      </AbsoluteFill>
      <AbsoluteFill
        name="Diffused daylight"
        style={{
          background:
            "radial-gradient(60% 70% at 75% 20%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <Interactive.Div
        name="Tiny drop — upper right"
        style={{
          position: "absolute",
          left: 1250,
          top: 330,
          width: 34,
          height: 30,
          opacity: interpolate(frame, [20, 26], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>
      <Interactive.Div
        name="Tiny drop — lower left"
        style={{
          position: "absolute",
          left: 300,
          top: 780,
          width: 26,
          height: 22,
          opacity: interpolate(frame, [22, 28], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>
      <Interactive.Div
        name="Tiny drop — lower right"
        style={{
          position: "absolute",
          left: 1520,
          top: 790,
          width: 40,
          height: 34,
          opacity: interpolate(frame, [34, 40], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>
      <Interactive.Div
        name="Tiny drop — far right"
        style={{
          position: "absolute",
          left: 1700,
          top: 230,
          width: 30,
          height: 26,
          opacity: interpolate(frame, [48, 54], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>
      <Interactive.Div
        name="Tiny drop — upper left"
        style={{
          position: "absolute",
          left: 380,
          top: 170,
          width: 28,
          height: 24,
          opacity: interpolate(frame, [30, 36], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>

      <AbsoluteFill name="Serum layer spreading">
        <SerumFilm
          cx={760}
          cy={560}
          r={interpolate(frame, [0, 80], [60, 1250], {
            easing: Easing.bezier(0.25, 0.4, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <Interactive.Div
            name="Pale-blue highlight moving in the layer"
            style={{
              position: "absolute",
              left: -400,
              top: -200,
              width: 900,
              height: 1500,
              rotate: "18deg",
              background:
                "linear-gradient(90deg, rgba(175,205,232,0) 0%, rgba(175,205,232,0.45) 50%, rgba(175,205,232,0) 100%)",
              translate: interpolate(frame, [0, 88], ["0px 0px", "1900px 0px"], {
                easing: Easing.bezier(0.45, 0, 0.55, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
          <Interactive.Div
            name="Title — BOOST"
            style={{
              position: "absolute",
              left: 0,
              top: 260,
              width: 1920,
              textAlign: "center",
              fontFamily: "Urbanist",
              fontWeight: 200,
              fontSize: 190,
              lineHeight: 1,
              letterSpacing: 40,
              color: "#46607A",
            }}
          >
            BOOST
          </Interactive.Div>
          <Interactive.Div
            name="Title — MOISTURE"
            style={{
              position: "absolute",
              left: 0,
              top: 470,
              width: 1920,
              textAlign: "center",
              fontFamily: "Urbanist",
              fontWeight: 500,
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: 30,
              color: "#46607A",
            }}
          >
            MOISTURE
          </Interactive.Div>
        </SerumFilm>
      </AbsoluteFill>

      <Interactive.Div
        name="Small — LIGHTWEIGHT SERUM"
        style={{
          position: "absolute",
          left: 0,
          top: 640,
          width: 1920,
          textAlign: "center",
          fontFamily: "Urbanist",
          fontWeight: 400,
          fontSize: 44,
          lineHeight: 1,
          color: "#6A819A",
          letterSpacing: interpolate(frame, [50, 84], [24, 16], {
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
        LIGHTWEIGHT SERUM
      </Interactive.Div>
    </AbsoluteFill>
  );
};
