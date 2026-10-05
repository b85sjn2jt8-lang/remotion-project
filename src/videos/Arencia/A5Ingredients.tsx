import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOX_SRC, PearlStructure, TUBE_SRC } from "./materials";

// SHOT 05 — NIACINAMIDE + PEPTIDES (0:11.1–0:12.8)
// A clean glass space. Translucent pearl-like structures drift through depth
// (abstract, ingredient-inspired). NIACINAMIDE and 10 PEPTIDES sit in space;
// a pink light passes across them, then focus shifts to the product behind.
export const A5Ingredients: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3E1E8" }}>
      <AbsoluteFill
        name="Clean blush glass"
        style={{
          background:
            "radial-gradient(75% 85% at 65% 40%, #FFF4F7 0%, #F4DFE6 50%, #E2BFCD 100%)",
        }}
      />
      <AbsoluteFill
        name="Product (background, focus pulls in)"
        style={{
          filter: `blur(${interpolate(frame, [50, 76], [7, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <Interactive.Div
          name="Glass shelf"
          style={{
            position: "absolute",
            left: -200,
            top: 880,
            width: 2400,
            height: 220,
            background: "linear-gradient(180deg, rgba(255,240,246,0.95) 0%, rgba(232,180,202,0.6) 10%, rgba(214,150,182,0.45) 100%)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,1)",
          }}
        />
        <Img
          name="ARENCIA box"
          src={staticFile(BOX_SRC)}
          style={{ position: "absolute", left: 1330, top: 400, width: 150 }}
        />
        <Img
          name="ARENCIA TXA Booster Shot tube"
          src={staticFile(TUBE_SRC)}
          style={{
            position: "absolute",
            left: 1460,
            top: 398,
            width: 130,
            filter: "drop-shadow(0 0 14px rgba(255,120,180,0.45))",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Ingredient type (focus pulls away)"
        style={{
          filter: `blur(${interpolate(frame, [50, 76], [0, 6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [50, 78], [1, 0.55], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Title — NIACINAMIDE"
          style={{
            position: "absolute",
            left: 130,
            top: 300,
            fontFamily: "Archivo",
            fontWeight: 300,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: 10,
            color: "rgba(0,0,0,0)",
            backgroundImage: "linear-gradient(100deg, #8E2458 0%, #8E2458 40%, #FF7FB5 50%, #8E2458 60%, #8E2458 100%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [10, 48], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            opacity: interpolate(frame, [4, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          NIACINAMIDE
        </Interactive.Div>
        <Interactive.Div
          name="Title — 10 PEPTIDES"
          style={{
            position: "absolute",
            left: 124,
            top: 440,
            fontFamily: "Archivo",
            fontWeight: 800,
            fontSize: 128,
            lineHeight: 1,
            letterSpacing: 8,
            color: "rgba(0,0,0,0)",
            backgroundImage: "linear-gradient(100deg, #B8306F 0%, #B8306F 40%, #FFC2DB 50%, #B8306F 60%, #B8306F 100%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [18, 56], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            opacity: interpolate(frame, [16, 28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          10 PEPTIDES
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Pearl structure 1"
        style={{
          position: "absolute",
          left: 220,
          top: 140,
          width: 60,
          height: 60,
          filter: "blur(0px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-30px 20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 2"
        style={{
          position: "absolute",
          left: 1540,
          top: 180,
          width: 90,
          height: 90,
          filter: "blur(3px)",
          opacity: 0.85,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-60px 30px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 3"
        style={{
          position: "absolute",
          left: 820,
          top: 760,
          width: 44,
          height: 44,
          filter: "blur(0px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 82], ["0px 0px", "40px -30px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 4"
        style={{
          position: "absolute",
          left: 1700,
          top: 700,
          width: 130,
          height: 130,
          filter: "blur(8px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-90px -20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 5"
        style={{
          position: "absolute",
          left: 560,
          top: 880,
          width: 70,
          height: 70,
          filter: "blur(2px)",
          opacity: 0.85,
          translate: interpolate(frame, [0, 82], ["0px 0px", "30px -40px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 6"
        style={{
          position: "absolute",
          left: 1040,
          top: 110,
          width: 36,
          height: 36,
          filter: "blur(0px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-20px 30px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 7"
        style={{
          position: "absolute",
          left: 1420,
          top: 860,
          width: 52,
          height: 52,
          filter: "blur(1px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-40px -20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 8"
        style={{
          position: "absolute",
          left: 80,
          top: 620,
          width: 150,
          height: 150,
          filter: "blur(10px)",
          opacity: 0.75,
          translate: interpolate(frame, [0, 82], ["0px 0px", "60px -10px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
      <Interactive.Div
        name="Pearl structure 9"
        style={{
          position: "absolute",
          left: 980,
          top: 520,
          width: 28,
          height: 28,
          filter: "blur(0px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 82], ["0px 0px", "30px 20px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PearlStructure />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
