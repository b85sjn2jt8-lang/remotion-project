import {
  AudioLines,
  Captions,
  Clapperboard,
  Film,
  Image,
  Mic,
  Music,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";
import type { TrackKind } from "../../../src/engine/types";

export const TRACK_ICONS: Record<TrackKind, typeof Film> = {
  video: Film,
  broll: Image,
  captions: Captions,
  text: Type,
  graphics: Sparkles,
  overlays: Shapes,
  voice: Mic,
  sfx: AudioLines,
  music: Music,
};

export const ITEM_COLORS: Record<string, string> = {
  video: "linear-gradient(180deg,#2f5d8f,#24476d)",
  brollVideo: "linear-gradient(180deg,#2c7a7b,#1f5c5d)",
  image: "linear-gradient(180deg,#2c7a7b,#1f5c5d)",
  caption: "linear-gradient(180deg,#6b4fd6,#5139ad)",
  text: "linear-gradient(180deg,#b8573a,#93432c)",
  overlay: "linear-gradient(180deg,#b0447a,#8d3462)",
  component: "linear-gradient(180deg,#8a6a1f,#6d5317)",
  audio: "linear-gradient(180deg,#2f7a4b,#235c38)",
};

export { Clapperboard };
