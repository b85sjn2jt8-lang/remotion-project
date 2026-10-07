import React from "react";
import { evalAnimationSet } from "../animation/presets";
import type { TextItem } from "../types";
import {
  backgroundCss,
  isRtlText,
  resolveTransform,
  shadowCss,
  TransformBox,
} from "./common";

export const TextView: React.FC<{
  item: TextItem;
  frame: number;
  fps: number;
}> = ({ item, frame, fps }) => {
  const s = item.style;
  const t = resolveTransform(item.transform, item.keyframes, frame, fps);
  const anim = evalAnimationSet(
    item.animation,
    frame,
    item.durationInFrames,
    fps,
  );
  const rtl = isRtlText(item.text);
  const text =
    anim.chars < 1
      ? item.text.slice(0, Math.round(anim.chars * item.text.length))
      : item.text;
  return (
    <TransformBox itemId={item.id} t={t} anim={anim}>
      <div
        dir={rtl ? "rtl" : "ltr"}
        style={{
          position: "relative",
          maxWidth: s.maxWidth,
          width: "max-content",
          whiteSpace: "pre-wrap",
          fontFamily: `"${s.fontFamily}", "Tajawal", sans-serif`,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: `${s.letterSpacing + anim.tracking}em`,
          textAlign: s.textAlign,
          color: anim.flash > 0.5 ? "#FFFFFF" : s.color,
          WebkitTextStroke:
            s.strokeWidth > 0
              ? `${s.strokeWidth}px ${s.strokeColor}`
              : undefined,
          paintOrder: "stroke fill",
          textShadow: !s.background.enabled ? shadowCss(s.shadow) : undefined,
          boxShadow: s.background.enabled ? shadowCss(s.shadow) : undefined,
          ...backgroundCss(s.background),
        }}
      >
        {text}
        {anim.underline > 0 ? (
          <span
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              bottom: 6,
              height: 8,
              borderRadius: 8,
              backgroundColor: "currentColor",
              opacity: 0.85,
              transformOrigin: rtl ? "right" : "left",
              scale: `${anim.underline} 1`,
            }}
          />
        ) : null}
      </div>
    </TransformBox>
  );
};
