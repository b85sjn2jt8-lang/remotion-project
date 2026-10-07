import { useShallow } from "zustand/react/shallow";
import { Link2, Music, Play, Square, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createAudioItem } from "../../../../src/engine/factory";
import { assetUrl } from "../../../../src/engine/assets";
import { Toggle } from "../../components/ui";
import { uploadFile } from "../../media/upload";
import { addItem, trackFor } from "../../project/actions";
import { usePlayback } from "../../project/playback";
import { useEditor } from "../../project/store";
import { dragProps } from "../payloads";

type Lib = {
  sfx: { src: string; durationInFrames: number }[];
  music: { src: string; durationInFrames: number }[];
};

export const AudioTab: React.FC = () => {
  const [lib, setLib] = useState<Lib>({ sfx: [], music: [] });
  const [link, setLink] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const media = useEditor(
    useShallow((s) => s.project!.media.filter((m) => m.kind === "audio")),
  );
  const selection = useEditor((s) => s.selection);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/library")
      .then((r) => r.json())
      .then(setLib)
      .catch(() => undefined);
  }, []);

  const preview = (src: string) => {
    audio.current?.pause();
    if (playing === src) {
      setPlaying(null);
      return;
    }
    const a = new Audio(assetUrl(src));
    a.volume = 0.6;
    a.onended = () => setPlaying(null);
    void a.play();
    audio.current = a;
    setPlaying(src);
  };

  /** Adds an SFX at the playhead, linked to the selected element so it moves with it. */
  const addSfx = (src: string, durationInFrames: number) => {
    const p = useEditor.getState().project!;
    const frame = usePlayback.getState().frame;
    const it = createAudioItem({
      trackId: trackFor(p, "sfx"),
      role: "sfx",
      src,
      from: frame,
      durationInFrames,
    });
    const owner = p.items.find(
      (i) => i.id === selection[0] && i.type !== "audio",
    );
    if (link && owner) {
      it.linkedTo = owner.id;
      it.linkOffset = frame - owner.from;
      it.name = `${it.name} → ${owner.name}`;
    }
    addItem(it);
  };

  const name = (src: string) =>
    src
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, "")
      .replace(/-/g, " ");

  return (
    <>
      <div className="panel-head">Audio</div>
      <div
        style={{
          padding: "0 14px 6px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Link2 size={13} color="var(--muted)" />
        <span className="hint" style={{ flex: 1 }}>
          Link new SFX to the selected element (moves with it)
        </span>
        <Toggle value={link} onChange={setLink} />
      </div>
      <div className="group-title">Sound effects</div>
      <div className="lib-list">
        {lib.sfx.map((s) => (
          <div
            key={s.src}
            className="lib-row"
            {...dragProps({
              kind: "audio",
              role: "sfx",
              src: s.src,
              durationInFrames: s.durationInFrames,
            })}
            onClick={() => addSfx(s.src, s.durationInFrames)}
          >
            <button
              className="icon-btn sm"
              onClick={(e) => {
                e.stopPropagation();
                preview(s.src);
              }}
              data-tip="Preview"
            >
              {playing === s.src ? <Square size={11} /> : <Play size={11} />}
            </button>
            <span style={{ flex: 1, textTransform: "capitalize" }}>
              {name(s.src)}
            </span>
            <span className="chip">
              {(s.durationInFrames / 30).toFixed(1)}s
            </span>
          </div>
        ))}
      </div>
      <div className="group-title">Music & voice</div>
      <div className="lib-list">
        {[
          ...lib.music.map((m) => ({
            src: m.src,
            durationInFrames: m.durationInFrames,
            label: name(m.src),
          })),
          ...media.map((m) => ({
            src: m.src,
            durationInFrames: m.durationInFrames ?? 300,
            label: m.name,
          })),
        ].map((m) => (
          <div
            key={m.src}
            className="lib-row"
            {...dragProps({
              kind: "audio",
              role: "music",
              src: m.src,
              durationInFrames: m.durationInFrames,
            })}
          >
            <button
              className="icon-btn sm"
              onClick={(e) => {
                e.stopPropagation();
                preview(m.src);
              }}
            >
              {playing === m.src ? <Square size={11} /> : <Play size={11} />}
            </button>
            <Music size={13} />
            <span style={{ flex: 1 }}>{m.label}</span>
          </div>
        ))}
        <button className="btn" onClick={() => ref.current?.click()}>
          <Upload size={13} /> Upload music / voice-over
        </button>
        <input
          ref={ref}
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const a = await uploadFile(f);
            const p = useEditor.getState().project!;
            addItem(
              createAudioItem({
                trackId: trackFor(p, "music"),
                role: "music",
                src: a.src,
                from: 0,
                durationInFrames: a.durationInFrames ?? p.durationInFrames,
              }),
            );
          }}
        />
        <div className="hint">
          Music is added at 15% volume with fades — keep it under the voice.
        </div>
      </div>
    </>
  );
};
