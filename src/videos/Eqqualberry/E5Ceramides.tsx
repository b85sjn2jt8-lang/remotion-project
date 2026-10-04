import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Caustics, CeramideFlakes } from "./materials";

// SCENE 05 — 5 CERAMIDES (0:09.8–0:12.3)
// Extreme macro inside the clear blue serum. White ceramide platelets drift
// with the fluid at three depths while the camera tracks through them.
export const E5Ceramides: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#2B9AD4" }}>
      <AbsoluteFill
        name="Clear blue serum"
        style={{
          background:
            "radial-gradient(90% 100% at 40% 30%, #A9E4F8 0%, #5CC0EC 35%, #2496D2 70%, #0F6CAE 100%)",
        }}
      />
      <AbsoluteFill
        name="Light through the serum"
        style={{
          opacity: 0.07,
          mixBlendMode: "screen",
          filter: "blur(2px)",
          translate: interpolate(frame, [0, 76], ["0px 0px", "-90px 20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          left: -200,
          width: 2400,
        }}
      >
        <Caustics seed={31} frequency={0.008} />
      </AbsoluteFill>
      <AbsoluteFill name="Far flakes" style={{ opacity: 0.55, filter: "blur(3px)" }}>
        <CeramideFlakes
          t={interpolate(frame, [0, 76], [0, 60], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          count={120}
          size={5}
          seed={51}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Title — 5"
        style={{
          position: "absolute",
          left: 110,
          top: 170,
          fontFamily: "Sora",
          fontWeight: 200,
          fontSize: 520,
          lineHeight: 1,
          color: "#FFFFFF",
          textShadow: "0 0 60px rgba(220,248,255,0.6)",
          opacity: interpolate(frame, [12, 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [12, 30], [14, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        5
      </Interactive.Div>
      <Interactive.Div
        name="Title — CERAMIDES"
        style={{
          position: "absolute",
          left: 460,
          top: 430,
          fontFamily: "Sora",
          fontWeight: 600,
          fontSize: 110,
          lineHeight: 1,
          letterSpacing: 14,
          color: "#FFFFFF",
          textShadow: "0 8px 30px rgba(5,50,100,0.35)",
          clipPath: `inset(0 ${interpolate(frame, [22, 44], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        CERAMIDES
      </Interactive.Div>

      <AbsoluteFill name="Mid flakes (in focus)" style={{ opacity: 0.95 }}>
        <CeramideFlakes
          t={interpolate(frame, [0, 76], [0, 110], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          count={60}
          size={11}
          seed={52}
        />
      </AbsoluteFill>
      <AbsoluteFill name="Near flakes (out of focus)" style={{ opacity: 0.7, filter: "blur(9px)" }}>
        <CeramideFlakes
          t={interpolate(frame, [0, 76], [0, 190], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          count={14}
          size={30}
          seed={53}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
