import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts live in public/fonts so renders work offline and look identical everywhere.
// Use them anywhere with an inline style, e.g. `fontFamily: 'Montserrat'`.
// To add your brand font: drop the .woff2 into public/fonts, add a line below,
// and add the family name to `fontFamilies` so captions can use it too.
const fonts = [
  { family: "Montserrat", file: "Montserrat-600.woff2", weight: "600" },
  { family: "Montserrat", file: "Montserrat-800.woff2", weight: "800" },
  { family: "Montserrat", file: "Montserrat-900.woff2", weight: "900" },
  { family: "Poppins", file: "Poppins-600.woff2", weight: "600" },
  { family: "Poppins", file: "Poppins-800.woff2", weight: "800" },
  { family: "Inter", file: "Inter-600.woff2", weight: "600" },
  { family: "Inter", file: "Inter-800.woff2", weight: "800" },
  { family: "Bebas Neue", file: "BebasNeue-400.woff2", weight: "400" },
  // Variable font (200–800) used by the ANUA commercial.
  { family: "Manrope", file: "Manrope-Variable.woff2", weight: "200 800" },
  // Variable font (200–800) used by the A BONNE commercial.
  { family: "Plus Jakarta Sans", file: "PlusJakartaSans-Variable.woff2", weight: "200 800" },
  // Variable font (100–900) used by the HIKARI commercial.
  { family: "Outfit", file: "Outfit-Variable.woff2", weight: "100 900" },
  // Variable font (100–800) used by the EQQUALBERRY commercial.
  { family: "Sora", file: "Sora-Variable.woff2", weight: "100 800" },
  // Variable font (300–900) used by the ANUA Heartleaf commercial.
  { family: "Figtree", file: "Figtree-Variable.woff2", weight: "300 900" },
  // Variable font (100–900) used by the MEDICUBE commercial.
  { family: "Jost", file: "Jost-Variable.woff2", weight: "100 900" },
  // Variable font (100–700) used by the NATURE SEVEN GREEN commercial.
  { family: "Josefin Sans", file: "JosefinSans-Variable.woff2", weight: "100 700" },
  // Variable font (100–900) used by the ANUA Birch 70 commercial.
  { family: "Urbanist", file: "Urbanist-Variable.woff2", weight: "100 900" },
  // Variable font (100–900) used by the SKIN1004 Centella commercial.
  { family: "Albert Sans", file: "AlbertSans-Variable.woff2", weight: "100 900" },
  // Variable font (100–900) used by the BEAUTY OF JOSEON Green Plum commercial.
  { family: "Hanken Grotesk", file: "HankenGrotesk-Variable.woff2", weight: "100 900" },
  // Variable font (100–900) used by the ARENCIA TXA Booster Shot commercial.
  { family: "Archivo", file: "Archivo-Variable.woff2", weight: "100 900" },
  // Variable font (100–1000) used by the BIODANCE Caviar PDRN commercial.
  { family: "DM Sans", file: "DMSans-Variable.woff2", weight: "100 1000" },
];

for (const font of fonts) {
  loadFont({
    family: font.family,
    url: staticFile(`fonts/${font.file}`),
    weight: font.weight,
  });
}

export const fontFamilies = [
  "Montserrat",
  "Poppins",
  "Inter",
  "Bebas Neue",
  "Manrope",
  "Plus Jakarta Sans",
  "Outfit",
  "Sora",
  "Figtree",
  "Jost",
  "Josefin Sans",
  "Urbanist",
  "Albert Sans",
  "Hanken Grotesk",
  "Archivo",
  "DM Sans",
] as const;
