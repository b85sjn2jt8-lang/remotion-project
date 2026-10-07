import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// 14.2s–24.3s · "جان بول… بخمس مية ريال تقريبًا… يخصم قرابة 75 ريال وشحن مجاني… تاخذه بـ420"
// The re-hook + payoff: the price builds up with the spoken details, then counts down 500 → 420.
export const PriceCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 232,
        paddingLeft: 90,
        paddingRight: 150,
      }}
    >
      <Interactive.Div
        name="Price card"
        style={{
          direction: "rtl",
          width: 820,
          fontFamily: "Tajawal",
          color: "#FFFFFF",
          backgroundColor: "rgba(12,12,14,0.8)",
          borderRadius: 34,
          padding: "22px 34px 18px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          translate: interpolate(frame, [0, 10], ["0px -50px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(
            frame,
            [0, 6, durationInFrames - 9, durationInFrames - 1],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <Interactive.Div
          name="Brand"
          style={{
            direction: "ltr",
            textAlign: "center",
            fontFamily: "Montserrat",
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 6,
            color: "#F2B33D",
          }}
        >
          JEAN PAUL GAULTIER
        </Interactive.Div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Interactive.Div
            name="Price"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              opacity: interpolate(frame, [31, 36], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(
                frame,
                [31, 40, 258, 263, 270],
                [0.7, 1, 1, 1.12, 1],
                {
                  easing: Easing.bezier(0.33, 1, 0.68, 1),
                  output: "perceptual-scale",
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
            }}
          >
            <Interactive.Div
              name="Price number"
              style={{
                fontWeight: 900,
                fontSize: 128,
                lineHeight: 1,
                paddingTop: 12,
                color: interpolateColors(
                  frame,
                  [255, 259],
                  ["#FFFFFF", "#F2B33D"],
                ),
              }}
            >
              {Math.round(
                interpolate(frame, [243, 258], [500, 420], {
                  easing: Easing.bezier(0.33, 1, 0.68, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              )}
            </Interactive.Div>
            <Interactive.Div
              name="Currency"
              style={{ fontWeight: 800, fontSize: 52 }}
            >
              ريال
            </Interactive.Div>
            <Interactive.Div
              name="Old price"
              style={{
                fontWeight: 800,
                fontSize: 48,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "line-through",
                textDecorationColor: "#FF4D4D",
                textDecorationThickness: 6,
                opacity: interpolate(frame, [258, 264], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              500
            </Interactive.Div>
          </Interactive.Div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <Interactive.Div
              name="Discount chip"
              style={{
                fontWeight: 800,
                fontSize: 44,
                color: "#14110C",
                backgroundColor: "#F2B33D",
                borderRadius: 999,
                padding: "10px 26px 4px",
                translate: interpolate(
                  frame,
                  [151, 160],
                  ["-30px 0px", "0px 0px"],
                  {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                ),
                opacity: interpolate(frame, [151, 156], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              خصم 75 ريال
            </Interactive.Div>
            <Interactive.Div
              name="Shipping chip"
              style={{
                fontWeight: 800,
                fontSize: 44,
                color: "#FFFFFF",
                border: "3px solid rgba(255,255,255,0.6)",
                borderRadius: 999,
                padding: "8px 26px 2px",
                translate: interpolate(
                  frame,
                  [178, 187],
                  ["-30px 0px", "0px 0px"],
                  {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                ),
                opacity: interpolate(frame, [178, 183], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              شحن مجاني
            </Interactive.Div>
          </div>
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
