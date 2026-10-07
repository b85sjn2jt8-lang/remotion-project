import type { Project } from "../../../src/engine/types";
import { useEditor } from "./store";

const LS_KEY = (id: string) => `reels-editor:backup:${id}`;

export const api = {
  async listProjects(): Promise<
    { id: string; name: string; updatedAt: string }[]
  > {
    return (await fetch("/api/projects")).json();
  },
  async loadProject(id: string): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) throw new Error(`Project ${id} not found`);
    return res.json();
  },
  async saveProject(p: Project) {
    const res = await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as { savedAt: string };
  },
};

/** Loads a project; if the browser holds a newer unsaved backup, prefer it. */
export const openProject = async (id: string) => {
  const p = await api.loadProject(id);
  let project = p;
  try {
    const raw = localStorage.getItem(LS_KEY(id));
    if (raw) {
      const backup = JSON.parse(raw) as Project;
      if (backup.updatedAt > p.updatedAt) project = backup;
    }
  } catch {
    /* storage unavailable */
  }
  useEditor.setState({
    project,
    selection: [],
    wordId: null,
    past: [],
    future: [],
    saveState: project === p ? "saved" : "dirty",
    lastSavedAt: p.updatedAt,
  });
  localStorage.setItem("reels-editor:last", id);
};

export const saveNow = async () => {
  const { project, saveState } = useEditor.getState();
  if (!project || saveState === "saving") return;
  useEditor.setState({ saveState: "saving" });
  try {
    const { savedAt } = await api.saveProject(project);
    const still = useEditor.getState().project === project;
    useEditor.setState({
      saveState: still ? "saved" : "dirty",
      lastSavedAt: savedAt,
    });
    try {
      localStorage.removeItem(LS_KEY(project.id));
    } catch {
      /* ignore */
    }
  } catch {
    useEditor.setState({ saveState: "error" });
  }
};

/** Autosave: instant local backup on every change + debounced save to disk. */
export const startAutosave = () => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return useEditor.subscribe((s, prev) => {
    if (!s.project || s.txBase) return;
    const txEnded = Boolean(prev.txBase) && !s.txBase;
    if (s.project === prev.project && !txEnded) return;
    // Opening / switching a project is not an edit.
    if (!prev.project || prev.project.id !== s.project.id) return;
    try {
      localStorage.setItem(LS_KEY(s.project.id), JSON.stringify(s.project));
    } catch {
      /* quota */
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => void saveNow(), 1200);
  });
};
