"""V3 human / macro plates cropped from the user's reference board
(production/store-loop/references/model-plates-source/user-reference-board-v3.webp).

Every crop EXCLUDES the board's AI-drawn product renders, its baked-in headlines and the
"S0x" panel labels — only people, hands, hair, skin, liquids, props and environments are kept.
Crops are tiny (≈160–340 px), so they are enlarged 4x with EDSR super-resolution
(OpenCV dnn_superres; model: github.com/Saafke/EDSR_Tensorflow, downloaded on first run).
EDSR is applied to these plates only — NEVER to product packaging."""
import os, urllib.request, cv2
import numpy as np

SRC = "production/store-loop/references/model-plates-source/user-reference-board-v3.webp"
OUT = "public/store-loop/v3/"
MODEL = "/tmp/sr/EDSR_x4.pb"
CROPS = {
    # name: (x0, y0, x1, y1) on the 1672x941 board
    "p_opening_face": (236, 0, 425, 178),     # S01: right of the blurred jar, above the headline
    "p_cheek_wet": (430, 0, 722, 165),        # S02: above HYDRATE/GLOW/CARE
    "p_beach": (1305, 0, 1493, 262),          # S04: right of SUN-KISSED/PROTECTED, left of the pouch panel
    "p_ocean": (1100, 146, 1300, 236),        # S04: sea + sand under the headline (background extension)
    "p_pool": (299, 268, 526, 466),           # S06
    "p_green": (532, 268, 711, 466),          # S07: left of the product render
    "p_night": (1127, 268, 1418, 466),        # S09: left of NIGHT RESET and the box render
    "p_hair": (125, 494, 367, 668),           # S10: right of the headline, above the label
    "p_morning": (645, 494, 910, 668),        # S11: right of FRESH START
    "m_dropper": (900, 0, 1093, 232),         # S03b macro, above its label
    "m_cream": (915, 268, 1120, 466),         # S08 cream swirl
    "m_hair": (372, 494, 532, 688),           # S10b hair macro
    "m_vanity": (832, 494, 1092, 688),        # S11 vanity props (unbranded glassware/flowers)
    "m_eye_texture": (1097, 494, 1440, 664),  # S12 skin + texture, above its label
    "m_pink_liquid": (1444, 494, 1672, 664),  # S13
    "m_flower_drop": (471, 696, 650, 900),    # S15
}
os.makedirs(OUT, exist_ok=True)
if not os.path.exists(MODEL):
    os.makedirs(os.path.dirname(MODEL), exist_ok=True)
    urllib.request.urlretrieve("https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb", MODEL)
sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(MODEL)
sr.setModel("edsr", 4)
board = cv2.imread(SRC)
for name, (x0, y0, x1, y1) in CROPS.items():
    up = sr.upsample(board[y0:y1, x0:x1])
    blur = cv2.GaussianBlur(up, (0, 0), 1.2)
    up = cv2.addWeighted(up, 1.25, blur, -0.25, 0)  # gentle unsharp
    cv2.imwrite(OUT + name + ".jpg", up, [cv2.IMWRITE_JPEG_QUALITY, 93])
    print(name, up.shape[1], "x", up.shape[0])

# Person cut-outs (RGBA) for "text behind the model" layering. Same pixels/size as the plate;
# alpha from rembg's u2net_human_seg matte.
from rembg import remove, new_session
from PIL import Image, ImageFilter
seg = new_session("u2net_human_seg")
for name in ["p_beach", "p_morning", "p_night", "p_pool"]:
    im = Image.open(OUT + name + ".jpg").convert("RGB")
    m = remove(im, session=seg, only_mask=True).filter(ImageFilter.GaussianBlur(1.2))
    cut = im.copy()
    cut.putalpha(m)
    cut.save(OUT + name + "_cut.png")
    print(name + "_cut")
