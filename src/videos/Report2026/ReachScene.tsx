import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Total reach counter + the 88% non-followers ring.
export const ReachScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 300,
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
      }}
    >
      <Interactive.Div
        name="Reach label"
        style={{
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 64,
          color: "#C9D1D8",
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        إجمالي الوصول
      </Interactive.Div>
      <Interactive.Div
        name="Reach number"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 900,
          fontSize: 176,
          lineHeight: 1.1,
          color: "#FFFFFF",
          direction: "ltr",
          fontVariantNumeric: "tabular-nums",
          textShadow: "0 0 60px rgba(92,225,214,0.35)",
        }}
      >
        {Math.round(
          interpolate(frame, [0.2 * fps, 1.8 * fps], [0, 215459], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        ).toLocaleString("en-US")}
      </Interactive.Div>
      <Interactive.Div
        name="Reach unit"
        style={{
          fontFamily: "Tajawal",
          fontWeight: 500,
          fontSize: 48,
          color: "#8C969F",
        }}
      >
        مشاهدة خلال شهرين
      </Interactive.Div>

      <div
        style={{
          marginTop: 110,
          position: "relative",
          width: 420,
          height: 420,
          scale: interpolate(frame, [1.2 * fps, 1.7 * fps], [0.6, 1], {
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [1.2 * fps, 1.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg width={420} height={420} viewBox="0 0 420 420">
          <circle
            cx={210}
            cy={210}
            r={180}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={34}
          />
          <circle
            cx={210}
            cy={210}
            r={180}
            fill="none"
            stroke="#5CE1D6"
            strokeWidth={34}
            strokeLinecap="round"
            strokeDasharray={1131}
            transform="rotate(-90 210 210)"
            strokeDashoffset={interpolate(
              frame,
              [1.4 * fps, 2.8 * fps],
              [1131, 136],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )}
          />
        </svg>
        <Interactive.Div
          name="Percent"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Montserrat",
            fontWeight: 900,
            fontSize: 130,
            color: "#FFFFFF",
            direction: "ltr",
          }}
        >
          {Math.round(
            interpolate(frame, [1.4 * fps, 2.8 * fps], [0, 88], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          )}
          %
        </Interactive.Div>
      </div>
      <Interactive.Div
        name="Percent label"
        style={{
          marginTop: 40,
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 54,
          color: "#FFFFFF",
          textAlign: "center",
          opacity: interpolate(frame, [2 * fps, 2.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        من المشاهدين ليسوا متابعين لنا
      </Interactive.Div>
      <Interactive.Div
        name="Percent note"
        style={{
          marginTop: 16,
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 48,
          color: "#0F1A1A",
          backgroundColor: "#5CE1D6",
          padding: "8px 32px",
          borderRadius: 999,
          scale: interpolate(frame, [2.5 * fps, 2.9 * fps], [0, 1], {
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        وصلنا لعملاء جدد
      </Interactive.Div>
    </AbsoluteFill>
  );
};
