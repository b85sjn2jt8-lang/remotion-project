/**
 * Editor project data model.
 *
 * Everything the editor changes lives in this JSON-serialisable structure. The original media is
 * never modified: crops, zooms, captions, motion and b-roll are all just data that the Remotion
 * composition (`ProjectComposition`) interprets at preview/render time.
 *
 * Times on the timeline are in frames (project fps). Caption word times are in frames relative to
 * the caption item's `from`, so moving a caption moves its words.
 */

export const PROJECT_VERSION = 1;

export type TrackKind =
  | "video"
  | "broll"
  | "captions"
  | "text"
  | "graphics"
  | "overlays"
  | "sfx"
  | "music"
  | "voice";

export type Track = {
  id: string;
  kind: TrackKind;
  name: string;
  hidden?: boolean;
  muted?: boolean;
  locked?: boolean;
};

export type EasingName =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "spring";

export type Keyframe = {
  /** Frame relative to the item's `from`. */
  frame: number;
  value: number;
  easing: EasingName;
};

export type AnimatableProp =
  | "x"
  | "y"
  | "scale"
  | "rotation"
  | "opacity"
  | "blur"
  | "radius";

export type Keyframes = Partial<Record<AnimatableProp, Keyframe[]>>;

/** Position is the element's center in composition pixels (0..width, 0..height). */
export type Transform = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  blur: number;
};

export type Crop = { top: number; right: number; bottom: number; left: number };

export type AnimationParams = {
  /** Duration in frames. */
  duration: number;
  /** Delay in frames. */
  delay: number;
  stiffness: number;
  damping: number;
  /** 0..2, 1 = default. */
  intensity: number;
  direction: "up" | "down" | "left" | "right";
};

export type InAnimationId =
  | "none"
  | "fade"
  | "pop"
  | "bounce"
  | "scale"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "blurIn"
  | "maskReveal"
  | "spring"
  | "overshoot"
  | "typewriter"
  | "wordReveal"
  | "rotate"
  | "elastic"
  | "trackingReveal"
  | "wipe";

export type OutAnimationId =
  | "none"
  | "fadeOut"
  | "scaleOut"
  | "slideOut"
  | "blurOut"
  | "quickDisappear";

export type EmphasisAnimationId =
  | "none"
  | "punch"
  | "shake"
  | "microShake"
  | "bounce"
  | "scalePulse"
  | "colorFlash"
  | "highlight"
  | "underlineReveal"
  | "floating"
  | "pulse";

export type AnimationSet = {
  in: InAnimationId;
  inParams: AnimationParams;
  emphasis: EmphasisAnimationId;
  emphasisParams: AnimationParams;
  out: OutAnimationId;
  outParams: AnimationParams;
};

export type Shadow = {
  enabled: boolean;
  color: string;
  blur: number;
  x: number;
  y: number;
};

export type Background = {
  enabled: boolean;
  color: string;
  opacity: number;
  radius: number;
  paddingX: number;
  paddingY: number;
};

/** How caption words are revealed while a caption is on screen. */
export type CaptionReveal =
  | "phrase" // whole phrase at once
  | "word" // words appear as spoken
  | "karaoke" // all visible, spoken words colored progressively
  | "single"; // only the current word is visible

/** How the spoken / emphasized word is marked. */
export type CaptionHighlight = "none" | "color" | "box" | "scale" | "underline";

export type CaptionStyle = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: "center" | "right" | "left";
  textColor: string;
  highlightColor: string;
  /** Color used for words marked emphasis. */
  emphasisColor: string;
  /** Size multiplier for emphasized words. */
  emphasisScale: number;
  /** Emphasized words get their own line (keyword focus). */
  emphasisOwnLine: boolean;
  strokeColor: string;
  strokeWidth: number;
  shadow: Shadow;
  background: Background;
  /** Background box for emphasized words only. */
  emphasisBox: Background;
  reveal: CaptionReveal;
  highlight: CaptionHighlight;
  uppercase: boolean;
  maxWidth: number;
};

export type WordStyle = {
  color?: string;
  /** Multiplier on caption font size. */
  size?: number;
  weight?: number;
  background?: string;
  strokeColor?: string;
  strokeWidth?: number;
  scale?: number;
  animation?: EmphasisAnimationId;
};

export type CaptionWord = {
  id: string;
  text: string;
  /** Frames relative to the caption item's `from`. */
  start: number;
  end: number;
  emphasis?: boolean;
  /** Visual tone shortcut (negative words use the global negative color). */
  tone?: "negative";
  style?: WordStyle;
};

type ItemBase = {
  id: string;
  trackId: string;
  name: string;
  from: number;
  durationInFrames: number;
  keyframes?: Keyframes;
};

export type TransitionId =
  | "cut"
  | "fade"
  | "crossDissolve"
  | "push"
  | "slide"
  | "zoom"
  | "blur"
  | "wipe"
  | "mask";

export type Transition = { type: TransitionId; durationInFrames: number };

export type VideoItem = ItemBase & {
  type: "video";
  src: string;
  /** Source frames skipped before this clip starts. */
  trimBefore: number;
  fit: "cover" | "contain";
  transform: Transform;
  /** Zoom anchor, in % of the frame. */
  origin: { x: number; y: number };
  crop: Crop;
  radius: number;
  volume: number;
  muted: boolean;
  fadeIn: number;
  fadeOut: number;
  /** Light, non-destructive picture adjustments (CSS filters). */
  adjust: { contrast: number; saturation: number; brightness: number };
  transitionIn?: Transition;
  /** Applied zoom/pan motion preset (resolved into keyframes on apply). */
  motionPreset?: string;
};

export type ImageItem = ItemBase & {
  type: "image";
  src: string;
  fit: "cover" | "contain";
  /** Box size in composition pixels. */
  width: number;
  height: number;
  transform: Transform;
  crop: Crop;
  radius: number;
  shadow: Shadow;
  animation: AnimationSet;
};

export type BrollVideoItem = Omit<VideoItem, "type"> & {
  type: "brollVideo";
  width: number;
  height: number;
  shadow: Shadow;
  animation: AnimationSet;
};

export type CaptionItem = ItemBase & {
  type: "caption";
  words: CaptionWord[];
  style: CaptionStyle;
  animation: AnimationSet;
  transform: Transform;
  /** Id of the preset the style came from (for display only). */
  presetId?: string;
};

export type TextVariant =
  | "heading"
  | "subheading"
  | "body"
  | "label"
  | "callout"
  | "price"
  | "statistic"
  | "question"
  | "cta";

export type TextStyle = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: "center" | "right" | "left";
  color: string;
  strokeColor: string;
  strokeWidth: number;
  shadow: Shadow;
  background: Background;
  maxWidth: number;
};

export type TextItem = ItemBase & {
  type: "text";
  variant: TextVariant;
  text: string;
  style: TextStyle;
  animation: AnimationSet;
  transform: Transform;
};

export type OverlayShape =
  | "arrow"
  | "circle"
  | "rectangle"
  | "highlight"
  | "underline"
  | "pointer"
  | "check"
  | "x"
  | "callout"
  | "priceTag"
  | "featureCard"
  | "comparisonCard"
  | "icon";

export type OverlayItem = ItemBase & {
  type: "overlay";
  shape: OverlayShape;
  width: number;
  height: number;
  color: string;
  secondaryColor: string;
  strokeWidth: number;
  /** Text slots used by callout / price tag / cards. */
  texts: string[];
  fontFamily: string;
  transform: Transform;
  animation: AnimationSet;
  radius: number;
  shadow: Shadow;
};

export type AudioRole = "voice" | "music" | "sfx";

export type AudioItem = ItemBase & {
  type: "audio";
  role: AudioRole;
  src: string;
  trimBefore: number;
  volume: number;
  fadeIn: number;
  fadeOut: number;
  muted: boolean;
  /** Optional: item id this SFX is linked to (moves with it). */
  linkedTo?: string;
  linkOffset?: number;
};

/** A hand-built React scene from the code base (e.g. migrated Ray391 graphics). */
export type ComponentItem = ItemBase & {
  type: "component";
  componentId: string;
  transform: Transform;
};

export type Item =
  | VideoItem
  | ImageItem
  | BrollVideoItem
  | CaptionItem
  | TextItem
  | OverlayItem
  | AudioItem
  | ComponentItem;

export type ItemType = Item["type"];

export type GlobalStyles = {
  primaryFont: string;
  captionFont: string;
  primaryColor: string;
  accentColor: string;
  textColor: string;
  negativeColor: string;
  /** Caption center Y in composition px. */
  captionY: number;
  defaultShadow: Shadow;
  defaultStrokeColor: string;
  defaultStrokeWidth: number;
};

export type ProjectFont = {
  family: string;
  file: string;
  weight: string;
  unicodeRange?: string;
};

export type MediaAsset = {
  id: string;
  name: string;
  kind: "video" | "image" | "audio";
  /** Path inside public/ (use with staticFile). */
  src: string;
  durationInFrames?: number;
  width?: number;
  height?: number;
};

export type Project = {
  version: number;
  id: string;
  name: string;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  backgroundColor: string;
  global: GlobalStyles;
  tracks: Track[];
  items: Item[];
  media: MediaAsset[];
  fonts: ProjectFont[];
  updatedAt: string;
};
