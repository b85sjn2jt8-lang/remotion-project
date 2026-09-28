import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
      }}
    >
      <Interactive.Div
        name="Big SOCIAL MEDIA"
        style={{
          position: "absolute",
          top: 1430,
          left: 0,
          width: 2400,
          fontFamily: "Montserrat",
          fontWeight: 900,
          fontSize: 190,
          color: "rgba(255,255,255,0.06)",
          WebkitTextStroke: "2px rgba(255,255,255,0.25)",
          whiteSpace: "nowrap",
          direction: "ltr",
          translate: interpolate(
            frame,
            [0, durationInFrames],
            ["-80px 0px", "-420px 0px"],
          ),
        }}
      >
        SOCIAL MEDIA · SOCIAL MEDIA
      </Interactive.Div>
      <Interactive.Div
        name="Year pill"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 60,
          color: "#FFFFFF",
          backgroundColor: "#FF6A45",
          padding: "10px 56px",
          borderRadius: 999,
          scale: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        2026
      </Interactive.Div>
      <Interactive.Div
        name="Title"
        style={{
          marginTop: 30,
          fontFamily: "Hayyakum Allah",
          fontSize: 170,
          lineHeight: 1.25,
          color: "#FFFFFF",
          textAlign: "center",
          textShadow: "0 10px 40px rgba(0,0,0,0.45)",
          opacity: interpolate(frame, [0.2 * fps, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [0.2 * fps, 0.9 * fps],
            ["0px 60px", "0px 0px"],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        تقرير الأعمال
      </Interactive.Div>
      <Interactive.Div
        name="Period"
        style={{
          marginTop: 10,
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 68,
          color: "#5CE1D6",
          opacity: interpolate(frame, [0.5 * fps, 0.9 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        يوليو – أغسطس
      </Interactive.Div>
      <Interactive.Div
        name="Department"
        style={{
          marginTop: 24,
          fontFamily: "Tajawal",
          fontWeight: 500,
          fontSize: 46,
          color: "#C9D1D8",
          textAlign: "center",
          opacity: interpolate(frame, [0.7 * fps, 1.1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        التواصل الاجتماعي · الإنتاج · الإشراف
      </Interactive.Div>
      <Interactive.Div
        name="Author"
        style={{
          marginTop: 60,
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: 6,
          color: "#8C969F",
          direction: "ltr",
          opacity: interpolate(frame, [0.9 * fps, 1.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        LOAY TAHA
      </Interactive.Div>
    </AbsoluteFill>
  );
};
