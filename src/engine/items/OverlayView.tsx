import { icons } from "lucide-react";
import React from "react";
import { Easing, Img, interpolate, random } from "remotion";
import { assetUrl } from "../assets";
import { IngredientArt, type IngredientId } from "./ingredients";
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
          frame={frame}
          fps={fps}
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
  frame: number;
  fps: number;
}> = ({ item, draw, radius, frame, fps }) => {
  const { width: w, height: h, color, secondaryColor, strokeWidth: sw } = item;
  const font = `"${item.fontFamily}", "Tajawal", sans-serif`;
  const dash = (len: number) => ({
    strokeDasharray: len,
    strokeDashoffset: len * (1 - draw),
  });
  switch (item.shape) {
    case "snow":
      return <Snow item={item} frame={frame} fps={fps} />;
    case "productCard":
      return <ProductCard item={item} frame={frame} radius={radius} />;
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

/**
 * Realistic snowfall: three depth layers (far = small, sharp, slow; near = big, soft, fast),
 * wind drift + per-flake sway, and a frosty vignette. Deterministic per frame (Remotion random).
 * color = flakes, secondaryColor = frost tint, strokeWidth = density (1–10).
 */
const Snow: React.FC<{ item: OverlayItem; frame: number; fps: number }> = ({
  item,
  frame,
  fps,
}) => {
  const { width: W, height: H } = item;
  const count = Math.round(40 + item.strokeWidth * 14);
  const t = frame / fps;
  const flakes: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const r = (k: string) => random(`snow-${item.id}-${i}-${k}`);
    const depth = r("d"); // 0 far … 1 near
    const size = 3 + depth * depth * 30;
    const speed = 50 + depth * 260; // px / s
    const wind = 18 + depth * 40;
    const y0 = r("y") * (H + 80);
    const y = ((y0 + t * speed) % (H + 80)) - 40;
    const sway =
      Math.sin(t * (0.6 + r("f") * 1.4) + r("p") * Math.PI * 2) *
      (6 + depth * 26);
    const x = ((r("x") * (W + 120) + t * wind + sway) % (W + 120)) - 60;
    const blur = depth > 0.75 ? (depth - 0.75) * 14 : depth < 0.25 ? 0.4 : 0;
    flakes.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${item.color} 0%, ${item.color} 35%, rgba(255,255,255,0) 72%)`,
          opacity: 0.35 + depth * 0.55,
          filter: blur ? `blur(${blur.toFixed(1)}px)` : undefined,
        }}
      />,
    );
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, ${item.secondaryColor} 130%)`,
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(140,185,255,0.08)",
        }}
      />
      {flakes}
    </div>
  );
};

/**
 * Product card: real product image (from the footage) + name + ingredients, with realistic
 * ingredient illustrations filling the card background. Notes pop in at `timings`.
 * texts = [brand, name, note1, note2, …], ingredients = ids per note, images[0] = product image.
 */
const ProductCard: React.FC<{
  item: OverlayItem;
  frame: number;
  radius: number;
}> = ({ item, frame, radius }) => {
  const { width: W, height: H } = item;
  const [brand, name, ...notes] = item.texts;
  const ids = (item.ingredients ?? []) as IngredientId[];
  const times = item.timings ?? [];
  const clamp = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  };
  const imgH = H * 0.86;
  const bgSlots = [
    { x: 0.52, y: 0.5, s: 0.66, r: -10, o: 1, b: 0 },
    { x: 0.73, y: 0.56, s: 0.62, r: 14, o: 1, b: 0 },
    { x: 0.93, y: 0.46, s: 0.66, r: -6, o: 1, b: 0 },
    { x: 0.66, y: -0.1, s: 0.5, r: 24, o: 0.55, b: 2 },
    { x: 0.9, y: -0.14, s: 0.46, r: -28, o: 0.5, b: 2.5 },
  ];
  return (
    <div
      style={{
        position: "relative",
        width: W,
        height: H,
        borderRadius: radius,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${item.color} 0%, #2a1c11 100%)`,
        border: "1.5px solid rgba(255,225,180,0.22)",
        fontFamily: `"Tajawal", sans-serif`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "38%",
          right: 0,
          top: "35%",
          bottom: "-20%",
          background:
            "radial-gradient(ellipse at 60% 70%, rgba(255,190,110,0.35) 0%, rgba(255,190,110,0) 65%)",
        }}
      />
      {/* ingredient still-life in the background, drifting slowly */}
      {bgSlots.map((b, i) => {
        const id = ids[i % Math.max(1, ids.length)];
        if (!id) return null;
        const size = H * b.s * 1.05;
        const drift = Math.sin(frame / 40 + i) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: W * b.x - size / 2,
              top: H * b.y + drift,
              opacity: b.o * interpolate(frame, [0, 12], [0, 1], clamp),
              rotate: `${b.r}deg`,
              filter: b.b ? `blur(${b.b}px)` : undefined,
            }}
          >
            <IngredientArt id={id} uid={`${item.id}-bg${i}`} size={size} />
          </div>
        );
      })}
      {/* legibility gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20,13,8,0.62) 0%, rgba(20,13,8,0.3) 38%, rgba(20,13,8,0) 62%)",
        }}
      />
      {/* product */}
      {item.images?.[0] ? (
        <Img
          src={assetUrl(item.images[0])}
          style={{
            position: "absolute",
            left: W * 0.045,
            top: (H - imgH) / 2,
            height: imgH,
            borderRadius: 10,
            boxShadow:
              "0 24px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
            rotate: `${interpolate(frame, [0, 14], [-8, -3], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) })}deg`,
            scale: String(
              interpolate(frame, [0, 14], [0.82, 1], {
                ...clamp,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            ),
            translate: `0px ${Math.sin(frame / 30) * 3}px`,
          }}
        />
      ) : null}
      {/* text */}
      <div
        style={{
          position: "absolute",
          left: W * 0.4,
          right: W * 0.05,
          top: H * 0.1,
          bottom: H * 0.08,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "Montserrat",
            fontWeight: 800,
            fontSize: H * 0.065,
            letterSpacing: "0.18em",
            color: item.secondaryColor,
            opacity: 0.85,
          }}
        >
          {brand}
        </div>
        <div
          style={{
            fontFamily: "Montserrat",
            fontWeight: 800,
            fontSize: H * 0.105,
            lineHeight: 1.08,
            color: "#FFFFFF",
            marginTop: H * 0.02,
          }}
        >
          {name}
        </div>
        <div
          style={{
            height: 2,
            width: "38%",
            background: item.secondaryColor,
            opacity: 0.6,
            margin: `${H * 0.04}px 0`,
            transformOrigin: "left",
            scale: `${interpolate(frame, [6, 20], [0, 1], clamp)} 1`,
          }}
        />
        <div
          dir="rtl"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: H * 0.025,
            justifyContent: "flex-start",
          }}
        >
          {notes.map((n, i) => {
            const at = times[i] ?? 10 + i * 4;
            const p = interpolate(frame, [at, at + 8], [0, 1], {
              ...clamp,
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            });
            return (
              <div
                key={n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: `${H * 0.012}px ${H * 0.04}px ${H * 0.012}px ${H * 0.018}px`,
                  borderRadius: 999,
                  background: "rgba(255,240,220,0.12)",
                  border: "1px solid rgba(255,230,190,0.28)",
                  backdropFilter: "blur(6px)",
                  color: "#FFF4E2",
                  fontWeight: 800,
                  fontSize: H * 0.07,
                  opacity: p > 0 ? Math.min(1, p * 1.5) : 0,
                  scale: String(0.6 + 0.4 * p),
                }}
              >
                {ids[i] ? (
                  <IngredientArt
                    id={ids[i]}
                    uid={`${item.id}-c${i}`}
                    size={H * 0.12}
                  />
                ) : null}
                <span>{n}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
