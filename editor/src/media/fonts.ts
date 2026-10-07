import { useEffect } from "react";
import { create } from "zustand";
import { fontFamilies } from "../../../src/fonts";

export type FontFile = {
  family: string;
  file: string;
  weight: string;
  subset?: string;
};

/** Fonts available in public/fonts (built-in ones are always loaded by src/fonts.ts). */
export const useFonts = create<{ files: FontFile[] }>(() => ({ files: [] }));

export const refreshFonts = async () => {
  const files = (await (await fetch("/api/fonts")).json()) as FontFile[];
  useFonts.setState({ files });
};

export const useFontFamilies = () => {
  const files = useFonts((s) => s.files);
  useEffect(() => {
    if (!files.length) void refreshFonts();
  }, [files.length]);
  const fams = new Set<string>(fontFamilies);
  for (const f of files) fams.add(f.family);
  return [...fams].sort();
};

export const BUILTIN_FONTS = new Set<string>(fontFamilies);
