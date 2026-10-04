import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { GlassDisc, JAR_SRC, SerumDrop } from "./elements";

// SCENE 02 — PRODUCT HERO (0:02.5–0:05)
// The jar stands on a rose-glass platform, backlit, with the headline set
// behind its lid. A highlight travels across the jar while the camera pushes in.
export const S2Hero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8CBD6" }}>
      <AbsoluteFill
        name="Background (slow layer)"
        style={{
          scale: interpolate(frame, [0, 90], [1, 1.02], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Studio gradient"
          style={{
            background:
              "radial-gradient(75% 75% at 50% 40%, #FFEDF1 0%, #F9CED9 45%, #EEA6B8 100%)",
          }}
        />
        <Interactive.Div
          name="Backlight glow"
          style={{
            position: "absolute",
            left: 460,
            top: 60,
            width: 1000,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,236,241,0.5) 55%, rgba(255,236,241,0))",
            opacity: interpolate(frame, [0, 30, 90], [0.7, 1, 0.85], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Halo ring"
          style={{
            position: "absolute",
            left: 560,
            top: 150,
            width: 800,
            height: 800,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.75)",
            boxShadow: "0 0 40px rgba(255,255,255,0.35)",
            scale: interpolate(frame, [0, 90], [0.94, 1.02], {
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Back glass disc"
          style={{
            position: "absolute",
            left: 1440,
            top: 170,
            width: 260,
            height: 260,
            filter: "blur(9px)",
            opacity: 0.75,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Headline — BRIGHTENING PAD"
          style={{
            position: "absolute",
            left: 0,
            top: 158,
            width: 1920,
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 300,
            fontSize: 160,
            lineHeight: 1,
            letterSpacing: interpolate(frame, [4, 50], [34, 14], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            color: "#4A1726",
            whiteSpace: "nowrap",
            opacity: interpolate(frame, [4, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [4, 40], ["0px 30px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          BRIGHTENING PAD
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "960px 700px",
          scale: interpolate(frame, [0, 90], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Platform body"
          style={{
            position: "absolute",
            left: 440,
            top: 850,
            width: 1040,
            height: 320,
            background:
              "linear-gradient(180deg, rgba(255,198,212,0.75) 0%, rgba(240,140,166,0.7) 55%, rgba(226,112,142,0.8) 100%)",
            borderLeft: "2px solid rgba(255,255,255,0.5)",
            borderRight: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "inset 0 30px 40px rgba(255,255,255,0.35)",
            backdropFilter: "blur(14px)",
          }}
        />
        <Interactive.Div
          name="Platform top"
          style={{
            position: "absolute",
            left: 440,
            top: 770,
            width: 1040,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 38%, rgba(255,255,255,0.85) 0%, rgba(255,214,225,0.75) 45%, rgba(244,160,182,0.75) 100%)",
            border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: "inset 0 -12px 24px rgba(214,96,130,0.35)",
            overflow: "hidden",
          }}
        >
          <Img
            name="Jar reflection"
            src={staticFile(JAR_SRC)}
            style={{
              position: "absolute",
              left: 225,
              top: 90,
              width: 590,
              scale: "1 -1",
              opacity: 0.3,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 22%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Ambient occlusion"
          style={{
            position: "absolute",
            left: 640,
            top: 830,
            width: 640,
            height: 90,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(160,50,85,0.35), rgba(160,50,85,0))",
            filter: "blur(10px)",
          }}
        />
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 680,
            top: 846,
            width: 560,
            height: 26,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(110,20,50,0.6), rgba(110,20,50,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ANUA jar"
          src={staticFile(JAR_SRC)}
          style={{ position: "absolute", left: 665, top: 316, width: 590 }}
        />
        <Interactive.Div
          name="Moving highlight on jar"
          style={{
            position: "absolute",
            left: 665,
            top: 316,
            width: 590,
            height: 544,
            maskImage: `url(${staticFile(JAR_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.55) 52%, rgba(255,255,255,0) 65%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [18, 70], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Supporting copy"
          style={{
            position: "absolute",
            left: 130,
            top: 960,
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: 30,
            letterSpacing: 8,
            color: "#5A1E2E",
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          60 PADS · 210 ML
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Foreground (fast layer)"
        style={{
          translate: interpolate(frame, [0, 90], ["0px 0px", "-50px 20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 90], [1, 1.1], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Foreground glass disc"
          style={{
            position: "absolute",
            left: -150,
            top: 700,
            width: 520,
            height: 520,
            filter: "blur(18px)",
            opacity: 0.85,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Foreground serum bead"
          style={{
            position: "absolute",
            left: 1690,
            top: 820,
            width: 260,
            height: 290,
            filter: "blur(14px)",
            opacity: 0.8,
          }}
        >
          <SerumDrop />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
