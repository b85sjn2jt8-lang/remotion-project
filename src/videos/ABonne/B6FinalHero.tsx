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
  CollagenSphere,
  MilkSheet,
  MilkWave,
} from "./materials";

// SCENE 06 — FINAL HERO (0:12.1–0:15)
// The pink milk studio: large bottle on a milky platform, collagen spheres
// behind, out-of-focus milk in front, the sign-off copy one line at a time.
// From 0:14.3 a sheet of milk rises toward the lens and fills the frame —
// exactly the frame the film opens on, so it loops.
// Sound: 0:12.5 final hero impact · 0:14.3 milk sweep into loop.
export const B6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F9CDD8" }}>
      <AbsoluteFill name="Background">
        <AbsoluteFill
          name="Blush gradient"
          style={{
            background:
              "radial-gradient(85% 95% at 66% 42%, #FFF3F6 0%, #FBD5DF 42%, #F0AABE 100%)",
          }}
        />
        <Interactive.Div
          name="Milky backlight"
          style={{
            position: "absolute",
            left: 900,
            top: 20,
            width: 800,
            height: 960,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,236,242,0.5) 55%, rgba(255,236,242,0))",
          }}
        />
        <Interactive.Div
          name="Back sphere large"
          style={{
            position: "absolute",
            left: 1500,
            top: 70,
            width: 380,
            height: 380,
            filter: "blur(8px)",
            opacity: 0.85,
            translate: interpolate(frame, [0, 87], ["0px 0px", "0px -26px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
        <Interactive.Div
          name="Back sphere small"
          style={{
            position: "absolute",
            left: 900,
            top: 150,
            width: 200,
            height: 200,
            filter: "blur(6px)",
            opacity: 0.8,
            translate: interpolate(frame, [0, 87], ["0px 0px", "0px -18px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
        <Interactive.Div
          name="Glossy floor"
          style={{
            position: "absolute",
            left: -200,
            top: 780,
            width: 2320,
            height: 400,
            background:
              "linear-gradient(180deg, rgba(246,196,210,0) 0%, rgba(244,186,202,0.95) 12%, #EEA4B8 60%, #E594AB 100%)",
          }}
        />
        <Interactive.Div
          name="Milky floor reflection"
          style={{
            position: "absolute",
            left: 700,
            top: 930,
            width: 1300,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.45)",
            filter: "blur(14px)",
            translate: interpolate(frame, [0, 87], ["-60px 0px", "60px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Product (settle)"
        style={{
          transformOrigin: "1300px 900px",
          scale: interpolate(frame, [0, 34], [1.06, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
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
            left: 960,
            top: 905,
            width: 680,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(180deg, #F2B4C5 0%, #E28FA7 100%)",
            boxShadow: "0 30px 50px rgba(160,40,80,0.3)",
          }}
        />
        <Interactive.Div
          name="Platform top (milky gloss)"
          style={{
            position: "absolute",
            left: 960,
            top: 848,
            width: 680,
            height: 110,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, #FCEFF3 40%, #F5CFDA 100%)",
            boxShadow: "inset 0 -10px 18px rgba(220,120,150,0.3)",
            overflow: "hidden",
          }}
        >
          <Img
            name="Bottle reflection"
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 222,
              top: 52,
              width: 235,
              scale: "1 -1",
              opacity: 0.32,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 10%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1170,
            top: 886,
            width: 260,
            height: 28,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(120,25,60,0.6), rgba(120,25,60,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="A BONNE bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1182,
            top: 219,
            width: 235,
            filter: "drop-shadow(0 0 18px rgba(255,255,255,0.75))",
          }}
        />
        <Interactive.Div
          name="Moving reflection on bottle"
          style={{
            position: "absolute",
            left: 1182,
            top: 219,
            width: 235,
            height: 681,
            maskImage: `url(${staticFile(BOTTLE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(115deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "100% 300%",
            backgroundPosition: `0% ${interpolate(frame, [18, 64], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}%`,
            mixBlendMode: "soft-light",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Line — 3X"
        style={{
          position: "absolute",
          left: 130,
          top: 170,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 800,
          fontSize: 270,
          lineHeight: 1,
          letterSpacing: -12,
          color: "rgba(0,0,0,0)",
          backgroundImage:
            "linear-gradient(170deg, #F06A98 0%, #D93A74 55%, #B5245C 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          filter: "drop-shadow(0 16px 28px rgba(170,40,90,0.22))",
          opacity: interpolate(frame, [12, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [12, 28], [1.1, 1], {
            easing: Easing.bezier(0.2, 0.9, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        3X
      </Interactive.Div>
      <Interactive.Div
        name="Line — COLLAGEN"
        style={{
          position: "absolute",
          left: 140,
          top: 440,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 300,
          fontSize: 120,
          lineHeight: 1,
          letterSpacing: 8,
          color: "#5E1A38",
          clipPath: `inset(0 ${interpolate(frame, [18, 34], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        COLLAGEN
      </Interactive.Div>
      <Interactive.Div
        name="Line — MOISTURIZING • UV PROTECTION"
        style={{
          position: "absolute",
          left: 144,
          top: 610,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: 6,
          color: "#5E1A38",
          opacity: interpolate(frame, [32, 46], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        MOISTURIZING <span style={{ color: "#D93A74" }}>•</span> UV PROTECTION
      </Interactive.Div>
      <Interactive.Div
        name="Line — 500 ml"
        style={{
          position: "absolute",
          left: 144,
          top: 690,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 400,
          fontSize: 34,
          letterSpacing: 4,
          color: "#8A3A5A",
          opacity: interpolate(frame, [42, 56], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        500 ml
      </Interactive.Div>

      <Interactive.Div
        name="Foreground milk (out of focus)"
        style={{
          position: "absolute",
          left: -300,
          top: 930,
          width: 1300,
          height: 360,
          filter: "blur(16px)",
          translate: interpolate(frame, [0, 87], ["0px 0px", "-70px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MilkWave
          phase={interpolate(frame, [0, 87], [0, 2.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          amp={45}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground sphere (out of focus)"
        style={{
          position: "absolute",
          left: 1700,
          top: -110,
          width: 360,
          height: 360,
          filter: "blur(16px)",
          translate: interpolate(frame, [0, 87], ["0px 0px", "30px -20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CollagenSphere />
      </Interactive.Div>

      <Interactive.Div
        name="Milk sheet (loop seam)"
        style={{
          position: "absolute",
          left: -100,
          top: -660,
          width: 2120,
          height: 2400,
          translate: interpolate(frame, [66, 86], ["0px 1800px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.8, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MilkSheet
          phase={interpolate(frame, [66, 86], [-1.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
