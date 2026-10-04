import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CottonPad, GlassDisc, SerumDrop } from "./elements";

// SCENE 03 — THE PAD MOTION (0:05–0:08)
// A cotton pad sweeps past the lens. Everything behind its centre turns from
// clean pale pink into a wet, glossy rose world where the three words wait.
// Sound: 0:05 soft pad swipe.
export const S3PadSwipe: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF5F7" }}>
      <AbsoluteFill name="Clean pale world">
        <AbsoluteFill
          name="Pale gradient"
          style={{
            background:
              "radial-gradient(90% 90% at 50% 45%, #FFFFFF 0%, #FDF1F4 55%, #F7DDE4 100%)",
          }}
        />
        <Interactive.Div
          name="Pale glass disc"
          style={{
            position: "absolute",
            left: 1280,
            top: 220,
            width: 380,
            height: 380,
            filter: "blur(8px)",
            opacity: 0.45,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Pale glass bead"
          style={{
            position: "absolute",
            left: 330,
            top: 640,
            width: 180,
            height: 180,
            filter: "blur(4px)",
            opacity: 0.4,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Glossy rose world (revealed by the pad)"
        style={{
          clipPath: `polygon(-100px 0px, ${interpolate(frame, [0, 38], [-900, 2800], {
            easing: Easing.bezier(0.6, 0.05, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px 0px, ${interpolate(frame, [0, 38], [-900, 2800], {
            easing: Easing.bezier(0.6, 0.05, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px 1080px, -100px 1080px)`,
        }}
      >
        <AbsoluteFill
          name="Rose world (slow push)"
          style={{
            scale: interpolate(frame, [20, 100], [1.04, 1], {
              easing: Easing.bezier(0.2, 0.6, 0.4, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <AbsoluteFill
            name="Glossy rose gradient"
            style={{
              background:
                "linear-gradient(155deg, #F9BCCA 0%, #F09AAF 40%, #E37A95 75%, #D9668A 100%)",
            }}
          />
          <Interactive.Div
            name="Wet sheen"
            style={{
              position: "absolute",
              left: -200,
              top: -300,
              width: 1400,
              height: 900,
              borderRadius: "50%",
              background:
                "radial-gradient(closest-side, rgba(255,240,244,0.7), rgba(255,240,244,0))",
              filter: "blur(20px)",
            }}
          />
          <Interactive.Div
            name="Gloss streak"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 2600,
              height: 160,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0) 100%)",
              rotate: "-14deg",
              translate: interpolate(frame, [20, 100], ["-300px 760px", "-300px 640px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              filter: "blur(6px)",
            }}
          />
          <Interactive.Div
            name="Rose glass disc back"
            style={{
              position: "absolute",
              left: 1500,
              top: 60,
              width: 300,
              height: 300,
              filter: "blur(10px)",
              opacity: 0.7,
            }}
          >
            <GlassDisc />
          </Interactive.Div>
          <Interactive.Div
            name="Rose serum bead"
            style={{
              position: "absolute",
              left: 1660,
              top: 560,
              width: 120,
              height: 136,
              filter: "blur(2px)",
              translate: interpolate(frame, [30, 100], ["0px 0px", "0px -26px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <SerumDrop />
          </Interactive.Div>
          <Interactive.Div
            name="Word — SWIPE."
            style={{
              position: "absolute",
              left: 170,
              top: 150,
              fontFamily: "Manrope",
              fontWeight: 800,
              fontSize: 190,
              lineHeight: 1,
              letterSpacing: -4,
              color: "#FFFFFF",
              textShadow: "0 12px 40px rgba(150,30,70,0.25)",
              translate: interpolate(frame, [12, 34], ["-140px 0px", "0px 0px"], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            SWIPE.
          </Interactive.Div>
          <Interactive.Div
            name="Word — SHINE."
            style={{
              position: "absolute",
              left: 560,
              top: 420,
              fontFamily: "Manrope",
              fontWeight: 300,
              fontSize: 190,
              lineHeight: 1.1,
              letterSpacing: 6,
              color: "rgba(255,255,255,0)",
              backgroundImage:
                "linear-gradient(100deg, #FFFFFF 0%, #FFFFFF 38%, #FFE3EA 45%, #FFFFFF 50%, #FFE3EA 55%, #FFFFFF 62%, #FFFFFF 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: `${interpolate(frame, [30, 62], [100, 0], {
                easing: Easing.bezier(0.45, 0, 0.55, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}% 0%`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              filter: `drop-shadow(0 0 ${interpolate(frame, [36, 46, 62], [0, 26, 6], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}px rgba(255,255,255,0.9))`,
            }}
          >
            SHINE.
          </Interactive.Div>
          <Interactive.Div
            name="Word — GLOW."
            style={{
              position: "absolute",
              left: 1000,
              top: 700,
              fontFamily: "Manrope",
              fontWeight: 800,
              fontSize: 190,
              lineHeight: 1,
              letterSpacing: -4,
              color: "#FFF4F7",
              filter: `blur(${interpolate(frame, [30, 50], [16, 0], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}px)`,
              textShadow: "0 0 50px rgba(255,214,226,0.95), 0 0 120px rgba(255,190,208,0.8)",
              scale: interpolate(frame, [30, 56], [0.92, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              opacity: interpolate(frame, [30, 44], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            GLOW.
          </Interactive.Div>
        </AbsoluteFill>
        <Interactive.Div
          name="Wet trail behind pad"
          style={{
            position: "absolute",
            left: -700,
            top: 0,
            width: 700,
            height: 1080,
            background:
              "linear-gradient(90deg, rgba(255,240,244,0) 0%, rgba(255,240,244,0.55) 100%)",
            translate: interpolate(frame, [0, 38], ["-900px 0px", "2800px 0px"], {
              easing: Easing.bezier(0.6, 0.05, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Cotton pad (close to lens)"
        style={{
          position: "absolute",
          left: -800,
          top: -260,
          width: 1600,
          height: 1600,
          translate: interpolate(frame, [0, 38], ["-900px 0px", "2800px 0px"], {
            easing: Easing.bezier(0.6, 0.05, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          rotate: interpolate(frame, [0, 38], ["-14deg", "12deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "blur(3px) drop-shadow(-50px 40px 60px rgba(150,40,80,0.35))",
        }}
      >
        <CottonPad tint={0.15} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
