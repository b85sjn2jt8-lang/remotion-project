import { Save } from "lucide-react";
import React from "react";
import { TEXT_PRESETS } from "../../../src/engine/text/presets";
import { TRANSITIONS } from "../../../src/engine/items/transitions";
import type {
  AudioItem,
  BrollVideoItem,
  ComponentItem,
  Crop,
  ImageItem,
  OverlayItem,
  TextItem,
  TextStyle,
  TextVariant,
  TransitionId,
  VideoItem,
} from "../../../src/engine/types";
import { COMPONENT_REGISTRY } from "../../../src/engine/registry";
import {
  ColorField,
  IconButton,
  NumberField,
  Row,
  Section,
  Segmented,
  Select,
  SliderField,
  TextArea,
  TextInput,
  Toggle,
} from "../components/ui";
import { VIDEO_PRESETS } from "../motion/presets";
import { savePreset } from "../presets/userPresets";
import { updateItem, useEditor } from "../project/store";
import {
  AnimationSection,
  AnimRow,
  BackgroundFields,
  FontSelect,
  KeyframesSection,
  ShadowFields,
  TimingSection,
  TransformSection,
  WEIGHTS,
} from "./common";

// ---------------- Text ----------------
export const TextInspector: React.FC<{ item: TextItem }> = ({ item }) => {
  const setStyle = (fn: (s: TextStyle) => void) =>
    updateItem<TextItem>(item.id, (t) => fn(t.style));
  const g = useEditor((s) => s.project!.global);
  return (
    <>
      <Section
        title="Text"
        right={
          <IconButton
            size="sm"
            icon={<Save size={12} />}
            tip="Save style as preset"
            onClick={async () => {
              const name = prompt(
                "Text preset name (e.g. “Loay Hook”)",
                "My Text",
              );
              if (name)
                await savePreset({
                  name,
                  kind: "text",
                  data: {
                    style: structuredClone(item.style),
                    animation: structuredClone(item.animation),
                  },
                });
            }}
          />
        }
      >
        <TextArea
          value={item.text}
          onChange={(v) => updateItem<TextItem>(item.id, (t) => (t.text = v))}
        />
        <Row label="Type">
          <Select<TextVariant>
            value={item.variant}
            options={TEXT_PRESETS.map((p) => ({
              id: p.variant,
              label: p.label,
            }))}
            onChange={(v) =>
              updateItem<TextItem>(item.id, (t) => {
                const p = TEXT_PRESETS.find((x) => x.variant === v)!;
                t.variant = v;
                t.style = p.style(g);
                t.animation = p.animation();
              })
            }
          />
        </Row>
      </Section>
      <Section title="Style">
        <Row label="Font">
          <FontSelect
            value={item.style.fontFamily}
            onChange={(f) => setStyle((s) => (s.fontFamily = f))}
          />
        </Row>
        <div className="grid2">
          <NumberField
            prefix="Size"
            value={item.style.fontSize}
            min={12}
            max={300}
            onChange={(v) => setStyle((s) => (s.fontSize = v))}
          />
          <Select
            value={String(item.style.fontWeight)}
            options={WEIGHTS}
            onChange={(v) => setStyle((s) => (s.fontWeight = Number(v)))}
          />
        </div>
        <div className="grid2">
          <NumberField
            prefix="Line"
            value={item.style.lineHeight}
            step={0.05}
            min={0.7}
            max={2.5}
            onChange={(v) => setStyle((s) => (s.lineHeight = v))}
          />
          <NumberField
            prefix="Track"
            value={item.style.letterSpacing}
            step={0.01}
            min={-0.2}
            max={1}
            onChange={(v) => setStyle((s) => (s.letterSpacing = v))}
          />
        </div>
        <Row label="Align">
          <Segmented<TextStyle["textAlign"]>
            value={item.style.textAlign}
            onChange={(v) => setStyle((s) => (s.textAlign = v))}
            options={[
              { id: "right", label: "Right" },
              { id: "center", label: "Center" },
              { id: "left", label: "Left" },
            ]}
          />
        </Row>
        <Row label="Max width">
          <NumberField
            value={item.style.maxWidth}
            min={100}
            max={1080}
            suffix="px"
            onChange={(v) => setStyle((s) => (s.maxWidth = v))}
          />
        </Row>
        <Row label="Color">
          <ColorField
            value={item.style.color}
            onChange={(v) => setStyle((s) => (s.color = v))}
          />
        </Row>
        <Row label="Stroke">
          <div className="grid2">
            <ColorField
              value={item.style.strokeColor}
              onChange={(v) => setStyle((s) => (s.strokeColor = v))}
            />
            <NumberField
              prefix="W"
              value={item.style.strokeWidth}
              min={0}
              max={30}
              onChange={(v) => setStyle((s) => (s.strokeWidth = v))}
            />
          </div>
        </Row>
        <ShadowFields
          value={item.style.shadow}
          onChange={(fn) => setStyle((s) => fn(s.shadow))}
        />
        <BackgroundFields
          value={item.style.background}
          onChange={(fn) => setStyle((s) => fn(s.background))}
        />
      </Section>
      <TransformSection item={item} />
      <AnimationSection item={item} />
      <TimingSection item={item} />
      <KeyframesSection item={item} />
    </>
  );
};

// ---------------- Video ----------------
const CropFields: React.FC<{
  crop: Crop;
  onChange: (fn: (c: Crop) => void) => void;
}> = ({ crop, onChange }) => (
  <div className="grid2">
    <NumberField
      prefix="T"
      suffix="%"
      value={crop.top}
      min={0}
      max={90}
      onChange={(v) => onChange((c) => (c.top = v))}
    />
    <NumberField
      prefix="B"
      suffix="%"
      value={crop.bottom}
      min={0}
      max={90}
      onChange={(v) => onChange((c) => (c.bottom = v))}
    />
    <NumberField
      prefix="L"
      suffix="%"
      value={crop.left}
      min={0}
      max={90}
      onChange={(v) => onChange((c) => (c.left = v))}
    />
    <NumberField
      prefix="R"
      suffix="%"
      value={crop.right}
      min={0}
      max={90}
      onChange={(v) => onChange((c) => (c.right = v))}
    />
  </div>
);

const AudioFields: React.FC<{
  item: {
    id: string;
    volume: number;
    fadeIn: number;
    fadeOut: number;
    muted: boolean;
  };
}> = ({ item }) => (
  <>
    <Row label="Volume">
      <SliderField
        value={item.volume}
        min={0}
        max={2}
        step={0.01}
        display={100}
        suffix="%"
        onChange={(v) => updateItem<AudioItem>(item.id, (a) => (a.volume = v))}
      />
    </Row>
    <div className="grid2">
      <NumberField
        prefix="Fade in"
        suffix="f"
        value={item.fadeIn}
        min={0}
        max={300}
        onChange={(v) => updateItem<AudioItem>(item.id, (a) => (a.fadeIn = v))}
      />
      <NumberField
        prefix="Fade out"
        suffix="f"
        value={item.fadeOut}
        min={0}
        max={300}
        onChange={(v) => updateItem<AudioItem>(item.id, (a) => (a.fadeOut = v))}
      />
    </div>
    <Row label="Mute">
      <Toggle
        value={item.muted}
        onChange={(v) => updateItem<AudioItem>(item.id, (a) => (a.muted = v))}
      />
    </Row>
  </>
);

export const VideoInspector: React.FC<{ item: VideoItem }> = ({ item }) => (
  <>
    <Section title="Zoom & reframe">
      <div
        className="lib-grid"
        style={{ padding: 0, gridTemplateColumns: "1fr 1fr 1fr" }}
      >
        {VIDEO_PRESETS.map((p) => (
          <button
            key={p.id}
            className={`btn${item.motionPreset === p.id ? " primary" : ""}`}
            style={{
              height: 26,
              padding: "0 4px",
              justifyContent: "center",
              fontSize: 10.5,
            }}
            data-tip={p.desc}
            onClick={() =>
              updateItem<VideoItem>(item.id, (v) => {
                p.apply(v);
                v.motionPreset = p.id;
              })
            }
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="hint">
        Drag the video in the preview to reframe; corner handles zoom.
      </div>
      <div className="grid2">
        <NumberField
          prefix="Anchor X"
          suffix="%"
          value={item.origin.x}
          min={0}
          max={100}
          onChange={(v) =>
            updateItem<VideoItem>(item.id, (x) => (x.origin.x = v))
          }
        />
        <NumberField
          prefix="Anchor Y"
          suffix="%"
          value={item.origin.y}
          min={0}
          max={100}
          onChange={(v) =>
            updateItem<VideoItem>(item.id, (x) => (x.origin.y = v))
          }
        />
      </div>
    </Section>
    <TransformSection
      item={item}
      props={["scale", "x", "y", "rotation", "opacity", "radius"]}
    />
    <Section title="Crop & fit" defaultOpen={false}>
      <Row label="Fit">
        <Segmented<VideoItem["fit"]>
          value={item.fit}
          onChange={(v) => updateItem<VideoItem>(item.id, (x) => (x.fit = v))}
          options={[
            { id: "cover", label: "Fill" },
            { id: "contain", label: "Fit" },
          ]}
        />
      </Row>
      <CropFields
        crop={item.crop}
        onChange={(fn) => updateItem<VideoItem>(item.id, (x) => fn(x.crop))}
      />
    </Section>
    <Section title="Picture" defaultOpen={false}>
      <Row label="Contrast">
        <SliderField
          value={item.adjust.contrast}
          min={0.7}
          max={1.4}
          step={0.01}
          display={100}
          suffix="%"
          onChange={(v) =>
            updateItem<VideoItem>(item.id, (x) => (x.adjust.contrast = v))
          }
        />
      </Row>
      <Row label="Saturation">
        <SliderField
          value={item.adjust.saturation}
          min={0}
          max={1.6}
          step={0.01}
          display={100}
          suffix="%"
          onChange={(v) =>
            updateItem<VideoItem>(item.id, (x) => (x.adjust.saturation = v))
          }
        />
      </Row>
      <Row label="Brightness">
        <SliderField
          value={item.adjust.brightness}
          min={0.6}
          max={1.4}
          step={0.01}
          display={100}
          suffix="%"
          onChange={(v) =>
            updateItem<VideoItem>(item.id, (x) => (x.adjust.brightness = v))
          }
        />
      </Row>
    </Section>
    <Section title="Transition in">
      <Row label="Type">
        <Select<TransitionId>
          value={item.transitionIn?.type ?? "cut"}
          options={TRANSITIONS}
          onChange={(t) =>
            updateItem<VideoItem>(
              item.id,
              (x) =>
                (x.transitionIn =
                  t === "cut"
                    ? undefined
                    : {
                        type: t,
                        durationInFrames:
                          x.transitionIn?.durationInFrames ?? 10,
                      }),
            )
          }
        />
      </Row>
      {item.transitionIn ? (
        <Row label="Duration">
          <NumberField
            value={item.transitionIn.durationInFrames}
            min={2}
            max={60}
            suffix="f"
            onChange={(v) =>
              updateItem<VideoItem>(
                item.id,
                (x) =>
                  x.transitionIn &&
                  (x.transitionIn.durationInFrames = Math.round(v)),
              )
            }
          />
        </Row>
      ) : null}
    </Section>
    <Section title="Audio">
      <AudioFields item={item} />
    </Section>
    <Section title="Source" defaultOpen={false}>
      <Row label="File">
        <span className="hint">{item.src}</span>
      </Row>
      <Row label="Source in">
        <NumberField
          value={item.trimBefore}
          min={0}
          suffix="f"
          onChange={(v) =>
            updateItem<VideoItem>(
              item.id,
              (x) => (x.trimBefore = Math.max(0, Math.round(v))),
            )
          }
        />
      </Row>
    </Section>
    <TimingSection item={item} />
    <KeyframesSection item={item} />
  </>
);

// ---------------- B-roll (image / video) ----------------
export const MediaBoxInspector: React.FC<{
  item: ImageItem | BrollVideoItem;
}> = ({ item }) => {
  const upd = (fn: (x: ImageItem | BrollVideoItem) => void) =>
    updateItem<ImageItem | BrollVideoItem>(item.id, fn);
  return (
    <>
      <Section title={item.type === "image" ? "Image" : "B-roll video"}>
        <Row label="Fit">
          <Segmented
            value={item.fit}
            onChange={(v) => upd((x) => (x.fit = v))}
            options={[
              { id: "contain", label: "Fit" },
              { id: "cover", label: "Fill" },
            ]}
          />
        </Row>
        <div className="grid2">
          <NumberField
            prefix="W"
            value={item.width}
            min={20}
            max={2160}
            suffix="px"
            onChange={(v) => upd((x) => (x.width = v))}
          />
          <NumberField
            prefix="H"
            value={item.height}
            min={20}
            max={3840}
            suffix="px"
            onChange={(v) => upd((x) => (x.height = v))}
          />
        </div>
        <div className="grid3">
          <button
            className="btn"
            onClick={() =>
              upd((x) => {
                x.width = 1080;
                x.height = 1920;
                x.transform.x = 540;
                x.transform.y = 960;
                x.radius = 0;
                x.fit = "cover";
              })
            }
          >
            Full
          </button>
          <button
            className="btn"
            onClick={() =>
              upd((x) => {
                x.width = 840;
                x.height = 840;
                x.transform.y = 640;
              })
            }
          >
            Card
          </button>
          <button
            className="btn"
            onClick={() =>
              upd((x) => {
                x.width = 1080;
                x.height = 960;
                x.transform.x = 540;
                x.transform.y = 480;
                x.radius = 0;
                x.fit = "cover";
              })
            }
          >
            Split top
          </button>
        </div>
        <Row label="Radius">
          <NumberField
            value={item.radius}
            min={0}
            max={999}
            suffix="px"
            onChange={(v) => upd((x) => (x.radius = v))}
          />
        </Row>
        <ShadowFields
          value={item.shadow}
          onChange={(fn) => upd((x) => fn(x.shadow))}
        />
        <Row label="Crop">
          <span />
        </Row>
        <CropFields
          crop={item.crop}
          onChange={(fn) => upd((x) => fn(x.crop))}
        />
      </Section>
      <TransformSection item={item} />
      <AnimationSection item={item} />
      {item.type === "brollVideo" ? (
        <Section title="Audio" defaultOpen={false}>
          <AudioFields item={item} />
        </Section>
      ) : null}
      <TimingSection item={item} />
      <KeyframesSection item={item} />
    </>
  );
};

// ---------------- Overlay ----------------
const TEXT_SLOTS: Partial<Record<OverlayItem["shape"], string[]>> = {
  callout: ["Text"],
  priceTag: ["Price", "Currency", "Old price"],
  featureCard: ["Label", "Value"],
  comparisonCard: ["Left (✓)", "Right (✕)"],
  icon: ["Icon name"],
};

export const OverlayInspector: React.FC<{ item: OverlayItem }> = ({ item }) => {
  const upd = (fn: (x: OverlayItem) => void) =>
    updateItem<OverlayItem>(item.id, fn);
  const slots = TEXT_SLOTS[item.shape];
  return (
    <>
      <Section title={item.name}>
        {slots?.map((label, i) => (
          <Row key={label} label={label}>
            <TextInput
              value={item.texts[i] ?? ""}
              onChange={(v) => upd((x) => (x.texts[i] = v))}
            />
          </Row>
        ))}
        {slots && item.shape !== "icon" ? (
          <Row label="Font">
            <FontSelect
              value={item.fontFamily}
              onChange={(f) => upd((x) => (x.fontFamily = f))}
            />
          </Row>
        ) : null}
        <Row label="Color">
          <ColorField
            value={item.color}
            onChange={(v) => upd((x) => (x.color = v))}
          />
        </Row>
        <Row label="Second color">
          <ColorField
            value={item.secondaryColor}
            onChange={(v) => upd((x) => (x.secondaryColor = v))}
          />
        </Row>
        <div className="grid2">
          <NumberField
            prefix="W"
            value={item.width}
            min={10}
            max={1080}
            onChange={(v) => upd((x) => (x.width = v))}
          />
          <NumberField
            prefix="H"
            value={item.height}
            min={10}
            max={1920}
            onChange={(v) => upd((x) => (x.height = v))}
          />
        </div>
        <div className="grid2">
          <NumberField
            prefix="Stroke"
            value={item.strokeWidth}
            min={1}
            max={60}
            onChange={(v) => upd((x) => (x.strokeWidth = v))}
          />
          <NumberField
            prefix="Radius"
            value={item.radius}
            min={0}
            max={999}
            onChange={(v) => upd((x) => (x.radius = v))}
          />
        </div>
        <ShadowFields
          value={item.shadow}
          onChange={(fn) => upd((x) => fn(x.shadow))}
        />
      </Section>
      <TransformSection item={item} />
      <AnimationSection item={item} />
      <TimingSection item={item} />
      <KeyframesSection item={item} />
    </>
  );
};

// ---------------- Audio ----------------
export const AudioInspector: React.FC<{ item: AudioItem }> = ({ item }) => {
  const owner = useEditor((s) =>
    s.project!.items.find((i) => i.id === item.linkedTo),
  );
  return (
    <>
      <Section
        title={
          item.role === "sfx"
            ? "Sound effect"
            : item.role === "music"
              ? "Music"
              : "Voice"
        }
      >
        <AudioFields item={item} />
        <Row label="Source in">
          <NumberField
            value={item.trimBefore}
            min={0}
            suffix="f"
            onChange={(v) =>
              updateItem<AudioItem>(
                item.id,
                (a) => (a.trimBefore = Math.max(0, Math.round(v))),
              )
            }
          />
        </Row>
        {owner ? (
          <Row label="Linked to">
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span className="chip accent">{owner.name}</span>
              <button
                className="btn ghost"
                onClick={() =>
                  updateItem<AudioItem>(item.id, (a) => delete a.linkedTo)
                }
              >
                Unlink
              </button>
            </div>
          </Row>
        ) : null}
        <div className="hint">{item.src}</div>
      </Section>
      <TimingSection item={item} />
    </>
  );
};

// ---------------- Code-built component ----------------
export const ComponentInspector: React.FC<{ item: ComponentItem }> = ({
  item,
}) => (
  <>
    <Section title="Scene">
      <div className="hint">
        <b>{COMPONENT_REGISTRY[item.componentId]?.label ?? item.componentId}</b>{" "}
        is a code-built scene with its own internal motion (src/videos). Move it
        on the timeline, or reposition / scale it here. Rebuild it with editor
        shapes and text if you need per-element edits.
      </div>
    </Section>
    <TransformSection item={item} props={["x", "y", "scale", "opacity"]} />
    <TimingSection item={item} />
    <KeyframesSection item={item} />
  </>
);

export { AnimRow };
