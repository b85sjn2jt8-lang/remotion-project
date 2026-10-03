import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { DirectionalBlur, Dust } from "../fx/Atmosphere";
import { FloorShadow, Product } from "../fx/Product";

// SCENE 8 (00:32.00–00:37.00, 150 f).
// Production-plan slot: Japanese-inspired hair-beauty model with the Dr.Althea tube on her
// vanity. No generated talent in this build → product-only vanity shot with the same camera
// language: lateral truck L→R with window light and a sheer curtain, then a whip pan right.
export const S08Vanity: React.FC = () => {
  const frame = useCurrentFrame();
  const whip = interpolate(frame, [134, 149], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 1, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#efe5d9", overflow: "hidden" }}>
      <DirectionalBlur id="s8-whip" amount={whip * 90}>
        <AbsoluteFill style={{ translate: `${-whip * 900}px 0px` }}>
          {/* Wall: warm plaster with soft window light shape */}
          <AbsoluteFill
            style={{
              background: "linear-gradient(100deg, #f8f1e8 0%, #efe4d6 50%, #e5d6c4 100%)",
              translate: interpolate(frame, [0, 150], ["0px 0px", "-80px 0px"]),
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 120,
                top: -100,
                width: 900,
                height: 1100,
                background: "linear-gradient(100deg, rgba(255,252,245,0.95), rgba(255,250,240,0.2))",
                clipPath: "polygon(10% 0%, 60% 0%, 100% 100%, 40% 100%)",
                filter: "blur(30px)",
              }}
            />
            {/* curtain-fold shadows moving gently inside the light */}
            <div
              style={{
                position: "absolute",
                left: 140,
                top: -100,
                width: 900,
                height: 1100,
                background:
                  "repeating-linear-gradient(100deg, rgba(150,120,90,0) 0px, rgba(150,120,90,0.10) 40px, rgba(150,120,90,0) 90px)",
                backgroundPositionX: `${Math.sin(frame / 25) * 30}px`,
                clipPath: "polygon(10% 0%, 60% 0%, 100% 100%, 40% 100%)",
                filter: "blur(12px)",
              }}
            />
          </AbsoluteFill>

          {/* Sheer linen curtain at right edge */}
          <div
            style={{
              position: "absolute",
              left: interpolate(frame, [0, 150], [1500, 1380]),
              top: -40,
              width: 600,
              height: 1160,
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.75) 0px, rgba(246,238,228,0.55) 40px, rgba(255,255,255,0.8) 90px, rgba(238,228,214,0.5) 140px)",
              filter: "blur(4px)",
              transform: `skewX(${Math.sin(frame / 20) * 1.2}deg)`,
            }}
          />

          {/* Travertine vanity ledge (foreground layer = fastest parallax) */}
          <div style={{ position: "absolute", inset: 0, translate: interpolate(frame, [0, 150], ["120px 0px", "-160px 0px"]) }}>
            <div
              style={{
                position: "absolute",
                left: -200,
                top: 800,
                width: 1600,
                height: 400,
                background:
                  "linear-gradient(to bottom, #fbf3e8 0%, #eadac4 8%, #e3d0b6 60%, #d4bea1 100%), repeating-linear-gradient(2deg, rgba(150,110,70,0.07) 0px, rgba(150,110,70,0) 12px)",
                backgroundBlendMode: "multiply",
              }}
            />
            <FloorShadow x={520} y={808} width={300} opacity={0.3} color="110,80,50" />
            <Product
              name="Dr.Althea box · vanity"
              id="altheaBox"
              x={520}
              y={808 - 252}
              width={260}
              rotateY={interpolate(frame, [0, 150], [4, -2])}
              blur={interpolate(frame, [0, 30], [6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <FloorShadow x={780} y={812} width={240} opacity={0.35} color="110,80,50" />
            <Product
              name="Dr.Althea tube · vanity"
              id="altheaTube"
              x={780}
              y={812 - 274}
              width={180}
              blur={interpolate(frame, [0, 30], [6, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.4, 0, 0.2, 1),
              })}
              rotateY={interpolate(frame, [0, 150], [-4, 4])}
              sweep={interpolate(frame, [55, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          </div>
          <Dust seed="s8" count={34} color="255,248,235" vy={-0.2} vx={0.25} area={[100, 0, 1000, 900]} opacity={0.7} />
        </AbsoluteFill>
      </DirectionalBlur>
    </AbsoluteFill>
  );
};
