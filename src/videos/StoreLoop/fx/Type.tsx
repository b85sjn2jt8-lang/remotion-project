import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";

// Editorial headline that behaves like part of the shot: each line rises out of its own mask
// (staggered), the block drifts with the camera, then the lines lift out again.
// Place it BETWEEN layers (e.g. after a plate and before its person cut-out or a product) so the
// copy sits in depth: behind the model, behind the product, or under a foreground wipe.
export const Headline: React.FC<{
  name: string;
  lines: string[];
  x: number;
  y: number;
  size: number;
  inAt: number;
  outAt: number;
  color?: string;
  align?: "left" | "right" | "center";
  driftX?: number;
  driftY?: number;
  shadow?: string;
  tracking?: string;
  lineHeight?: number;
}> = ({
  name,
  lines,
  x,
  y,
  size,
  inAt,
  outAt,
  color = "#ffffff",
  align = "left",
  driftX = -40,
  driftY = 0,
  shadow = "0 6px 30px rgba(60,10,30,0.25)",
  tracking = "0.06em",
  lineHeight = 1.06,
}) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left: align === "right" ? undefined : x,
        right: align === "right" ? 1920 - x : undefined,
        top: y,
        fontFamily: "Playfair Display",
        fontWeight: 600,
        fontSize: size,
        lineHeight,
        letterSpacing: tracking,
        color,
        textAlign: align,
        textShadow: shadow,
        whiteSpace: "nowrap",
        translate: interpolate(frame, [inAt, outAt + 10], [`0px 0px`, `${driftX}px ${driftY}px`], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {lines.map((line, i) => (
        <div key={line} style={{ overflow: "hidden", paddingBottom: size * 0.08 }}>
          <div
            style={{
              translate: interpolate(
                frame,
                [inAt + i * 4, inAt + i * 4 + 14, outAt + i * 3, outAt + i * 3 + 10],
                ["0px 115%", "0px 0%", "0px 0%", "0px -115%"],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) },
              ),
            }}
          >
            {line}
          </div>
        </div>
      ))}
    </Interactive.Div>
  );
};
