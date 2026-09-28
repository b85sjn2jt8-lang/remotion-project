import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Opening hook shown over the first seconds of footage.
// Edit text, colors, position and keyframes directly in the Studio (click the element).
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 300 }}>
      <Interactive.Div
        name="Hook title"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1.05,
          textAlign: "center",
          textTransform: "uppercase",
          color: "#FFFFFF",
          backgroundColor: "#FF3B5C",
          padding: "28px 44px",
          borderRadius: 32,
          maxWidth: 900,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          scale: interpolate(frame, [0, 0.45 * fps], [0.6, 1], {
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          rotate: interpolate(frame, [0, 0.45 * fps], ["-6deg", "-2deg"], {
            easing: Easing.spring({ damping: 14 }),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(
            frame,
            [0, 4, durationInFrames - 8, durationInFrames - 1],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        3 edits that doubled my views
      </Interactive.Div>
      <Interactive.Div
        name="Hook subtitle"
        style={{
          marginTop: 36,
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 48,
          color: "#FFFFFF",
          textShadow: "0 4px 18px rgba(0,0,0,0.6)",
          translate: interpolate(
            frame,
            [0.25 * fps, 0.7 * fps],
            ["0px 40px", "0px 0px"],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          opacity: interpolate(
            frame,
            [0.25 * fps, 0.7 * fps, durationInFrames - 8, durationInFrames - 1],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        (#2 is underrated)
      </Interactive.Div>
    </AbsoluteFill>
  );
};
