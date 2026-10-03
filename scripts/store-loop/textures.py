"""Procedural environment textures (no product content): cream macro surface."""
import numpy as np, cv2
from PIL import Image

rng = np.random.default_rng(7)
N = 3000

def smooth_noise(sigma):
    n = rng.standard_normal((N, N)).astype(np.float32)
    n = cv2.GaussianBlur(n, (0, 0), sigma)
    return n / (np.abs(n).max() + 1e-6)

# Height field: broad dollops + swirled ridges like spatula-spread cream
base = 1.0 * smooth_noise(240) + 0.35 * smooth_noise(90)
yy, xx = np.mgrid[0:N, 0:N].astype(np.float32) / N
warp = smooth_noise(120) * 9.0
ridges = np.sin((xx * 4 + yy * 2.5 + warp * 0.5) * 2.2) * 0.5 + 0.5
ridges = ridges ** 2  # sharp crests, soft valleys
fine = smooth_noise(10) * 0.006
h = base * 0.9 + ridges * 0.16 * (0.6 + 0.4 * smooth_noise(200)) + fine
h = cv2.GaussianBlur(h, (0, 0), 4.0)

# Shading: raking key from the far left, low elevation; soft fill; satin specular
gy, gx = np.gradient(h * 260.0)
nrm = np.dstack([-gx, -gy, np.ones_like(h)])
nrm /= np.linalg.norm(nrm, axis=2, keepdims=True)
L = np.array([-0.82, -0.25, 0.52]); L /= np.linalg.norm(L)
V = np.array([0, 0, 1.0]); H = (L + V) / np.linalg.norm(L + V)
diff = np.clip(nrm @ L, 0, 1)
spec = np.clip(nrm @ H, 0, 1) ** 24
amb = 0.72
lum = amb + 0.30 * diff + 0.45 * spec
# micro air-bubble glints
glint = (rng.random((N, N)) > 0.99997).astype(np.float32)
glint = cv2.GaussianBlur(glint, (0, 0), 1.6) * 40
lum = lum + glint * (diff > 0.4)
col = np.dstack([lum * 252, lum * 248, lum * 242])  # warm white, never grey/blue
col = np.clip(col, 0, 255).astype(np.uint8)
Image.fromarray(col).save("public/store-loop/env/cream_macro.jpg", quality=92)
print("cream ok")
