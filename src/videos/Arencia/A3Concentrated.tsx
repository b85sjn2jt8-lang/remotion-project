import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { GelLayer, LightRing } from "./materials";

// SHOT 03 — CONCENTRATED BOOSTER (0:05.3–0:08.2)
// Abstract macro: a concentrated, cushioned pink gel glides through clear
// glass. Twelve tiny points of light travel to one centre point (960, 540);
// when they meet, a controlled bright pulse — TXA, then BOOSTER SHOT.
export const A3Concentrated: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#3A0622" }}>
      <AbsoluteFill
        name="Deep rose glass"
        style={{
          background:
            "radial-gradient(65% 75% at 50% 50%, #7A1647 0%, #4E0A2E 55%, #26031A 100%)",
        }}
      />
      <AbsoluteFill
        name="Glass reflections"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,200,225,0) 22%, rgba(255,200,225,0.12) 25%, rgba(255,200,225,0) 28%, rgba(255,200,225,0) 66%, rgba(255,200,225,0.08) 68%, rgba(255,200,225,0) 70%)",
        }}
      />
      <Interactive.Div
        name="Concentrated gel moving through glass"
        style={{
          position: "absolute",
          left: 360,
          top: 190,
          width: 1200,
          height: 700,
          translate: interpolate(frame, [0, 88], ["-140px 10px", "120px -10px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: 0.72,
        }}
      >
        <GelLayer
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Light particle 1"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [6, 40], ["-760px -320px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [6, 12, 38, 41], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 2"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [8, 42], ["-620px 260px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [8, 14, 40, 43], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 3"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [10, 41], ["-420px -420px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [10, 16, 39, 42], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 4"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [7, 43], ["-300px 380px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [7, 13, 41, 44], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 5"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [9, 41], ["520px -360px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [9, 15, 39, 42], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 6"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [6, 40], ["700px -80px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [6, 12, 38, 41], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 7"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [8, 42], ["640px 300px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [8, 14, 40, 43], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 8"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [10, 43], ["360px 430px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [10, 16, 41, 44], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 9"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [7, 42], ["-860px 60px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [7, 13, 40, 43], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 10"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [9, 43], ["860px 180px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [9, 15, 41, 44], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 11"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [8, 41], ["120px -470px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [8, 14, 39, 42], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light particle 12"
        style={{
          position: "absolute",
          left: 955,
          top: 535,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#FFF0F6",
          boxShadow: "0 0 12px 4px rgba(255,150,200,0.75)",
          translate: interpolate(frame, [10, 42], ["-120px 470px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [10, 16, 40, 43], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Convergence pulse"
        style={{
          position: "absolute",
          left: 160,
          top: -260,
          width: 1600,
          height: 1600,
          scale: interpolate(frame, [42, 74], [0.03, 1], {
            easing: Easing.bezier(0.2, 0.6, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [42, 45, 74], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <LightRing />
      </Interactive.Div>
      <Interactive.Div
        name="Pulse core"
        style={{
          position: "absolute",
          left: 760,
          top: 340,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,240,247,0.95), rgba(255,140,195,0.35) 40%, rgba(255,140,195,0))",
          opacity: interpolate(frame, [41, 44, 60], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Title — TXA"
        style={{
          position: "absolute",
          left: 0,
          top: 250,
          width: 1920,
          textAlign: "center",
          fontFamily: "Archivo",
          fontWeight: 800,
          fontSize: 320,
          lineHeight: 1,
          letterSpacing: 30,
          color: "#FFE6F0",
          opacity: interpolate(frame, [44, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [44, 70], [0.94, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        TXA
      </Interactive.Div>
      <Interactive.Div
        name="Title — BOOSTER SHOT"
        style={{
          position: "absolute",
          left: 0,
          top: 640,
          width: 1920,
          textAlign: "center",
          fontFamily: "Archivo",
          fontWeight: 600,
          fontSize: 76,
          lineHeight: 1,
          color: "#F6A2C6",
          letterSpacing: interpolate(frame, [56, 86], [48, 30], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [56, 66], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        BOOSTER SHOT
      </Interactive.Div>
    </AbsoluteFill>
  );
};
