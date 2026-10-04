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

// SCENE 01 — THE PINK DROP (0:00–0:02.5)
// The loop pad clears the lens, a serum drop swells and falls; its ripple
// opens onto a macro of the jar, the camera pulls back and the formula name
// surfaces from the liquid. Sound: 0:00 serum tension · 0:01.4 liquid impact
// · 0:02 reveal whoosh.
export const S1PinkDrop: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FBEAEE" }}>
      <AbsoluteFill
        name="Pale world (camera push)"
        style={{
          scale: interpolate(frame, [0, 42], [1, 1.06], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Pale backdrop"
          style={{
            background:
              "radial-gradient(110% 80% at 50% 28%, #FFF9FA 0%, #FCEBEF 50%, #F6D5DD 100%)",
          }}
        />
        <Interactive.Div
          name="Back bokeh disc left"
          style={{
            position: "absolute",
            left: 120,
            top: 90,
            width: 320,
            height: 320,
            filter: "blur(20px)",
            opacity: 0.55,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Back bokeh disc right"
          style={{
            position: "absolute",
            left: 1440,
            top: 40,
            width: 420,
            height: 420,
            filter: "blur(26px)",
            opacity: 0.6,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Mid glass bead"
          style={{
            position: "absolute",
            left: 1330,
            top: 470,
            width: 150,
            height: 150,
            filter: "blur(10px)",
            opacity: 0.6,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Glossy surface"
          style={{
            position: "absolute",
            left: -200,
            top: 640,
            width: 2320,
            height: 600,
            background:
              "linear-gradient(180deg, #F8DCE3 0%, #F3C7D1 30%, #EDB2C0 100%)",
            boxShadow: "0 -40px 70px rgba(255,255,255,0.9)",
          }}
        />
        <Interactive.Div
          name="Key light on surface"
          style={{
            position: "absolute",
            left: 560,
            top: 690,
            width: 800,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.7)",
            filter: "blur(30px)",
          }}
        />
        <Interactive.Div
          name="Drop meniscus"
          style={{
            position: "absolute",
            left: 885,
            top: -80,
            width: 150,
            height: 130,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 60%, rgba(255,235,240,0.9) 0%, rgba(240,150,175,0.7) 60%, rgba(220,90,128,0.8) 100%)",
            scale: interpolate(frame, [0, 24, 30], ["1 0.6", "0.9 1.4", "0.6 0.5"], {
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [26, 32], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Serum drop"
          style={{
            position: "absolute",
            left: 900,
            top: -50,
            width: 120,
            height: 146,
            translate: interpolate(
              frame,
              [0, 26, 42],
              ["0px 0px", "0px 70px", "0px 604px"],
              {
                easing: [
                  Easing.bezier(0.33, 0, 0.2, 1),
                  Easing.bezier(0.55, 0, 1, 0.45),
                ],
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            scale: interpolate(
              frame,
              [0, 24, 30, 41],
              ["0.3 0.3", "1 1.08", "0.92 1.18", "0.82 1.3"],
              {
                output: "perceptual-scale",
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            opacity: interpolate(frame, [41, 43], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Drop reflection"
          style={{
            position: "absolute",
            left: 900,
            top: 1304,
            width: 120,
            height: 146,
            transformOrigin: "50% 50%",
            translate: interpolate(
              frame,
              [0, 26, 42],
              ["0px 0px", "0px -70px", "0px -604px"],
              {
                easing: [
                  Easing.bezier(0.33, 0, 0.2, 1),
                  Easing.bezier(0.55, 0, 1, 0.45),
                ],
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            scale: interpolate(frame, [0, 24, 41], ["0.3 -0.3", "1 -1.08", "0.82 -1.3"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [20, 41, 43], [0, 0.35, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            filter: "blur(3px)",
          }}
        >
          <SerumDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Drop shadow on surface"
          style={{
            position: "absolute",
            left: 880,
            top: 690,
            width: 160,
            height: 28,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(180,60,95,0.45), rgba(180,60,95,0))",
            scale: interpolate(frame, [26, 42], [1.8, 0.7], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [26, 41, 43], [0, 0.8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Splash droplet left"
          style={{
            position: "absolute",
            left: 930,
            top: 700,
            width: 18,
            height: 22,
            translate: interpolate(
              frame,
              [42, 50, 60],
              ["0px 0px", "-70px -90px", "-120px 10px"],
              {
                easing: [Easing.bezier(0.2, 0.8, 0.4, 1), Easing.bezier(0.6, 0, 0.9, 0.5)],
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            opacity: interpolate(frame, [42, 43, 58, 60], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Splash droplet right"
          style={{
            position: "absolute",
            left: 975,
            top: 700,
            width: 14,
            height: 17,
            translate: interpolate(
              frame,
              [42, 49, 58],
              ["0px 0px", "60px -70px", "105px 10px"],
              {
                easing: [Easing.bezier(0.2, 0.8, 0.4, 1), Easing.bezier(0.6, 0, 0.9, 0.5)],
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            opacity: interpolate(frame, [42, 43, 56, 58], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Impact ripple 1"
          style={{
            position: "absolute",
            left: -140,
            top: 410,
            width: 2200,
            height: 600,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 5px rgba(255,255,255,0.85), 0 10px 14px 4px rgba(196,72,108,0.3), inset 0 -10px 14px rgba(196,72,108,0.25), inset 0 6px 8px rgba(255,255,255,0.8)",
            filter: "blur(1.5px)",
            scale: interpolate(frame, [42, 62], [0.01, 1], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [42, 44, 62], [0, 1, 0.3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Impact ripple 2"
          style={{
            position: "absolute",
            left: -140,
            top: 410,
            width: 2200,
            height: 600,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 4px rgba(255,255,255,0.75), 0 8px 12px 3px rgba(196,72,108,0.26), inset 0 -8px 12px rgba(196,72,108,0.2), inset 0 5px 7px rgba(255,255,255,0.7)",
            filter: "blur(1.5px)",
            scale: interpolate(frame, [46, 66], [0.01, 0.7], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [46, 48, 66], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Foreground serum bead"
          style={{
            position: "absolute",
            left: -90,
            top: 780,
            width: 340,
            height: 380,
            filter: "blur(22px)",
            opacity: 0.85,
            translate: interpolate(frame, [0, 42], ["0px 0px", "-40px 30px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Foreground glass top right"
          style={{
            position: "absolute",
            left: 1660,
            top: -160,
            width: 460,
            height: 460,
            filter: "blur(28px)",
            opacity: 0.75,
            translate: interpolate(frame, [0, 42], ["0px 0px", "40px -30px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <GlassDisc />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Ripple reveal — macro to medium"
        style={{
          clipPath: `ellipse(${interpolate(frame, [43, 60], [0, 1700], {
            easing: Easing.bezier(0.25, 0.6, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [43, 60], [0, 1100], {
            easing: Easing.bezier(0.25, 0.6, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 50% 66%)`,
        }}
      >
        <AbsoluteFill
          name="Rose backdrop"
          style={{
            background:
              "radial-gradient(90% 90% at 64% 38%, #FFE7EC 0%, #F8C9D4 45%, #EDA3B5 100%)",
          }}
        />
        <AbsoluteFill
          name="Camera pull-back"
          style={{
            transformOrigin: "1330px 540px",
            scale: interpolate(frame, [44, 70], [2.05, 1], {
              easing: Easing.bezier(0.5, 0, 0.12, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [44, 70], ["-300px 0px", "0px 0px"], {
              easing: Easing.bezier(0.5, 0, 0.12, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Interactive.Div
            name="Wet floor"
            style={{
              position: "absolute",
              left: -400,
              top: 760,
              width: 2800,
              height: 700,
              background:
                "linear-gradient(180deg, rgba(244,178,195,0) 0%, rgba(240,170,188,0.95) 10%, #EBA0B3 40%, #E28EA4 100%)",
              boxShadow: "0 -50px 80px rgba(255,236,241,0.85)",
            }}
          />
          <Interactive.Div
            name="Floor ripple"
            style={{
              position: "absolute",
              left: 630,
              top: 780,
              width: 1400,
              height: 200,
              borderRadius: "50%",
              boxShadow:
                "0 0 0 3px rgba(255,255,255,0.7), 0 6px 10px 2px rgba(190,60,95,0.25), inset 0 4px 6px rgba(255,255,255,0.6)",
              filter: "blur(1px)",
              scale: interpolate(frame, [52, 84], [0.4, 1.3], {
                easing: Easing.bezier(0.2, 0.7, 0.3, 1),
                output: "perceptual-scale",
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              opacity: interpolate(frame, [52, 60, 84], [0, 0.9, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
          <Img
            name="Jar reflection"
            src={staticFile(JAR_SRC)}
            style={{
              position: "absolute",
              left: 940,
              top: 868,
              width: 780,
              scale: "1 -1",
              opacity: 0.3,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 40%)",
            }}
          />
          <Interactive.Div
            name="Contact shadow"
            style={{
              position: "absolute",
              left: 950,
              top: 845,
              width: 760,
              height: 46,
              borderRadius: "50%",
              background:
                "radial-gradient(closest-side, rgba(120,25,55,0.55), rgba(120,25,55,0))",
              filter: "blur(5px)",
            }}
          />
          <Img
            name="ANUA jar"
            src={staticFile(JAR_SRC)}
            style={{ position: "absolute", left: 940, top: 148, width: 780 }}
          />
        </AbsoluteFill>
        <Interactive.Div
          name="Foreground serum blur"
          style={{
            position: "absolute",
            left: -120,
            top: 760,
            width: 420,
            height: 420,
            filter: "blur(16px)",
            opacity: 0.8,
            translate: interpolate(frame, [44, 85], ["-80px 40px", "0px 0px"], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Text ripple"
          style={{
            position: "absolute",
            left: -500,
            top: 300,
            width: 2400,
            height: 900,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 3px rgba(255,255,255,0.8), 0 0 30px 6px rgba(255,255,255,0.45), inset 0 0 20px rgba(255,255,255,0.35)",
            filter: "blur(1px)",
            scale: interpolate(frame, [60, 80], [0.05, 1], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [60, 64, 80], [0, 0.8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Title — NIACINAMIDE 5"
          style={{
            position: "absolute",
            left: 120,
            top: 330,
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: 76,
            letterSpacing: interpolate(frame, [62, 82], [22, 9], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            color: "#3B1520",
            whiteSpace: "nowrap",
            clipPath: `inset(${interpolate(frame, [62, 72], [100, 0], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0 0)`,
            translate: interpolate(frame, [62, 74], ["0px 40px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          NIACINAMIDE 5
        </Interactive.Div>
        <Interactive.Div
          name="Title — plus"
          style={{
            position: "absolute",
            left: 116,
            top: 420,
            fontFamily: "Manrope",
            fontWeight: 300,
            fontSize: 190,
            lineHeight: 1,
            color: "#D3243F",
            scale: interpolate(frame, [66, 78], [0, 1], {
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            rotate: interpolate(frame, [66, 78], ["-90deg", "0deg"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          +
        </Interactive.Div>
        <Interactive.Div
          name="Title — TXA"
          style={{
            position: "absolute",
            left: 260,
            top: 430,
            fontFamily: "Manrope",
            fontWeight: 800,
            fontSize: 190,
            lineHeight: 1,
            letterSpacing: -2,
            color: "#3B1520",
            clipPath: `inset(${interpolate(frame, [68, 79], [100, 0], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0 0)`,
            translate: interpolate(frame, [68, 81], ["0px 60px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          TXA
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Lens pad (loop seam)"
        style={{
          position: "absolute",
          left: -540,
          top: -960,
          width: 3000,
          height: 3000,
          translate: interpolate(frame, [0, 18], ["0px 0px", "-3200px 0px"], {
            easing: Easing.bezier(0.2, 0.4, 0.5, 1),
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
