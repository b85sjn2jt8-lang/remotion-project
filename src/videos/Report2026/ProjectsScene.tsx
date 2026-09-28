import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Completed projects as a checklist sliding in one by one.
export const ProjectsScene: React.FC = () => {
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
        إنجازات الشهرين
      </Interactive.Div>

      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <Interactive.Div
          name="Project TOFU"
          style={{
            padding: "26px 32px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            opacity: interpolate(frame, [0.3 * fps, 0.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.3 * fps, 0.8 * fps],
              ["120px 0px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 60,
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#5CE1D6" }}>✓ </span>تدشين حساب TOFU
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 500,
              fontSize: 44,
              color: "#C9D1D8",
            }}
          >
            خطة تصاميم ومحتوى أسبوعية
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Project Arkan"
          style={{
            padding: "26px 32px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            opacity: interpolate(frame, [0.55 * fps, 0.85 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.55 * fps, 1.05 * fps],
              ["120px 0px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 60,
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#5CE1D6" }}>✓ </span>مقطعين لمكائن أركان
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 500,
              fontSize: 44,
              color: "#C9D1D8",
            }}
          >
            تصوير · مونتاج · إخراج — مكتبة ريحانة مكة
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Project training"
          style={{
            padding: "26px 32px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            opacity: interpolate(frame, [0.8 * fps, 1.1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0.8 * fps, 1.3 * fps],
              ["120px 0px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 60,
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#5CE1D6" }}>✓ </span>دورة تدريبية للمناديب
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 500,
              fontSize: 44,
              color: "#C9D1D8",
            }}
          >
            إخراج ومونتاج حلقة ~8 دقائق
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Project Google Maps"
          style={{
            padding: "26px 32px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
            opacity: interpolate(frame, [1.05 * fps, 1.35 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [1.05 * fps, 1.55 * fps],
              ["120px 0px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 800,
              fontSize: 60,
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: "#5CE1D6" }}>✓ </span>توثيق الفروع على Google
            Maps
          </div>
          <div
            style={{
              fontFamily: "Tajawal",
              fontWeight: 500,
              fontSize: 44,
              color: "#C9D1D8",
            }}
          >
            السليمانية · الشرق · توفو
          </div>
        </Interactive.Div>
      </div>

      <div
        style={{
          marginTop: 56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        <Img
          name="TOFU logo"
          src={staticFile("report/logo-tofu.png")}
          style={{
            height: 130,
            padding: 14,
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            opacity: interpolate(frame, [1.6 * fps, 2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Img
          name="Rayhanat logo"
          src={staticFile("report/logo-rayhanat-makkah.png")}
          style={{
            height: 130,
            padding: 14,
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            opacity: interpolate(frame, [1.75 * fps, 2.15 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Img
          name="S logo"
          src={staticFile("report/logo-s.png")}
          style={{
            height: 130,
            padding: 14,
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            opacity: interpolate(frame, [1.9 * fps, 2.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
