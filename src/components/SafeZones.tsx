import { AbsoluteFill, getRemotionEnvironment } from "remotion";

// Approximate areas covered by TikTok / Reels / Shorts UI on a 1080x1920 video.
// Only shown while previewing in the Studio — never appears in a render.
const zone: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "rgba(255, 0, 80, 0.18)",
  border: "2px dashed rgba(255, 0, 80, 0.7)",
};

export const SafeZones: React.FC = () => {
  if (getRemotionEnvironment().isRendering) {
    return null;
  }

  return (
    <AbsoluteFill
      name="Safe zones (preview only)"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ ...zone, top: 0, left: 0, right: 0, height: 220 }} />
      <div style={{ ...zone, bottom: 0, left: 0, right: 0, height: 440 }} />
      <div style={{ ...zone, top: 220, bottom: 440, right: 0, width: 150 }} />
    </AbsoluteFill>
  );
};
