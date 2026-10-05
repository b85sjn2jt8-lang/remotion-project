import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { AmberGlass, BOTTLE_SRC, BOX_SRC, CentellaLeaf } from "./materials";

// SHOT 02 — AMBER PRODUCT REVEAL (0:02.3–0:05.3)
// A Centella leaf passes the lens onto the real bottle, standing on warm
// translucent amber glass, its box just behind and offset to the right.
// Warm sun, ivory fill, amber light refracted onto the glass.
export const K2AmberReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F2E4CC" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 90], [1, 1.025], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Warm ivory wall"
          style={{
            background:
              "radial-gradient(80% 90% at 70% 35%, #FBF3E4 0%, #F1E1C6 45%, #E2C79E 100%)",
          }}
        />
        <Interactive.Div
          name="Sunlight patch"
          style={{
            position: "absolute",
            left: 760,
            top: -120,
            width: 1200,
            height: 1000,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255,236,196,0.85), rgba(255,236,196,0))",
          }}
        />
        <Interactive.Div
          name="Botanical shadow on the wall"
          style={{
            position: "absolute",
            left: 1480,
            top: -160,
            width: 520,
            height: 600,
            rotate: "-28deg",
            filter: "blur(16px)",
            opacity: 0.16,
            mixBlendMode: "multiply",
            translate: interpolate(frame, [0, 90], ["0px 0px", "-40px 10px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CentellaLeaf tone="shadow" seed={9} />
        </Interactive.Div>

        <Interactive.Div
          name="Title — SIGNATURE"
          style={{
            position: "absolute",
            left: 130,
            top: 360,
            fontFamily: "Albert Sans",
            fontWeight: 300,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: 14,
            color: "#4A2F1C",
            clipPath: `inset(0 ${interpolate(frame, [16, 40], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          SIGNATURE
        </Interactive.Div>
        <Interactive.Div
          name="Title — SOOTHING TONER"
          style={{
            position: "absolute",
            left: 134,
            top: 496,
            fontFamily: "Albert Sans",
            fontWeight: 500,
            fontSize: 50,
            lineHeight: 1,
            letterSpacing: 16,
            color: "#8A5A26",
            clipPath: `inset(0 ${interpolate(frame, [26, 50], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          SOOTHING TONER
        </Interactive.Div>
        <Interactive.Div
          name="Gold rule"
          style={{
            position: "absolute",
            left: 136,
            top: 580,
            width: 220,
            height: 2,
            background: "linear-gradient(90deg, #C9934A, rgba(201,147,74,0))",
            scale: interpolate(frame, [40, 64], ["0 1", "1 1"], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transformOrigin: "0% 50%",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1150px 880px",
          scale: interpolate(frame, [0, 90], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Amber glass — top face"
          style={{ position: "absolute", left: -200, top: 800, width: 2320, height: 110 }}
        >
          <AmberGlass />
        </Interactive.Div>
        <Interactive.Div
          name="Amber glass — front face"
          style={{
            position: "absolute",
            left: -200,
            top: 905,
            width: 2320,
            height: 220,
            backdropFilter: "blur(8px)",
            background:
              "linear-gradient(180deg, rgba(255,226,170,0.9) 0%, rgba(232,168,86,0.5) 6%, rgba(214,146,70,0.42) 50%, rgba(170,104,40,0.55) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,244,215,1), inset 0 -2px 0 rgba(255,220,160,0.6)",
          }}
        />
        <Interactive.Div
          name="Light inside the amber glass"
          style={{
            position: "absolute",
            left: 760,
            top: 912,
            width: 700,
            height: 180,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255,214,140,0.65), rgba(255,200,120,0))",
            filter: "blur(10px)",
            mixBlendMode: "screen",
          }}
        />
        <Interactive.Div
          name="Box reflection"
          style={{
            position: "absolute",
            left: 1140,
            top: 846,
            width: 201,
            height: 60,
            overflow: "hidden",
            opacity: 0.22,
          }}
        >
          <Img
            src={staticFile(BOX_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 201,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 10%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 1125,
            top: 834,
            width: 240,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(80,40,10,0.5), rgba(80,40,10,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="SKIN1004 box"
          src={staticFile(BOX_SRC)}
          style={{
            position: "absolute",
            left: 1140,
            top: 286,
            width: 201,
            filter: "drop-shadow(-6px 8px 16px rgba(90,50,15,0.22))",
          }}
        />
        <Interactive.Div
          name="Amber light refracted onto the glass"
          style={{
            position: "absolute",
            left: 940,
            top: 860,
            width: 340,
            height: 70,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255,190,90,0.85), rgba(255,170,60,0))",
            filter: "blur(6px)",
            mixBlendMode: "screen",
            opacity: interpolate(frame, [0, 30, 60, 90], [0.7, 1, 0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 1000,
            top: 888,
            width: 215,
            height: 90,
            overflow: "hidden",
            opacity: 0.28,
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 215,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle contact shadow"
          style={{
            position: "absolute",
            left: 985,
            top: 876,
            width: 250,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(80,40,10,0.55), rgba(80,40,10,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="SKIN1004 bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1000,
            top: 290,
            width: 215,
            filter: "drop-shadow(0 0 24px rgba(255,190,100,0.35))",
          }}
        />
        <Interactive.Div
          name="Sunlight moving across the bottle"
          style={{
            position: "absolute",
            left: 1000,
            top: 290,
            width: 215,
            height: 600,
            maskImage: `url(${staticFile(BOTTLE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,240,210,0.45) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [16, 80], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground Centella leaf (out of focus)"
        style={{
          position: "absolute",
          left: 1620,
          top: 640,
          width: 420,
          height: 483,
          rotate: "-30deg",
          filter: "blur(16px)",
          opacity: 0.95,
          translate: interpolate(frame, [0, 90], ["30px 0px", "-20px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CentellaLeaf tone="fresh" seed={5} beads={false} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
