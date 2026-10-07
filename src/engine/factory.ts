import { random } from "remotion";
import { defaultAnimationSet, defaultParams } from "./animation/presets";
import {
  baseCaptionStyle,
  findCaptionPreset,
  noShadow,
  softShadow,
} from "./captions/presets";
import { findTextPreset } from "./text/presets";
import {
  PROJECT_VERSION,
  type AudioItem,
  type AudioRole,
  type BrollVideoItem,
  type CaptionItem,
  type CaptionWord,
  type ComponentItem,
  type GlobalStyles,
  type ImageItem,
  type OverlayItem,
  type OverlayShape,
  type Project,
  type TextItem,
  type TextVariant,
  type Track,
  type TrackKind,
  type Transform,
  type VideoItem,
} from "./types";

export const uid = (prefix = "id") =>
  `${prefix}_${random(null).toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;

export const defaultGlobal = (): GlobalStyles => ({
  primaryFont: "Tajawal",
  captionFont: "Tajawal",
  primaryColor: "#FF3B5C",
  accentColor: "#F2B33D",
  textColor: "#FFFFFF",
  negativeColor: "#FF4D4D",
  captionY: 600,
  defaultShadow: softShadow(),
  defaultStrokeColor: "#000000",
  defaultStrokeWidth: 10,
});

export const TRACK_LABELS: Record<TrackKind, string> = {
  overlays: "Overlays",
  graphics: "Graphics",
  text: "Text",
  captions: "Captions",
  broll: "B-roll",
  video: "Video",
  voice: "Voice",
  sfx: "SFX",
  music: "Music",
};

/** Default track stack, top layer first. */
export const defaultTracks = (): Track[] =>
  (
    [
      "overlays",
      "graphics",
      "text",
      "captions",
      "broll",
      "video",
      "voice",
      "sfx",
      "music",
    ] as TrackKind[]
  ).map((kind) => ({ id: `track_${kind}`, kind, name: TRACK_LABELS[kind] }));

export const emptyProject = (name = "Untitled", id = uid("proj")): Project => ({
  version: PROJECT_VERSION,
  id,
  name,
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 300,
  backgroundColor: "#000000",
  global: defaultGlobal(),
  tracks: defaultTracks(),
  items: [],
  media: [],
  fonts: [],
  updatedAt: new Date().toISOString(),
});

export const centerTransform = (
  p: { width: number; height: number },
  y?: number,
): Transform => ({
  x: p.width / 2,
  y: y ?? p.height / 2,
  scale: 1,
  rotation: 0,
  opacity: 1,
  blur: 0,
});

export const createVideoItem = (
  p: Project,
  o: {
    trackId: string;
    src: string;
    from: number;
    durationInFrames: number;
    trimBefore?: number;
    name?: string;
  },
): VideoItem => ({
  id: uid("vid"),
  type: "video",
  trackId: o.trackId,
  name: o.name ?? o.src.split("/").pop() ?? "Video",
  from: o.from,
  durationInFrames: o.durationInFrames,
  src: o.src,
  trimBefore: o.trimBefore ?? 0,
  fit: "cover",
  transform: centerTransform(p),
  origin: { x: 50, y: 50 },
  crop: { top: 0, right: 0, bottom: 0, left: 0 },
  radius: 0,
  volume: 1,
  muted: false,
  fadeIn: 0,
  fadeOut: 0,
  adjust: { contrast: 1, saturation: 1, brightness: 1 },
});

export const createBrollVideo = (
  p: Project,
  o: {
    trackId: string;
    src: string;
    from: number;
    durationInFrames: number;
    width?: number;
    height?: number;
  },
): BrollVideoItem => ({
  ...createVideoItem(p, o),
  id: uid("brv"),
  type: "brollVideo",
  width: o.width ?? 840,
  height: o.height ?? 1050,
  transform: centerTransform(p, 760),
  radius: 28,
  volume: 0,
  shadow: { ...softShadow(), color: "rgba(0,0,0,0.45)", blur: 40, y: 18 },
  animation: defaultAnimationSet({
    in: "scale",
    inParams: defaultParams({ duration: 8 }),
    out: "fadeOut",
  }),
});

export const createImageItem = (
  p: Project,
  o: {
    trackId: string;
    src: string;
    from: number;
    durationInFrames?: number;
    width?: number;
    height?: number;
  },
): ImageItem => ({
  id: uid("img"),
  type: "image",
  trackId: o.trackId,
  name: o.src.split("/").pop() ?? "Image",
  from: o.from,
  durationInFrames: o.durationInFrames ?? 90,
  src: o.src,
  fit: "contain",
  width: o.width ?? 720,
  height: o.height ?? 720,
  transform: centerTransform(p, 760),
  crop: { top: 0, right: 0, bottom: 0, left: 0 },
  radius: 24,
  shadow: { ...softShadow(), color: "rgba(0,0,0,0.4)", blur: 40, y: 16 },
  animation: defaultAnimationSet({
    in: "pop",
    inParams: defaultParams({ duration: 8 }),
    out: "fadeOut",
  }),
});

export const createCaptionItem = (
  p: Project,
  o: {
    trackId: string;
    from: number;
    durationInFrames: number;
    words: CaptionWord[];
    presetId?: string;
  },
): CaptionItem => {
  const preset = findCaptionPreset(o.presetId ?? "keyword-focus");
  return {
    id: uid("cap"),
    type: "caption",
    trackId: o.trackId,
    name:
      o.words
        .map((w) => w.text)
        .join(" ")
        .slice(0, 40) || "Caption",
    from: o.from,
    durationInFrames: o.durationInFrames,
    words: o.words,
    style: preset ? preset.style(p.global) : baseCaptionStyle(p.global),
    animation: preset ? preset.animation(p.global) : defaultAnimationSet(),
    transform: centerTransform(
      p,
      preset?.y ? preset.y(p.global) : p.global.captionY,
    ),
    presetId: preset?.id,
  };
};

/** Splits plain text into evenly timed words across `duration` frames. */
export const wordsFromText = (
  text: string,
  duration: number,
): CaptionWord[] => {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  const step = duration / Math.max(1, parts.length);
  return parts.map((t, i) => ({
    id: uid("w"),
    text: t,
    start: Math.round(i * step),
    end: Math.round((i + 1) * step),
  }));
};

export const createTextItem = (
  p: Project,
  o: { trackId: string; from: number; variant: TextVariant; text?: string },
): TextItem => {
  const preset = findTextPreset(o.variant);
  return {
    id: uid("txt"),
    type: "text",
    trackId: o.trackId,
    name: preset.label,
    from: o.from,
    durationInFrames: preset.duration,
    variant: o.variant,
    text: o.text ?? preset.sample,
    style: preset.style(p.global),
    animation: preset.animation(),
    transform: centerTransform(p, 420),
  };
};

const OVERLAY_DEFAULTS: Record<OverlayShape, Partial<OverlayItem>> = {
  arrow: { width: 320, height: 140, strokeWidth: 14 },
  circle: { width: 360, height: 260, strokeWidth: 12 },
  rectangle: { width: 420, height: 260, strokeWidth: 10, radius: 24 },
  highlight: { width: 520, height: 90, radius: 12 },
  underline: { width: 480, height: 40, strokeWidth: 14 },
  pointer: { width: 140, height: 140, secondaryColor: "#111111" },
  check: {
    width: 150,
    height: 150,
    color: "#22C55E",
    secondaryColor: "#FFFFFF",
  },
  x: { width: 150, height: 150, color: "#FF4D4D", secondaryColor: "#FFFFFF" },
  callout: {
    width: 560,
    height: 130,
    radius: 24,
    secondaryColor: "#111111",
    texts: ["نقطة مهمة"],
  },
  priceTag: {
    width: 560,
    height: 170,
    radius: 28,
    secondaryColor: "#111111",
    texts: ["420", "ريال", "500"],
  },
  featureCard: {
    width: 620,
    height: 210,
    radius: 30,
    color: "#141416",
    secondaryColor: "#FFFFFF",
    texts: ["الميزة", "شحن سريع 100W"],
  },
  comparisonCard: {
    width: 840,
    height: 220,
    radius: 28,
    secondaryColor: "#111111",
    texts: ["الأصلي", "التقليد"],
  },
  icon: {
    width: 160,
    height: 160,
    radius: 999,
    color: "#111111",
    secondaryColor: "#FFFFFF",
    strokeWidth: 10,
    texts: ["Zap"],
  },
};

export const OVERLAY_LABELS: Record<OverlayShape, string> = {
  arrow: "Arrow",
  circle: "Circle",
  rectangle: "Rectangle",
  highlight: "Highlight",
  underline: "Underline",
  pointer: "Pointer",
  check: "Check",
  x: "X",
  callout: "Callout",
  priceTag: "Price Tag",
  featureCard: "Feature Card",
  comparisonCard: "Comparison Card",
  icon: "Icon",
};

export const createOverlayItem = (
  p: Project,
  o: { trackId: string; from: number; shape: OverlayShape },
): OverlayItem => ({
  id: uid("ovl"),
  type: "overlay",
  trackId: o.trackId,
  name: OVERLAY_LABELS[o.shape],
  from: o.from,
  durationInFrames: 60,
  shape: o.shape,
  width: 300,
  height: 200,
  color: p.global.accentColor,
  secondaryColor: "#FFFFFF",
  strokeWidth: 10,
  texts: [],
  fontFamily: p.global.primaryFont,
  transform: centerTransform(p, 760),
  animation: defaultAnimationSet({
    in: "pop",
    inParams: defaultParams({ duration: 8 }),
    out: "fadeOut",
  }),
  radius: 0,
  shadow: noShadow(),
  ...OVERLAY_DEFAULTS[o.shape],
});

export const createAudioItem = (o: {
  trackId: string;
  role: AudioRole;
  src: string;
  from: number;
  durationInFrames: number;
  volume?: number;
  name?: string;
}): AudioItem => ({
  id: uid("aud"),
  type: "audio",
  trackId: o.trackId,
  name: o.name ?? o.src.split("/").pop() ?? "Audio",
  role: o.role,
  src: o.src,
  from: o.from,
  durationInFrames: o.durationInFrames,
  trimBefore: 0,
  volume: o.volume ?? (o.role === "music" ? 0.15 : o.role === "sfx" ? 0.35 : 1),
  fadeIn: o.role === "music" ? 15 : 0,
  fadeOut: o.role === "music" ? 30 : 0,
  muted: false,
});

export const createComponentItem = (
  p: Project,
  o: {
    trackId: string;
    from: number;
    durationInFrames: number;
    componentId: string;
    name: string;
  },
): ComponentItem => ({
  id: uid("cmp"),
  type: "component",
  trackId: o.trackId,
  name: o.name,
  from: o.from,
  durationInFrames: o.durationInFrames,
  componentId: o.componentId,
  transform: centerTransform(p),
});

/** Project length = end of the last item (min 1 s). */
export const computeDuration = (p: Project) =>
  Math.max(p.fps, ...p.items.map((i) => i.from + i.durationInFrames));
