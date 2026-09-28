import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
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
import type { CaptionStyle } from "../schema";

// How long the last word of a page stays on screen after it was spoken.
const HOLD_AFTER_LAST_WORD_MS = 350;

/**
 * Word-by-word captions for one source file.
 *
 * `src` is a JSON file in public/ (e.g. "captions/my-clip.json") whose timestamps are in the
 * SOURCE file's time. Place this component inside the same `<Sequence trimBefore={...}>` as the
 * `<Video>` so the captions follow the cut automatically.
 *
 * To fix a word or its timing, edit the JSON file. Add `"pageBreakAfter": true` to a word to
 * force a new caption page after it.
 */
export const Captions: React.FC<{
  src: string;
  captionStyle: CaptionStyle;
}> = ({ src, captionStyle }) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender(`Loading captions ${src}`));

  useEffect(() => {
    fetch(staticFile(src))
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Captions not found: public/${src} (npm run ingest -- <file> --captions)`,
          );
        }
        return res.json() as Promise<Caption[]>;
      })
      .then((data) => {
        setCaptions(data);
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, [src, handle, continueRender, cancelRender]);

  const pages = useMemo(() => {
    if (!captions) {
      return [];
    }
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: captionStyle.combineWordsWithinMs,
    }).pages;
  }, [captions, captionStyle.combineWordsWithinMs]);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = (frame / fps) * 1000;

  const page = pages.find((p) => {
    const lastWordEnd = p.tokens[p.tokens.length - 1]?.toMs ?? p.startMs;
    const end = Math.min(
      p.startMs + p.durationMs,
      lastWordEnd + HOLD_AFTER_LAST_WORD_MS,
    );
    return timeMs >= p.startMs && timeMs < end;
  });

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
        paddingRight: 90,
      }}
    >
      <div
        style={{
          fontFamily: captionStyle.fontFamily,
          fontSize: captionStyle.fontSize,
          fontWeight: 900,
          lineHeight: 1.15,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: `calc(0.3em + ${captionStyle.strokeWidth}px)`,
          rowGap: "0.05em",
          textTransform: captionStyle.uppercase ? "uppercase" : "none",
          color: captionStyle.textColor,
          WebkitTextStroke: `${captionStyle.strokeWidth}px ${captionStyle.strokeColor}`,
          paintOrder: "stroke fill",
          textShadow: "0 6px 24px rgba(0,0,0,0.45)",
          scale: interpolate(
            timeMs,
            [page.startMs, page.startMs + 180],
            [0.82, 1],
            {
              easing: Easing.spring({ damping: 12 }),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        {page.tokens.map((token) => {
          const active = token.fromMs <= timeMs && token.toMs > timeMs;
          const box = captionStyle.highlightStyle === "box";
          return (
            <span
              key={token.fromMs}
              style={{
                color: active && !box ? captionStyle.highlightColor : undefined,
                backgroundColor:
                  active && box ? captionStyle.highlightColor : undefined,
                borderRadius: 14,
                padding: box ? "0 10px" : undefined,
                scale: active ? 1.06 : 1,
              }}
            >
              {token.text.trim()}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
