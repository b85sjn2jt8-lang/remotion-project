import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts live in public/fonts so renders work offline and look identical everywhere.
// Use them anywhere with an inline style, e.g. `fontFamily: 'Montserrat'`.
// To add your brand font: drop the .woff2 into public/fonts, add a line below,
// and add the family name to `fontFamilies` so captions can use it too.
const ARABIC =
  "U+0600-06FF,U+0750-077F,U+08A0-08FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC";
const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2212";

const fonts: {
  family: string;
  file: string;
  weight: string;
  unicodeRange?: string;
}[] = [
  { family: "Montserrat", file: "Montserrat-600.woff2", weight: "600" },
  { family: "Montserrat", file: "Montserrat-800.woff2", weight: "800" },
  { family: "Montserrat", file: "Montserrat-900.woff2", weight: "900" },
  { family: "Poppins", file: "Poppins-600.woff2", weight: "600" },
  { family: "Poppins", file: "Poppins-800.woff2", weight: "800" },
  { family: "Inter", file: "Inter-600.woff2", weight: "600" },
  { family: "Inter", file: "Inter-800.woff2", weight: "800" },
  { family: "Bebas Neue", file: "BebasNeue-400.woff2", weight: "400" },
  // Arabic. Single weight, registered for the full range so bold styles
  // use the real letterforms instead of a synthetic bold.
  {
    family: "Hayyakum Allah",
    file: "HayyakumAllah-Taweel-Medium.ttf",
    weight: "100 900",
  },
  // Arabic body text (Tajawal has separate Arabic and Latin files).
  {
    family: "Tajawal",
    file: "Tajawal-Arabic-500.woff2",
    weight: "500",
    unicodeRange: ARABIC,
  },
  {
    family: "Tajawal",
    file: "Tajawal-Latin-500.woff2",
    weight: "500",
    unicodeRange: LATIN,
  },
  {
    family: "Tajawal",
    file: "Tajawal-Arabic-800.woff2",
    weight: "800",
    unicodeRange: ARABIC,
  },
  {
    family: "Tajawal",
    file: "Tajawal-Latin-800.woff2",
    weight: "800",
    unicodeRange: LATIN,
  },
];

for (const font of fonts) {
  loadFont({
    family: font.family,
    url: staticFile(`fonts/${font.file}`),
    weight: font.weight,
    unicodeRange: font.unicodeRange,
  });
}

export const fontFamilies = [
  "Montserrat",
  "Poppins",
  "Inter",
  "Bebas Neue",
  "Hayyakum Allah",
  "Tajawal",
] as const;
