# Social Video Editor (Remotion)

Vertical **1080×1920 @ 30fps** videos for TikTok / Reels / Shorts, edited as code so that
Claude can do the first cut and you can fine-tune everything visually in **Remotion Studio**.

```
npm i          # once
npm run dev    # opens Remotion Studio at http://localhost:3000
```

## Workflow

1. **Add footage** — put your raw clips in `footage/` (git-ignored, any phone format, HDR ok).
2. **Ingest** — prepares the clip, finds the pauses, and (optionally) transcribes it:
   ```
   npm run ingest -- footage/my-clip.mov --captions
   npm run ingest -- footage/my-clip.mov --srt my-clip.srt   # use captions you already have
   ```
   | Output | What it is |
   |---|---|
   | `public/footage/my-clip.mp4` | H.264, SDR, 30fps copy that Remotion plays (git-ignored) |
   | `edits/my-clip.json` | duration, detected silences and suggested cuts in frames |
   | `public/captions/my-clip.json` | word-timed captions — edit the text here |
3. **Edit** — ask Claude to "edit my-clip into a video". It writes `src/videos/<Name>/` using the
   suggested cuts, a hook, callouts, captions and an end card, and registers it in `src/Root.tsx`.
4. **Fine-tune in Studio** (`npm run dev`), then render:
   ```
   npx remotion render <Name> out/<name>.mp4
   ```

Transcription runs whisper.cpp on your machine (first run downloads ~500 MB of model and builds
whisper.cpp; needs a C compiler — Xcode CLI tools on macOS). Options: `--model medium.en` for
better accuracy, `--model small --language de` for other languages.

## What you can change in Studio

| To change… | Do this |
|---|---|
| **Scene / clip length** | Drag the right edge of `Clip N` or `Outro` in the timeline. Later clips shift automatically (ripple edit). Then update `durationInFrames` for that video in `src/Root.tsx`. |
| **Where a clip starts in the footage** | Change `trimBefore` on `Clip N · source` (frames at 30fps; `edits/<name>.json` lists the cut points). |
| **Text** (hook, callouts, CTA, handle) | Click the element in the preview and edit it, or edit the text inline in `Hook.tsx` / `Outro.tsx` / the video file. |
| **Position, size, rotation, colors, fonts of text** | Select the element → drag/resize/rotate in the preview, or change its styles in the right panel. |
| **Animations** | Keyframes are written as inline `interpolate()` calls, so Studio shows and edits them (timing, values, easing). |
| **When an overlay appears** | Drag its `Sequence` (e.g. `Hook`, `Callout`) in the timeline, or change `from` / `durationInFrames`. |
| **Caption look** | Props panel (right sidebar) → `captions`: font, size, colors, outline, highlight style (`text` or `box`), uppercase, height on screen, words per page. Click **Save** to write back to `Root.tsx`. |
| **Caption words / timing** | Edit `public/captions/<name>.json`. Add `"pageBreakAfter": true` to a word to start a new caption line after it. |
| **Accent color, progress bar** | Props panel → `accentColor`, `showProgressBar`. |
| **Check platform UI overlap** | Props panel → `showSafeZones` — red areas are covered by TikTok/Reels UI. Only shown in Studio, never rendered. |
| **Punch-in zoom on a cut** | `scale` on that clip's `Footage` video (e.g. `1.15`). |
| **Open a scene on its own timeline** | Double-click `Outro` in the timeline, or open it from the `<Video>-Scenes` folder. |

## Project layout

```
footage/                 raw clips you drop in (git-ignored)
public/footage/          prepared clips used by Remotion (git-ignored except the sample)
public/captions/         word-level captions per footage file (@remotion/captions format)
public/fonts/            Montserrat, Poppins, Inter, Bebas Neue — add your brand font here
edits/                   ingest analysis: silences + suggested cuts
scripts/ingest.mjs       transcode + silence detection + transcription
src/Root.tsx             registers every video (1080x1920, 30fps) and its default props
src/schema.ts            the Props-panel controls (caption style, accent color, …)
src/fonts.ts             loads fonts from public/fonts
src/components/          Captions, ProgressBar, SafeZones — shared by all videos
src/videos/Example/      a complete example: ExampleVideo (timeline), Hook, Outro
.claude/skills/          Remotion's official agent skills (used by Claude when editing)
```

The `Example` video uses `public/footage/sample.mp4`, a generated placeholder with three pauses
that the edit cuts out, so you can try everything before adding your own footage.

## Notes

- Your footage stays local: `footage/` and `public/footage/` are git-ignored. When Claude edits
  in a cloud session, you get the code and captions back; keep the same file names locally and
  run `npm run ingest` again on your machine to recreate `public/footage/`.
- Remotion is free for individuals and companies of up to 3 people; larger companies need a
  [company license](https://www.remotion.pro/license).
