import type { PlayerRef } from "@remotion/player";
import { create } from "zustand";

/** Playback state is kept apart from the project so the playhead can move without re-rendering panels. */
type PlaybackState = {
  frame: number;
  playing: boolean;
  player: PlayerRef | null;
};

export const usePlayback = create<PlaybackState>(() => ({
  frame: 0,
  playing: false,
  player: null,
}));

export const seek = (frame: number) => {
  const f = Math.max(0, Math.round(frame));
  usePlayback.setState({ frame: f });
  usePlayback.getState().player?.seekTo(f);
};

export const togglePlay = () => usePlayback.getState().player?.toggle();

export const step = (delta: number) => {
  const p = usePlayback.getState().player;
  p?.pause();
  seek(usePlayback.getState().frame + delta);
};
