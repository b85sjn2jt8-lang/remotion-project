# In-Store Beauty Loop — 60s Production Package

**Format:** 16:9 · 3840×2160 UHD master · 30p (1800 frames) · seamless infinite loop · no VO
**Venue:** large horizontal screen in a physical cosmetics store, viewed at 2–8 m, people walk in at any second
**Audience:** adult Filipino women
**Look:** premium contemporary Asian beauty (K-beauty / J-beauty / modern Filipino beauty advertising)

This document is the plan to build from. Nothing is generated yet. Part 0 lists the decisions and
blockers to settle first. Parts 1–3 are the shared rules every scene follows. Part 4 has the 13
scene packages. Part 5 covers assembly, QC and delivery.

---

## PART 0 — DECISIONS AND BLOCKERS (read first)

### 0.1 Three storyboard products have no reference image

| Storyboard slot | Product named | Reference uploaded? |
|---|---|---|
| 00:13–00:18 | AXIS-Y (green world) | **No** |
| 00:18–00:23 | Luxe Organix Retinol (night) | **No** |
| 00:37–00:42 | A Bonne Pink Collagen | **No** |

Two uploaded products aren't in the storyboard: **Dr.Althea 345 Relief Cream** and the
**Brilliant Skin Essentials Brilliant Rejuv Set**.

Under the product-preservation rule, a product with no reference can't appear. This plan fills
each of those slots with an uploaded product (table 2.1). Every product is a composited plate on
top of a product-free environment. So when the missing references arrive, you swap the plate
(and fix scale and shadow) and keep the environment generations. Nothing has to be regenerated.

### 0.2 "GUTA Collagen" is read as **Manee Gluta Collagen Pink**

That's what the uploaded pouch says. The plan uses the on-pack spelling.

### 0.3 The reference images aren't 4K product masters

All five are 729–1024 px web images. Three have marketing graphics, hands or crops baked in
(audit in Part 1). A 4K screen needs product plates of about **3000 px or more on the long edge**.
AI upscaling of small packaging text invents letters, so it breaks the preservation rule.

**Recommended fix:** the store has the physical products. Do one packshot session:
- Camera: 45 MP or more, 100 mm macro, cross-polarized softboxes
- Angles: front, plus ±15°, ±30°, ±45° yaw, plus top, all on a neutral grey sweep
- Packaging state: Anua jar both open and closed, pouches filled and standing

That one session clears every fidelity risk in this plan. **Fallback if it can't happen:** cut
plates from the references, cap on-screen product height at 900 px, and do every near-lens
"fill the frame" moment with sampled flat color (2.4), never by enlarging the plate.

### 0.4 Regulatory flags for the client to clear (not creative choices)

- **Brilliant Rejuv Set** carries *Hydroquinone* and *Tretinoin* on pack, which are regulated
  actives in the Philippines. The plan adds **no** copy, claims or skin-change visuals to it.
  Confirm with the brand or distributor that showing it on in-store screens is allowed.
- **Manee Gluta Collagen Pink** looks like a food or dietary supplement. Philippine FDA rules for
  supplement advertising may require an on-screen *"No Approved Therapeutic Claims"*-type notice.
  Its layout slot is reserved in Scenes 9–10 (lower-left, 2.3).
- **No before/after skin changes and no skin-lightening visuals anywhere.** Model skin tone stays
  constant within and across shots. Showing it change would be an unsupported efficacy claim.
- **The Brilliant box has a real celebrity's face printed on it.** Keep it as printed, never warp
  or animate it, and never cast or generate a lookalike.

### 0.5 Product → scene assignment (used throughout)

| ID | Product (on-pack name) | Scenes |
|---|---|---|
| PM-01 | Anua — Niacinamide 5 + TXA Brightening Pad (jar) | 2, 3, 11, 12a, 13, loop bridge |
| PM-02a / b | Dr.Althea — 345 Relief Cream (box / tube) | 1 (tube), 4, 8 (tube), 11, 12c, 13 |
| PM-03 | Manee — Gluta Collagen Pink (pouch) | 1, 9 *(A Bonne stand-in)*, 10, 11, 13 |
| PM-04 | Brilliant Skin Essentials — Brilliant Rejuv Set (box) | 1, 5 *(Luxe Organix stand-in)*, 11, 13 |
| PM-05 | Hikari Skin Essentials — Ultrafresh Sunscreen SPF50 PA++++ (pouch) | 1, 7, 11, 12b, 13 |

Scene 4 is the AXIS-Y slot. PM-02 fills it because its clean white packaging suits a green/white
world.

---

## PART 1 — PRODUCT REFERENCE AUDIT

Applies to every product: **front face only is documented.** Backs, sides, bases and closed or
open states not shown stay hidden. On-pack text is never retyped, translated or "cleaned up".

### PM-01 · Anua Niacinamide 5 TXA Brightening Pad — `references/PM-01_…jpg` (1024²)
- **What's shown:** squat, wide cylindrical jar in glossy candy-pink plastic, photographed
  **open**. A stack of translucent pink half-moon pads sits domed above a paler pink inner rim,
  with a glossy wet sheen on top. **No lid is shown.**
- **Front print** (black unless noted): `Anua` wordmark; `Brightening Pad`; red band with white
  `NIACINAMIDE 5 + TXA`; two lines of small black text (EN / FR names); `60매 / 60 PADS (210 ML /
  7.10 FL. OZ)`.
- **Problems:** the jar is **cropped by the right and bottom image edges**, so its full silhouette
  and base aren't documented. Marketing type at left (`#Targeted Care (under eye area)`) touches
  the jar edge. A glass dropper and droplets are composited above it.
- **Fragile details:** small EN/FR lines, the Korean `매`, the red band edges, the pad-stack edge.
- **Rules:** show the jar in the documented **open** state everywhere (state continuity), or
  photograph the closed jar. Never invent a lid design. Yaw ≤ ±15° on a 3D cylinder proxy (2.5).
  Pads may be shown only as on the reference: pink, translucent, half-moon.
- **Usable on-screen words:** `Brightening Pad`, `NIACINAMIDE 5 + TXA` (on pack). `GLOW` and
  `CARE` come from the retailer graphic (*Swipe, Shine, and Glow*; *Targeted Care*), not the pack,
  so the client must approve them (Scene 3).

### PM-02 · Dr.Althea 345 Relief Cream — `references/PM-02_…jpg` (1000², white background)
- **Box (PM-02a):** tall rectangle. Left third is a greyscale photo panel of laboratory glass
  flasks; right is white with vertically set black serif text: `[ 345 RELIEF CREAM ]` ingredient
  paragraph, `FOR ALL SKIN TYPES & FREE FROM ARTIFICIAL FRAGRANCE`, `DR.ALTHEA`, `345`,
  `RELIEF CREAM`, script `Dr.Althea` + `-PRO LAB-`, `Clean Formula. Derma Inspired. Soul
  Liberation.`, `Net wt. 50ml / 1.69 fl oz`.
- **Tube (PM-02b):** white matte tube standing on a white cap, with a flat crimp at the top and
  the same vertical text and script logo.
- **Texture:** a swatch of thick, glossy white cream (top-left of the reference). This is the only
  documented product texture in the set.
- **Rules:** text runs vertically, so never rotate the plate 90° to "fix" it. Box sides are
  undocumented: yaw ≤ ±6°. Tube yaw ≤ ±15° on a cylinder-ish proxy. The ingredient paragraph is
  too small to verify, so **no botanical or ingredient imagery tied to this product.**

### PM-03 · Manee Gluta Collagen Pink — `references/PM-03_…jpg` (729×1000, lifestyle)
- **What's shown:** stand-up pouch in saturated magenta-pink with a glittered top band; yellow
  oval `Manee` logo with leaf; large white `GLUTA` + katakana `グルタ`; `COLLAGEN PINK`; small
  descriptor lines; three round icons; fruit illustrations (raspberry, grapes, tomato,
  strawberries); small text lower right. A sachet lies flat at bottom-left, partly visible.
- **Problems:** **hands occlude the pouch** on the left edge and lower right. Overlay text
  `Unlock Your Inner Radiance` and a second `Manee` logo are baked into the image (not on the
  pouch). The pouch is slightly angled.
- **Rules:** needs a clean packshot. If cutting from the reference, the occluded edges must be
  **re-photographed, not painted**. Sachet: don't use (only partly documented). No fruit props
  (that would imply ingredients). Yaw ≤ ±8° (flexible pouch, card + mild bend).

### PM-04 · Brilliant Skin Essentials Brilliant Rejuv Set — `references/PM-04_…jpg` (1000²)
- **What's shown:** wide box, pink to magenta with a white starfield; yellow sun (left) and
  crescent moon (right); `BrilliantSkin Essentials` script logo with diamond; tagline
  `The best skin of your life starts here.`; photos of the set's contents with labels
  (`HYDROQUINONE TRETINOIN`, `Brilliant Rejuv Topical Solution (Toner)`, `Brilliant Rejuv Topical
  Cream`, `Sunscreen gel-cream`, `Kojic Acid Soap`…); a printed portrait of a real woman;
  `BRILLIANT REJUV SET` ribbon; paragraph at bottom-right; signature at bottom-left.
- **Rules:** box front only, yaw ≤ ±5°. Highest text density of the set, so keep it slow and never
  motion-blurred at hero scale. Don't animate the printed face. No added copy (0.4).

### PM-05 · Hikari Skin Essentials Ultrafresh Sunscreen — `references/PM-05_…jpg` (800²)
- **What's shown:** flexible pouch with a scalloped sun/star outline and a yellow screw spout at
  top-center. Gradient runs yellow (top) to orange to magenta (bottom), with printed pink palm
  fronds. Wordmark `HIKARI 光 SKIN ESSENTIALS`, a holographic `SUPER BRANDS` seal, and a white
  rounded label with iridescent `ULTRAFRESH`, `SUNSCREEN`, `UVA/UVB SPF50 PA++++`, `DAILY
  PROTECTION GEL-CREAM`, SPF 50 sun icon, `PROTECTS. REPAIRS. CORRECTS.`, `Premium Protection
  Without The BreakOuts`, small lines, `1.7 fl oz / 50 ml`.
- **Problems:** six marketing icons and a background are baked around it, but the silhouette is
  clean, so a cutout is feasible.
- **Rules:** the holographic seal and the iridescent `ULTRAFRESH` must stay as photographed (no
  invented rainbow shift). Yaw ≤ ±8°. On-screen copy allowed: `SPF 50 PA++++` (verbatim pack
  claim, written `SPF50 PA++++` on pack).

---

## PART 2 — CAMPAIGN BIBLE

### 2.1 Frame map (30 fps, frame 0–1799)

| # | Scene | Timecode | Frames | Dur | Product | Color world | Primary motion | Out-transition |
|---|---|---|---|---|---|---|---|---|
| 1 | Product Flight Hook | 00:00.00–00:04.00 | 0–119 | 4.0 s | PM-05, 03, 04, 02b | white studio | camera fly-through, forward | PM-02b tube crosses lens → white |
| 2 | Korean-inspired model | 00:04.00–00:08.00 | 120–239 | 4.0 s | PM-01 | soft warm skin / ivory | rack focus eyes→jar, push | match cut on jar |
| 3 | Anua Pink World | 00:08.00–00:13.00 | 240–389 | 5.0 s | PM-01 | translucent pink | slow push, droplets | droplet lens-refraction wipe |
| 4 | Green Botanical *(AXIS-Y slot)* | 00:13.00–00:18.00 | 390–539 | 5.0 s | PM-02a + b | green / white | macro → wide pull-back + crane | dark leaf foreground wipe |
| 5 | Night *(Luxe Organix slot)* | 00:18.00–00:23.00 | 540–689 | 5.0 s | PM-04 | deep purple, moonlight | lateral truck, moon arc | moon-arc light sweep → white |
| 6 | Cream Macro | 00:23.00–00:27.00 | 690–809 | 4.0 s | none | white cream | macro glide, dive | cream fill → golden bloom |
| 7 | Hikari Sunscreen | 00:27.00–00:32.00 | 810–959 | 5.0 s | PM-05 | warm gold / sun | pseudo-orbit, float | palm-frond foreground wipe |
| 8 | Hair Beauty (Japanese-inspired) | 00:32.00–00:37.00 | 960–1109 | 5.0 s | PM-02b | neutral warm, dark hair | lateral truck L→R | whip pan right |
| 9 | Pink Collagen *(A Bonne slot)* | 00:37.00–00:42.00 | 1110–1259 | 5.0 s | PM-03 | glossy hot pink | fast rise → decel | pink liquid wave over lens |
| 10 | Collagen Lifestyle | 00:42.00–00:47.00 | 1260–1409 | 5.0 s | PM-03 | morning window light | slow lateral dolly | sheer-curtain foreground wipe |
| 11 | Product Tunnel | 00:47.00–00:52.00 | 1410–1559 | 5.0 s | all 5 | clean white space | forward flight, parallax | PM-03 lens pass → hard cut |
| 12 | Beauty Montage | 00:52.00–00:56.00 | 1560–1679 | 4.0 s | 01 / 05 / 02b | pink / gold / warm neutral | 3 × 40 f portraits | match cut on tube |
| 13 | Final Hero / Loop | 00:56.00–01:00.00 | 1680–1799 | 4.0 s | all 5 | white → pink | pull-back, products disperse | **Loop bridge** → frame 0 |

Total = 1800 frames exactly. No overlap transitions eat time. Every transition is an in-frame wipe,
light sweep or match cut that completes on the cut frame, so the frame map is final.

### 2.2 Continuity rules (hold across the whole film)

- **Key light** comes from upper camera-left (about 45° up, 45° left) in every product scene.
  Shadows fall down-right. Motivated exceptions keep the same side: window (Scene 10) and sun
  (Scene 7) are both camera-left.
- **Lens family:** 35 mm (flights), 50 mm (lifestyle/hair), 85 mm (portraits), 100 mm macro
  (product details), probe macro (cream). No ultra-wide distortion on products.
- **Motion language:** the dominant travel is **right → left** (loop bridge, Scene 1 tube wipe,
  Scene 3 droplet, Scene 7 frond). Counter-moves are deliberate accents: Scene 8 L→R truck,
  Scene 9 vertical rise.
- **Speed curve:** each scene opens already moving (frame 1) and peaks at its transition. No
  scene holds still for more than 0.5 s.
- **Product behavior:** float amplitude ≤ 2% of frame height, period ≥ 2.5 s, rotation within
  the per-product yaw limits in Part 1. **No 360° spins.** Products never deform, merge,
  duplicate within one shot (except the tunnel, Scene 11, which uses identical exact instances)
  or get liquid fused into them.
- **Grade:** clean commercial whites (no grey highlights), skin tones protected. Blacks lift to
  about 3% so the store screen doesn't crush. Same 35 mm-style fine grain (intensity 4%) on all
  shots, so AI plates and product plates sit in one texture.
- **Color script:** white → ivory → pink → green → purple → cream-white → gold → warm neutral →
  hot pink → morning → white → (pink / gold / warm) → white-pink → pink loop. No two adjacent
  scenes share a dominant hue.

### 2.3 Typography (all added in post, never generated)

- **Typeface:** one geometric sans, two weights. `Montserrat 800 / 600` is already licensed in
  `public/fonts`.
- **Sizes for 2–8 m viewing:** headline cap height ≥ 140 px at UHD, tracking +8%; support text
  ≥ 64 px.
- **Safe area:** title-safe = inner 90% (192 px left/right, 108 px top/bottom). Text never
  overlaps a product plate.
- **Animation:** per-word 10-frame rise of 40 px with opacity 0→1, `Easing.bezier(0.2, 0.8,
  0.2, 1)`; exit by opacity 1→0 over 8 frames. Never flashing.
- **Approved strings only:**
  - Scene 3: `BRIGHTEN • GLOW • CARE` (needs client sign-off, Part 1)
  - Scene 7: `SPF 50 PA++++`
  - Scene 5: none by default. `NIGHT CARE` only with brand approval.
- **Legal slot** (Scenes 9–10 if required): lower-left at 192 / 1960 px, 40 px, white at 85%.

### 2.4 Loop bridge (how 01:00 → 00:00 is seamless)

Build **one** continuous precomp, `LOOP_BRIDGE`, 29 frames long. Its first 19 frames go at the
end of Scene 13 (f1781–1799); its last 10 go at the start of Scene 1 (f0–9). Because it's one
element split across the loop point, position, velocity, blur and grain line up by construction.

- **Element:** PM-01's plain upper body and rim, the glossy pink zone **above the `Anua`
  wordmark**, approaching the lens until it fills frame.
  - Up to f1780 it's the real plate, at ≤ 100% of native resolution.
  - From f1781 it's a CG stand-in: a cylinder textured with **flat colors sampled from PM-01**
    (jar pink as base, paler rim pink as a band) plus one soft specular streak. The low-res plate
    is never enlarged, and no text is in frame.
  - At the handover the plate is already defocused (lens blur ≥ 40 px), so the swap is invisible.
- **Geometry and timing:**

  | Frames | What happens |
  |---|---|
  | f1781–1796 | Approach. The jar sits on the right of the hero layout and moves outward-right and toward the lens. Its growing **left edge sweeps right → left**, accelerating from 0 to **480 px/frame**. |
  | f1797 | The left edge reaches x = 0. Full cover. The blob is now 5760 px wide (1.5 frame widths) with a 300 px soft edge. |
  | f1797–1799 and f0–1 | Full cover. The blob stops growing and slides purely **right → left at 480 px/frame**. The specular streak moves left with it, so motion never stops. |
  | f1–9 | The blob's trailing (right) edge enters at the right at f1 and exits at the left at f9, revealing Scene 1's white studio. |

- **Settings:** motion blur 180° shutter. Same grain as everything else.
- **Check:** play `f1760→1799→0→30` in a loop. The cut point must be invisible and the leftward
  motion must never stall or reverse.

### 2.5 Product-plate animation rules (2.5D / 3D)

| Plate type | Products | Method | Rotation limit |
|---|---|---|---|
| Cylinder | PM-01, PM-02b | Project front plate onto a simple cylinder proxy. Rear 180° is never visible. | yaw ±15°, roll ±4° |
| Box | PM-02a, PM-04 | Flat card plus fake thin sides in sampled edge color, ≤ 3% width. | yaw ±6° (PM-04 ±5°) |
| Pouch | PM-03, PM-05 | Card with a 2–3% bulge mesh. | yaw ±8° |

- **Shadow:** a contact shadow per plate (multiply, 40–60%, blurred by height above the surface)
  plus a soft ambient-occlusion pass.
- **Reflection:** glossy floors get a flipped plate at 12–18%, fading out within 25% of product
  height.
- **Light wrap:** 2–4 px from the environment plate. Specular sweeps are **additive overlays
  ≤ 20% opacity that follow existing geometry**; they never recolor print.
- **Motion blur:** 180° shutter, but **cap blur at 6 px while a product is at hero scale** (text
  must stay legible). Uncapped only during lens passes.
- **Never** fake rotation by squashing a flat card past the limits above. Use camera parallax
  instead.

### 2.6 Human-model rules (all scenes with people)

- Adults aged 25–35, credible commercial casting, unique non-celebrity faces. No lookalike of
  anyone printed on PM-04.
- **Skin:** natural texture, visible pores and fine vellus hair, slight natural asymmetry,
  realistic sclera with catchlights, individual lashes and brows. Makeup is subtle,
  professional skin-prep.
- **Wardrobe:** modest, contemporary (ivory/white/neutral knit or satin). No cleavage emphasis,
  nothing sexualized.
- **Hands:** five fingers, natural nails (short, nude or soft pink), relaxed knuckles. Hands
  hold **proxies** that are replaced by exact plates in comp (each scene says how).
- **Ethnic styling:** Korean-inspired (Scene 2, 12a), Japanese-inspired (Scene 8, 12b),
  Filipina (Scene 10, 12c). Represent each respectfully through real features and styling, not
  caricature, and **never lighten skin tone in grade.**

### 2.7 Pipeline

1. **Product master plates** (0.3), cut to clean alpha. QC: text matches the reference letter
   for letter.
2. **Environment / model stills** from an image model at the highest native resolution, 16:9.
   Products are left out or held as proxies.
3. **Image-to-video** clips from those stills, using first+last frames where the chosen model
   actually supports it (check the current UI; don't assume). Generate each clip at **≥ slot + 1
   s handle**, at 16:9, at the model's highest resolution.
4. **Upscale environment/model plates to UHD** with a temporal video upscaler. **Never run
   product plates through an upscaler or a generative model.**
5. **Composite:** product plates, shadows, reflections, typography, transitions and loop
   bridge, in AE / Nuke / Fusion, or in Remotion (this repo; a 3840×2160 composition with
   hardcoded per-scene `<Sequence>` blocks).
6. **Conform to 30p** (if the generator outputs 24p, retime with optical flow and check hair
   and droplets for warping).
7. **QC and loop test** (Part 5).

**Model-agnostic prompts:** every prompt below is plain prose so it works in any current I2V
model. Where a scene says "first/last frame", use that only if your generator offers it.
Negative prompts are separate fields because not every model accepts them. If yours doesn't,
fold the top five items into the end of the positive prompt as "Avoid: …".

### 2.8 Global negative prompt (append to every scene's negative)

```
text, letters, words, captions, watermark, logo, brand name, label, packaging, bottle, jar, tube,
box, pouch, product, extra objects, plastic skin, airbrushed skin, waxy skin, beauty filter,
uncanny symmetry, doll face, anime, cartoon, CGI look, childlike features, teenager, sexualized
pose, deformed hands, extra fingers, fused fingers, missing fingers, warped anatomy, camera shake,
autofocus hunting, exposure flicker, color flicker, frame-to-frame morphing, background warping,
sudden zoom, scene cut, jump cut, strobing, chromatic aberration fringes, low resolution, blur
artifacts, compression blocks
```

*(The word "product" etc. is negative because environments are generated **without** product;
plates are added in comp. In scenes where a model holds a proxy, the scene's own negative removes
"jar/tube/pouch" from the global list. Each scene says when.)*

---

## PART 3 — HOW TO READ A SCENE PACKAGE

Each scene lists the 23 required fields in order. Times inside prompts are **clip-relative**
(0.0 = the scene's first frame). Times in tables also give absolute frames. "Comp" means work
done in compositing, not by the generator.

---

## PART 4 — SCENE PACKAGES

---

### SCENE 1 — PRODUCT FLIGHT HOOK

1. **Scene:** 1 of 13
2. **Timecode:** 00:00.00 – 00:04.00 (f0–119)
3. **Duration:** 4.0 s / 120 frames
4. **References:** PM-05 Hikari, PM-03 Manee, PM-04 Brilliant box, PM-02b Dr.Althea tube, plus
   the `LOOP_BRIDGE` precomp (PM-01 colors). PM-01 isn't a flying product here, so it never
   appears twice in one frame.
5. **Workflow:** **Product compositing in a 3D-built studio (primary).** A white cyclorama is
   trivial in Blender/C4D, and true 3D gives exact parallax for 4 plates and a camera.
   Alternative: a **fully generated environment** plate (prompt below) plus a 3D camera solve to
   attach the plates.
6. **First frame (f0):** 100% defocused Anua pink (loop bridge, full cover), a soft specular
   streak at x ≈ 2400 moving left. The white studio is hidden behind it.
7. **End frame (f119):** 100% defocused white. The PM-02b tube body at the lens moves right → left
   at 400 px/frame. Behind it (hidden), the hero layout: PM-04 center-far, PM-05 exited left,
   PM-03 exited right.
8. **Subject movement:**

   | Time (frames) | Products (comp keyframes, screen space at UHD) |
   |---|---|
   | 0.00–0.30 (f0–8) | Bridge trailing edge sweeps R→L and exits at f9. Already moving underneath: **PM-05** descends in the far upper-left (center ≈ 1150, 560; height 340 px), yaw +6°. **PM-03** slides in from beyond the right edge at mid-depth (x 4300 → 3600). |
   | 0.30–1.20 (f9–35) | **PM-05** descends a further 160 px, ease-out, yaw +6°→0°. **PM-03** decelerates to x ≈ 2950 (height 720 px), settles, then floats ±1%. |
   | 1.20–2.20 (f36–65) | **PM-04** rises from below frame into the far center background (width 560 px → rest at 1920, 1150), cubic ease-out. As the camera advances, PM-05 grows and exits the left edge and PM-03 grows and exits the right edge: strong parallax "threading". |
   | 2.20–3.20 (f66–95) | **PM-02b** enters from the lower-right foreground, close to camera (visible height ≈ 1500 px, partly out of frame), moving diagonally up-left at about 60 px/frame, roll −4° → 0°. PM-04 holds center with a ±1% float. |
   | 3.20–4.00 (f96–119) | **PM-02b** accelerates R→L across the lens (to 400 px/frame) and defocuses (blur 0 → 60 px). From f108 the plate hands over to a flat white CG tube body (no text). Full white cover f114–119. Continues into Scene 2 f120–126. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–1.2 s | Forward dolly at constant speed (≈ 1.4 m/s scene scale), moving from frame 1. Height 1.1 m, tilted down 4°. |
   | 1.2–2.2 s | Continues forward. Boom down 8 cm. Yaw +3° right as it threads between PM-05 and PM-03. |
   | 2.2–3.2 s | Speed up 15%. Slight roll +1.5° (energy, still stable). |
   | 3.2–4.0 s | Hold speed. The tube crossing provides the wipe; the camera doesn't whip. |

10. **Lens:** 35 mm full-frame equivalent, T2.8. Focus distance pulls with the hero object;
    background slightly soft.
11. **Lighting:** an 8 × 3 m overhead softbox biased to camera-left (key at upper-left), a large
    white bounce camera-right, and a thin backlight rim from upper-right on the products. The
    floor gives 15% reflections. Neutral 5600 K.
12. **Environment:** seamless white infinity cove, satin off-white floor, soft gradient (bright
    upper-left → #ECEAE8 lower-right). Out-of-focus pale pink and pale gold bokeh discs at the far
    edges. Otherwise empty.
13. **Product position and scale:** as in item 8. **Max hero scale: PM-03 720 px tall,
    PM-04 560 px wide.** Plates exceed those sizes only while they pass the lens, and there
    defocus hides detail.
14. **Model action:** none.
15. **Physics / VFX:**
    - Every product follows an ease curve: no linear starts, no instant stops.
    - Contact shadows on the floor shrink and soften as products rise.
    - Reflections are on.
    - Faint dust specks in the key beam: 30 particles, very slow, 1–3 px, never over labels.
16. **Transition IN:** loop bridge (from Scene 13), trailing edge R→L f1–9.
17. **Transition OUT:** PM-02b white body lens pass, full cover f114–119, sliding R→L.
18. **Still prompt** (only if using the AI environment route):

```
Photorealistic commercial studio photograph, 16:9 horizontal, 3840x2160. An empty seamless white
infinity-cove beauty studio. Satin off-white floor curving smoothly into the back wall with no
visible horizon seam. Large overhead softbox biased to the upper left produces a gentle gradient
from pure bright white at upper left to very light warm grey at lower right. The floor shows a
soft, faint glossy reflection. Far away at the left and right edges, a few large out-of-focus
bokeh discs in pale blush pink and pale champagne gold add depth. Camera at 1.1 metres height
with a 35mm lens, tilted 4 degrees downward, looking into deep space. The centre of the room is
completely empty. Clean premium cosmetics advertising look, crisp whites, no clutter.
```

19. **Image-to-video prompt** (AI environment route):

```
Begin from the supplied image of an empty white infinity-cove studio and keep its lighting and
colour exactly. The camera is already moving on the first frame: a smooth, gimbal-stable forward
dolly through the empty studio at constant speed. 0.0-1.2 s: steady forward travel, floor
reflections and the soft gradient sliding past naturally with correct parallax. 1.2-2.2 s: the
camera keeps moving forward, lowers very slightly, and turns gently a few degrees to the right.
2.2-3.2 s: forward speed increases a little with a barely perceptible clockwise roll. 3.2-4.0 s:
steady forward travel continues. The far pink and gold bokeh discs drift outward from the centre
as the camera advances. A few tiny dust specks float slowly in the light. The room stays
completely empty the whole time: no objects appear. No cuts, no shake, no zoom pulses, no flicker.
```

20. **Negative prompt:**
```
[Global negative 2.8], objects in room, furniture, props, people, shelves, plants, coloured walls,
visible floor seam, horizon line, dirty floor, heavy reflections, lens flare, fast whip, rotation
of the room, warped geometry
```
21. **Product preservation:**
    - All four plates are composited and untouched by AI.
    - Yaw limits per Part 1.
    - Blur is capped at 6 px whenever a plate is under 800 px and in focus.
    - At its in-focus peak (f80–95), PM-02b's vertical text must read correctly in a still check.
    - Plates are never mirrored.
22. **AI failure risks:**
    - The AI room "grows" objects or seams.
    - The dolly reads as a zoom (no parallax), so plates won't sit right.
    - Bokeh discs drift in random directions.
    - In comp: products look pasted (no shadow/light wrap), or the flight looks like a screensaver
      because all products move at the same speed.
23. **Correction:**
    - If the AI plate shows zoom-like motion or morphing, drop it and build the studio in 3D
      (an hour of work).
    - If parallax feels flat, increase depth spacing (put PM-03 closer) rather than speed.
    - If it reads as chaotic, remove the PM-04 rise and keep 3 products.

---

### SCENE 2 — ASIAN BEAUTY MODEL (KOREAN-INSPIRED)

1. **Scene:** 2
2. **Timecode:** 00:04.00 – 00:08.00 (f120–239)
3. **Duration:** 4.0 s / 120 frames
4. **References:** PM-01 Anua jar (open state). The model is generated and holds a **proxy jar**.
5. **Workflow:** **Generated still → image-to-video**, then **product compositing** (track the
   proxy, replace it with the PM-01 plate, roto fingers on top).
6. **First frame (f120):** medium close-up. The model's face sits right of center: eyes at
   x ≈ 2300, y ≈ 780, **in sharp focus**. Both hands at lower-left (x ≈ 1300, y ≈ 1650) cradle
   the jar, soft. The left 15% is still covered by the white tube-wipe trailing edge from
   Scene 1.
7. **End frame (f239):** the jar is sharp and large in the left-center: plate center (1540,
   1080), width ≈ 1300 px with packshots or ≤ 900 px on the fallback plate. The face is softly
   defocused behind at right; she's still looking at the lens.
8. **Subject movement:**

   | Time | Model / product |
   |---|---|
   | 0.0–0.2 s (f120–126) | White wipe trailing edge exits left. She's already in micro-motion: breath, a slight head settle. |
   | 0.2–1.0 s | She holds her gaze on the lens. A natural blink at 0.6 s. The corners of her mouth lift into a soft smile. |
   | 1.0–1.6 s | Her hands carry the jar forward toward the lens about 15 cm and up to chin height. Her shoulders lean in slightly. |
   | 1.6–2.4 s | The hands hold steady while focus racks to the jar. |
   | 2.4–4.0 s | The jar stays steady (hands still; micro-motion ≤ 3 px). Gaze stays on the lens. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–1.6 s | Slow push-in, 3% scale, plus a 40 px drift left. Moving from the first frame. |
   | 1.6–2.4 s | **Rack focus:** eyes → jar, smooth 0.8 s, no hunting. |
   | 2.4–4.0 s | Push-in continues and accelerates slightly (another 6%), centering the jar for the match cut. |

10. **Lens:** 85 mm, f/2. Shallow depth of field.
11. **Lighting:** large soft key at upper camera-left 45°, white fill bounce from below, subtle
    hair rim from back-right. Catchlights at 10 o'clock. 5200 K, clean.
12. **Environment:** seamless warm ivory backdrop with a gentle radial lift behind her head.
13. **Product:** see items 6–7. Front label faces the lens (yaw ≤ 5°).
14. **Model action:** adult Korean-inspired woman, about 28. Glass-skin prep with real pores,
    MLBB lips, sleek dark-brown hair tucked behind one ear, ivory fine-knit boat-neck top. Calm
    and confident. **She presents the jar; she doesn't apply anything.**
15. **Physics / VFX:**
    - The jar gets a soft contact shadow on her fingertips and a pink bounce (5%) on the
      undersides of her fingers.
    - The plate's defocus is keyframed to match the rack: 18 px at f120 → 0 px at f192.
16. **Transition IN:** Scene 1's white tube body slides off to the left (f120–126).
17. **Transition OUT:** **match cut on the jar**. The last frame's jar position and scale equal
    Scene 3's first frame. A 4-frame 3% push continues across the cut.
18. **Still prompt:**

```
Photorealistic premium Korean skincare campaign photograph, 16:9 horizontal. An adult Korean
woman about 28 years old, medium close-up from mid-chest up, placed in the right half of the frame
with her eyes about 60 percent across the width and 36 percent down from the top. She looks
directly into the lens with a calm, warm, closed-mouth half smile. Real skin: dewy glass-skin
prep with clearly visible pores on nose and cheeks, fine vellus hair along the jawline catching
the rim light, slight natural asymmetry, a few faint freckles. Softly groomed straight brows,
thin brown eyeliner, rosy my-lips-but-better tinted lips. Dark brown sleek hair tucked behind one
ear with a few loose individual strands. Ivory fine-knit boat-neck top. Both hands raised at the
lower left of frame in front of her chest, palms up, fingertips gently together, cradling a
plain glossy candy-pink squat cylindrical jar that is wider than it is tall, open with no lid,
with a paler pink rim and a domed stack of translucent pink half-moon pads on top. The jar has no
text, no label, no logo. Five natural fingers on each hand, short nude nails. Seamless warm ivory
backdrop with a soft brighter glow behind her head. Lighting: large soft key from upper camera
left at 45 degrees, white bounce fill from below, subtle hair light from back right, catchlights
at 10 o'clock in both eyes. 85mm lens at f/2, focus precisely on her eyes, the jar in the
foreground noticeably out of focus. True-to-life skin tone, commercial retouching only.
```

19. **Image-to-video prompt:**

```
Begin exactly from the supplied photograph and keep the woman's identity, face, skin texture,
hair and wardrobe unchanged throughout. The camera is already moving on the first frame: a slow,
smooth push-in on an 85mm lens. 0.0-1.0 s: she holds steady eye contact with the lens, breathes
naturally, blinks once softly at about 0.6 seconds, and her smile warms slightly; focus stays
sharp on her eyes, the pink jar in her hands remains soft in the foreground. 1.0-1.6 s: keeping
her palms up, she smoothly carries the jar forward toward the camera by about 15 centimetres and
raises it to chin height at the left side of frame, leaning her shoulders in a little. 1.6-2.4 s:
her hands become still and the focus racks smoothly from her eyes to the jar; her face falls
gently out of focus while the jar becomes sharp. 2.4-4.0 s: the jar is held perfectly steady at
the left-centre of frame, the camera keeps pushing in slowly toward it so the jar grows in frame,
and she keeps looking at the lens behind it with a soft smile. The jar stays a plain pink jar
without any text. Natural hand anatomy, no finger changes, no shake, no flicker, no cut.
```

20. **Negative prompt:**
```
[Global negative 2.8 minus "jar"], text on jar, label, logo, lid on jar, jar changing shape,
second jar, extra hands, hands crossing face, applying product to face, open mouth, exaggerated
smile, head tilt drama, heavy makeup, contact-lens eyes, glossy plastic skin, skin lightening
```
21. **Product preservation:**
    - The proxy is replaced 100% by the PM-01 plate on a planar track plus a cylinder proxy for
      perspective.
    - The plate must fully cover the proxy silhouette (scale the plate to the real product's
      proportions and adjust the proxy region with clean-plate paint where it's larger).
    - Fingers are rotoscoped over the jar's base only, never over the label.
    - Label orientation stays front-on.
22. **AI failure risks:**
    - AI prints fake text on the proxy jar.
    - Fingers morph during the forward move.
    - The rack focus doesn't happen (everything stays sharp) or "breathes".
    - Her face drifts in identity during the push.
    - The jar rotates.
23. **Correction:**
    - Fake text on the proxy doesn't matter (the plate covers it), but **regenerate if the
      proxy's silhouette changes**: the plate can't cover a moving silhouette.
    - If the rack fails, generate with focus on the eyes throughout and do the rack in comp: depth
      matte from a depth estimator, defocus the face 0 → 14 px.
    - If the hands morph, reduce the move: the hands stay still and only the camera pushes.
    - If identity drifts, shorten the clip to 3 s and slow the push.

---

### SCENE 3 — ANUA PINK WORLD

1. **Scene:** 3
2. **Timecode:** 00:08.00 – 00:13.00 (f240–389)
3. **Duration:** 5.0 s / 150 frames
4. **References:** PM-01 Anua jar (open state, pads visible).
5. **Workflow:** **Generated still → image-to-video** for the environment (product-free, with an
   empty plinth), then **product compositing**. The near-lens droplet wipe is built in comp (CG
   refraction).
6. **First frame (f240):** the jar plate at (1540, 1080), the same scale as Scene 2's end
   (match cut), hovering 4 cm above an empty glossy pale-pink round plinth. Translucent pink
   panels behind. Serum droplets suspended at various depths.
7. **End frame (f389):** the jar is 6% larger and slightly left of where it started. A large
   clear droplet (CG) covers ≈ 90% of frame from the left, refracting the next world (green) as
   the wipe completes.
8. **Subject movement:**

   | Time | Product / environment |
   |---|---|
   | 0.0–1.0 s | The jar floats with a slow vertical bob (amplitude 12 px, period 3 s) and yaw +8°. Droplets drift (≤ 4 px/frame), each wobbling slightly as a sphere. |
   | 1.0–2.0 s | The jar yaws slowly from +8° to +2°, ease-in-out. A small droplet (CG, comp) falls from the top of frame past the jar's right side and lands on the plinth with a tiny crown splash and ring ripple. **It lands on the plinth, not on the jar.** |
   | 2.0–4.2 s | The jar settles at yaw −4°. Its contact shadow breathes with the bob. Pink crescent forms drift R→L in the foreground (very soft) and the background. |
   | 4.2–5.0 s | A large CG droplet enters from the right, close to the lens, crossing R→L. It refracts the scene, then Scene 4's first frame, inside its lens. Full cover at f387–389. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–4.2 s | Slow push-in, 6% total, constant velocity, already moving at frame 1. Slight upward boom (20 px screen shift). |
   | 4.2–5.0 s | Push continues; the droplet passes the lens. |

10. **Lens:** 100 mm macro-style product lens, T4. Background in creamy blur.
11. **Lighting:**
    - Key: soft upper camera-left.
    - Strong backlight through the translucent panels, so pink glows from behind.
    - Caustic light patterns on the plinth from the refracting droplets.
    - Thin specular on the jar's rim (additive, ≤ 20%).
12. **Environment:** layered frosted pink acrylic panels and soft curved translucent pink glass
    forms at several depths. Pink-to-peach gradient, brighter at upper left. Glossy pale-pink
    round plinth. Crystal-clear, pink-tinted serum droplets floating. Soft translucent
    **pink half-moon** shapes echoing the real pads (not white, to stay true to the reference).
13. **Product:** center (1540, 1080) → (1500, 1060) by 4.2 s. Width per Scene 2. Label
    front-on, yaw within ±8°.
14. **Model action:** none.
15. **Physics / VFX:**
    - Droplets are spherical, refractive, slightly elongated in the direction of motion, never
      merging into the jar.
    - The plinth splash is small: crown height ≤ 6% of the jar's height.
16. **Transition IN:** match cut from Scene 2.
17. **Transition OUT:** CG droplet lens-refraction wipe R→L (f366–389).
18. **Still prompt:**

```
Photorealistic premium skincare advertising set, 16:9 horizontal, abstract translucent pink
world. Layers of frosted pink acrylic panels and smooth curved translucent pink glass forms at
several depths, glowing from strong soft backlight. Background is a pink-to-peach gradient,
brighter at the upper left. In the left-centre of frame stands an empty glossy pale-pink round
plinth at lower-middle height; nothing is on it. Crystal-clear pink-tinted serum droplets float
in the air at different depths, some sharp near the plinth, others large and blurred in the
foreground and background. Two or three soft translucent pink half-moon shapes float out of focus.
Caustic light patterns ripple across the plinth top. Key light soft from upper camera left. 100mm
lens, shallow depth of field, creamy blur. Clean, luxurious, minimal, no objects other than these.
```

19. **Image-to-video prompt:**

```
Begin from the supplied image and keep its colours, layout and the empty plinth unchanged. The
camera is already moving on the first frame: a slow, steady push-in of about six percent over
five seconds with a very slight upward drift, gimbal-smooth. 0.0-1.0 s: floating serum droplets
drift very slowly in different directions, each gently wobbling like a real liquid sphere; caustic
light shimmers softly across the plinth top. 1.0-2.0 s: the backlight behind the translucent pink
panels breathes a little brighter and back; the soft pink half-moon shapes in the foreground drift
slowly from right to left. 2.0-5.0 s: the slow push continues, droplets keep drifting, caustics
keep moving, the plinth top remains empty. No new objects, no text, no cuts, no shake.
```

20. **Negative prompt:**
```
[Global negative 2.8], object on plinth, jar, cosmetics, droplets merging into big blobs,
splashes, waterfall, foam, bubbles foam, white pads, colour shift to purple or red, flickering
backlight, panels moving fast
```
21. **Product preservation:**
    - The jar is a plate on a cylinder proxy. The open-pad state is identical to the reference.
    - **No liquid touches or overlaps the label.** The splash is on the plinth, behind and to the
      right.
    - Typography never overlaps the jar.
22. **Typography (optional, client-approved):** `BRIGHTEN` · `GLOW` · `CARE` stacked at the right
    (x 2500, y 860 / 1020 / 1180), Montserrat 800, 150 px, deep raspberry sampled from PM-01's
    red band.
    - In: words at 1.2 s, 1.5 s, 1.8 s (per 2.3).
    - Out: 4.0 s, before the droplet wipe.
23. **AI failure risks and correction:**
    - **Risk:** AI places a product or object on the plinth. **Fix:** regenerate with "empty
      plinth" first in the prompt, or paint the plinth clean on one frame and track it.
    - **Risk:** droplets fall or explode instead of floating. **Fix:** lower the drift wording;
      generate a locked camera and do the push in comp (scale 1.00 → 1.06).
    - **Risk:** pink drifts toward magenta between frames. **Fix:** grade-lock with a reference
      frame and per-frame color match.

---

### SCENE 4 — GREEN BOTANICAL WORLD *(AXIS-Y slot · PM-02 Dr.Althea)*

1. **Scene:** 4
2. **Timecode:** 00:13.00 – 00:18.00 (f390–539)
3. **Duration:** 5.0 s / 150 frames
4. **References:** PM-02a box and PM-02b tube. (When an AXIS-Y reference arrives, swap the
   plates; the environment stays.)
5. **Workflow:** **Generated still → image-to-video** with **first + last frame**: macro
   keyframe and wide keyframe, products absent. Then **product compositing** onto the plinth
   (tracked).
6. **First frame (f390):** extreme macro of a single clear water droplet on a matte white
   stone surface. In the droplet, the inverted refraction of soft green leaves. Seen through the
   tail of Scene 3's droplet wipe.
7. **End frame (f539):** a wide, calm set: a white stone plinth center-left with PM-02a box
   (left) and PM-02b tube (right) standing on it. Soft, unidentifiable rounded green leaves frame
   the background and foreground edges. Dappled leaf shadows on the white wall.
8. **Subject movement:**

   | Time | Subject |
   |---|---|
   | 0.0–1.2 s | The droplet trembles slightly; a second tiny droplet beads and slides 30 px down the stone. |
   | 1.2–3.0 s | As the camera pulls back, the products come into view on the plinth, already in place (static hero: they don't move, the camera reveals them). |
   | 3.0–4.3 s | Leaf shadows drift slowly across the wall (breeze). The products stay still. The tube does a slow yaw +6° → 0° (comp). |
   | 4.3–5.0 s | A dark out-of-focus leaf enters from the right foreground, close to the lens, crossing R→L. Full cover at f533–539. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–1.2 s | Macro, moving from frame 1: lateral creep R→L, 2% of frame. |
   | 1.2–3.0 s | **Pull-back plus crane up**: macro → medium. Smooth ease-in-out, the strongest move of the scene. |
   | 3.0–4.3 s | Pull-back continues slowly to wide. Settles. |
   | 4.3–5.0 s | Slight drift left into the leaf wipe. |

10. **Lens:** 100 mm macro (start), with the feel of the move transitioning to a 50 mm look at
    the wide end. In AI, describe it as "pulling back"; don't call for a zoom.
11. **Lighting:** cool-neutral daylight 5600 K. Key from upper-left through a leaf gobo (dappled
    shadow). Soft white fill. Gentle green bounce from the leaves.
12. **Environment:** matte white stone and plaster. Pale-green and white palette. Restrained
    generic foliage: **no identifiable herb, flower or plant species** (no ingredient
    implication). Water droplets on the stone.
13. **Product position and scale (end):** box center (1500, 1180), height 980 px; tube center
    (1980, 1260), height 820 px. Both on the plinth top line y ≈ 1640. Wide end only, so
    fallback plate sizes work.
14. **Model action:** none.
15. **Physics / VFX:** droplets bead and slide under gravity, with no splash. Leaf shadows move at
    breeze speed (≤ 3 px/frame). Product contact shadows and AO on the plinth. Faint water-drop
    reflections on the plinth (not on the products).
16. **Transition IN:** Scene 3's droplet refraction wipe (R→L).
17. **Transition OUT:** a dark green leaf foreground wipe R→L, its dark tone handing to
    Scene 5's deep purple.
18. **Still prompts:**

    **First frame:**
```
Photorealistic extreme macro photograph, 16:9 horizontal. A single perfectly clear water droplet
sits on a matte white stone surface, filling the centre-left of the frame. Inside the droplet,
an inverted, refracted image of soft green leaves is visible. A second tiny droplet beads just
below it. Cool natural daylight from the upper left, gentle dappled leaf shadow across the stone.
100mm macro lens at f/4, razor-thin focus on the droplet edge, everything else creamy and soft.
Palette: white, pale stone, fresh pale green. Clean premium skincare advertising.
```

    **Last frame:**
```
Photorealistic premium skincare advertising set, 16:9 horizontal, wide shot. A minimal white
stone plinth stands centre-left on a matte white plaster floor in front of a white plaster wall.
The plinth top is completely empty. Soft rounded generic green leaves, not any recognisable herb
or flower, frame the composition: blurred in the left and right foreground edges and softly in
the background. Cool natural daylight from the upper left passes through foliage, creating gentle
dappled leaf shadows on the wall. A few clear water droplets rest on the plinth surface. 50mm
lens, shallow depth of field, calm, fresh, clean, premium, pale green and white palette.
```

19. **Image-to-video prompt** (first + last frame):

```
Start on the supplied macro image of a single clear water droplet on white stone and end on the
supplied wide image of the empty white stone plinth among soft green leaves. The camera is moving
from the first frame. 0.0-1.2 s: macro view, a very slow sideways creep from right to left; the
droplet trembles slightly and a tiny second droplet beads and slides a short distance down the
stone under gravity. 1.2-3.0 s: the camera pulls back and cranes up smoothly, revealing that the
droplet sits on the top of a white stone plinth; the green leaves and white wall come into view
with natural parallax, foreground leaves passing faster than the background. 3.0-5.0 s: the
pull-back slows and settles into the wide composition; dappled leaf shadows drift slowly across
the wall as if moved by a light breeze. The plinth top stays empty. Physically real perspective
change, not a zoom. No new objects, no text, no flicker.
```

20. **Negative prompt:**
```
[Global negative 2.8], flowers, herbs, aloe, cica leaves, centella, tea leaves, recognisable plant
species, fruit, objects on plinth, splash, rain, waterfall, colour cast to yellow, digital zoom,
morphing between images, cross-dissolve
```
21. **Product preservation:**
    - Both plates are static hero plates with only camera parallax (tracked from the generated
      move).
    - Tube yaw ≤ 6°. **No droplets or water on the product plates.**
    - Leaf shadows may cross the products only as a soft multiply ≤ 15% over the white areas. The
      safer default is no shadow on the label text.
22. **AI failure risks:**
    - The first→last frame bridge cross-dissolves instead of pulling back (the most common
      failure).
    - The plinth changes shape mid-move.
    - AI invents flowers.
    - Parallax breaks, so the plates slide.
23. **Correction:**
    - If it dissolves, split it in two: (a) macro clip 0–1.6 s with a pull-back start and
      (b) wide clip with a pull-back end, joined behind a soft foreground leaf passing the lens
      at 1.5 s.
    - If the plinth morphs, do a 3D camera solve on the stable frames and build the plinth in CG.
    - Kill flowers with a regeneration; never paint over moving foliage.

---

### SCENE 5 — NIGHT WORLD *(Luxe Organix Retinol slot · PM-04 Brilliant Rejuv Set)*

1. **Scene:** 5
2. **Timecode:** 00:18.00 – 00:23.00 (f540–689)
3. **Duration:** 5.0 s / 150 frames
4. **References:** PM-04 box.
   - The storyboard's "tube and box float together" can't be honored: PM-04 is documented only
     as a closed box, so the contents are never shown separately.
   - When the Luxe Organix tube and box references arrive, they replace PM-04 here: two plates,
     the box behind-left and the tube in front-right, as specified.
   - The box's own sun and moon art motivates the night world.
5. **Workflow:** **Generated still → image-to-video** for the environment (no product), then
   **product compositing**.
6. **First frame (f540):** deep-purple darkness emerging from Scene 4's leaf wipe (the wipe's
   dark trailing edge exits left). A huge thin luminous moonlight arc behind center-right.
   Faint mist. The PM-04 box floats left of center, tilted yaw +5°.
7. **End frame (f689):** the box has traveled to just right of center at yaw −3°. The arc's
   bright highlight has swept to the left end of the arc and is blooming to near-white
   (transition).
8. **Subject movement:**

   | Time | Product / environment |
   |---|---|
   | 0.0–0.3 s | The box is already rising slowly (8 px/frame, ease-out) from 60 px below its rest. |
   | 0.3–2.5 s | The box floats: bob amplitude 10 px, period 3.2 s. Yaw +5° → +1°, slow. Fine silver dust drifts upward in the moonlight. |
   | 2.5–4.0 s | Yaw +1° → −3°. A soft specular highlight sweeps once across the box's front gloss, L→R, ≤ 18% additive, 30 frames. It follows the box plane and never covers the printed face for more than 6 frames. |
   | 4.0–5.0 s | The moon arc's travelling highlight accelerates to the arc's left end and blooms. The frame lifts toward white (luminance ramp over 12 frames, **not a flash**). Full white by f689. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–4.0 s | **Lateral truck left→right** (screen content moves R→L), 7% of frame width, constant, moving from frame 1. Slight descending crane, so the arc rises behind the box: parallax between box, arc and mist layers. |
   | 4.0–5.0 s | Truck continues; exposure lift handled in comp. |

10. **Lens:** 85 mm, T2.8. The box is sharp; arc and mist are soft.
11. **Lighting:** cool moonlight rim (7000 K) from upper-right on the box's edges, a soft violet
    fill from the left, a deep purple ambient. The front stays readable: a key-to-shadow ratio of
    2:1 on the box front, never in silhouette.
12. **Environment:** deep purple to indigo void. A large thin luminous arc (a partial ring like a
    crescent moon's rim) behind. Low layered mist on the floor plane. A few tiny cool sparkles.
    Elegant, not sci-fi.
13. **Product:** box center (1700, 1100) → (2050, 1080). Width 1100 px with packshots, ≤ 900 px
    on the fallback plate. Front-on, yaw ±5° max.
14. **Model action:** none.
15. **Physics / VFX:**
    - Mist drifts slowly L→R (counter to camera, adds depth).
    - The box gets a soft reflection on a dark glossy floor plane (10%).
    - Dust rises at 1–2 px/frame.
16. **Transition IN:** Scene 4's dark leaf wipe.
17. **Transition OUT:** the moon-arc highlight sweeps and blooms to white (f677–689), handing
    to Scene 6's white cream.
18. **Still prompt:**

```
Photorealistic premium night-time skincare advertising environment, 16:9 horizontal. A deep
purple to indigo void with soft depth. Behind the centre-right of frame, a very large, thin,
luminous arc of cool white moonlight, like the glowing rim of a crescent moon, partially visible,
softly blooming. Low layers of fine mist hover over a dark glossy floor that faintly reflects the
arc. Tiny cool silver dust particles float in the moonlight. Soft violet fill from the left.
The left-centre area in front of the arc is empty, open space. 85mm lens, shallow depth of field.
Elegant, calm, luxurious, minimal; no objects, no text.
```

19. **Image-to-video prompt:**

```
Begin from the supplied image of a deep purple night void with a large luminous moonlight arc and
keep its colours and composition. The camera is already moving on the first frame: a smooth,
slow lateral truck from left to right with a very slight downward crane, so the arc appears to
rise slightly and shift with real parallax against the mist layers. 0.0-2.5 s: fine silver dust
drifts slowly upward through the moonlight; mist layers drift gently from left to right. 2.5-4.0 s:
a bright highlight begins to travel slowly along the moonlight arc from its right end toward its
left end, like light sliding along a curved glass rim. 4.0-5.0 s: the highlight accelerates
smoothly to the left end of the arc and blooms softly, gently lifting the overall brightness of
the frame. The centre-left space remains empty. No objects, no stars streaking, no flicker, no cut.
```

20. **Negative prompt:**
```
[Global negative 2.8], planets, realistic moon surface, stars streaking, galaxy, sci-fi
hologram, neon tubes, lightning, fire, smoke plumes, objects in space, flicker, strobe, sudden
flash
```
21. **Product preservation:**
    - The plate is static except float and limited yaw.
    - The printed portrait is never warped, highlighted for long, or blurred beyond 2 px.
    - **No glow is applied onto print.** The rim light is a separate edge pass.
    - Brightness lift at the end applies to the whole comp at once, never to the box alone.
    - Default: no on-screen text (0.4).
22. **AI failure risks:**
    - The arc becomes a full planet or moon (fake object).
    - Mist turns into smoke billows.
    - The highlight travels randomly.
    - Bloom flickers.
23. **Correction:**
    - If the arc misbehaves, make the arc in comp: a CG thin ring plus glow. The AI then only
      supplies mist and void, which is very reliable.
    - Do the highlight sweep in comp along a path, and use only a gentle bloom from the AI.

---

### SCENE 6 — CREAM MACRO

1. **Scene:** 6
2. **Timecode:** 00:23.00 – 00:27.00 (f690–809)
3. **Duration:** 4.0 s / 120 frames
4. **References:** none on screen.
   - The look is matched to the only documented texture in the set, PM-02's thick glossy white
     cream swatch, but **no product is named or shown**.
   - It's a sensorial interlude, not a claim about any one product.
5. **Workflow:** **Fully generated** (generated still → image-to-video). No compositing apart
   from grade and the transition.
6. **First frame (f690):** near-white bloom (end of Scene 5's sweep) resolving into extreme
   macro. A glossy white cream surface with soft peaks and swirled ridges, raking light from the
   left. The camera is 2 cm above the surface.
7. **End frame (f809):** the camera has dived into a cream peak. The frame is entirely smooth
   white cream, warming to a soft golden glow from the upper right.
8. **Subject movement:**

   | Time | Subject |
   |---|---|
   | 0.0–0.3 s | Bloom fades (comp, white → image over 9 frames); the cream is already in view. |
   | 0.3–2.6 s | The cream is static as a material, with very slow viscous settling: one ridge relaxes slightly, the slow flow of a thick cream (≤ 1 px/frame). Tiny air-bubble specular points glint. |
   | 2.6–4.0 s | A peak looms as the camera approaches. The cream fills the frame. Warm golden light floods in from the upper right (Scene 7's sun). |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–2.6 s | **Low glide forward** across the surface (probe lens), 2 cm height, moving R→L diagonally into depth, constant speed. Peaks pass with strong parallax. Gentle 3° roll left. |
   | 2.6–4.0 s | Tilts down 10° and pushes into a peak until the frame is all cream. |

10. **Lens:** probe macro (24 mm probe-style, deep focus at macro distance, f/14 look).
11. **Lighting:** hard-ish raking key from camera-left at a very low angle (shows ridges), a
    soft white fill. In the last 1.2 s, warm 4300 K light rises from the upper right.
12. **Environment:** only cream: a white, slightly warm (not grey, not blue), thick, glossy
    surface.
13. **Product:** none.
14. **Model action:** none.
15. **Physics / VFX:** a thick viscous cream that holds peaks, does not splash, does not run like
    milk, and has a satin-gloss specular.
16. **Transition IN:** the white bloom from Scene 5.
17. **Transition OUT:** the cream fills the frame, a warm golden bloom spreads from the upper
    right, then Scene 7's sunlit world fades up through the gold (10 frames). This is a luminance
    transition, not a cross-dissolve of objects.
18. **Still prompt:**

```
Photorealistic extreme macro photograph, 16:9 horizontal, of a thick, rich, glossy white skincare
cream surface filling the entire frame, sculpted into soft peaks, gentle swirls and smooth
ridges like whipped but dense cream. Hard-ish raking light from the far left at a very low angle
reveals the ridges and creates soft satin highlights and gentle shadows in the valleys. Tiny glints
of light on the surface. Colour: clean bright white with the faintest warm tone, no grey, no blue.
Probe macro lens just above the surface, deep focus at macro scale, dramatic sense of landscape
scale. No containers, no fingers, no text.
```

19. **Image-to-video prompt:**

```
Begin from the supplied extreme macro image of a glossy white cream surface. The camera is already
moving on the first frame: a slow, smooth forward glide just above the cream, travelling diagonally
from right to left into depth like a drone flying low over a white landscape, with strong parallax
as nearer ridges pass faster than distant peaks, and a gentle three-degree roll to the left.
0.0-2.6 s: the glide continues at constant speed; the cream stays thick and holds its shape, with
only a very slow, viscous relaxing of one ridge and small light glints sliding over its satin
surface. 2.6-4.0 s: the camera tilts slightly down and pushes into a soft cream peak until the
entire frame is filled with smooth white cream, while a warm golden light grows from the upper
right. No liquid splashing, no running milk, no objects, no fingers, no cut.
```

20. **Negative prompt:**
```
[Global negative 2.8], milk, yogurt, running liquid, splash, drips, bubbles foam, grey cream,
yellow butter, food, spoon, finger, container edge, jar rim, texture shimmering, noise crawl
```
21. **Product preservation:** n/a (no product). Integrity rule: no caption or plate overlays
    attach this texture to a specific product.
22. **AI failure risks:**
    - The cream behaves like liquid.
    - The texture "boils" (temporal noise).
    - The glide reads as a zoom.
    - Grey or blue cast.
23. **Correction:**
    - If it moves like liquid, generate with locked material and only camera move ("the cream
      is completely still"), then add a tiny viscous relax with comp warp if wanted.
    - If it boils, use a denoiser on the luminance only, or regenerate shorter (3 s) and
      retime 0.75× with optical flow.
    - Last resort: a real macro shoot of a cream swatch on glass with a probe lens (half a day).

---

### SCENE 7 — HIKARI SUNSCREEN

1. **Scene:** 7
2. **Timecode:** 00:27.00 – 00:32.00 (f810–959)
3. **Duration:** 5.0 s / 150 frames
4. **References:** PM-05 Hikari pouch.
5. **Workflow:** **Generated still → image-to-video** environment (no product), then **product
   compositing**. The "orbit" is a **pseudo-orbit**: the camera arcs in the AI plate while the
   plate counter-yaws within ±8°, so the front always faces the viewer. Unknown back or sides are
   never revealed.
6. **First frame (f810):** golden-bloom handover from Scene 6, resolving to a sunlit warm set.
   Sand-colored travertine pedestal rising from a shallow clear water pool. Moving palm-frond
   shadows on the warm cream wall. The pouch floats above the pedestal, center-right, yaw −6°.
7. **End frame (f959):** the pouch has floated up 40 px at yaw +6°. The camera has arced about
   12° right. A dark palm-frond silhouette covers the frame from the right (wipe).
8. **Subject movement:**

   | Time | Product / environment |
   |---|---|
   | 0.0–0.4 s | Bloom resolves. The pouch is already floating, moving up at 3 px/frame. |
   | 0.4–2.5 s | Controlled float: bob amplitude 14 px, period 2.8 s, yaw −6° → 0°. Caustic water reflections ripple across the pedestal and the lower wall. Palm shadows sway (period about 2 s). |
   | 2.5–4.3 s | Yaw 0° → +6°. A slow specular glint travels across the pouch's glossy film, L→R, ≤ 18%, avoiding the white label circle. A single water droplet falls from the top and lands in the pool with a ring ripple, **away from the pouch**. |
   | 4.3–5.0 s | A real-scale palm frond (out of focus, dark against the sun) sweeps R→L across the lens. Full cover at f953–959. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–4.3 s | **Arc / orbit right** around the pedestal, about 12° total, constant, moving from frame 1. Slight push of 3%. The horizon stays level. |
   | 4.3–5.0 s | Arc continues; frond wipe. |

10. **Lens:** 50 mm, T2.8.
11. **Lighting:** hard warm sun 4300 K from upper camera-left (consistent key side), through palm
    fronds (moving gobo). Warm bounce from the travertine. Bright, sunny, high-key but not
    blown. Pool caustics.
12. **Environment:**
    - Warm cream plaster wall.
    - Sand travertine pedestal standing in a shallow, glass-clear pool.
    - Moving palm-leaf shadows. This echoes the pink palm fronds printed on the pouch, so it
      belongs to the pack's own world.
    - Pale pink tropical flower petals soft at a far edge (the reference's mood), not
      identifiable as ingredients.
13. **Product:** center (2250, 1000), height 1150 px with packshots, ≤ 900 px fallback.
    Front-on, yaw ±6°.
14. **Model action:** none.
15. **Physics / VFX:**
    - Caustics follow the water.
    - Droplet ring ripple only; no splash on the product.
    - The pouch casts a soft shadow onto the pedestal that shifts with the arc.
    - Water reflection of the pouch: 15%, wobbly, from the pool.
16. **Transition IN:** golden bloom from Scene 6.
17. **Transition OUT:** palm-frond foreground wipe R→L. Scene 8 opens on the frond's dark
    trailing edge exiting left.
18. **Still prompt:**

```
Photorealistic premium sunscreen advertising set, 16:9 horizontal, bright warm daylight. A smooth
sand-coloured travertine pedestal rises from a shallow, glass-clear water pool in the centre-right
of the frame; the pedestal top is empty. Behind it a warm cream plaster wall. Hard warm sunlight
from the upper left passes through unseen palm fronds, casting crisp moving-looking palm leaf
shadows across the wall and pedestal. Shimmering water caustics dance on the pedestal base and
lower wall. Soft pale pink tropical petals blurred at the far left edge. 50mm lens, shallow depth
of field. Sunny, fresh, golden, premium, uncluttered. No objects on the pedestal, no text.
```

19. **Image-to-video prompt:**

```
Begin from the supplied sunlit image of an empty travertine pedestal in a shallow clear pool and
keep its lighting and colours. The camera is already moving on the first frame: a smooth, slow
orbit to the right around the pedestal of about twelve degrees over the whole shot, with a very
slight push-in, horizon perfectly level, gimbal-stable. 0.0-2.5 s: palm-leaf shadows on the wall
sway gently back and forth in a light breeze; water caustics ripple continuously across the
pedestal base and wall. 2.5-4.3 s: a single water droplet falls from above into the pool to the
left of the pedestal and makes a small expanding ring ripple; caustics react. 4.3-5.0 s: a dark,
out-of-focus palm frond sweeps quickly across the lens from right to left, covering the frame.
The pedestal top stays empty throughout. No people, no text, no flicker, no cut.
```

20. **Negative prompt:**
```
[Global negative 2.8], object on pedestal, bottle, beach, ocean, sand dunes, people, swimwear,
lens flare starbursts, overexposed white sky, heavy splash, fountain, rain, orange cast on wall
```
21. **Product preservation:**
    - The plate is on a pouch card with a gentle bulge. The holographic seal and the iridescent
      `ULTRAFRESH` stay exactly as photographed.
    - **No water touches the pouch.**
    - The glint avoids the white label circle.
    - Typography is never placed over the pack.
22. **Typography:** `SPF 50 PA++++` at the left (x 400, y 1000), Montserrat 800, 160 px, white
    with a 10% warm shadow for legibility. In at 1.0 s, out at 4.0 s.
23. **AI failure risks and correction:**
    - **Risk:** the orbit reveals a "back" of the pedestal that morphs. **Fix:** reduce the arc to
      6°, or use a lateral truck instead.
    - **Risk:** palm shadows pulse unnaturally. **Fix:** generate with shadows static and animate
      a gobo matte in comp.
    - **Risk:** the frond wipe doesn't happen or looks like a blob. **Fix:** do it in comp with a
      real frond plate on a black background.

---

### SCENE 8 — HAIR BEAUTY (JAPANESE-INSPIRED)

1. **Scene:** 8
2. **Timecode:** 00:32.00 – 00:37.00 (f960–1109)
3. **Duration:** 5.0 s / 150 frames
4. **References:** PM-02b Dr.Althea tube, standing on a vanity ledge in the foreground.
   - Integrity: it's a face cream, so it's **shown as part of her vanity**, never applied to
     hair, and with no hair copy.
5. **Workflow:** **Generated still → image-to-video** (model with an empty foreground ledge),
   then **product compositing** onto the ledge with parallax.
6. **First frame (f960):** a palm-frond dark trailing edge exits left. A 3/4-profile medium shot
   of the model at the right of center by a window-lit cream wall. Her right hand is raised at
   the hairline, about to run through her hair. Foreground left: a soft travertine vanity ledge
   with PM-02b standing (soft focus, 6 px blur).
7. **End frame (f1109):** mid-whip-pan right. Horizontal motion blur streaks. The model is
   smeared toward the left of frame.
8. **Subject movement:**

   | Time | Model / product |
   |---|---|
   | 0.0–0.5 s | Her fingers are already entering her hair at the temple. |
   | 0.5–2.5 s | She runs her right hand slowly back through long, healthy dark hair from temple to behind the ear. Strands separate between her fingers and fall back naturally in individual strands with weight. Her eyes lower softly, then lift. |
   | 2.5–3.5 s | Her hand releases. The hair settles with a slight bounce. She turns her face 10° toward camera with a calm, closed-mouth smile. |
   | 3.5–4.2 s | Rack focus to the PM-02b tube in the foreground (plate blur 6 → 0 px; the AI plate's ledge sharpens). The model goes soft. |
   | 4.2–5.0 s | Whip pan right begins at 4.5 s. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–3.5 s | **Lateral truck left → right**, slow and constant, 6% of frame width, moving from frame 1. The foreground tube moves faster than the model (parallax). |
   | 3.5–4.5 s | Truck continues; rack focus to the foreground. |
   | 4.5–5.0 s | **Whip pan right**, accelerating to heavy horizontal motion blur by f1109. |

10. **Lens:** 50 mm, f/2.8.
11. **Lighting:**
    - Soft window light from camera-left (key side consistent).
    - A warm hair rim from back-right to show strand separation and shine, never plastic-glossy.
    - 5000 K neutral-warm.
12. **Environment:** a calm minimal Japanese-inspired interior: warm cream plaster wall, pale
    oak, a sheer linen curtain softly lit. Travertine vanity ledge in the foreground left. No
    other cosmetics.
13. **Product:** tube center (900, 1500), height 860 px. Vertical, front-on, yaw ±4°. Partly
    soft until the rack.
14. **Model action:** adult Japanese-inspired woman, about 30, natural features. Long straight
    dark-brown/black hair with healthy shine and visible individual strands and flyaways. Minimal
    makeup (clean skin, soft brows, sheer coral lips). Cream silk blouse. The hand action is
    relaxed and slow: one hand, five fingers.
15. **Physics / VFX:** hair has weight, strands clump realistically in small groups, falls under
    gravity, slight bounce, no floating or underwater hair.
16. **Transition IN:** Scene 7's palm-frond wipe exit.
17. **Transition OUT:** whip pan right, with matching blur direction into Scene 9's first 4
    frames (comp horizontal blur 120 px → 0).
18. **Still prompt:**

```
Photorealistic premium hair and beauty campaign photograph, 16:9 horizontal. An adult Japanese
woman about 30 years old, three-quarter profile, medium shot from the waist up, positioned right
of centre in a calm minimal interior with a warm cream plaster wall and a softly lit sheer linen
curtain. Long, straight, healthy dark brown-black hair falling past her shoulders with natural
shine and clearly visible individual strands and a few flyaways. Her right hand is raised at her
temple with fingers just entering her hair. Natural skin with visible texture and pores, minimal
makeup, soft natural brows, sheer coral lips, calm expression with eyes slightly lowered. Cream
silk blouse. In the left foreground, a pale travertine vanity ledge runs across the lower-left of
the frame, slightly out of focus; its surface is empty. Soft window light from the left, a warm
rim light from the back right making the hair strands glow. 50mm lens at f/2.8, focus on her
eyes. True-to-life colour, real photography.
```

19. **Image-to-video prompt:**

```
Begin from the supplied photograph and keep the woman's identity, face, hair colour and wardrobe
unchanged. The camera is already moving on the first frame: a slow, smooth lateral truck from
left to right with natural parallax, the foreground stone ledge sliding faster than the woman.
0.0-0.5 s: her fingers enter her hair at the temple. 0.5-2.5 s: she slowly runs her right hand
back through her long dark hair from the temple to behind her ear; individual strands separate
between her fingers and fall back with natural weight; her eyes lower softly and then lift.
2.5-3.5 s: her hand leaves her hair, the hair settles with a slight bounce, and she turns her face
a little toward the camera with a calm closed-mouth smile. 3.5-4.5 s: the focus racks smoothly to
the empty stone ledge in the left foreground while she softens into blur. 4.5-5.0 s: the camera
whips quickly to the right with strong horizontal motion blur. Five natural fingers, real hair
physics, no cut, no flicker.
```

20. **Negative prompt:**
```
[Global negative 2.8], wig-like hair, helmet hair, plastic shine, hair clumping into ribbons,
hair floating, wind machine, extra hand, six fingers, hand merging into hair, objects on ledge,
bottles, cosmetics, mirror, heavy makeup, anime eyes
```
21. **Product preservation:**
    - The tube plate is tracked to the ledge.
    - Parallax is driven from the solved truck.
    - The blur keyframes match the AI rack.
    - Contact shadow and a 10% ledge reflection.
    - **No hair, hand or effect crosses the plate.**
    - During the whip the plate gets the same directional blur as the plate it sits on
      (allowed: lens pass).
22. **AI failure risks:**
    - Hair turns into a mass or "melts" around the fingers.
    - Extra fingers appear during the stroke.
    - The rack doesn't happen.
    - The whip produces a scene morph instead of blur.
23. **Correction:**
    - Hair failure: shorten the stroke (temple to ear only, 1.5 s), use a locked camera and add
      the truck in comp (2D parallax on separated layers).
    - Rack failure: do the rack in comp with a depth matte.
    - Whip: always do it in comp. Generate a clean 4.5 s and add a directional blur and offset
      ramp.
    - If hands keep failing: re-stage with her hand already in her hair and the motion only
      sliding back.

---

### SCENE 9 — PINK COLLAGEN *(A Bonne slot · interim PM-03 Manee)*

1. **Scene:** 9
2. **Timecode:** 00:37.00 – 00:42.00 (f1110–1259)
3. **Duration:** 5.0 s / 150 frames
4. **References:** PM-03 Manee pouch as the interim. Swap it for the A Bonne Pink Collagen bottle
   plate once that reference exists; the storyboard's "bottle rises" timing is kept.
5. **Workflow:** **Generated still → image-to-video** for the glossy studio and liquid wave (no
   product), then **product compositing**. The rise is a comp keyframe; that's the safest way to
   get a fast rise with no morphing.
6. **First frame (f1110):** the whip-pan blur from Scene 8 resolving (120 px → 0 over 4 frames)
   into a glossy hot-pink studio. A low sculpted pink liquid wave lies behind at the bottom
   third. **The pouch is below frame (not visible).**
7. **End frame (f1259):** a pink liquid wave crest surges toward the lens and covers the frame
   (glossy, translucent at the edges). The pouch is visible through the crest's thin edge at the
   hero position until f1250.
8. **Subject movement:**

   | Time | Product / liquid |
   |---|---|
   | 0.0–0.15 s | Blur resolves. Liquid already moving. |
   | 0.15–0.7 s | **Pouch rises rapidly** from below frame (center y 2600 → 1180, ≈ 85 px/frame peak), with motion blur ≤ 30 px (allowed, product not yet at rest). |
   | 0.7–1.5 s | **Decelerates** (strong ease-out) to y 1080, a 1.5% overshoot up, and settles back by 1.5 s. A tiny yaw wobble of ±3° decays. |
   | 1.5–4.0 s | Elegant float: bob amplitude 10 px, period 3 s, yaw 0° → +4°. Behind it, the liquid wave rises into a tall curling crest, slow viscous motion, with light running along its glossy surface. |
   | 4.0–5.0 s | The wave crest folds forward toward the lens and passes in front of the pouch and over the camera. Full pink cover at f1252–1259. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–0.7 s | **Tilt up**, following the rise, slight and lagging the pouch, then settling: catch-up energy. Moving from frame 1. |
   | 0.7–4.0 s | Slow push-in, 4%. Low angle (camera at 60% of the pouch's height). |
   | 4.0–5.0 s | Push continues as the wave covers. |

10. **Lens:** 85 mm, T2.8.
11. **Lighting:**
    - High-gloss studio: a large strip softbox from the upper-left gives long specular streaks on
      the liquid.
    - A rim light from the right; a magenta-pink bounce.
    - The pouch front is kept evenly lit with a neutral white key so the pack colors stay true.
12. **Environment:** glossy hot-pink seamless studio (energetic, saturated). A mirror-gloss pink
    floor. An abstract viscous pink liquid (glossy, like thick syrup or gel) forming a sculpted
    wave behind. Abstract only, not depicting the product's contents.
13. **Product:** rest center (1920, 1080), height 1100 px with packshots, ≤ 900 px fallback.
14. **Model action:** none.
15. **Physics / VFX:**
    - The liquid is viscous, with long slow folds, a few large drops thrown at the crest top
      (slow) and no foam.
    - Product reflection on the floor: 15%.
    - The wave occludes the pouch only in its last 0.8 s, with clean roto edges; it **never
      merges with the pack**.
16. **Transition IN:** whip-pan blur continuation.
17. **Transition OUT:** the liquid crest covers the lens. Scene 10 opens with pink liquid
    draining off the lens downward, revealing the pink drink glass (a color match).
18. **Still prompt:**

```
Photorealistic high-energy beauty advertising studio, 16:9 horizontal. A glossy, saturated
hot-pink seamless studio with a mirror-gloss pink floor. Behind the centre of frame, low in the
bottom third, a sculpted wave of thick glossy pink liquid, like a viscous gel, rising and
beginning to curl, with long bright specular highlights from a large strip softbox at the upper
left and a crisp rim light from the right. The centre of the frame above the liquid is open empty
space. 85mm lens, low camera angle, shallow depth of field. Bold, juicy, premium, clean. No
objects, no text.
```

19. **Image-to-video prompt:**

```
Begin from the supplied image of a glossy hot-pink studio with a low sculpted wave of thick pink
liquid and keep its colours. The camera is already moving on the first frame: a short quick tilt
upward that settles by 0.7 seconds, then a slow steady push-in from a low angle. 0.0-1.5 s: the
thick pink liquid behind the centre begins to rise and roll, viscous and glossy, with light
sliding along its surface. 1.5-4.0 s: the liquid builds into a tall, elegant curling crest behind
the centre of frame, moving slowly like thick syrup, throwing off only a few large slow drops at
its top. 4.0-5.0 s: the crest folds forward and surges toward the camera until glossy pink liquid
covers the entire lens. The centre space in front of the wave stays empty until the liquid covers
the frame. No foam, no bubbles, no objects, no cut, no flicker.
```

20. **Negative prompt:**
```
[Global negative 2.8], foam, bubbles, water spray, transparent water, milk, paint splatter
chaos, multiple waves, object in centre, bottle, fruit, strawberries, flicker, colour shift to
red or purple
```
21. **Product preservation:**
    - The pouch is a comp plate; its rise is a keyframed transform, not generated.
    - Blur ≤ 30 px during the rise, ≤ 6 px at rest.
    - The glitter top band is never "re-sparkled" by effects.
    - The wave occlusion uses roto of the AI liquid over the plate. The label stays fully visible
      until 4.0 s.
22. **AI failure risks:**
    - The liquid turns watery or splashy.
    - The crest doesn't come toward the lens.
    - Color pumps.
    - An object appears in the center.
23. **Correction:**
    - Split it: (a) liquid wave clip 0–4 s; (b) a separate "liquid covers lens" clip (pink
      liquid pouring over glass in front of the camera) for 4–5 s, joined at peak motion.
    - If the liquid still splashes, use a CG fluid (a simple Houdini/Blender viscous sheet).
    - Legal slot if required: lower-left, 1.5–4.0 s (2.3).

---

### SCENE 10 — COLLAGEN LIFESTYLE (FILIPINA)

1. **Scene:** 10
2. **Timecode:** 00:42.00 – 00:47.00 (f1260–1409)
3. **Duration:** 5.0 s / 150 frames
4. **References:** PM-03 Manee pouch, standing on the table next to the glass.
5. **Workflow:** **Generated still → image-to-video** (woman and glass, empty table spot), then
   **product compositing** of the pouch with dolly parallax.
6. **First frame (f1260):** pink liquid draining down off the "lens" (comp: the Scene 9 liquid
   plate retimed, sliding down and out) reveals the shot.
   - A bright morning interior by a window with sheer curtains.
   - An adult Filipina woman seated at a pale wooden table, mid-frame right, both hands around a
     tall glass of pink iced drink with a glass straw.
   - The pouch stands on the table at the left of the glass, in the foreground-left.
7. **End frame (f1409):** the camera has dollied R→L. A soft sheer white curtain in the
   foreground passes across the lens, covering the frame white (wipe).
8. **Subject movement:**

   | Time | Model / product |
   |---|---|
   | 0.0–0.4 s | The liquid drain reveal. She's already lifting the glass slightly. |
   | 0.4–1.8 s | She brings the glass toward her lips and takes a small sip through the glass straw: lips lightly closed on the straw, eyes relaxed. |
   | 1.8–3.0 s | She lowers the glass to the table beside the pouch. Ice shifts and clinks visually; condensation glistens. |
   | 3.0–4.2 s | She looks out of the window, then back toward the room with a genuine soft smile (not at the camera: candid lifestyle). The pouch is stationary on the table. |
   | 4.2–5.0 s | The curtain wipe in the foreground. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–4.2 s | **Slow lateral dolly right → left** (screen content moves L→R), 7% of frame width, constant, moving from frame 1. Pouch (foreground) parallax is faster than her. |
   | 4.2–5.0 s | Dolly continues behind the sheer curtain; it wipes R→L. |

10. **Lens:** 50 mm, f/2.8.
11. **Lighting:** soft warm morning daylight 4800 K from the window at camera-left (key side
    consistent). Bright, airy. Gentle backlight glow through the curtain. A pink transmission
    glow through the drink onto the table.
12. **Environment:**
    - A bright minimal modern Filipino home: white walls, pale wood table, a soft pink-flowered
      garden blurred outside the window, a linen chair throw.
    - Not a copy of the reference photo's set.
    - **No fruit props** (they'd imply ingredients).
13. **Product:** pouch center (1150, 1350), height 950 px with packshots, ≤ 900 px fallback.
    Front-on, yaw 0–6°. On the table plane, with a contact shadow and a slight warm table
    reflection.
14. **Model action:** adult Filipina woman, about 32: morena/warm medium skin, natural features,
    shoulder-length dark wavy hair, fresh minimal makeup, white linen shirt. Relaxed, healthy,
    real. Hands: five natural fingers, short neutral nails, around the glass only.
15. **Physics / VFX:**
    - The drink level drops by a believable 1–2 mm after the sip, or not at all (never
      visibly large).
    - Ice moves with the glass tilt.
    - The curtain moves gently in a breeze.
16. **Transition IN:** liquid drain from Scene 9 (pink to pink drink, a color match).
17. **Transition OUT:** sheer white curtain foreground wipe R→L, to Scene 11's white space.
18. **Still prompt:**

```
Photorealistic lifestyle beauty photograph, 16:9 horizontal, bright warm morning interior next
to a large window with sheer white curtains and a softly blurred garden with pink flowers outside.
An adult Filipina woman about 32 years old with warm medium morena skin, natural features,
shoulder-length dark wavy hair, fresh minimal makeup, wearing a white linen shirt, sits at a pale
wooden table right of centre. Both hands gently hold a tall clear glass of pink iced drink with
ice cubes, condensation and a glass straw, just above the table. On the table to the left of the
glass, in the foreground left, there is an empty clear space of tabletop. Soft warm sunlight from
the window at the left, airy and bright, pink light glowing through the drink onto the table.
50mm lens at f/2.8, real skin texture with visible pores, natural hands with five fingers, candid
and relaxed expression. No fruit, no other products, no text.
```

19. **Image-to-video prompt:**

```
Begin from the supplied photograph and keep the woman's identity, skin tone, hair and clothing
exactly the same. The camera is already moving on the first frame: a slow, smooth lateral dolly
moving from right to left, with natural parallax so the tabletop in the foreground slides faster
than the woman and the window behind her slides slowest. 0.0-1.8 s: she lifts the glass and takes
one small natural sip through the glass straw, eyes relaxed. 1.8-3.0 s: she lowers the glass back
onto the table; the ice shifts inside and the condensation glistens. 3.0-4.2 s: she looks toward
the window, then turns back with a genuine soft smile, not looking at the camera; the curtains
move gently in a breeze. 4.2-5.0 s: the camera passes behind a sheer white curtain in the
foreground that drifts across the lens from right to left and fills the frame with soft white.
The empty tabletop area in the left foreground stays empty. No cut, no flicker.
```

20. **Negative prompt:**
```
[Global negative 2.8], fruit, strawberries, grapes, mint, bowl, other drinks, phone, laptop,
gulping, liquid spilling, straw bending, extra glass, objects on table, lightened skin, pale
skin, Western features replacing identity, sexualised pose
```
21. **Product preservation:**
    - The pouch is a tracked plate on the table plane, parallax from the camera solve, with a
      soft contact shadow toward camera-right (light from the left).
    - **The glass never overlaps the pouch.** Keep 150 px of air between them.
    - Legal line in the slot if required (2.3).
22. **AI failure risks:**
    - The straw/mouth interaction deforms the lips or straw.
    - Her hands merge with the glass.
    - The drink level jumps.
    - Identity drifts during the turn.
    - Skin is lightened by the model.
23. **Correction:**
    - If the sip fails, remove it: she lifts the glass, smiles toward the window and sets it down
      (no mouth contact).
    - If identity drifts, shorten to 3.5 s and slow the dolly.
    - Skin tone: grade-lock to the still; reject any take with lightening.
    - Curtain wipe: do it in comp with a real sheer-fabric plate if the AI doesn't deliver.

---

### SCENE 11 — PRODUCT TUNNEL

1. **Scene:** 11
2. **Timecode:** 00:47.00 – 00:52.00 (f1410–1559)
3. **Duration:** 5.0 s / 150 frames
4. **References:** all five masters. Each product appears twice, as identical instances of the
   same exact plate: PM-01, PM-02a, PM-02b, PM-03, PM-04, PM-05, 12 instances in all.
5. **Workflow:** **Product compositing in 3D** (primary): plates as cards or proxies in a CG
   white space with a camera flight. Optional **fully generated environment** for the space,
   with no products.
6. **First frame (f1410):** the sheer curtain wipe exits left. A vast clean white space with a
   soft-gradient floor and ceiling glow. The products are arranged as an implied tunnel (left
   wall, right wall, upper, lower) at depths of 2–30 m. The camera is already flying forward.
7. **End frame (f1559):** the PM-03 instance passes R→L across the lens. Full magenta cover at
   f1554–1559, then a hard cut to Scene 12a.
8. **Subject movement:** every product does an independent slow float (bob 1%, period 2.5–3.5 s,
   phases offset) and small yaw within its Part 1 limit. **Nothing spins.** The tunnel
   "breathes": products drift outward 1–2% as the camera nears.

   | Time | Event |
   |---|---|
   | 0.0–1.2 s | Passing ring 1: PM-01 (left), PM-05 (upper right), PM-02a (lower right). |
   | 1.2–2.4 s | Ring 2: PM-04 (right), PM-02b (upper left), PM-03 (lower left). |
   | 2.4–3.6 s | Ring 3 (second instances): PM-05 (left), PM-01 (right), PM-04 (upper). |
   | 3.6–4.6 s | Ring 4: PM-02a (left), PM-02b (right). PM-03 #2 approaches center-right, close. |
   | 4.6–5.0 s | PM-03 #2 crosses the lens R→L (≤ 2 m from camera), defocused. Full cover f1554. |

   Each passing product exits the frame edge as a natural **foreground wipe**.
9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–1.5 s | Forward at 2 m/s (scene scale). Gentle S-curve left. |
   | 1.5–3.0 s | Accelerate to 3 m/s. S-curve right. Roll ≤ ±3°. |
   | 3.0–5.0 s | Hold 3.2 m/s. Slight rise. Aim at PM-03 #2. |

   Increasing energy without chaos: one path, smooth curvature, no whip.
10. **Lens:** 35 mm, T2.8, focus following the nearest ring.
11. **Lighting:** a clean bright white space with a large overhead soft source biased to the
    upper-left (key), a soft rim on all plates from behind, and a faint 10% floor reflection.
    Neutral 5600 K.
12. **Environment:** an infinite white space with a very soft horizon gradient. The plates carry
    all the color.
13. **Product scale:** plates pass the camera big, but at in-focus moments each stays ≤ native
    plate resolution. Above that they're blurred (≥ 12 px) and moving (lens-pass rule).
14. **Model action:** none.
15. **Physics / VFX:** speed lines are **not** used. Motion blur is physically correct (180°).
    Light dust specks streak slightly with speed.
16. **Transition IN:** curtain wipe from Scene 10.
17. **Transition OUT:** PM-03 lens pass, then a hard cut to the Scene 12a portrait (pink world) at
    full cover.
18. **Still prompt** (AI environment route only):

```
Photorealistic vast clean white architectural void for a beauty commercial, 16:9 horizontal.
Seamless white floor curving into a seamless white ceiling far away, with a very soft luminous
horizon glow in the distance at the centre. Large overhead soft light biased to the upper left,
faint glossy reflection on the floor. Deep perspective, empty, airy, pure, premium. 35mm lens.
No objects, no columns, no text.
```

19. **Image-to-video prompt** (AI environment route only):

```
Begin from the supplied image of a vast clean white void. The camera is already moving on the
first frame: a smooth forward flight through the empty space, gently curving left during the
first 1.5 seconds, then accelerating and curving right with a slight roll of no more than three
degrees, then flying straight and slightly rising for the final two seconds. The horizon glow
grows nearer with correct perspective and the floor reflection slides naturally. The space
stays completely empty. No objects, no flicker, no cut.
```

20. **Negative prompt:**
```
[Global negative 2.8], columns, arches, doors, windows, furniture, coloured lights, neon,
grid lines, sci-fi corridor, tunnel walls, objects floating
```
21. **Product preservation:**
    - All instances are exact plates, never mirrored, never recolored.
    - Use the same front orientation (the camera reveals no back sides: keep every plate within
      its yaw limit relative to the camera ray; rotate cards to face the camera path).
    - Duplicates are identical copies (allowed: no variants are invented).
22. **AI failure risks:** mainly comp risks.
    - Plates look like flat cards (fix with yaw-to-camera plus shadows/AO).
    - Too many products read as cluttered.
    - Stroboscopic passes.
23. **Correction:**
    - If cluttered, drop ring 3 (8 instances).
    - If passes strobe, raise blur or slow to 2.5 m/s.
    - If it feels like a screensaver, add one stronger hero pause: the camera slows briefly at
      ring 2 (0.3 s ease) then accelerates.

---

### SCENE 12 — BEAUTY MONTAGE (3 PORTRAITS)

1. **Scene:** 12 (12a / 12b / 12c)
2. **Timecode:**
   - 12a: 00:52.00–00:53.33 (f1560–1599)
   - 12b: 00:53.33–00:54.67 (f1600–1639)
   - 12c: 00:54.67–00:56.00 (f1640–1679)
3. **Duration:** 4.0 s total; 40 frames (1.33 s) each.
4. **References:**
   - 12a: PM-01 Anua jar (open, pads visible)
   - 12b: PM-05 Hikari pouch
   - 12c: PM-02b Dr.Althea tube, plus a small dab of white cream (the PM-02 texture is
     documented)
5. **Workflow:** 3 × **generated still → image-to-video** (generate 3 s each, use the best
   1.33 s), then **product compositing** over proxies.
6. **First frames:** the **eye-line match** across all three:
   - Eyes are centered at x ≈ 2350, y ≈ 830 in every portrait.
   - The product sits in the left half at a similar position (center ≈ 1350, 1250), so the hard
     cuts feel like one rhythm.
   - 12a opens on a hard cut from the magenta lens cover.
7. **End frames:**
   - 12a: the jar is slightly closer. Her smile.
   - 12b: a sun glint crossing the pouch film.
   - 12c: her finger leaving her cheekbone; the tube is at (1350, 1250), matching Scene 13's
     PM-02b position (match cut).
8. **Subject movement:**

   | Portrait | 0–0.4 s | 0.4–1.33 s |
   |---|---|---|
   | **12a — Korean-inspired** (blush-pink backdrop) | Already turning her head from 3/4 to frontal. | Holds the open jar at chin height in her left hand, offered slightly toward the lens. Blink and smile. |
   | **12b — Japanese-inspired** (warm gold backdrop, sun) | Pouch held up beside her cheek in her right hand; her chin lifts slightly into the sun. | She tilts the pouch 6° toward the light (comp plate yaw), squinting gently, laughing softly with her mouth closed. |
   | **12c — Filipina** (warm sand backdrop) | Her ring finger touches a small dab of white cream to her upper cheekbone. | She lightly taps once, lowers her hand, and holds the tube at collarbone level in her other hand. Calm, confident gaze to the lens. |

9. **Camera:**
   - 12a: quick push-in, 5%, from frame 1.
   - 12b: lateral slide left, 4%.
   - 12c: slow tilt up, 3%.

   A different move in each, so the montage has rhythm.
10. **Lens:** 85 mm, f/2.2, all three.
11. **Lighting:**
    - 12a: soft beauty dish from upper-left, pink bounce.
    - 12b: hard warm sun from upper-left plus a gold bounce.
    - 12c: soft window key from the left, warm.

    The key side is the same across all three.
12. **Environment:** seamless colored backdrops: blush pink #F4C9CF-ish (12a), warm gold (12b),
    warm sand (12c). Each echoes its product's world from Scenes 3, 7 and 4.
13. **Product scale:** jar width ≈ 900 px; pouch height ≈ 1000 px; tube height ≈ 900 px. All
    front-on.
14. **Model action:** see item 8.
    - Korean-inspired: glass-skin, MLBB lips, sleek hair, ivory top.
    - Japanese-inspired: clean skin, soft brows, coral lips, dark bob, white tee.
    - Filipina: morena skin, dewy natural makeup, dark long wavy hair, cream camisole under an
      open shirt (modest).

    All adults about 25–35, **different from the Scene 2, 8 and 10 talent**.
15. **Physics / VFX:**
    - 12b sun glint: an additive sweep along the pouch film, off the label.
    - 12c cream dab: a small real white dab (AI-generated on skin), static, glossy, with no
      before/after effect on the skin.
16. **Transition IN:** hard cut at the magenta full cover (Scene 11).
17. **Transition OUT:** match cut on PM-02b, 12c → Scene 13 (same screen position and scale).
    Cuts between portraits are hard cuts on the beat, eye-line matched. **No white flashes**
    (photosensitivity and store comfort).
18. **Still prompts:**

    **12a:**
```
Photorealistic premium Korean beauty portrait, 16:9 horizontal. An adult Korean woman about 26
years old, close-up from the shoulders up, positioned on the right half of frame with her eyes at
about 61 percent across and 38 percent down. Head turned three-quarters toward the left, about to
face the camera. Dewy glass-skin with visible pores and fine vellus hair, softly groomed straight
brows, rosy tinted lips, sleek dark hair. Ivory top. Her left hand holds a plain glossy candy-pink
squat open jar with a paler pink rim and a domed stack of translucent pink half-moon pads, at chin
height on the left side of frame, without any text or label. Seamless soft blush-pink backdrop.
Soft beauty-dish key from the upper left, pink bounce fill. 85mm f/2.2, focus on her eyes. Real
commercial photography, natural hand with five fingers.
```

    **12b:**
```
Photorealistic premium Japanese beauty portrait, 16:9 horizontal. An adult Japanese woman about
29 years old, close-up from the shoulders up, positioned right of centre with her eyes at about
61 percent across and 38 percent down, chin slightly lifted into warm sunlight. Clean natural skin
with visible texture, soft natural brows, sheer coral lips, a sleek dark chin-length bob, white
t-shirt. Her right hand holds up, beside her cheek on the left side of frame, a plain flat
flexible pouch with a scalloped sun-shaped outline and a small yellow spout at the top, coloured
in a yellow-to-orange-to-pink gradient, with no text, no label. Seamless warm golden backdrop.
Hard warm sunlight from the upper left, golden bounce. 85mm f/2.2, focus on her eyes, gentle
squint, natural hand with five fingers.
```

    **12c:**
```
Photorealistic premium beauty portrait, 16:9 horizontal. An adult Filipina woman about 30 years
old with warm medium morena skin, close-up from the chest up, positioned right of centre with her
eyes at about 61 percent across and 38 percent down. Dewy natural makeup, visible pores, dark
long wavy hair, cream camisole under an open linen shirt. Her right ring finger touches a small
glossy dab of thick white cream on her upper cheekbone. Her left hand holds a plain white cosmetic
tube upright with a white cap at the bottom, at collarbone level on the left side of frame, no
text, no label. Seamless warm sand-coloured backdrop. Soft window key from the left, warm. 85mm
f/2.2, focus on her eyes, calm confident gaze into the lens, natural hands with five fingers.
```

19. **Image-to-video prompts:**

    **12a:**
```
Begin from the supplied portrait and keep her identity unchanged. The camera is already pushing
in quickly but smoothly on the first frame. 0.0-0.4 s: she turns her head from three-quarter view
to face the lens. 0.4-1.5 s: she offers the pink jar slightly toward the camera at chin height,
blinks once, and smiles softly with her mouth closed. The jar stays plain with no text. No cut,
no flicker, natural fingers.
```

    **12b:**
```
Begin from the supplied portrait and keep her identity unchanged. The camera is already sliding
slowly to the left on the first frame. 0.0-0.4 s: she lifts her chin slightly into the warm
sunlight while holding the pouch beside her cheek. 0.4-1.5 s: she tilts the pouch a little toward
the light and gives a gentle closed-mouth laugh with a soft squint; sunlight glints across the
pouch. The pouch stays plain with no text and keeps its shape. No cut, no flicker, natural fingers.
```

    **12c:**
```
Begin from the supplied portrait and keep her identity and skin tone unchanged. The camera is
already tilting up very slowly on the first frame. 0.0-0.4 s: her ring finger rests on the small
dab of white cream on her cheekbone and taps once lightly. 0.4-1.5 s: she lowers that hand out of
frame and holds the white tube steady at collarbone level, gazing calmly into the lens. The cream
dab stays the same size; her skin does not change. The tube stays plain with no text. No cut, no
flicker, natural fingers.
```

20. **Negative prompt** (all three):
```
[Global negative 2.8 minus "jar, pouch, tube"], text on product, logo, label, product changing
shape, second product, applying cream with whole hand, smearing, skin whitening, skin changing
tone, before and after, extra fingers, hand merging with face, open-mouth laugh, teeth, heavy
contour, sexualised pose
```
21. **Product preservation:**
    - Each proxy is replaced by its exact plate (planar or cylinder track) with finger roto only
      over the edges, never over the label.
    - Yaw within limits.
    - **The cream dab is not linked to any product claim** (no copy).
22. **AI failure risks:**
    - At 1.33 s, any warm-up drift is visible, so frames 0–10 of each generation may be unstable.
    - Pouch proxies crumple.
    - The dab grows or spreads.
    - Eye positions don't match across the three.
23. **Correction:**
    - Generate 3 s and cut the most stable 40 frames (skip the first 10 generated frames).
    - Re-frame in comp (scale/position ≤ 6%) to align the eye line.
    - If a proxy crumples, keep the hand static and only the camera moving.
    - If a dab spreads, choose frames before the spread, or roto a still dab from frame 1 and
      track it.

---

### SCENE 13 — FINAL HERO / LOOP

1. **Scene:** 13
2. **Timecode:** 00:56.00 – 01:00.00 (f1680–1799)
3. **Duration:** 4.0 s / 120 frames
4. **References:** all five (PM-01, PM-02a + b, PM-03, PM-04, PM-05), plus the `LOOP_BRIDGE`
   precomp (2.4).
5. **Workflow:** **Product compositing** in a 3D studio (same build as Scene 1, with a white →
   blush-pink gradient), plus the loop bridge. Optional **fully generated environment** plate.
6. **First frame (f1680):** match cut from 12c: PM-02b at (1350, 1250). An elegant floating
   composition:

   | Product | Position | Depth |
   |---|---|---|
   | PM-04 | back-left (900, 900) | far |
   | PM-02a | left (1150, 1150) | mid |
   | PM-02b | (1350, 1250) | near |
   | PM-03 | back-center-right (2300, 950) | far |
   | PM-05 | upper-right (3000, 800) | mid |
   | PM-01 | front-right (2650, 1350) | nearest, hero |

   Glossy floor, white to blush gradient.
7. **End frame (f1799):** 100% defocused Anua pink, sliding R→L (loop bridge full cover). This is
   identical in construction to frame 0.
8. **Subject movement:**

   | Time | Products |
   |---|---|
   | 0.0–1.6 s (f1680–1727) | Every product floats (bob 1%, offset phases). Tiny yaw within limits. The composition holds, reading as **the campaign end frame**. |
   | 1.6–3.0 s (f1728–1769) | The products begin drifting **outward toward the frame edges**, radially from the center: 2–5 px/frame accelerating, ease-in. PM-04 drifts left, PM-05 up-right, PM-03 right, PM-02a/b left-down. PM-01 starts moving toward the camera and outward-right. |
   | 3.0–3.37 s (f1770–1780) | The other products are mostly out of frame. PM-01 approaches the lens fast (real plate ≤ native resolution, label still legible until about f1775, defocus increasing). |
   | 3.37–4.0 s (f1781–1799) | `LOOP_BRIDGE`: CG pink stand-in. Its left edge sweeps R→L to x = 0 by f1797 at 480 px/frame. Full cover f1797–1799, sliding R→L. |

9. **Camera:**

   | Time | Move |
   |---|---|
   | 0.0–2.4 s | **Slow pull-back** (dolly out 12%), constant, from frame 1. Slight boom up. |
   | 2.4–4.0 s | Pull-back continues. The radial product drift outward plus PM-01 coming at camera creates the "explosion-in-slow-motion" read. |

10. **Lens:** 35 mm, T2.8 (same as Scene 1; the loop needs a matching optical feel).
11. **Lighting:** same as Scene 1 (overhead soft, upper-left biased, rims, floor reflection), plus
    a soft blush-pink bounce from below-right.
12. **Environment:** Scene 1's white studio graded toward a white → blush gradient, so the end
    sits between white (Scene 1) and the Anua pink (bridge).
13. **Product scale (f1680):**
    - PM-01 width 1000 px
    - PM-02a height 760 px
    - PM-02b height 700 px
    - PM-03 height 640 px
    - PM-04 width 640 px
    - PM-05 height 620 px

    All within fallback limits.
14. **Model action:** none.
15. **Physics / VFX:** shadows and reflections follow every plate. The drift outward uses
    acceleration (no linear start). The bridge's motion blur matches its velocity.
16. **Transition IN:** match cut on PM-02b from 12c.
17. **Transition OUT:** `LOOP_BRIDGE` to Scene 1 frame 0 (seamless).
18. **Still prompt:** reuse Scene 1's still, with the gradient changed: *"…soft gradient from
    pure white at upper left to pale blush pink at lower right, faint glossy reflection…"* and
    *"…bokeh discs in blush pink…"*.
19. **Image-to-video prompt** (AI environment route only):

```
Begin from the supplied image of an empty white-to-blush-pink infinity-cove studio and keep its
colours. The camera is already moving on the first frame: a slow, smooth backward dolly pull-out
with a very slight upward boom, constant speed for four seconds, correct parallax on the floor
reflection and the gradient. The blush-pink bokeh discs at the edges drift slowly inward as the
camera retreats. The studio stays completely empty. No objects, no flicker, no cut.
```

20. **Negative prompt:**
```
[Global negative 2.8], objects, furniture, props, coloured walls other than white-to-blush,
visible floor seam, lens flare, fast motion, flicker
```
21. **Product preservation:**
    - The hero hold (0–1.6 s) is the most-viewed frame of the film. Every label must be exact and
      sharp (blur 0) and no plate overlaps another's label.
    - PM-01's near-lens approach uses the real plate only while it's ≤ native size; beyond that,
      the bridge's sampled-color CG takes over (2.4).
    - No AI generation touches any product.
22. **AI / comp failure risks:**
    - The loop shows a speed or hue mismatch at the join.
    - PM-01 plate pixelates on approach.
    - The drift outward reads like an explosion (too fast) or a fade (too slow).
23. **Correction:**
    - Join: sample the hue at f1799 and f0 and compare. ΔE must be < 1. Render f1790–1799 + f0–9
      as one 20-frame clip and scrub it.
    - Pixelation: start the bridge handover earlier (f1777).
    - Drift: tune so the products leave the frame between f1765 and f1780.

---

## PART 5 — ASSEMBLY, QC AND DELIVERY

### 5.1 Build order (cheapest risk first)

1. Packshot session → five plates with clean alpha, letter-for-letter QC against the references.
2. Animatic: grey boxes plus plates in the 3D studio for Scenes 1, 11, 13 and the loop bridge, at
   full timing (1800 f). Approve motion and timing before any generation spend.
3. Environment stills (Scenes 3, 4, 5, 6, 7, 9) → approve → I2V.
4. Model stills (Scenes 2, 8, 10, 12abc) → **casting approval of the stills** (skin tone,
   age, styling) → I2V.
5. Comp all scenes. Typography. Legal slots if required.
6. Grade the whole film in one pass. Same grain. Skin-tone check per human shot.

### 5.2 QC checklist per scene

| Check | Pass criterion |
|---|---|
| Product identity | Plate pixels unchanged (difference against the master plate = 0 outside lighting passes). Text readable in still frames at hero. |
| Product state | Anua always open with pads, never a lid. No invented sides. Yaw within limits. |
| Claims | Only the approved strings (2.3). No ingredient imagery. No skin change. |
| People | Adult, five fingers, no morphing over the take, skin tone constant, no lookalikes. |
| Motion | Movement from frame 1. No still > 0.5 s. No jitter or teleport. |
| Light | Key from upper-left. No flicker (check the luminance waveform). |
| Transition | Completes on the cut frame. Direction consistent (2.2). |
| Distance read | Viewed at 25% size (simulates 6 m): the product and hero idea are clear within 1 s of entering any scene. |

### 5.3 Loop QC

- Render f1740–1799 + f0–60 as one clip and play it 10× in a loop on the actual store screen.
- No hitch, hue jump or motion stall.
- **Player check:** many signage players insert a black frame or a decoder re-init at
  end-of-file. If the store player does, deliver a version with the loop pre-concatenated
  ×5 (5 min) so the hitch happens 12× less often, and ask for gapless/seamless loop mode in the
  player settings.

### 5.4 Photosensitivity and comfort

- No full-frame luminance change > 20% in under 0.33 s, except the soft blooms (12-frame ramps).
- No strobing. No more than 3 hard cuts per second (the montage is 0.75/s).

### 5.5 Deliverables

- **Master:** ProRes 422 HQ, 3840×2160, 30p, Rec.709, 1800 frames, no audio.
- **Playback:** H.265 (HEVC) 3840×2160 30p, about 60 Mbps (or H.264 High 5.1 for older
  players), plus the ×5 concatenated loop version.
- **Stills:** four hero PNGs (Scenes 3, 7, 9, 13 hero frames) for store print or the website.
- **Project archive:** product plates, AI generations (with prompts and seeds logged), comp
  project, fonts.

### 5.6 Open items for the client

1. Supply or approve references for AXIS-Y, Luxe Organix Retinol and A Bonne Pink Collagen, or
   approve the stand-ins (0.5).
2. Approve on-screen copy: `BRIGHTEN • GLOW • CARE` (Scene 3), `SPF 50 PA++++` (Scene 7),
   optional `NIGHT CARE` (Scene 5).
3. Regulatory: Brilliant Rejuv Set display permission; whether the Manee supplement notice is
   needed (0.4).
4. Book the in-store packshot session (0.3), and photograph the Anua jar closed too if a closed
   state is wanted.
5. Confirm the store player model, for the loop behavior and codec.
