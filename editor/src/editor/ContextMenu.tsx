import React, { useEffect } from "react";
import { create } from "zustand";
import {
  rippleDeleteSelected,
  copySelected,
  deleteSelected,
  duplicateSelected,
  paste,
  splitAtPlayhead,
} from "../project/actions";

const useMenu = create<{ x: number; y: number; open: boolean }>(() => ({
  x: 0,
  y: 0,
  open: false,
}));

export const openContextMenu = (x: number, y: number) =>
  useMenu.setState({ x, y, open: true });

export const ContextMenu: React.FC = () => {
  const { x, y, open } = useMenu();
  useEffect(() => {
    if (!open) return;
    const close = () => useMenu.setState({ open: false });
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [open]);
  if (!open) return null;
  const run = (fn: () => void) => () => {
    fn();
    useMenu.setState({ open: false });
  };
  return (
    <div
      className="menu"
      style={{ left: x, top: Math.min(y, window.innerHeight - 200) }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button onClick={run(splitAtPlayhead)}>
        Split at playhead<span className="k">S</span>
      </button>
      <button onClick={run(duplicateSelected)}>
        Duplicate<span className="k">Ctrl D</span>
      </button>
      <button onClick={run(copySelected)}>
        Copy<span className="k">Ctrl C</span>
      </button>
      <button onClick={run(paste)}>
        Paste at playhead<span className="k">Ctrl V</span>
      </button>
      <button onClick={run(rippleDeleteSelected)}>
        Ripple delete<span className="k">Shift Del</span>
      </button>
      <button onClick={run(deleteSelected)}>
        Delete<span className="k">Del</span>
      </button>
    </div>
  );
};
