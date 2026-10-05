import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOX_SRC, MetalPlatform, TUBE_SRC } from "./materials";

// SHOT 02 — TXA PRODUCT REVEAL (0:02.3–0:05.3)
// The pulse fills the lens onto the real tube, its box just behind, grounded
// on metallic blush glass. A huge 5% sits behind them; the tube overlaps it.
export const A2ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#6E1544" }}>
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
          name="Deep pink to blush"
          style={{
            background:
              "radial-gradient(70% 80% at 62% 38%, #C44A82 0%, #8E1C55 40%, #55092F 80%, #33041D 100%)",
          }}
        />
        <Interactive.Div
          name="Soft white key light"
          style={{
            position: "absolute",
            left: 820,
            top: -160,
            width: 1000,
            height: 900,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255,226,238,0.45), rgba(255,226,238,0))",
          }}
        />
        <Interactive.Div
          name="Giant 5% (behind the products)"
          style={{
            position: "absolute",
            left: 640,
            top: 90,
            fontFamily: "Archivo",
            fontWeight: 800,
            fontSize: 660,
            lineHeight: 1,
            letterSpacing: -20,
            color: "rgba(255,178,212,0.26)",
            translate: interpolate(frame, [0, 90], ["20px 0px", "-20px 0px"], {
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          5%
        </Interactive.Div>
        <Interactive.Div
          name="Title — TXA"
          style={{
            position: "absolute",
            left: 130,
            top: 380,
            fontFamily: "Archivo",
            fontWeight: 800,
            fontSize: 190,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#FFE9F1",
            clipPath: `inset(0 ${interpolate(frame, [14, 36], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          TXA
        </Interactive.Div>
        <Interactive.Div
          name="Small — 50,000 PPM"
          style={{
            position: "absolute",
            left: 136,
            top: 600,
            fontFamily: "Archivo",
            fontWeight: 400,
            fontSize: 42,
            lineHeight: 1,
            color: "#F7B2CD",
            letterSpacing: interpolate(frame, [32, 66], [26, 14], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [32, 46], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          50,000 PPM
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (slow push)"
        style={{
          transformOrigin: "1150px 880px",
          scale: interpolate(frame, [0, 90], [1, 1.04], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Metallic blush-glass platform"
          style={{ position: "absolute", left: -200, top: 830, width: 2320, height: 400 }}
        >
          <MetalPlatform top={90} />
        </Interactive.Div>
        <Interactive.Div
          name="Box reflection"
          style={{
            position: "absolute",
            left: 1000,
            top: 864,
            width: 172,
            height: 60,
            overflow: "hidden",
            opacity: 0.25,
          }}
        >
          <Img
            src={staticFile(BOX_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 172,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 10%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 986,
            top: 852,
            width: 200,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(70,5,35,0.6), rgba(70,5,35,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ARENCIA box"
          src={staticFile(BOX_SRC)}
          style={{
            position: "absolute",
            left: 1000,
            top: 326,
            width: 172,
            filter: "drop-shadow(-6px 10px 18px rgba(60,5,30,0.35))",
          }}
        />
        <Interactive.Div
          name="Tube reflection"
          style={{
            position: "absolute",
            left: 1150,
            top: 899,
            width: 150,
            height: 90,
            overflow: "hidden",
            opacity: 0.32,
          }}
        >
          <Img
            src={staticFile(TUBE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 150,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Tube contact shadow"
          style={{
            position: "absolute",
            left: 1136,
            top: 888,
            width: 178,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(70,5,35,0.7), rgba(70,5,35,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ARENCIA TXA Booster Shot tube"
          src={staticFile(TUBE_SRC)}
          style={{
            position: "absolute",
            left: 1150,
            top: 340,
            width: 150,
            filter: "drop-shadow(0 0 16px rgba(255,120,180,0.55))",
          }}
        />
        <Interactive.Div
          name="Metallic light sweep on the tube"
          style={{
            position: "absolute",
            left: 1150,
            top: 340,
            width: 150,
            height: 561,
            maskImage: `url(${staticFile(TUBE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 40%, rgba(255,245,250,0.55) 50%, rgba(255,255,255,0) 60%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [18, 70], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "screen",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
