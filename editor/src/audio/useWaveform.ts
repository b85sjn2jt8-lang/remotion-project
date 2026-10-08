import { useEffect, useState } from "react";

type Peaks = { peaksPerSecond: number; peaks: number[] };
const cache = new Map<string, Promise<Peaks | null>>();

/** Loads (server-computed, cached) waveform peaks for a media file in public/. */
export const useWaveform = (src: string | undefined) => {
  const [data, setData] = useState<Peaks | null>(null);
  useEffect(() => {
    if (!src) return;
    if (!cache.has(src)) {
      cache.set(
        src,
        fetch(`/api/waveform?src=${encodeURIComponent(src)}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      );
    }
    let alive = true;
    cache.get(src)!.then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, [src]);
  return data;
};
