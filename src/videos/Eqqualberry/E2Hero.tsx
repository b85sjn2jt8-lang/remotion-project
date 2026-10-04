import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  BOTTLE_SRC,
  CeramideFlakes,
  Droplet,
  IceBlock,
  WaterSphere,
} from "./materials";

// SCENE 02 — PRODUCT HERO (0:02.4–0:05.3)
// The full bottle stands on a thick block of clear ice in front of the huge
// blue water sphere from its own key visual. Condensation beads, ceramide
// flakes hang in the cold air, cyan rim light. 50,000 PPM tucks behind it.
export const E2Hero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#CDEEFA" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 88], [1, 1.025], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Cold studio"
          style={{
            background:
              "radial-gradient(90% 100% at 62% 40%, #F4FCFF 0%, #D2F0FB 40%, #9ED9F2 75%, #6CC0E8 100%)",
          }}
        />
        <Interactive.Div
          name="Blue water sphere"
          style={{
            position: "absolute",
            left: 760,
            top: 10,
            width: 900,
            height: 900,
            scale: interpolate(frame, [0, 88], [0.97, 1.02], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <WaterSphere
            t={interpolate(frame, [0, 88], [0, 88], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Headline — 50,000"
          style={{
            position: "absolute",
            left: 112,
            top: 210,
            fontFamily: "Sora",
            fontWeight: 700,
            fontSize: 270,
            lineHeight: 1,
            letterSpacing: -10,
            color: "#08365E",
            maskImage: `linear-gradient(180deg, rgba(0,0,0,1) ${interpolate(frame, [10, 28], [-20, 110], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [10, 28], [0, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
            translate: interpolate(frame, [10, 34], ["0px -30px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          50,000
        </Interactive.Div>
        <Interactive.Div
          name="Headline — PPM"
          style={{
            position: "absolute",
            left: 124,
            top: 470,
            fontFamily: "Sora",
            fontWeight: 200,
            fontSize: 120,
            lineHeight: 1,
            letterSpacing: 18,
            color: "#0F8FD6",
            opacity: interpolate(frame, [22, 34], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          PPM
        </Interactive.Div>
        <Interactive.Div
          name="Headline — HYALTOIN COMPLEX"
          style={{
            position: "absolute",
            left: 128,
            top: 640,
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: 54,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#08365E",
            clipPath: `inset(0 ${interpolate(frame, [34, 54], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          HYALTOIN COMPLEX
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1210px 800px",
          scale: interpolate(frame, [0, 88], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Ice block"
          style={{
            position: "absolute",
            left: 880,
            top: 820,
            width: 660,
            height: 420,
          }}
        >
          <IceBlock />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle reflection in ice"
          style={{
            position: "absolute",
            left: 1040,
            top: 870,
            width: 340,
            height: 90,
            overflow: "hidden",
            opacity: 0.35,
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 340,
              scale: "1 -1",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1040,
            top: 852,
            width: 340,
            height: 26,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(5,45,90,0.55), rgba(5,45,90,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="EQQUALBERRY bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1040,
            top: 230,
            width: 340,
            filter: "drop-shadow(0 0 14px rgba(170,240,255,0.9))",
          }}
        />
        <Interactive.Div
          name="Cold light across bottle"
          style={{
            position: "absolute",
            left: 1040,
            top: 230,
            width: 340,
            height: 639,
            maskImage: `url(${staticFile(BOTTLE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(235,252,255,0.7) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [20, 74], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Condensation on ice 1"
          style={{ position: "absolute", left: 960, top: 900, width: 30, height: 34 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Condensation on ice 2"
          style={{ position: "absolute", left: 1450, top: 950, width: 22, height: 25 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Condensation on ice 3"
          style={{ position: "absolute", left: 1220, top: 1010, width: 40, height: 45 }}
        >
          <Droplet />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Flakes in the cold air"
        style={{
          opacity: 0.7,
          filter: "blur(1px)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "-40px -10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CeramideFlakes
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          count={22}
          size={5}
          seed={41}
        />
      </AbsoluteFill>
      <Interactive.Div
        name="Foreground droplet (out of focus)"
        style={{
          position: "absolute",
          left: 1660,
          top: 760,
          width: 260,
          height: 240,
          filter: "blur(12px)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "-40px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground ice (out of focus)"
        style={{
          position: "absolute",
          left: -140,
          top: 780,
          width: 420,
          height: 380,
          filter: "blur(16px)",
          rotate: "-14deg",
        }}
      >
        <WaterSphere t={0} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
