import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BiotaSpray, Droplet, Leaf, Mist } from "./materials";

// SHOT 03 — BOTANICAL MACRO WORLD (0:05.3–0:08.2)
// Wet leaves at three depths drift past in parallax under a green-gold
// backlight. A droplet swells at a leaf tip, falls onto dark water, and its
// ripple brings up BOTANICAL / HAIR CARE.
export const G3BotanicalWorld: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050F09" }}>
      <AbsoluteFill
        name="Green-gold backlight"
        style={{
          background:
            "radial-gradient(55% 70% at 74% 30%, rgba(170,190,110,0.5) 0%, rgba(60,110,64,0.45) 35%, rgba(14,36,22,0.6) 70%, rgba(5,15,9,1) 100%)",
        }}
      />
      <Interactive.Div
        name="Background biota (far)"
        style={{
          position: "absolute",
          left: 1050,
          top: -200,
          width: 620,
          height: 930,
          rotate: "168deg",
          filter: "blur(12px)",
          opacity: 0.6,
          translate: interpolate(frame, [0, 88], ["20px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <BiotaSpray tone="glow" seed={21} />
      </Interactive.Div>
      <Interactive.Div
        name="Background leaf silhouette — left"
        style={{
          position: "absolute",
          left: 860,
          top: -260,
          width: 300,
          height: 760,
          rotate: "196deg",
          filter: "blur(10px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 88], ["30px 0px", "-40px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Leaf tone="silhouette" beads={false} />
      </Interactive.Div>
      <Interactive.Div
        name="Background leaf silhouette — right"
        style={{
          position: "absolute",
          left: 1700,
          top: -300,
          width: 300,
          height: 780,
          rotate: "162deg",
          filter: "blur(10px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 88], ["30px 0px", "-40px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Leaf tone="silhouette" beads={false} />
      </Interactive.Div>

      <Interactive.Div
        name="Dark water surface"
        style={{
          position: "absolute",
          left: -200,
          top: 860,
          width: 2320,
          height: 300,
          background:
            "linear-gradient(180deg, rgba(60,100,70,0.55) 0%, #0A1C12 18%, #040B07 100%)",
          boxShadow: "0 -2px 12px rgba(120,170,120,0.25)",
        }}
      />
      <Interactive.Div
        name="Impact ripple 1"
        style={{
          position: "absolute",
          left: 740,
          top: 790,
          width: 1400,
          height: 160,
          borderRadius: "50%",
          boxShadow:
            "0 0 0 3px rgba(190,220,170,0.6), 0 5px 10px rgba(0,0,0,0.5), inset 0 4px 6px rgba(210,235,195,0.4)",
          filter: "blur(1px)",
          scale: interpolate(frame, [48, 86], [0.01, 1], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [48, 51, 86], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Impact ripple 2"
        style={{
          position: "absolute",
          left: 740,
          top: 790,
          width: 1400,
          height: 160,
          borderRadius: "50%",
          boxShadow: "0 0 0 2px rgba(190,220,170,0.5), inset 0 3px 5px rgba(210,235,195,0.3)",
          filter: "blur(1px)",
          scale: interpolate(frame, [55, 88], [0.01, 0.7], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [55, 58, 88], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Splash crown"
        style={{
          position: "absolute",
          left: 1400,
          top: 830,
          width: 80,
          height: 60,
          borderRadius: "50% 50% 0 0",
          background: "radial-gradient(60% 90% at 50% 100%, rgba(220,240,215,0.7), rgba(220,240,215,0))",
          scale: interpolate(frame, [48, 54, 62], ["0.2 0.2", "1 1", "1.4 0.1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transformOrigin: "50% 100%",
          opacity: interpolate(frame, [48, 50, 62], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Wet leaf (midground, sharp)"
        style={{
          position: "absolute",
          left: 1250,
          top: -380,
          width: 380,
          height: 950,
          rotate: interpolate(frame, [0, 30], ["181.5deg", "180deg"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5)) brightness(0.72) contrast(1.15) saturate(1.1)",
        }}
      >
        <Leaf tone="fresh" />
      </Interactive.Div>
      <Interactive.Div
        name="Droplet swelling at the tip"
        style={{
          position: "absolute",
          left: 1418,
          top: 548,
          width: 44,
          height: 54,
          transformOrigin: "50% 0%",
          scale: interpolate(frame, [0, 30], [0.4, 1], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [30, 48], ["0px 0px", "0px 300px"], {
            easing: Easing.bezier(0.5, 0, 1, 0.5),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [47, 49], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>

      <Interactive.Div
        name="Title — BOTANICAL"
        style={{
          position: "absolute",
          left: 130,
          top: 300,
          fontFamily: "Josefin Sans",
          fontWeight: 300,
          fontSize: 130,
          lineHeight: 1,
          letterSpacing: 14,
          color: "#E6EEDC",
          clipPath: `ellipse(${interpolate(frame, [50, 76], [0, 2200], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [50, 76], [0, 1200], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 1310px 560px)`,
        }}
      >
        BOTANICAL
      </Interactive.Div>
      <Interactive.Div
        name="Title — HAIR CARE"
        style={{
          position: "absolute",
          left: 134,
          top: 450,
          fontFamily: "Josefin Sans",
          fontWeight: 600,
          fontSize: 130,
          lineHeight: 1,
          letterSpacing: 14,
          color: "#E0C676",
          clipPath: `ellipse(${interpolate(frame, [54, 80], [0, 2200], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [54, 80], [0, 1200], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 1310px 410px)`,
        }}
      >
        HAIR CARE
      </Interactive.Div>
      <Interactive.Div
        name="Small — SCALP CARE"
        style={{
          position: "absolute",
          left: 140,
          top: 620,
          fontFamily: "Josefin Sans",
          fontWeight: 400,
          fontSize: 40,
          lineHeight: 1,
          letterSpacing: 16,
          color: "#B8CDB0",
          opacity: interpolate(frame, [66, 78], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        SCALP CARE
      </Interactive.Div>

      <Interactive.Div
        name="Mist over the water"
        style={{
          position: "absolute",
          left: 200,
          top: 700,
          width: 1700,
          height: 300,
          opacity: 0.4,
          translate: interpolate(frame, [0, 88], ["-60px 0px", "40px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Mist />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground leaf (out of focus)"
        style={{
          position: "absolute",
          left: -140,
          top: 520,
          width: 420,
          height: 1050,
          rotate: "38deg",
          filter: "blur(18px)",
          translate: interpolate(frame, [0, 88], ["60px 0px", "-80px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Leaf tone="deep" beads={false} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
