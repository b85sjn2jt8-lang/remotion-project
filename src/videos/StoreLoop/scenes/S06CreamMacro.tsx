import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// SCENE 6 — CREAM MACRO (00:23.00–00:27.00, 120 f). No product on screen.
// A pre-rendered cream surface (scripts/store-loop/textures.py) laid on a tilted plane:
// low probe-lens glide right→left into depth, then a dive until cream fills the frame.
export const S06CreamMacro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#fbf8f3", overflow: "hidden", perspective: 900 }}>
      <div
        style={{
          position: "absolute",
          left: -2000,
          top: -2600,
          width: 5900,
          height: 5000,
          transformOrigin: "50% 72%",
          filter: "brightness(1.07) sepia(0.06)",
          rotate: interpolate(frame, [0, 78, 120], ["x 62deg", "x 58deg", "x 8deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.6, 0, 0.4, 1),
          }),
          translate: interpolate(frame, [0, 78, 120], ["300px 0px 0px", "-260px -60px 120px", "-420px -120px 520px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.5, 0, 0.5, 1),
          }),
        }}
      >
        <Img
          src={staticFile("store-loop/env/cream_macro.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            rotate: interpolate(frame, [0, 120], ["0deg", "-3deg"]),
          }}
        />
      </div>
      {/* atmospheric depth: far surface fades into bright haze */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to bottom, rgba(253,250,246,1) 0%, rgba(253,250,246,0.85) 26%, rgba(253,250,246,0) 55%)",
          opacity: interpolate(frame, [70, 110], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />
      {/* raking key from the far left */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 40%, rgba(120,100,90,0.08) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
