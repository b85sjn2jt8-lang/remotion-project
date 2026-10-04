import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, CollagenSphere } from "./materials";

// SCENE 02 — 3X COLLAGEN HERO (0:02.4–0:05)
// The full bottle stands on a glossy milky-pink platform among collagen
// spheres at three depths. "3X" lands with weight; COLLAGEN tucks behind the
// bottle. Sound: 0:03 soft premium impact on "3X".
export const B2CollagenHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F9CDD8" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 90], [1, 1.02], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Blush gradient"
          style={{
            background:
              "radial-gradient(80% 90% at 64% 42%, #FFF0F4 0%, #FBD3DD 42%, #F1AEC1 100%)",
          }}
        />
        <Interactive.Div
          name="Pink backlight"
          style={{
            position: "absolute",
            left: 850,
            top: 60,
            width: 800,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,226,235,0.55) 55%, rgba(255,226,235,0))",
          }}
        />
        <Interactive.Div
          name="Back sphere right"
          style={{
            position: "absolute",
            left: 1520,
            top: 150,
            width: 280,
            height: 280,
            filter: "blur(7px)",
            opacity: 0.8,
            translate: interpolate(frame, [0, 90], ["0px 0px", "0px -24px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
        <Interactive.Div
          name="Back sphere left"
          style={{
            position: "absolute",
            left: 840,
            top: 110,
            width: 170,
            height: 170,
            filter: "blur(6px)",
            opacity: 0.75,
            translate: interpolate(frame, [0, 90], ["0px 0px", "0px -16px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
        <Interactive.Div
          name="Title — 3X"
          style={{
            position: "absolute",
            left: 130,
            top: 150,
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: 340,
            lineHeight: 1,
            letterSpacing: -14,
            color: "rgba(0,0,0,0)",
            backgroundImage:
              "linear-gradient(170deg, #F06A98 0%, #D93A74 55%, #B5245C 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            filter: "drop-shadow(0 18px 30px rgba(170,40,90,0.25))",
            scale: interpolate(frame, [14, 30], [1.14, 1], {
              easing: Easing.bezier(0.2, 0.9, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [14, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          3X
        </Interactive.Div>
        <Interactive.Div
          name="Title — COLLAGEN (tucks behind bottle)"
          style={{
            position: "absolute",
            left: 140,
            top: 520,
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 300,
            fontSize: 168,
            lineHeight: 1,
            color: "#5E1A38",
            letterSpacing: interpolate(frame, [22, 56], [40, 10], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [22, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          COLLAGEN
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1250px 700px",
          scale: interpolate(frame, [0, 90], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Platform edge"
          style={{
            position: "absolute",
            left: 930,
            top: 880,
            width: 640,
            height: 110,
            borderRadius: "50%",
            background:
              "linear-gradient(180deg, #F3B9C8 0%, #E596AC 100%)",
            boxShadow: "0 30px 50px rgba(170,50,90,0.28)",
          }}
        />
        <Interactive.Div
          name="Platform top (milky gloss)"
          style={{
            position: "absolute",
            left: 930,
            top: 820,
            width: 640,
            height: 110,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, #FCEFF2 40%, #F6D3DD 100%)",
            boxShadow: "inset 0 -10px 18px rgba(220,120,150,0.3)",
            overflow: "hidden",
          }}
        >
          <Img
            name="Bottle reflection"
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 220,
              top: 50,
              width: 200,
              scale: "1 -1",
              opacity: 0.3,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 12%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1120,
            top: 858,
            width: 260,
            height: 26,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(120,25,60,0.55), rgba(120,25,60,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="A BONNE bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1150,
            top: 291,
            width: 200,
            filter: "drop-shadow(0 0 16px rgba(255,255,255,0.75))",
          }}
        />
        <Interactive.Div
          name="Moving highlight on bottle"
          style={{
            position: "absolute",
            left: 1150,
            top: 291,
            width: 200,
            height: 579,
            maskImage: `url(${staticFile(BOTTLE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(115deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "100% 300%",
            backgroundPosition: `0% ${interpolate(frame, [26, 76], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Mid sphere right (sharp)"
          style={{
            position: "absolute",
            left: 1460,
            top: 600,
            width: 160,
            height: 160,
            translate: interpolate(frame, [0, 90], ["0px 10px", "0px -20px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
        <Interactive.Div
          name="Mid sphere left (sharp)"
          style={{
            position: "absolute",
            left: 990,
            top: 380,
            width: 96,
            height: 96,
            translate: interpolate(frame, [0, 90], ["0px 0px", "0px -26px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Foreground"
        style={{
          translate: interpolate(frame, [0, 90], ["0px 0px", "-40px 16px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Foreground sphere (out of focus)"
          style={{
            position: "absolute",
            left: 1640,
            top: 700,
            width: 460,
            height: 460,
            filter: "blur(16px)",
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
        <Interactive.Div
          name="Foreground sphere top (out of focus)"
          style={{
            position: "absolute",
            left: 640,
            top: -140,
            width: 300,
            height: 300,
            filter: "blur(14px)",
            opacity: 0.85,
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
