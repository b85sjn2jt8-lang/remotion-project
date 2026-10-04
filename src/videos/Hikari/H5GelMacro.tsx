import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Caustics, Droplet, GelBlob } from "./materials";

// SCENE 05 — GEL-CREAM MACRO (0:09.1–0:11.8)
// Extreme macro on clear glass: a drop of translucent gel-cream lands,
// wobbles and settles while sunlight passes through it. Water droplets sit
// around it. Sound: 0:09 soft gel texture.
export const H5GelMacro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFE3B0" }}>
      <AbsoluteFill
        name="Macro camera creep"
        style={{
          transformOrigin: "1200px 680px",
          scale: interpolate(frame, [0, 82], [1, 1.07], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Warm out-of-focus sunlight"
          style={{
            background:
              "radial-gradient(60% 70% at 70% 10%, #FFFBEA 0%, #FFE8AE 40%, #FBC777 75%, #F3A766 100%)",
          }}
        />
        <Interactive.Div
          name="Bokeh gold"
          style={{
            position: "absolute",
            left: 1420,
            top: 60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,248,220,0.85), rgba(255,248,220,0.35) 80%, rgba(255,248,220,0))",
            filter: "blur(6px)",
          }}
        />
        <Interactive.Div
          name="Bokeh coral"
          style={{
            position: "absolute",
            left: 380,
            top: 120,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,120,110,0.5), rgba(255,120,110,0.2) 80%, rgba(255,120,110,0))",
            filter: "blur(8px)",
          }}
        />
        <Interactive.Div
          name="Bokeh magenta"
          style={{
            position: "absolute",
            left: 1720,
            top: 360,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(240,48,110,0.4), rgba(240,48,110,0.15) 80%, rgba(240,48,110,0))",
            filter: "blur(6px)",
          }}
        />
        <Interactive.Div
          name="Clear glass surface"
          style={{
            position: "absolute",
            left: -200,
            top: 520,
            width: 2320,
            height: 700,
            background:
              "linear-gradient(180deg, rgba(255,250,236,0) 0%, rgba(255,244,220,0.75) 8%, rgba(250,226,186,0.85) 50%, rgba(240,200,150,0.9) 100%)",
            boxShadow: "inset 0 4px 4px rgba(255,255,255,0.8)",
          }}
        />
        <AbsoluteFill
          name="Sun caustics on glass"
          style={{
            top: 540,
            height: 540,
            opacity: 0.2,
            mixBlendMode: "screen",
            scale: "1 0.5",
            transformOrigin: "50% 0%",
            translate: interpolate(frame, [0, 82], ["0px 0px", "-70px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Caustics seed={17} frequency={0.016} />
        </AbsoluteFill>

        <Interactive.Div
          name="Falling gel drop"
          style={{
            position: "absolute",
            left: 1150,
            top: -220,
            width: 110,
            height: 150,
            borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
            background:
              "radial-gradient(circle at 38% 34%, rgba(255,255,255,0.98) 0%, rgba(255,253,244,0.78) 30%, rgba(255,240,214,0.6) 75%, rgba(240,210,170,0.75) 100%)",
            boxShadow:
              "inset -8px -10px 16px rgba(190,140,80,0.25), inset 6px 8px 12px rgba(255,255,255,0.7)",
            translate: interpolate(frame, [2, 16], ["0px 0px", "0px 820px"], {
              easing: Easing.bezier(0.5, 0, 1, 0.5),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [2, 15], ["1 1", "0.85 1.25"], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [15, 17], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Gel-cream on glass"
          style={{
            position: "absolute",
            left: 760,
            top: 420,
            width: 880,
            height: 880,
            transformOrigin: "50% 60%",
            scale: interpolate(frame, [16, 22, 34, 50], ["0.3 0.12", "1.08 0.42", "0.96 0.56", "1 0.52"], {
              easing: Easing.bezier(0.2, 0.8, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [15, 17], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <GelBlob
            wobble={interpolate(frame, [16, 82], [0, 7], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            amp={interpolate(frame, [16, 60], [0.11, 0.035], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Sunlight passing through gel"
          style={{
            position: "absolute",
            left: 900,
            top: 560,
            width: 600,
            height: 260,
            borderRadius: "50%",
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 30%, rgba(255,250,228,0.8) 50%, rgba(255,255,255,0) 70%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [30, 76], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "screen",
            filter: "blur(6px)",
          }}
        />
        <Interactive.Div
          name="Water droplet 1"
          style={{ position: "absolute", left: 700, top: 760, width: 64, height: 40 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 2"
          style={{ position: "absolute", left: 1620, top: 700, width: 46, height: 30 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 3"
          style={{ position: "absolute", left: 1560, top: 860, width: 90, height: 56 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 4"
          style={{ position: "absolute", left: 820, top: 900, width: 36, height: 23 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 5"
          style={{ position: "absolute", left: 1720, top: 600, width: 26, height: 17 }}
        >
          <Droplet />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Title — GEL-CREAM"
        style={{
          position: "absolute",
          left: 128,
          top: 190,
          fontFamily: "Outfit",
          fontWeight: 200,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 8,
          color: "#9E1050",
          opacity: interpolate(frame, [24, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [24, 40], [10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        GEL-CREAM
      </Interactive.Div>
      <Interactive.Div
        name="Line — FRESH."
        style={{
          position: "absolute",
          left: 134,
          top: 370,
          fontFamily: "Outfit",
          fontWeight: 500,
          fontSize: 54,
          letterSpacing: 14,
          color: "#D9500F",
          opacity: interpolate(frame, [40, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        FRESH.
      </Interactive.Div>
      <Interactive.Div
        name="Line — LIGHT."
        style={{
          position: "absolute",
          left: 440,
          top: 370,
          fontFamily: "Outfit",
          fontWeight: 500,
          fontSize: 54,
          letterSpacing: 14,
          color: "#D9500F",
          opacity: interpolate(frame, [48, 58], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        LIGHT.
      </Interactive.Div>
      <Interactive.Div
        name="Line — DAILY."
        style={{
          position: "absolute",
          left: 746,
          top: 370,
          fontFamily: "Outfit",
          fontWeight: 500,
          fontSize: 54,
          letterSpacing: 14,
          color: "#D9500F",
          opacity: interpolate(frame, [56, 66], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DAILY.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
