import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bokeh, Dust } from "../fx/Atmosphere";
import { Product } from "../fx/Product";

// SCENE 10 — MORNING LIFESTYLE (00:42.00–00:47.00, 150 f) — V2.
// The brand's own lifestyle photograph (uploaded Manee reference: real pouch, drink, hands at a
// sunny table) shown full-height and unedited, melting into a bright morning room; slow dolly
// with a foreground sheer curtain; the real Hikari pouch sits on the sill in the foreground.
export const S10MorningLifestyle: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#f6eee6", overflow: "hidden" }}>
      {/* Room: window light + garden bokeh on the left */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(95deg, #fffaf2 0%, #f8eee2 45%, #efdfcf 100%)",
          translate: interpolate(frame, [0, 150], ["-20px 0px", "30px 0px"]),
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: 900, height: 1080, overflow: "hidden" }}>
          <Bokeh
            seed="v2s10g"
            count={18}
            colors={["rgba(244,170,190,0.9)", "rgba(170,205,160,0.9)", "rgba(255,255,255,0.9)"]}
            minSize={80}
            maxSize={240}
            driftX={0.4}
            opacity={0.65}
            blur={14}
          />
        </div>
      </AbsoluteFill>

      {/* Brand lifestyle photograph — full height, pixels unchanged, slow push inside */}
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [940, 1000], { easing: Easing.bezier(0.45, 0, 0.55, 1) }),
          top: -90,
          width: 919,
          height: 1260,
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent 0%, black 16%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 16%, black 92%, transparent 100%)",
        }}
      >
        <Img
          src={staticFile("store-loop/products/PM-03_manee_lifestyle_photo.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transformOrigin: "62% 66%",
            scale: interpolate(frame, [0, 150], [1.0, 1.1], { output: "perceptual-scale" }),
          }}
        />
      </div>

      {/* Sun rays from the window */}
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(115deg, rgba(255,250,235,0) 0px, rgba(255,250,235,0.22) 60px, rgba(255,250,235,0) 140px)",
          maskImage: "linear-gradient(to right, black 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 70%)",
          translate: interpolate(frame, [0, 150], ["-40px 0px", "40px 0px"]),
          filter: "blur(6px)",
        }}
      />

      {/* Window sill + real Hikari pouch, left foreground */}
      <AbsoluteFill style={{ translate: interpolate(frame, [0, 150], ["-60px 0px", "90px 0px"]) }}>
        <div
          style={{
            position: "absolute",
            left: -100,
            top: 900,
            width: 900,
            height: 300,
            background: "linear-gradient(to bottom, #fffaf3 0%, #ecdcc8 14%, #dcc7ad 100%)",
          }}
        />
        <Product
          name="Hikari · window sill"
          id="hikari"
          x={420}
          y={900 - 255}
          width={460}
          rotateY={interpolate(frame, [0, 150], [-6, 4])}
          sweep={interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          reflectionGap={0}
          reflectionOpacity={0.12}
        />
      </AbsoluteFill>

      {/* Foreground sheer curtain (fastest layer) */}
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [-300, -60]),
          top: -40,
          width: 380,
          height: 1160,
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0px, rgba(246,240,232,0.45) 34px, rgba(255,255,255,0.75) 80px, rgba(240,232,220,0.4) 120px)",
          filter: "blur(10px)",
          transform: `skewX(${Math.sin(frame / 18) * 1.5}deg)`,
        }}
      />
      <Dust seed="v2s10" count={30} color="255,250,240" vy={-0.25} vx={0.3} opacity={0.65} />
    </AbsoluteFill>
  );
};
