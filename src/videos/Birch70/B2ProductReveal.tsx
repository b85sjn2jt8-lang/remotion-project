import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BirchTrunk, BOTTLE_SRC, DewDrop } from "./materials";

// SHOT 02 — PRODUCT REVEAL (0:02.3–0:05.3)
// The frosted pane slides past the lens onto the complete bottle, standing on
// a frosted-glass platform in soft daylight. Abstract birch trunks stand far
// behind, out of focus; the bottle occludes an enormous 70%.
export const B2ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#EEF4F9" }}>
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
          name="White to pale-blue air"
          style={{
            background:
              "linear-gradient(180deg, #FAFCFD 0%, #EDF3F8 55%, #DCE7F1 100%)",
          }}
        />
        <Interactive.Div
          name="Birch trunk — far left"
          style={{
            position: "absolute",
            left: 170,
            top: -100,
            width: 120,
            height: 1300,
            filter: "blur(16px)",
            opacity: 0.45,
          }}
        >
          <BirchTrunk seed={3} />
        </Interactive.Div>
        <Interactive.Div
          name="Birch trunk — left"
          style={{
            position: "absolute",
            left: 420,
            top: -100,
            width: 80,
            height: 1300,
            filter: "blur(22px)",
            opacity: 0.32,
          }}
        >
          <BirchTrunk seed={8} />
        </Interactive.Div>
        <Interactive.Div
          name="Birch trunk — right"
          style={{
            position: "absolute",
            left: 1620,
            top: -100,
            width: 140,
            height: 1300,
            filter: "blur(18px)",
            opacity: 0.42,
          }}
        >
          <BirchTrunk seed={5} />
        </Interactive.Div>
        <Interactive.Div
          name="Daylight from the left"
          style={{
            position: "absolute",
            left: -300,
            top: -300,
            width: 1400,
            height: 1100,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,255,255,0))",
          }}
        />
        <Interactive.Div
          name="Giant 70% behind the bottle"
          style={{
            position: "absolute",
            left: 610,
            top: 70,
            fontFamily: "Urbanist",
            fontWeight: 200,
            fontSize: 780,
            lineHeight: 1,
            letterSpacing: -18,
            color: "rgba(140,172,200,0.6)",
            opacity: interpolate(frame, [0, 24], [0.6, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          70<span style={{ fontSize: 270, letterSpacing: 0 }}>%</span>
        </Interactive.Div>

        <Interactive.Div
          name="Small — MOISTURE"
          style={{
            position: "absolute",
            left: 130,
            top: 470,
            fontFamily: "Urbanist",
            fontWeight: 500,
            fontSize: 44,
            lineHeight: 1,
            letterSpacing: 14,
            color: "#4F6680",
            clipPath: `inset(0 ${interpolate(frame, [18, 42], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          MOISTURE
        </Interactive.Div>
        <Interactive.Div
          name="Small — BOOSTING SERUM"
          style={{
            position: "absolute",
            left: 130,
            top: 534,
            fontFamily: "Urbanist",
            fontWeight: 300,
            fontSize: 44,
            lineHeight: 1,
            letterSpacing: 14,
            color: "#4F6680",
            clipPath: `inset(0 ${interpolate(frame, [26, 50], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          BOOSTING SERUM
        </Interactive.Div>
        <Interactive.Div
          name="Silver rule"
          style={{
            position: "absolute",
            left: 132,
            top: 610,
            width: 200,
            height: 2,
            background: "linear-gradient(90deg, #A9BACB, rgba(169,186,203,0))",
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
          transformOrigin: "1070px 880px",
          scale: interpolate(frame, [0, 90], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Frosted glass platform"
          style={{
            position: "absolute",
            left: -200,
            top: 868,
            width: 2320,
            height: 360,
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(236,243,249,0.75) 20%, rgba(214,228,240,0.7) 100%)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 -1px 0 rgba(170,195,215,0.5)",
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 942,
            top: 880,
            width: 256,
            height: 130,
            overflow: "hidden",
            opacity: 0.28,
            filter: "blur(1.5px)",
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 256,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 16%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 922,
            top: 866,
            width: 296,
            height: 28,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(70,95,120,0.45), rgba(70,95,120,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ANUA Birch 70 bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 942,
            top: 240,
            width: 256,
            filter: "drop-shadow(0 10px 22px rgba(90,120,150,0.18))",
          }}
        />
        <Interactive.Div
          name="Soft daylight across the bottle"
          style={{
            position: "absolute",
            left: 942,
            top: 240,
            width: 256,
            height: 640,
            maskImage: `url(${staticFile(BOTTLE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [16, 80], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Dew on the platform — left"
          style={{ position: "absolute", left: 780, top: 920, width: 30, height: 22 }}
        >
          <DewDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Dew on the platform — right"
          style={{ position: "absolute", left: 1290, top: 950, width: 22, height: 16 }}
        >
          <DewDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Dew on the platform — front"
          style={{ position: "absolute", left: 1460, top: 1010, width: 40, height: 30 }}
        >
          <DewDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground dew drop (out of focus)"
        style={{
          position: "absolute",
          left: 1640,
          top: 120,
          width: 220,
          height: 260,
          filter: "blur(10px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 90], ["20px 0px", "-30px 10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
