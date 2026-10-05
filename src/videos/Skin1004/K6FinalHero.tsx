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
  BOX_SRC,
  CentellaLeaf,
  EarthStone,
  LensLeafWarm,
  WarmDrop,
} from "./materials";

// SHOT 06 — FINAL MADAGASCAR HERO (0:12.1–0:15.0)
// Bottle in front at ~58% of frame height, the box just behind, on a
// textured earth-stone base with a thin glossy top. Warm sunlight and
// botanical shadows move on the wall. From frame 63 (film frame 425) a warm
// out-of-focus Centella leaf crosses the lens; the last frame is the first
// frame of the film (loop).
export const K6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F2E4CC" }}>
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
          name="Warm ivory wall"
          style={{
            background:
              "radial-gradient(75% 90% at 55% 35%, #FBF2E2 0%, #F0DEC0 45%, #DDBF92 100%)",
          }}
        />
        <Interactive.Div
          name="Botanical shadow — left"
          style={{
            position: "absolute",
            left: 520,
            top: -220,
            width: 560,
            height: 644,
            rotate: "20deg",
            filter: "blur(9px)",
            opacity: 0.12,
            mixBlendMode: "multiply",
            translate: interpolate(frame, [0, 88], ["0px 0px", "30px 6px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CentellaLeaf tone="shadow" seed={11} />
        </Interactive.Div>
        <Interactive.Div
          name="Botanical shadow — right"
          style={{
            position: "absolute",
            left: 1480,
            top: -60,
            width: 480,
            height: 552,
            rotate: "-34deg",
            filter: "blur(9px)",
            opacity: 0.12,
            mixBlendMode: "multiply",
            translate: interpolate(frame, [0, 88], ["0px 0px", "-30px 6px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CentellaLeaf tone="shadow" seed={2} />
        </Interactive.Div>
        <Interactive.Div
          name="Moving sunlight"
          style={{
            position: "absolute",
            left: -900,
            top: -300,
            width: 900,
            height: 1700,
            rotate: "20deg",
            background:
              "linear-gradient(90deg, rgba(255,236,196,0) 0%, rgba(255,236,196,0.6) 50%, rgba(255,236,196,0) 100%)",
            translate: interpolate(frame, [0, 88], ["400px 0px", "2200px 0px"], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />

        <Interactive.Div
          name="Main — MADAGASCAR"
          style={{
            position: "absolute",
            left: 110,
            top: 330,
            fontFamily: "Albert Sans",
            fontWeight: 300,
            fontSize: 84,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#4A2F1C",
            clipPath: `inset(0 ${interpolate(frame, [8, 32], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          MADAGASCAR
        </Interactive.Div>
        <Interactive.Div
          name="Main — CENTELLA"
          style={{
            position: "absolute",
            left: 112,
            top: 430,
            fontFamily: "Albert Sans",
            fontWeight: 600,
            fontSize: 84,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#4A2F1C",
            clipPath: `inset(0 ${interpolate(frame, [14, 38], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          CENTELLA
        </Interactive.Div>
        <Interactive.Div
          name="Secondary — SOOTHING + HYDRATING"
          style={{
            position: "absolute",
            left: 114,
            top: 560,
            fontFamily: "Albert Sans",
            fontWeight: 500,
            fontSize: 36,
            lineHeight: 1,
            letterSpacing: 6,
            color: "#55623A",
            opacity: interpolate(frame, [24, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          SOOTHING + HYDRATING
        </Interactive.Div>
        <Interactive.Div
          name="Small — SIGNATURE TONER"
          style={{
            position: "absolute",
            left: 116,
            top: 626,
            fontFamily: "Albert Sans",
            fontWeight: 400,
            fontSize: 28,
            lineHeight: 1,
            letterSpacing: 8,
            color: "#8A5A26",
            opacity: interpolate(frame, [32, 46], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          SIGNATURE TONER
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1000px 900px",
          scale: interpolate(frame, [0, 88], [1, 1.03], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Earth-stone base"
          style={{ position: "absolute", left: -200, top: 840, width: 2320, height: 400 }}
        >
          <EarthStone />
        </Interactive.Div>
        <Interactive.Div
          name="Box reflection"
          style={{
            position: "absolute",
            left: 1010,
            top: 866,
            width: 215,
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
              width: 215,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 10%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 995,
            top: 854,
            width: 250,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(60,30,10,0.55), rgba(60,30,10,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="SKIN1004 box"
          src={staticFile(BOX_SRC)}
          style={{
            position: "absolute",
            left: 1010,
            top: 268,
            width: 215,
            filter: "drop-shadow(-6px 8px 16px rgba(90,50,15,0.22))",
          }}
        />
        <Interactive.Div
          name="Amber light refracted onto the stone"
          style={{
            position: "absolute",
            left: 800,
            top: 880,
            width: 340,
            height: 70,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255,186,90,0.8), rgba(255,170,60,0))",
            filter: "blur(7px)",
            mixBlendMode: "screen",
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 848,
            top: 903,
            width: 224,
            height: 90,
            overflow: "hidden",
            opacity: 0.3,
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 224,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle contact shadow"
          style={{
            position: "absolute",
            left: 832,
            top: 892,
            width: 256,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(60,30,10,0.6), rgba(60,30,10,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="SKIN1004 bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 848,
            top: 279,
            width: 224,
            filter: "drop-shadow(0 0 24px rgba(255,190,100,0.35))",
          }}
        />
        <Interactive.Div
          name="Sunlight passing over the bottle"
          style={{
            position: "absolute",
            left: 848,
            top: 279,
            width: 224,
            height: 626,
            maskImage: `url(${staticFile(BOTTLE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,240,210,0.45) 50%, rgba(255,255,255,0) 62%)",
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
          name="Drop on the stone"
          style={{ position: "absolute", left: 700, top: 950, width: 30, height: 22 }}
        >
          <WarmDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground Centella leaf (out of focus)"
        style={{
          position: "absolute",
          left: 1540,
          top: 640,
          width: 520,
          height: 598,
          rotate: "-34deg",
          filter: "blur(18px)",
          opacity: 0.95,
          translate: interpolate(frame, [0, 88], ["20px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CentellaLeaf tone="fresh" seed={5} beads={false} />
      </Interactive.Div>

      <Interactive.Div
        name="Warm leaf crossing the lens (loop seam)"
        style={{
          position: "absolute",
          left: -1000,
          top: -1000,
          width: 3920,
          height: 3080,
          maskImage: "radial-gradient(ellipse 1500px 2000px at 1960px 1540px, #000 90%, rgba(0,0,0,0) 100%)",
          translate: interpolate(frame, [63, 87], ["-3000px 200px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.8, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <LensLeafWarm />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
