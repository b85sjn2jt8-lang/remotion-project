import React, { useMemo } from "react";
import {
  combine,
  evalEmphasis,
  evalIn,
  evalOut,
  revealClip,
} from "../animation/presets";
import type { CaptionItem, CaptionWord, GlobalStyles } from "../types";
import {
  backgroundCss,
  hexToRgba,
  isRtlText,
  resolveTransform,
  shadowCss,
  TransformBox,
} from "./common";

type Line = { emphasis: boolean; words: CaptionWord[] };

const splitLines = (words: CaptionWord[], ownLine: boolean): Line[] => {
  if (!ownLine) {
    return [{ emphasis: false, words }];
  }
  const lines: Line[] = [];
  for (const w of words) {
    const emphasis = Boolean(w.emphasis);
    const last = lines[lines.length - 1];
    if (last && last.emphasis === emphasis) {
      last.words.push(w);
    } else {
      lines.push({ emphasis, words: [w] });
    }
  }
  return lines;
};

/** Per-word animations come from the item's IN animation in "word" reveal mode. */
const PER_WORD_IN = true;

export const CaptionView: React.FC<{
  item: CaptionItem;
  frame: number;
  fps: number;
  global: GlobalStyles;
}> = ({ item, frame, fps, global }) => {
  const { style, animation } = item;
  const words = item.words;
  const lines = useMemo(
    () => splitLines(words, style.emphasisOwnLine),
    [words, style.emphasisOwnLine],
  );
  const rtl = useMemo(
    () => isRtlText(words.map((w) => w.text).join(" ")),
    [words],
  );
  const t = resolveTransform(item.transform, item.keyframes, frame, fps);

  const wordMode = style.reveal === "word";
  // Container animation: IN applies to the whole block unless words reveal individually.
  const containerAnim = combine(
    wordMode && PER_WORD_IN
      ? {}
      : evalIn(animation.in, animation.inParams, frame, fps),
    evalOut(animation.out, animation.outParams, item.durationInFrames - frame),
  );

  // Typewriter: number of characters visible across the caption.
  const totalChars = words.reduce((n, w) => n + w.text.length, 0);
  let charBudget = Math.round(containerAnim.chars * totalChars);

  // Active word = last word whose start has passed (stays until next word starts).
  let activeIndex = -1;
  for (let i = 0; i < words.length; i++) {
    if (frame >= words[i].start) activeIndex = i;
  }

  return (
    <TransformBox itemId={item.id} t={t} anim={containerAnim}>
      <div
        dir={rtl ? "rtl" : "ltr"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems:
            style.textAlign === "center"
              ? "center"
              : (style.textAlign === "right") === rtl
                ? "flex-start"
                : "flex-end",
          gap: Math.round(style.fontSize * 0.08),
          width: style.maxWidth,
          fontFamily: `"${style.fontFamily}", "Tajawal", sans-serif`,
          letterSpacing: `${style.letterSpacing + containerAnim.tracking}em`,
          textTransform: style.uppercase ? "uppercase" : "none",
          textAlign: style.textAlign,
        }}
      >
        {lines.map((line, li) => (
          <div
            key={li}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent:
                style.textAlign === "center"
                  ? "center"
                  : (style.textAlign === "right") === rtl
                    ? "flex-start"
                    : "flex-end",
              alignItems: "baseline",
              fontSize: style.fontSize,
              columnGap: "0.3em",
              rowGap: "0.04em",
              lineHeight: style.lineHeight,
              ...backgroundCss(style.background),
              boxShadow:
                style.background.enabled && style.shadow.enabled
                  ? shadowCss(style.shadow)
                  : undefined,
            }}
          >
            {line.words.map((w) => {
              const index = words.indexOf(w);
              const spoken = frame >= w.start;
              const active = index === activeIndex;
              if (style.reveal === "single" && !active) {
                return null;
              }
              const emph = Boolean(w.emphasis);
              const ws = w.style ?? {};

              // Per-word animation state.
              const wordAnim = combine(
                wordMode || style.reveal === "single"
                  ? evalIn(
                      animation.in,
                      animation.inParams,
                      frame - w.start,
                      fps,
                    )
                  : {},
                emph || ws.animation
                  ? evalEmphasis(
                      ws.animation ?? animation.emphasis,
                      animation.emphasisParams,
                      frame - w.start,
                      fps,
                    )
                  : {},
              );

              let color = style.textColor;
              if (emph) color = style.emphasisColor;
              if (w.tone === "negative") color = global.negativeColor;
              if (style.highlight === "color" && active && !emph)
                color = style.highlightColor;
              if (style.reveal === "karaoke") {
                color = spoken ? style.highlightColor : style.textColor;
              }
              if (wordAnim.flash > 0) {
                color = wordAnim.flash > 0.5 ? style.highlightColor : color;
              }
              if (ws.color) color = ws.color;

              const sizeMul = (emph ? style.emphasisScale : 1) * (ws.size ?? 1);
              const boxed =
                (style.highlight === "box" && emph) ||
                wordAnim.highlight > 0 ||
                Boolean(ws.background);
              const boxBg = ws.background ?? style.emphasisBox.color;
              const strokeWidth = ws.strokeWidth ?? style.strokeWidth;
              const strokeColor = ws.strokeColor ?? style.strokeColor;
              const scale =
                (ws.scale ?? 1) *
                wordAnim.scale *
                (style.highlight === "scale" && active ? 1.08 : 1);

              // Typewriter budget.
              let text = w.text;
              if (containerAnim.chars < 1) {
                const take = Math.max(0, Math.min(text.length, charBudget));
                charBudget -= text.length;
                if (take === 0) return null;
                text = text.slice(0, take);
              }

              const hiddenBeforeSpoken =
                (wordMode || style.reveal === "single") && !spoken;
              const underline =
                (style.highlight === "underline" && active) ||
                wordAnim.underline > 0;

              return (
                <span
                  key={w.id}
                  data-word-id={w.id}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    unicodeBidi: "isolate",
                    fontSize: style.fontSize * sizeMul,
                    fontWeight:
                      ws.weight ??
                      (emph
                        ? Math.max(style.fontWeight, 900)
                        : style.fontWeight),
                    lineHeight:
                      emph && style.emphasisOwnLine ? 1.05 : style.lineHeight,
                    color,
                    WebkitTextStroke:
                      strokeWidth > 0 && !(boxed && style.highlight === "box")
                        ? `${strokeWidth}px ${strokeColor}`
                        : undefined,
                    paintOrder: "stroke fill",
                    textShadow:
                      !style.background.enabled && style.shadow.enabled
                        ? shadowCss(style.shadow)
                        : undefined,
                    opacity: hiddenBeforeSpoken ? 0 : wordAnim.opacity,
                    translate: `${wordAnim.tx}px ${wordAnim.ty}px`,
                    scale: String(scale),
                    rotate: `${wordAnim.rotate}deg`,
                    filter:
                      wordAnim.blur > 0.05
                        ? `blur(${wordAnim.blur}px)`
                        : undefined,
                    clipPath: revealClip(
                      wordAnim.reveal,
                      wordAnim.revealDirection,
                    ),
                    ...(boxed
                      ? {
                          backgroundColor: hexToRgba(
                            boxBg,
                            ws.background ? 1 : style.emphasisBox.opacity,
                          ),
                          borderRadius: style.emphasisBox.radius,
                          padding: `${style.emphasisBox.paddingY}px ${style.emphasisBox.paddingX}px`,
                        }
                      : {}),
                  }}
                >
                  {style.reveal === "karaoke" && active && frame < w.end ? (
                    <KaraokeFill
                      text={text}
                      progress={
                        (frame - w.start) / Math.max(1, w.end - w.start)
                      }
                      from={style.textColor}
                      to={style.highlightColor}
                      rtl={rtl}
                    />
                  ) : (
                    text
                  )}
                  {underline ? (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: "-0.06em",
                        height: "0.12em",
                        borderRadius: 99,
                        backgroundColor: style.highlightColor,
                        transformOrigin: rtl ? "right" : "left",
                        scale: `${style.highlight === "underline" && active ? 1 : wordAnim.underline} 1`,
                      }}
                    />
                  ) : null}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </TransformBox>
  );
};

/** A word that fills with color from reading-start to reading-end. */
const KaraokeFill: React.FC<{
  text: string;
  progress: number;
  from: string;
  to: string;
  rtl: boolean;
}> = ({ text, progress, from, to, rtl }) => {
  const p = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(${rtl ? "to left" : "to right"}, ${to} ${p}%, ${from} ${p}%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </span>
  );
};
