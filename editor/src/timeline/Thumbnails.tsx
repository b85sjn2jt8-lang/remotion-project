import React, { useEffect, useState } from "react";

type Info = { dir: string; count: number };
const cache = new Map<string, Promise<Info | null>>();

const useThumbs = (src: string) => {
  const [info, setInfo] = useState<Info | null>(null);
  useEffect(() => {
    if (!cache.has(src)) {
      cache.set(
        src,
        fetch(`/api/thumbs?src=${encodeURIComponent(src)}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      );
    }
    let alive = true;
    void cache.get(src)!.then((d) => alive && setInfo(d));
    return () => {
      alive = false;
    };
  }, [src]);
  return info;
};

/** Filmstrip of the clip's source (1 thumbnail per second, picked per slot). */
export const Thumbnails: React.FC<{
  src: string;
  trimBefore: number;
  frames: number;
  fps: number;
  width: number;
  height: number;
}> = ({ src, trimBefore, frames, fps, width, height }) => {
  const info = useThumbs(src);
  if (!info || !info.count) return null;
  const slotW = Math.round(height * (9 / 16));
  const slots = Math.min(400, Math.ceil(width / slotW));
  const framesPerPx = frames / width;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.75,
      }}
    >
      {Array.from({ length: slots }, (_, i) => {
        const srcFrame = trimBefore + (i * slotW + slotW / 2) * framesPerPx;
        const idx = Math.min(
          info.count,
          Math.max(1, Math.floor(srcFrame / fps) + 1),
        );
        return (
          <img
            key={i}
            src={`/${info.dir}/${String(idx).padStart(4, "0")}.jpg`}
            style={{ width: slotW, height, objectFit: "cover", flex: "none" }}
            draggable={false}
            loading="lazy"
          />
        );
      })}
    </div>
  );
};
