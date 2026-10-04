import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, MilkSheet, MilkWave, WaterDrop } from "./materials";

// SCENE 01 — MILK REVEAL (0:00–0:02.5)
// Opens inside the milk (the loop seam), drifts low over a flowing milk
// surface, then a milk wave crosses the lens onto a macro of the bottle.
// Receding milk uncovers MILK POWER.
// Sound: 0:00 creamy liquid movement · 0:01.4 milk passes the lens.
export const B1MilkReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F9CAD6" }}>
      <AbsoluteFill
        name="Macro bottle world"
        style={{
          background:
            "radial-gradient(110% 100% at 70% 30%, #FFEAF0 0%, #FAD0DB 50%, #F2B2C4 100%)",
        }}
      >
        <Interactive.Div
          name="Pink backlight"
          style={{
            position: "absolute",
            left: 900,
            top: -200,
            width: 1100,
            height: 1100,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,240,244,0))",
          }}
        />
        <AbsoluteFill
          name="Camera pull-back"
          style={{
            transformOrigin: "1350px 320px",
            scale: interpolate(frame, [40, 85], [1.2, 1], {
              easing: Easing.bezier(0.25, 0.6, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Img
            name="A BONNE bottle (macro)"
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 1120,
              top: -40,
              width: 460,
              filter: "drop-shadow(0 0 22px rgba(255,255,255,0.55))",
            }}
          />
        </AbsoluteFill>
        <Interactive.Div
          name="Title — MILK"
          style={{
            position: "absolute",
            left: 140,
            top: 270,
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: 200,
            lineHeight: 1,
            letterSpacing: -6,
            color: "#5E1A38",
          }}
        >
          MILK
        </Interactive.Div>
        <Interactive.Div
          name="Title — POWER"
          style={{
            position: "absolute",
            left: 146,
            top: 480,
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 200,
            fontSize: 170,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#5E1A38",
          }}
        >
          POWER
        </Interactive.Div>
        <Interactive.Div
          name="Receding milk (reveals title)"
          style={{
            position: "absolute",
            left: 0,
            top: -210,
            width: 1300,
            height: 1500,
            rotate: "90deg",
            translate: interpolate(frame, [50, 78], ["-400px 0px", "-1750px 0px"], {
              easing: Easing.bezier(0.45, 0, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <MilkWave
            phase={interpolate(frame, [40, 85], [0, 3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            amp={45}
          />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Milk surface close-up"
        style={{
          opacity: interpolate(frame, [42, 43], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Soft pink backdrop"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 20%, #FFE7EE 0%, #F9CAD6 55%, #F0ACBF 100%)",
          }}
        />
        <AbsoluteFill
          name="Close-up camera drift"
          style={{
            scale: interpolate(frame, [0, 45], [1.25, 1.1], {
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [0, 45], ["60px 0px", "-60px -20px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Interactive.Div
            name="Far milk flow"
            style={{
              position: "absolute",
              left: -300,
              top: 300,
              width: 2500,
              height: 500,
              opacity: 0.85,
              filter: "blur(4px)",
            }}
          >
            <MilkWave
              phase={interpolate(frame, [0, 45], [1, 2.2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              amp={25}
            />
          </Interactive.Div>
          <Interactive.Div
            name="Floating milk droplet"
            style={{
              position: "absolute",
              left: 1260,
              top: 250,
              width: 46,
              height: 52,
              translate: interpolate(frame, [0, 45], ["0px 0px", "-30px -24px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <WaterDrop />
          </Interactive.Div>
          <Interactive.Div
            name="Near milk flow"
            style={{
              position: "absolute",
              left: -300,
              top: 440,
              width: 2600,
              height: 800,
            }}
          >
            <MilkWave
              phase={interpolate(frame, [0, 45], [0, 2.6], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              amp={60}
            />
          </Interactive.Div>
          <Interactive.Div
            name="Pink reflection in milk"
            style={{
              position: "absolute",
              left: 200,
              top: 640,
              width: 1500,
              height: 70,
              borderRadius: "50%",
              backgroundColor: "rgba(236,120,155,0.3)",
              filter: "blur(22px)",
              mixBlendMode: "multiply",
              translate: interpolate(frame, [0, 45], ["0px 0px", "220px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </AbsoluteFill>
        <Interactive.Div
          name="Foreground milk droplet (out of focus)"
          style={{
            position: "absolute",
            left: 220,
            top: 120,
            width: 150,
            height: 170,
            filter: "blur(12px)",
            opacity: 0.8,
            translate: interpolate(frame, [0, 45], ["0px 0px", "-80px 30px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <WaterDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Milk wave crossing the lens"
        style={{
          position: "absolute",
          left: -100,
          top: -660,
          width: 2120,
          height: 2400,
          translate: interpolate(frame, [28, 58], ["0px 1800px", "0px -2000px"], {
            easing: Easing.bezier(0.4, 0.1, 0.6, 0.9),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MilkSheet
          phase={interpolate(frame, [28, 58], [2, 5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Milk sheet (loop seam)"
        style={{
          position: "absolute",
          left: -100,
          top: -660,
          width: 2120,
          height: 2400,
          translate: interpolate(frame, [0, 22], ["0px 0px", "0px -2000px"], {
            easing: Easing.bezier(0.2, 0.4, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MilkSheet
          phase={interpolate(frame, [0, 22], [0, 1.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
