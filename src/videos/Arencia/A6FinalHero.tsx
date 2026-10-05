import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOX_SRC, LightRing, MetalPlatform, TargetVoid, TUBE_SRC } from "./materials";

// SHOT 06 — FINAL BOOSTER HERO (0:12.1–0:15.0)
// The tube large in front (~56% of frame height, ≈1.3× the source pixels),
// the box just behind, on glossy metallic blush glass; a large ring of light
// travels through glass behind them. From frame 63 (film frame 425) the light
// contracts to one point and the world darkens; the last frame is the target
// void of the very first frame (loop).
export const A6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#55092F" }}>
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
          name="Deep magenta to luminous pink"
          style={{
            background:
              "radial-gradient(60% 75% at 52% 45%, #F08BB6 0%, #C7457F 30%, #7E1749 65%, #3E0624 100%)",
          }}
        />
        <Interactive.Div
          name="Ring of light through glass"
          style={{
            position: "absolute",
            left: 600,
            top: 100,
            width: 840,
            height: 840,
            scale: interpolate(frame, [0, 63, 84], [0.94, 1.04, 0.02], {
              easing: [Easing.bezier(0.33, 0, 0.67, 1), Easing.bezier(0.6, 0, 0.4, 1)],
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <LightRing />
        </Interactive.Div>

        <Interactive.Div
          name="Main — TXA"
          style={{
            position: "absolute",
            left: 110,
            top: 330,
            fontFamily: "Archivo",
            fontWeight: 800,
            fontSize: 210,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#FFE9F1",
            clipPath: `inset(0 ${interpolate(frame, [8, 30], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          TXA
        </Interactive.Div>
        <Interactive.Div
          name="Main — BOOSTER SHOT"
          style={{
            position: "absolute",
            left: 116,
            top: 550,
            fontFamily: "Archivo",
            fontWeight: 600,
            fontSize: 54,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#FFD1E3",
            clipPath: `inset(0 ${interpolate(frame, [16, 38], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          BOOSTER SHOT
        </Interactive.Div>
        <Interactive.Div
          name="Secondary — 5% TXA"
          style={{
            position: "absolute",
            left: 118,
            top: 650,
            fontFamily: "Archivo",
            fontWeight: 700,
            fontSize: 44,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#FF9CC6",
            opacity: interpolate(frame, [26, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          5% TXA
        </Interactive.Div>
        <Interactive.Div
          name="Small — TARGETED SPOT CARE · 30 ml"
          style={{
            position: "absolute",
            left: 120,
            top: 724,
            fontFamily: "Archivo",
            fontWeight: 400,
            fontSize: 28,
            lineHeight: 1,
            letterSpacing: 5,
            color: "#F3BCD3",
            opacity: interpolate(frame, [34, 48], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          TARGETED SPOT CARE · 30 ml
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1020px 900px",
          scale: interpolate(frame, [0, 88], [1, 1.03], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Glossy metallic blush glass"
          style={{ position: "absolute", left: -200, top: 840, width: 2320, height: 400 }}
        >
          <MetalPlatform top={90} />
        </Interactive.Div>
        <Interactive.Div
          name="Box reflection"
          style={{
            position: "absolute",
            left: 860,
            top: 874,
            width: 178,
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
              width: 178,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 10%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 846,
            top: 862,
            width: 206,
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
            left: 860,
            top: 316,
            width: 178,
            filter: "drop-shadow(-6px 10px 18px rgba(60,5,30,0.35))",
          }}
        />
        <Interactive.Div
          name="Tube reflection"
          style={{
            position: "absolute",
            left: 980,
            top: 908,
            width: 162,
            height: 100,
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
              width: 162,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Tube contact shadow"
          style={{
            position: "absolute",
            left: 966,
            top: 896,
            width: 190,
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
            left: 980,
            top: 303,
            width: 162,
            filter: "drop-shadow(0 0 18px rgba(255,130,185,0.6))",
          }}
        />
        <Interactive.Div
          name="Metallic light sweep on the tube"
          style={{
            position: "absolute",
            left: 980,
            top: 303,
            width: 162,
            height: 605,
            maskImage: `url(${staticFile(TUBE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 40%, rgba(255,245,250,0.55) 50%, rgba(255,255,255,0) 60%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [10, 58], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "screen",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground pink glass (out of focus)"
        style={{
          position: "absolute",
          left: 1580,
          top: -80,
          width: 260,
          height: 1240,
          rotate: "8deg",
          background:
            "linear-gradient(90deg, rgba(255,170,205,0.05) 0%, rgba(255,190,220,0.3) 50%, rgba(255,170,205,0.08) 100%)",
          boxShadow: "inset 3px 0 0 rgba(255,230,240,0.7), inset -3px 0 0 rgba(255,230,240,0.5)",
          filter: "blur(12px)",
          translate: interpolate(frame, [0, 88], ["30px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        name="Light contracts to one point (loop seam)"
        style={{
          opacity: interpolate(frame, [63, 87], [0, 1], {
            easing: Easing.bezier(0.5, 0, 0.7, 0.8),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <TargetVoid glow={1} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
