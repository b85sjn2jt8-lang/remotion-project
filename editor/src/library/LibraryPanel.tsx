import {
  AudioLines,
  Blend,
  Captions,
  Film,
  Image as ImageIcon,
  Shapes,
  Sparkles,
  Sticker,
  Type,
  Wand2,
} from "lucide-react";
import React from "react";
import type { LeftTab } from "../project/store";
import { useEditor } from "../project/store";
import { AudioTab } from "./tabs/AudioTab";
import { CaptionsTab } from "./tabs/CaptionsTab";
import { EffectsTab } from "./tabs/EffectsTab";
import { IconsTab } from "./tabs/IconsTab";
import { MediaTab } from "./tabs/MediaTab";
import { MotionTab } from "./tabs/MotionTab";
import { ShapesTab } from "./tabs/ShapesTab";
import { StickersTab } from "./tabs/StickersTab";
import { TextTab } from "./tabs/TextTab";
import { TransitionsTab } from "./tabs/TransitionsTab";

const TABS: { id: LeftTab; label: string; icon: React.ReactNode }[] = [
  { id: "captions", label: "Captions", icon: <Captions size={18} /> },
  { id: "text", label: "Text", icon: <Type size={18} /> },
  { id: "media", label: "Media", icon: <Film size={18} /> },
  { id: "shapes", label: "Shapes", icon: <Shapes size={18} /> },
  { id: "icons", label: "Icons", icon: <ImageIcon size={18} /> },
  { id: "stickers", label: "Stickers", icon: <Sticker size={18} /> },
  { id: "effects", label: "Effects", icon: <Wand2 size={18} /> },
  { id: "transitions", label: "Transitions", icon: <Blend size={18} /> },
  { id: "audio", label: "Audio", icon: <AudioLines size={18} /> },
  { id: "motion", label: "Motion", icon: <Sparkles size={18} /> },
];

export const Rail: React.FC = () => {
  const tab = useEditor((s) => s.leftTab);
  return (
    <div className="rail">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`rail-btn${tab === t.id ? " active" : ""}`}
          onClick={() => useEditor.setState({ leftTab: t.id })}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export const LibraryPanel: React.FC = () => {
  const tab = useEditor((s) => s.leftTab);
  return (
    <div className="library">
      {tab === "captions" && <CaptionsTab />}
      {tab === "text" && <TextTab />}
      {tab === "media" && <MediaTab />}
      {tab === "shapes" && <ShapesTab />}
      {tab === "icons" && <IconsTab />}
      {tab === "stickers" && <StickersTab />}
      {tab === "effects" && <EffectsTab />}
      {tab === "transitions" && <TransitionsTab />}
      {tab === "audio" && <AudioTab />}
      {tab === "motion" && <MotionTab />}
    </div>
  );
};
