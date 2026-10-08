import React, { useEffect, useRef } from "react";
import { useWaveform } from "./useWaveform";

/** Draws the waveform of `src` between source frames [startFrame, startFrame + frames). */
export const Waveform: React.FC<{
  src: string;
  startFrame: number;
  frames: number;
  fps: number;
  width: number;
  height: number;
  color?: string;
  volume?: number;
}> = ({
  src,
  startFrame,
  frames,
  fps,
  width,
  height,
  color = "rgba(255,255,255,.55)",
  volume = 1,
}) => {
  const data = useWaveform(src);
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || !data || width <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    const w = Math.min(8000, Math.round(width));
    c.width = w * dpr;
    c.height = height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, height);
    ctx.fillStyle = color;
    const pps = data.peaksPerSecond;
    const startPeak = (startFrame / fps) * pps;
    const peaksPerPx = ((frames / fps) * pps) / w;
    const gain = Math.min(1.6, 0.4 + volume);
    for (let x = 0; x < w; x++) {
      const a = Math.floor(startPeak + x * peaksPerPx);
      const b = Math.max(a + 1, Math.floor(startPeak + (x + 1) * peaksPerPx));
      let p = 0;
      for (let i = a; i < b && i < data.peaks.length; i++)
        p = Math.max(p, data.peaks[i] ?? 0);
      const h = Math.max(1, p * gain * (height - 2));
      ctx.fillRect(x, (height - h) / 2, 1, h);
    }
  }, [data, startFrame, frames, fps, width, height, color, volume]);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: Math.min(8000, width),
        height,
        pointerEvents: "none",
      }}
    />
  );
};
