import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { AmberGlass, POUCH_SRC } from "./materials";

// SCENE 03 — UVA / UVB (0:04.3–0:06.8)
// A hard shaft of sunlight enters from the upper left and travels toward the
// lens. It meets a pane of frosted glass standing in front of the pouch and
// leaves it as soft, diffused light. Protection, told only with light.
// Sound: 0:04.5 light refraction sweep.
export const H3LightFilter: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F6B25A" }}>
      <AbsoluteFill
        name="Camera push"
        style={{
          transformOrigin: "1200px 560px",
          scale: interpolate(frame, [0, 80], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Warm amber room"
          style={{
            background:
              "radial-gradient(90% 100% at 70% 55%, #FFE7B8 0%, #F9C474 40%, #EE9B4A 75%, #D9773A 100%)",
          }}
        />
        <Interactive.Div
          name="Warm floor"
          style={{
            position: "absolute",
            left: -200,
            top: 800,
            width: 2320,
            height: 400,
            background:
              "linear-gradient(180deg, rgba(255,214,150,0) 0%, rgba(250,196,124,0.95) 12%, #EFA764 60%, #E08E4E 100%)",
          }}
        />
        <Interactive.Div
          name="Diffused light pool"
          style={{
            position: "absolute",
            left: 900,
            top: 60,
            width: 1100,
            height: 980,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,252,236,0.95), rgba(255,240,200,0.55) 50%, rgba(255,240,200,0))",
            opacity: interpolate(frame, [20, 48], [0.15, 1], {
              easing: Easing.bezier(0.33, 0, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Soft shadow (diffused)"
          style={{
            position: "absolute",
            left: 1180,
            top: 818,
            width: 600,
            height: 46,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(120,50,10,0.45), rgba(120,50,10,0))",
            filter: "blur(8px)",
          }}
        />
        <Img
          name="HIKARI pouch"
          src={staticFile(POUCH_SRC)}
          style={{
            position: "absolute",
            left: 1150,
            top: 268,
            width: 540,
            filter: "drop-shadow(-4px -2px 14px rgba(255,248,226,0.8))",
          }}
        />
        <Interactive.Div
          name="Diffused light on pouch"
          style={{
            position: "absolute",
            left: 1150,
            top: 268,
            width: 540,
            height: 559,
            maskImage: `url(${staticFile(POUCH_SRC)})`,
            maskSize: "100% 100%",
            background:
              "radial-gradient(70% 60% at 20% 30%, rgba(255,252,236,0.65), rgba(255,252,236,0))",
            mixBlendMode: "soft-light",
            opacity: interpolate(frame, [24, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />

        <Interactive.Div
          name="Sunlight shaft (hard)"
          style={{
            position: "absolute",
            left: -410,
            top: -300,
            width: 220,
            height: 1440,
            transformOrigin: "50% 0%",
            rotate: "-57deg",
            background:
              "linear-gradient(90deg, rgba(255,252,236,0) 0%, rgba(255,252,236,0.95) 25%, rgba(255,255,255,1) 50%, rgba(255,252,236,0.95) 75%, rgba(255,252,236,0) 100%)",
            filter: "blur(4px)",
            mixBlendMode: "screen",
            scale: interpolate(frame, [4, 22, 70], ["1 0", "1 1", "1.6 1"], {
              easing: Easing.bezier(0.3, 0, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Hotspot on glass"
          style={{
            position: "absolute",
            left: 760,
            top: 290,
            width: 300,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,246,214,0.6) 45%, rgba(255,246,214,0))",
            mixBlendMode: "screen",
            opacity: interpolate(frame, [18, 26, 80], [0, 1, 0.85], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [18, 80], [0.6, 1.25], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Frosted glass pane"
          style={{
            position: "absolute",
            left: 840,
            top: -60,
            width: 150,
            height: 1240,
            borderRadius: 6,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,250,236,0.12) 12%, rgba(255,246,226,0.08) 50%, rgba(255,236,200,0.16) 88%, rgba(170,90,30,0.25) 100%)",
            borderLeft: "3px solid rgba(255,255,255,0.95)",
            borderRight: "2px solid rgba(190,110,40,0.45)",
            boxShadow:
              "-10px 0 30px rgba(255,250,232,0.45), 24px 0 50px rgba(150,70,20,0.18)",
            backdropFilter: "blur(16px) brightness(1.1) saturate(120%)",
            rotate: "4deg",
          }}
        />
        <Interactive.Div
          name="Diffused rays after the glass"
          style={{
            position: "absolute",
            left: 900,
            top: 150,
            width: 1100,
            height: 700,
            background:
              "radial-gradient(60% 50% at 0% 50%, rgba(255,250,232,0.65), rgba(255,250,232,0))",
            filter: "blur(30px)",
            mixBlendMode: "screen",
            opacity: interpolate(frame, [22, 46], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Dust in the light 1"
          style={{
            position: "absolute",
            left: 420,
            top: 200,
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,240,0.9)",
            filter: "blur(1px)",
            translate: interpolate(frame, [0, 80], ["0px 0px", "60px 40px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [14, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Dust in the light 2"
          style={{
            position: "absolute",
            left: 600,
            top: 330,
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,240,0.85)",
            filter: "blur(1px)",
            translate: interpolate(frame, [0, 80], ["0px 0px", "40px 50px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [16, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Dust in the light 3"
          style={{
            position: "absolute",
            left: 300,
            top: 90,
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,240,0.7)",
            filter: "blur(2px)",
            translate: interpolate(frame, [0, 80], ["0px 0px", "70px 30px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [12, 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Title — UVA / UVB"
        style={{
          position: "absolute",
          left: 120,
          top: 560,
          fontFamily: "Outfit",
          fontWeight: 300,
          fontSize: 140,
          lineHeight: 1,
          letterSpacing: 6,
          color: "#FFFDF4",
          textShadow: "0 0 30px rgba(255,236,190,0.7)",
          maskImage: `linear-gradient(110deg, rgba(0,0,0,1) ${interpolate(frame, [20, 40], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [20, 40], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
        }}
      >
        UVA / UVB
      </Interactive.Div>
      <Interactive.Div
        name="Title — DAILY PROTECTION"
        style={{
          position: "absolute",
          left: 126,
          top: 720,
          fontFamily: "Outfit",
          fontWeight: 600,
          fontSize: 62,
          lineHeight: 1,
          letterSpacing: 12,
          color: "#7A1440",
          maskImage: `linear-gradient(110deg, rgba(0,0,0,1) ${interpolate(frame, [34, 54], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [34, 54], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
        }}
      >
        DAILY PROTECTION
      </Interactive.Div>

      <Interactive.Div
        name="Foreground amber glass (out of focus)"
        style={{
          position: "absolute",
          left: -160,
          top: 820,
          width: 560,
          height: 420,
          filter: "blur(20px)",
          rotate: "-12deg",
          translate: interpolate(frame, [0, 80], ["0px 0px", "-40px 10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AmberGlass radius={80} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
