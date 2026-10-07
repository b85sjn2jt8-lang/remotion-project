import { Download, Film, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { saveNow } from "../project/persistence";
import { useEditor } from "../project/store";

type Job = {
  status: "idle" | "running" | "done" | "error";
  progress: number;
  output?: string;
  log?: string;
};

/** Saves the project, then renders it with Remotion (EditorProject composition) on the local machine. */
export const RenderDialog: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const project = useEditor((s) => s.project)!;
  const [job, setJob] = useState<Job>({ status: "idle", progress: 0 });

  useEffect(() => {
    void fetch(`/api/render/${project.id}`)
      .then((r) => r.json())
      .then((j) => j.status && setJob(j));
  }, [project.id]);

  useEffect(() => {
    if (job.status !== "running") return;
    const t = setInterval(
      async () =>
        setJob(await (await fetch(`/api/render/${project.id}`)).json()),
      1000,
    );
    return () => clearInterval(t);
  }, [job.status, project.id]);

  const start = async () => {
    await saveNow();
    const j = await (
      await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      })
    ).json();
    setJob(j);
  };

  return (
    <div className="modal-back" onPointerDown={onClose}>
      <div className="modal" onPointerDown={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Film size={16} />
          <b style={{ flex: 1, fontSize: 14 }}>Render video</b>
          <button className="icon-btn" onClick={onClose}>
            <X size={15} />
          </button>
        </div>
        <div className="hint">
          {project.width}×{project.height} · {project.fps} fps · H.264 (CRF 18)
          · AAC 320k · {(project.durationInFrames / project.fps).toFixed(1)}s.
          Rendered by Remotion from the saved project — exactly what you see in
          the preview.
        </div>
        {job.status === "running" || job.status === "done" ? (
          <>
            <div className="progress">
              <div style={{ width: `${Math.round(job.progress * 100)}%` }} />
            </div>
            <div className="hint">
              {job.status === "done"
                ? `Done → ${job.output}`
                : `Rendering… ${Math.round(job.progress * 100)}%`}
            </div>
          </>
        ) : null}
        {job.status === "error" ? (
          <pre
            className="hint"
            style={{
              whiteSpace: "pre-wrap",
              maxHeight: 160,
              overflow: "auto",
              color: "var(--danger)",
            }}
          >
            {job.log}
          </pre>
        ) : null}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          {job.status === "done" ? (
            <a
              className="btn"
              href={`/api/output/${project.id}.mp4`}
              download={`${project.id}.mp4`}
            >
              <Download size={13} /> Download MP4
            </a>
          ) : null}
          <button
            className="btn primary"
            onClick={start}
            disabled={job.status === "running"}
          >
            {job.status === "running"
              ? "Rendering…"
              : job.status === "done"
                ? "Render again"
                : "Start render"}
          </button>
        </div>
      </div>
    </div>
  );
};
