import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CaviarPearl } from "./materials";

// SHOT 03 — CAVIAR PEARL WORLD (0:05.3–0:08.2)
// Inside the giant sphere: luminous pearlescent spheres suspended in
// translucent lavender material, at several depths. CAVIAR + PDRN sit deep in
// the scene; some pearls pass in front of the letters. A soft violet light
// passes through.
export const J3CaviarPearls: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#DCD0F2" }}>
      <AbsoluteFill
        name="Translucent lavender material"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 45%, #F3EEFC 0%, #DED2F4 50%, #C3B1E8 100%)",
        }}
      />
      <Interactive.Div
        name="Soft violet light passing"
        style={{
          position: "absolute",
          left: -900,
          top: -200,
          width: 800,
          height: 1500,
          rotate: "18deg",
          background:
            "linear-gradient(90deg, rgba(190,160,255,0) 0%, rgba(205,180,255,0.4) 50%, rgba(190,160,255,0) 100%)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "2900px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Pearl behind the type 1"
        style={{
          position: "absolute",
          left: 260,
          top: 170,
          width: 70,
          height: 70,
          filter: "blur(4px)",
          opacity: 0.7,
          translate: interpolate(frame, [0, 88], ["0px 0px", "40px 20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl behind the type 2"
        style={{
          position: "absolute",
          left: 1500,
          top: 140,
          width: 90,
          height: 90,
          filter: "blur(5px)",
          opacity: 0.7,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-30px 30px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl behind the type 3"
        style={{
          position: "absolute",
          left: 1260,
          top: 760,
          width: 60,
          height: 60,
          filter: "blur(3px)",
          opacity: 0.75,
          translate: interpolate(frame, [0, 88], ["0px 0px", "30px -20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl behind the type 4"
        style={{
          position: "absolute",
          left: 640,
          top: 820,
          width: 46,
          height: 46,
          filter: "blur(3px)",
          opacity: 0.7,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-20px -30px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>

      <Interactive.Div
        name="Title — CAVIAR"
        style={{
          position: "absolute",
          left: 0,
          top: 250,
          width: 1920,
          textAlign: "center",
          fontFamily: "DM Sans",
          fontWeight: 300,
          fontSize: 250,
          lineHeight: 1,
          letterSpacing: 30,
          color: "#6A54B0",
          opacity: interpolate(frame, [8, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [8, 34], [8, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        CAVIAR
      </Interactive.Div>
      <Interactive.Div
        name="Title — + PDRN"
        style={{
          position: "absolute",
          left: 0,
          top: 540,
          width: 1920,
          textAlign: "center",
          fontFamily: "DM Sans",
          fontWeight: 700,
          fontSize: 210,
          lineHeight: 1,
          letterSpacing: 24,
          color: "#4E3A94",
          opacity: interpolate(frame, [22, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [22, 48], [8, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <span style={{ fontWeight: 200 }}>+ </span>PDRN
      </Interactive.Div>
      <Interactive.Div
        name="Pearl in front of the type 1"
        style={{
          position: "absolute",
          left: 980,
          top: 330,
          width: 120,
          height: 120,
          filter: "blur(0px)",
          opacity: 0.95,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-60px 20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl in front of the type 2"
        style={{
          position: "absolute",
          left: 560,
          top: 560,
          width: 64,
          height: 64,
          filter: "blur(0px)",
          opacity: 0.95,
          translate: interpolate(frame, [0, 88], ["0px 0px", "50px -20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl in front of the type 3"
        style={{
          position: "absolute",
          left: 1420,
          top: 470,
          width: 150,
          height: 150,
          filter: "blur(1px)",
          opacity: 0.92,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-80px -10px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl in front of the type 4"
        style={{
          position: "absolute",
          left: 1660,
          top: 820,
          width: 240,
          height: 240,
          filter: "blur(14px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-140px -30px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl in front of the type 5"
        style={{
          position: "absolute",
          left: 120,
          top: 760,
          width: 200,
          height: 200,
          filter: "blur(12px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 88], ["0px 0px", "120px -20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
