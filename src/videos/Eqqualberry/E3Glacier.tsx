import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Bubbles, Caustics, Droplet, IceShard } from "./materials";

// SCENE 03 — GLACIER WATER (0:04.8–0:07.8)
// A glacial blue world: ice shards, cold mist, still water. A large drop
// falls in slow motion; its impact sends a refracting shockwave across the
// surface and the shockwave uncovers the type.
export const E3Glacier: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#2E9BD3" }}>
      <AbsoluteFill
        name="Glacial light"
        style={{
          background:
            "linear-gradient(180deg, #BDEBFA 0%, #6CC6EC 30%, #2E9BD3 58%, #156FB0 64%, #0B5A96 100%)",
        }}
      />
      <Interactive.Div
        name="Cold mist"
        style={{
          position: "absolute",
          left: -200,
          top: 520,
          width: 2320,
          height: 200,
          background:
            "linear-gradient(180deg, rgba(225,248,255,0) 0%, rgba(225,248,255,0.55) 60%, rgba(225,248,255,0) 100%)",
          filter: "blur(18px)",
          translate: interpolate(frame, [0, 90], ["0px 0px", "-80px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Far ice shard left"
        style={{
          position: "absolute",
          left: 120,
          top: 420,
          width: 260,
          height: 260,
          filter: "blur(9px)",
          opacity: 0.7,
        }}
      >
        <IceShard variant={1} />
      </Interactive.Div>
      <Interactive.Div
        name="Far ice shard right"
        style={{
          position: "absolute",
          left: 1520,
          top: 380,
          width: 320,
          height: 300,
          filter: "blur(10px)",
          opacity: 0.7,
        }}
      >
        <IceShard />
      </Interactive.Div>
      <Interactive.Div
        name="Still water surface"
        style={{
          position: "absolute",
          left: -200,
          top: 690,
          width: 2320,
          height: 500,
          background:
            "linear-gradient(180deg, rgba(200,240,252,0.9) 0%, #4FB0DE 6%, #1A7DBE 40%, #0A4F88 100%)",
          boxShadow: "0 -4px 14px rgba(235,250,255,0.8)",
        }}
      />
      <AbsoluteFill
        name="Light in the water"
        style={{
          top: 700,
          height: 380,
          opacity: 0.1,
          mixBlendMode: "screen",
          filter: "blur(1.5px)",
          translate: interpolate(frame, [0, 90], ["0px 0px", "-60px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Caustics seed={23} frequency={0.014} />
      </AbsoluteFill>
      <AbsoluteFill name="Micro bubbles" style={{ top: 700, height: 380, opacity: 0.7 }}>
        <Bubbles
          t={interpolate(frame, [0, 90], [0, 90], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          count={14}
          seed={9}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Title — 100,000 PPM"
        style={{
          position: "absolute",
          left: 0,
          top: 190,
          width: 1920,
          textAlign: "center",
          fontFamily: "Sora",
          fontWeight: 700,
          fontSize: 160,
          lineHeight: 1,
          letterSpacing: -4,
          color: "#FFFFFF",
          textShadow: "0 10px 40px rgba(5,60,110,0.35)",
          clipPath: `ellipse(${interpolate(frame, [40, 66], [0, 1500], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [40, 66], [0, 900], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 960px 510px)`,
        }}
      >
        100,000 PPM
      </Interactive.Div>
      <Interactive.Div
        name="Title — GLACIER WATER"
        style={{
          position: "absolute",
          left: 0,
          top: 380,
          width: 1920,
          textAlign: "center",
          fontFamily: "Sora",
          fontWeight: 300,
          fontSize: 66,
          lineHeight: 1,
          letterSpacing: 26,
          color: "#E8F9FF",
          clipPath: `ellipse(${interpolate(frame, [50, 76], [0, 1500], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [50, 76], [0, 700], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 960px 320px)`,
        }}
      >
        GLACIER WATER
      </Interactive.Div>

      <Interactive.Div
        name="Slow-motion drop"
        style={{
          position: "absolute",
          left: 905,
          top: -200,
          width: 110,
          height: 136,
          translate: interpolate(frame, [12, 40], ["0px 0px", "0px 830px"], {
            easing: Easing.bezier(0.45, 0, 0.9, 0.5),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [12, 39], ["1 1", "0.88 1.18"], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [39, 41], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Shockwave 1"
        style={{
          position: "absolute",
          left: -340,
          top: 560,
          width: 2600,
          height: 300,
          borderRadius: "50%",
          boxShadow:
            "0 0 0 4px rgba(240,252,255,0.85), 0 6px 12px 3px rgba(5,60,110,0.35), inset 0 -6px 12px rgba(5,60,110,0.3), inset 0 5px 8px rgba(240,252,255,0.75)",
          filter: "blur(1.2px)",
          scale: interpolate(frame, [40, 80], [0.01, 1], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [40, 43, 80], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Shockwave 2"
        style={{
          position: "absolute",
          left: -340,
          top: 560,
          width: 2600,
          height: 300,
          borderRadius: "50%",
          boxShadow:
            "0 0 0 3px rgba(240,252,255,0.75), 0 5px 10px 2px rgba(5,60,110,0.3), inset 0 4px 6px rgba(240,252,255,0.65)",
          filter: "blur(1.2px)",
          scale: interpolate(frame, [48, 90], [0.01, 0.8], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [48, 51, 90], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Crown splash"
        style={{
          position: "absolute",
          left: 930,
          top: 620,
          width: 60,
          height: 90,
          borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
          background:
            "linear-gradient(90deg, rgba(120,200,240,0.7), rgba(240,252,255,0.95) 45%, rgba(120,200,240,0.75))",
          transformOrigin: "50% 100%",
          scale: interpolate(frame, [40, 48, 60], ["0.4 0", "1 1.5", "0.6 0"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Foreground ice shard (out of focus)"
        style={{
          position: "absolute",
          left: -120,
          top: 700,
          width: 520,
          height: 480,
          filter: "blur(16px)",
          translate: interpolate(frame, [0, 90], ["0px 0px", "-50px 10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <IceShard />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground ice shard right (out of focus)"
        style={{
          position: "absolute",
          left: 1620,
          top: -120,
          width: 420,
          height: 420,
          filter: "blur(18px)",
          translate: interpolate(frame, [0, 90], ["0px 0px", "40px -10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <IceShard variant={1} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
