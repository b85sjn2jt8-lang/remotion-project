import {
  ArrowDown,
  ArrowUp,
  AudioWaveform,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Magnet,
  MousePointer2,
  Redo2,
  Scissors,
  Slice,
  Trash2,
  Undo2,
  Unlock,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  ScanSearch,
  ArrowLeftToLine,
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
  rippleDeleteSelected,
  rippleRanges,
  splitAt,
  splitAtPlayhead,
  TRACK_ACCEPTS,
} from "../project/actions";
import { scrubTo, usePlayback } from "../project/playback";
import { silencesForClips } from "../audio/silence";
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
  video: 66,
  broll: 40,
  captions: 54,
  text: 36,
  graphics: 36,
  overlays: 36,
  voice: 44,
  sfx: 36,
  music: 44,
};

/** Empty tracks collapse so the main video track is always in view. */
const EMPTY_TRACK_HEIGHT = 24;
const trackHeight = (p: Project, t: Track) =>
  p.items.some((i) => i.trackId === t.id)
    ? TRACK_HEIGHT[t.kind]
    : EMPTY_TRACK_HEIGHT;

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
  const tool = useEditor((s) => s.tool);
  const selection = useEditor((s) => s.selection);
  const [bladeX, setBladeX] = useState<number | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const selectedVideos = project.items.filter(
    (i) => i.type === "video" && selection.includes(i.id),
  );

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

  // Keep the playhead in view while playing / seeking.
  useEffect(
    () =>
      usePlayback.subscribe((st, prev) => {
        const el = scrollRef.current;
        if (!el || st.frame === prev.frame) return;
        const x = st.frame * useEditor.getState().pxPerFrame;
        if (x < el.scrollLeft || x > el.scrollLeft + el.clientWidth - 40) {
          el.scrollLeft = Math.max(0, x - el.clientWidth * 0.2);
        }
      }),
    [],
  );

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
    scrubTo(frameFromClientX(e.clientX));
    const move = (ev: PointerEvent) => scrubTo(frameFromClientX(ev.clientX));
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
    if (st.tool === "blade") {
      // Blade: cut this clip exactly where it was clicked.
      const f = frameFromClientX(e.clientX);
      const sn = snapFrame(f, []);
      splitAt(sn.target !== null ? sn.value : f, [item.id]);
      return;
    }
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

  // Stable handler identities so memoized timeline items don't re-render on unrelated changes.
  const handlers = useRef({ onItemDown, onTrimDown });
  handlers.current = { onItemDown, onTrimDown };
  const stableItemDown = useCallback(
    (e: React.PointerEvent, item: Item) => handlers.current.onItemDown(e, item),
    [],
  );
  const stableTrimDown = useCallback(
    (e: React.PointerEvent, item: Item, side: "l" | "r") =>
      handlers.current.onTrimDown(e, item, side),
    [],
  );

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
          icon={<MousePointer2 size={15} />}
          tip="Select / move · تحديد وتحريك (V)"
          active={tool === "select"}
          onClick={() => useEditor.setState({ tool: "select" })}
        />
        <IconButton
          icon={<Slice size={15} />}
          tip="Blade · أداة القص: اضغط على المقطع مكان القص (B)"
          active={tool === "blade"}
          onClick={() =>
            useEditor.setState({ tool: tool === "blade" ? "select" : "blade" })
          }
        />
        <div className="tl-sep" />
        <button
          className="btn ghost tl-btn"
          onClick={splitAtPlayhead}
          data-tip="قص عند الخط الأحمر (S)"
        >
          <Scissors size={14} /> Split
        </button>
        <button
          className="btn ghost tl-btn"
          onClick={rippleDeleteSelected}
          disabled={!selection.length}
          data-tip="حذف المحدد وسد الفراغ — كل شيء بعده ينسحب (Shift+Del)"
        >
          <ArrowLeftToLine size={14} /> Ripple delete
        </button>
        <button
          className="btn ghost tl-btn"
          disabled={!selectedVideos.length || busy !== null}
          data-tip="يشيل الصمت من مقاطع الفيديو المحددة ويسد الفراغات"
          onClick={async () => {
            setBusy("silence");
            try {
              const p = useEditor.getState().project!;
              const ranges = await silencesForClips(
                p,
                selectedVideos.map((v) => v.id),
              );
              if (!ranges.length)
                alert("ما لقيت صمت يستاهل الحذف في المقاطع المحددة.");
              else rippleRanges(ranges);
            } finally {
              setBusy(null);
            }
          }}
        >
          <AudioWaveform size={14} />{" "}
          {busy === "silence" ? "…" : "Remove silence"}
        </button>
        <button
          className="btn ghost tl-btn"
          disabled={!selectedVideos.length}
          data-tip="زوم على المقطع المحدد (اضغط مرة ثانية للرجوع)"
          onClick={() =>
            commit((p) => {
              for (const it of p.items) {
                if (it.type !== "video" || !selection.includes(it.id)) continue;
                if (it.keyframes) delete it.keyframes.scale;
                it.transform.scale = it.transform.scale > 1.01 ? 1 : 1.15;
                it.motionPreset =
                  it.transform.scale > 1 ? "punchIn" : "punchOut";
              }
            })
          }
        >
          <ScanSearch size={14} /> Zoom
        </button>
        <IconButton
          icon={<Copy size={15} />}
          tip="Duplicate · تكرار (Ctrl+D)"
          onClick={duplicateSelected}
        />
        <IconButton
          icon={<Trash2 size={15} />}
          tip="Delete · حذف بدون سد الفراغ (Del)"
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
              height={trackHeight(project, t)}
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
            ) {
              // Click on empty timeline: deselect and move the playhead there (drag to scrub).
              select([]);
              onRulerDown(e);
            }
          }}
          onPointerMove={(e) => {
            if (useEditor.getState().tool !== "blade") return;
            setBladeX(
              frameFromClientX(e.clientX) * useEditor.getState().pxPerFrame,
            );
          }}
          onPointerLeave={() => setBladeX(null)}
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
                  height: trackHeight(project, t),
                  opacity: t.hidden ? 0.45 : 1,
                  cursor: tool === "blade" ? "crosshair" : undefined,
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
                      height={trackHeight(project, t) - 6}
                      onPointerDown={stableItemDown}
                      onTrimDown={stableTrimDown}
                    />
                  ))}
              </div>
            ))}
            <div style={{ height: 40 }} />
            <Playhead pxPerFrame={pxPerFrame} />
            {tool === "blade" && bladeX !== null ? (
              <div className="tl-blade" style={{ left: bladeX }} />
            ) : null}
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

const TrackHead: React.FC<{
  track: Track;
  index: number;
  count: number;
  height: number;
}> = ({ track, index, count, height }) => {
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
    <div className="tl-head" style={{ height }}>
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
