import React from "react";
import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Droplet, Dust } from "../fx/Atmosphere";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 7 — HIKARI SUNSCREEN (00:27.00–00:32.00, 150 f).
// Warm daylight world: travertine pedestal in a shallow clear pool, swaying palm shadows
// (echoing the fronds printed on the pouch), pseudo-orbit (layers parallax while the pouch
// counter-yaws within ±6°). Copy: SPF 50 PA++++ (verbatim pack claim).
const Frond: React.FC<{ x: number; y: number; scale: number; rot: number; opacity: number; blur: number }> = ({
  x,
  y,
  scale,
  rot,
  opacity,
  blur,
}) => (
  <svg
    width={900}
    height={900}
    viewBox="-450 -450 900 900"
    style={{
      position: "absolute",
      left: x - 450,
      top: y - 450,
      scale,
      rotate: `${rot}deg`,
      opacity,
      filter: `blur(${blur}px)`,
      mixBlendMode: "multiply",
    }}
  >
    <path d="M -420 40 Q 0 -60 420 -10" stroke="#7a4a20" strokeWidth={10} fill="none" />
    {[-360, -290, -220, -150, -80, -10, 60, 130, 200, 270, 340].map((p, i) => (
      <React.Fragment key={p}>
        <ellipse cx={p} cy={-70 + i * 2} rx={24} ry={150} fill="#7a4a20" transform={`rotate(-38 ${p} ${-70 + i * 2})`} />
        <ellipse cx={p} cy={90 - i * 4} rx={24} ry={150} fill="#7a4a20" transform={`rotate(38 ${p} ${90 - i * 4})`} />
      </React.Fragment>
    ))}
  </svg>
);

export const S07HikariSun: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sway = Math.sin(frame / 10);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 12% 0%, #fff7e6 0%, #fde6c4 35%, #f7cf9c 75%, #efb886 100%)",
        overflow: "hidden",
      }}
    >
      {/* Wall layer (moves most with the arc) */}
      <AbsoluteFill style={{ translate: interpolate(frame, [0, 150], ["-50px 0px", "60px 0px"]) }}>
        <Frond x={300} y={160} scale={1.5} rot={25 + sway * 3} opacity={0.22} blur={8} />
        <Frond x={1620} y={120} scale={1.7} rot={160 + sway * 2.5} opacity={0.2} blur={10} />
        <Frond x={1250} y={-60} scale={1.2} rot={110 - sway * 3} opacity={0.16} blur={12} />
      </AbsoluteFill>

      {/* Shallow pool */}
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          top: 860,
          bottom: -50,
          background: "linear-gradient(to bottom, rgba(255,226,190,1), rgba(246,196,150,1))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          top: 860,
          bottom: -50,
          background:
            "repeating-linear-gradient(170deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.35) 6px, rgba(255,255,255,0) 26px, rgba(255,255,255,0) 60px)",
          backgroundPositionX: `${frame * 2.2}px`,
          filter: "blur(2px)",
          opacity: 0.7,
        }}
      />

      {/* Travertine pedestal (closer layer, opposite parallax) */}
      <div style={{ position: "absolute", inset: 0, translate: interpolate(frame, [0, 150], ["30px 0px", "-30px 0px"]) }}>
        <div
          style={{
            position: "absolute",
            left: 1020,
            top: 740,
            width: 560,
            height: 260,
            background:
              "linear-gradient(to right, #e7cfae 0%, #f7e6cd 30%, #efd9bb 70%, #d9bd99 100%), repeating-linear-gradient(0deg, rgba(160,120,80,0.08) 0px, rgba(160,120,80,0) 9px)",
            backgroundBlendMode: "multiply",
            borderRadius: 6,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 1020,
            top: 722,
            width: 560,
            height: 34,
            background: "linear-gradient(to bottom, #fff3e0, #f0dcc0)",
            borderRadius: 6,
          }}
        />
        {/* caustics on the pedestal base */}
        <div
          style={{
            position: "absolute",
            left: 1020,
            top: 900,
            width: 560,
            height: 100,
            background:
              "repeating-radial-gradient(circle at 30% 50%, rgba(255,255,255,0.0) 0px, rgba(255,255,255,0.5) 8px, rgba(255,255,255,0) 18px)",
            backgroundPositionX: `${Math.sin(frame / 8) * 30}px`,
            filter: "blur(3px)",
            opacity: 0.6,
          }}
        />
        <FloorShadow
          x={1300}
          y={736}
          width={interpolate(frame, [0, 45, 90, 150], [330, 300, 320, 305])}
          opacity={0.3}
          color="140,80,30"
        />
        <Product
          name="Hikari · float"
          id="hikari"
          x={1300}
          y={interpolate(frame, [0, 42, 84, 126, 150], [470, 452, 466, 450, 458], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.45, 0, 0.55, 1),
          })}
          width={390}
          rotateY={interpolate(frame, [0, 75, 130], [-6, 0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          sweep={interpolate(frame, [75, 125], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      </div>

      {/* A droplet falls into the pool, left of the pedestal; ring ripple */}
      <Droplet
        x={720}
        y={interpolate(frame, [70, 92], [-60, 905], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.5, 0, 1, 1),
        })}
        size={26}
        tint="255,235,210"
        opacity={interpolate(frame, [90, 93], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <div
        style={{
          position: "absolute",
          left: 720 - interpolate(frame, [92, 140], [10, 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          top: 905 - interpolate(frame, [92, 140], [3, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          width: interpolate(frame, [92, 140], [20, 520], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          height: interpolate(frame, [92, 140], [6, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.8)",
          opacity: interpolate(frame, [92, 140], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />

      {/* Sun haze */}
      <AbsoluteFill
        style={{ background: "radial-gradient(circle at 5% 0%, rgba(255,250,235,0.85) 0%, rgba(255,250,235,0) 45%)" }}
      />
      <Dust seed="s7" count={30} color="255,245,220" vy={-0.3} vx={0.4} opacity={0.6} />

      <Interactive.Div
        name="SPF 50 PA++++"
        style={{
          position: "absolute",
          left: 150,
          top: 430,
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: 104,
          letterSpacing: "0.04em",
          color: "#C4501A",
          textShadow: "0 6px 30px rgba(255,240,220,0.8)",
          opacity: interpolate(frame, [1 * fps, 1 * fps + 10, 4 * fps, 4 * fps + 8], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [1 * fps, 1 * fps + 10], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        SPF 50 PA++++
      </Interactive.Div>
    </AbsoluteFill>
  );
};
