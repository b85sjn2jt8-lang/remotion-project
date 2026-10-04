import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { FoamMass, PoreSurface } from "./materials";

// SCENE 01 — PORE HOOK (0:00–0:02.4)
// Opens inside the foam (the loop seam), which slides away to reveal an
// abstract, extreme-macro skin surface with a few pores holding impurities.
// Rich foam rolls in over it; as it pulls back the pores are clean and
// PORE / DEEP CLEAN is left behind.
export const H1PoreHook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E6EBDD" }}>
      <Interactive.Div
        name="Pore surface (camera glide)"
        style={{
          position: "absolute",
          left: -200,
          top: -150,
          width: 2560,
          height: 1440,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-320px -40px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PoreSurface
          clean={interpolate(frame, [40, 43], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Title — PORE"
        style={{
          position: "absolute",
          left: 128,
          top: 290,
          fontFamily: "Figtree",
          fontWeight: 800,
          fontSize: 220,
          lineHeight: 1,
          letterSpacing: -4,
          color: "#2E4A35",
          opacity: interpolate(frame, [41, 42], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        PORE
      </Interactive.Div>
      <Interactive.Div
        name="Title — DEEP CLEAN"
        style={{
          position: "absolute",
          left: 136,
          top: 520,
          fontFamily: "Figtree",
          fontWeight: 300,
          fontSize: 120,
          lineHeight: 1,
          letterSpacing: 10,
          color: "#3F6248",
          opacity: interpolate(frame, [41, 42], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DEEP CLEAN
      </Interactive.Div>

      <Interactive.Div
        name="Cleansing foam rolling in"
        style={{
          position: "absolute",
          left: 0,
          top: -110,
          width: 2400,
          height: 1300,
          translate: interpolate(frame, [18, 42, 64], ["1960px 0px", "-420px 0px", "1180px 0px"], {
            easing: [Easing.bezier(0.4, 0, 0.3, 1), Easing.bezier(0.5, 0, 0.3, 1)],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(-30px 20px 40px rgba(60,85,62,0.25))",
        }}
      >
        <FoamMass
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          w={2400}
          h={1300}
          edge="left"
          seed={3}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Foam leaving the lens (loop seam)"
        style={{
          position: "absolute",
          left: -340,
          top: -110,
          width: 2600,
          height: 1300,
          translate: interpolate(frame, [0, 22], ["0px 0px", "-2760px 0px"], {
            easing: Easing.bezier(0.2, 0.4, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <FoamMass t={0} w={2600} h={1300} edge="right" seed={9} bubbleScale={1.6} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
