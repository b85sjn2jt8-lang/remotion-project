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

// AI product photography: headline numbers + a grid of real product shots from the report.
export const ProductionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        paddingTop: 250,
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
      }}
    >
      <Interactive.Div
        name="Title"
        style={{
          fontFamily: "Hayyakum Allah",
          fontSize: 116,
          lineHeight: 1.3,
          color: "#FFFFFF",
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        تصوير المنتجات
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 52,
          color: "#5CE1D6",
          opacity: interpolate(frame, [0.2 * fps, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        بتقنيات الذكاء الاصطناعي
      </Interactive.Div>

      <div style={{ marginTop: 44, display: "flex", gap: 28 }}>
        <Interactive.Div
          name="Davena stat"
          style={{
            flex: 1,
            padding: "20px 28px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
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
            {Math.round(
              interpolate(frame, [0.3 * fps, 1.3 * fps], [0, 104], {
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
              color: "#C9D1D8",
            }}
          >
            صورة لـ Davena
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Flint stat"
          style={{
            flex: 1,
            padding: "20px 28px",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.04)",
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
            {Math.round(
              interpolate(frame, [0.4 * fps, 1.4 * fps], [0, 58], {
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
              color: "#C9D1D8",
            }}
          >
            صورة لـ FLINT
          </div>
        </Interactive.Div>
      </div>

      <div
        style={{
          marginTop: 44,
          display: "flex",
          flexWrap: "wrap",
          gap: 22,
          justifyContent: "center",
        }}
      >
        <Img
          name="Davena trimmer"
          src={staticFile("report/davena-trimmer.jpg")}
          style={{
            width: 260,
            height: 260,
            objectFit: "cover",
            borderRadius: 28,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            scale: interpolate(frame, [0.9 * fps, 1.3 * fps], [0, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            rotate: interpolate(
              frame,
              [0.9 * fps, 1.3 * fps],
              ["-8deg", "0deg"],
              {
                easing: Easing.spring({ damping: 13 }),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        />
        <Img
          name="Davena lifestyle"
          src={staticFile("report/davena-lifestyle.jpg")}
          style={{
            width: 260,
            height: 260,
            objectFit: "cover",
            borderRadius: 28,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            scale: interpolate(frame, [1.05 * fps, 1.45 * fps], [0, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            rotate: interpolate(
              frame,
              [1.05 * fps, 1.45 * fps],
              ["8deg", "0deg"],
              {
                easing: Easing.spring({ damping: 13 }),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        />
        <Img
          name="Flint wall charger"
          src={staticFile("report/flint-wall-charger.jpg")}
          style={{
            width: 260,
            height: 260,
            objectFit: "cover",
            borderRadius: 28,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            scale: interpolate(frame, [1.2 * fps, 1.6 * fps], [0, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            rotate: interpolate(
              frame,
              [1.2 * fps, 1.6 * fps],
              ["-8deg", "0deg"],
              {
                easing: Easing.spring({ damping: 13 }),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        />
        <Img
          name="Mada case"
          src={staticFile("report/mada-case-orange.jpg")}
          style={{
            width: 260,
            height: 260,
            objectFit: "cover",
            borderRadius: 28,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            scale: interpolate(frame, [1.35 * fps, 1.75 * fps], [0, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            rotate: interpolate(
              frame,
              [1.35 * fps, 1.75 * fps],
              ["8deg", "0deg"],
              {
                easing: Easing.spring({ damping: 13 }),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        />
        <Img
          name="Levore charger"
          src={staticFile("report/levore-gan.jpg")}
          style={{
            width: 260,
            height: 260,
            objectFit: "cover",
            borderRadius: 28,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            scale: interpolate(frame, [1.5 * fps, 1.9 * fps], [0, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            rotate: interpolate(
              frame,
              [1.5 * fps, 1.9 * fps],
              ["-8deg", "0deg"],
              {
                easing: Easing.spring({ damping: 13 }),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        />
        <Img
          name="PanzerGlass"
          src={staticFile("report/panzerglass-3in1.jpg")}
          style={{
            width: 260,
            height: 260,
            objectFit: "cover",
            borderRadius: 28,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            scale: interpolate(frame, [1.65 * fps, 2.05 * fps], [0, 1], {
              easing: Easing.spring({ damping: 13 }),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            rotate: interpolate(
              frame,
              [1.65 * fps, 2.05 * fps],
              ["8deg", "0deg"],
              {
                easing: Easing.spring({ damping: 13 }),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        />
      </div>

      <Interactive.Div
        name="Savings note"
        style={{
          marginTop: 44,
          alignSelf: "center",
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 48,
          color: "#0F1A1A",
          backgroundColor: "#5CE1D6",
          padding: "12px 34px",
          borderRadius: 999,
          scale: interpolate(frame, [2.4 * fps, 2.8 * fps], [0, 1], {
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        بدون تكاليف جلسات تصوير خارجية
      </Interactive.Div>
      <Interactive.Div
        name="Brands"
        style={{
          marginTop: 26,
          alignSelf: "center",
          fontFamily: "Tajawal",
          fontWeight: 500,
          fontSize: 44,
          color: "#8C969F",
          opacity: interpolate(frame, [2.7 * fps, 3.1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Levore · PanzerGlass · مدى الرؤية
      </Interactive.Div>
    </AbsoluteFill>
  );
};
