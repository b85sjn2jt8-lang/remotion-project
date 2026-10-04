import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { GlassDisc, JAR_SRC, LensPad, SerumDrop } from "./elements";

// SCENE 07 — FINAL HERO (0:16–0:20)
// The strongest frame: large jar on a rose-glass disc, layered depth, the
// sign-off copy, then a serum-soaked pad crosses the lens and fills the frame —
// exactly the frame Scene 01 opens on, so the film loops.
// Sound: 0:16 soft premium impact · 0:19.5 lens wipe into loop.
export const S7FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F9CCD7" }}>
      <AbsoluteFill name="Background">
        <AbsoluteFill
          name="Rose gradient"
          style={{
            background:
              "radial-gradient(85% 90% at 66% 44%, #FFF1F4 0%, #FAD3DC 42%, #EFA5B7 100%)",
          }}
        />
        <Interactive.Div
          name="Halo disc"
          style={{
            position: "absolute",
            left: 900,
            top: 40,
            width: 820,
            height: 820,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,236,241,0.45) 60%, rgba(255,236,241,0))",
          }}
        />
        <Interactive.Div
          name="Circle line outer"
          style={{
            position: "absolute",
            left: 740,
            top: -120,
            width: 1140,
            height: 1140,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.55)",
            scale: interpolate(frame, [0, 132], [0.96, 1.03], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Circle line inner"
          style={{
            position: "absolute",
            left: 930,
            top: 70,
            width: 760,
            height: 760,
            borderRadius: "50%",
            border: "1.5px solid rgba(214,60,90,0.25)",
            scale: interpolate(frame, [0, 132], [1.03, 0.98], {
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
            left: 1660,
            top: 120,
            width: 200,
            height: 200,
            filter: "blur(8px)",
            opacity: 0.7,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Glossy floor"
          style={{
            position: "absolute",
            left: -200,
            top: 740,
            width: 2320,
            height: 500,
            background:
              "linear-gradient(180deg, rgba(246,190,204,0) 0%, rgba(243,180,197,0.95) 10%, #ECA0B4 50%, #E28EA5 100%)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Product (settle)"
        style={{
          transformOrigin: "1300px 840px",
          scale: interpolate(frame, [0, 34], [1.07, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Glass disc plinth edge"
          style={{
            position: "absolute",
            left: 880,
            top: 820,
            width: 840,
            height: 130,
            borderRadius: "50%",
            background:
              "linear-gradient(180deg, rgba(236,130,158,0.8), rgba(214,96,130,0.85))",
            boxShadow: "0 30px 50px rgba(160,40,80,0.3)",
          }}
        />
        <Interactive.Div
          name="Glass disc plinth top"
          style={{
            position: "absolute",
            left: 880,
            top: 790,
            width: 840,
            height: 130,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 38%, rgba(255,255,255,0.9) 0%, rgba(255,216,226,0.8) 45%, rgba(242,156,180,0.85) 100%)",
            border: "2px solid rgba(255,255,255,0.9)",
            overflow: "hidden",
          }}
        >
          <Img
            name="Jar reflection"
            src={staticFile(JAR_SRC)}
            style={{
              position: "absolute",
              left: 100,
              top: 65,
              width: 640,
              scale: "1 -1",
              opacity: 0.35,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 18%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 990,
            top: 840,
            width: 620,
            height: 30,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(110,20,50,0.6), rgba(110,20,50,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ANUA jar"
          src={staticFile(JAR_SRC)}
          style={{ position: "absolute", left: 980, top: 265, width: 640 }}
        />
        <Interactive.Div
          name="Light sweep on jar"
          style={{
            position: "absolute",
            left: 980,
            top: 265,
            width: 640,
            height: 590,
            maskImage: `url(${staticFile(JAR_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [40, 84], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Line — ONE PAD."
        style={{
          position: "absolute",
          left: 140,
          top: 270,
          fontFamily: "Manrope",
          fontWeight: 800,
          fontSize: 112,
          lineHeight: 1,
          letterSpacing: -2,
          color: "#3B1520",
          clipPath: `inset(0 ${interpolate(frame, [14, 32], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
          translate: interpolate(frame, [14, 36], ["-30px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ONE PAD.
      </Interactive.Div>
      <Interactive.Div
        name="Line — DAILY GLOW."
        style={{
          position: "absolute",
          left: 140,
          top: 400,
          fontFamily: "Manrope",
          fontWeight: 300,
          fontSize: 112,
          lineHeight: 1,
          letterSpacing: 0,
          color: "#3B1520",
          clipPath: `inset(0 ${interpolate(frame, [26, 46], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
          translate: interpolate(frame, [26, 50], ["-30px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DAILY GLOW.
      </Interactive.Div>
      <Interactive.Div
        name="Accent rule"
        style={{
          position: "absolute",
          left: 144,
          top: 580,
          width: 120,
          height: 6,
          backgroundColor: "#D3243F",
          transformOrigin: "0% 50%",
          scale: interpolate(frame, [52, 66], ["0 1", "1 1"], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Brand — ANUA"
        style={{
          position: "absolute",
          left: 140,
          top: 620,
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: 96,
          lineHeight: 1,
          color: "#3B1520",
          letterSpacing: interpolate(frame, [58, 90], [70, 34], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [58, 74], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ANUA
      </Interactive.Div>
      <Interactive.Div
        name="Product name"
        style={{
          position: "absolute",
          left: 144,
          top: 750,
          fontFamily: "Manrope",
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: 6,
          color: "#5A1E2E",
          opacity: interpolate(frame, [66, 82], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        NIACINAMIDE 5 <span style={{ color: "#D3243F" }}>+</span> TXA BRIGHTENING PAD
      </Interactive.Div>

      <Interactive.Div
        name="Foreground rose glass (out of focus)"
        style={{
          position: "absolute",
          left: -170,
          top: 760,
          width: 560,
          height: 560,
          filter: "blur(20px)",
          opacity: 0.85,
          translate: interpolate(frame, [0, 132], ["0px 0px", "-40px 20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <GlassDisc />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground serum drop (out of focus)"
        style={{
          position: "absolute",
          left: 1720,
          top: -60,
          width: 260,
          height: 300,
          filter: "blur(16px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 132], ["0px 0px", "30px -20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <SerumDrop />
      </Interactive.Div>

      <Interactive.Div
        name="Lens pad (loop seam)"
        style={{
          position: "absolute",
          left: -540,
          top: -960,
          width: 3000,
          height: 3000,
          translate: interpolate(frame, [110, 131], ["3200px 0px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.8, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <LensPad />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
