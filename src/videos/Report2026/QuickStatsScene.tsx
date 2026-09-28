import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const QuickStatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        paddingTop: 270,
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
      }}
    >
      <Interactive.Div
        name="Title"
        style={{
          fontFamily: "Hayyakum Allah",
          fontSize: 130,
          lineHeight: 1.3,
          color: "#5CE1D6",
          textShadow: "0 0 40px rgba(92,225,214,0.55)",
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        إحصائيات سريعة
      </Interactive.Div>

      <div
        style={{ marginTop: 50, display: "flex", flexWrap: "wrap", gap: 26 }}
      >
        <Interactive.Div
          name="Stat branches"
          style={{
            width: 407,
            padding: "26px 28px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            scale: interpolate(frame, [0.25 * fps, 0.6 * fps], [0.7, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [0.25 * fps, 0.45 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 110,
              color: "#FFFFFF",
              direction: "ltr",
              textAlign: "right",
            }}
          >
            +
            {Math.round(
              interpolate(frame, [0.3 * fps, 1.3 * fps], [0, 7], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            )}
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 46,
              lineHeight: 1.3,
              color: "#C9D1D8",
            }}
          >
            فروع غطّيتها في الرياض
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Stat videos"
          style={{
            width: 407,
            padding: "26px 28px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            scale: interpolate(frame, [0.4 * fps, 0.75 * fps], [0.7, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [0.4 * fps, 0.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 110,
              color: "#FFFFFF",
              direction: "ltr",
              textAlign: "right",
            }}
          >
            +
            {Math.round(
              interpolate(frame, [0.45 * fps, 1.45 * fps], [0, 60], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            )}
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 46,
              lineHeight: 1.3,
              color: "#C9D1D8",
            }}
          >
            مقطع بمختلف المجالات
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Stat compressed photos"
          style={{
            width: 407,
            padding: "26px 28px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            scale: interpolate(frame, [0.55 * fps, 0.9 * fps], [0.7, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [0.55 * fps, 0.75 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 110,
              color: "#FFFFFF",
              direction: "ltr",
              textAlign: "right",
            }}
          >
            +
            {Math.round(
              interpolate(frame, [0.6 * fps, 1.6 * fps], [0, 400], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            )}
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 46,
              lineHeight: 1.3,
              color: "#C9D1D8",
            }}
          >
            صورة جهّزتها لفريق الأونلاين
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Stat product photos"
          style={{
            width: 407,
            padding: "26px 28px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            scale: interpolate(frame, [0.7 * fps, 1.05 * fps], [0.7, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [0.7 * fps, 0.9 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 110,
              color: "#FFFFFF",
              direction: "ltr",
              textAlign: "right",
            }}
          >
            +
            {Math.round(
              interpolate(frame, [0.75 * fps, 1.75 * fps], [0, 100], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            )}
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 46,
              lineHeight: 1.3,
              color: "#C9D1D8",
            }}
          >
            صورة وتصميم لمنتجات الشركة
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Stat branch videos"
          style={{
            width: 840,
            padding: "26px 28px",
            borderRadius: 32,
            backgroundColor: "#FF6A45",
            display: "flex",
            alignItems: "center",
            gap: 28,
            scale: interpolate(frame, [0.9 * fps, 1.25 * fps], [0.7, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [0.9 * fps, 1.1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 110,
              color: "#FFFFFF",
              direction: "ltr",
            }}
          >
            +
            {Math.round(
              interpolate(frame, [0.95 * fps, 1.95 * fps], [0, 30], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            )}
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 50,
              lineHeight: 1.3,
              color: "#FFFFFF",
            }}
          >
            مقطع مخصص للفروع بأرقام فروعهم
          </div>
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
