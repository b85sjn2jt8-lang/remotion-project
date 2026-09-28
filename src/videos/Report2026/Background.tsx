import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Dark backdrop with the report's orange glows and ring lines, slowly drifting.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Background"
      style={{
        background: "linear-gradient(180deg, #25292D 0%, #1B1E21 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: -420,
          bottom: -380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,106,69,0.55) 0%, rgba(255,106,69,0) 65%)",
          translate: interpolate(
            frame,
            [0, durationInFrames],
            ["0px 0px", "120px -160px"],
            { easing: Easing.bezier(0.45, 0, 0.55, 1) },
          ),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          right: -380,
          top: -360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,140,90,0.45) 0%, rgba(255,140,90,0) 65%)",
          translate: interpolate(
            frame,
            [0, durationInFrames],
            ["0px 0px", "-100px 140px"],
            { easing: Easing.bezier(0.45, 0, 0.55, 1) },
          ),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          left: 190,
          top: 610,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(92,225,214,0.10) 0%, rgba(92,225,214,0) 70%)",
        }}
      />
      <svg
        width={420}
        height={420}
        viewBox="0 0 420 420"
        style={{
          position: "absolute",
          right: -120,
          top: 60,
          opacity: 0.35,
          rotate: interpolate(frame, [0, durationInFrames], ["0deg", "40deg"]),
        }}
      >
        <ellipse
          cx={210}
          cy={210}
          rx={200}
          ry={90}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
        />
        <ellipse
          cx={210}
          cy={210}
          rx={180}
          ry={80}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
        />
        <ellipse
          cx={210}
          cy={210}
          rx={160}
          ry={70}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
        />
        <ellipse
          cx={210}
          cy={210}
          rx={140}
          ry={60}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
        />
        <ellipse
          cx={210}
          cy={210}
          rx={120}
          ry={50}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
        />
      </svg>
    </AbsoluteFill>
  );
};
