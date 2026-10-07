import {
  Combine,
  CopyCheck,
  RotateCcw,
  Save,
  Scissors,
  Trash2,
} from "lucide-react";
import React from "react";
import { EMPHASIS_ANIMATIONS } from "../../../src/engine/animation/presets";
import { findCaptionPreset } from "../../../src/engine/captions/presets";
import type {
  CaptionItem,
  CaptionStyle,
  CaptionWord,
  WordStyle,
} from "../../../src/engine/types";
import { applyCaptionStyleToAll } from "../captions/applyPreset";
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
import { savePreset } from "../presets/userPresets";
import {
  deleteWord,
  mergeCaptionWithNext,
  setCaptionText,
  splitCaptionAtWord,
  updateWord,
} from "../project/actions";
import { seek } from "../project/playback";
import { select, updateItem, useEditor } from "../project/store";
import {
  AnimationSection,
  AnimRow,
  BackgroundFields,
  FontSelect,
  KeyframesSection,
  ShadowFields,
  TimingSection,
  WEIGHTS,
} from "./common";

export const CaptionInspector: React.FC<{ item: CaptionItem }> = ({ item }) => {
  const wordId = useEditor((s) => s.wordId);
  const word = item.words.find((w) => w.id === wordId);
  const preset = findCaptionPreset(item.presetId);
  const setStyle = (fn: (s: CaptionStyle) => void) =>
    updateItem<CaptionItem>(item.id, (c) => fn(c.style));

  return (
    <>
      <Section
        title="Caption"
        right={
          <span style={{ display: "flex", gap: 2 }}>
            <IconButton
              size="sm"
              icon={<Combine size={12} />}
              tip="Merge with next caption"
              onClick={() => mergeCaptionWithNext(item.id)}
            />
            <IconButton
              size="sm"
              icon={<CopyCheck size={12} />}
              tip="Apply this style to ALL captions"
              onClick={() => applyCaptionStyleToAll(item.id)}
            />
            <IconButton
              size="sm"
              icon={<Save size={12} />}
              tip="Save style as preset"
              onClick={async () => {
                const name = prompt(
                  "Caption preset name (e.g. “Loay Caption 01”)",
                  "My Caption",
                );
                if (!name) return;
                const p = await savePreset({
                  name,
                  kind: "caption",
                  data: {
                    style: structuredClone(item.style),
                    animation: structuredClone(item.animation),
                    y: item.transform.y,
                  },
                });
                updateItem<CaptionItem>(item.id, (c) => (c.presetId = p.id));
              }}
            />
          </span>
        }
      >
        <TextArea
          value={item.words.map((w) => w.text).join(" ")}
          onChange={(t) => setCaptionText(item.id, t)}
          rows={2}
        />
        <div className="hint">
          Edit text freely — word timings are kept when the word count is
          unchanged. Click a word below for per-word styling.
        </div>
        <div className="word-chips">
          {item.words.map((w) => (
            <span
              key={w.id}
              className={`word-chip${w.id === wordId ? " sel" : ""}${w.emphasis ? " emph" : ""}${w.tone === "negative" ? " neg" : ""}`}
              style={{ color: w.style?.color }}
              onClick={() => {
                select([item.id], w.id === wordId ? null : w.id);
                seek(item.from + Math.ceil(w.start) + 2);
              }}
              onDoubleClick={() =>
                updateWord(item.id, w.id, (x) => (x.emphasis = !x.emphasis))
              }
              title="Click: select · Double-click: toggle emphasis"
            >
              {w.text}
            </span>
          ))}
        </div>
        {preset ? (
          <span className="chip accent">Preset · {preset.name}</span>
        ) : null}
      </Section>

      {word ? <WordSection item={item} word={word} /> : null}

      <Section title="Text style">
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
            min={20}
            max={260}
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
          <Segmented<CaptionStyle["textAlign"]>
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
            min={200}
            max={1080}
            suffix="px"
            onChange={(v) => setStyle((s) => (s.maxWidth = v))}
          />
        </Row>
        <Row label="Text color">
          <ColorField
            value={item.style.textColor}
            onChange={(v) => setStyle((s) => (s.textColor = v))}
          />
        </Row>
        <Row label="Highlight">
          <ColorField
            value={item.style.highlightColor}
            onChange={(v) => setStyle((s) => (s.highlightColor = v))}
          />
        </Row>
        <Row label="Uppercase">
          <Toggle
            value={item.style.uppercase}
            onChange={(v) => setStyle((s) => (s.uppercase = v))}
          />
        </Row>
      </Section>

      <Section title="Words & highlight">
        <Row label="Reveal">
          <Select<CaptionStyle["reveal"]>
            value={item.style.reveal}
            onChange={(v) => setStyle((s) => (s.reveal = v))}
            options={[
              { id: "phrase", label: "Phrase at once" },
              { id: "word", label: "Word by word" },
              { id: "karaoke", label: "Karaoke fill" },
              { id: "single", label: "One word at a time" },
            ]}
          />
        </Row>
        <Row label="Active word">
          <Select<CaptionStyle["highlight"]>
            value={item.style.highlight}
            onChange={(v) => setStyle((s) => (s.highlight = v))}
            options={[
              { id: "none", label: "No highlight" },
              { id: "color", label: "Color" },
              { id: "box", label: "Box (key words)" },
              { id: "scale", label: "Scale" },
              { id: "underline", label: "Underline" },
            ]}
          />
        </Row>
        <Row label="Key words">
          <ColorField
            value={item.style.emphasisColor}
            onChange={(v) => setStyle((s) => (s.emphasisColor = v))}
          />
        </Row>
        <Row label="Key size">
          <SliderField
            value={item.style.emphasisScale}
            min={1}
            max={3}
            step={0.05}
            display={100}
            suffix="%"
            onChange={(v) => setStyle((s) => (s.emphasisScale = v))}
          />
        </Row>
        <Row label="Own line">
          <Toggle
            value={item.style.emphasisOwnLine}
            onChange={(v) => setStyle((s) => (s.emphasisOwnLine = v))}
          />
        </Row>
        <BackgroundFields
          label="Key box"
          value={item.style.emphasisBox}
          onChange={(fn) => setStyle((s) => fn(s.emphasisBox))}
        />
      </Section>

      <Section title="Stroke, shadow & background">
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

      <Section
        title="Position"
        right={
          <span style={{ display: "flex", gap: 2 }}>
            {[
              ["Top", 420],
              ["Upper", 620],
              ["Mid", 960],
              ["Low", 1340],
            ].map(([l, y]) => (
              <button
                key={l}
                className="btn ghost"
                style={{ height: 20, padding: "0 5px", fontSize: 10 }}
                onClick={() =>
                  updateItem<CaptionItem>(
                    item.id,
                    (c) => (c.transform.y = y as number),
                  )
                }
              >
                {l}
              </button>
            ))}
          </span>
        }
      >
        <AnimRow item={item} prop="x" />
        <AnimRow item={item} prop="y" />
        <AnimRow item={item} prop="scale" />
        <AnimRow item={item} prop="rotation" />
        <AnimRow item={item} prop="opacity" />
        <AnimRow item={item} prop="blur" />
      </Section>

      <AnimationSection
        item={item}
        emphasisHint="Emphasis plays on key words (★) when they are spoken, and on any word with its own animation."
      />
      <TimingSection item={item} />
      <KeyframesSection item={item} />
    </>
  );
};

const WordSection: React.FC<{ item: CaptionItem; word: CaptionWord }> = ({
  item,
  word,
}) => {
  const fps = useEditor((s) => s.project!.fps);
  const set = (fn: (w: CaptionWord) => void) =>
    updateWord(item.id, word.id, fn);
  const setStyle = (fn: (s: WordStyle) => void) =>
    set((w) => {
      w.style = w.style ?? {};
      fn(w.style);
    });
  const ws = word.style ?? {};
  return (
    <Section
      title={`Word · “${word.text}”`}
      right={
        <span style={{ display: "flex", gap: 2 }}>
          <IconButton
            size="sm"
            icon={<Scissors size={12} />}
            tip="Split caption before this word"
            onClick={() => splitCaptionAtWord(item.id, word.id)}
          />
          <IconButton
            size="sm"
            icon={<RotateCcw size={12} />}
            tip="Reset word style"
            onClick={() => set((w) => delete w.style)}
          />
          <IconButton
            size="sm"
            icon={<Trash2 size={12} />}
            tip="Delete word"
            onClick={() => deleteWord(item.id, word.id)}
          />
        </span>
      }
    >
      <Row label="Text">
        <TextInput
          value={word.text}
          onChange={(v) => set((w) => (w.text = v.trim() || w.text))}
        />
      </Row>
      <div className="grid2">
        <NumberField
          prefix="Start"
          suffix="f"
          step={0.5}
          value={word.start}
          min={0}
          max={word.end - 0.5}
          onChange={(v) => set((w) => (w.start = v))}
        />
        <NumberField
          prefix="End"
          suffix="f"
          step={0.5}
          value={word.end}
          min={word.start + 0.5}
          max={item.durationInFrames}
          onChange={(v) => set((w) => (w.end = v))}
        />
      </div>
      <div className="hint">
        {((item.from + word.start) / fps).toFixed(2)}s →{" "}
        {((item.from + word.end) / fps).toFixed(2)}s · drag word edges on the
        timeline to retime
      </div>
      <Row label="Key word ★">
        <Toggle
          value={Boolean(word.emphasis)}
          onChange={(v) =>
            set((w) => (v ? (w.emphasis = true) : delete w.emphasis))
          }
        />
      </Row>
      <Row label="Negative tone">
        <Toggle
          value={word.tone === "negative"}
          onChange={(v) =>
            set((w) => (v ? (w.tone = "negative") : delete w.tone))
          }
        />
      </Row>
      <Row label="Color">
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Toggle
            value={ws.color !== undefined}
            onChange={(v) =>
              setStyle((s) =>
                v ? (s.color = item.style.highlightColor) : delete s.color,
              )
            }
          />
          {ws.color !== undefined ? (
            <ColorField
              value={ws.color}
              onChange={(v) => setStyle((s) => (s.color = v))}
            />
          ) : null}
        </div>
      </Row>
      <div className="grid2">
        <NumberField
          prefix="Size"
          value={ws.size ?? 1}
          step={0.05}
          min={0.3}
          max={4}
          display={100}
          suffix="%"
          onChange={(v) => setStyle((s) => (s.size = v))}
        />
        <NumberField
          prefix="Scale"
          value={ws.scale ?? 1}
          step={0.05}
          min={0.3}
          max={4}
          display={100}
          suffix="%"
          onChange={(v) => setStyle((s) => (s.scale = v))}
        />
      </div>
      <Row label="Weight">
        <Select
          value={String(ws.weight ?? "")}
          options={[{ id: "", label: "Inherit" }, ...WEIGHTS]}
          onChange={(v) =>
            setStyle((s) => (v ? (s.weight = Number(v)) : delete s.weight))
          }
        />
      </Row>
      <Row label="Background">
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Toggle
            value={ws.background !== undefined}
            onChange={(v) =>
              setStyle((s) =>
                v
                  ? (s.background = item.style.highlightColor)
                  : delete s.background,
              )
            }
          />
          {ws.background !== undefined ? (
            <ColorField
              value={ws.background}
              onChange={(v) => setStyle((s) => (s.background = v))}
            />
          ) : null}
        </div>
      </Row>
      <Row label="Stroke">
        <div className="grid2">
          <ColorField
            value={ws.strokeColor ?? item.style.strokeColor}
            onChange={(v) => setStyle((s) => (s.strokeColor = v))}
          />
          <NumberField
            prefix="W"
            value={ws.strokeWidth ?? item.style.strokeWidth}
            min={0}
            max={30}
            onChange={(v) => setStyle((s) => (s.strokeWidth = v))}
          />
        </div>
      </Row>
      <Row label="Animation">
        <Select
          value={ws.animation ?? "none"}
          options={EMPHASIS_ANIMATIONS.map((a) => ({
            ...a,
            label: a.id === "none" ? "Inherit / none" : a.label,
          }))}
          onChange={(v) =>
            setStyle((s) =>
              v === "none" ? delete s.animation : (s.animation = v),
            )
          }
        />
      </Row>
    </Section>
  );
};
