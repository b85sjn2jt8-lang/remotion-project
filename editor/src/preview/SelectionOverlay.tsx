import React, { useEffect, useRef, useState } from "react";
import type { Item } from "../../../src/engine/types";
import { hasTransform, setAnimatable, valueAt } from "../project/keyframes";
import { usePlayback } from "../project/playback";
import { beginTx, commit, endTx, select, useEditor } from "../project/store";

type Box = { id: string; x: number; y: number; w: number; h: number };

const SNAP_PX = 10; // composition px

/**
 * Direct manipulation on the canvas: click to select (topmost element under the pointer),
 * drag to move, corner handles to scale, top handle to rotate. Double-click a caption word to
 * select just that word. Snaps to center lines and safe margins.
 */
export const SelectionOverlay: React.FC<{ scale: number }> = ({ scale }) => {
  const ref = useRef<HTMLDivElement>(null);
  const selection = useEditor((s) => s.selection);
  const wordId = useEditor((s) => s.wordId);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [wordBox, setWordBox] = useState<Box | null>(null);
  const [guides, setGuides] = useState<{ v: number[]; h: number[] }>({
    v: [],
    h: [],
  });

  // Measure selected elements every animation frame (cheap: only selected ids).
  useEffect(() => {
    let raf = 0;
    let last = "";
    const loop = () => {
      const root = ref.current?.parentElement;
      const base = ref.current?.getBoundingClientRect();
      if (root && base) {
        const next: Box[] = [];
        for (const id of selection) {
          const el = root.querySelector(`[data-item-id="${id}"]`);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          next.push({
            id,
            x: r.left - base.left,
            y: r.top - base.top,
            w: r.width,
            h: r.height,
          });
        }
        let wb: Box | null = null;
        if (wordId) {
          const el = root.querySelector(`[data-word-id="${wordId}"]`);
          if (el) {
            const r = el.getBoundingClientRect();
            wb = {
              id: wordId,
              x: r.left - base.left,
              y: r.top - base.top,
              w: r.width,
              h: r.height,
            };
          }
        }
        const key = JSON.stringify([next, wb]);
        if (key !== last) {
          last = key;
          setBoxes(next);
          setWordBox(wb);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [selection, wordId]);

  const hitTest = (
    clientX: number,
    clientY: number,
  ): { item?: Item; wordId?: string } => {
    const project = useEditor.getState().project;
    if (!project) return {};
    const els = document.elementsFromPoint(clientX, clientY);
    let word: string | undefined;
    for (const el of els) {
      const w = (el as HTMLElement).closest?.("[data-word-id]");
      if (w && !word) word = w.getAttribute("data-word-id") ?? undefined;
      const host = (el as HTMLElement).closest?.("[data-item-id]");
      if (!host) continue;
      const id = host.getAttribute("data-item-id");
      const item = project.items.find((i) => i.id === id);
      const track = project.tracks.find((t) => t.id === item?.trackId);
      if (item && !track?.locked && !track?.hidden)
        return { item, wordId: word };
    }
    return {};
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const { item } = hitTest(e.clientX, e.clientY);
    if (!item) {
      select([]);
      return;
    }
    const sel = useEditor.getState().selection;
    if (e.shiftKey) {
      select(
        sel.includes(item.id)
          ? sel.filter((s) => s !== item.id)
          : [...sel, item.id],
      );
      return;
    }
    if (!sel.includes(item.id)) select([item.id]);
    startMove(e, sel.includes(item.id) ? sel : [item.id]);
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    const { item, wordId: w } = hitTest(e.clientX, e.clientY);
    if (item?.type === "caption" && w) select([item.id], w);
  };

  const startMove = (e: React.PointerEvent, ids: string[]) => {
    const project = useEditor.getState().project!;
    const frame = usePlayback.getState().frame;
    const items = project.items.filter(
      (i) => ids.includes(i.id) && hasTransform(i),
    );
    if (!items.length) return;
    const start = items.map((i) => ({
      id: i.id,
      local: frame - i.from,
      x: valueAt(i, "x", frame - i.from),
      y: valueAt(i, "y", frame - i.from),
    }));
    const box0 = boxes.find((b) => b.id === ids[0]);
    const sx = e.clientX;
    const sy = e.clientY;
    let moved = false;
    const move = (ev: PointerEvent) => {
      let dx = (ev.clientX - sx) / scale;
      let dy = (ev.clientY - sy) / scale;
      if (!moved && Math.hypot(dx, dy) < 2) return;
      if (!moved) {
        moved = true;
        beginTx();
      }
      if (ev.shiftKey) {
        if (Math.abs(dx) > Math.abs(dy)) dy = 0;
        else dx = 0;
      }
      const g = { v: [] as number[], h: [] as number[] };
      if (useEditor.getState().snap && box0) {
        const W = project.width;
        const H = project.height;
        const left = box0.x / scale + dx;
        const top = box0.y / scale + dy;
        const w = box0.w / scale;
        const h = box0.h / scale;
        const candX: [number, number][] = [
          [W / 2, left + w / 2],
          [90, left],
          [W - 90, left + w],
          [W - 150, left + w],
        ];
        const candY: [number, number][] = [
          [H / 2, top + h / 2],
          [220, top],
          [H - 440, top + h],
          [H / 3, top + h / 2],
        ];
        for (const [target, cur] of candX) {
          if (Math.abs(target - cur) < SNAP_PX) {
            dx += target - cur;
            g.v.push(target);
            break;
          }
        }
        for (const [target, cur] of candY) {
          if (Math.abs(target - cur) < SNAP_PX) {
            dy += target - cur;
            g.h.push(target);
            break;
          }
        }
      }
      setGuides(g);
      commit((p) => {
        for (const s of start) {
          const it = p.items.find((i) => i.id === s.id);
          if (!it) continue;
          setAnimatable(it, "x", Math.round(s.x + dx), s.local);
          setAnimatable(it, "y", Math.round(s.y + dy), s.local);
        }
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      setGuides({ v: [], h: [] });
      if (moved) endTx();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const startScale = (e: React.PointerEvent, box: Box) => {
    e.stopPropagation();
    const project = useEditor.getState().project!;
    const item = project.items.find((i) => i.id === box.id);
    if (!item || !hasTransform(item)) return;
    const frame = usePlayback.getState().frame;
    const local = frame - item.from;
    const s0 = valueAt(item, "scale", local);
    const base = ref.current!.getBoundingClientRect();
    const cx = base.left + box.x + box.w / 2;
    const cy = base.top + box.y + box.h / 2;
    const d0 = Math.max(4, Math.hypot(e.clientX - cx, e.clientY - cy));
    beginTx();
    const move = (ev: PointerEvent) => {
      const d = Math.hypot(ev.clientX - cx, ev.clientY - cy);
      const v = Math.max(0.05, +(s0 * (d / d0)).toFixed(3));
      commit((p) => {
        const it = p.items.find((i) => i.id === box.id);
        if (it) setAnimatable(it, "scale", v, local);
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

  const startRotate = (e: React.PointerEvent, box: Box) => {
    e.stopPropagation();
    const project = useEditor.getState().project!;
    const item = project.items.find((i) => i.id === box.id);
    if (!item || !hasTransform(item)) return;
    const local = usePlayback.getState().frame - item.from;
    const r0 = valueAt(item, "rotation", local);
    const base = ref.current!.getBoundingClientRect();
    const cx = base.left + box.x + box.w / 2;
    const cy = base.top + box.y + box.h / 2;
    const a0 = Math.atan2(e.clientY - cy, e.clientX - cx);
    beginTx();
    const move = (ev: PointerEvent) => {
      let deg =
        r0 +
        ((Math.atan2(ev.clientY - cy, ev.clientX - cx) - a0) * 180) / Math.PI;
      if (ev.shiftKey) deg = Math.round(deg / 15) * 15;
      else if (Math.abs(deg) < 2) deg = 0;
      commit((p) => {
        const it = p.items.find((i) => i.id === box.id);
        if (it) setAnimatable(it, "rotation", +deg.toFixed(1), local);
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
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, zIndex: 5, cursor: "default" }}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >
      {boxes.map((b) => (
        <div
          key={b.id}
          className="sel-box"
          style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
        >
          {(["nw", "ne", "sw", "se"] as const).map((c) => (
            <div
              key={c}
              className="handle"
              style={{
                left: c.includes("w") ? -5 : undefined,
                right: c.includes("e") ? -5 : undefined,
                top: c.includes("n") ? -5 : undefined,
                bottom: c.includes("s") ? -5 : undefined,
                cursor:
                  c === "nw" || c === "se" ? "nwse-resize" : "nesw-resize",
              }}
              onPointerDown={(e) => startScale(e, b)}
            />
          ))}
          <div
            className="rot-handle"
            style={{ left: "50%", top: -26, translate: "-50% 0" }}
            onPointerDown={(e) => startRotate(e, b)}
          />
        </div>
      ))}
      {wordBox ? (
        <div
          className="sel-box"
          style={{
            left: wordBox.x - 2,
            top: wordBox.y - 2,
            width: wordBox.w + 4,
            height: wordBox.h + 4,
            borderStyle: "dashed",
            borderColor: "#f2b33d",
          }}
        />
      ) : null}
      {guides.v.map((x) => (
        <div key={`v${x}`} className="guide-v" style={{ left: x * scale }} />
      ))}
      {guides.h.map((y) => (
        <div key={`h${y}`} className="guide-h" style={{ top: y * scale }} />
      ))}
    </div>
  );
};
