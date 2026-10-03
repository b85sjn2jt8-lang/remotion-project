import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Droplet, Dust } from "../fx/Atmosphere";
import { Glass } from "../fx/Layers";
import { Product } from "../fx/Product";

// SCENE 3 — ANUA PINK WORLD (00:08.00–00:13.00, 150 f).
// Match-cut from Scene 2 (same jar position/scale), translucent pink panels, floating serum
// droplets and pink half-moon forms, slow push. The droplet lens wipe lives in the main timeline.
export const S03AnuaPinkWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 18% 12%, #ffe3e2 0%, #fbc6c8 38%, #f3a7b1 75%, #ec95a3 100%)",
        overflow: "hidden",
      }}
    >
      {/* Frosted translucent panels at three depths (parallax with the push) */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: -120,
          width: 760,
          height: 1300,
          borderRadius: 60,
          background: "linear-gradient(160deg, rgba(255,255,255,0.45), rgba(255,210,215,0.12))",
          boxShadow: "inset 0 0 80px rgba(255,255,255,0.35)",
          rotate: "12deg",
          translate: interpolate(frame, [0, 150], ["0px 0px", "-40px 10px"]),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 980,
          top: -260,
          width: 520,
          height: 900,
          borderRadius: 300,
          background: "linear-gradient(200deg, rgba(255,255,255,0.4), rgba(255,180,190,0.1))",
          filter: "blur(6px)",
          translate: interpolate(frame, [0, 150], ["0px 0px", "-90px 20px"]),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -260,
          top: 640,
          width: 1100,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,240,240,0.55), rgba(255,240,240,0))",
          translate: interpolate(frame, [0, 150], ["0px 0px", "30px -10px"]),
        }}
      />

      {/* Moving caustic light patches */}
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [700, 820]),
          top: 760,
          width: 700,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0))",
          filter: "blur(18px)",
          opacity: interpolate(frame, [0, 40, 80, 120, 150], [0.6, 0.9, 0.55, 0.9, 0.7]),
        }}
      />

      {/* Pink translucent half-moon forms (echo the real pads) */}
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [1060, 860]),
          top: 170,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 30%, rgba(255,215,220,0.9), rgba(240,140,160,0.55))",
          clipPath: "inset(0 0 50% 0)",
          rotate: interpolate(frame, [0, 150], ["-25deg", "-5deg"]),
          filter: "blur(2px)",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: interpolate(frame, [0, 150], [-120, -260]),
          top: 760,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 30%, rgba(255,220,225,0.9), rgba(235,130,150,0.6))",
          clipPath: "inset(0 0 50% 0)",
          rotate: "18deg",
          filter: "blur(16px)",
          opacity: 0.85,
        }}
      />

      {/* Jar — continues the Scene 2 match cut, slow push, gentle float */}
      <Product
        name="Anua jar · hero"
        id="anua"
        anchor="bottom-right"
        x={1932}
        y={interpolate(frame, [0, 45, 90, 150], [1090, 1086, 1094, 1090])}
        width={interpolate(frame, [0, 150], [700, 820], { easing: Easing.bezier(0.45, 0, 0.55, 1) })}
        rotateY={interpolate(frame, [0, 60, 150], [4, 1, -2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        sweep={interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />

      {/* Floating serum droplets at several depths */}
      <Droplet x={interpolate(frame, [0, 150], [1010, 975])} y={interpolate(frame, [0, 75, 150], [250, 238, 252])} size={64} blur={0.5} />
      <Droplet x={interpolate(frame, [0, 150], [860, 820])} y={interpolate(frame, [0, 150], [520, 490])} size={30} blur={1} />
      <Droplet x={interpolate(frame, [0, 150], [1600, 1660])} y={interpolate(frame, [0, 150], [190, 170])} size={40} blur={3} />
      <Droplet x={interpolate(frame, [0, 150], [210, 120])} y={interpolate(frame, [0, 150], [180, 210])} size={190} blur={22} opacity={0.75} />
      <Droplet x={interpolate(frame, [0, 150], [860, 800])} y={interpolate(frame, [0, 150], [930, 960])} size={150} blur={18} opacity={0.7} />
      {/* One droplet falls past the jar's left side (never touches the pack) */}
      <Droplet
        x={1110}
        y={interpolate(frame, [30, 75], [-80, 1180], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.5, 0, 1, 1),
        })}
        size={34}
        stretch={interpolate(frame, [30, 75], [1, 1.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Dust seed="s3" count={26} color="255,240,242" vy={-0.4} opacity={0.6} />

      {/* V2 foreground depth: glass slab + big defocused droplet passing fast */}
      <Glass
        x={interpolate(frame, [0, 150], [1250, 900])}
        y={interpolate(frame, [0, 150], [1010, 1040])}
        w={900}
        h={300}
        rot={-8}
        tint="250,175,185"
        blur={20}
        opacity={0.7}
      />
      <Droplet
        x={interpolate(frame, [0, 90], [1500, -300], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        y={interpolate(frame, [0, 90], [140, 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        size={380}
        blur={14}
        opacity={0.75}
      />

      {/* Copy (client sign-off required — see production plan 2.3) */}
      <Interactive.Div
        name="BRIGHTEN"
        style={{
          position: "absolute",
          left: 150,
          top: 300,
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 104,
          letterSpacing: "0.08em",
          color: "#B30110",
          opacity: interpolate(frame, [1.2 * fps, 1.2 * fps + 10, 4.0 * fps, 4.0 * fps + 8], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [1.2 * fps, 1.2 * fps + 10], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        BRIGHTEN
      </Interactive.Div>
      <Interactive.Div
        name="GLOW"
        style={{
          position: "absolute",
          left: 150,
          top: 440,
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 104,
          letterSpacing: "0.08em",
          color: "#B30110",
          opacity: interpolate(frame, [1.5 * fps, 1.5 * fps + 10, 4.0 * fps, 4.0 * fps + 8], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [1.5 * fps, 1.5 * fps + 10], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        GLOW
      </Interactive.Div>
      <Interactive.Div
        name="CARE"
        style={{
          position: "absolute",
          left: 150,
          top: 580,
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 104,
          letterSpacing: "0.08em",
          color: "#B30110",
          opacity: interpolate(frame, [1.8 * fps, 1.8 * fps + 10, 4.0 * fps, 4.0 * fps + 8], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [1.8 * fps, 1.8 * fps + 10], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        CARE
      </Interactive.Div>
    </AbsoluteFill>
  );
};
