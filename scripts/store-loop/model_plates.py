"""V2 human plates, cropped from the user-supplied AI beauty grid
(production/store-loop/references/model-plates-source/user-supplied-beauty-grid.webp).

Crops EXCLUDE every cosmetic product in the grid (Anua Peach 70 cream/serum, Biore UV,
Biodance mask, Skin1004 Centella, Anua Heartleaf toner) — only the models, hands, hair and
environments are used; the real uploaded product masters are composited on top in Remotion.
Each crop is enlarged 2x with Lanczos + gentle unsharp (placeholder quality — replace with
high-res generated plates when available)."""
from PIL import Image, ImageFilter

SRC = "production/store-loop/references/model-plates-source/user-supplied-beauty-grid.webp"
OUT = "public/store-loop/models/"
CROPS = {
    # name: (x0, y0, x1, y1) in the 1672x941 grid
    "A_cheek_tall": (300, 0, 618, 467),     # pink, fingertip on cheek — no jar (jar ends x≈295)
    "A_hair_wide": (140, 0, 618, 240),      # hair + face, above the jar (jar starts y≈245)
    "B_wet_face": (828, 0, 1110, 252),      # right of the serum dropper, above the peach
    "C_sun_sky": (1328, 0, 1612, 467),      # right of the Biore tube/hand, left of corner icon
    "E_resting": (563, 473, 900, 722),      # left of the Centella bottle, above the leaves
    "F_green_pad": (1353, 473, 1672, 941),  # right of the Heartleaf toner
}
import os
os.makedirs(OUT, exist_ok=True)
img = Image.open(SRC).convert("RGB")
for name, box in CROPS.items():
    c = img.crop(box)
    c = c.resize((c.width * 2, c.height * 2), Image.LANCZOS)
    c = c.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    c.save(OUT + name + ".jpg", quality=93)
    print(name, c.size)
