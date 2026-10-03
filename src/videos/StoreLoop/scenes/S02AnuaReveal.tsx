import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Droplet } from "../fx/Atmosphere";
import { Product } from "../fx/Product";

// SCENE 2 (00:04.00–00:08.00, 120 f).
// Production-plan slot: Korean-inspired model presenting the Anua jar. No generated talent is
// available in this build, so the slot plays a product-only "rack focus" reveal with the same
// beats (soft → sharp jar, slow push, match cut into the Anua pink world).
// The Anua plate is cropped by the reference on its right/bottom: it is anchored by its
// bottom-right corner OFF-frame so those edges are never visible.
export const S02AnuaReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 70% 30%, #fff8f3 0%, #f8ece4 45%, #efdcd2 100%)",
        overflow: "hidden",
      }}
    >
      <Bokeh
        seed="s2"
        count={10}
        colors={["rgba(250,190,200,0.9)", "rgba(255,240,230,0.9)"]}
        minSize={120}
        maxSize={320}
        driftX={-0.6}
        opacity={0.55}
        blur={18}
      />

      {/* Abstract soft pink half-moon (echoes the real pads), far background */}
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 230,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, rgba(252,190,198,0.75), rgba(240,150,165,0.35))",
          clipPath: "inset(0 0 50% 0)",
          filter: "blur(10px)",
          rotate: interpolate(frame, [0, 120], ["-18deg", "-8deg"]),
          translate: interpolate(frame, [0, 120], ["0px 0px", "-60px 20px"]),
          opacity: 0.8,
        }}
      />

      {/* Push-in on the jar (anchored bottom-right, cropped edges off-frame) */}
      <Product
        name="Anua jar · rack focus"
        id="anua"
        anchor="bottom-right"
        x={1928}
        y={1090}
        width={interpolate(frame, [0, 120], [620, 690], {
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        })}
        blur={interpolate(frame, [0, 24, 72], [14, 14, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        })}
        sweep={interpolate(frame, [76, 112], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />

      {/* Serum droplets drifting down beside the jar — never touching it */}
      <Droplet
        x={1180}
        y={interpolate(frame, [0, 120], [-60, 380])}
        size={46}
        stretch={1.08}
        blur={interpolate(frame, [0, 60], [6, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Droplet x={1050} y={interpolate(frame, [0, 120], [160, 330])} size={22} blur={2} />
      <Droplet x={640} y={interpolate(frame, [0, 120], [700, 610])} size={120} blur={16} opacity={0.7} />

      {/* Soft window light leak from upper left */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(115deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 40%)",
          opacity: interpolate(frame, [0, 120], [0.6, 0.9]),
        }}
      />
    </AbsoluteFill>
  );
};
