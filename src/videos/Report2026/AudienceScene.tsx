import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const AudienceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        paddingTop: 260,
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
          color: "#FFFFFF",
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        من هو جمهورنا؟
      </Interactive.Div>

      <div style={{ marginTop: 50, display: "flex", gap: 28 }}>
        <Interactive.Div
          name="Age card"
          style={{
            flex: 1,
            padding: "26px 30px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            opacity: interpolate(frame, [0.2 * fps, 0.5 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 500,
              fontSize: 44,
              color: "#C9D1D8",
            }}
          >
            الفئة الغالبة
          </div>
          <div
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 96,
              color: "#FFFFFF",
              direction: "ltr",
              textAlign: "right",
            }}
          >
            25–44
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Hours card"
          style={{
            flex: 1,
            padding: "26px 30px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            opacity: interpolate(frame, [0.35 * fps, 0.65 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 500,
              fontSize: 44,
              color: "#C9D1D8",
            }}
          >
            ساعات النشاط
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 84,
              color: "#FFFFFF",
            }}
          >
            12م – 9م
          </div>
        </Interactive.Div>
      </div>

      <div style={{ marginTop: 60 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 56,
            color: "#FFFFFF",
          }}
        >
          <Interactive.Div name="Male label">ذكور</Interactive.Div>
          <Interactive.Div
            name="Male value"
            style={{
              fontFamily: "Montserrat",
              color: "#5CE1D6",
              direction: "ltr",
            }}
          >
            61.4%
          </Interactive.Div>
        </div>
        <Interactive.Div
          name="Male bar"
          style={{
            marginTop: 12,
            height: 56,
            borderRadius: 16,
            backgroundColor: "#5CE1D6",
            width: interpolate(frame, [0.6 * fps, 1.5 * fps], [0, 516], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 56,
            color: "#FFFFFF",
          }}
        >
          <Interactive.Div name="Female label">إناث</Interactive.Div>
          <Interactive.Div
            name="Female value"
            style={{
              fontFamily: "Montserrat",
              color: "#34A097",
              direction: "ltr",
            }}
          >
            38.6%
          </Interactive.Div>
        </div>
        <Interactive.Div
          name="Female bar"
          style={{
            marginTop: 12,
            height: 56,
            borderRadius: 16,
            backgroundColor: "#34A097",
            width: interpolate(frame, [0.8 * fps, 1.7 * fps], [0, 324], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </div>

      <Interactive.Div
        name="Cities label"
        style={{
          marginTop: 64,
          fontFamily: "Tajawal",
          fontWeight: 500,
          fontSize: 48,
          color: "#C9D1D8",
        }}
      >
        أبرز المواقع
      </Interactive.Div>
      <div
        style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 20 }}
      >
        <Interactive.Div
          name="City Riyadh"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 52,
            color: "#0F1A1A",
            backgroundColor: "#5CE1D6",
            padding: "10px 34px",
            borderRadius: 999,
            scale: interpolate(frame, [1.6 * fps, 1.9 * fps], [0, 1], {
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          الرياض
        </Interactive.Div>
        <Interactive.Div
          name="City Jeddah"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 52,
            color: "#FFFFFF",
            border: "2px solid #5CE1D6",
            padding: "8px 32px",
            borderRadius: 999,
            scale: interpolate(frame, [1.75 * fps, 2.05 * fps], [0, 1], {
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          جدة
        </Interactive.Div>
        <Interactive.Div
          name="City Dammam"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 52,
            color: "#FFFFFF",
            border: "2px solid #5CE1D6",
            padding: "8px 32px",
            borderRadius: 999,
            scale: interpolate(frame, [1.9 * fps, 2.2 * fps], [0, 1], {
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          الدمام
        </Interactive.Div>
        <Interactive.Div
          name="City Makkah"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 800,
            fontSize: 52,
            color: "#FFFFFF",
            border: "2px solid #5CE1D6",
            padding: "8px 32px",
            borderRadius: 999,
            scale: interpolate(frame, [2.05 * fps, 2.35 * fps], [0, 1], {
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          مكة
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Interests"
        style={{
          marginTop: 56,
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 50,
          lineHeight: 1.4,
          color: "#FFFFFF",
          opacity: interpolate(frame, [2.4 * fps, 2.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        يهتمون بـ<span style={{ color: "#5CE1D6" }}>المحتوى التثقيفي</span> و
        <span style={{ color: "#5CE1D6" }}>توضيح المنتجات</span>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
