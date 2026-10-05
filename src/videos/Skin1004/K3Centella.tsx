import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CentellaLeaf, WarmDrop } from "./materials";

// SHOT 03 — CENTELLA (0:05.3–0:08.2)
// A calm botanical macro on warm earth tones. A dew drop travels down a vein
// of the hero leaf, reaches its edge (at 1205, 756) and falls: CENTELLA
// ASIATICA, then SOOTHING CARE.
export const K3Centella: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#8C6440" }}>
      <AbsoluteFill
        name="Warm earth bokeh"
        style={{
          background:
            "radial-gradient(45% 55% at 75% 30%, rgba(255,222,160,0.9) 0%, rgba(214,160,96,0.6) 40%, rgba(140,96,58,0) 75%), radial-gradient(60% 70% at 15% 80%, rgba(120,80,45,0.9) 0%, rgba(120,80,45,0) 70%), linear-gradient(160deg, #D9B07A 0%, #A9774A 55%, #6E4A2C 100%)",
        }}
      />
      <Interactive.Div
        name="Warm light drifting"
        style={{
          position: "absolute",
          left: -600,
          top: -200,
          width: 900,
          height: 1500,
          rotate: "18deg",
          background:
            "linear-gradient(90deg, rgba(255,232,180,0) 0%, rgba(255,232,180,0.28) 50%, rgba(255,232,180,0) 100%)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "1500px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Background leaf — far right"
        style={{
          position: "absolute",
          left: 1560,
          top: -120,
          width: 460,
          height: 529,
          rotate: "150deg",
          filter: "blur(14px)",
          opacity: 0.75,
        }}
      >
        <CentellaLeaf tone="warm" seed={8} beads={false} />
      </Interactive.Div>
      <Interactive.Div
        name="Background leaf — low"
        style={{
          position: "absolute",
          left: 740,
          top: 640,
          width: 520,
          height: 598,
          rotate: "-140deg",
          filter: "blur(12px)",
          opacity: 0.8,
        }}
      >
        <CentellaLeaf tone="warm" seed={12} beads={false} />
      </Interactive.Div>

      <Interactive.Div
        name="Title — CENTELLA"
        style={{
          position: "absolute",
          left: 120,
          top: 330,
          fontFamily: "Albert Sans",
          fontWeight: 300,
          fontSize: 128,
          lineHeight: 1,
          letterSpacing: 20,
          color: "#FBF1DF",
          opacity: interpolate(frame, [36, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [36, 66], ["0px 24px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        CENTELLA
      </Interactive.Div>
      <Interactive.Div
        name="Title — ASIATICA"
        style={{
          position: "absolute",
          left: 124,
          top: 470,
          fontFamily: "Albert Sans",
          fontWeight: 600,
          fontSize: 76,
          lineHeight: 1,
          letterSpacing: 22,
          color: "#F2D49A",
          opacity: interpolate(frame, [42, 56], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [42, 72], ["0px 24px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ASIATICA
      </Interactive.Div>
      <Interactive.Div
        name="Small — SOOTHING CARE"
        style={{
          position: "absolute",
          left: 128,
          top: 600,
          fontFamily: "Albert Sans",
          fontWeight: 400,
          fontSize: 44,
          lineHeight: 1,
          letterSpacing: 18,
          color: "#E9DCC2",
          clipPath: `inset(0 ${interpolate(frame, [56, 78], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        SOOTHING CARE
      </Interactive.Div>

      <Interactive.Div
        name="Centella leaf — behind"
        style={{
          position: "absolute",
          left: 1450,
          top: 360,
          width: 470,
          height: 540,
          rotate: "38deg",
          filter: "blur(3px) drop-shadow(0 16px 20px rgba(60,35,15,0.35))",
        }}
      >
        <CentellaLeaf tone="fresh" seed={6} beads={false} />
      </Interactive.Div>
      <Interactive.Div
        name="Centella leaf — hero (drop runs along a vein)"
        style={{
          position: "absolute",
          left: 1000,
          top: 80,
          width: 760,
          height: 874,
          filter: "drop-shadow(0 18px 26px rgba(60,35,15,0.28))",
          scale: interpolate(frame, [0, 88], [1, 1.03], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CentellaLeaf tone="fresh" seed={3} />
      </Interactive.Div>
      <Interactive.Div
        name="Dew drop travelling, then falling"
        style={{
          position: "absolute",
          left: 1273,
          top: 610,
          width: 36,
          height: 42,
          translate: interpolate(frame, [4, 34, 52], ["0px 0px", "-86px 125px", "-96px 600px"], {
            easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.5, 0, 1, 0.5)],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [34, 52], [1, 1.6], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [0, 4, 50, 52], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <WarmDrop />
      </Interactive.Div>

      <Interactive.Div
        name="Foreground leaf (out of focus)"
        style={{
          position: "absolute",
          left: -120,
          top: 700,
          width: 560,
          height: 644,
          rotate: "-24deg",
          filter: "blur(20px)",
          opacity: 0.95,
          translate: interpolate(frame, [0, 88], ["40px 0px", "-40px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CentellaLeaf tone="warm" seed={4} beads={false} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
