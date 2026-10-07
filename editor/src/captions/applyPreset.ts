import {
  CAPTION_PRESETS,
  type CaptionPreset,
} from "../../../src/engine/captions/presets";
import type { CaptionItem, Project } from "../../../src/engine/types";
import { commit, useEditor } from "../project/store";
import type { UserPreset } from "../presets/userPresets";

const targets = (p: Project, scope: "selected" | "all") => {
  const sel = useEditor.getState().selection;
  return p.items.filter(
    (i): i is CaptionItem =>
      i.type === "caption" && (scope === "all" || sel.includes(i.id)),
  );
};

export const applyCaptionPreset = (
  preset: CaptionPreset,
  scope: "selected" | "all",
) =>
  commit((p) => {
    for (const c of targets(p, scope)) {
      c.style = preset.style(p.global);
      c.animation = preset.animation(p.global);
      c.presetId = preset.id;
      c.transform.y = preset.y ? preset.y(p.global) : p.global.captionY;
    }
  });

export const applyUserCaptionPreset = (
  preset: Extract<UserPreset, { kind: "caption" }>,
  scope: "selected" | "all",
) =>
  commit((p) => {
    for (const c of targets(p, scope)) {
      c.style = structuredClone(preset.data.style);
      c.animation = structuredClone(preset.data.animation);
      c.presetId = preset.id;
      c.transform.y = preset.data.y;
    }
  });

/** Copies the style/animation/position of one caption onto all others (word overrides are kept). */
export const applyCaptionStyleToAll = (sourceId: string) =>
  commit((p) => {
    const src = p.items.find((i) => i.id === sourceId) as
      | CaptionItem
      | undefined;
    if (!src) return;
    for (const c of p.items) {
      if (c.type !== "caption" || c.id === src.id) continue;
      c.style = structuredClone(src.style);
      c.animation = structuredClone(src.animation);
      c.presetId = src.presetId;
      c.transform = {
        ...c.transform,
        x: src.transform.x,
        y: src.transform.y,
        scale: src.transform.scale,
        rotation: src.transform.rotation,
      };
    }
  });

export { CAPTION_PRESETS };
