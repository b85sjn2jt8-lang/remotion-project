import React, { useMemo } from "react";
import { CaptionView } from "../../../src/engine/items/CaptionView";
import type {
  AnimationSet,
  CaptionItem,
  CaptionStyle,
  GlobalStyles,
} from "../../../src/engine/types";

const SAMPLE = [
  { text: "السعر", e: false },
  { text: "صار", e: false },
  { text: "420", e: true },
  { text: "ريال", e: false },
];

/** Live mini-render of a caption style using the real engine renderer. */
export const CaptionThumb: React.FC<{
  style: CaptionStyle;
  animation: AnimationSet;
  global: GlobalStyles;
  height?: number;
  width?: number;
}> = ({ style, animation, global, height = 74, width = 124 }) => {
  const item = useMemo<CaptionItem>(
    () => ({
      id: "thumb",
      type: "caption",
      trackId: "",
      name: "",
      from: 0,
      durationInFrames: 200,
      words: SAMPLE.map((w, i) => ({
        id: `w${i}`,
        text: w.text,
        start: i * 6,
        end: i * 6 + 6,
        emphasis: w.e,
      })),
      style: { ...style, maxWidth: 900 },
      animation,
      transform: { x: 540, y: 300, scale: 1, rotation: 0, opacity: 1, blur: 0 },
    }),
    [style, animation],
  );
  const s = width / 1080;
  return (
    <div style={{ width, height, position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: height / 2 - 300 * s,
          width: 1080,
          height: 600,
          scale: String(s),
          transformOrigin: "0 0",
        }}
      >
        <CaptionView
          item={item}
          frame={style.reveal === "single" ? 13 : 60}
          fps={30}
          global={global}
        />
      </div>
    </div>
  );
};
