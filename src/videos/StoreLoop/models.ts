// V2 human plates — cropped from the user-supplied AI beauty grid with every cosmetic product
// in that grid cropped OUT (scripts/store-loop/model_plates.py). Placeholders until dedicated
// high-res plates are generated: drop a replacement at the same path (same aspect) to upgrade.
// `aspect` = width / height.
export const MODELS = {
  cheekTall: { src: "store-loop/models/A_cheek_tall.jpg", aspect: 636 / 934 },
  hairWide: { src: "store-loop/models/A_hair_wide.jpg", aspect: 956 / 480 },
  wetFace: { src: "store-loop/models/B_wet_face.jpg", aspect: 564 / 504 },
  sunSky: { src: "store-loop/models/C_sun_sky.jpg", aspect: 568 / 934 },
  resting: { src: "store-loop/models/E_resting.jpg", aspect: 674 / 498 },
  greenPad: { src: "store-loop/models/F_green_pad.jpg", aspect: 638 / 936 },
} as const;

export type ModelId = keyof typeof MODELS;
