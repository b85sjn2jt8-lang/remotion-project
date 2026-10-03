import React from "react";
import { Img, staticFile } from "remotion";
import { PRODUCTS, type ProductId } from "../products";

// One exact product plate. Position is the plate CENTER in 1920x1080 design pixels.
// Only rigid moves are allowed on the plate: translate, uniform scale, small rotations
// (rotateY is a perspective turn kept within the per-product limits of the production plan).
export const Product: React.FC<{
  name: string;
  id: ProductId;
  x: number;
  y: number;
  width: number;
  rotateY?: number;
  rotateZ?: number;
  blur?: number;
  opacity?: number;
  /** -1 = off. 0..1 = position of a soft specular sweep across the plate (screen blend, ≤20%). */
  sweep?: number;
  /** Distance in px from the plate bottom to a glossy floor; omit for no reflection. */
  reflectionGap?: number;
  reflectionOpacity?: number;
  /** Anchor the plate by its bottom-right corner instead of its center (cropped plates). */
  anchor?: "center" | "bottom-right";
  zIndex?: number;
}> = ({
  name,
  id,
  x,
  y,
  width,
  rotateY = 0,
  rotateZ = 0,
  blur = 0,
  opacity = 1,
  sweep = -1,
  reflectionGap,
  reflectionOpacity = 0.14,
  anchor = "center",
  zIndex,
}) => {
  const p = PRODUCTS[id];
  const height = width * p.aspect;
  const src = staticFile(p.src);
  const left = anchor === "center" ? x - width / 2 : x - width;
  const top = anchor === "center" ? y - height / 2 : y - height;

  return (
    <div
      data-name={name}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        perspective: 2400,
        opacity,
        zIndex,
        filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          rotate: `y ${rotateY}deg`,
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ position: "absolute", inset: 0, rotate: `${rotateZ}deg` }}>
          <Img
            src={src}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              filter: "drop-shadow(0px 18px 28px rgba(40, 20, 30, 0.22))",
            }}
          />
          {sweep >= 0 ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                maskImage: `url(${src})`,
                maskSize: "100% 100%",
                WebkitMaskImage: `url(${src})`,
                WebkitMaskSize: "100% 100%",
                background:
                  "linear-gradient(105deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 65%)",
                backgroundSize: "300% 100%",
                backgroundPosition: `${100 - sweep * 100}% 0%`,
                mixBlendMode: "screen",
                opacity: 0.18,
              }}
            />
          ) : null}
        </div>
      </div>
      {reflectionGap !== undefined ? (
        <Img
          src={src}
          style={{
            position: "absolute",
            left: 0,
            top: height + reflectionGap * 2,
            width: "100%",
            height: "100%",
            scale: "1 -1",
            opacity: reflectionOpacity,
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 45%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 45%)",
            filter: "blur(3px)",
          }}
        />
      ) : null}
    </div>
  );
};

// Soft elliptical contact/cast shadow on a floor, centred at (x, y).
export const FloorShadow: React.FC<{
  x: number;
  y: number;
  width: number;
  opacity?: number;
  blur?: number;
  color?: string;
}> = ({ x, y, width, opacity = 0.35, blur = 18, color = "40,20,35" }) => (
  <div
    style={{
      position: "absolute",
      left: x - width / 2,
      top: y - width * 0.09,
      width,
      height: width * 0.18,
      borderRadius: "50%",
      background: `radial-gradient(closest-side, rgba(${color},${opacity}), rgba(${color},0))`,
      filter: `blur(${blur}px)`,
    }}
  />
);
