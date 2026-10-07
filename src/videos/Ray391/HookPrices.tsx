import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// 0.0s–6.2s · "عروض على عطور عالمية بـ49 ريال و96 ريال… إنها كذّابة"
// Topic label from frame 0, the two fake prices pop in on the spoken numbers,
// and get crossed out on "كذّابة".
export const HookPrices: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 236,
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
        opacity: interpolate(
          frame,
          [durationInFrames - 9, durationInFrames - 1],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <Interactive.Div
        name="Topic label"
        style={{
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 50,
          color: "#FFFFFF",
          backgroundColor: "rgba(12,12,14,0.72)",
          padding: "14px 34px 8px",
          borderRadius: 999,
          scale: interpolate(frame, [0, 9], [0.8, 1], {
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [0, 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        عروض العطور العالمية
      </Interactive.Div>
      <div style={{ display: "flex", gap: 30, marginTop: 26 }}>
        <Interactive.Div
          name="Price tag 49"
          style={{
            position: "relative",
            fontFamily: "Tajawal",
            fontWeight: 900,
            fontSize: 76,
            color: "#14110C",
            backgroundColor: "#FFFFFF",
            padding: "14px 34px 4px",
            borderRadius: 24,
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
            rotate: "-3deg",
            scale: interpolate(frame, [85, 95], [0, 1], {
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [150, 156], [1, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          49 ريال
          <Interactive.Div
            name="Strike 49"
            style={{
              position: "absolute",
              right: -12,
              top: "46%",
              height: 12,
              borderRadius: 6,
              backgroundColor: "#FF4D4D",
              rotate: "-10deg",
              width: interpolate(frame, [150, 156], ["0%", "112%"], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Price tag 96"
          style={{
            position: "relative",
            fontFamily: "Tajawal",
            fontWeight: 900,
            fontSize: 76,
            color: "#14110C",
            backgroundColor: "#FFFFFF",
            padding: "14px 34px 4px",
            borderRadius: 24,
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
            rotate: "3deg",
            scale: interpolate(frame, [115, 125], [0, 1], {
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [152, 158], [1, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          96 ريال
          <Interactive.Div
            name="Strike 96"
            style={{
              position: "absolute",
              right: -12,
              top: "46%",
              height: 12,
              borderRadius: 6,
              backgroundColor: "#FF4D4D",
              rotate: "-10deg",
              width: interpolate(frame, [152, 158], ["0%", "112%"], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
