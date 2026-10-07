import type { Caption } from "@remotion/captions";
import { useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import type { ArabicCaptionStyle } from "../schema";

// A caption word with authoring hints. Edit these in the JSON file:
//  - "emphasis": true      → the word gets its own, bigger line in the highlight color and pops in
//  - "tone": "negative"    → the word uses the negative color (e.g. "كذّابة", "لا")
//  - "pageBreakAfter": true → the next word starts a new caption group
type ArabicCaption = Caption & {
  emphasis?: boolean;
  tone?: "negative";
  pageBreakAfter?: boolean;
};

type Line = { emphasis: boolean; words: ArabicCaption[] };
type Page = { startMs: number; endMs: number; lines: Line[] };

// How long a group stays on screen after its last word when nobody is speaking.
const HOLD_AFTER_LAST_WORD_MS = 400;

const toPages = (words: ArabicCaption[]): Page[] => {
  const groups: ArabicCaption[][] = [[]];
  for (const word of words) {
    groups[groups.length - 1].push(word);
    if (word.pageBreakAfter) {
      groups.push([]);
    }
  }
  const filled = groups.filter((g) => g.length > 0);
  return filled.map((group, i) => {
    const lines: Line[] = [];
    for (const word of group) {
      const emphasis = Boolean(word.emphasis);
      const last = lines[lines.length - 1];
      if (last && last.emphasis === emphasis) {
        last.words.push(word);
      } else {
        lines.push({ emphasis, words: [word] });
      }
    }
    const next = filled[i + 1];
    const lastEnd = group[group.length - 1].endMs + HOLD_AFTER_LAST_WORD_MS;
    return {
      startMs: group[0].startMs,
      endMs: next ? Math.min(next[0].startMs, lastEnd) : lastEnd,
      lines,
    };
  });
};

/**
 * Dynamic Arabic captions (RTL) for one source file.
 *
 * Words are grouped into short phrases (authored with "pageBreakAfter" in the JSON) and appear as
 * they are spoken. Normal words just fade in; emphasized words sit on their own, bigger line and pop.
 * `src` timestamps are in SOURCE time, so place this inside the same `<Sequence trimBefore>` as the
 * `<Video>`.
 */
export const ArabicCaptions: React.FC<{
  src: string;
  captionStyle: ArabicCaptionStyle;
}> = ({ src, captionStyle }) => {
  const [captions, setCaptions] = useState<ArabicCaption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender(`Loading captions ${src}`));

  useEffect(() => {
    fetch(staticFile(src))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Captions not found: public/${src}`);
        }
        return res.json() as Promise<ArabicCaption[]>;
      })
      .then((data) => {
        setCaptions(data);
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, [src, handle, continueRender, cancelRender]);

  const pages = useMemo(() => (captions ? toPages(captions) : []), [captions]);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = (frame / fps) * 1000;

  const page = pages.find((p) => timeMs >= p.startMs && timeMs < p.endMs);

  if (!captionStyle.enabled || !page) {
    return null;
  }

  return (
    <AbsoluteFill
      name="Captions"
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: captionStyle.distanceFromBottom,
        paddingLeft: 90,
        paddingRight: 150,
      }}
    >
      <div
        style={{
          direction: "rtl",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          fontFamily: captionStyle.fontFamily,
          color: captionStyle.textColor,
          WebkitTextStroke: `${captionStyle.strokeWidth}px ${captionStyle.strokeColor}`,
          paintOrder: "stroke fill",
          textShadow: "0 6px 26px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        {page.lines.map((line) => (
          <div
            key={line.words[0].startMs}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              columnGap: line.emphasis ? "0.22em" : "0.28em",
              fontSize: line.emphasis
                ? captionStyle.emphasisFontSize
                : captionStyle.fontSize,
              fontWeight: line.emphasis ? 900 : 800,
              lineHeight: line.emphasis ? 1.05 : 1.2,
            }}
          >
            {line.words.map((word) => {
              const t = timeMs - word.startMs;
              const color =
                word.tone === "negative"
                  ? captionStyle.negativeColor
                  : line.emphasis
                    ? captionStyle.highlightColor
                    : undefined;
              return (
                <span
                  key={word.startMs}
                  style={{
                    color,
                    display: "inline-block",
                    opacity: interpolate(t, [0, 70], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    translate: line.emphasis
                      ? undefined
                      : `0px ${interpolate(t, [0, 160], [14, 0], {
                          easing: Easing.bezier(0.16, 1, 0.3, 1),
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })}px`,
                    scale: line.emphasis
                      ? interpolate(t, [0, 220], [0.55, 1], {
                          easing: Easing.spring({ damping: 11 }),
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })
                      : undefined,
                  }}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
