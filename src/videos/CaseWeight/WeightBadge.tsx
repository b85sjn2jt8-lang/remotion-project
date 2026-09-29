import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// "17.5 g" premium weight highlight, shown from the very first frame.
// Sits on the empty wall above the case, clear of the product and the hand.
// Edit copy, size, position and keyframes directly in the Studio (click the element).
export const WeightBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: 250,
        pointerEvents: "none",
      }}
    >
      <Interactive.Div
        name="Weight group"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          filter:
            "drop-shadow(0px 10px 28px rgba(0, 0, 0, 0.45)) drop-shadow(0px 0px 22px rgba(255, 255, 255, 0.35))",
          opacity: interpolate(frame, [0, 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [0, 0.5 * fps],
            ["0px 60px", "0px 0px"],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          scale: interpolate(frame, [0, 0.5 * fps], [0.86, 1], {
            easing: Easing.spring({ damping: 16 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Weight value"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 900,
            fontSize: 250,
            lineHeight: 1,
            letterSpacing: -8,
            color: "transparent",
            backgroundImage:
              "linear-gradient(105deg, #FFFFFF 0%, #FFFFFF 40%, #FFF6DA 47%, #FFFFFF 50%, #FFF6DA 53%, #FFFFFF 60%, #FFFFFF 100%)",
            backgroundSize: "300% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundPosition: interpolate(
              frame,
              [0.45 * fps, 1.35 * fps],
              ["100% 0%", "0% 0%"],
              {
                easing: Easing.bezier(0.45, 0, 0.55, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          17.5
        </Interactive.Div>
        <Interactive.Div
          name="Weight unit"
          style={{
            marginLeft: 22,
            fontFamily: "Montserrat",
            fontWeight: 800,
            fontSize: 150,
            lineHeight: 1,
            color: "transparent",
            backgroundImage:
              "linear-gradient(105deg, #EDEDED 0%, #EDEDED 40%, #FFF6DA 47%, #FFFFFF 50%, #FFF6DA 53%, #EDEDED 60%, #EDEDED 100%)",
            backgroundSize: "300% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundPosition: interpolate(
              frame,
              [0.6 * fps, 1.5 * fps],
              ["100% 0%", "0% 0%"],
              {
                easing: Easing.bezier(0.45, 0, 0.55, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          g
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
