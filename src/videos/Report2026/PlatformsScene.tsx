import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Views per platform. Bar widths are proportional to TikTok (840px = 111,437).
export const PlatformsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        paddingTop: 280,
        paddingLeft: 90,
        paddingRight: 150,
        direction: "rtl",
      }}
    >
      <Interactive.Div
        name="Title"
        style={{
          fontFamily: "Hayyakum Allah",
          fontSize: 120,
          lineHeight: 1.3,
          color: "#FFFFFF",
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        المشاهدات حسب المنصة
      </Interactive.Div>

      <div
        style={{
          marginTop: 70,
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Interactive.Div
              name="TikTok name"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#FFFFFF",
              }}
            >
              TikTok
            </Interactive.Div>
            <Interactive.Div
              name="TikTok value"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#5CE1D6",
                direction: "ltr",
              }}
            >
              {Math.round(
                interpolate(frame, [15, 55], [0, 111437], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              ).toLocaleString("en-US")}
            </Interactive.Div>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <Interactive.Div
              name="TikTok bar"
              style={{
                height: 44,
                borderRadius: 22,
                backgroundColor: "#5CE1D6",
                width: interpolate(frame, [15, 55], [0, 840], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Interactive.Div
              name="Instagram name"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#FFFFFF",
              }}
            >
              Instagram
            </Interactive.Div>
            <Interactive.Div
              name="Instagram value"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#45C3B8",
                direction: "ltr",
              }}
            >
              {Math.round(
                interpolate(frame, [25, 65], [0, 72903], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              ).toLocaleString("en-US")}
            </Interactive.Div>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <Interactive.Div
              name="Instagram bar"
              style={{
                height: 44,
                borderRadius: 22,
                backgroundColor: "#45C3B8",
                width: interpolate(frame, [25, 65], [0, 550], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Interactive.Div
              name="Facebook name"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#FFFFFF",
              }}
            >
              Facebook
            </Interactive.Div>
            <Interactive.Div
              name="Facebook value"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#34A097",
                direction: "ltr",
              }}
            >
              {Math.round(
                interpolate(frame, [35, 75], [0, 21620], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              ).toLocaleString("en-US")}
            </Interactive.Div>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <Interactive.Div
              name="Facebook bar"
              style={{
                height: 44,
                borderRadius: 22,
                backgroundColor: "#34A097",
                width: interpolate(frame, [35, 75], [0, 163], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Interactive.Div
              name="X name"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#FFFFFF",
              }}
            >
              X
            </Interactive.Div>
            <Interactive.Div
              name="X value"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: 56,
                color: "#2A857E",
                direction: "ltr",
              }}
            >
              {Math.round(
                interpolate(frame, [45, 85], [0, 9499], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              ).toLocaleString("en-US")}
            </Interactive.Div>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <Interactive.Div
              name="X bar"
              style={{
                height: 44,
                borderRadius: 22,
                backgroundColor: "#2A857E",
                width: interpolate(frame, [45, 85], [0, 72], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          </div>
        </div>
      </div>

      <Interactive.Div
        name="Reels note"
        style={{
          marginTop: 90,
          alignSelf: "flex-start",
          fontFamily: "Tajawal",
          fontWeight: 800,
          fontSize: 54,
          color: "#FFFFFF",
          padding: "22px 36px",
          borderRadius: 28,
          border: "2px solid rgba(255,255,255,0.35)",
          backgroundColor: "rgba(255,255,255,0.04)",
          opacity: interpolate(frame, [2.8 * fps, 3.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [2.8 * fps, 3.4 * fps],
            ["0px 40px", "0px 0px"],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        نشر 54 ريلز · وتصوير +65 مقطع
      </Interactive.Div>
    </AbsoluteFill>
  );
};
