import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts live in public/fonts so renders work offline and look identical everywhere.
// Use them anywhere with an inline style, e.g. `fontFamily: 'Montserrat'`.
// To add your brand font: drop the .woff2 into public/fonts, add a line below,
// and add the family name to `fontFamilies` so captions can use it too.
// Tajawal (Arabic) ships as two subsets per weight: Arabic letters + Latin digits/punctuation.
const ARABIC_RANGE =
  "U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC";
const LATIN_RANGE =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";

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
  ...(["500", "800", "900"] as const).flatMap((weight) => [
    {
      family: "Tajawal",
      file: `Tajawal-Arabic-${weight}.woff2`,
      weight,
      unicodeRange: ARABIC_RANGE,
    },
    {
      family: "Tajawal",
      file: `Tajawal-Latin-${weight}.woff2`,
      weight,
      unicodeRange: LATIN_RANGE,
    },
  ]),
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
  "Tajawal",
] as const;
