import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const ProgressBar: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill name="Progress bar" style={{ justifyContent: "flex-start" }}>
      <div
        style={{
          height: 10,
          backgroundColor: color,
          width:
            interpolate(frame, [0, durationInFrames - 1], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) + "%",
        }}
      />
    </AbsoluteFill>
  );
};
