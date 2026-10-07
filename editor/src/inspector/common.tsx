import { ChevronLeft, ChevronRight, Diamond, Save, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  EMPHASIS_ANIMATIONS,
  IN_ANIMATIONS,
  OUT_ANIMATIONS,
} from "../../../src/engine/animation/presets";
import type {
  AnimatableProp,
  AnimationParams,
  AnimationSet,
  Background,
  EasingName,
  Item,
  ProjectFont,
  Shadow,
} from "../../../src/engine/types";
import {
  ColorField,
  IconButton,
  KeyframeButton,
  NumberField,
  Row,
  Section,
  Segmented,
  Select,
  SliderField,
  TextInput,
  Toggle,
} from "../components/ui";
import { BUILTIN_FONTS, useFontFamilies, useFonts } from "../media/fonts";
import {
  ANIMATABLE,
  allKeyframeFrames,
  keyframeState,
  setAnimatable,
  setKeyframeEasing,
  toggleKeyframe,
  valueAt,
} from "../project/keyframes";
import { seek, usePlayback } from "../project/playback";
import { commit, updateItem, useEditor } from "../project/store";
import { formatTimecode } from "../timeline/timeMath";

export const useLocalFrame = (item: Item) => {
  const frame = usePlayback((s) => s.frame);
  return frame - item.from;
};

export const TimingSection: React.FC<{ item: Item }> = ({ item }) => {
  const fps = useEditor((s) => s.project!.fps);
  return (
    <Section title="Timing">
      <div className="grid3">
        <NumberField
          prefix="In"
          value={item.from}
          min={0}
          onChange={(v) => updateItem(item.id, (i) => (i.from = Math.round(v)))}
        />
        <NumberField
          prefix="Dur"
          value={item.durationInFrames}
          min={1}
          onChange={(v) =>
            updateItem(
              item.id,
              (i) => (i.durationInFrames = Math.max(1, Math.round(v))),
            )
          }
        />
        <NumberField
          prefix="Out"
          value={item.from + item.durationInFrames}
          min={item.from + 1}
          onChange={(v) =>
            updateItem(
              item.id,
              (i) => (i.durationInFrames = Math.max(1, Math.round(v) - i.from)),
            )
          }
        />
      </div>
      <div className="hint">
        {formatTimecode(item.from, fps)} →{" "}
        {formatTimecode(item.from + item.durationInFrames, fps)} ·{" "}
        {(item.durationInFrames / fps).toFixed(2)}s
      </div>
    </Section>
  );
};

/** Animatable property row with a keyframe toggle. */
export const AnimRow: React.FC<{
  item: Item;
  prop: AnimatableProp;
  label?: string;
}> = ({ item, prop, label }) => {
  const local = useLocalFrame(item);
  const meta = ANIMATABLE.find((a) => a.prop === prop)!;
  const v = valueAt(item, prop, local);
  return (
    <div className="row" style={{ gridTemplateColumns: "84px 1fr 16px" }}>
      <label>{label ?? meta.label}</label>
      <NumberField
        value={v}
        step={meta.step}
        display={meta.display}
        suffix={meta.suffix}
        prefix="↔"
        onChange={(nv) =>
          commit((p) => {
            const it = p.items.find((i) => i.id === item.id);
            if (it) setAnimatable(it, prop, nv, local);
          })
        }
      />
      <KeyframeButton
        state={keyframeState(item, prop, local)}
        tip={
          keyframeState(item, prop, local) === "on"
            ? "Remove keyframe"
            : "Add keyframe at playhead"
        }
        onClick={() =>
          commit((p) => {
            const it = p.items.find((i) => i.id === item.id);
            if (it) toggleKeyframe(it, prop, local);
          })
        }
      />
    </div>
  );
};

export const TransformSection: React.FC<{
  item: Item;
  props?: AnimatableProp[];
  title?: string;
}> = ({
  item,
  props = ["x", "y", "scale", "rotation", "opacity", "blur"],
  title = "Transform",
}) => {
  const project = useEditor((s) => s.project)!;
  return (
    <Section
      title={title}
      right={
        <button
          className="btn ghost"
          style={{ height: 20, fontSize: 10.5 }}
          onClick={() =>
            updateItem(item.id, (i) => {
              if ("transform" in i) {
                const t = (
                  i as { transform: { x: number } & Record<string, number> }
                ).transform;
                t.x = project.width / 2;
              }
            })
          }
          data-tip="Center horizontally"
        >
          Center
        </button>
      }
    >
      {props.map((p) => (
        <AnimRow key={p} item={item} prop={p} />
      ))}
    </Section>
  );
};

const EASINGS: { id: EasingName; label: string }[] = [
  { id: "linear", label: "Linear" },
  { id: "easeIn", label: "Ease In" },
  { id: "easeOut", label: "Ease Out" },
  { id: "easeInOut", label: "Ease In-Out" },
  { id: "spring", label: "Spring" },
];

export const KeyframesSection: React.FC<{ item: Item }> = ({ item }) => {
  const frames = allKeyframeFrames(item);
  const local = useLocalFrame(item);
  if (!frames.length) {
    return (
      <Section title="Keyframes" defaultOpen={false}>
        <div className="hint">
          Click ◇ next to any property to add a keyframe at the playhead.
          Keyframes show as ◆ on the timeline.
        </div>
      </Section>
    );
  }
  const prev = [...frames].reverse().find((f) => f < local);
  const next = frames.find((f) => f > local);
  return (
    <Section
      title={`Keyframes (${frames.length})`}
      right={
        <span style={{ display: "flex" }}>
          <IconButton
            size="sm"
            icon={<ChevronLeft size={12} />}
            tip="Previous keyframe"
            disabled={prev === undefined}
            onClick={() => prev !== undefined && seek(item.from + prev)}
          />
          <IconButton
            size="sm"
            icon={<ChevronRight size={12} />}
            tip="Next keyframe"
            disabled={next === undefined}
            onClick={() => next !== undefined && seek(item.from + next)}
          />
        </span>
      }
    >
      {frames.map((f) => {
        const props = Object.entries(item.keyframes ?? {})
          .filter(([, k]) => k?.some((kf) => kf.frame === f))
          .map(([p]) => p);
        const easing =
          Object.values(item.keyframes ?? {})
            .flatMap((k) => k ?? [])
            .find((kf) => kf.frame === f)?.easing ?? "easeInOut";
        return (
          <div
            key={f}
            style={{
              display: "grid",
              gridTemplateColumns: "18px 46px 1fr 96px 22px",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Diamond
              size={11}
              color="var(--gold)"
              fill={f === Math.round(local) ? "var(--gold)" : "none"}
            />
            <button
              className="btn ghost"
              style={{ height: 22, padding: "0 4px" }}
              onClick={() => seek(item.from + f)}
            >
              {f}f
            </button>
            <span
              className="hint"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {props.join(", ")}
            </span>
            <Select<EasingName>
              value={easing}
              options={EASINGS}
              onChange={(e) =>
                updateItem(item.id, (i) => setKeyframeEasing(i, f, e))
              }
            />
            <IconButton
              size="sm"
              icon={<Trash2 size={11} />}
              tip="Delete keyframe"
              onClick={() =>
                updateItem(item.id, (i) => {
                  for (const p of Object.keys(
                    i.keyframes ?? {},
                  ) as AnimatableProp[]) {
                    const k = i.keyframes![p]!.filter((kf) => kf.frame !== f);
                    if (k.length) i.keyframes![p] = k;
                    else delete i.keyframes![p];
                  }
                })
              }
            />
          </div>
        );
      })}
    </Section>
  );
};

const ParamsEditor: React.FC<{
  params: AnimationParams;
  onChange: (fn: (p: AnimationParams) => void) => void;
  spring?: boolean;
  direction?: boolean;
}> = ({ params, onChange, spring, direction }) => (
  <>
    <div className="grid2">
      <NumberField
        prefix="Dur"
        suffix="f"
        value={params.duration}
        min={1}
        max={120}
        onChange={(v) => onChange((p) => (p.duration = Math.round(v)))}
      />
      <NumberField
        prefix="Delay"
        suffix="f"
        value={params.delay}
        min={0}
        max={120}
        onChange={(v) => onChange((p) => (p.delay = Math.round(v)))}
      />
    </div>
    <div className="grid2">
      <NumberField
        prefix="Int"
        value={params.intensity}
        step={0.05}
        min={0}
        max={2}
        display={100}
        suffix="%"
        onChange={(v) => onChange((p) => (p.intensity = v))}
      />
      {spring ? (
        <NumberField
          prefix="Damp"
          value={params.damping}
          min={1}
          max={60}
          onChange={(v) => onChange((p) => (p.damping = v))}
        />
      ) : (
        <span />
      )}
    </div>
    {spring ? (
      <NumberField
        prefix="Stiffness"
        value={params.stiffness}
        min={20}
        max={600}
        step={5}
        onChange={(v) => onChange((p) => (p.stiffness = v))}
      />
    ) : null}
    {direction ? (
      <Segmented<AnimationParams["direction"]>
        value={params.direction}
        onChange={(d) => onChange((p) => (p.direction = d))}
        options={[
          { id: "up", label: "↑", tip: "Up" },
          { id: "down", label: "↓", tip: "Down" },
          { id: "left", label: "←", tip: "Left" },
          { id: "right", label: "→", tip: "Right" },
        ]}
      />
    ) : null}
  </>
);

const SPRINGY = new Set([
  "pop",
  "bounce",
  "spring",
  "overshoot",
  "elastic",
  "punch",
]);
const DIRECTIONAL = new Set(["spring", "maskReveal", "wipe", "slideOut"]);

export const AnimationSection: React.FC<{
  item: Item & { animation: AnimationSet };
  title?: string;
  emphasisHint?: string;
}> = ({ item, title = "Animation", emphasisHint }) => {
  const a = item.animation;
  const set = (fn: (a: AnimationSet) => void) =>
    updateItem(item.id, (i) => fn((i as typeof item).animation));
  const [tab, setTab] = useState<"in" | "emphasis" | "out">("in");
  return (
    <Section title={title} right={<SaveAnimationPreset animation={a} />}>
      <Segmented
        value={tab}
        onChange={setTab}
        options={[
          {
            id: "in",
            label: `IN · ${IN_ANIMATIONS.find((x) => x.id === a.in)?.label}`,
          },
          {
            id: "emphasis",
            label: `EMPH · ${EMPHASIS_ANIMATIONS.find((x) => x.id === a.emphasis)?.label}`,
          },
          {
            id: "out",
            label: `OUT · ${OUT_ANIMATIONS.find((x) => x.id === a.out)?.label.replace(" (cut)", "")}`,
          },
        ]}
      />
      {tab === "in" ? (
        <>
          <Select
            value={a.in}
            options={IN_ANIMATIONS}
            onChange={(v) => set((x) => (x.in = v))}
          />
          {a.in !== "none" ? (
            <ParamsEditor
              params={a.inParams}
              onChange={(fn) => set((x) => fn(x.inParams))}
              spring={SPRINGY.has(a.in)}
              direction={DIRECTIONAL.has(a.in)}
            />
          ) : null}
        </>
      ) : null}
      {tab === "emphasis" ? (
        <>
          <Select
            value={a.emphasis}
            options={EMPHASIS_ANIMATIONS}
            onChange={(v) => set((x) => (x.emphasis = v))}
          />
          {emphasisHint ? <div className="hint">{emphasisHint}</div> : null}
          {a.emphasis !== "none" ? (
            <ParamsEditor
              params={a.emphasisParams}
              onChange={(fn) => set((x) => fn(x.emphasisParams))}
              spring={SPRINGY.has(a.emphasis)}
            />
          ) : null}
        </>
      ) : null}
      {tab === "out" ? (
        <>
          <Select
            value={a.out}
            options={OUT_ANIMATIONS}
            onChange={(v) => set((x) => (x.out = v))}
          />
          {a.out !== "none" ? (
            <ParamsEditor
              params={a.outParams}
              onChange={(fn) => set((x) => fn(x.outParams))}
              direction={DIRECTIONAL.has(a.out)}
            />
          ) : null}
        </>
      ) : null}
    </Section>
  );
};

const SaveAnimationPreset: React.FC<{ animation: AnimationSet }> = ({
  animation,
}) => (
  <IconButton
    size="sm"
    icon={<Save size={12} />}
    tip="Save animation as preset"
    onClick={async () => {
      const name = prompt("Preset name", "My animation");
      if (!name) return;
      const { savePreset } = await import("../presets/userPresets");
      await savePreset({
        name,
        kind: "animation",
        data: structuredClone(animation),
      });
    }}
  />
);

export const ShadowFields: React.FC<{
  value: Shadow;
  onChange: (fn: (s: Shadow) => void) => void;
}> = ({ value, onChange }) => (
  <>
    <Row label="Shadow">
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Toggle
          value={value.enabled}
          onChange={(v) => onChange((s) => (s.enabled = v))}
        />
        {value.enabled ? (
          <ColorField
            value={value.color}
            onChange={(v) => onChange((s) => (s.color = v))}
          />
        ) : null}
      </div>
    </Row>
    {value.enabled ? (
      <div className="grid3">
        <NumberField
          prefix="Blur"
          value={value.blur}
          min={0}
          max={120}
          onChange={(v) => onChange((s) => (s.blur = v))}
        />
        <NumberField
          prefix="X"
          value={value.x}
          onChange={(v) => onChange((s) => (s.x = v))}
        />
        <NumberField
          prefix="Y"
          value={value.y}
          onChange={(v) => onChange((s) => (s.y = v))}
        />
      </div>
    ) : null}
  </>
);

export const BackgroundFields: React.FC<{
  value: Background;
  onChange: (fn: (b: Background) => void) => void;
  label?: string;
}> = ({ value, onChange, label = "Background" }) => (
  <>
    <Row label={label}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Toggle
          value={value.enabled}
          onChange={(v) => onChange((b) => (b.enabled = v))}
        />
        {value.enabled ? (
          <ColorField
            value={value.color}
            onChange={(v) => onChange((b) => (b.color = v))}
          />
        ) : null}
      </div>
    </Row>
    {value.enabled ? (
      <>
        <Row label="Opacity">
          <SliderField
            value={value.opacity}
            min={0}
            max={1}
            step={0.01}
            display={100}
            suffix="%"
            onChange={(v) => onChange((b) => (b.opacity = v))}
          />
        </Row>
        <div className="grid3">
          <NumberField
            prefix="R"
            value={value.radius}
            min={0}
            max={999}
            onChange={(v) => onChange((b) => (b.radius = v))}
          />
          <NumberField
            prefix="PX"
            value={value.paddingX}
            min={0}
            max={200}
            onChange={(v) => onChange((b) => (b.paddingX = v))}
          />
          <NumberField
            prefix="PY"
            value={value.paddingY}
            min={0}
            max={200}
            onChange={(v) => onChange((b) => (b.paddingY = v))}
          />
        </div>
      </>
    ) : null}
  </>
);

/** Font family picker. Choosing a project font adds its files to project.fonts so renders load it. */
export const FontSelect: React.FC<{
  value: string;
  onChange: (family: string) => void;
}> = ({ value, onChange }) => {
  const families = useFontFamilies();
  const files = useFonts((s) => s.files);
  const pick = (family: string) => {
    if (!BUILTIN_FONTS.has(family)) {
      const add: ProjectFont[] = files
        .filter((f) => f.family === family)
        .map((f) => ({ family: f.family, file: f.file, weight: f.weight }));
      commit((p) => {
        for (const f of add)
          if (!p.fonts.some((x) => x.file === f.file)) p.fonts.push(f);
      });
    }
    onChange(family);
  };
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => pick(e.target.value)}
      style={{ fontFamily: `"${value}"` }}
    >
      {(families.includes(value) ? families : [value, ...families]).map((f) => (
        <option key={f} value={f} style={{ fontFamily: `"${f}"` }}>
          {f}
        </option>
      ))}
    </select>
  );
};

export const WEIGHTS = [
  { id: "400", label: "Regular 400" },
  { id: "500", label: "Medium 500" },
  { id: "600", label: "Semibold 600" },
  { id: "700", label: "Bold 700" },
  { id: "800", label: "Extra Bold 800" },
  { id: "900", label: "Black 900" },
];

export const NameField: React.FC<{ item: Item }> = ({ item }) => (
  <TextInput
    value={item.name}
    onChange={(v) => updateItem(item.id, (i) => (i.name = v))}
  />
);
