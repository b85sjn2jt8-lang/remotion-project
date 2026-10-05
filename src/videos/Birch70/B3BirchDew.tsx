import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BirchBark, BirchLeaf, DewDrop } from "./materials";

// SHOT 03 — BIRCH + DEW (0:05.3–0:08.2)
// Through a passing dew drop into a calm macro: pale birch bark, a few fresh
// birch leaves, morning dew. A drop gathers at a leaf tip (tip at 1360, 428),
// falls past the camera, and BIRCH, then MOISTURE, is left behind.
export const B3BirchDew: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#EFEAE0" }}>
      <Interactive.Div
        name="Birch bark surface (slow glide)"
        style={{
          position: "absolute",
          left: -120,
          top: -80,
          width: 2160,
          height: 1240,
          filter: "blur(1.5px)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "-60px -20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <BirchBark />
      </Interactive.Div>
      <AbsoluteFill
        name="Morning daylight wash"
        style={{
          background:
            "radial-gradient(70% 80% at 20% 15%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 50%, rgba(214,226,238,0.35) 100%)",
        }}
      />

      <Interactive.Div
        name="Title — BIRCH"
        style={{
          position: "absolute",
          left: 130,
          top: 330,
          fontFamily: "Urbanist",
          fontWeight: 200,
          fontSize: 180,
          lineHeight: 1,
          letterSpacing: 34,
          color: "#465D74",
          clipPath: `inset(0 0 ${interpolate(frame, [36, 52], [100, 0], {
            easing: Easing.bezier(0.4, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0)`,
          filter: `blur(${interpolate(frame, [36, 56], [6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        BIRCH
      </Interactive.Div>
      <Interactive.Div
        name="Title — MOISTURE"
        style={{
          position: "absolute",
          left: 138,
          top: 548,
          fontFamily: "Urbanist",
          fontWeight: 500,
          fontSize: 66,
          lineHeight: 1,
          color: "#5A7189",
          letterSpacing: interpolate(frame, [52, 86], [40, 26], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [52, 66], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        MOISTURE
      </Interactive.Div>

      <Interactive.Div
        name="Twig"
        style={{ position: "absolute", left: 1100, top: -40, width: 900, height: 260 }}
      >
        <svg viewBox="0 0 900 260" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <path d="M 900 30 C 700 60 520 90 330 120 C 250 132 190 140 120 150" fill="none" stroke="#7B6A52" strokeWidth="7" strokeLinecap="round" />
          <path d="M 520 92 C 470 120 420 150 380 175" fill="none" stroke="#7B6A52" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </Interactive.Div>
      <Interactive.Div
        name="Birch leaf — back"
        style={{
          position: "absolute",
          left: 1500,
          top: 60,
          width: 190,
          height: 253,
          rotate: "-34deg",
          transformOrigin: "50% 5%",
          filter: "blur(2.5px)",
          opacity: 0.9,
        }}
      >
        <BirchLeaf beads={false} />
      </Interactive.Div>
      <Interactive.Div
        name="Birch leaf — small"
        style={{
          position: "absolute",
          left: 1130,
          top: 100,
          width: 150,
          height: 200,
          rotate: "22deg",
          transformOrigin: "50% 5%",
        }}
      >
        <BirchLeaf />
      </Interactive.Div>
      <Interactive.Div
        name="Birch leaf — hero (drop forms at its tip)"
        style={{
          position: "absolute",
          left: 1240,
          top: 120,
          width: 240,
          height: 320,
          transformOrigin: "50% 5%",
          rotate: interpolate(frame, [0, 30], ["2deg", "0deg"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(0 16px 18px rgba(80,70,50,0.22))",
        }}
      >
        <BirchLeaf />
      </Interactive.Div>
      <Interactive.Div
        name="Dew gathering at the tip, then falling past the lens"
        style={{
          position: "absolute",
          left: 1342,
          top: 422,
          width: 36,
          height: 44,
          transformOrigin: "50% 0%",
          scale: interpolate(frame, [0, 32, 50], [0.35, 1, 7], {
            easing: [Easing.bezier(0.33, 0, 0.67, 1), Easing.bezier(0.6, 0, 1, 0.6)],
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [32, 50], ["0px 0px", "-80px 760px"], {
            easing: Easing.bezier(0.5, 0, 1, 0.5),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [36, 50], [0, 3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [46, 50], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>

      <Interactive.Div
        name="Foreground leaf (out of focus)"
        style={{
          position: "absolute",
          left: -60,
          top: 700,
          width: 380,
          height: 506,
          rotate: "148deg",
          filter: "blur(16px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 88], ["40px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <BirchLeaf beads={false} />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground dew (out of focus)"
        style={{
          position: "absolute",
          left: 1700,
          top: 820,
          width: 160,
          height: 190,
          filter: "blur(9px)",
          opacity: 0.85,
        }}
      >
        <DewDrop />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
