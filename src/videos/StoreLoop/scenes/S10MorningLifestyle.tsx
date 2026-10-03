import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bokeh, Dust } from "../fx/Atmosphere";

// SCENE 10 (00:42.00–00:47.00, 150 f).
// Production-plan slot: adult Filipina woman enjoying the pink drink beside the Manee pouch.
// No generated talent in this build → the brand's own lifestyle photograph (uploaded reference,
// shown unedited) presented as a framed print in a bright morning room, with a slow lateral dolly.
export const S10MorningLifestyle: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#f6eee6", overflow: "hidden" }}>
      {/* Room: window light from camera-left, garden bokeh beyond the window */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(95deg, #fffaf3 0%, #f8efe5 40%, #efe2d4 100%)",
          translate: interpolate(frame, [0, 150], ["-20px 0px", "40px 0px"]),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -80,
            top: 60,
            width: 640,
            height: 820,
            background: "linear-gradient(180deg, #f8fbf4, #eef4ea)",
            boxShadow: "inset 0 0 60px rgba(255,255,255,0.9)",
            overflow: "hidden",
          }}
        >
          <Bokeh
            seed="s10g"
            count={16}
            colors={["rgba(244,170,190,0.9)", "rgba(170,205,160,0.9)", "rgba(255,255,255,0.9)"]}
            minSize={60}
            maxSize={180}
            driftX={0.3}
            opacity={0.7}
            blur={12}
          />
        </div>
        {/* soft window light falling on the wall */}
        <div
          style={{
            position: "absolute",
            left: 560,
            top: 0,
            width: 1100,
            height: 1080,
            background: "linear-gradient(100deg, rgba(255,250,238,0.85), rgba(255,250,238,0))",
            clipPath: "polygon(0% 5%, 70% 20%, 100% 100%, 0% 85%)",
            filter: "blur(40px)",
          }}
        />
      </AbsoluteFill>

      {/* Table edge */}
      <div
        style={{
          position: "absolute",
          left: -100,
          right: -100,
          top: 930,
          bottom: -100,
          background: "linear-gradient(to bottom, #e6d2b8, #d8bf9f)",
          translate: interpolate(frame, [0, 150], ["-40px 0px", "70px 0px"]),
        }}
      />

      {/* The brand lifestyle photograph as a framed print (pixels unchanged; slow push inside frame) */}
      <div
        style={{
          position: "absolute",
          left: 930,
          top: 60,
          width: 600,
          height: 818,
          padding: 16,
          background: "#fffdf9",
          borderRadius: 10,
          boxShadow: "30px 40px 70px rgba(120,80,50,0.28), 6px 8px 14px rgba(120,80,50,0.18)",
          translate: interpolate(frame, [0, 150], ["-60px 0px", "70px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
          }),
          rotate: "-1.2deg",
        }}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 4 }}>
          <Img
            src={staticFile("store-loop/products/PM-03_manee_lifestyle_photo.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transformOrigin: "62% 62%",
              scale: interpolate(frame, [0, 150], [1.0, 1.07], { output: "perceptual-scale" }),
            }}
          />
        </div>
        {/* glass reflection across the print's glazing */}
        <div
          style={{
            position: "absolute",
            inset: 16,
            background: "linear-gradient(115deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 65%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [60, 115], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}% 0%`,
            opacity: 0.12,
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Foreground sheer curtain (fastest layer) */}
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [-260, -40]),
          top: -40,
          width: 420,
          height: 1160,
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0px, rgba(246,240,232,0.45) 34px, rgba(255,255,255,0.75) 80px, rgba(240,232,220,0.4) 120px)",
          filter: "blur(8px)",
          transform: `skewX(${Math.sin(frame / 18) * 1.5}deg)`,
        }}
      />
      <Dust seed="s10" count={30} color="255,250,240" vy={-0.25} vx={0.3} opacity={0.65} />
    </AbsoluteFill>
  );
};
