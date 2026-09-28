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
] as const;
