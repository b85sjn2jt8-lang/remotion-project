import { Sparkles } from "lucide-react";
import React from "react";
import { COMPONENT_REGISTRY } from "../../../../src/engine/registry";
import type { AnimationSet } from "../../../../src/engine/types";
import { MOTION_PRESETS } from "../../motion/presets";
import { commit, useEditor } from "../../project/store";
import { dragProps } from "../payloads";

export const MotionTab: React.FC = () => {
  const project = useEditor((s) => s.project)!;
  const selection = useEditor((s) => s.selection);
  const targets = project.items.filter(
    (i) => selection.includes(i.id) && "animation" in i,
  );
  return (
    <>
      <div className="panel-head">Motion presets</div>
      <div className="panel-sub">
        {targets.length
          ? `Applies to ${targets.length} selected element(s).`
          : "Select text, caption, overlay or image first."}
      </div>
      <div className="lib-grid">
        {MOTION_PRESETS.map((m) => (
          <div
            key={m.id}
            className="lib-card"
            style={{ opacity: targets.length ? 1 : 0.5 }}
            onClick={() =>
              targets.length &&
              commit((p) => {
                for (const it of p.items) {
                  if (selection.includes(it.id) && "animation" in it)
                    m.apply((it as { animation: AnimationSet }).animation);
                }
              })
            }
          >
            <div className="meta">
              <span className="title">{m.label}</span>
              <span className="desc">{m.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="group-title">Code-built scenes</div>
      <div className="lib-list">
        {Object.entries(COMPONENT_REGISTRY).map(([id, c]) => (
          <div
            key={id}
            className="lib-row"
            {...dragProps({ kind: "component", componentId: id })}
          >
            <Sparkles size={13} color="var(--gold)" />
            <span style={{ flex: 1 }}>{c.label}</span>
            <span className="chip">{(c.defaultDuration / 30).toFixed(1)}s</span>
          </div>
        ))}
      </div>
    </>
  );
};
