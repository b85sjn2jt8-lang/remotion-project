import { ZoomIn } from "lucide-react";
import React from "react";
import type { VideoItem } from "../../../../src/engine/types";
import { VIDEO_PRESETS } from "../../motion/presets";
import { commit, useEditor } from "../../project/store";

const LOOKS: { id: string; label: string; adjust: VideoItem["adjust"] }[] = [
  {
    id: "natural",
    label: "Natural (no change)",
    adjust: { contrast: 1, saturation: 1, brightness: 1 },
  },
  {
    id: "clean",
    label: "Clean +",
    adjust: { contrast: 1.04, saturation: 1.05, brightness: 1 },
  },
  {
    id: "bright",
    label: "Brighter",
    adjust: { contrast: 1.02, saturation: 1.03, brightness: 1.06 },
  },
  {
    id: "punchy",
    label: "Punchy",
    adjust: { contrast: 1.1, saturation: 1.12, brightness: 1 },
  },
  {
    id: "soft",
    label: "Soft",
    adjust: { contrast: 0.95, saturation: 0.97, brightness: 1.03 },
  },
];

const useSelectedVideos = () => {
  const project = useEditor((s) => s.project)!;
  const selection = useEditor((s) => s.selection);
  return project.items.filter(
    (i): i is VideoItem => i.type === "video" && selection.includes(i.id),
  );
};

export const EffectsTab: React.FC = () => {
  const vids = useSelectedVideos();
  const apply = (fn: (v: VideoItem) => void) =>
    commit((p) => {
      for (const it of p.items)
        if (it.type === "video" && vids.some((v) => v.id === it.id)) fn(it);
    });
  return (
    <>
      <div className="panel-head">Zoom & Reframe</div>
      <div className="panel-sub">
        {vids.length
          ? `Applies to ${vids.length} selected clip(s).`
          : "Select a video clip on the timeline first."}
      </div>
      <div className="lib-grid">
        {VIDEO_PRESETS.map((p) => (
          <div
            key={p.id}
            className="lib-card"
            style={{ opacity: vids.length ? 1 : 0.5 }}
            onClick={() =>
              vids.length &&
              apply((v) => {
                p.apply(v);
                v.motionPreset = p.id;
              })
            }
          >
            <div className="thumb" style={{ height: 50 }}>
              <ZoomIn size={20} color="var(--accent-2)" />
            </div>
            <div className="meta">
              <span className="title">{p.label}</span>
              <span className="desc">{p.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="group-title">Picture (light, non-destructive)</div>
      <div className="lib-list">
        {LOOKS.map((l) => (
          <div
            key={l.id}
            className="lib-row"
            style={{ opacity: vids.length ? 1 : 0.5 }}
            onClick={() =>
              vids.length && apply((v) => (v.adjust = { ...l.adjust }))
            }
          >
            {l.label}
          </div>
        ))}
      </div>
    </>
  );
};
