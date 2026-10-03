import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { DirectionalBlur, Dust } from "../fx/Atmosphere";
import { Product } from "../fx/Product";

// SCENE 9 — PINK COLLAGEN (00:37.00–00:42.00, 150 f). A Bonne slot, interim Manee Gluta
// Collagen Pink. The Manee plate is the unoccluded UPPER pouch only (hands cover the rest in the
// reference), so it rises out of a glossy pink liquid whose surface always hides the plate's
// flat bottom cut. Opens by resolving Scene 8's whip-pan blur.
const Wave: React.FC<{ base: number; amp: number; phase: number; colorTop: string; colorBottom: string; id: string; highlight?: boolean }> = ({
  base,
  amp,
  phase,
  colorTop,
  colorBottom,
  id,
  highlight = true,
}) => {
  const p = phase;
  const d = `M -100 ${base + Math.sin(p) * amp} C 300 ${base - amp * 1.4 + Math.sin(p + 1) * amp}, 700 ${base + amp * 1.2 + Math.sin(p + 2) * amp}, 1000 ${base + Math.sin(p + 2.6) * amp * 0.6} S 1700 ${base - amp + Math.sin(p + 4) * amp}, 2020 ${base + Math.sin(p + 5) * amp} L 2020 1300 L -100 1300 Z`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colorTop} />
          <stop offset="1" stopColor={colorBottom} />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
      {highlight ? (
        <path
          d={d.split(" L ")[0]}
          transform="translate(0 14)"
          stroke="rgba(255,236,246,0.85)"
          strokeWidth={10}
          fill="none"
          style={{ filter: "blur(5px)" }}
        />
      ) : null}
    </svg>
  );
};

export const S09PinkCollagen: React.FC = () => {
  const frame = useCurrentFrame();
  const resolve = interpolate(frame, [0, 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#e3277d", overflow: "hidden" }}>
      <DirectionalBlur id="s9-whip" amount={resolve * 90}>
        <AbsoluteFill
          style={{
            translate: `${resolve * 700}px 0px`,
            background: "radial-gradient(ellipse at 50% 35%, #ff8cc0 0%, #f2479a 40%, #d0136d 80%, #a80a57 100%)",
          }}
        >
          {/* glossy strip-light reflections */}
          <div
            style={{
              position: "absolute",
              left: 180,
              top: -100,
              width: 90,
              height: 1300,
              background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,225,240,0.45), rgba(255,255,255,0))",
              rotate: "14deg",
              filter: "blur(8px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 1640,
              top: -100,
              width: 60,
              height: 1300,
              background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,225,240,0.35), rgba(255,255,255,0))",
              rotate: "-12deg",
              filter: "blur(8px)",
            }}
          />

          {/* Back liquid crest, building behind the pouch */}
          <Wave
            id="s9-back"
            base={interpolate(frame, [0, 45, 120, 150], [1000, 860, 620, 570], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.45, 0, 0.55, 1),
            })}
            amp={interpolate(frame, [0, 150], [30, 90])}
            phase={frame / 14}
            colorTop="#ff6fae"
            colorBottom="#c3105f"
          />

          {/* Manee — rapid rise, strong deceleration, small overshoot, elegant float */}
          <Product
            name="Manee · rise"
            id="maneeUpper"
            x={960}
            y={interpolate(frame, [4, 21, 34, 45, 90, 150], [1350, 544, 537, 542, 540, 541], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.2, 0.9, 0.3, 1),
            })}
            width={400}
            rotateZ={interpolate(frame, [21, 30, 40, 52], [0, -2.5, 1.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            rotateY={interpolate(frame, [45, 150], [0, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            blur={interpolate(frame, [4, 15, 24], [8, 6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            sweep={interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />

          {/* Front liquid surface — always covers the pouch plate's bottom cut (plate bottom ≥ y 645) */}
          <Wave
            id="s9-front"
            base={638}
            amp={1.5}
            phase={frame / 10 + 1}
            colorTop="#ff86bd"
            colorBottom="#b80d5c"
          />
          <Dust seed="s9" count={28} color="255,220,240" vy={-0.6} opacity={0.6} />
        </AbsoluteFill>
      </DirectionalBlur>
    </AbsoluteFill>
  );
};
