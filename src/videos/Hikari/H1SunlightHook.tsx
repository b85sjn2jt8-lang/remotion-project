import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { AmberGlass, Caustics, GoldenFlare, POUCH_SRC } from "./materials";

// SCENE 01 — SUNLIGHT HOOK (0:00–0:02.1)
// Opens on full golden sunlight (the loop seam). The camera drifts through
// warm amber glass; a magenta/coral reflection curves past, then a glass pane
// crosses the lens onto a macro of the real pouch. SPF 50 is written by light.
// Sound: 0:00 sunlight shimmer · 0:01 airy light sweep.
export const H1SunlightHook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFD66B" }}>
      <AbsoluteFill
        name="Macro pouch world"
        style={{
          background:
            "radial-gradient(90% 100% at 70% 30%, #FFF6DA 0%, #FFE08A 45%, #FFBE5C 100%)",
        }}
      >
        <AbsoluteFill
          name="Macro camera (slow pull-back)"
          style={{
            transformOrigin: "1300px 400px",
            scale: interpolate(frame, [34, 76], [1.12, 1], {
              easing: Easing.bezier(0.25, 0.6, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Img
            name="HIKARI pouch (macro)"
            src={staticFile(POUCH_SRC)}
            style={{
              position: "absolute",
              left: 820,
              top: -110,
              width: 1160,
            }}
          />
          <Interactive.Div
            name="Sunlight across the pouch"
            style={{
              position: "absolute",
              left: 820,
              top: -110,
              width: 1160,
              height: 1200,
              maskImage: `url(${staticFile(POUCH_SRC)})`,
              maskSize: "100% 100%",
              background:
                "linear-gradient(118deg, rgba(255,255,255,0) 36%, rgba(255,252,236,0.75) 48%, rgba(255,255,255,0.9) 50%, rgba(255,252,236,0.75) 52%, rgba(255,255,255,0) 64%)",
              backgroundSize: "300% 100%",
              backgroundPosition: `${interpolate(frame, [38, 74], [100, 0], {
                easing: Easing.bezier(0.45, 0, 0.55, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}% 0%`,
              mixBlendMode: "soft-light",
            }}
          />
        </AbsoluteFill>
        <Interactive.Div
          name="Warm haze over left (for type)"
          style={{
            position: "absolute",
            left: -200,
            top: -100,
            width: 1300,
            height: 1300,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,246,222,0.9), rgba(255,246,222,0))",
          }}
        />
        <Interactive.Div
          name="Title — SPF"
          style={{
            position: "absolute",
            left: 130,
            top: 210,
            fontFamily: "Outfit",
            fontWeight: 500,
            fontSize: 120,
            lineHeight: 1,
            letterSpacing: 18,
            color: "#B3125A",
            maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${interpolate(frame, [42, 58], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [42, 58], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
          }}
        >
          SPF
        </Interactive.Div>
        <Interactive.Div
          name="Title — 50"
          style={{
            position: "absolute",
            left: 112,
            top: 300,
            fontFamily: "Outfit",
            fontWeight: 800,
            fontSize: 400,
            lineHeight: 1,
            letterSpacing: -16,
            color: "rgba(0,0,0,0)",
            backgroundImage:
              "linear-gradient(160deg, #FF7A3D 0%, #F0306E 55%, #C0105C 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${interpolate(frame, [44, 62], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [44, 62], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
            filter: `drop-shadow(0 0 ${interpolate(frame, [44, 54, 70], [0, 30, 4], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px rgba(255,236,170,0.95))`,
          }}
        >
          50
        </Interactive.Div>
        <Interactive.Div
          name="Title — PA++++"
          style={{
            position: "absolute",
            left: 132,
            top: 700,
            fontFamily: "Outfit",
            fontWeight: 400,
            fontSize: 92,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#C9620C",
            maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${interpolate(frame, [50, 66], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [50, 66], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
          }}
        >
          PA++++
        </Interactive.Div>
        <Interactive.Div
          name="Light writing the type"
          style={{
            position: "absolute",
            left: -400,
            top: 150,
            width: 300,
            height: 760,
            background:
              "linear-gradient(90deg, rgba(255,255,240,0) 0%, rgba(255,255,240,0.9) 50%, rgba(255,255,240,0) 100%)",
            filter: "blur(20px)",
            mixBlendMode: "screen",
            rotate: "10deg",
            translate: interpolate(frame, [42, 66], ["0px 0px", "1500px 0px"], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Amber glass world"
        style={{
          opacity: interpolate(frame, [39, 40], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Warm light"
          style={{
            background:
              "radial-gradient(80% 100% at 62% 38%, #FFF8DC 0%, #FFE28C 35%, #FFBF57 70%, #FF9F45 100%)",
          }}
        />
        <AbsoluteFill
          name="Golden caustics"
          style={{
            opacity: 0.18,
            mixBlendMode: "soft-light",
            translate: interpolate(frame, [0, 40], ["0px 0px", "-120px 20px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Caustics seed={3} frequency={0.006} />
        </AbsoluteFill>
        <Interactive.Div
          name="Amber pane far"
          style={{
            position: "absolute",
            left: 1100,
            top: 120,
            width: 520,
            height: 820,
            filter: "blur(18px)",
            opacity: 0.7,
            rotate: "8deg",
            translate: interpolate(frame, [0, 40], ["200px 0px", "-260px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <AmberGlass radius={60} />
        </Interactive.Div>
        <Interactive.Div
          name="Coral reflection arc"
          style={{
            position: "absolute",
            left: 300,
            top: -300,
            width: 1600,
            height: 1600,
            borderRadius: "50%",
            borderLeft: "60px solid rgba(240,48,110,0.55)",
            borderBottom: "30px solid rgba(255,110,70,0.35)",
            filter: "blur(22px)",
            rotate: interpolate(frame, [10, 40], ["-40deg", "30deg"], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [10, 18, 34, 40], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Amber pane near"
          style={{
            position: "absolute",
            left: 260,
            top: -80,
            width: 700,
            height: 1240,
            filter: "blur(12px)",
            rotate: "-6deg",
            translate: interpolate(frame, [0, 40], ["500px 0px", "-900px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <AmberGlass radius={80} />
        </Interactive.Div>
        <Interactive.Div
          name="Anamorphic streak"
          style={{
            position: "absolute",
            left: -200,
            top: 400,
            width: 2320,
            height: 40,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,250,230,0.85) 50%, rgba(255,255,255,0) 100%)",
            filter: "blur(10px)",
            translate: interpolate(frame, [0, 40], ["0px 0px", "0px 40px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Glass pane crossing the lens"
        style={{
          position: "absolute",
          left: -340,
          top: -260,
          width: 2600,
          height: 1600,
          filter: "blur(8px)",
          rotate: "-8deg",
          translate: interpolate(frame, [26, 54], ["2700px 0px", "-2800px 0px"], {
            easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AmberGlass radius={90} />
        <AbsoluteFill
          style={{
            borderRadius: 90,
            background:
              "linear-gradient(90deg, rgba(255,214,110,0.8), rgba(255,190,90,0.9) 50%, rgba(255,214,110,0.8))",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Golden flare (loop seam)"
        style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}
      >
        <GoldenFlare
          open={interpolate(frame, [0, 22], [0, 1], {
            easing: Easing.bezier(0.3, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
