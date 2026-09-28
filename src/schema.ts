import { zColor } from "@remotion/zod-types";
import { z } from "zod";
import { fontFamilies } from "./fonts";

// Global look of a video. These show up in the Studio "Props" panel (right sidebar)
// with color pickers and sliders, and saving there writes back to Root.tsx.
export const captionStyleSchema = z.object({
  enabled: z.boolean(),
  fontFamily: z.enum(fontFamilies),
  fontSize: z.number().min(40).max(160).step(2),
  textColor: zColor(),
  highlightColor: zColor(),
  highlightStyle: z.enum(["text", "box"]),
  strokeColor: zColor(),
  strokeWidth: z.number().min(0).max(24).step(1),
  uppercase: z.boolean(),
  distanceFromBottom: z.number().min(200).max(1400).step(10),
  combineWordsWithinMs: z.number().min(0).max(3000).step(50),
});

export const socialVideoSchema = z.object({
  accentColor: zColor(),
  showProgressBar: z.boolean(),
  showSafeZones: z.boolean(),
  captions: captionStyleSchema,
});

export type CaptionStyle = z.infer<typeof captionStyleSchema>;
export type SocialVideoProps = z.infer<typeof socialVideoSchema>;
