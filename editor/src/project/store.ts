import { create } from "zustand";
import { computeDuration } from "../../../src/engine/factory";
import type { Item, Project } from "../../../src/engine/types";

export type SafeZoneMode = "off" | "tiktok" | "reels" | "shorts";
export type LeftTab =
  | "text"
  | "captions"
  | "media"
  | "shapes"
  | "icons"
  | "stickers"
  | "effects"
  | "transitions"
  | "audio"
  | "motion";

export type SaveState = "saved" | "dirty" | "saving" | "error";

type EditorState = {
  project: Project | null;
  selection: string[];
  /** Selected word inside the selected caption. */
  wordId: string | null;
  past: Project[];
  future: Project[];
  /** Snapshot taken when a drag/scrub interaction starts (history entry on commit). */
  txBase: Project | null;
  saveState: SaveState;
  lastSavedAt: string | null;
  clipboard: Item[];
  // UI
  leftTab: LeftTab;
  pxPerFrame: number;
  snap: boolean;
  safeZone: SafeZoneMode;
  guides: boolean;
  /** Inspector shows global brand styles instead of the selection. */
  showGlobal: boolean;
};

export const useEditor = create<EditorState>(() => ({
  project: null,
  selection: [],
  wordId: null,
  past: [],
  future: [],
  txBase: null,
  saveState: "saved",
  lastSavedAt: null,
  clipboard: [],
  leftTab: "captions",
  pxPerFrame: 4,
  snap: true,
  safeZone: "off",
  guides: true,
  showGlobal: false,
}));

const HISTORY_LIMIT = 200;

const finalize = (p: Project): Project => ({
  ...p,
  durationInFrames: computeDuration(p),
  updatedAt: new Date().toISOString(),
});

/**
 * Applies a change to the project. `recipe` receives a deep copy it may mutate.
 * Inside a transaction (drag), changes are live but only one history entry is created on commit.
 */
export const commit = (recipe: (draft: Project) => void) => {
  const s = useEditor.getState();
  if (!s.project) return;
  const draft = structuredClone(s.project);
  recipe(draft);
  const next = finalize(draft);
  if (s.txBase) {
    useEditor.setState({ project: next, saveState: "dirty" });
    return;
  }
  useEditor.setState({
    project: next,
    past: [...s.past, s.project].slice(-HISTORY_LIMIT),
    future: [],
    saveState: "dirty",
  });
};

export const beginTx = () => {
  const s = useEditor.getState();
  if (s.project && !s.txBase) useEditor.setState({ txBase: s.project });
};

export const endTx = () => {
  const s = useEditor.getState();
  if (!s.txBase) return;
  const changed = s.txBase !== s.project;
  useEditor.setState({
    txBase: null,
    past: changed ? [...s.past, s.txBase].slice(-HISTORY_LIMIT) : s.past,
    future: changed ? [] : s.future,
  });
};

export const undo = () => {
  const s = useEditor.getState();
  const prev = s.past[s.past.length - 1];
  if (!prev || !s.project) return;
  useEditor.setState({
    project: prev,
    past: s.past.slice(0, -1),
    future: [s.project, ...s.future],
    saveState: "dirty",
  });
};

export const redo = () => {
  const s = useEditor.getState();
  const next = s.future[0];
  if (!next || !s.project) return;
  useEditor.setState({
    project: next,
    past: [...s.past, s.project],
    future: s.future.slice(1),
    saveState: "dirty",
  });
};

export const select = (ids: string[], wordId: string | null = null) =>
  useEditor.setState({ selection: ids, wordId, showGlobal: false });

export const getItem = (id: string | undefined) =>
  id ? useEditor.getState().project?.items.find((i) => i.id === id) : undefined;

/** Typed update of a single item. */
export const updateItem = <T extends Item>(id: string, fn: (item: T) => void) =>
  commit((p) => {
    const it = p.items.find((i) => i.id === id);
    if (it) fn(it as T);
  });
