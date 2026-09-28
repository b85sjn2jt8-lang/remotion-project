import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// End card / call to action.
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(160deg, #15102A 0%, #3A1250 55%, #FF3B5C 130%)",
      }}
    >
      <Interactive.Div
        name="CTA title"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 900,
          fontSize: 110,
          lineHeight: 1,
          textAlign: "center",
          textTransform: "uppercase",
          color: "#FFFFFF",
          maxWidth: 900,
          scale: interpolate(frame, [0, 0.5 * fps], [0.7, 1], {
            easing: Easing.spring({ damping: 14 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Follow for part 2
      </Interactive.Div>
      <Interactive.Div
        name="Handle"
        style={{
          marginTop: 48,
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 56,
          color: "#0B0B12",
          backgroundColor: "#FFD23F",
          padding: "16px 36px",
          borderRadius: 999,
          translate: interpolate(
            frame,
            [0.3 * fps, 0.8 * fps],
            ["0px 60px", "0px 0px"],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          opacity: interpolate(frame, [0.3 * fps, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        @yourhandle
      </Interactive.Div>
    </AbsoluteFill>
  );
};
