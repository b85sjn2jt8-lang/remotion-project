import React from "react";
import type { CaptionItem, Item, Track } from "../../../src/engine/types";
import { Waveform } from "../audio/Waveform";
import { openContextMenu } from "../editor/ContextMenu";
import { allKeyframeFrames } from "../project/keyframes";
import { seek } from "../project/playback";
import { beginTx, commit, endTx, select, useEditor } from "../project/store";
import { ITEM_COLORS } from "./trackIcons";

export const TimelineItem: React.FC<{
  item: Item;
  track: Track;
  fps: number;
  pxPerFrame: number;
  height: number;
  onPointerDown: (e: React.PointerEvent, item: Item) => void;
  onTrimDown: (e: React.PointerEvent, item: Item, side: "l" | "r") => void;
}> = React.memo(
  ({ item, track, fps, pxPerFrame, height, onPointerDown, onTrimDown }) => {
    const selected = useEditor((s) => s.selection.includes(item.id));
    const wordId = useEditor((s) =>
      s.selection[0] === item.id ? s.wordId : null,
    );
    const left = item.from * pxPerFrame;
    const width = Math.max(4, item.durationInFrames * pxPerFrame);
    const kfs = allKeyframeFrames(item);

    const hasAudio =
      (item.type === "audio" ||
        ((item.type === "video" || item.type === "brollVideo") &&
          item.volume > 0)) &&
      width > 30;

    return (
      <div
        className={`tl-item${selected ? " selected" : ""}`}
        style={{
          left,
          width,
          background: ITEM_COLORS[item.type] ?? "#444",
          cursor: track.locked ? "not-allowed" : undefined,
        }}
        onPointerDown={(e) => onPointerDown(e, item)}
        onDoubleClick={() => seek(item.from)}
        onContextMenu={(e) => {
          e.preventDefault();
          if (!useEditor.getState().selection.includes(item.id))
            select([item.id]);
          openContextMenu(e.clientX, e.clientY);
        }}
        data-tip={undefined}
      >
        {hasAudio && "src" in item ? (
          <Waveform
            src={item.src}
            startFrame={"trimBefore" in item ? item.trimBefore : 0}
            frames={item.durationInFrames}
            fps={fps}
            width={width}
            height={height}
            color={
              item.type === "audio"
                ? "rgba(255,255,255,.45)"
                : "rgba(255,255,255,.22)"
            }
            volume={item.volume}
          />
        ) : null}
        {item.type === "caption" ? (
          <CaptionWords
            item={item}
            pxPerFrame={pxPerFrame}
            selected={selected}
            wordId={wordId}
          />
        ) : (
          <span
            className="label"
            style={{
              alignSelf: item.type === "video" ? "flex-start" : undefined,
              paddingTop: item.type === "video" ? 4 : 0,
            }}
          >
            <bdi>{item.name}</bdi>
            {item.type === "video" && item.transform.scale !== 1
              ? `  ·  ${Math.round(item.transform.scale * 100)}%`
              : ""}
            {item.type === "video" &&
            item.transitionIn &&
            item.transitionIn.type !== "cut"
              ? `  ·  ⇢ ${item.transitionIn.type}`
              : ""}
          </span>
        )}
        {kfs.map((f) => (
          <div key={f} className="tl-kf" style={{ left: f * pxPerFrame }} />
        ))}
        {!track.locked ? (
          <>
            <div
              className="trim l"
              onPointerDown={(e) => onTrimDown(e, item, "l")}
            />
            <div
              className="trim r"
              onPointerDown={(e) => onTrimDown(e, item, "r")}
            />
          </>
        ) : null}
      </div>
    );
  },
);

/**
 * Caption words drawn inside the caption clip. When the caption is selected, each word boundary
 * can be dragged to retime words (word-level timestamps), and a click selects the word.
 */
const CaptionWords: React.FC<{
  item: CaptionItem;
  pxPerFrame: number;
  selected: boolean;
  wordId: string | null;
}> = ({ item, pxPerFrame, selected, wordId }) => {
  const onBoundaryDown = (e: React.PointerEvent, index: number) => {
    e.stopPropagation();
    beginTx();
    const sx = e.clientX;
    const w = item.words[index];
    const prev = item.words[index - 1];
    const next = item.words[index + 1];
    const startOrig = w.start;
    const move = (ev: PointerEvent) => {
      const d = (ev.clientX - sx) / pxPerFrame;
      const min = prev ? prev.start + 1 : 0;
      const max = Math.min(
        w.end - 0.5,
        next ? next.start - 0.5 : item.durationInFrames,
      );
      const v = +Math.min(max, Math.max(min, startOrig + d)).toFixed(1);
      commit((p) => {
        const c = p.items.find((i) => i.id === item.id) as CaptionItem;
        const cw = c.words[index];
        cw.start = v;
        if (c.words[index - 1]) c.words[index - 1].end = v;
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      endTx();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <>
      <span
        className="label"
        style={{
          position: "absolute",
          top: 2,
          left: 0,
          fontSize: 10,
          opacity: 0.85,
          direction: "rtl",
        }}
      >
        {item.presetId ? `◆ ` : ""}
        {item.name}
      </span>
      {item.words.map((w, i) => (
        <div
          key={w.id}
          className={`tl-word${wordId === w.id ? " sel" : ""}`}
          style={{
            left: w.start * pxPerFrame,
            width: Math.max(2, (w.end - w.start) * pxPerFrame),
            color: w.emphasis ? "#ffd27a" : undefined,
            fontWeight: w.emphasis ? 800 : 400,
          }}
          onPointerDown={(e) => {
            if (!selected) return;
            e.stopPropagation();
            select([item.id], w.id);
            seek(item.from + w.start);
          }}
        >
          {pxPerFrame * (w.end - w.start) > 18 ? w.text : ""}
          {selected ? (
            <div className="wh" onPointerDown={(e) => onBoundaryDown(e, i)} />
          ) : null}
        </div>
      ))}
    </>
  );
};
