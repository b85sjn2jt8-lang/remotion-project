import React, { useState } from "react";
import { TRANSITIONS } from "../../../../src/engine/items/transitions";
import type { TransitionId } from "../../../../src/engine/types";
import { NumberField, Row } from "../../components/ui";
import { commit, useEditor } from "../../project/store";

export const TransitionsTab: React.FC = () => {
  const project = useEditor((s) => s.project)!;
  const selection = useEditor((s) => s.selection);
  const vids = project.items.filter(
    (i) => i.type === "video" && selection.includes(i.id),
  );
  const [dur, setDur] = useState(10);
  const current =
    vids.length === 1 && vids[0].type === "video"
      ? (vids[0].transitionIn?.type ?? "cut")
      : null;
  const apply = (type: TransitionId) =>
    commit((p) => {
      for (const it of p.items) {
        if (it.type === "video" && selection.includes(it.id)) {
          it.transitionIn =
            type === "cut" ? undefined : { type, durationInFrames: dur };
        }
      }
    });
  return (
    <>
      <div className="panel-head">Transitions</div>
      <div className="panel-sub">
        Hard cut is the default. A transition plays at the START of the selected
        clip, over the previous clip.
        {vids.length ? "" : " Select a video clip first."}
      </div>
      <div style={{ padding: "0 14px 8px" }}>
        <Row label="Duration">
          <NumberField
            value={dur}
            onChange={setDur}
            min={2}
            max={60}
            suffix="f"
            prefix="⟷"
          />
        </Row>
      </div>
      <div className="lib-grid">
        {TRANSITIONS.map((t) => (
          <div
            key={t.id}
            className={`lib-card${current === t.id ? " active" : ""}`}
            style={{ opacity: vids.length ? 1 : 0.5 }}
            onClick={() => vids.length && apply(t.id)}
          >
            <div className="thumb" style={{ height: 46 }}>
              <TransitionGlyph id={t.id} />
            </div>
            <div className="meta">
              <span className="title">{t.label}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const TransitionGlyph: React.FC<{ id: TransitionId }> = ({ id }) => (
  <div
    style={{
      display: "flex",
      width: 70,
      height: 30,
      borderRadius: 5,
      overflow: "hidden",
      border: "1px solid #3a3b44",
    }}
  >
    <div style={{ flex: 1, background: "#3b5b86" }} />
    <div
      style={{
        flex: 1,
        background:
          id === "cut"
            ? "#b0447a"
            : id === "fade"
              ? "linear-gradient(90deg,#000,#b0447a)"
              : id === "crossDissolve"
                ? "linear-gradient(90deg,#3b5b86,#b0447a)"
                : id === "blur"
                  ? "radial-gradient(#b0447a,#3b5b86)"
                  : "#b0447a",
      }}
    />
  </div>
);
