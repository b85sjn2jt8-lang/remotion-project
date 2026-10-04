import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Bubble, GlassDisc, SerumDrop } from "./elements";

// SCENE 04 — SERUM MACRO (0:08–0:10.5)
// Extreme macro at the surface of the pink serum. A drop falls, the surface
// ripples, and three words surface through the liquid one after another.
// Sound: 0:08 serum drop · 0:10 liquid ripple.
export const S4SerumMacro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F29AB0" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="s4-liquid-radiance" x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.018" numOctaves="1" seed="4" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [24, 40, 46, 52], [60, 0, 0, 22], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="s4-liquid-texture" x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.018" numOctaves="1" seed="9" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [48, 62, 66, 72], [60, 0, 0, 22], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="s4-liquid-glow" x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.018" numOctaves="1" seed="2" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [68, 82], [60, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="s4-caustics" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.006 0.018" numOctaves="2" seed="11" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.93  0 0 0 0 0.95  0 0 0 -2.6 1.25" />
          </filter>
        </defs>
      </svg>

      <AbsoluteFill
        name="Macro world (slow drift)"
        style={{
          scale: interpolate(frame, [0, 90], [1.06, 1], {
            easing: Easing.bezier(0.2, 0.5, 0.4, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Serum backdrop"
          style={{
            background:
              "radial-gradient(85% 90% at 50% 25%, #FFE0E7 0%, #F6AFC0 40%, #E57E98 75%, #CF5A7C 100%)",
          }}
        />
        <Interactive.Div
          name="Light through liquid"
          style={{
            position: "absolute",
            left: 300,
            top: -200,
            width: 1300,
            height: 900,
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.35) 32%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 52%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0) 68%)",
            filter: "blur(18px)",
            translate: interpolate(frame, [0, 90], ["-60px 0px", "60px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Back glass bokeh"
          style={{
            position: "absolute",
            left: 130,
            top: 90,
            width: 340,
            height: 340,
            filter: "blur(22px)",
            opacity: 0.6,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Back glass bokeh right"
          style={{
            position: "absolute",
            left: 1500,
            top: 160,
            width: 220,
            height: 220,
            filter: "blur(14px)",
            opacity: 0.6,
          }}
        >
          <GlassDisc />
        </Interactive.Div>

        <Interactive.Div
          name="Word — RADIANCE"
          style={{
            position: "absolute",
            left: 0,
            top: 300,
            width: 1920,
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 200,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: 40,
            color: "#FFFFFF",
            textShadow: "0 0 40px rgba(255,220,230,0.8)",
            filter: "url(#s4-liquid-radiance)",
            opacity: interpolate(frame, [24, 34, 46, 52], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [24, 42], ["0px 40px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          RADIANCE
        </Interactive.Div>
        <Interactive.Div
          name="Word — TEXTURE"
          style={{
            position: "absolute",
            left: 0,
            top: 300,
            width: 1920,
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 200,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: 40,
            color: "#FFFFFF",
            textShadow: "0 0 40px rgba(255,220,230,0.8)",
            filter: "url(#s4-liquid-texture)",
            opacity: interpolate(frame, [48, 56, 66, 72], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [48, 64], ["0px 40px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          TEXTURE
        </Interactive.Div>
        <Interactive.Div
          name="Word — GLOW"
          style={{
            position: "absolute",
            left: 0,
            top: 280,
            width: 1920,
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 200,
            fontSize: 190,
            lineHeight: 1,
            letterSpacing: 60,
            color: "#FFFFFF",
            textShadow: "0 0 60px rgba(255,220,230,0.95)",
            filter: "url(#s4-liquid-glow)",
            opacity: interpolate(frame, [68, 78], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [68, 86], ["0px 40px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          GLOW
        </Interactive.Div>

        <Interactive.Div
          name="Falling serum drop"
          style={{
            position: "absolute",
            left: 905,
            top: -200,
            width: 110,
            height: 134,
            translate: interpolate(frame, [4, 22], ["0px 0px", "0px 790px"], {
              easing: Easing.bezier(0.5, 0, 1, 0.5),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [4, 21], ["1 1", "0.85 1.25"], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [21, 23], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>

        <Interactive.Div
          name="Serum surface"
          style={{
            position: "absolute",
            left: -200,
            top: 690,
            width: 2320,
            height: 520,
            background:
              "linear-gradient(180deg, rgba(255,226,233,0.95) 0%, rgba(244,160,182,0.92) 6%, rgba(228,116,146,0.94) 40%, rgba(196,70,108,0.97) 100%)",
            boxShadow: "0 -6px 20px rgba(255,255,255,0.7), inset 0 6px 6px rgba(255,255,255,0.75)",
          }}
        />
        <AbsoluteFill
          name="Caustics in serum"
          style={{
            top: 700,
            height: 400,
            opacity: 0.14,
            mixBlendMode: "screen",
            filter: "blur(3px)",
            translate: interpolate(frame, [0, 90], ["0px 0px", "-80px 10px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <svg width={2200} height={400}>
            <rect width={2200} height={400} filter="url(#s4-caustics)" />
          </svg>
        </AbsoluteFill>
        <Interactive.Div
          name="Word reflection — RADIANCE"
          style={{
            position: "absolute",
            left: 0,
            top: 700,
            width: 1920,
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 200,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: 40,
            color: "#FFFFFF",
            scale: "1 -0.7",
            filter: "blur(4px)",
            opacity: interpolate(frame, [24, 34, 46, 52], [0, 0.25, 0.25, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          RADIANCE
        </Interactive.Div>
        <Interactive.Div
          name="Word reflection — TEXTURE"
          style={{
            position: "absolute",
            left: 0,
            top: 700,
            width: 1920,
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 200,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: 40,
            color: "#FFFFFF",
            scale: "1 -0.7",
            filter: "blur(4px)",
            opacity: interpolate(frame, [48, 56, 66, 72], [0, 0.25, 0.25, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          TEXTURE
        </Interactive.Div>
        <Interactive.Div
          name="Word reflection — GLOW"
          style={{
            position: "absolute",
            left: 0,
            top: 700,
            width: 1920,
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 200,
            fontSize: 190,
            lineHeight: 1,
            letterSpacing: 60,
            color: "#FFFFFF",
            scale: "1 -0.7",
            filter: "blur(4px)",
            opacity: interpolate(frame, [68, 78], [0, 0.28], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          GLOW
        </Interactive.Div>

        <Interactive.Div
          name="Surface ripple 1"
          style={{
            position: "absolute",
            left: -240,
            top: 560,
            width: 2400,
            height: 300,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 4px rgba(255,255,255,0.8), 0 8px 12px 3px rgba(170,40,80,0.3), inset 0 -8px 12px rgba(170,40,80,0.25), inset 0 5px 8px rgba(255,255,255,0.75)",
            filter: "blur(1.5px)",
            scale: interpolate(frame, [22, 60], [0.01, 1], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [22, 25, 60], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Surface ripple 2"
          style={{
            position: "absolute",
            left: -240,
            top: 560,
            width: 2400,
            height: 300,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 3px rgba(255,255,255,0.75), 0 6px 10px 2px rgba(170,40,80,0.26), inset 0 4px 6px rgba(255,255,255,0.7)",
            filter: "blur(1.5px)",
            scale: interpolate(frame, [30, 72], [0.01, 0.8], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [30, 33, 72], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Surface ripple 3"
          style={{
            position: "absolute",
            left: -240,
            top: 560,
            width: 2400,
            height: 300,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 3px rgba(255,255,255,0.7), 0 6px 10px 2px rgba(170,40,80,0.22), inset 0 4px 6px rgba(255,255,255,0.65)",
            filter: "blur(1.5px)",
            scale: interpolate(frame, [42, 88], [0.01, 0.65], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [42, 45, 88], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Rebound jet"
          style={{
            position: "absolute",
            left: 942,
            top: 640,
            width: 36,
            height: 70,
            borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
            background:
              "linear-gradient(90deg, rgba(232,120,150,0.8), rgba(255,236,241,0.95) 40%, rgba(232,120,150,0.85))",
            transformOrigin: "50% 100%",
            scale: interpolate(frame, [22, 30, 40], ["0.4 0", "1 1.6", "0.6 0"], {
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Rebound droplet"
          style={{
            position: "absolute",
            left: 945,
            top: 600,
            width: 30,
            height: 36,
            translate: interpolate(frame, [28, 38, 50], ["0px 0px", "0px -130px", "0px 70px"], {
              easing: [Easing.bezier(0.2, 0.8, 0.4, 1), Easing.bezier(0.6, 0, 0.9, 0.4)],
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [27, 29, 48, 50], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>

        <Interactive.Div
          name="Bubble 1"
          style={{
            position: "absolute",
            left: 520,
            top: 860,
            width: 34,
            height: 34,
            translate: interpolate(frame, [0, 90], ["0px 0px", "6px -90px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Bubble />
        </Interactive.Div>
        <Interactive.Div
          name="Bubble 2"
          style={{
            position: "absolute",
            left: 1340,
            top: 900,
            width: 22,
            height: 22,
            translate: interpolate(frame, [0, 90], ["0px 0px", "-4px -110px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Bubble />
        </Interactive.Div>
        <Interactive.Div
          name="Bubble 3"
          style={{
            position: "absolute",
            left: 760,
            top: 980,
            width: 16,
            height: 16,
            translate: interpolate(frame, [0, 90], ["0px 0px", "3px -140px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Bubble />
        </Interactive.Div>
        <Interactive.Div
          name="Bubble 4"
          style={{
            position: "absolute",
            left: 1560,
            top: 820,
            width: 44,
            height: 44,
            filter: "blur(2px)",
            translate: interpolate(frame, [0, 90], ["0px 0px", "-8px -60px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Bubble />
        </Interactive.Div>
        <Interactive.Div
          name="Bubble 5"
          style={{
            position: "absolute",
            left: 300,
            top: 960,
            width: 26,
            height: 26,
            filter: "blur(1px)",
            translate: interpolate(frame, [0, 90], ["0px 0px", "5px -100px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Bubble />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground droplet (out of focus)"
        style={{
          position: "absolute",
          left: 1580,
          top: -120,
          width: 420,
          height: 480,
          filter: "blur(26px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 90], ["0px 0px", "-60px 30px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <SerumDrop />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground glass (out of focus)"
        style={{
          position: "absolute",
          left: -200,
          top: 760,
          width: 520,
          height: 520,
          filter: "blur(24px)",
          opacity: 0.75,
          translate: interpolate(frame, [0, 90], ["0px 0px", "50px -20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <GlassDisc />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
