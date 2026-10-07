import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// 9.9s–12.1s · "ما بقول لك إنه عندنا أرخص سعر، لا، عندنا الأصلي"
// Row 1 "أرخص سعر" gets an ✕ on "لا"; row 2 "الأصلي" lands with a ✓.
export const CompareCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 240,
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
        gap: 16,
        opacity: interpolate(
          frame,
          [durationInFrames - 7, durationInFrames - 1],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <Interactive.Div
        name="Row cheapest"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          width: 600,
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 58,
          color: "#FFFFFF",
          backgroundColor: "rgba(12,12,14,0.78)",
          borderRadius: 26,
          padding: "16px 26px",
          translate: interpolate(frame, [5, 14], ["40px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [5, 10, 23, 29], [0, 1, 1, 0.62], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Cross icon"
          style={{
            width: 72,
            height: 72,
            borderRadius: 999,
            backgroundColor: "#FF4D4D",
            color: "#FFFFFF",
            fontFamily: "Inter",
            fontWeight: 800,
            fontSize: 46,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: interpolate(frame, [23, 31], [0, 1], {
              easing: Easing.spring({ damping: 10 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ✕
        </Interactive.Div>
        <Interactive.Div name="Cheapest text" style={{ paddingTop: 8 }}>
          أرخص سعر
        </Interactive.Div>
      </Interactive.Div>
      <Interactive.Div
        name="Row original"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          width: 600,
          fontFamily: "Tajawal",
          fontWeight: 900,
          fontSize: 58,
          color: "#14110C",
          backgroundColor: "#FFFFFF",
          borderRadius: 26,
          padding: "16px 26px",
          boxShadow: "0 18px 50px rgba(0,0,0,0.3)",
          translate: interpolate(frame, [44, 53], ["40px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [44, 49], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Check icon"
          style={{
            width: 72,
            height: 72,
            borderRadius: 999,
            backgroundColor: "#F2B33D",
            color: "#14110C",
            fontFamily: "Inter",
            fontWeight: 800,
            fontSize: 46,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: interpolate(frame, [46, 54], [0, 1], {
              easing: Easing.spring({ damping: 10 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ✓
        </Interactive.Div>
        <Interactive.Div name="Original text" style={{ paddingTop: 8 }}>
          الأصلي
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
