import { useShallow } from "zustand/react/shallow";
import React from "react";
import { TEXT_PRESETS } from "../../../../src/engine/text/presets";
import { usePresets } from "../../presets/userPresets";
import { createTextItem } from "../../../../src/engine/factory";
import { addItem, trackFor } from "../../project/actions";
import { usePlayback } from "../../project/playback";
import { useEditor } from "../../project/store";
import { dragProps } from "../payloads";

export const TextTab: React.FC = () => {
  const g = useEditor((s) => s.project!.global);
  const userPresets = usePresets(
    useShallow((s) => s.presets.filter((p) => p.kind === "text")),
  );
  return (
    <>
      <div className="panel-head">Text</div>
      <div className="panel-sub">
        Click to add at the playhead, or drag onto the timeline.
      </div>
      <div className="lib-list">
        {TEXT_PRESETS.map((p) => {
          const s = p.style(g);
          return (
            <div
              key={p.variant}
              className="lib-row"
              {...dragProps({ kind: "text", variant: p.variant })}
            >
              <div
                dir="auto"
                style={{
                  fontFamily: `"${s.fontFamily}"`,
                  fontWeight: s.fontWeight,
                  fontSize: Math.min(26, Math.max(13, s.fontSize / 4)),
                  color: s.color,
                  background: s.background.enabled
                    ? s.background.color
                    : undefined,
                  borderRadius: s.background.enabled
                    ? Math.min(12, s.background.radius / 3)
                    : 0,
                  padding: s.background.enabled ? "2px 10px" : 0,
                  WebkitTextStroke: s.strokeWidth
                    ? `1px ${s.strokeColor}`
                    : undefined,
                  lineHeight: 1.3,
                }}
              >
                {p.sample}
              </div>
              <div style={{ flex: 1 }} />
              <span className="chip">{p.label}</span>
            </div>
          );
        })}
      </div>
      {userPresets.length ? (
        <>
          <div className="group-title">My text presets</div>
          <div className="lib-list">
            {userPresets.map((p) =>
              p.kind === "text" ? (
                <div
                  key={p.id}
                  className="lib-row"
                  onClick={() => {
                    const proj = useEditor.getState().project!;
                    const t = createTextItem(proj, {
                      trackId: trackFor(proj, "text"),
                      from: usePlayback.getState().frame,
                      variant: "heading",
                    });
                    t.style = structuredClone(p.data.style);
                    t.animation = structuredClone(p.data.animation);
                    t.name = p.name;
                    addItem(t);
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                </div>
              ) : null,
            )}
          </div>
        </>
      ) : null}
    </>
  );
};
