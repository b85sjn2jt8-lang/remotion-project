import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, CollagenSphere, MilkWave, WaterDrop } from "./materials";

// SCENE 04 — MILK + COLLAGEN WORLD (0:07.1–0:10)
// The camera drifts through a pink-and-milk world: frosted pink glass, milk
// flowing around the base of the bottle, collagen spheres at every depth.
// A large sphere slides past the lens and the bottle sharpens behind it.
// Sound: 0:07.5 soft glass / bubble movement.
export const B4MilkCollagenWorld: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8C9D5" }}>
      <AbsoluteFill
        name="Far layer"
        style={{
          translate: interpolate(frame, [0, 92], ["20px 0px", "-20px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Pink haze"
          style={{
            background:
              "radial-gradient(90% 80% at 62% 40%, #FFF2F5 0%, #FBD5DF 45%, #F2B0C3 100%)",
          }}
        />
        <Interactive.Div
          name="Frosted pink glass left"
          style={{
            position: "absolute",
            left: 760,
            top: 90,
            width: 240,
            height: 760,
            borderRadius: 120,
            background:
              "linear-gradient(180deg, rgba(255,226,234,0.55), rgba(240,150,176,0.35))",
            border: "2px solid rgba(255,255,255,0.6)",
            boxShadow: "inset 0 0 40px rgba(255,255,255,0.4)",
            filter: "blur(3px)",
          }}
        />
        <Interactive.Div
          name="Frosted pink glass right"
          style={{
            position: "absolute",
            left: 1560,
            top: 40,
            width: 300,
            height: 880,
            borderRadius: 150,
            background:
              "linear-gradient(180deg, rgba(255,226,234,0.5), rgba(236,140,168,0.35))",
            border: "2px solid rgba(255,255,255,0.55)",
            boxShadow: "inset 0 0 50px rgba(255,255,255,0.35)",
            filter: "blur(5px)",
          }}
        />
        <Interactive.Div
          name="Far milk"
          style={{
            position: "absolute",
            left: -200,
            top: 690,
            width: 2400,
            height: 500,
            filter: "blur(3px)",
          }}
        >
          <MilkWave
            phase={interpolate(frame, [0, 92], [0.5, 2.5], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            amp={22}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Far sphere"
          style={{
            position: "absolute",
            left: 1040,
            top: 120,
            width: 150,
            height: 150,
            filter: "blur(5px)",
            translate: interpolate(frame, [0, 92], ["0px 0px", "0px -30px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product layer"
        style={{
          transformOrigin: "1240px 600px",
          scale: interpolate(frame, [0, 92], [0.97, 1.03], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Shadow in milk"
          style={{
            position: "absolute",
            left: 1080,
            top: 870,
            width: 320,
            height: 40,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(150,40,80,0.45), rgba(150,40,80,0))",
            filter: "blur(6px)",
          }}
        />
        <Img
          name="A BONNE bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1126,
            top: 240,
            width: 228,
            filter: "drop-shadow(0 0 18px rgba(255,255,255,0.7))",
          }}
        />
        <Interactive.Div
          name="Milk around the base"
          style={{
            position: "absolute",
            left: -200,
            top: 840,
            width: 2400,
            height: 360,
          }}
        >
          <MilkWave
            phase={interpolate(frame, [0, 92], [0, 3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            amp={20}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Moisture droplet"
          style={{
            position: "absolute",
            left: 1420,
            top: 360,
            width: 30,
            height: 34,
            translate: interpolate(frame, [0, 92], ["0px 0px", "10px -40px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <WaterDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Moisture droplet 2"
          style={{
            position: "absolute",
            left: 980,
            top: 560,
            width: 22,
            height: 25,
            translate: interpolate(frame, [0, 92], ["0px 0px", "-8px -50px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <WaterDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Mid sphere by bottle"
          style={{
            position: "absolute",
            left: 1430,
            top: 520,
            width: 190,
            height: 190,
            translate: interpolate(frame, [0, 92], ["0px 0px", "0px -36px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CollagenSphere />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Title — MILK +"
        style={{
          position: "absolute",
          left: 130,
          top: 300,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 800,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: -4,
          color: "#5E1A38",
          opacity: interpolate(frame, [20, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [20, 44], ["0px 30px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        MILK <span style={{ color: "#D93A74", fontWeight: 300 }}>+</span>
      </Interactive.Div>
      <Interactive.Div
        name="Title — COLLAGEN"
        style={{
          position: "absolute",
          left: 136,
          top: 460,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 300,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 4,
          color: "#5E1A38",
          opacity: interpolate(frame, [28, 42], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [28, 52], ["0px 30px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        COLLAGEN
      </Interactive.Div>
      <Interactive.Div
        name="Sphere drifting over the title"
        style={{
          position: "absolute",
          left: 520,
          top: 420,
          width: 230,
          height: 230,
          translate: interpolate(frame, [0, 92], ["-60px 40px", "160px -60px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CollagenSphere />
      </Interactive.Div>

      <Interactive.Div
        name="Large sphere passing the lens"
        style={{
          position: "absolute",
          left: 840,
          top: 60,
          width: 960,
          height: 960,
          filter: "blur(1.5px)",
          translate: interpolate(frame, [12, 74], ["0px 0px", "1300px -80px"], {
            easing: Easing.bezier(0.45, 0, 0.4, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CollagenSphere />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground milk (out of focus)"
        style={{
          position: "absolute",
          left: -300,
          top: 900,
          width: 1400,
          height: 400,
          filter: "blur(14px)",
          translate: interpolate(frame, [0, 92], ["0px 0px", "-80px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MilkWave
          phase={interpolate(frame, [0, 92], [1, 3.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          amp={50}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
