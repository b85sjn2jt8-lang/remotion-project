import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { ClearDrop, GreenPlum, PlumLeaf } from "./materials";

// SHOT 03 — GREEN PLUM IDENTITY (0:05.3–0:08.2)
// A calm botanical still: one green plum resting on ivory ceramic with two
// plum leaves, pale-mint daylight. A clear drop slides slowly across the
// fruit (plum centre ≈ 1310, 644). GREEN PLUM / FRESH + BALANCED.
export const P3GreenPlum: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E7F1EB" }}>
      <AbsoluteFill
        name="Pale mint daylight"
        style={{
          background:
            "radial-gradient(70% 80% at 70% 30%, #F6FBF8 0%, #E3EFE8 50%, #CFE2D8 100%)",
        }}
      />
      <Interactive.Div
        name="Botanical shadow on the wall"
        style={{
          position: "absolute",
          left: 1500,
          top: -260,
          width: 260,
          height: 650,
          rotate: "32deg",
          filter: "blur(14px)",
          opacity: 0.14,
          mixBlendMode: "multiply",
          translate: interpolate(frame, [0, 88], ["0px 0px", "-30px 8px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PlumLeaf tone="fresh" />
      </Interactive.Div>

      <Interactive.Div
        name="Title — GREEN PLUM"
        style={{
          position: "absolute",
          left: 130,
          top: 360,
          fontFamily: "Hanken Grotesk",
          fontWeight: 300,
          fontSize: 120,
          lineHeight: 1,
          letterSpacing: 12,
          color: "#2F5547",
          opacity: interpolate(frame, [10, 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [10, 40], ["0px 20px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        GREEN PLUM
      </Interactive.Div>
      <Interactive.Div
        name="Small — FRESH + BALANCED"
        style={{
          position: "absolute",
          left: 136,
          top: 510,
          fontFamily: "Hanken Grotesk",
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1,
          letterSpacing: 16,
          color: "#7E6A86",
          clipPath: `inset(0 ${interpolate(frame, [30, 54], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        FRESH + BALANCED
      </Interactive.Div>

      <AbsoluteFill
        name="Still life (slow drift)"
        style={{
          transformOrigin: "1300px 760px",
          translate: "170px 0px",
          scale: interpolate(frame, [0, 88], [1.04, 1], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Ivory ceramic"
          style={{
            position: "absolute",
            left: 660,
            top: 740,
            width: 1400,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(60% 55% at 45% 35%, #FFFDF8 0%, #F3EFE5 55%, #DCD7CB 100%)",
            boxShadow: "inset 0 4px 0 rgba(255,255,255,0.9), 0 -6px 30px rgba(90,110,100,0.12)",
          }}
        />
        <Interactive.Div
          name="Plum leaf — left"
          style={{
            position: "absolute",
            left: 1000,
            top: 300,
            width: 190,
            height: 475,
            rotate: "-38deg",
            transformOrigin: "50% 96%",
            filter: "drop-shadow(0 12px 14px rgba(60,80,60,0.18))",
          }}
        >
          <PlumLeaf tone="fresh" />
        </Interactive.Div>
        <Interactive.Div
          name="Plum leaf — right"
          style={{
            position: "absolute",
            left: 1380,
            top: 330,
            width: 170,
            height: 425,
            rotate: "44deg",
            transformOrigin: "50% 96%",
            filter: "blur(1.5px) drop-shadow(0 12px 14px rgba(60,80,60,0.16))",
          }}
        >
          <PlumLeaf tone="soft" />
        </Interactive.Div>
        <Interactive.Div
          name="Plum contact shadow"
          style={{
            position: "absolute",
            left: 1160,
            top: 790,
            width: 310,
            height: 44,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(60,80,60,0.45), rgba(60,80,60,0))",
            filter: "blur(6px)",
          }}
        />
        <Interactive.Div
          name="Green plum"
          style={{ position: "absolute", left: 1120, top: 420, width: 380, height: 399 }}
        >
          <GreenPlum />
        </Interactive.Div>
        <Interactive.Div
          name="Clear drop sliding across the plum"
          style={{
            position: "absolute",
            left: 1238,
            top: 527,
            width: 24,
            height: 28,
            translate: interpolate(frame, [6, 74], ["0px 0px", "128px 150px"], {
              easing: Easing.bezier(0.4, 0, 0.6, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [6, 74], [1, 1.25], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <ClearDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground leaf (out of focus)"
        style={{
          position: "absolute",
          left: 1680,
          top: 600,
          width: 260,
          height: 650,
          rotate: "-30deg",
          filter: "blur(18px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 88], ["20px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PlumLeaf tone="soft" />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
