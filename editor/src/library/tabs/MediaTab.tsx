import {
  Film,
  Image as ImageIcon,
  Music,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { assetUrl } from "../../../../src/engine/assets";
import { uploadFile } from "../../media/upload";
import { commit, useEditor } from "../../project/store";
import { createFromPayload, dragProps } from "../payloads";

export const MediaTab: React.FC = () => {
  const media = useEditor((s) => s.project!.media);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    for (const f of Array.from(files)) {
      setBusy(`Uploading ${f.name}…`);
      try {
        await uploadFile(f);
      } catch (e) {
        alert(`Upload failed: ${String(e)}`);
      }
    }
    setBusy(null);
  };

  return (
    <>
      <div className="panel-head">Media</div>
      <div
        className={`dropzone${over ? " over" : ""}`}
        onClick={() => ref.current?.click()}
        onDragOver={(e) => {
          if (e.dataTransfer.types.includes("Files")) {
            e.preventDefault();
            setOver(true);
          }
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
      >
        <Upload size={18} style={{ marginBottom: 6 }} />
        <div style={{ fontWeight: 600, color: "var(--text-2)" }}>
          {busy ?? "Upload video, image, PNG, logo, audio"}
        </div>
        <div style={{ fontSize: 10.5, marginTop: 4 }}>
          Drop files here or click · originals are never modified
        </div>
        <input
          ref={ref}
          type="file"
          multiple
          style={{ display: "none" }}
          accept="video/*,image/*,audio/*"
          onChange={(e) => e.target.files && void handleFiles(e.target.files)}
        />
      </div>
      <div className="lib-grid">
        {media.map((m) => (
          <div
            key={m.id}
            className="lib-card"
            {...dragProps({ kind: "media", assetId: m.id })}
            data-tip="Click: add as B-roll · drag onto a track"
          >
            <div className="thumb">
              {m.kind === "image" ? (
                <img
                  src={assetUrl(m.src)}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : m.kind === "video" ? (
                <video
                  src={`${assetUrl(m.src)}#t=0.5`}
                  muted
                  preload="metadata"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Music size={24} />
              )}
            </div>
            <div
              className="meta"
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              {m.kind === "video" ? (
                <Film size={11} />
              ) : m.kind === "image" ? (
                <ImageIcon size={11} />
              ) : (
                <Music size={11} />
              )}
              <span
                className="title"
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {m.name}
              </span>
              {m.kind === "video" ? (
                <button
                  className="icon-btn sm"
                  data-tip="Add to main video track"
                  onClick={(e) => {
                    e.stopPropagation();
                    createFromPayload({
                      kind: "media",
                      assetId: m.id,
                      as: "main",
                    });
                  }}
                >
                  <Plus size={11} />
                </button>
              ) : null}
              <button
                className="icon-btn sm"
                data-tip="Remove from library"
                onClick={(e) => {
                  e.stopPropagation();
                  commit((p) => {
                    p.media = p.media.filter((x) => x.id !== m.id);
                  });
                }}
              >
                <Trash2 size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {!media.length ? <div className="empty-state">No media yet.</div> : null}
    </>
  );
};
