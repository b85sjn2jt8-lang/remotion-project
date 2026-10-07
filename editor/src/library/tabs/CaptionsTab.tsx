import { useShallow } from "zustand/react/shallow";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { CAPTION_PRESETS } from "../../../../src/engine/captions/presets";
import {
  applyCaptionPreset,
  applyUserCaptionPreset,
} from "../../captions/applyPreset";
import { CaptionThumb } from "../../captions/CaptionThumb";
import { AutoCaptionsButton } from "../../captions/AutoCaptions";
import { ImportSrtButton } from "../../captions/ImportSrt";
import { Segmented } from "../../components/ui";
import { deletePreset, usePresets } from "../../presets/userPresets";
import { useEditor } from "../../project/store";
import { createFromPayload } from "../payloads";

export const CaptionsTab: React.FC = () => {
  const project = useEditor((s) => s.project)!;
  const selection = useEditor((s) => s.selection);
  const selectedCaptions = project.items.filter(
    (i) => i.type === "caption" && selection.includes(i.id),
  );
  const [scope, setScope] = useState<"selected" | "all">("selected");
  const userPresets = usePresets(
    useShallow((s) => s.presets.filter((p) => p.kind === "caption")),
  );
  const captionCount = project.items.filter((i) => i.type === "caption").length;
  const effectiveScope =
    scope === "selected" && selectedCaptions.length === 0 ? "all" : scope;
  const activeId =
    selectedCaptions.length === 1 && selectedCaptions[0].type === "caption"
      ? selectedCaptions[0].presetId
      : undefined;
  const groups = ["Essentials", "Emphasis", "Motion", "Special"] as const;

  return (
    <>
      <div className="panel-head">
        Captions
        <span className="chip">{captionCount} on timeline</span>
      </div>
      <div style={{ padding: "0 14px 10px", display: "flex", gap: 6 }}>
        <button
          className="btn primary"
          style={{ flex: 1 }}
          onClick={() =>
            createFromPayload({ kind: "caption", presetId: "keyword-focus" })
          }
        >
          <Plus size={14} /> Add caption
        </button>
        <AutoCaptionsButton />
        <ImportSrtButton />
      </div>
      <div style={{ padding: "0 14px 6px" }}>
        <Segmented
          value={effectiveScope}
          onChange={setScope}
          options={[
            {
              id: "selected",
              label: `Apply to selected (${selectedCaptions.length})`,
            },
            { id: "all", label: "Apply to all" },
          ]}
        />
      </div>
      {userPresets.length ? (
        <>
          <div className="group-title">My presets</div>
          <div className="lib-grid">
            {userPresets.map((p) =>
              p.kind === "caption" ? (
                <div
                  key={p.id}
                  className={`lib-card${activeId === p.id ? " active" : ""}`}
                  onClick={() => applyUserCaptionPreset(p, effectiveScope)}
                >
                  <div className="thumb">
                    <CaptionThumb
                      style={p.data.style}
                      animation={p.data.animation}
                      global={project.global}
                    />
                  </div>
                  <div
                    className="meta"
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <span className="title" style={{ flex: 1 }}>
                      {p.name}
                    </span>
                    <button
                      className="icon-btn sm"
                      data-tip="Delete preset"
                      onClick={(e) => {
                        e.stopPropagation();
                        void deletePreset(p.id);
                      }}
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </>
      ) : null}
      {groups.map((g) => (
        <React.Fragment key={g}>
          <div className="group-title">{g}</div>
          <div className="lib-grid">
            {CAPTION_PRESETS.filter((p) => p.group === g).map((p) => (
              <div
                key={p.id}
                className={`lib-card${activeId === p.id ? " active" : ""}`}
                onClick={() => applyCaptionPreset(p, effectiveScope)}
                data-tip={p.description}
              >
                <div className="thumb">
                  <CaptionThumb
                    style={p.style(project.global)}
                    animation={p.animation(project.global)}
                    global={project.global}
                  />
                </div>
                <div className="meta">
                  <span className="title">{p.name}</span>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
