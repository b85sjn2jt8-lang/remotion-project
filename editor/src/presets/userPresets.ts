import { create } from "zustand";
import type {
  AnimationSet,
  CaptionStyle,
  GlobalStyles,
  TextStyle,
} from "../../../src/engine/types";

/**
 * Reusable user presets, stored in presets/library.json (shared by every project).
 * e.g. "Loay Caption 01", "Loay Hook", "Rukn Product Spec", "Bakoura Food Caption".
 */
export type UserPreset =
  | {
      id: string;
      name: string;
      kind: "caption";
      createdAt: string;
      data: { style: CaptionStyle; animation: AnimationSet; y: number };
    }
  | {
      id: string;
      name: string;
      kind: "text";
      createdAt: string;
      data: { style: TextStyle; animation: AnimationSet };
    }
  | {
      id: string;
      name: string;
      kind: "animation";
      createdAt: string;
      data: AnimationSet;
    }
  | {
      id: string;
      name: string;
      kind: "brand";
      createdAt: string;
      data: GlobalStyles;
    };

type Lib = { version: 1; presets: UserPreset[] };

export const usePresets = create<{ presets: UserPreset[]; loaded: boolean }>(
  () => ({ presets: [], loaded: false }),
);

export const loadPresets = async () => {
  const lib = (await (await fetch("/api/presets")).json()) as Lib;
  usePresets.setState({ presets: lib.presets ?? [], loaded: true });
};

const persist = async (presets: UserPreset[]) => {
  usePresets.setState({ presets });
  await fetch("/api/presets", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ version: 1, presets } satisfies Lib, null, 1),
  });
};

export const savePreset = async (p: Omit<UserPreset, "id" | "createdAt">) => {
  const existing = usePresets.getState().presets;
  const same = existing.find((x) => x.kind === p.kind && x.name === p.name);
  const preset = {
    ...p,
    id: same?.id ?? `preset_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  } as UserPreset;
  await persist(
    same
      ? existing.map((x) => (x.id === same.id ? preset : x))
      : [...existing, preset],
  );
  return preset;
};

export const deletePreset = (id: string) =>
  persist(usePresets.getState().presets.filter((p) => p.id !== id));

export const renamePreset = (id: string, name: string) =>
  persist(
    usePresets
      .getState()
      .presets.map((p) => (p.id === id ? { ...p, name } : p)),
  );
