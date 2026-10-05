import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BirchTrunk, BOTTLE_SRC, DewDrop, LensFrost } from "./materials";

// SHOT 06 — FINAL 70 HERO (0:12.1–0:15.0)
// The bottle centred at ~62% of frame height on pale frosted glass, an
// enormous 70% behind it, soft birch shadows and moving daylight. From frame
// 63 (film frame 425) condensation forms across the lens; the last frame is
// soft frost white — the first frame of the film (loop).
export const B6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#EEF4F9" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 88], [1, 1.02], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Soft white to mist-blue"
          style={{
            background:
              "linear-gradient(180deg, #FBFCFE 0%, #EEF4F9 50%, #DAE6F0 100%)",
          }}
        />
        <Interactive.Div
          name="Birch shadow — left"
          style={{
            position: "absolute",
            left: 300,
            top: -100,
            width: 110,
            height: 1300,
            filter: "blur(26px)",
            opacity: 0.3,
          }}
        >
          <BirchTrunk seed={4} />
        </Interactive.Div>
        <Interactive.Div
          name="Birch shadow — right"
          style={{
            position: "absolute",
            left: 1560,
            top: -100,
            width: 130,
            height: 1300,
            filter: "blur(26px)",
            opacity: 0.3,
          }}
        >
          <BirchTrunk seed={9} />
        </Interactive.Div>
        <Interactive.Div
          name="Moving daylight"
          style={{
            position: "absolute",
            left: -900,
            top: -300,
            width: 900,
            height: 1700,
            rotate: "20deg",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
            translate: interpolate(frame, [0, 88], ["300px 0px", "2100px 0px"], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Enormous 70% behind the bottle"
          style={{
            position: "absolute",
            left: 0,
            top: 50,
            width: 2120,
            textAlign: "center",
            fontFamily: "Urbanist",
            fontWeight: 200,
            fontSize: 820,
            lineHeight: 1,
            letterSpacing: -20,
            color: "rgba(140,172,200,0.58)",
          }}
        >
          70<span style={{ fontSize: 280, letterSpacing: 0 }}>%</span>
        </Interactive.Div>

        <Interactive.Div
          name="Main — BIRCH 70"
          style={{
            position: "absolute",
            left: 110,
            top: 380,
            fontFamily: "Urbanist",
            fontWeight: 300,
            fontSize: 88,
            lineHeight: 1,
            letterSpacing: 8,
            color: "#3F566E",
            clipPath: `inset(0 ${interpolate(frame, [8, 32], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          BIRCH 70
        </Interactive.Div>
        <Interactive.Div
          name="Secondary — MOISTURE"
          style={{
            position: "absolute",
            left: 114,
            top: 500,
            fontFamily: "Urbanist",
            fontWeight: 500,
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#5A7189",
            opacity: interpolate(frame, [18, 34], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          MOISTURE
        </Interactive.Div>
        <Interactive.Div
          name="Secondary — BOOSTING SERUM"
          style={{
            position: "absolute",
            left: 114,
            top: 554,
            fontFamily: "Urbanist",
            fontWeight: 300,
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#5A7189",
            opacity: interpolate(frame, [24, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          BOOSTING SERUM
        </Interactive.Div>
        <Interactive.Div
          name="Small — 30 ml"
          style={{
            position: "absolute",
            left: 116,
            top: 640,
            fontFamily: "Urbanist",
            fontWeight: 400,
            fontSize: 30,
            lineHeight: 1,
            letterSpacing: 6,
            color: "#7A8FA5",
            opacity: interpolate(frame, [32, 46], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          30 ml
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "960px 900px",
          scale: interpolate(frame, [0, 88], [1, 1.03], {
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
            top: 888,
            width: 2320,
            height: 340,
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(236,243,249,0.78) 20%, rgba(214,228,240,0.72) 100%)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 -1px 0 rgba(170,195,215,0.5)",
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 826,
            top: 900,
            width: 268,
            height: 140,
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
              width: 268,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 16%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 806,
            top: 886,
            width: 308,
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
            left: 826,
            top: 230,
            width: 268,
            filter: "drop-shadow(0 10px 24px rgba(90,120,150,0.2))",
          }}
        />
        <Interactive.Div
          name="Daylight passing over the bottle"
          style={{
            position: "absolute",
            left: 826,
            top: 230,
            width: 268,
            height: 670,
            maskImage: `url(${staticFile(BOTTLE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [10, 62], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Dew on the platform — left"
          style={{ position: "absolute", left: 700, top: 940, width: 30, height: 22 }}
        >
          <DewDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Dew on the platform — right"
          style={{ position: "absolute", left: 1180, top: 975, width: 24, height: 18 }}
        >
          <DewDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground dew drop (out of focus)"
        style={{
          position: "absolute",
          left: 1500,
          top: 600,
          width: 320,
          height: 370,
          filter: "blur(13px)",
          opacity: 0.85,
          translate: interpolate(frame, [0, 88], ["20px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>

      <AbsoluteFill name="Condensation forming across the lens (loop seam)">
        <LensFrost
          amount={interpolate(frame, [63, 87], [0, 1], {
            easing: Easing.bezier(0.5, 0, 0.7, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
