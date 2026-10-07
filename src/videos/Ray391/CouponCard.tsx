import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// 7.0s–9.2s · "احنا مسوّين لكم كود خصم يخصم 15%"
// A coupon ticket slides in; the percentage counts up and lands on "15%".
export const CouponCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 250,
        paddingLeft: 90,
        paddingRight: 150,
      }}
    >
      <Interactive.Div
        name="Coupon"
        style={{
          direction: "rtl",
          display: "flex",
          alignItems: "center",
          fontFamily: "Tajawal",
          color: "#14110C",
          backgroundColor: "#F2B33D",
          borderRadius: 28,
          padding: "22px 40px",
          gap: 34,
          boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
          translate: interpolate(frame, [0, 10], ["0px -60px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(
            frame,
            [0, 5, durationInFrames - 7, durationInFrames - 1],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <Interactive.Div
          name="Coupon label"
          style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}
        >
          كود خصم
        </Interactive.Div>
        <Interactive.Div
          name="Coupon divider"
          style={{
            alignSelf: "stretch",
            borderRight: "5px dashed rgba(20,17,12,0.35)",
          }}
        />
        <Interactive.Div
          name="Coupon percent"
          style={{
            direction: "ltr",
            fontSize: 108,
            fontWeight: 900,
            lineHeight: 1,
            minWidth: 230,
            textAlign: "center",
            paddingTop: 10,
            scale: interpolate(frame, [48, 52, 58], [1, 1.14, 1], {
              easing: Easing.bezier(0.33, 1, 0.68, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {Math.round(
            interpolate(frame, [33, 48], [0, 15], {
              easing: Easing.bezier(0.33, 1, 0.68, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          )}
          %
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
