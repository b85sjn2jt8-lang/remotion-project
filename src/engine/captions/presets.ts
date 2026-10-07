import { defaultAnimationSet, defaultParams } from "../animation/presets";
import type {
  AnimationSet,
  Background,
  CaptionStyle,
  GlobalStyles,
  Shadow,
} from "../types";

export const noShadow = (): Shadow => ({
  enabled: false,
  color: "rgba(0,0,0,0.5)",
  blur: 24,
  x: 0,
  y: 6,
});

export const softShadow = (): Shadow => ({
  enabled: true,
  color: "rgba(0,0,0,0.5)",
  blur: 26,
  x: 0,
  y: 6,
});

export const noBackground = (): Background => ({
  enabled: false,
  color: "#000000",
  opacity: 0.6,
  radius: 18,
  paddingX: 22,
  paddingY: 8,
});

export const baseCaptionStyle = (g: GlobalStyles): CaptionStyle => ({
  fontFamily: g.captionFont,
  fontSize: 74,
  fontWeight: 800,
  lineHeight: 1.2,
  letterSpacing: 0,
  textAlign: "center",
  textColor: g.textColor,
  highlightColor: g.accentColor,
  emphasisColor: g.accentColor,
  emphasisScale: 1.5,
  emphasisOwnLine: true,
  strokeColor: g.defaultStrokeColor,
  strokeWidth: g.defaultStrokeWidth,
  shadow: { ...g.defaultShadow },
  background: noBackground(),
  emphasisBox: {
    ...noBackground(),
    color: g.accentColor,
    opacity: 1,
    radius: 14,
  },
  reveal: "word",
  highlight: "none",
  uppercase: false,
  maxWidth: 840,
});

export type CaptionPreset = {
  id: string;
  name: string;
  description: string;
  /** Category label in the presets panel. */
  group: "Essentials" | "Emphasis" | "Motion" | "Special";
  style: (g: GlobalStyles) => CaptionStyle;
  animation: (g: GlobalStyles) => AnimationSet;
  /** Optional Y override (composition px). */
  y?: (g: GlobalStyles) => number;
};

const anim = (o: Partial<AnimationSet>) => () => defaultAnimationSet(o);

export const CAPTION_PRESETS: CaptionPreset[] = [
  {
    id: "clean-bold",
    name: "Clean Bold",
    description: "White bold text, crisp outline. Works on anything.",
    group: "Essentials",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "phrase",
      emphasisOwnLine: false,
      emphasisScale: 1,
      emphasisColor: g.textColor,
    }),
    animation: anim({ in: "fade", inParams: defaultParams({ duration: 4 }) }),
  },
  {
    id: "word-highlight",
    name: "Word Highlight",
    description: "Spoken / key word switches to the accent color.",
    group: "Emphasis",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "phrase",
      highlight: "color",
      emphasisOwnLine: false,
      emphasisScale: 1.08,
    }),
    animation: anim({ in: "fade", inParams: defaultParams({ duration: 4 }) }),
  },
  {
    id: "pop-caption",
    name: "Pop Caption",
    description: "Key words pop with a fast scale spring.",
    group: "Emphasis",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "word",
      emphasisOwnLine: false,
      emphasisScale: 1.25,
    }),
    animation: anim({
      in: "wordReveal",
      inParams: defaultParams({ duration: 4 }),
      emphasis: "punch",
      emphasisParams: defaultParams({ duration: 8, intensity: 0.8 }),
    }),
  },
  {
    id: "punch-caption",
    name: "Punch Caption",
    description: "Strong entrance on the key word, then settles.",
    group: "Emphasis",
    style: (g) => ({
      ...baseCaptionStyle(g),
      fontWeight: 900,
      reveal: "word",
      emphasisScale: 1.6,
    }),
    animation: anim({
      in: "wordReveal",
      inParams: defaultParams({ duration: 4 }),
      emphasis: "punch",
      emphasisParams: defaultParams({ duration: 10, intensity: 1.2 }),
    }),
  },
  {
    id: "minimal-subtitle",
    name: "Minimal Subtitle",
    description: "Quiet, clean subtitle on a soft dark pill.",
    group: "Essentials",
    style: (g) => ({
      ...baseCaptionStyle(g),
      fontSize: 50,
      fontWeight: 500,
      strokeWidth: 0,
      shadow: noShadow(),
      reveal: "phrase",
      emphasisOwnLine: false,
      emphasisScale: 1,
      emphasisColor: g.textColor,
      background: {
        enabled: true,
        color: "#000000",
        opacity: 0.55,
        radius: 16,
        paddingX: 24,
        paddingY: 10,
      },
    }),
    animation: anim({
      in: "fade",
      inParams: defaultParams({ duration: 5 }),
      out: "fadeOut",
      outParams: defaultParams({ duration: 4 }),
    }),
    y: () => 1380,
  },
  {
    id: "box-caption",
    name: "Box Caption",
    description: "Key words sit inside an accent box.",
    group: "Emphasis",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "word",
      highlight: "box",
      emphasisOwnLine: false,
      emphasisScale: 1.05,
      emphasisColor: "#111111",
      emphasisBox: {
        enabled: true,
        color: g.accentColor,
        opacity: 1,
        radius: 14,
        paddingX: 16,
        paddingY: 2,
      },
    }),
    animation: anim({
      in: "wordReveal",
      inParams: defaultParams({ duration: 4 }),
      emphasis: "highlight",
    }),
  },
  {
    id: "dynamic-center",
    name: "Dynamic Center",
    description: "Center of the screen with subtle motion.",
    group: "Motion",
    style: (g) => ({
      ...baseCaptionStyle(g),
      fontSize: 84,
      fontWeight: 900,
      reveal: "phrase",
      emphasisScale: 1.3,
    }),
    animation: anim({
      in: "scale",
      inParams: defaultParams({ duration: 7, intensity: 0.6 }),
      emphasis: "floating",
    }),
    y: () => 960,
  },
  {
    id: "bottom-social",
    name: "Bottom Social",
    description: "Modern caption in the lower safe area.",
    group: "Essentials",
    style: (g) => ({
      ...baseCaptionStyle(g),
      fontSize: 66,
      reveal: "word",
      emphasisOwnLine: false,
      emphasisScale: 1.1,
      highlight: "color",
    }),
    animation: anim({
      in: "slideUp",
      inParams: defaultParams({ duration: 6, intensity: 0.4 }),
    }),
    y: () => 1340,
  },
  {
    id: "keyword-focus",
    name: "Keyword Focus",
    description:
      "Normal sentence, the keyword is clearly bigger on its own line.",
    group: "Emphasis",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "word",
      emphasisOwnLine: true,
      emphasisScale: 1.6,
    }),
    animation: anim({
      in: "wordReveal",
      inParams: defaultParams({ duration: 5 }),
      emphasis: "punch",
      emphasisParams: defaultParams({ duration: 9, intensity: 0.7 }),
    }),
  },
  {
    id: "bounce",
    name: "Bounce",
    description: "Light, professional bounce on entry.",
    group: "Motion",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "word",
      emphasisOwnLine: false,
      emphasisScale: 1.15,
    }),
    animation: anim({
      in: "bounce",
      inParams: defaultParams({ duration: 9, intensity: 0.5 }),
    }),
  },
  {
    id: "slide-up",
    name: "Slide Up",
    description: "Phrase slides in from below.",
    group: "Motion",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "phrase",
      emphasisOwnLine: false,
      emphasisScale: 1.1,
    }),
    animation: anim({
      in: "slideUp",
      inParams: defaultParams({ duration: 8, intensity: 0.7 }),
      out: "fadeOut",
      outParams: defaultParams({ duration: 3 }),
    }),
  },
  {
    id: "blur-reveal",
    name: "Blur Reveal",
    description: "Blur to sharp.",
    group: "Motion",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "word",
      emphasisOwnLine: false,
      emphasisScale: 1.15,
    }),
    animation: anim({ in: "blurIn", inParams: defaultParams({ duration: 8 }) }),
  },
  {
    id: "scale-reveal",
    name: "Scale Reveal",
    description: "Small to natural size.",
    group: "Motion",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "phrase",
      emphasisOwnLine: false,
      emphasisScale: 1.15,
    }),
    animation: anim({ in: "scale", inParams: defaultParams({ duration: 8 }) }),
  },
  {
    id: "mask-reveal",
    name: "Mask Reveal",
    description: "Text is unveiled by a moving mask.",
    group: "Motion",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "phrase",
      emphasisOwnLine: false,
      emphasisScale: 1.15,
    }),
    animation: anim({
      in: "maskReveal",
      inParams: defaultParams({ duration: 9, direction: "up" }),
    }),
  },
  {
    id: "word-by-word",
    name: "Word-by-Word",
    description: "Words appear one by one as spoken.",
    group: "Essentials",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "word",
      emphasisOwnLine: false,
      emphasisScale: 1.1,
    }),
    animation: anim({
      in: "wordReveal",
      inParams: defaultParams({ duration: 4 }),
    }),
  },
  {
    id: "phrase-by-phrase",
    name: "Phrase-by-Phrase",
    description: "Short phrases replace each other.",
    group: "Essentials",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "phrase",
      emphasisOwnLine: false,
      emphasisScale: 1.1,
    }),
    animation: anim({ in: "fade", inParams: defaultParams({ duration: 3 }) }),
  },
  {
    id: "karaoke",
    name: "Karaoke Highlight",
    description: "Words fill with color in sync with the voice.",
    group: "Special",
    style: (g) => ({
      ...baseCaptionStyle(g),
      reveal: "karaoke",
      highlight: "color",
      emphasisOwnLine: false,
      emphasisScale: 1,
    }),
    animation: anim({ in: "fade", inParams: defaultParams({ duration: 3 }) }),
  },
  {
    id: "impact-word",
    name: "Impact Word",
    description: "One very large word for the big moments.",
    group: "Special",
    style: (g) => ({
      ...baseCaptionStyle(g),
      fontSize: 150,
      fontWeight: 900,
      lineHeight: 1,
      reveal: "single",
      emphasisOwnLine: false,
      emphasisScale: 1.15,
      strokeWidth: 14,
    }),
    animation: anim({
      in: "overshoot",
      inParams: defaultParams({ duration: 6 }),
      emphasis: "microShake",
      emphasisParams: defaultParams({ duration: 8, intensity: 0.6 }),
    }),
    y: () => 900,
  },
  {
    id: "question",
    name: "Question Caption",
    description: "For questions & hooks — boxed headline look.",
    group: "Special",
    style: (g) => ({
      ...baseCaptionStyle(g),
      fontSize: 70,
      fontWeight: 900,
      strokeWidth: 0,
      textColor: "#111111",
      emphasisColor: g.accentColor,
      reveal: "phrase",
      emphasisOwnLine: false,
      emphasisScale: 1.05,
      background: {
        enabled: true,
        color: "#FFFFFF",
        opacity: 1,
        radius: 26,
        paddingX: 30,
        paddingY: 12,
      },
      shadow: { ...softShadow(), color: "rgba(0,0,0,0.35)" },
    }),
    animation: anim({
      in: "pop",
      inParams: defaultParams({ duration: 8 }),
      emphasis: "underlineReveal",
    }),
    y: () => 520,
  },
  {
    id: "number-stat",
    name: "Number / Statistic",
    description: "Numbers, prices and percentages hit hard.",
    group: "Special",
    style: (g) => ({
      ...baseCaptionStyle(g),
      fontWeight: 900,
      reveal: "word",
      emphasisOwnLine: true,
      emphasisScale: 2,
      emphasisColor: g.accentColor,
    }),
    animation: anim({
      in: "wordReveal",
      inParams: defaultParams({ duration: 4 }),
      emphasis: "punch",
      emphasisParams: defaultParams({ duration: 10, intensity: 1 }),
    }),
  },
];

export const findCaptionPreset = (id: string | undefined) =>
  CAPTION_PRESETS.find((p) => p.id === id);
