import {
  Clapperboard,
  FolderOpen,
  Palette,
  Plus,
  Redo2,
  Save,
  Undo2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { emptyProject } from "../../../src/engine/factory";
import { IconButton } from "../components/ui";
import { api, openProject, saveNow } from "../project/persistence";
import { commit, redo, undo, useEditor } from "../project/store";
import { RenderDialog } from "../render/RenderDialog";

export const TopBar: React.FC = () => {
  const project = useEditor((s) => s.project)!;
  const saveState = useEditor((s) => s.saveState);
  const lastSavedAt = useEditor((s) => s.lastSavedAt);
  const canUndo = useEditor((s) => s.past.length > 0);
  const canRedo = useEditor((s) => s.future.length > 0);
  const showGlobal = useEditor((s) => s.showGlobal);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [render, setRender] = useState(false);
  const [name, setName] = useState(project.name);
  useEffect(() => setName(project.name), [project.name]);
  useEffect(() => {
    void api.listProjects().then(setProjects);
  }, [project.id, saveState === "saved"]);

  const newProject = async () => {
    const n = prompt("New project name", "New video");
    if (!n) return;
    const p = emptyProject(n, `p_${Date.now().toString(36)}`);
    await api.saveProject(p);
    await openProject(p.id);
  };

  return (
    <div className="topbar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 800,
          letterSpacing: ".02em",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: "linear-gradient(135deg,#7c6cff,#ff5d8f)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Clapperboard size={13} color="#fff" />
        </div>
        Reels Editor
      </div>
      <div style={{ width: 1, height: 20, background: "var(--border-2)" }} />
      <FolderOpen size={14} color="var(--muted)" />
      <select
        className="select"
        style={{ width: 170 }}
        value={project.id}
        onChange={(e) => void openProject(e.target.value)}
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <IconButton
        icon={<Plus size={15} />}
        tip="New project"
        tipPos="bottom"
        onClick={newProject}
      />
      <input
        className="title-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => name !== project.name && commit((p) => (p.name = name))}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
      />
      <span
        className="save-pill"
        data-tip={
          lastSavedAt
            ? `Last saved ${new Date(lastSavedAt).toLocaleTimeString()}`
            : undefined
        }
        data-tip-pos="bottom"
      >
        <span
          className={`dot ${saveState === "saved" ? "" : saveState === "error" ? "error" : "dirty"}`}
        />
        {saveState === "saved"
          ? "Saved"
          : saveState === "saving"
            ? "Saving…"
            : saveState === "error"
              ? "Save failed"
              : "Autosave pending"}
      </span>
      <div style={{ flex: 1 }} />
      <IconButton
        icon={<Undo2 size={15} />}
        tip="Undo (Ctrl+Z)"
        tipPos="bottom"
        onClick={undo}
        disabled={!canUndo}
      />
      <IconButton
        icon={<Redo2 size={15} />}
        tip="Redo (Ctrl+Shift+Z)"
        tipPos="bottom"
        onClick={redo}
        disabled={!canRedo}
      />
      <IconButton
        icon={<Palette size={15} />}
        tip="Brand & global styles"
        tipPos="bottom"
        active={showGlobal}
        onClick={() => useEditor.setState({ showGlobal: !showGlobal })}
      />
      <button
        className="btn"
        onClick={() => void saveNow()}
        data-tip="Ctrl+S"
        data-tip-pos="bottom"
      >
        <Save size={13} /> Save
      </button>
      <button className="btn primary" onClick={() => setRender(true)}>
        <Clapperboard size={13} /> Render
      </button>
      {render ? <RenderDialog onClose={() => setRender(false)} /> : null}
    </div>
  );
};
