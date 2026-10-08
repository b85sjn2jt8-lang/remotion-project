import {
  rippleDeleteSelected,
  copySelected,
  deleteSelected,
  duplicateSelected,
  paste,
  splitAtPlayhead,
} from "../project/actions";
import { seek, step, togglePlay } from "../project/playback";
import { saveNow } from "../project/persistence";
import { redo, select, undo, useEditor } from "../project/store";

const isTyping = (e: KeyboardEvent) => {
  const t = e.target as HTMLElement | null;
  return Boolean(
    t &&
    (t.tagName === "INPUT" ||
      t.tagName === "TEXTAREA" ||
      t.tagName === "SELECT" ||
      t.isContentEditable),
  );
};

/** Global keyboard shortcuts (CapCut / Premiere-like). */
export const installShortcuts = () => {
  const onKey = (e: KeyboardEvent) => {
    if (isTyping(e)) return;
    const mod = e.ctrlKey || e.metaKey;
    const k = e.key.toLowerCase();
    if (mod && k === "z") {
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
      return;
    }
    if (mod && k === "y") {
      e.preventDefault();
      redo();
      return;
    }
    if (mod && k === "c") return copySelected();
    if (mod && k === "v") return paste();
    if (mod && k === "d") {
      e.preventDefault();
      return duplicateSelected();
    }
    if (mod && k === "s") {
      e.preventDefault();
      void saveNow();
      return;
    }
    if (mod && k === "a") {
      e.preventDefault();
      const p = useEditor.getState().project;
      if (p) select(p.items.map((i) => i.id));
      return;
    }
    if (mod) return;
    switch (e.key) {
      case " ":
        e.preventDefault();
        togglePlay();
        break;
      case "Delete":
      case "Backspace":
        e.preventDefault();
        if (e.shiftKey) rippleDeleteSelected();
        else deleteSelected();
        break;
      case "b":
      case "B":
        useEditor.setState((st) => ({
          tool: st.tool === "blade" ? "select" : "blade",
        }));
        break;
      case "v":
      case "V":
        useEditor.setState({ tool: "select" });
        break;
      case "ArrowLeft":
        e.preventDefault();
        step(e.shiftKey ? -10 : -1);
        break;
      case "ArrowRight":
        e.preventDefault();
        step(e.shiftKey ? 10 : 1);
        break;
      case "Home":
        seek(0);
        break;
      case "End":
        seek((useEditor.getState().project?.durationInFrames ?? 1) - 1);
        break;
      case "s":
      case "S":
        splitAtPlayhead();
        break;
      case "Escape":
        select([]);
        useEditor.setState({ tool: "select" });
        break;
      case "+":
      case "=":
        useEditor.setState((s) => ({
          pxPerFrame: Math.min(40, s.pxPerFrame * 1.3),
        }));
        break;
      case "-":
        useEditor.setState((s) => ({
          pxPerFrame: Math.max(0.3, s.pxPerFrame / 1.3),
        }));
        break;
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
};
