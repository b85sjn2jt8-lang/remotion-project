import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Magnet,
  Redo2,
  Scissors,
  Trash2,
  Undo2,
  Unlock,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Item, Project, Track } from "../../../src/engine/types";
import { IconButton } from "../components/ui";
import {
  createFromPayload,
  DRAG_MIME,
  type LibraryPayload,
} from "../library/payloads";
import {
  deleteSelected,
  duplicateSelected,
  reorderTrack,
  splitAtPlayhead,
  TRACK_ACCEPTS,
} from "../project/actions";
import { seek, usePlayback } from "../project/playback";
import {
  beginTx,
  commit,
  endTx,
  redo,
  select,
  undo,
  useEditor,
} from "../project/store";
import { TimelineItem } from "./TimelineItem";
import { rulerStep, snapTo } from "./timeMath";
import { TRACK_ICONS } from "./trackIcons";

export const TRACK_HEIGHT: Record<Track["kind"], number> = {
  video: 58,
  broll: 40,
  captions: 54,
  text: 36,
  graphics: 36,
  overlays: 36,
  voice: 44,
  sfx: 36,
  music: 44,
};

export const Timeline: React.FC = () => {
  const project = useEditor((s) => s.project)!;
  const pxPerFrame = useEditor((s) => s.pxPerFrame);
  const snap = useEditor((s) => s.snap);
  const canUndo = useEditor((s) => s.past.length > 0);
  const canRedo = useEditor((s) => s.future.length > 0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headsRef = useRef<HTMLDivElement>(null);
  const [snapLine, setSnapLine] = useState<number | null>(null);
  const [dropTrack, setDropTrack] = useState<string | null>(null);

  const totalFrames = project.durationInFrames + project.fps * 10;
  const width = totalFrames * pxPerFrame;

  const setZoom = useCallback((z: number) => {
    const el = scrollRef.current;
    const frame = usePlayback.getState().frame;
    const old = useEditor.getState().pxPerFrame;
    const next = Math.min(40, Math.max(0.3, z));
    useEditor.setState({ pxPerFrame: next });
    if (el) {
      // Keep the playhead at the same screen position.
      const screenX = frame * old - el.scrollLeft;
      requestAnimationFrame(() => (el.scrollLeft = frame * next - screenX));
    }
  }, []);

  // Ctrl/Cmd + wheel zoom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setZoom(
          useEditor.getState().pxPerFrame * (e.deltaY < 0 ? 1.15 : 1 / 1.15),
        );
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setZoom]);

  const frameFromClientX = (clientX: number) => {
    const el = scrollRef.current!;
    const r = el.getBoundingClientRect();
    return Math.max(
      0,
      Math.round(
        (clientX - r.left + el.scrollLeft) / useEditor.getState().pxPerFrame,
      ),
    );
  };

  const onRulerDown = (e: React.PointerEvent) => {
    usePlayback.getState().player?.pause();
    seek(frameFromClientX(e.clientX));
    const move = (ev: PointerEvent) => seek(frameFromClientX(ev.clientX));
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  /** Snap candidates in frames: playhead, 0, every item edge (except the moving ones). */
  const snapCandidates = (exclude: string[]) => {
    const p = useEditor.getState().project!;
    const c = [0, usePlayback.getState().frame];
    for (const i of p.items) {
      if (exclude.includes(i.id)) continue;
      c.push(i.from, i.from + i.durationInFrames);
    }
    return c;
  };

  const snapFrame = (f: number, exclude: string[]) => {
    if (!useEditor.getState().snap) return { value: f, target: null };
    return snapTo(
      f,
      snapCandidates(exclude),
      8 / useEditor.getState().pxPerFrame,
    );
  };

  // ---------- item drag (move, also across compatible tracks) ----------
  const onItemDown = (e: React.PointerEvent, item: Item) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const st = useEditor.getState();
    const track = project.tracks.find((t) => t.id === item.trackId);
    let sel = st.selection;
    if (e.shiftKey || e.metaKey || e.ctrlKey) {
      select(
        sel.includes(item.id)
          ? sel.filter((s) => s !== item.id)
          : [...sel, item.id],
      );
      return;
    }
    if (!sel.includes(item.id)) {
      sel = [item.id];
      select(sel);
    } else if (st.wordId) {
      select(sel);
    }
    if (track?.locked) return;
    const moving = st.project!.items.filter((i) => sel.includes(i.id));
    const starts = new Map(
      moving.map((i) => [i.id, { from: i.from, trackId: i.trackId }]),
    );
    const sx = e.clientX;
    let moved = false;
    const move = (ev: PointerEvent) => {
      const dxF = (ev.clientX - sx) / useEditor.getState().pxPerFrame;
      if (!moved && Math.abs(ev.clientX - sx) < 3) return;
      if (!moved) {
        moved = true;
        beginTx();
      }
      // snap using the dragged item's start or end
      const s0 = starts.get(item.id)!;
      let delta = Math.round(dxF);
      const a = snapFrame(s0.from + delta, sel);
      const b = snapFrame(s0.from + delta + item.durationInFrames, sel);
      if (a.target !== null) {
        delta = a.value - s0.from;
        setSnapLine(a.target);
      } else if (b.target !== null) {
        delta = b.value - item.durationInFrames - s0.from;
        setSnapLine(b.target);
      } else setSnapLine(null);
      const minFrom = Math.min(...[...starts.values()].map((s) => s.from));
      delta = Math.max(delta, -minFrom);
      // vertical: move single item to a compatible track under the pointer
      const hovered = trackAtY(ev.clientY);
      commit((p) => {
        for (const it of p.items) {
          const s = starts.get(it.id);
          if (!s) continue;
          it.from = s.from + delta;
          if (sel.length === 1 && hovered) {
            const t = p.tracks.find((x) => x.id === hovered);
            if (t && !t.locked && TRACK_ACCEPTS[t.kind].includes(it.type))
              it.trackId = t.id;
          }
          if (it.type === "audio" && it.linkedTo) delete it.linkedTo;
        }
        moveLinkedSfx(p, sel, delta, starts);
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      setSnapLine(null);
      if (moved) endTx();
      else if (!e.shiftKey) {
        // plain click: also move playhead inside item? keep playhead where it is.
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const trackAtY = (clientY: number) => {
    const el = scrollRef.current;
    if (!el) return null;
    const rows = el.querySelectorAll<HTMLElement>("[data-track-id]");
    for (const r of rows) {
      const b = r.getBoundingClientRect();
      if (clientY >= b.top && clientY < b.bottom)
        return r.dataset.trackId ?? null;
    }
    return null;
  };

  // ---------- trim ----------
  const onTrimDown = (e: React.PointerEvent, item: Item, side: "l" | "r") => {
    e.stopPropagation();
    if (project.tracks.find((t) => t.id === item.trackId)?.locked) return;
    select([item.id]);
    beginTx();
    const sx = e.clientX;
    const orig = structuredClone(item);
    const move = (ev: PointerEvent) => {
      let d = Math.round((ev.clientX - sx) / useEditor.getState().pxPerFrame);
      if (side === "r") {
        const sn = snapFrame(orig.from + orig.durationInFrames + d, [item.id]);
        d = sn.value - orig.from - orig.durationInFrames;
        setSnapLine(sn.target);
        commit((p) => {
          const it = p.items.find((i) => i.id === item.id)!;
          it.durationInFrames = Math.max(1, orig.durationInFrames + d);
        });
      } else {
        const sn = snapFrame(orig.from + d, [item.id]);
        d = sn.value - orig.from;
        setSnapLine(sn.target);
        const minD =
          "trimBefore" in orig
            ? -(orig as { trimBefore: number }).trimBefore
            : -orig.from;
        d = Math.min(
          orig.durationInFrames - 1,
          Math.max(Math.max(minD, -orig.from), d),
        );
        commit((p) => {
          const it = p.items.find((i) => i.id === item.id)!;
          it.from = orig.from + d;
          it.durationInFrames = orig.durationInFrames - d;
          if ("trimBefore" in it && "trimBefore" in orig) {
            (it as { trimBefore: number }).trimBefore =
              (orig as { trimBefore: number }).trimBefore + d;
          }
          if (it.type === "caption" && orig.type === "caption") {
            it.words = orig.words.map((w) => ({
              ...w,
              start: w.start - d,
              end: w.end - d,
            }));
          }
          if (orig.keyframes) {
            it.keyframes = structuredClone(orig.keyframes);
            for (const k of Object.values(it.keyframes))
              for (const kf of k ?? []) kf.frame -= d;
          }
        });
      }
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      setSnapLine(null);
      endTx();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  // ---------- drop from library ----------
  const onDrop = (e: React.DragEvent, track: Track) => {
    e.preventDefault();
    setDropTrack(null);
    const raw = e.dataTransfer.getData(DRAG_MIME);
    if (!raw) return;
    const payload = JSON.parse(raw) as LibraryPayload;
    createFromPayload(payload, {
      trackId: track.id,
      frame: frameFromClientX(e.clientX),
    });
  };

  const syncScroll = () => {
    if (headsRef.current && scrollRef.current)
      headsRef.current.scrollTop = scrollRef.current.scrollTop;
  };

  const fit = () => {
    const el = scrollRef.current;
    if (!el) return;
    setZoom((el.clientWidth - 40) / Math.max(1, project.durationInFrames));
  };

  return (
    <>
      <div className="tl-toolbar">
        <IconButton
          icon={<Undo2 size={15} />}
          tip="Undo (Ctrl+Z)"
          onClick={undo}
          disabled={!canUndo}
        />
        <IconButton
          icon={<Redo2 size={15} />}
          tip="Redo (Ctrl+Shift+Z)"
          onClick={redo}
          disabled={!canRedo}
        />
        <div
          style={{
            width: 1,
            height: 18,
            background: "var(--border-2)",
            margin: "0 4px",
          }}
        />
        <IconButton
          icon={<Scissors size={15} />}
          tip="Split at playhead (S)"
          onClick={splitAtPlayhead}
        />
        <IconButton
          icon={<Copy size={15} />}
          tip="Duplicate (Ctrl+D)"
          onClick={duplicateSelected}
        />
        <IconButton
          icon={<Trash2 size={15} />}
          tip="Delete (Del)"
          onClick={deleteSelected}
        />
        <div style={{ flex: 1 }} />
        <IconButton
          icon={<Magnet size={15} />}
          tip="Snap"
          active={snap}
          onClick={() => useEditor.setState({ snap: !snap })}
        />
        <IconButton
          icon={<ZoomOut size={15} />}
          tip="Zoom out (−)"
          onClick={() => setZoom(pxPerFrame / 1.4)}
        />
        <input
          type="range"
          className="range"
          style={{ width: 110 }}
          min={0}
          max={100}
          value={Math.round(
            (Math.log(pxPerFrame / 0.3) / Math.log(40 / 0.3)) * 100,
          )}
          onChange={(e) =>
            setZoom(0.3 * Math.pow(40 / 0.3, Number(e.target.value) / 100))
          }
        />
        <IconButton
          icon={<ZoomIn size={15} />}
          tip="Zoom in (+)"
          onClick={() => setZoom(pxPerFrame * 1.4)}
        />
        <button className="btn ghost" onClick={fit} data-tip="Fit timeline">
          Fit
        </button>
      </div>
      <div className="tl-body">
        <div className="tl-heads" ref={headsRef}>
          <div className="tl-ruler-spacer" />
          {project.tracks.map((t, i) => (
            <TrackHead
              key={t.id}
              track={t}
              index={i}
              count={project.tracks.length}
            />
          ))}
          <div style={{ height: 40 }} />
        </div>
        <div
          className="tl-scroll"
          ref={scrollRef}
          onScroll={syncScroll}
          onPointerDown={(e) => {
            if (
              e.target === e.currentTarget ||
              (e.target as HTMLElement).dataset.trackId
            )
              select([]);
          }}
        >
          <div style={{ width, position: "relative" }}>
            <Ruler
              width={width}
              pxPerFrame={pxPerFrame}
              fps={project.fps}
              totalFrames={totalFrames}
              onPointerDown={onRulerDown}
            />
            {project.tracks.map((t) => (
              <div
                key={t.id}
                data-track-id={t.id}
                className={`tl-track${dropTrack === t.id ? " drop" : ""}`}
                style={{
                  height: TRACK_HEIGHT[t.kind],
                  opacity: t.hidden ? 0.45 : 1,
                }}
                onDragOver={(e) => {
                  if (e.dataTransfer.types.includes(DRAG_MIME)) {
                    e.preventDefault();
                    setDropTrack(t.id);
                  }
                }}
                onDragLeave={() => setDropTrack(null)}
                onDrop={(e) => onDrop(e, t)}
              >
                {project.items
                  .filter((i) => i.trackId === t.id)
                  .map((i) => (
                    <TimelineItem
                      key={i.id}
                      item={i}
                      track={t}
                      fps={project.fps}
                      pxPerFrame={pxPerFrame}
                      height={TRACK_HEIGHT[t.kind] - 6}
                      onPointerDown={onItemDown}
                      onTrimDown={onTrimDown}
                    />
                  ))}
              </div>
            ))}
            <div style={{ height: 40 }} />
            <Playhead pxPerFrame={pxPerFrame} />
            {snapLine !== null ? (
              <div
                className="tl-snapline"
                style={{ left: snapLine * pxPerFrame }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

/** Keeps linked SFX glued to the item they belong to. */
const moveLinkedSfx = (
  p: Project,
  moved: string[],
  delta: number,
  starts: Map<string, { from: number }>,
) => {
  for (const it of p.items) {
    if (
      it.type !== "audio" ||
      !it.linkedTo ||
      !moved.includes(it.linkedTo) ||
      moved.includes(it.id)
    )
      continue;
    const owner = p.items.find((x) => x.id === it.linkedTo);
    const s = starts.get(it.linkedTo);
    if (owner && s)
      it.from = Math.max(0, s.from + delta + (it.linkOffset ?? 0));
  }
};

const TrackHead: React.FC<{ track: Track; index: number; count: number }> = ({
  track,
  index,
  count,
}) => {
  const Icon = TRACK_ICONS[track.kind];
  const toggle = (key: "hidden" | "muted" | "locked") =>
    commit((p) => {
      const t = p.tracks.find((x) => x.id === track.id);
      if (t) t[key] = !t[key];
    });
  const audio =
    track.kind === "sfx" ||
    track.kind === "music" ||
    track.kind === "voice" ||
    track.kind === "video" ||
    track.kind === "broll";
  return (
    <div className="tl-head" style={{ height: TRACK_HEIGHT[track.kind] }}>
      <span className="name">
        <Icon size={13} />
        {track.name}
      </span>
      {audio ? (
        <IconButton
          size="sm"
          icon={track.muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          tip={track.muted ? "Unmute" : "Mute"}
          onClick={() => toggle("muted")}
          active={track.muted}
        />
      ) : null}
      <IconButton
        size="sm"
        icon={track.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
        tip={track.hidden ? "Show" : "Hide"}
        onClick={() => toggle("hidden")}
        active={track.hidden}
      />
      <IconButton
        size="sm"
        icon={track.locked ? <Lock size={12} /> : <Unlock size={12} />}
        tip={track.locked ? "Unlock" : "Lock"}
        onClick={() => toggle("locked")}
        active={track.locked}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          className="icon-btn"
          style={{ width: 16, height: 12 }}
          disabled={index === 0}
          onClick={() => reorderTrack(track.id, -1)}
          data-tip="Layer up"
        >
          <ArrowUp size={10} />
        </button>
        <button
          className="icon-btn"
          style={{ width: 16, height: 12 }}
          disabled={index === count - 1}
          onClick={() => reorderTrack(track.id, 1)}
          data-tip="Layer down"
        >
          <ArrowDown size={10} />
        </button>
      </div>
    </div>
  );
};

const Ruler: React.FC<{
  width: number;
  pxPerFrame: number;
  fps: number;
  totalFrames: number;
  onPointerDown: (e: React.PointerEvent) => void;
}> = ({ width, pxPerFrame, fps, totalFrames, onPointerDown }) => {
  const stepF = rulerStep(pxPerFrame, fps);
  const minor = Math.max(1, stepF / 5);
  const ticks: React.ReactNode[] = [];
  for (let f = 0; f <= totalFrames; f += minor) {
    const major = Math.round(f) % stepF === 0;
    ticks.push(
      <div
        key={f}
        style={{
          position: "absolute",
          left: f * pxPerFrame,
          bottom: 0,
          height: major ? 10 : 5,
          borderLeft: `1px solid ${major ? "#4a4c55" : "#2d2e35"}`,
        }}
      >
        {major ? (
          <span
            style={{
              position: "absolute",
              left: 4,
              bottom: 8,
              fontSize: 10,
              color: "var(--muted)",
              whiteSpace: "nowrap",
            }}
          >
            {stepF >= fps
              ? `${Math.round(f / fps)}s`
              : `${Math.floor(f / fps)}s ${Math.round(f % fps)}f`}
          </span>
        ) : null}
      </div>,
    );
  }
  return (
    <div className="tl-ruler" style={{ width }} onPointerDown={onPointerDown}>
      {ticks}
    </div>
  );
};

const Playhead: React.FC<{ pxPerFrame: number }> = ({ pxPerFrame }) => {
  const frame = usePlayback((s) => s.frame);
  return <div className="tl-playhead" style={{ left: frame * pxPerFrame }} />;
};
