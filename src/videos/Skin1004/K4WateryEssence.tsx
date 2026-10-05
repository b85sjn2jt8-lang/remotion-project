import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { EssenceFlow, WarmDrop } from "./materials";

// SHOT 04 — WATERY ESSENCE (0:08.2–0:11.1)
// Macro over clear glass. A watery, fast essence sweeps across left to right
// and LIGHTWEIGHT exists only inside it; a second wave runs back the other
// way carrying NON-STICKY. Warm amber light passes underneath the glass.
export const K4WateryEssence: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#EAD6B4" }}>
      <AbsoluteFill
        name="Warm ivory under the glass"
        style={{
          background:
            "linear-gradient(160deg, #F7EBD6 0%, #EBD3AC 55%, #D7B482 100%)",
        }}
      />
      <Interactive.Div
        name="Amber light passing underneath"
        style={{
          position: "absolute",
          left: -900,
          top: -100,
          width: 1100,
          height: 1300,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(230,150,60,0.6), rgba(230,150,60,0))",
          filter: "blur(30px)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "2700px 0px"], {
            easing: Easing.bezier(0.4, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill
        name="Glass reflections"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.22) 24%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.14) 64%, rgba(255,255,255,0) 66%)",
        }}
      />

      <AbsoluteFill name="Essence wave 1 (left to right)">
        <EssenceFlow
          front={interpolate(frame, [2, 34], [-300, 2500], {
            easing: Easing.bezier(0.25, 0.6, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          top={-120}
          bottom={1200}
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <Interactive.Div
            name="Title — LIGHTWEIGHT"
            style={{
              position: "absolute",
              left: 0,
              top: 300,
              width: 1920,
              textAlign: "center",
              fontFamily: "Albert Sans",
              fontWeight: 300,
              fontSize: 170,
              lineHeight: 1,
              letterSpacing: 30,
              color: "#5A3A20",
            }}
          >
            LIGHTWEIGHT
          </Interactive.Div>
        </EssenceFlow>
      </AbsoluteFill>
      <AbsoluteFill name="Essence wave 2 (right to left)">
        <EssenceFlow
          front={interpolate(frame, [36, 66], [2300, -600], {
            easing: Easing.bezier(0.25, 0.6, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          top={-120}
          bottom={1200}
          toLeft
          t={interpolate(frame, [0, 88], [10, 98], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <Interactive.Div
            name="Title — NON-STICKY"
            style={{
              position: "absolute",
              left: 0,
              top: 726,
              width: 1920,
              textAlign: "center",
              fontFamily: "Albert Sans",
              fontWeight: 500,
              fontSize: 76,
              lineHeight: 1,
              letterSpacing: 26,
              color: "#8A5A26",
            }}
          >
            NON-STICKY
          </Interactive.Div>
        </EssenceFlow>
      </AbsoluteFill>

      <Interactive.Div
        name="Bead left behind — left"
        style={{
          position: "absolute",
          left: 300,
          top: 980,
          width: 30,
          height: 24,
          opacity: interpolate(frame, [58, 62], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <WarmDrop />
      </Interactive.Div>
      <Interactive.Div
        name="Bead left behind — right"
        style={{
          position: "absolute",
          left: 1640,
          top: 90,
          width: 24,
          height: 20,
          opacity: interpolate(frame, [20, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <WarmDrop />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
