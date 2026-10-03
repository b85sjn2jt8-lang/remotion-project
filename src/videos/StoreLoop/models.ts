// V3 human + macro plates — cropped from the user's reference board with every AI-drawn product,
// headline and panel label cropped OUT, then enlarged 4x with EDSR (scripts/store-loop/plates_v3.py).
// `*Cut` = same plate with a person alpha matte (for text-behind-model layering).
// Placeholders until dedicated high-res plates are supplied: replace a file at the same path and
// keep (or update) its aspect. `aspect` = width / height.
export const MODELS = {
  openingFace: { src: "store-loop/v3/p_opening_face.jpg", aspect: 756 / 712 },
  cheekWet: { src: "store-loop/v3/p_cheek_wet.jpg", aspect: 1168 / 660 },
  beach: { src: "store-loop/v3/p_beach.jpg", aspect: 752 / 1048 },
  beachCut: { src: "store-loop/v3/p_beach_cut.png", aspect: 752 / 1048 },
  shoulderSea: { src: "store-loop/v3/p_ocean.jpg", aspect: 800 / 360 },
  pool: { src: "store-loop/v3/p_pool.jpg", aspect: 908 / 792 },
  poolCut: { src: "store-loop/v3/p_pool_cut.png", aspect: 908 / 792 },
  green: { src: "store-loop/v3/p_green.jpg", aspect: 716 / 792 },
  night: { src: "store-loop/v3/p_night.jpg", aspect: 1164 / 792 },
  nightCut: { src: "store-loop/v3/p_night_cut.png", aspect: 1164 / 792 },
  hair: { src: "store-loop/v3/p_hair.jpg", aspect: 968 / 696 },
  morning: { src: "store-loop/v3/p_morning.jpg", aspect: 1060 / 696 },
  morningCut: { src: "store-loop/v3/p_morning_cut.png", aspect: 1060 / 696 },
  macroDropper: { src: "store-loop/v3/m_dropper.jpg", aspect: 772 / 928 },
  macroCream: { src: "store-loop/v3/m_cream.jpg", aspect: 820 / 792 },
  macroHair: { src: "store-loop/v3/m_hair.jpg", aspect: 640 / 776 },
  macroVanity: { src: "store-loop/v3/m_vanity.jpg", aspect: 1040 / 776 },
  macroEyeTexture: { src: "store-loop/v3/m_eye_texture.jpg", aspect: 1372 / 680 },
  macroPinkLiquid: { src: "store-loop/v3/m_pink_liquid.jpg", aspect: 912 / 680 },
  macroFlowerDrop: { src: "store-loop/v3/m_flower_drop.jpg", aspect: 716 / 816 },
} as const;

export type ModelId = keyof typeof MODELS;
