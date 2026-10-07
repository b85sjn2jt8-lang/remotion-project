import { defaultAnimationSet, defaultParams } from "../animation/presets";
import { noBackground, softShadow } from "../captions/presets";
import type {
  AnimationSet,
  GlobalStyles,
  TextStyle,
  TextVariant,
} from "../types";

export const baseTextStyle = (g: GlobalStyles): TextStyle => ({
  fontFamily: g.primaryFont,
  fontSize: 64,
  fontWeight: 800,
  lineHeight: 1.15,
  letterSpacing: 0,
  textAlign: "center",
  color: g.textColor,
  strokeColor: g.defaultStrokeColor,
  strokeWidth: 0,
  shadow: softShadow(),
  background: noBackground(),
  maxWidth: 840,
});

export type TextPreset = {
  variant: TextVariant;
  label: string;
  sample: string;
  style: (g: GlobalStyles) => TextStyle;
  animation: () => AnimationSet;
  duration: number;
};

export const TEXT_PRESETS: TextPreset[] = [
  {
    variant: "heading",
    label: "Heading",
    sample: "عنوان رئيسي",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 96,
      fontWeight: 900,
      lineHeight: 1.05,
    }),
    animation: () =>
      defaultAnimationSet({
        in: "pop",
        inParams: defaultParams({ duration: 8 }),
        out: "fadeOut",
      }),
    duration: 75,
  },
  {
    variant: "subheading",
    label: "Subheading",
    sample: "عنوان فرعي",
    style: (g) => ({ ...baseTextStyle(g), fontSize: 64, fontWeight: 800 }),
    animation: () =>
      defaultAnimationSet({
        in: "slideUp",
        inParams: defaultParams({ duration: 8, intensity: 0.5 }),
        out: "fadeOut",
      }),
    duration: 75,
  },
  {
    variant: "body",
    label: "Body",
    sample: "نص توضيحي قصير",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 48,
      fontWeight: 500,
      lineHeight: 1.35,
    }),
    animation: () => defaultAnimationSet({ in: "fade", out: "fadeOut" }),
    duration: 90,
  },
  {
    variant: "label",
    label: "Label",
    sample: "LABEL",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 44,
      fontWeight: 800,
      letterSpacing: 0.08,
      shadow: { ...softShadow(), enabled: false },
      background: {
        enabled: true,
        color: "#111111",
        opacity: 0.75,
        radius: 999,
        paddingX: 28,
        paddingY: 8,
      },
    }),
    animation: () =>
      defaultAnimationSet({
        in: "scale",
        inParams: defaultParams({ duration: 6 }),
        out: "fadeOut",
      }),
    duration: 60,
  },
  {
    variant: "callout",
    label: "Callout",
    sample: "نصيحة مهمة",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 60,
      fontWeight: 900,
      color: "#111111",
      background: {
        enabled: true,
        color: g.accentColor,
        opacity: 1,
        radius: 20,
        paddingX: 30,
        paddingY: 12,
      },
    }),
    animation: () =>
      defaultAnimationSet({
        in: "overshoot",
        inParams: defaultParams({ duration: 8 }),
        out: "scaleOut",
      }),
    duration: 60,
  },
  {
    variant: "price",
    label: "Price",
    sample: "420 ريال",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 110,
      fontWeight: 900,
      color: g.accentColor,
      strokeWidth: 10,
      strokeColor: "#000000",
    }),
    animation: () =>
      defaultAnimationSet({
        in: "pop",
        inParams: defaultParams({ duration: 8 }),
        emphasis: "punch",
        out: "fadeOut",
      }),
    duration: 60,
  },
  {
    variant: "statistic",
    label: "Statistic",
    sample: "+15%",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 150,
      fontWeight: 900,
      lineHeight: 1,
      color: g.textColor,
    }),
    animation: () =>
      defaultAnimationSet({
        in: "elastic",
        inParams: defaultParams({ duration: 10 }),
        out: "fadeOut",
      }),
    duration: 60,
  },
  {
    variant: "question",
    label: "Question",
    sample: "تعرف ليش؟",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 76,
      fontWeight: 900,
      color: "#111111",
      background: {
        enabled: true,
        color: "#FFFFFF",
        opacity: 1,
        radius: 28,
        paddingX: 36,
        paddingY: 14,
      },
    }),
    animation: () =>
      defaultAnimationSet({
        in: "pop",
        inParams: defaultParams({ duration: 8 }),
        emphasis: "underlineReveal",
        out: "scaleOut",
      }),
    duration: 75,
  },
  {
    variant: "cta",
    label: "CTA",
    sample: "تابعني للمزيد",
    style: (g) => ({
      ...baseTextStyle(g),
      fontSize: 62,
      fontWeight: 900,
      color: "#FFFFFF",
      background: {
        enabled: true,
        color: g.primaryColor,
        opacity: 1,
        radius: 999,
        paddingX: 40,
        paddingY: 16,
      },
    }),
    animation: () =>
      defaultAnimationSet({
        in: "slideUp",
        inParams: defaultParams({ duration: 9 }),
        emphasis: "pulse",
        out: "fadeOut",
      }),
    duration: 90,
  },
];

export const findTextPreset = (v: TextVariant) =>
  TEXT_PRESETS.find((p) => p.variant === v) ?? TEXT_PRESETS[0];
