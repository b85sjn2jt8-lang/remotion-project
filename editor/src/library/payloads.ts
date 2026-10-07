import {
  createAudioItem,
  createBrollVideo,
  createCaptionItem,
  createComponentItem,
  createImageItem,
  createOverlayItem,
  createTextItem,
  createVideoItem,
  wordsFromText,
} from "../../../src/engine/factory";
import { COMPONENT_REGISTRY } from "../../../src/engine/registry";
import type {
  Item,
  OverlayShape,
  Project,
  TextVariant,
  TrackKind,
} from "../../../src/engine/types";
import { addItem, TRACK_ACCEPTS, trackFor } from "../project/actions";
import { usePlayback } from "../project/playback";
import { useEditor } from "../project/store";
import { STICKERS } from "./stickers";

export const DRAG_MIME = "application/x-reels-editor";

export type LibraryPayload =
  | { kind: "text"; variant: TextVariant }
  | { kind: "caption"; presetId: string }
  | { kind: "overlay"; shape: OverlayShape }
  | { kind: "icon"; name: string }
  | { kind: "sticker"; id: string }
  | { kind: "media"; assetId: string; as?: "main" | "broll" }
  | {
      kind: "audio";
      src: string;
      durationInFrames: number;
      role: "sfx" | "music";
    }
  | { kind: "component"; componentId: string };

const defaultTrackKind = (p: LibraryPayload, project: Project): TrackKind => {
  switch (p.kind) {
    case "text":
      return "text";
    case "sticker":
      return "overlays";
    case "caption":
      return "captions";
    case "overlay":
    case "icon":
      return "overlays";
    case "component":
      return "graphics";
    case "audio":
      return p.role;
    case "media": {
      const a = project.media.find((m) => m.id === p.assetId);
      if (a?.kind === "audio") return "music";
      if (a?.kind === "video" && p.as === "main") return "video";
      return "broll";
    }
  }
};

/** Creates an item from a library entry, at the playhead (click) or the drop position (drag). */
export const createFromPayload = (
  payload: LibraryPayload,
  at?: { trackId?: string; frame?: number },
) => {
  const project = useEditor.getState().project;
  if (!project) return;
  const frame = Math.max(
    0,
    Math.round(at?.frame ?? usePlayback.getState().frame),
  );
  let item: Item | null = null;
  const tk = defaultTrackKind(payload, project);
  const trackId = trackFor(project, tk);

  switch (payload.kind) {
    case "text":
      item = createTextItem(project, {
        trackId,
        from: frame,
        variant: payload.variant,
      });
      break;
    case "sticker": {
      const s = STICKERS.find((x) => x.id === payload.id);
      if (!s) return;
      const t = createTextItem(project, {
        trackId,
        from: frame,
        variant: "label",
        text: s.text,
      });
      t.name = `Sticker · ${s.text}`;
      t.style = { ...t.style, ...s.style(project.global) };
      t.transform.rotation = s.rotation;
      item = t;
      break;
    }
    case "caption": {
      const dur = project.fps * 2;
      item = createCaptionItem(project, {
        trackId,
        from: frame,
        durationInFrames: dur,
        words: wordsFromText("اكتب الكابشن هنا", dur),
        presetId: payload.presetId,
      });
      break;
    }
    case "overlay":
      item = createOverlayItem(project, {
        trackId,
        from: frame,
        shape: payload.shape,
      });
      break;
    case "icon": {
      const o = createOverlayItem(project, {
        trackId,
        from: frame,
        shape: "icon",
      });
      o.texts = [payload.name];
      o.name = `Icon · ${payload.name}`;
      item = o;
      break;
    }
    case "component": {
      const c = COMPONENT_REGISTRY[payload.componentId];
      if (!c) return;
      item = createComponentItem(project, {
        trackId,
        from: frame,
        durationInFrames: c.defaultDuration,
        componentId: payload.componentId,
        name: c.label,
      });
      break;
    }
    case "audio":
      item = createAudioItem({
        trackId,
        role: payload.role,
        src: payload.src,
        from: frame,
        durationInFrames: payload.durationInFrames,
      });
      break;
    case "media": {
      const a = project.media.find((m) => m.id === payload.assetId);
      if (!a) return;
      if (a.kind === "audio") {
        item = createAudioItem({
          trackId,
          role: "music",
          src: a.src,
          from: frame,
          durationInFrames: a.durationInFrames ?? 300,
        });
      } else if (a.kind === "image") {
        const ratio = (a.width ?? 1) / (a.height ?? 1);
        const w = ratio >= 1 ? 840 : Math.round(840 * ratio);
        const h = ratio >= 1 ? Math.round(840 / ratio) : 840;
        item = createImageItem(project, {
          trackId,
          src: a.src,
          from: frame,
          width: w,
          height: h,
        });
      } else if (tk === "video") {
        item = createVideoItem(project, {
          trackId,
          src: a.src,
          from: frame,
          durationInFrames: a.durationInFrames ?? 150,
        });
      } else {
        const ratio = (a.width ?? 9) / (a.height ?? 16);
        const w = 840;
        const h = Math.min(1100, Math.round(w / ratio));
        item = createBrollVideo(project, {
          trackId,
          src: a.src,
          from: frame,
          durationInFrames: Math.min(a.durationInFrames ?? 90, project.fps * 4),
          width: w,
          height: h,
        });
      }
      break;
    }
  }
  if (!item) return;
  // Respect an explicit drop track when it accepts this item type.
  if (at?.trackId) {
    const t = project.tracks.find((x) => x.id === at.trackId);
    if (t && TRACK_ACCEPTS[t.kind].includes(item.type) && !t.locked)
      item.trackId = t.id;
  }
  addItem(item);
};

export const dragProps = (payload: LibraryPayload) => ({
  draggable: true,
  onDragStart: (e: React.DragEvent) => {
    e.dataTransfer.setData(DRAG_MIME, JSON.stringify(payload));
    e.dataTransfer.effectAllowed = "copy";
  },
  onClick: () => createFromPayload(payload),
});
