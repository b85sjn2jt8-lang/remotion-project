import { loadFont } from "@remotion/fonts";
import { useEffect, useState } from "react";
import { staticFile, useDelayRender } from "remotion";
import "../fonts";
import type { ProjectFont } from "./types";

const loaded = new Map<string, Promise<void>>();

export const loadProjectFont = (f: ProjectFont) => {
  const key = `${f.family}|${f.file}|${f.weight}`;
  if (!loaded.has(key)) {
    loaded.set(
      key,
      loadFont({
        family: f.family,
        url: staticFile(`fonts/${f.file}`),
        weight: f.weight,
        unicodeRange: f.unicodeRange,
      }).catch(() => undefined),
    );
  }
  return loaded.get(key) as Promise<void>;
};

/** Loads user-added project fonts (built-in ones come from src/fonts.ts). Blocks rendering until ready. */
export const useProjectFonts = (fonts: ProjectFont[]) => {
  const { delayRender, continueRender } = useDelayRender();
  const key = fonts.map((f) => f.file).join(",");
  const [, setReady] = useState(false);
  useEffect(() => {
    if (fonts.length === 0) return;
    const handle = delayRender(`Loading project fonts ${key}`);
    Promise.all(fonts.map(loadProjectFont)).then(() => {
      setReady(true);
      continueRender(handle);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
};
