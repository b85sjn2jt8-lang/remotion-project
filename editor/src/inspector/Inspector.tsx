import { useShallow } from "zustand/react/shallow";
import { Palette, Save, Trash2, Upload, Wand2 } from "lucide-react";
import React, { useRef } from "react";
import type {
  CaptionItem,
  GlobalStyles,
  TextItem,
} from "../../../src/engine/types";
import {
  ColorField,
  NumberField,
  Row,
  Section,
  TextInput,
} from "../components/ui";
import { refreshFonts, useFonts } from "../media/fonts";
import { deletePreset, savePreset, usePresets } from "../presets/userPresets";
import { commit, useEditor } from "../project/store";
import { CaptionInspector } from "./CaptionInspector";
import { FontSelect, ShadowFields } from "./common";
import {
  AudioInspector,
  ComponentInspector,
  MediaBoxInspector,
  OverlayInspector,
  TextInspector,
  VideoInspector,
} from "./ItemInspectors";

export const Inspector: React.FC = () => {
  const project = useEditor((s) => s.project)!;
  const selection = useEditor((s) => s.selection);
  const showGlobal = useEditor((s) => s.showGlobal);
  const items = project.items.filter((i) => selection.includes(i.id));

  if (showGlobal || items.length === 0) {
    return (
      <div className="inspector">
        <div className="panel-head">
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Palette size={14} /> Brand & project
          </span>
        </div>
        <GlobalStylesPanel />
        <ProjectPanel />
      </div>
    );
  }
  if (items.length > 1) {
    return (
      <div className="inspector">
        <div className="panel-head">{items.length} items selected</div>
        <div className="panel-sub">
          Move them together on the timeline or canvas. Apply caption styles /
          motion presets from the left panel.
        </div>
        <Section title="Shift timing">
          <div className="grid2">
            <button
              className="btn"
              onClick={() =>
                commit((p) =>
                  p.items.forEach(
                    (i) =>
                      selection.includes(i.id) &&
                      (i.from = Math.max(0, i.from - 1)),
                  ),
                )
              }
            >
              −1 frame
            </button>
            <button
              className="btn"
              onClick={() =>
                commit((p) =>
                  p.items.forEach(
                    (i) => selection.includes(i.id) && (i.from += 1),
                  ),
                )
              }
            >
              +1 frame
            </button>
          </div>
        </Section>
      </div>
    );
  }
  const item = items[0];
  return (
    <div className="inspector" key={item.id}>
      <div className="panel-head">
        <TextInput
          value={item.name}
          onChange={(v) =>
            commit((p) => {
              const it = p.items.find((i) => i.id === item.id);
              if (it) it.name = v;
            })
          }
        />
      </div>
      {item.type === "caption" && <CaptionInspector item={item} />}
      {item.type === "text" && <TextInspector item={item} />}
      {item.type === "video" && <VideoInspector item={item} />}
      {(item.type === "image" || item.type === "brollVideo") && (
        <MediaBoxInspector item={item} />
      )}
      {item.type === "overlay" && <OverlayInspector item={item} />}
      {item.type === "audio" && <AudioInspector item={item} />}
      {item.type === "component" && <ComponentInspector item={item} />}
    </div>
  );
};

/** Global brand styles. "Apply" pushes them onto every caption / text in the project. */
const GlobalStylesPanel: React.FC = () => {
  const g = useEditor((s) => s.project!.global);
  const brandPresets = usePresets(
    useShallow((s) => s.presets.filter((p) => p.kind === "brand")),
  );
  const set = (fn: (g: GlobalStyles) => void) => commit((p) => fn(p.global));

  const applyToCaptions = () =>
    commit((p) => {
      for (const c of p.items.filter(
        (i): i is CaptionItem => i.type === "caption",
      )) {
        c.style.fontFamily = p.global.captionFont;
        c.style.textColor = p.global.textColor;
        c.style.highlightColor = p.global.accentColor;
        c.style.emphasisColor = p.global.accentColor;
        c.style.strokeColor = p.global.defaultStrokeColor;
        c.style.strokeWidth = p.global.defaultStrokeWidth;
        c.style.shadow = { ...p.global.defaultShadow };
        c.transform.y = p.global.captionY;
      }
    });
  const applyToText = () =>
    commit((p) => {
      for (const t of p.items.filter((i): i is TextItem => i.type === "text")) {
        t.style.fontFamily = p.global.primaryFont;
      }
    });

  return (
    <Section
      title="Global brand styles"
      right={
        <button
          className="icon-btn sm"
          data-tip="Save brand as preset"
          onClick={async () => {
            const name = prompt("Brand preset name (e.g. “Rukn”)", "My Brand");
            if (name)
              await savePreset({
                name,
                kind: "brand",
                data: structuredClone(g),
              });
          }}
        >
          <Save size={12} />
        </button>
      }
    >
      <Row label="Primary font">
        <FontSelect
          value={g.primaryFont}
          onChange={(f) => set((x) => (x.primaryFont = f))}
        />
      </Row>
      <Row label="Caption font">
        <FontSelect
          value={g.captionFont}
          onChange={(f) => set((x) => (x.captionFont = f))}
        />
      </Row>
      <Row label="Primary">
        <ColorField
          value={g.primaryColor}
          onChange={(v) => set((x) => (x.primaryColor = v))}
        />
      </Row>
      <Row label="Accent">
        <ColorField
          value={g.accentColor}
          onChange={(v) => set((x) => (x.accentColor = v))}
        />
      </Row>
      <Row label="Text">
        <ColorField
          value={g.textColor}
          onChange={(v) => set((x) => (x.textColor = v))}
        />
      </Row>
      <Row label="Negative">
        <ColorField
          value={g.negativeColor}
          onChange={(v) => set((x) => (x.negativeColor = v))}
        />
      </Row>
      <Row label="Caption Y">
        <NumberField
          value={g.captionY}
          min={220}
          max={1480}
          suffix="px"
          onChange={(v) => set((x) => (x.captionY = v))}
        />
      </Row>
      <Row label="Stroke">
        <div className="grid2">
          <ColorField
            value={g.defaultStrokeColor}
            onChange={(v) => set((x) => (x.defaultStrokeColor = v))}
          />
          <NumberField
            prefix="W"
            value={g.defaultStrokeWidth}
            min={0}
            max={30}
            onChange={(v) => set((x) => (x.defaultStrokeWidth = v))}
          />
        </div>
      </Row>
      <ShadowFields
        value={g.defaultShadow}
        onChange={(fn) => set((x) => fn(x.defaultShadow))}
      />
      <div className="grid2">
        <button className="btn primary" onClick={applyToCaptions}>
          <Wand2 size={13} /> Apply to captions
        </button>
        <button className="btn" onClick={applyToText}>
          Apply font to text
        </button>
      </div>
      {brandPresets.length ? (
        <>
          <div className="hint">Brand presets</div>
          {brandPresets.map((b) =>
            b.kind === "brand" ? (
              <div
                key={b.id}
                className="lib-row"
                onClick={() =>
                  commit((p) => (p.global = structuredClone(b.data)))
                }
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: b.data.accentColor,
                  }}
                />
                <span style={{ flex: 1 }}>{b.name}</span>
                <button
                  className="icon-btn sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    void deletePreset(b.id);
                  }}
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ) : null,
          )}
        </>
      ) : null}
    </Section>
  );
};

const ProjectPanel: React.FC = () => {
  const p = useEditor((s) => s.project)!;
  const fonts = useFonts((s) => s.files);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <Section title="Project">
        <Row label="Format">
          <span className="hint">
            {p.width}×{p.height} · {p.fps} fps ·{" "}
            {(p.durationInFrames / p.fps).toFixed(1)}s
          </span>
        </Row>
        <Row label="Background">
          <ColorField
            value={p.backgroundColor}
            onChange={(v) => commit((x) => (x.backgroundColor = v))}
          />
        </Row>
        <Row label="Items">
          <span className="hint">
            {p.items.length} items ·{" "}
            {p.items.filter((i) => i.type === "caption").length} captions
          </span>
        </Row>
      </Section>
      <Section title="Fonts" defaultOpen={false}>
        <div className="hint">
          Fonts in public/fonts are available everywhere. Name files like
          Family-Weight.woff2 (e.g. Cairo-800.woff2).
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {[...new Set(fonts.map((f) => f.family))].map((f) => (
            <span key={f} className="chip" style={{ fontFamily: `"${f}"` }}>
              {f}
            </span>
          ))}
        </div>
        <button className="btn" onClick={() => ref.current?.click()}>
          <Upload size={13} /> Add font file
        </button>
        <input
          ref={ref}
          type="file"
          accept=".woff2,.woff,.ttf,.otf"
          style={{ display: "none" }}
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            await fetch(`/api/fonts?name=${encodeURIComponent(f.name)}`, {
              method: "POST",
              body: f,
            });
            await refreshFonts();
          }}
        />
      </Section>
    </>
  );
};
