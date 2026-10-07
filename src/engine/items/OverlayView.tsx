import { icons } from "lucide-react";
import React from "react";
import { evalAnimationSet } from "../animation/presets";
import type { OverlayItem } from "../types";
import { isRtlText, resolveTransform, shadowCss, TransformBox } from "./common";

/** Vector overlays & small info cards. All sizes/colors/texts are item data. */
export const OverlayView: React.FC<{
  item: OverlayItem;
  frame: number;
  fps: number;
}> = ({ item, frame, fps }) => {
  const t = resolveTransform(
    item.transform,
    item.keyframes,
    frame,
    fps,
    item.radius,
  );
  const anim = evalAnimationSet(
    item.animation,
    frame,
    item.durationInFrames,
    fps,
  );
  // Draw-on progress for stroke shapes, reuses the IN animation timing.
  const draw = Math.min(
    1,
    Math.max(
      0,
      (frame - item.animation.inParams.delay) /
        Math.max(1, item.animation.inParams.duration * 1.6),
    ),
  );
  return (
    <TransformBox itemId={item.id} t={t} anim={anim}>
      <div
        style={{
          width: item.width,
          height: item.height,
          filter: item.shadow.enabled
            ? `drop-shadow(${shadowCss(item.shadow)})`
            : undefined,
        }}
      >
        <Shape
          item={item}
          draw={draw}
          radius={t.radius ?? item.radius}
          highlight={anim.highlight}
        />
      </div>
    </TransformBox>
  );
};

const Shape: React.FC<{
  item: OverlayItem;
  draw: number;
  radius: number;
  highlight: number;
}> = ({ item, draw, radius }) => {
  const { width: w, height: h, color, secondaryColor, strokeWidth: sw } = item;
  const font = `"${item.fontFamily}", "Tajawal", sans-serif`;
  const dash = (len: number) => ({
    strokeDasharray: len,
    strokeDashoffset: len * (1 - draw),
  });
  switch (item.shape) {
    case "arrow": {
      const len = w + 40;
      return (
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          style={{ overflow: "visible" }}
        >
          <path
            d={`M ${sw} ${h / 2} Q ${w * 0.45} ${h * 0.05} ${w - sw * 2} ${h / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            style={dash(len)}
          />
          <path
            d={`M ${w - sw * 5} ${h / 2 - sw * 2.4} L ${w - sw} ${h / 2} L ${w - sw * 5.2} ${h / 2 + sw * 2}`}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={draw > 0.85 ? 1 : 0}
          />
        </svg>
      );
    }
    case "circle": {
      const rx = w / 2 - sw;
      const ry = h / 2 - sw;
      const len = Math.PI * (rx + ry) * 1.05;
      return (
        <svg width={w} height={h} style={{ overflow: "visible" }}>
          <ellipse
            cx={w / 2}
            cy={h / 2}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            style={dash(len)}
            transform={`rotate(-90 ${w / 2} ${h / 2})`}
          />
        </svg>
      );
    }
    case "rectangle": {
      const len = 2 * (w + h);
      return (
        <svg width={w} height={h} style={{ overflow: "visible" }}>
          <rect
            x={sw / 2}
            y={sw / 2}
            width={w - sw}
            height={h - sw}
            rx={radius}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            style={dash(len)}
          />
        </svg>
      );
    }
    case "highlight":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: color,
            opacity: 0.45,
            borderRadius: radius,
            transformOrigin: "right",
            scale: `${draw} 1`,
            mixBlendMode: "multiply",
          }}
        />
      );
    case "underline":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: sw,
              borderRadius: sw,
              backgroundColor: color,
              transformOrigin: "right",
              scale: `${draw} 1`,
            }}
          />
        </div>
      );
    case "pointer":
      return (
        <svg width={w} height={h} viewBox="0 0 100 100">
          <path
            d="M 18 8 L 82 52 L 52 58 L 66 90 L 54 95 L 40 63 L 18 82 Z"
            fill={color}
            stroke={secondaryColor}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
    case "x":
      return (
        <svg width={w} height={h} viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={48} fill={color} />
          {item.shape === "check" ? (
            <path
              d="M 28 52 L 44 67 L 73 36"
              fill="none"
              stroke={secondaryColor}
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 70, strokeDashoffset: 70 * (1 - draw) }}
            />
          ) : (
            <path
              d="M 33 33 L 67 67 M 67 33 L 33 67"
              fill="none"
              stroke={secondaryColor}
              strokeWidth={10}
              strokeLinecap="round"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100 * (1 - draw),
              }}
            />
          )}
        </svg>
      );
    case "callout":
      return (
        <Card bg={color} radius={radius} font={font}>
          <div
            dir={isRtlText(item.texts[0] ?? "") ? "rtl" : "ltr"}
            style={{
              color: secondaryColor,
              fontSize: h * 0.42,
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            {item.texts[0]}
          </div>
        </Card>
      );
    case "priceTag":
      return (
        <Card bg={color} radius={radius} font={font}>
          <div
            dir="rtl"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              color: secondaryColor,
            }}
          >
            <span
              style={{ fontSize: h * 0.55, fontWeight: 900, lineHeight: 1 }}
            >
              {item.texts[0]}
            </span>
            <span style={{ fontSize: h * 0.26, fontWeight: 800 }}>
              {item.texts[1]}
            </span>
            {item.texts[2] ? (
              <span
                style={{
                  fontSize: h * 0.24,
                  fontWeight: 800,
                  opacity: 0.55,
                  textDecoration: "line-through",
                }}
              >
                {item.texts[2]}
              </span>
            ) : null}
          </div>
        </Card>
      );
    case "featureCard":
      return (
        <Card bg={color} radius={radius} font={font} column>
          <div
            dir="auto"
            style={{
              color: secondaryColor,
              fontSize: 30,
              fontWeight: 800,
              opacity: 0.7,
            }}
          >
            {item.texts[0]}
          </div>
          <div
            dir="auto"
            style={{
              color: secondaryColor,
              fontSize: 56,
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            {item.texts[1]}
          </div>
        </Card>
      );
    case "icon": {
      const Icon =
        icons[(item.texts[0] ?? "Star") as keyof typeof icons] ?? icons.Star;
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: radius,
            backgroundColor:
              item.secondaryColor === "transparent"
                ? undefined
                : item.secondaryColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            color={color}
            strokeWidth={sw / 4}
            size={Math.min(w, h) * 0.62}
          />
        </div>
      );
    }
    case "comparisonCard":
      return (
        <div
          dir="rtl"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            gap: 14,
            fontFamily: font,
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: radius,
                backgroundColor: i === 0 ? color : "rgba(20,20,22,0.85)",
                color: i === 0 ? secondaryColor : "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                opacity: Math.min(1, Math.max(0, draw * 2 - i * 0.6)),
              }}
            >
              <div style={{ fontSize: 42, fontWeight: 900 }}>
                {i === 0 ? "✓" : "✕"}
              </div>
              <div style={{ fontSize: 44, fontWeight: 900 }}>
                {item.texts[i]}
              </div>
            </div>
          ))}
        </div>
      );
  }
};

const Card: React.FC<{
  bg: string;
  radius: number;
  font: string;
  column?: boolean;
  children: React.ReactNode;
}> = ({ bg, radius, font, column, children }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: bg,
      borderRadius: radius,
      display: "flex",
      flexDirection: column ? "column" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      fontFamily: font,
      padding: "0 24px",
      boxSizing: "border-box",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);
