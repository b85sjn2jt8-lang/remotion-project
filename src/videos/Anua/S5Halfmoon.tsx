import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CottonPad, GlassDisc, JAR_SRC } from "./elements";

// Half cotton, half rose glass — the pad format turned into a moon phase.
const HalfmoonDisc: React.FC = () => {
  return (
    <AbsoluteFill style={{ borderRadius: "50%", overflow: "hidden" }}>
      <GlassDisc />
      <AbsoluteFill style={{ clipPath: "inset(0 0 0 50%)" }}>
        <CottonPad />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// SCENE 05 — HALFMOON VISUAL (0:10.5–0:13)
// Circular and half-moon pad shapes hang at different depths; the camera
// travels through them toward the jar.
export const S5Halfmoon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F6C8D3" }}>
      <AbsoluteFill
        name="Far layer"
        style={{
          scale: interpolate(frame, [0, 90], [1, 1.08], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Soft backdrop"
          style={{
            background:
              "radial-gradient(80% 85% at 62% 45%, #FFF0F3 0%, #F9D0DA 45%, #EFA7B9 100%)",
          }}
        />
        <Interactive.Div
          name="Orbit ring large"
          style={{
            position: "absolute",
            left: 760,
            top: -60,
            width: 1200,
            height: 1200,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.6)",
            rotate: interpolate(frame, [0, 90], ["0deg", "12deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Orbit ring small"
          style={{
            position: "absolute",
            left: 960,
            top: 140,
            width: 800,
            height: 800,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.5)",
          }}
        />
        <Interactive.Div
          name="Far halfmoon"
          style={{
            position: "absolute",
            left: 1600,
            top: 120,
            width: 240,
            height: 240,
            filter: "blur(5px)",
            opacity: 0.8,
            rotate: "-30deg",
          }}
        >
          <HalfmoonDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Far glass disc"
          style={{
            position: "absolute",
            left: 760,
            top: 760,
            width: 200,
            height: 200,
            filter: "blur(6px)",
            opacity: 0.7,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product layer"
        style={{
          transformOrigin: "1240px 560px",
          scale: interpolate(frame, [0, 90], [0.9, 1.04], {
            easing: Easing.bezier(0.33, 0, 0.4, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Glass plinth"
          style={{
            position: "absolute",
            left: 900,
            top: 790,
            width: 680,
            height: 110,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.85) 0%, rgba(255,214,225,0.7) 50%, rgba(236,140,166,0.75) 100%)",
            border: "2px solid rgba(255,255,255,0.85)",
            boxShadow: "0 24px 40px rgba(180,60,95,0.25), inset 0 -10px 20px rgba(214,96,130,0.3)",
          }}
        />
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1010,
            top: 832,
            width: 460,
            height: 26,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(110,20,50,0.55), rgba(110,20,50,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ANUA jar"
          src={staticFile(JAR_SRC)}
          style={{ position: "absolute", left: 1000, top: 405, width: 480 }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Title — TARGETED CARE"
        style={{
          position: "absolute",
          left: 140,
          top: 380,
          fontFamily: "Manrope",
          fontWeight: 300,
          fontSize: 124,
          lineHeight: 1.05,
          color: "#3B1520",
          letterSpacing: interpolate(frame, [18, 60], [30, 4], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [18, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [18, 40], [12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        TARGETED
        <br />
        <span style={{ fontWeight: 800 }}>CARE</span>
      </Interactive.Div>

      <AbsoluteFill
        name="Mid layer"
        style={{
          transformOrigin: "1100px 540px",
          scale: interpolate(frame, [0, 90], [1, 1.5], {
            easing: Easing.bezier(0.33, 0, 0.5, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Mid halfmoon top"
          style={{
            position: "absolute",
            left: 640,
            top: 40,
            width: 300,
            height: 300,
            filter: "blur(2px)",
            rotate: interpolate(frame, [0, 90], ["20deg", "40deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <HalfmoonDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Mid halfmoon bottom right"
          style={{
            position: "absolute",
            left: 1560,
            top: 700,
            width: 340,
            height: 340,
            filter: "blur(3px)",
            rotate: interpolate(frame, [0, 90], ["150deg", "128deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <HalfmoonDisc />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Near cotton pad (passes the lens)"
        style={{
          position: "absolute",
          left: -300,
          top: 500,
          width: 900,
          height: 900,
          translate: interpolate(frame, [0, 70], ["0px 0px", "-700px 260px"], {
            easing: Easing.bezier(0.4, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 70], [1, 1.8], {
            easing: Easing.bezier(0.4, 0, 0.6, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [0, 70], [10, 26], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <CottonPad />
      </Interactive.Div>
      <Interactive.Div
        name="Near halfmoon (passes the lens)"
        style={{
          position: "absolute",
          left: 1500,
          top: -360,
          width: 760,
          height: 760,
          rotate: "-60deg",
          translate: interpolate(frame, [10, 90], ["0px 0px", "520px -300px"], {
            easing: Easing.bezier(0.4, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [10, 90], [1, 1.7], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "blur(18px)",
        }}
      >
        <HalfmoonDisc />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
