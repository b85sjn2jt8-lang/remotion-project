import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { FoamMass } from "./materials";

// SHOT 03 — RICH FOAM (0:05–0:07.6)
// Macro inside dense, fine-bubbled cleansing foam. The camera drifts over
// it, micro-bubbles breathe, a clean stream of water runs through, and a
// drift of foam uncovers GENTLE / BUT DEEP.
export const H3RichFoam: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F5EF" }}>
      <Interactive.Div
        name="Macro foam (camera travel)"
        style={{
          position: "absolute",
          left: -120,
          top: -100,
          width: 2400,
          height: 1400,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-280px -60px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 88], [1.08, 1], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <FoamMass
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          w={2400}
          h={1400}
          edge="none"
          seed={21}
          bubbleScale={2.2}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Clean water stream"
        style={{
          position: "absolute",
          left: -600,
          top: 660,
          width: 3200,
          height: 150,
          rotate: "-9deg",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(205,222,203,0.22) 22%, rgba(255,255,255,0.75) 42%, rgba(225,238,224,0.15) 58%, rgba(185,205,183,0.25) 80%, rgba(255,255,255,0) 100%)",
          backdropFilter: "blur(5px) brightness(1.03)",
          maskImage: `linear-gradient(90deg, rgba(0,0,0,1) ${interpolate(frame, [26, 70], [0, 100], {
            easing: Easing.bezier(0.4, 0, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%, rgba(0,0,0,0) ${interpolate(frame, [26, 70], [6, 106], {
            easing: Easing.bezier(0.4, 0, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%)`,
        }}
      />

      <Interactive.Div
        name="Title — GENTLE"
        style={{
          position: "absolute",
          left: 128,
          top: 230,
          fontFamily: "Figtree",
          fontWeight: 800,
          fontSize: 180,
          lineHeight: 1,
          letterSpacing: -3,
          color: "#2E4A35",
          opacity: interpolate(frame, [14, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        GENTLE
      </Interactive.Div>
      <Interactive.Div
        name="Title — BUT DEEP"
        style={{
          position: "absolute",
          left: 132,
          top: 410,
          fontFamily: "Figtree",
          fontWeight: 300,
          fontSize: 180,
          lineHeight: 1,
          letterSpacing: 4,
          color: "#3F6248",
          opacity: interpolate(frame, [24, 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        BUT DEEP
      </Interactive.Div>
      <Interactive.Div
        name="Line — CLEANSING FOAM"
        style={{
          position: "absolute",
          left: 136,
          top: 620,
          fontFamily: "Figtree",
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: 14,
          color: "#5F8467",
          opacity: interpolate(frame, [42, 54], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        CLEANSING FOAM
      </Interactive.Div>

      <Interactive.Div
        name="Foam drift over the type"
        style={{
          position: "absolute",
          left: 0,
          top: -110,
          width: 1700,
          height: 1300,
          translate: interpolate(frame, [0, 40, 88], ["-160px 0px", "1300px 0px", "1500px 0px"], {
            easing: [Easing.bezier(0.45, 0, 0.3, 1), Easing.linear],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(-20px 16px 30px rgba(60,85,62,0.22))",
        }}
      >
        <FoamMass
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          w={1700}
          h={1300}
          edge="both"
          seed={27}
          bubbleScale={1.6}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
