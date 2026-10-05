import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { FoamMass } from "../Heartleaf/materials";
import { Droplet, WaterStream } from "./materials";

// SHOT 04 — RICH FOAM (0:08.2–0:11.1)
// Through the droplet lens: dense white foam holding green reflections. A
// clear water stream pours through the middle and the foam parts to either
// side, leaving a clean dark-green surface: DEEP CLEAN, then the benefit.
export const G4FoamCleanse: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#071710" }}>
      <AbsoluteFill
        name="Clean wet surface (under the foam)"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 45%, #1C4430 0%, #0F2A1B 50%, #061309 100%)",
        }}
      />
      <Interactive.Div
        name="Droplets on the clean surface"
        style={{ position: "absolute", left: 1180, top: 760, width: 40, height: 48, opacity: 0.85 }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Droplet 2"
        style={{ position: "absolute", left: 700, top: 300, width: 28, height: 34, opacity: 0.8 }}
      >
        <Droplet />
      </Interactive.Div>

      <Interactive.Div
        name="Title — DEEP CLEAN"
        style={{
          position: "absolute",
          left: 0,
          top: 330,
          width: 1920,
          textAlign: "center",
          fontFamily: "Josefin Sans",
          fontWeight: 300,
          fontSize: 132,
          lineHeight: 1,
          color: "#ECF2E6",
          opacity: interpolate(frame, [36, 48], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          letterSpacing: interpolate(frame, [36, 80], [34, 22], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DEEP CLEAN
      </Interactive.Div>
      <Interactive.Div
        name="Benefit — HELPS REMOVE"
        style={{
          position: "absolute",
          left: 0,
          top: 520,
          width: 1920,
          textAlign: "center",
          fontFamily: "Josefin Sans",
          fontWeight: 400,
          fontSize: 58,
          lineHeight: 1,
          letterSpacing: 14,
          color: "#D9BE6E",
          clipPath: `inset(0 ${interpolate(frame, [52, 70], [50, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 ${interpolate(frame, [52, 70], [50, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%)`,
        }}
      >
        HELPS REMOVE
      </Interactive.Div>
      <Interactive.Div
        name="Benefit — EXCESS OIL"
        style={{
          position: "absolute",
          left: 0,
          top: 600,
          width: 1920,
          textAlign: "center",
          fontFamily: "Josefin Sans",
          fontWeight: 400,
          fontSize: 58,
          lineHeight: 1,
          letterSpacing: 14,
          color: "#D9BE6E",
          clipPath: `inset(0 ${interpolate(frame, [58, 76], [50, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 ${interpolate(frame, [58, 76], [50, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%)`,
        }}
      >
        EXCESS OIL
      </Interactive.Div>

      <Interactive.Div
        name="Foam mass — left"
        style={{
          position: "absolute",
          left: -1120,
          top: -110,
          width: 2240,
          height: 1300,
          translate: interpolate(frame, [26, 62], ["0px 0px", "-880px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(20px 10px 40px rgba(0,10,4,0.55))",
        }}
      >
        <FoamMass
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          w={2240}
          h={1300}
          edge="right"
          seed={14}
          bubbleScale={1.8}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Foam mass — right"
        style={{
          position: "absolute",
          left: 820,
          top: -110,
          width: 2240,
          height: 1300,
          translate: interpolate(frame, [26, 62], ["0px 0px", "880px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "drop-shadow(-20px 10px 40px rgba(0,10,4,0.55))",
        }}
      >
        <FoamMass
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          w={2240}
          h={1300}
          edge="left"
          seed={6}
          bubbleScale={1.8}
        />
      </Interactive.Div>
      <AbsoluteFill
        name="Green reflections on the foam"
        style={{
          background:
            "linear-gradient(0deg, rgba(40,110,64,0.55) 0%, rgba(40,110,64,0.15) 40%, rgba(40,110,64,0) 65%), radial-gradient(35% 45% at 12% 30%, rgba(110,170,110,0.35), rgba(110,170,110,0))",
          mixBlendMode: "multiply",
        }}
      />
      <AbsoluteFill
        name="Gold kiss of light"
        style={{
          background:
            "radial-gradient(30% 30% at 80% 18%, rgba(240,210,140,0.35), rgba(240,210,140,0))",
          mixBlendMode: "soft-light",
        }}
      />

      <Interactive.Div
        name="Water stream"
        style={{
          position: "absolute",
          left: 920,
          top: -60,
          width: 80,
          height: 1200,
          filter: "drop-shadow(0 0 12px rgba(200,240,215,0.35))",
          clipPath: `inset(0 0 ${interpolate(frame, [8, 26], [100, 0], {
            easing: Easing.bezier(0.5, 0, 0.9, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0)`,
          scale: interpolate(frame, [26, 46], ["1 1", "2.2 1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [30, 46], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <WaterStream
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Stream splash on the foam"
        style={{
          position: "absolute",
          left: 860,
          top: 960,
          width: 200,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(235,250,240,0.8), rgba(235,250,240,0))",
          filter: "blur(6px)",
          opacity: interpolate(frame, [22, 28, 40, 48], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
