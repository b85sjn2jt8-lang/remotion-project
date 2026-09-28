import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// "The near future" plan + closing line.
export const FutureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        paddingTop: 300,
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
        alignItems: "center",
      }}
    >
      <Interactive.Div
        name="Title"
        style={{
          fontFamily: "Hayyakum Allah",
          fontSize: 136,
          lineHeight: 1.3,
          color: "#5CE1D6",
          textShadow: "0 0 40px rgba(92,225,214,0.55)",
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        المستقبل القريب
      </Interactive.Div>

      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          alignItems: "center",
        }}
      >
        <Interactive.Div
          name="Plan 1"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 54,
            color: "#FFFFFF",
            textAlign: "center",
            opacity: interpolate(frame, [0.3 * fps, 0.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.3 * fps, 0.8 * fps],
              ["0px 40px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          تدشين حسابات اللمسة الثانية
        </Interactive.Div>
        <Interactive.Div
          name="Plan 2"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 54,
            color: "#FFFFFF",
            textAlign: "center",
            opacity: interpolate(frame, [0.5 * fps, 0.8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.5 * fps, 1 * fps],
              ["0px 40px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          +8 مقاطع إضافية كل شهر
        </Interactive.Div>
        <Interactive.Div
          name="Plan 3"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 54,
            color: "#FFFFFF",
            textAlign: "center",
            opacity: interpolate(frame, [0.7 * fps, 1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.7 * fps, 1.2 * fps],
              ["0px 40px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          تغطية الفروع الجديدة
        </Interactive.Div>
        <Interactive.Div
          name="Plan 4"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 54,
            color: "#FFFFFF",
            textAlign: "center",
            opacity: interpolate(frame, [0.9 * fps, 1.2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.9 * fps, 1.4 * fps],
              ["0px 40px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          بدء حملات منصة Google
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Closing line"
        style={{
          marginTop: 110,
          fontFamily: "Hayyakum Allah",
          fontSize: 100,
          lineHeight: 1.3,
          color: "#FF6A45",
          whiteSpace: "nowrap",
          scale: interpolate(frame, [1.5 * fps, 2 * fps], [0.6, 1], {
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [1.5 * fps, 1.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        بإذن الله كل خير
      </Interactive.Div>
      <Interactive.Div
        name="Signature"
        style={{
          marginTop: 30,
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: 6,
          color: "#8C969F",
          direction: "ltr",
          opacity: interpolate(frame, [2 * fps, 2.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        LOAY TAHA · 2026
      </Interactive.Div>
    </AbsoluteFill>
  );
};
