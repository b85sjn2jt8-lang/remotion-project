import { Player, type PlayerRef } from "@remotion/player";
import {
  ChevronFirst,
  ChevronLast,
  Grid2x2,
  Magnet,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Smartphone,
} from "lucide-react";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ProjectComposition } from "../../../src/engine/ProjectComposition";
import { IconButton, Select } from "../components/ui";
import {
  setProxyEnabled,
  useProxies,
  useProxyGeneration,
} from "../media/proxies";
import { seek, step, togglePlay, usePlayback } from "../project/playback";
import { useEditor, type SafeZoneMode } from "../project/store";
import { formatTimecode } from "../timeline/timeMath";
import { SafeZoneOverlay } from "./SafeZones";
import { SelectionOverlay } from "./SelectionOverlay";

export const Preview: React.FC = () => {
  const project = useEditor((s) => s.project)!;
  const safeZone = useEditor((s) => s.safeZone);
  const guides = useEditor((s) => s.guides);
  const snap = useEditor((s) => s.snap);
  const playerRef = useRef<PlayerRef>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 400, h: 700 });
  useProxyGeneration();
  const proxyOn = useProxies((s) => s.enabled);
  const proxyMap = useProxies((s) => s.map);
  const proxyPending = useProxies((s) => s.pending.length);
  // Remount the player when the media sources switch (original ↔ proxy).
  const playerKey = proxyOn ? `p:${Object.values(proxyMap).join(",")}` : "orig";

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setStage({ w: el.clientWidth, h: el.clientHeight }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Register player + mirror its frame into the playback store.
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    usePlayback.setState({ player: p });
    p.seekTo(usePlayback.getState().frame);
    const onFrame = (e: { detail: { frame: number } }) =>
      usePlayback.setState({ frame: e.detail.frame });
    const onPlay = () => usePlayback.setState({ playing: true });
    const onPause = () => usePlayback.setState({ playing: false });
    p.addEventListener("frameupdate", onFrame);
    p.addEventListener("seeked", onFrame);
    p.addEventListener("play", onPlay);
    p.addEventListener("pause", onPause);
    return () => {
      p.removeEventListener("frameupdate", onFrame);
      p.removeEventListener("seeked", onFrame);
      p.removeEventListener("play", onPlay);
      p.removeEventListener("pause", onPause);
    };
  }, [playerKey]);

  const pad = 28;
  const scale = Math.min(
    (stage.w - pad * 2) / project.width,
    (stage.h - pad * 2) / project.height,
  );
  const cw = Math.max(1, project.width * scale);
  const ch = Math.max(1, project.height * scale);

  const inputProps = useMemo(
    () => ({ project, proxies: proxyOn ? proxyMap : undefined }),
    [project, proxyOn, proxyMap],
  );

  return (
    <div className="center">
      <div className="preview-bar">
        <span className="chip">
          {project.width}×{project.height} · {project.fps}fps
        </span>
        <button
          className={`btn ghost`}
          style={{
            height: 24,
            fontSize: 11,
            color: proxyOn ? "var(--accent-2)" : "var(--muted)",
          }}
          onClick={() => setProxyEnabled(!proxyOn)}
          data-tip="Preview with lightweight proxy media (render always uses originals)"
          data-tip-pos="bottom"
        >
          Proxy {proxyOn ? "on" : "off"}
          {proxyPending ? " · building…" : ""}
        </button>
        <div style={{ flex: 1 }} />
        <Smartphone size={14} color="var(--muted)" />
        <div style={{ width: 150 }}>
          <Select<SafeZoneMode>
            value={safeZone}
            onChange={(v) => useEditor.setState({ safeZone: v })}
            options={[
              { id: "off", label: "Safe zone: off" },
              { id: "tiktok", label: "TikTok safe zone" },
              { id: "reels", label: "Reels safe zone" },
              { id: "shorts", label: "Shorts safe zone" },
            ]}
          />
        </div>
        <IconButton
          icon={<Grid2x2 size={15} />}
          tip="Guides"
          tipPos="bottom"
          active={guides}
          onClick={() => useEditor.setState({ guides: !guides })}
        />
        <IconButton
          icon={<Magnet size={15} />}
          tip="Snapping"
          tipPos="bottom"
          active={snap}
          onClick={() => useEditor.setState({ snap: !snap })}
        />
      </div>
      <div className="preview-stage" ref={stageRef}>
        <div className="canvas-box" style={{ width: cw, height: ch }}>
          <Player
            key={playerKey}
            ref={playerRef}
            component={ProjectComposition}
            inputProps={inputProps}
            durationInFrames={Math.max(1, project.durationInFrames)}
            fps={project.fps}
            compositionWidth={project.width}
            compositionHeight={project.height}
            style={{ width: cw, height: ch }}
            controls={false}
            clickToPlay={false}
            doubleClickToFullscreen={false}
            spaceKeyToPlayOrPause={false}
            acknowledgeRemotionLicense
            bufferStateDelayInMilliseconds={300}
          />
          {guides ? (
            <Guides scale={scale} w={project.width} h={project.height} />
          ) : null}
          {safeZone !== "off" ? (
            <SafeZoneOverlay mode={safeZone} scale={scale} />
          ) : null}
          <SelectionOverlay scale={scale} />
        </div>
      </div>
      <Transport />
    </div>
  );
};

const Guides: React.FC<{ scale: number; w: number; h: number }> = ({
  scale,
  w,
  h,
}) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        left: (w / 2) * scale,
        top: 0,
        bottom: 0,
        borderLeft: "1px dashed rgba(255,255,255,.12)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: (h / 2) * scale,
        left: 0,
        right: 0,
        borderTop: "1px dashed rgba(255,255,255,.12)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 90 * scale,
        right: 90 * scale,
        top: 90 * scale,
        bottom: 90 * scale,
        border: "1px dashed rgba(124,108,255,.25)",
        borderRadius: 4,
      }}
    />
  </div>
);

const Transport: React.FC = () => {
  const frame = usePlayback((s) => s.frame);
  const playing = usePlayback((s) => s.playing);
  const fps = useEditor((s) => s.project?.fps ?? 30);
  const duration = useEditor((s) => s.project?.durationInFrames ?? 0);
  return (
    <div className="transport">
      <span className="timecode">{formatTimecode(frame, fps)}</span>
      <IconButton
        icon={<ChevronFirst size={16} />}
        tip="Go to start (Home)"
        onClick={() => seek(0)}
      />
      <IconButton
        icon={<SkipBack size={15} />}
        tip="Previous frame (←)"
        onClick={() => step(-1)}
      />
      <button
        className="icon-btn"
        style={{
          width: 36,
          height: 36,
          background: "var(--panel-3)",
          borderRadius: 99,
        }}
        onClick={togglePlay}
        data-tip="Play / Pause (Space)"
      >
        {playing ? (
          <Pause size={17} fill="currentColor" />
        ) : (
          <Play size={17} fill="currentColor" />
        )}
      </button>
      <IconButton
        icon={<SkipForward size={15} />}
        tip="Next frame (→)"
        onClick={() => step(1)}
      />
      <IconButton
        icon={<ChevronLast size={16} />}
        tip="Go to end (End)"
        onClick={() => seek(duration - 1)}
      />
      <span className="timecode" style={{ color: "var(--muted)" }}>
        {formatTimecode(duration, fps)}
      </span>
    </div>
  );
};
