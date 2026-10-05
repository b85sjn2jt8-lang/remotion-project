import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { LiquidLayer, SmoothSurface, TexturedSurface } from "./materials";

// SHOT 04 — AHA + BHA (0:08.2–0:11.1)
// Two very thin clear liquid layers glide in from left and right, one
// carrying AHA, the other BHA, and meet in the centre: AHA + BHA. Then a
// third pass of liquid travels over an abstract cosmetic surface (not skin):
// uneven micro-texture ahead of it, smooth satin behind. GENTLE EXFOLIATION.
export const P4AhaBha: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#EEF5F1" }}>
      <AbsoluteFill
        name="Clear glass environment"
        style={{
          background:
            "linear-gradient(180deg, #F8FBF9 0%, #EAF3EE 55%, #DDEBE4 100%)",
        }}
      />
      <AbsoluteFill
        name="Glass reflections"
        style={{
          background:
            "linear-gradient(118deg, rgba(255,255,255,0) 18%, rgba(255,255,255,0.5) 21%, rgba(255,255,255,0) 24%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.35) 72%, rgba(255,255,255,0) 74%)",
        }}
      />

      <AbsoluteFill
        name="Cosmetic surface"
        style={{
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0) 600px, #000 680px)",
        }}
      >
        <SmoothSurface />
        <AbsoluteFill
          name="Uneven texture ahead of the liquid"
          style={{
            maskImage: `linear-gradient(90deg, rgba(0,0,0,0) ${interpolate(frame, [40, 78], [-320, 2100], {
              easing: Easing.bezier(0.3, 0.2, 0.4, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px, #000 ${interpolate(frame, [40, 78], [-80, 2340], {
              easing: Easing.bezier(0.3, 0.2, 0.4, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <TexturedSurface />
        </AbsoluteFill>
        <AbsoluteFill name="Smoothing liquid pass">
          <LiquidLayer
            front={interpolate(frame, [40, 78], [-200, 2220], {
              easing: Easing.bezier(0.3, 0.2, 0.4, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            t={interpolate(frame, [0, 88], [20, 108], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            tint="rgba(214,238,228,0.12)"
          />
        </AbsoluteFill>
        <Interactive.Div
          name="Title — GENTLE EXFOLIATION"
          style={{
            position: "absolute",
            left: 0,
            top: 830,
            width: 1920,
            textAlign: "center",
            fontFamily: "Hanken Grotesk",
            fontWeight: 400,
            fontSize: 60,
            lineHeight: 1,
            color: "#2F5547",
            letterSpacing: interpolate(frame, [56, 86], [34, 22], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [56, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          GENTLE EXFOLIATION
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill name="Layer from the left — AHA">
        <LiquidLayer
          front={interpolate(frame, [2, 30, 50], [-300, 960, 2600], {
            easing: [Easing.bezier(0.25, 0.5, 0.35, 1), Easing.bezier(0.5, 0, 0.6, 1)],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <Interactive.Div
            name="AHA"
            style={{
              position: "absolute",
              left: 0,
              top: 230,
              width: 860,
              textAlign: "right",
              fontFamily: "Hanken Grotesk",
              fontWeight: 300,
              fontSize: 210,
              lineHeight: 1,
              letterSpacing: 16,
              color: "#2F5547",
            }}
          >
            AHA
          </Interactive.Div>
        </LiquidLayer>
      </AbsoluteFill>
      <AbsoluteFill name="Layer from the right — BHA">
        <LiquidLayer
          front={interpolate(frame, [2, 30, 50], [2220, 960, -700], {
            easing: [Easing.bezier(0.25, 0.5, 0.35, 1), Easing.bezier(0.5, 0, 0.6, 1)],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          toLeft
          t={interpolate(frame, [0, 88], [40, 128], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <Interactive.Div
            name="BHA"
            style={{
              position: "absolute",
              left: 1060,
              top: 230,
              fontFamily: "Hanken Grotesk",
              fontWeight: 300,
              fontSize: 210,
              lineHeight: 1,
              letterSpacing: 16,
              color: "#2F5547",
            }}
          >
            BHA
          </Interactive.Div>
        </LiquidLayer>
      </AbsoluteFill>
      <Interactive.Div
        name="plus (where the layers meet)"
        style={{
          position: "absolute",
          left: 0,
          top: 262,
          width: 1920,
          textAlign: "center",
          fontFamily: "Hanken Grotesk",
          fontWeight: 200,
          fontSize: 140,
          lineHeight: 1,
          color: "#8C7398",
          opacity: interpolate(frame, [28, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [28, 44], [0.7, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        +
      </Interactive.Div>
      <Interactive.Div
        name="Meeting glint"
        style={{
          position: "absolute",
          left: 880,
          top: -100,
          width: 160,
          height: 1280,
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(10px)",
          opacity: interpolate(frame, [26, 30, 46], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
