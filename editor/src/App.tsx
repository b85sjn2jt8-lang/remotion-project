import React, { useEffect, useState } from "react";
import { ContextMenu } from "./editor/ContextMenu";
import { installShortcuts } from "./editor/shortcuts";
import { TopBar } from "./editor/TopBar";
import { Inspector } from "./inspector/Inspector";
import { LibraryPanel, Rail } from "./library/LibraryPanel";
import { refreshFonts } from "./media/fonts";
import { loadPresets } from "./presets/userPresets";
import {
  api,
  openProject,
  saveNow,
  startAutosave,
} from "./project/persistence";
import { useEditor } from "./project/store";
import { Preview } from "./preview/Preview";
import { Timeline } from "./timeline/Timeline";

export const App: React.FC = () => {
  const project = useEditor((s) => s.project);
  const [error, setError] = useState<string | null>(null);
  const [timelineH, setTimelineH] = useState(
    () => Number(localStorage.getItem("reels-editor:tl-h")) || 320,
  );

  useEffect(() => {
    const stopShortcuts = installShortcuts();
    const stopAutosave = startAutosave();
    void loadPresets();
    void refreshFonts();
    (async () => {
      const list = await api.listProjects();
      const last = localStorage.getItem("reels-editor:last");
      const id = list.find((p) => p.id === last)?.id ?? list[0]?.id;
      if (!id) throw new Error("No projects found in projects/");
      await openProject(id);
    })().catch((e) => setError(String(e)));
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (useEditor.getState().saveState !== "saved") {
        void saveNow();
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      stopShortcuts();
      stopAutosave();
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  const startResize = (e: React.PointerEvent) => {
    const sy = e.clientY;
    const h0 = timelineH;
    const move = (ev: PointerEvent) =>
      setTimelineH(
        Math.min(
          window.innerHeight - 260,
          Math.max(180, h0 - (ev.clientY - sy)),
        ),
      );
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      setTimelineH((h) => {
        localStorage.setItem("reels-editor:tl-h", String(h));
        return h;
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  if (error) return <div className="empty-state">{error}</div>;
  if (!project) return <div className="empty-state">Loading project…</div>;

  return (
    <div
      className="app"
      style={{ ["--timeline-h" as string]: `${timelineH}px` }}
    >
      <TopBar />
      <div className="workspace">
        <Rail />
        <LibraryPanel />
        <Preview />
        <Inspector />
      </div>
      <div className="timeline-wrap">
        <div className="resize-h" onPointerDown={startResize} />
        <Timeline />
      </div>
      <ContextMenu />
    </div>
  );
};
