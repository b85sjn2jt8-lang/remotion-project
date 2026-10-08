import { FileText } from "lucide-react";
import React, { useRef } from "react";
import {
  createCaptionItem,
  uid,
  wordsFromText,
} from "../../../src/engine/factory";
import type { CaptionItem } from "../../../src/engine/types";
import { trackFor } from "../project/actions";
import { captionsFromWords } from "./wordsToCaptions";
import { commit, useEditor } from "../project/store";

const toFrames = (t: string, fps: number) => {
  const m = t.trim().match(/(\d+):(\d+):(\d+)[,.](\d+)/);
  if (!m) return 0;
  return (+m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000) * fps;
};

/** Imports .srt (phrase timing) or @remotion/captions JSON (word timing) as caption clips. */
export const ImportSrtButton: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const onFile = async (file: File) => {
    const project = useEditor.getState().project!;
    const text = await file.text();
    const fps = project.fps;
    const trackId = trackFor(project, "captions");
    const items: CaptionItem[] = [];
    const mainVideo = project.items.find((i) => i.type === "video");
    if (
      file.name.endsWith(".json") &&
      mainVideo &&
      mainVideo.type === "video"
    ) {
      // Word-level JSON is in source time: follow the cut of the main video.
      items.push(
        ...captionsFromWords(project, mainVideo.src, JSON.parse(text)),
      );
    } else if (file.name.endsWith(".json")) {
      const words = JSON.parse(text) as {
        text: string;
        startMs: number;
        endMs: number;
        pageBreakAfter?: boolean;
      }[];
      let group: typeof words = [];
      const flush = () => {
        if (!group.length) return;
        const from = Math.round((group[0].startMs / 1000) * fps);
        const end =
          Math.round((group[group.length - 1].endMs / 1000) * fps) + 6;
        items.push(
          createCaptionItem(project, {
            trackId,
            from,
            durationInFrames: Math.max(1, end - from),
            words: group.map((w) => ({
              id: uid("w"),
              text: w.text.trim(),
              start: +((w.startMs / 1000) * fps - from).toFixed(2),
              end: +((w.endMs / 1000) * fps - from).toFixed(2),
            })),
          }),
        );
        group = [];
      };
      for (const w of words) {
        group.push(w);
        if (w.pageBreakAfter || group.length >= 4) flush();
      }
      flush();
    } else {
      for (const block of text.replace(/\r/g, "").split(/\n\n+/)) {
        const lines = block.trim().split("\n");
        const ti = lines.findIndex((l) => l.includes("-->"));
        if (ti < 0) continue;
        const [a, b] = lines[ti].split("-->");
        const from = Math.round(toFrames(a, fps));
        const to = Math.round(toFrames(b, fps));
        const body = lines
          .slice(ti + 1)
          .join(" ")
          .replace(/<[^>]+>/g, "");
        if (!body.trim()) continue;
        items.push(
          createCaptionItem(project, {
            trackId,
            from,
            durationInFrames: Math.max(1, to - from),
            words: wordsFromText(body, to - from),
          }),
        );
      }
    }
    commit((p) => {
      p.items.push(...items);
    });
  };
  return (
    <>
      <button
        className="btn"
        onClick={() => ref.current?.click()}
        data-tip="Import .srt or word-level .json"
      >
        <FileText size={14} /> Import
      </button>
      <input
        ref={ref}
        type="file"
        accept=".srt,.json"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void onFile(f);
          e.target.value = "";
        }}
      />
    </>
  );
};
