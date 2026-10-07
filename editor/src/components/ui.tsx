import { ChevronRight, Diamond } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { beginTx, endTx } from "../project/store";

export const IconButton: React.FC<{
  icon: React.ReactNode;
  tip?: string;
  tipPos?: "top" | "bottom" | "right";
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
  size?: "sm" | "md";
}> = ({ icon, tip, tipPos, onClick, active, disabled, size }) => (
  <button
    className={`icon-btn${active ? " active" : ""}${size === "sm" ? " sm" : ""}`}
    data-tip={tip}
    data-tip-pos={tipPos}
    onClick={onClick}
    disabled={disabled}
    aria-label={tip}
  >
    {icon}
  </button>
);

export const Section: React.FC<{
  title: string;
  right?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, right, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="section">
      <div className="section-head" onClick={() => setOpen(!open)}>
        <ChevronRight
          size={13}
          className="chev"
          style={{ rotate: open ? "90deg" : "0deg" }}
        />
        <span style={{ flex: 1 }}>{title}</span>
        <span onClick={(e) => e.stopPropagation()}>{right}</span>
      </div>
      {open ? <div className="section-body">{children}</div> : null}
    </div>
  );
};

export const Row: React.FC<{
  label: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="row">
    <label>{label}</label>
    <div style={{ minWidth: 0 }}>{children}</div>
  </div>
);

const round = (v: number, step: number) => {
  const decimals =
    step < 1 ? Math.min(4, String(step).split(".")[1]?.length ?? 2) : 0;
  return Number(v.toFixed(decimals));
};

/**
 * Numeric field. Drag the prefix (or label) horizontally to scrub; type to set.
 * Scrubbing is one undo step (transaction).
 */
export const NumberField: React.FC<{
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: React.ReactNode;
  suffix?: string;
  /** Display multiplier (e.g. 100 to show 0..1 as %). */
  display?: number;
  width?: number | string;
}> = ({
  value,
  onChange,
  step = 1,
  min = -Infinity,
  max = Infinity,
  prefix,
  suffix,
  display = 1,
  width,
}) => {
  const [text, setText] = useState<string | null>(null);
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const shown = round(value * display, step);

  const onScrubDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const start = value;
    beginTx();
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const mul = ev.shiftKey ? 10 : ev.altKey ? 0.1 : 1;
      onChange(
        clamp(round(start + (dx * step * mul) / display, step / display)),
      );
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      endTx();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const commitText = () => {
    if (text === null) return;
    const v = Number(text);
    if (!Number.isNaN(v)) onChange(clamp(v / display));
    setText(null);
  };

  return (
    <div className="field" style={{ width }}>
      {prefix !== undefined ? (
        <span className="prefix" onPointerDown={onScrubDown}>
          {prefix}
        </span>
      ) : null}
      <input
        value={text ?? String(shown)}
        onChange={(e) => setText(e.target.value)}
        onBlur={commitText}
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          if (e.key === "Escape") {
            setText(null);
            (e.target as HTMLInputElement).blur();
          }
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const d =
              (e.key === "ArrowUp" ? 1 : -1) * step * (e.shiftKey ? 10 : 1);
            onChange(clamp(round(value + d / display, step / display)));
          }
          e.stopPropagation();
        }}
      />
      {suffix ? <span className="suffix">{suffix}</span> : null}
    </div>
  );
};

export const SliderField: React.FC<{
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  display?: number;
  suffix?: string;
}> = ({ value, onChange, min, max, step = 0.01, display = 1, suffix }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 64px",
      gap: 8,
      alignItems: "center",
    }}
  >
    <input
      type="range"
      className="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onPointerDown={beginTx}
      onPointerUp={endTx}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    <NumberField
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      display={display}
      suffix={suffix}
    />
  </div>
);

export const ColorField: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const [text, setText] = useState<string | null>(null);
  const isHex = /^#[0-9a-fA-F]{6}$/.test(value);
  return (
    <div className="field">
      <span className="swatch" style={{ background: value }}>
        <input
          type="color"
          value={isHex ? value : "#ffffff"}
          onPointerDown={beginTx}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onBlur={endTx}
        />
      </span>
      <input
        value={text ?? value}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          if (text !== null && text.trim()) onChange(text.trim());
          setText(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export function Select<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { id: T; label: React.ReactNode; tip?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button
          key={o.id}
          className={value === o.id ? "on" : ""}
          onClick={() => onChange(o.id)}
          data-tip={o.tip}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export const Toggle: React.FC<{
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ value, onChange }) => (
  <button
    className={`toggle${value ? " on" : ""}`}
    onClick={() => onChange(!value)}
    aria-pressed={value}
  />
);

export const TextInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "auto" | "rtl" | "ltr";
}> = ({ value, onChange, placeholder, dir = "auto" }) => {
  const [text, setText] = useState<string | null>(null);
  return (
    <input
      className="text-input"
      dir={dir}
      value={text ?? value}
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => {
        if (text !== null) onChange(text);
        setText(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        e.stopPropagation();
      }}
    />
  );
};

/** Multiline text editor that commits on blur (one undo step per edit). */
export const TextArea: React.FC<{
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}> = ({ value, onChange, rows = 3 }) => {
  const [text, setText] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => setText(null), [value]);
  return (
    <textarea
      ref={ref}
      className="textarea"
      dir="auto"
      rows={rows}
      value={text ?? value}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => {
        if (text !== null && text !== value) onChange(text);
        setText(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ref.current?.blur();
        e.stopPropagation();
      }}
    />
  );
};

export const KeyframeButton: React.FC<{
  state: "none" | "has" | "on";
  onClick: () => void;
  tip: string;
}> = ({ state, onClick, tip }) => (
  <button
    className={`kf ${state === "has" ? "has" : state === "on" ? "on-frame" : ""}`}
    onClick={onClick}
    data-tip={tip}
  >
    <Diamond size={11} fill={state === "on" ? "currentColor" : "none"} />
  </button>
);
