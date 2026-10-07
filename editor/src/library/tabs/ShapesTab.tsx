import {
  ArrowRight,
  Check,
  Circle,
  Highlighter,
  MessageSquare,
  MousePointer2,
  RectangleHorizontal,
  Rows2,
  Tag,
  Underline,
  X,
  LayoutPanelTop,
} from "lucide-react";
import React from "react";
import { OVERLAY_LABELS } from "../../../../src/engine/factory";
import type { OverlayShape } from "../../../../src/engine/types";
import { dragProps } from "../payloads";

const ICONS: Record<Exclude<OverlayShape, "icon">, React.ReactNode> = {
  arrow: <ArrowRight size={26} />,
  circle: <Circle size={26} />,
  rectangle: <RectangleHorizontal size={26} />,
  highlight: <Highlighter size={26} />,
  underline: <Underline size={26} />,
  pointer: <MousePointer2 size={26} />,
  check: <Check size={26} />,
  x: <X size={26} />,
  callout: <MessageSquare size={26} />,
  priceTag: <Tag size={26} />,
  featureCard: <LayoutPanelTop size={26} />,
  comparisonCard: <Rows2 size={26} />,
};

export const ShapesTab: React.FC = () => (
  <>
    <div className="panel-head">Shapes & Overlays</div>
    <div className="panel-sub">
      Annotation shapes draw on; cards are fully editable.
    </div>
    <div className="lib-grid">
      {(Object.keys(ICONS) as Exclude<OverlayShape, "icon">[]).map((s) => (
        <div
          key={s}
          className="lib-card"
          {...dragProps({ kind: "overlay", shape: s })}
        >
          <div className="thumb" style={{ color: "var(--gold)" }}>
            {ICONS[s]}
          </div>
          <div className="meta">
            <span className="title">{OVERLAY_LABELS[s]}</span>
          </div>
        </div>
      ))}
    </div>
  </>
);
