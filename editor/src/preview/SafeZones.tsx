import React from "react";
import type { SafeZoneMode } from "../project/store";

type Zone = { x: number; y: number; w: number; h: number; label: string };

/**
 * Approximate UI areas of each platform on a 1080×1920 canvas (2025/26 layouts).
 * Keep captions and key text outside the shaded regions.
 */
export const SAFE_ZONES: Record<Exclude<SafeZoneMode, "off">, Zone[]> = {
  tiktok: [
    { x: 0, y: 0, w: 1080, h: 160, label: "Top bar / tabs" },
    { x: 0, y: 1440, w: 1080, h: 480, label: "Caption · sound · nav" },
    { x: 940, y: 640, w: 140, h: 800, label: "Actions" },
  ],
  reels: [
    { x: 0, y: 0, w: 1080, h: 220, label: "Header" },
    { x: 0, y: 1500, w: 1080, h: 420, label: "Caption · audio · nav" },
    { x: 950, y: 980, w: 130, h: 520, label: "Actions" },
  ],
  shorts: [
    { x: 0, y: 0, w: 1080, h: 190, label: "Header" },
    { x: 0, y: 1540, w: 1080, h: 380, label: "Title · channel · nav" },
    { x: 940, y: 960, w: 140, h: 580, label: "Actions" },
  ],
};

export const SafeZoneOverlay: React.FC<{
  mode: Exclude<SafeZoneMode, "off">;
  scale: number;
}> = ({ mode, scale }) => (
  <div
    style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}
  >
    {SAFE_ZONES[mode].map((z) => (
      <div
        key={z.label}
        style={{
          position: "absolute",
          left: z.x * scale,
          top: z.y * scale,
          width: z.w * scale,
          height: z.h * scale,
          background:
            "repeating-linear-gradient(135deg, rgba(255,60,90,.22) 0 6px, rgba(255,60,90,.1) 6px 12px)",
          border: "1px solid rgba(255,80,110,.5)",
          color: "#fff",
          fontSize: 9,
          padding: 3,
          overflow: "hidden",
        }}
      >
        {z.label}
      </div>
    ))}
  </div>
);
