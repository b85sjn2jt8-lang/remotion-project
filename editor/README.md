# Reels Editor

A visual, CapCut-style editor for vertical social videos (TikTok / Reels / Shorts), built on top of this
Remotion project. Remotion stays the render engine: the editor only edits **project data**.

```
Editor UI  →  projects/<id>.json  →  ProjectComposition (src/engine)  →  Player preview / Remotion render
```

## Run it

```bash
npm install
npm run editor          # http://localhost:5173
```

Everything is saved to disk inside the repo, so nothing is lost on refresh:

| What | Where |
| --- | --- |
| Projects (timeline, captions, styles, animations, keyframes, media list, audio, global styles) | `projects/<id>.json` (autosave ~1 s after each edit, plus a local browser backup) |
| Rolling backups (one per minute, last 30) | `projects/.history/` (git-ignored) |
| Reusable presets (caption / text / animation / brand) | `presets/library.json` — shared by all projects |
| Uploaded media (originals never modified) | `public/media/` (git-ignored) |
| Preview proxies (VP9 720p, for smooth scrubbing) | `public/proxies/` (git-ignored, auto-generated) |
| Fonts | `public/fonts/` — name files `Family-Weight.woff2` |
| Renders | `out/<id>.mp4` |

Render from the editor (**Render** button) or from the CLI:

```bash
echo "{\"project\": $(cat projects/ray391.json)}" > /tmp/props.json
npx remotion render EditorProject out/ray391.mp4 --props=/tmp/props.json
```

## Workflow

1. **New project** (top bar `+`) → **Media** tab → upload the video → `+` adds it to the main Video track.
2. **Captions** tab → **Auto** (local whisper.cpp; the model downloads on first use) or **Import** (`.srt`,
   or word-level `.json` from `npm run ingest -- … --captions`). Word timings follow the cut.
3. Click a caption (canvas or timeline) → pick one of the 20 styles → adjust in the Inspector.
   Click a word chip (or double-click the word on the canvas) for per-word color / size / weight / box /
   stroke / animation. Double-click a chip to toggle it as a key word ★.
4. Select a video clip → **Effects** for Punch In / Slow Zoom / Pan / Reframe; drag it in the preview to reframe.
5. Add B-roll (Media), text (Text), overlays (Shapes / Icons / Stickers), SFX (Audio — linked to the selected element).
6. Keyframes: click ◇ next to any property in the Inspector; ◆ appear on the timeline clip.
7. **Render**.

## Shortcuts

| Key | Action |
| --- | --- |
| Space | Play / pause |
| ← / → (Shift = 10) | Step frames |
| S | Split at playhead (selected clips, or everything under the playhead) |
| Ctrl+Z / Ctrl+Shift+Z (Ctrl+Y) | Undo / redo |
| Ctrl+C / Ctrl+V | Copy / paste at playhead |
| Ctrl+D | Duplicate |
| Delete / Backspace | Delete clip (or the selected word) |
| Ctrl+S | Save now |
| Ctrl+A | Select all |
| + / − , Ctrl+wheel | Timeline zoom |
| Shift+drag on canvas | Constrain to an axis · Shift+rotate = 15° steps |

## Architecture

```
src/engine/                 ← shared by the editor AND Remotion renders (no editor code here)
  types.ts                  project data model
  factory.ts                item constructors, defaults, default tracks
  ProjectComposition.tsx    renders a Project (track order: tracks[0] = top layer)
  items/                    CaptionView, TextView, OverlayView, MediaViews, transitions
  animation/                easing, keyframe evaluation, IN / EMPHASIS / OUT library
  captions/presets.ts       the 20 caption styles
  text/presets.ts           heading, subheading, body, label, callout, price, statistic, question, CTA
  registry.tsx              code-built scenes usable as timeline blocks (e.g. Ray391 graphics)
editor/
  server/api.ts             local backend (projects, presets, uploads, fonts, waveforms, proxies, transcribe, render)
  src/project/              zustand store, undo/redo history (transactions for drags), actions, keyframes, persistence
  src/preview/              Player, canvas selection/move/scale/rotate with snapping, safe zones, guides
  src/timeline/             multi-track timeline, items, ruler, word lanes, waveforms
  src/library/              left panel tabs (Captions, Text, Media, Shapes, Icons, Stickers, Effects, Transitions, Audio, Motion)
  src/inspector/            right panel per item type + global brand styles
  src/captions/             preset application, SRT/JSON import, auto-captions, live preset thumbnails
  src/motion/               element motion presets and video zoom/reframe presets
  src/presets/              user preset library
  src/media/, src/audio/    uploads, fonts, proxies, waveform loading
  src/render/               render dialog
```

Extending: add a caption style to `CAPTION_PRESETS`, an animation to `animation/presets.ts`, an overlay
shape to `OverlayView.tsx` + `factory.ts`, or a code-built scene to `registry.tsx` — the editor picks them up.

## Notes

- Non-destructive: crops, zooms, captions, motion and B-roll are data; source files are never re-encoded
  (non-H.264/HDR uploads get an extra `-edit.mp4` copy for browser playback; the original stays).
- Arabic: captions/text detect RTL automatically and isolate each word (`unicode-bidi: isolate`), so
  English product names and Western digits inside Arabic sentences keep their order.
- The original hand-coded `Ray391` composition is untouched; `projects/ray391.json` is its migration
  (`npm run migrate:ray391` regenerates it — this overwrites edits made in the editor).
