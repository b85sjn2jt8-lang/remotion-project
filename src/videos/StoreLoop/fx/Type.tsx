import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";

// ONE typography system for the whole film: Playfair Display only.
//   H1 — campaign line (GLOW DIFFERENT, SUN-KISSED., NIGHT RESET, FRESH START., YOUR SKIN…)
//        128 px, weight 600, tracking 0.05em
//   H2 — supporting line (HYDRATE GLOW CARE, SKIN FIRST., GLOW MODE.)
//        92 px, weight 500, tracking 0.14em
// Hierarchy comes from size / weight / tracking / position — never from a different font.
const TIERS = {
  h1: { size: 128, weight: 600, tracking: 0.05 },
  h2: { size: 92, weight: 500, tracking: 0.14 },
} as const;

// Editorial headline that behaves like part of the shot: each line rises out of its own mask
// (staggered), the block drifts with the camera, then the lines lift out again.
// Place it BETWEEN layers (e.g. after a plate and before its person cut-out or a product) so the
// copy sits in depth: behind the model, behind the product, or under a foreground wipe.
export const Headline: React.FC<{
  name: string;
  lines: string[];
  x: number;
  y: number;
  tier: keyof typeof TIERS;
  inAt: number;
  outAt: number;
  color?: string;
  align?: "left" | "right" | "center";
  driftX?: number;
  driftY?: number;
  shadow?: string;
  lineHeight?: number;
}> = ({
  name,
  lines,
  x,
  y,
  tier,
  inAt,
  outAt,
  color = "#ffffff",
  align = "left",
  driftX = -40,
  driftY = 0,
  shadow = "0 6px 30px rgba(60,10,30,0.25)",
  lineHeight = 1.06,
}) => {
  const frame = useCurrentFrame();
  const { size, weight, tracking } = TIERS[tier];
  // V3.1 final polish: no sliding/masked "motion graphics" — the copy fades in THROUGH LIGHT
  // (soft focus → sharp, a brief glow), its tracking expands very slowly while it holds, and it
  // dissolves out the same way. It still sits in depth (behind models/products/glass).
  const ease = Easing.bezier(0.25, 0.1, 0.25, 1);
  const k = interpolate(frame, [inAt, inAt + 20, outAt, outAt + 16], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const glow = interpolate(frame, [inAt, inAt + 10, inAt + 28], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left: align === "right" ? undefined : x,
        right: align === "right" ? 1920 - x : undefined,
        top: y,
        fontFamily: "Playfair Display",
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        letterSpacing: `${interpolate(frame, [inAt, outAt + 16], [tracking - 0.02, tracking + 0.025], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}em`,
        color,
        textAlign: align,
        textShadow: `${shadow}, 0 0 ${24 * glow}px rgba(255,255,255,${0.9 * glow})`,
        whiteSpace: "nowrap",
        opacity: k,
        filter: `blur(${(1 - k) * 10}px)`,
        translate: interpolate(frame, [inAt, outAt + 16], ["0px 0px", `${driftX * 0.5}px ${driftY * 0.5}px`], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </Interactive.Div>
  );
};
