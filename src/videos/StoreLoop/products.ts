// Product master plates, cut from the uploaded references by scripts/store-loop/cutouts.py.
// Pixels inside each plate are the reference pixels 1:1 — never recolour, warp or mirror them.
// `aspect` = height / width of the plate PNG. `nativeWidth` = plate pixels; at the 2x render
// scale a plate shown wider than nativeWidth / 2 CSS px is being enlarged.
export const PRODUCTS = {
  // Cropped by the reference's right + bottom edges: always place with those edges off-frame.
  anua: { src: "store-loop/products/PM-01_anua_jar_cropped.png", aspect: 638 / 600, nativeWidth: 600 },
  altheaBox: { src: "store-loop/products/PM-02a_dralthea_box.png", aspect: 639 / 329, nativeWidth: 329 },
  altheaTube: { src: "store-loop/products/PM-02b_dralthea_tube.png", aspect: 627 / 206, nativeWidth: 206 },
  // Upper pouch only (hands cover the rest in the reference): bottom edge must sit behind an occluder.
  maneeUpper: { src: "store-loop/products/PM-03_manee_pouch_upper.png", aspect: 142 / 263, nativeWidth: 263 },
  maneePhoto: { src: "store-loop/products/PM-03_manee_lifestyle_photo.png", aspect: 1000 / 729, nativeWidth: 729 },
  brilliant: { src: "store-loop/products/PM-04_brilliant_box.png", aspect: 736 / 835, nativeWidth: 835 },
  hikari: { src: "store-loop/products/PM-05_hikari_pouch.png", aspect: 594 / 536, nativeWidth: 536 },
} as const;

export type ProductId = keyof typeof PRODUCTS;

// Colours sampled from the Anua reference (used by the loop bridge stand-in).
export const ANUA_PINK = {
  body: "#E78490",
  bodyMid: "#E78D95",
  bodyLit: "#FAADB1",
  rim: "#FDB0B3",
  lidBand: "#FBA6AE",
};
