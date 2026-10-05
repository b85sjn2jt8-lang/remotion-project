import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, Condensation, DewDrop, LensFrost } from "./materials";

// SHOT 01 — THE 70 HOOK (0:00–0:02.3)
// Opens on soft frost white (the loop seam). The frost clears to a pane of
// glass gathering condensation; behind it an enormous blurred shape pulls
// into focus: 70%. One drop runs down the glass and clears a narrow path —
// through it, a macro glimpse of the real bottle. Running drop at x = 1290.
export const B1SeventyHook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F7FA" }}>
      <AbsoluteFill
        name="Morning white"
        style={{
          background:
            "radial-gradient(80% 90% at 35% 30%, #FFFFFF 0%, #F1F6FA 55%, #E2ECF4 100%)",
        }}
      />
      <Interactive.Div
        name="Giant 70% behind the glass (focus pull)"
        style={{
          position: "absolute",
          left: 150,
          top: 40,
          fontFamily: "Urbanist",
          fontWeight: 200,
          fontSize: 860,
          lineHeight: 1,
          letterSpacing: -20,
          color: "#9FB9D0",
          filter: `blur(${interpolate(frame, [8, 58], [44, 3], {
            easing: Easing.bezier(0.33, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [6, 30], [0.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        70<span style={{ fontSize: 300, letterSpacing: 0 }}>%</span>
      </Interactive.Div>

      <AbsoluteFill
        name="Macro bottle — seen only through the cleared path"
        style={{
          maskImage:
            "linear-gradient(90deg, rgba(0,0,0,0) 1250px, #000 1266px, #000 1314px, rgba(0,0,0,0) 1330px)",
        }}
      >
        <AbsoluteFill
          style={{
            maskImage: `linear-gradient(180deg, #000 ${interpolate(frame, [34, 70], [-40, 1160], {
              easing: Easing.bezier(0.45, 0, 0.75, 0.6),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px, rgba(0,0,0,0) ${interpolate(frame, [34, 70], [0, 1200], {
              easing: Easing.bezier(0.45, 0, 0.75, 0.6),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <AbsoluteFill name="Bright glass behind" style={{ backgroundColor: "#EEF4F9" }} />
          <Img
            name="ANUA bottle (macro)"
            src={staticFile(BOTTLE_SRC)}
            style={{ position: "absolute", left: 712, top: -680, width: 760 }}
          />
        </AbsoluteFill>
      </AbsoluteFill>

      <Interactive.Div
        name="Condensation haze on the glass"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          backdropFilter: "blur(3px)",
          background: "rgba(246,250,253,0.32)",
          maskImage: `linear-gradient(90deg, #000 1246px, rgba(0,0,0,0) 1264px, rgba(0,0,0,0) 1316px, #000 1334px), linear-gradient(180deg, rgba(0,0,0,0) ${interpolate(frame, [34, 70], [-60, 1140], {
            easing: Easing.bezier(0.45, 0, 0.75, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px, #000 ${interpolate(frame, [34, 70], [-20, 1180], {
            easing: Easing.bezier(0.45, 0, 0.75, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [4, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill name="Condensation beads forming">
        <Condensation
          progress={interpolate(frame, [4, 40], [0, 1], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          seed={7}
          clearX={1290}
          clearW={66}
          clearY={interpolate(frame, [34, 70], [-40, 1160], {
            easing: Easing.bezier(0.45, 0, 0.75, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>
      <Interactive.Div
        name="Running drop"
        style={{
          position: "absolute",
          left: 1266,
          top: -70,
          width: 48,
          height: 60,
          translate: interpolate(frame, [34, 70], ["0px 0px", "0px 1210px"], {
            easing: Easing.bezier(0.45, 0, 0.75, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: 1,
        }}
      >
        <DewDrop />
      </Interactive.Div>

      <Interactive.Div
        name="Small — BIRCH MOISTURE"
        style={{
          position: "absolute",
          left: 156,
          top: 900,
          fontFamily: "Urbanist",
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1,
          color: "#4F6680",
          letterSpacing: interpolate(frame, [48, 80], [30, 18], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [48, 62], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        BIRCH MOISTURE
      </Interactive.Div>

      <AbsoluteFill name="Lens frost clearing (loop seam)">
        <LensFrost
          amount={interpolate(frame, [0, 24], [1, 0], {
            easing: Easing.bezier(0.3, 0.4, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
