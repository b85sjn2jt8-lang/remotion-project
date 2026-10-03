"""Builds opaque product plates (RGBA) from the reference images.
Pixels inside the product are copied 1:1 from the reference (alpha 255); only the
background is removed. Packaging pixels are never edited, upscaled or retouched."""
import sys, numpy as np, cv2
from PIL import Image

REF = "production/store-loop/references/"
OUT = "public/store-loop/products/"

def largest(mask, n=1):
    k, lab, st, _ = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    order = np.argsort(-st[1:, cv2.CC_STAT_AREA])[:n] + 1
    return np.isin(lab, order)

def fill_holes(m):
    m = m.astype(np.uint8) * 255
    h, w = m.shape
    ff = m.copy(); pad = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(ff, pad, (0, 0), 255)
    return (m | cv2.bitwise_not(ff)) > 0

def save(name, rgb, mask, feather=1.2):
    a = mask.astype(np.float32)
    a = cv2.GaussianBlur(a, (0, 0), feather)  # anti-alias only the silhouette edge
    a = np.where(cv2.erode(mask.astype(np.uint8), np.ones((5, 5)), 1) > 0, 1.0, a)
    ys, xs = np.where(a > 0.02)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgba = np.dstack([rgb, (a * 255).astype(np.uint8)])[y0:y1, x0:x1]
    Image.fromarray(rgba).save(OUT + name + ".png")
    print(name, (x0, y0, x1, y1), rgba.shape)

def load(i):
    return np.array(Image.open(REF + [f for f in REFS if f.startswith(i)][0]).convert("RGB"))

import os
REFS = os.listdir(REF)
os.makedirs(OUT, exist_ok=True)

# PM-02 Dr.Althea: pure white studio background -> threshold distance from white
img = load("PM-02")
d = 255 - img.min(axis=2)
m = d > 10
m = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((5, 5))) > 0
m = fill_holes(m)
k, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8), 8)
print("PM-02 comps", [tuple(s) for s in st[1:] if s[4] > 2000])
np.save("/tmp/pm02_lab.npy", lab)

# --- final plates -----------------------------------------------------------
def polymask(shape, pts):
    g = np.zeros(shape, np.uint8); cv2.fillPoly(g, [np.array(pts)], 1); return g > 0

# PM-02a box: geometric front face, trimmed to non-white pixels so no background survives
img2 = load("PM-02"); d2 = 255 - img2.astype(int).min(2)
P = polymask(d2.shape, [(261, 302), (381, 302), (381, 289), (587, 290), (587, 923), (261, 923)])
m = cv2.morphologyEx(((d2 > 4) & cv2.dilate(P.astype(np.uint8), np.ones((7, 7))).astype(bool)).astype(np.uint8),
                     cv2.MORPH_CLOSE, np.ones((9, 9))) > 0
m = fill_holes(largest(m)) & P
save("PM-02a_dralthea_box", img2, m)
# PM-02b tube: white-on-white, so the silhouette is traced by hand from the reference edges
save("PM-02b_dralthea_tube", img2, polymask(d2.shape, [
    (608, 295), (809, 295), (809, 322), (790, 400), (782, 480), (777, 600), (772, 700), (770, 800),
    (766, 807), (766, 912), (762, 917), (645, 917), (640, 912), (640, 807), (640, 790), (637, 560),
    (627, 360), (608, 322)]))

# PM-05 Hikari: GrabCut seeded with the 8-point star silhouette; tips clipped where the
# retailer's icon captions overlap the pouch tips in the reference
img5 = load("PM-05")
g = np.zeros(img5.shape[:2], np.uint8)
cv2.rectangle(g, (200, 180), (614, 616), 1, -1)
cv2.fillPoly(g, [np.array([(120, 398), (407, 110), (693, 398), (407, 700)])], 1)
cv2.fillPoly(g, [np.array([(380, 105), (430, 105), (440, 180), (372, 180)])], 1)
gm = np.full(g.shape, cv2.GC_PR_BGD, np.uint8)
gm[g > 0] = cv2.GC_PR_FGD
gm[cv2.erode(g, np.ones((25, 25))) > 0] = cv2.GC_FGD
gm[cv2.dilate(g, np.ones((25, 25))) == 0] = cv2.GC_BGD
cv2.grabCut(cv2.cvtColor(img5, cv2.COLOR_RGB2BGR), gm, None, np.zeros((1, 65)), np.zeros((1, 65)), 8, cv2.GC_INIT_WITH_MASK)
m5 = largest((gm == 1) | (gm == 3))
m5[:, :132] = False; m5[:, 664:] = False
m5 = cv2.morphologyEx(m5.astype(np.uint8), cv2.MORPH_OPEN, np.ones((5, 5))) > 0
save("PM-05_hikari_pouch", img5, fill_holes(largest(m5)))

# PM-04 Brilliant box: front face on white; bottom edge coincides with the image edge
img4 = load("PM-04"); d4 = 255 - img4.astype(int).min(2)
P = polymask(d4.shape, [(86, 266), (918, 266), (918, 999), (86, 999)])
m = (cv2.morphologyEx(((d4 > 8) & P).astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9))) > 0)
save("PM-04_brilliant_box", img4, fill_holes(largest(m)) & P)

# PM-01 Anua jar: pink against the white page. Right/bottom are cut by the reference frame,
# so this plate must always be placed with those two edges off-screen or occluded.
img1 = load("PM-01").copy(); a1 = img1.astype(int)
pink = (a1[:, :, 0] - a1[:, :, 1] > 22) & (a1[:, :, 0] > 150)
pink[:, :420] = False; pink[:360, :] = False  # jar lives right of x=420, below the headline
m1 = cv2.morphologyEx(pink.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((15, 15))) > 0
m1 = largest(m1)
h, w = m1.shape  # fill interior (label text) by flooding the background from the top-left only
ff = (m1.astype(np.uint8) * 255).copy(); cv2.floodFill(ff, np.zeros((h + 2, w + 2), np.uint8), (0, 0), 255)
m1 = m1 | (ff == 0)
# The retailer's grey hashtag "(under eye area)" overlaps the jar's left rim (x<=447, y 722-748):
# remove that overlay by inpainting only those grey text pixels from the surrounding plain pink.
txt = np.zeros(m1.shape, np.uint8)
roi = (slice(712, 758), slice(420, 452))
dark = a1.sum(2) < 3 * 175  # the text is clearly darker than the plain pink rim around it
txt[roi] = (dark[roi] & m1[roi]).astype(np.uint8) * 255
txt = cv2.dilate(txt, np.ones((3, 3)))
img1 = cv2.inpaint(img1, txt, 4, cv2.INPAINT_TELEA)
save("PM-01_anua_jar_cropped", img1, m1, feather=1.0)

# PM-03 Manee: hands occlude the lower pouch. Plate = the unoccluded upper pouch (y<=588:
# glitter band, Manee logo, GLUTA / グルタ), cut between GLUTA and the COLLAGEN line;
# exact pouch edges at the top and sides; the flat bottom cut must always sit behind an occluder.
img3 = load("PM-03")
save("PM-03_manee_pouch_upper", img3, polymask(img3.shape[:2], [(308, 451), (566, 451), (566, 588), (308, 588)]), feather=0.8)
Image.fromarray(img3).save(OUT + "PM-03_manee_lifestyle_photo.png")  # full brand photo, unchanged
