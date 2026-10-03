# In-Store Beauty Loop — Build Notes (v1)

This is the 60 s, 16:9, 3840×2160, 30 fps seamless loop, built from `PRODUCTION_PLAN.md`.

| | |
|---|---|
| **Composition** | `StoreLoop` in `src/Root.tsx`. Code is in `src/videos/StoreLoop/`. |
| **Render** | `npx remotion render StoreLoop out/store-loop-60s-4k.mp4 --scale=2 --codec=h264 --crf=16` |
| **Preview / fine-tune** | `npm run dev`, then open `StoreLoop`. It's authored at 1920×1080; `--scale=2` gives the UHD master. |

## What was generated in this build

| Asset | How | Where |
|---|---|---|
| 5 product master plates | Cut from the uploaded references (`scripts/store-loop/cutouts.py`). Product pixels are copied 1:1; only the background is removed. No upscaling, retouching or regeneration. | `public/store-loop/products/` |
| Cream macro surface | Procedural height field plus lighting (`scripts/store-loop/textures.py`). No product. | `public/store-loop/env/cream_macro.jpg` |
| Environments, liquids, droplets, light, palm/leaf shadows, transitions, loop bridge | Code-driven motion design in Remotion: every frame is deterministic and editable. | `src/videos/StoreLoop/` |

### Notes on individual plates

- **Anua (PM-01):** the reference crops the jar at its right and bottom edges, so the plate is always anchored with those two edges exactly at or beyond the frame corner. The jar is never shown as a free-floating object. A few pixels of the retailer's grey hashtag text (`(under eye area)`) overlapped the jar's left rim. Only those text pixels were inpainted from the surrounding plain pink; label, logo and print are untouched.
- **Manee (PM-03):** hands cover the lower pouch in the reference. The floating plate is the unoccluded upper pouch (glitter band, logo, `GLUTA` / `グルタ`), always rising from a pink liquid surface that hides its flat bottom cut. The full pouch appears in the brand's own lifestyle photo (Scene 10), shown unedited as a framed print.
- **Hikari (PM-05):** the retailer's icon captions overlap the pouch's left and right star tips in the reference. Those tips are clipped about 25 px rather than repainted.
- **Dr.Althea tube (PM-02b):** it's white on white, so its silhouette was traced by hand from the reference edges.

## Deviations from the production plan (and why)

1. **No AI image or video generation model was available in this environment**, so no API, Veo, Kling, Runway or Imagen runs were possible. As a result:
   - **Human-model scenes are product-only stand-ins** with the plan's timing, color world and camera language:

     | Scene | Plan | Built instead |
     |---|---|---|
     | 2 | Korean-inspired model | Anua rack-focus reveal |
     | 8 | Japanese-inspired hair model | Dr.Althea vanity, lateral truck + whip pan |
     | 10 | Filipina lifestyle | Brand lifestyle photo as a framed print, dolly + curtain wipe |
     | 12 | Three portraits | Three 40-frame product "portraits" (pink / gold / sand) |

   - **Photographic environments are motion-design environments** (gradients, CSS/SVG light, liquids and particles) rather than photoreal AI plates.
2. **Missing references:**
   - Scene 4 (AXIS-Y) uses Dr.Althea.
   - Scene 5 (Luxe Organix) uses the Brilliant Rejuv Set.
   - Scene 9 (A Bonne) uses the Manee pouch.

   This is as planned in Part 0 of the production plan.
3. **Scenes 1, 11 and 13 don't use Anua or Manee as free-flying products** (their plates are cropped; see above).
4. **Resolution:** the reference images are 600–1000 px, so at UHD some plates are shown at roughly 1.3–2.4× their native pixels. They hold up at store viewing distance but look soft up close. Re-cut the plates from 4K packshots (plan 0.3) and replace the PNGs in `public/store-loop/products/` with the same filenames and the same crop logic. Everything else updates automatically; adjust `aspect` / `nativeWidth` in `products.ts`.

## Dropping in generated AI footage later

Each model-scene slot is its own `<Sequence>` in `StoreLoop.tsx`, named `(model slot)`. To use a generated clip:

1. Put it in `public/store-loop/plates/` (H.264 is fine for Studio; render with the headless-shell flag from CLAUDE.md).
2. Inside the scene component, add `<OffthreadVideo src={staticFile("store-loop/plates/S02.mp4")} />` behind the `<Product>` layer, and remove the stand-in set.
3. Keep the `<Product>` plate on top, so the real pack is composited and never regenerated.

Transitions and the loop bridge live in the main timeline across the cuts, so they keep working when a scene's contents change.

## Loop

`LoopBridge` (`fx/Wipes.tsx`) is one 29-frame element: frames 1781–1799 at the end, then 0–9 at the start. It's built from colors sampled from the Anua jar, moving right → left at 240 px/frame (480 px at UHD). To QC the join, play `out/loop-join-check.mp4` (frames 1740–1799 followed by 0–60).

## Still open (client)

- Approve `BRIGHTEN • GLOW • CARE` (Scene 3). `SPF 50 PA++++` (Scene 7) is a verbatim pack claim.
- Get regulatory clearance for showing the Brilliant Rejuv Set. Decide whether the Manee supplement notice is needed (a slot is free in Scenes 9–10).
- Supply references for AXIS-Y, Luxe Organix and A Bonne, plus 4K packshots of all products.
