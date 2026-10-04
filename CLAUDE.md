# Social video editing project — instructions for Claude

Remotion 4 project producing vertical **1080×1920 @ 30fps** social videos. Claude does the
first edit; the user fine-tunes in Remotion Studio. **Every edit must stay Studio-editable.**
Follow the Remotion skills in `.claude/skills/` (especially `remotion-markup`,
`remotion-interactivity`, `remotion-captions`) — they define the markup rules below.

## Editing a user's footage

1. Put raw files in `footage/`, then run `npm run ingest -- footage/<file> [--captions | --srt f.srt]`.
   Read `edits/<name>.json` (silences + suggested `clips` with `trimBefore` / `durationInFrames`)
   and `public/captions/<name>.json` (the transcript) before cutting.
2. Copy `src/videos/Example/` to `src/videos/<Name>/`, rename the components, and build the edit:
   - Choose the cuts from the transcript: remove silences, false starts, repeated takes, filler.
     Open with the strongest line (hook in the first 1–2s). Aim for the platform length the user wants.
   - One `<TransitionSeries.Sequence name="Clip N">` per cut → `<Sequence name="Clip N · source"
     trimBefore={…} layout="absolute-fill">` → `<Video name="Footage">` + `<Captions src=…>`.
     Captions must sit inside the same source Sequence so they follow the cut.
   - Alternate punch-in `scale` (1 / 1.12–1.2) on jump cuts of the same shot.
   - Hook text (`Hook.tsx`), 1–3 callouts, and an end card (`Outro.tsx`) with the user's handle/CTA.
3. Register in `src/Root.tsx`: a `<Folder name="<Name>-Scenes">` with the Hook/Outro compositions,
   and the main `<Composition>` with `schema={socialVideoSchema}`, inline `defaultProps`, and
   `durationInFrames` = sum of clip durations + outro − transition frames.
4. Verify: `npx tsc && npx eslint src`, then render a few stills
   (`npx remotion render <Name> out/frames --frames=0,60,… --image-format=png`) and look at them.
   Only render the full MP4 if the user asks.

## Markup rules (what keeps things editable in Studio)

- Hardcode every clip's `durationInFrames`, `trimBefore`, `from` as numbers. Never generate clips,
  overlays or scenes with `.map()` or loops; each is its own JSX node with a descriptive `name`.
- Text overlays: `<Interactive.Div name="…">` with the copy written inline as children.
- Styles are plain inline objects: no spreading, no style constants, no computed math.
- Animate with inline `interpolate(frame, [...], [...], {…})` directly on the style property;
  input ranges may only use numbers, `fps`, `durationInFrames` (e.g. `0.4 * fps`, `durationInFrames - 8`).
  Use `scale` / `translate` / `rotate` properties, not `transform`. Add `output: 'perceptual-scale'`
  to scale animations. Easing via `Easing.spring({damping})` or `Easing.bezier(...)`.
- No CSS transitions/animations — everything is driven by `useCurrentFrame()`.
- Global look (caption style, accent color) goes through the zod schema in `src/schema.ts`
  with inline `defaultProps` on `<Composition>` (no type assertions).
- Media: `<Video>` from `@remotion/media`, assets via `staticFile()`. Fonts from `public/fonts`
  via `src/fonts.ts`. Keep key text 90px from the sides and out of the TikTok/Reels UI areas
  (top 220px, bottom 440px, right 150px — see `SafeZones`). Headline ≥ 84px, supporting text ≥ 44px.
- Preserve the user's manual Studio edits: if code changed unexpectedly, assume it was deliberate.

## Environment notes

- `footage/` and `public/footage/` are git-ignored (large files); captions, edits and code are committed.
- In a cloud container: Hugging Face (whisper models) and remotion.media may be blocked, and
  Playwright's Chromium lacks H.264. Render with
  `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`;
  import `.srt` captions instead of transcribing if whisper can't download.

## Horizontal store-display spots (ANUA, A BONNE, HIKARI)

- `src/videos/Anua/`, `src/videos/ABonne/` and `src/videos/Hikari/` are 1920×1080 @ 30fps looping product commercials
  built from a cut-out master product image in `public/<brand>/`. Never redraw, recolor, warp or
  non-uniformly scale the product; set only `width` on its `<Img>`.
- Previews and masters are always rendered at exactly 1920×1080 (never 720p, 1440p or 4K) with
  `scripts/render-hq.sh <CompositionId> out/<name>.mp4`: ProRes 4444 mezzanine → H.264 High,
  yuv420p BT.709, two-pass ~18 Mbps (max 20), preset slow.
