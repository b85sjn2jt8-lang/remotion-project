import { AudioLines } from "lucide-react";
import React, { useState } from "react";
import { assetUrl } from "../../../src/engine/assets";
import { commit, useEditor } from "../project/store";
import { captionsFromWords } from "./autoCaptions";

/**
 * Transcribes the main video with whisper.cpp (runs locally; the model downloads on first use)
 * and lays the words out as caption clips that follow the cut.
 */
export const AutoCaptionsButton: React.FC = () => {
  const [state, setState] = useState<"idle" | "running" | "error">("idle");
  const [log, setLog] = useState("");
  const run = async () => {
    const project = useEditor.getState().project!;
    const video = project.items.find((i) => i.type === "video");
    if (!video || video.type !== "video")
      return alert("Add a video to the main video track first.");
    const language = prompt("Language code (ar, en, …)", "ar");
    if (!language) return;
    setState("running");
    await fetch("/api/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        src: video.src,
        language,
        model: language === "en" ? "small.en" : "medium",
      }),
    });
    const poll = async (): Promise<void> => {
      const j = await (
        await fetch(`/api/transcribe?src=${encodeURIComponent(video.src)}`)
      ).json();
      setLog(j.log ?? "");
      if (j.status === "running")
        return new Promise((r) => setTimeout(() => r(poll()), 2000));
      if (j.status !== "done") {
        setState("error");
        return;
      }
      const words = await (await fetch(assetUrl(j.captions))).json();
      const current = useEditor.getState().project!;
      const items = captionsFromWords(current, video.src, words);
      const replace =
        current.items.some((i) => i.type === "caption") &&
        confirm("Replace existing captions?");
      commit((p) => {
        if (replace) p.items = p.items.filter((i) => i.type !== "caption");
        p.items.push(...items);
      });
      setState("idle");
    };
    await poll();
  };
  return (
    <button
      className="btn"
      onClick={run}
      disabled={state === "running"}
      data-tip={
        state === "error"
          ? `Failed: ${log.slice(-120)}`
          : "Transcribe the main video (local whisper.cpp)"
      }
    >
      <AudioLines size={14} /> {state === "running" ? "Transcribing…" : "Auto"}
    </button>
  );
};
