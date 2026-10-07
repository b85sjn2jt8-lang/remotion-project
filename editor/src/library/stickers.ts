import type { GlobalStyles, TextStyle } from "../../../src/engine/types";

/** Text stickers: short, punchy labels with a fixed look. Editable like any text after insert. */
export const STICKERS: {
  id: string;
  text: string;
  rotation: number;
  style: (g: GlobalStyles) => Partial<TextStyle>;
}[] = [
  {
    id: "new",
    text: "جديد",
    rotation: -6,
    style: (g) => ({
      fontSize: 58,
      fontWeight: 900,
      color: "#111111",
      background: {
        enabled: true,
        color: g.accentColor,
        opacity: 1,
        radius: 14,
        paddingX: 26,
        paddingY: 6,
      },
    }),
  },
  {
    id: "offer",
    text: "عرض خاص",
    rotation: 4,
    style: () => ({
      fontSize: 56,
      fontWeight: 900,
      color: "#FFFFFF",
      background: {
        enabled: true,
        color: "#FF3B5C",
        opacity: 1,
        radius: 999,
        paddingX: 30,
        paddingY: 8,
      },
    }),
  },
  {
    id: "original",
    text: "أصلي 100%",
    rotation: -3,
    style: () => ({
      fontSize: 54,
      fontWeight: 900,
      color: "#0B3D2E",
      background: {
        enabled: true,
        color: "#3CCF8E",
        opacity: 1,
        radius: 16,
        paddingX: 26,
        paddingY: 6,
      },
    }),
  },
  {
    id: "limited",
    text: "LIMITED",
    rotation: -8,
    style: () => ({
      fontFamily: "Montserrat",
      fontSize: 54,
      fontWeight: 900,
      letterSpacing: 0.12,
      color: "#FFFFFF",
      strokeWidth: 0,
      background: {
        enabled: true,
        color: "#111111",
        opacity: 1,
        radius: 8,
        paddingX: 24,
        paddingY: 8,
      },
    }),
  },
  {
    id: "free-ship",
    text: "شحن مجاني",
    rotation: 0,
    style: () => ({
      fontSize: 50,
      fontWeight: 800,
      color: "#FFFFFF",
      background: {
        enabled: true,
        color: "#FFFFFF",
        opacity: 0.18,
        radius: 999,
        paddingX: 28,
        paddingY: 8,
      },
    }),
  },
  {
    id: "wow",
    text: "!!",
    rotation: 10,
    style: (g) => ({
      fontSize: 140,
      fontWeight: 900,
      color: g.accentColor,
      strokeWidth: 10,
      strokeColor: "#000000",
    }),
  },
  {
    id: "question",
    text: "؟",
    rotation: -10,
    style: () => ({
      fontSize: 160,
      fontWeight: 900,
      color: "#FFFFFF",
      strokeWidth: 10,
      strokeColor: "#000000",
    }),
  },
  {
    id: "sale",
    text: "SALE",
    rotation: -4,
    style: () => ({
      fontFamily: "Bebas Neue",
      fontSize: 110,
      fontWeight: 400,
      letterSpacing: 0.04,
      color: "#FFFFFF",
      background: {
        enabled: true,
        color: "#E11D48",
        opacity: 1,
        radius: 10,
        paddingX: 26,
        paddingY: 0,
      },
    }),
  },
];
