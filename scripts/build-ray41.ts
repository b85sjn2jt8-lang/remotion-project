/**
 * Builds the Ray41 edit (winter perfumes: Stronger With You Intensely vs Burberry Hero Parfum)
 * as an editor project: npx tsx scripts/build-ray41.ts → projects/ray41.json
 * Everything is placed in SOURCE time, then pauses are rippled out so all layers stay in sync.
 */
import fs from "node:fs";
import { defaultAnimationSet, defaultParams } from "../src/engine/animation/presets";
import {
  createAudioItem,
  createCaptionItem,
  createOverlayItem,
  createTextItem,
  createVideoItem,
  emptyProject,
  uid,
} from "../src/engine/factory";
import type { CaptionItem, Item, Project, TextItem, VideoItem } from "../src/engine/types";
import { rippleRangeInDraft, splitItemInDraft } from "../editor/src/project/actions";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const p: Project = emptyProject("Ray41 · عطور الشتاء", "ray41");
p.global.accentColor = "#F0B65A";
p.global.captionY = 1420;
const T = (k: string) => p.tracks.find((t) => t.kind === k)!.id;
const items: Item[] = [];

// ---------- video: one clip, split for punch-ins ----------
const SRC_FRAMES = 763;
const video = createVideoItem(p, { trackId: T("video"), src: "footage/ray411.mp4", from: 0, durationInFrames: SRC_FRAMES, name: "RAY41" });
// No color changes: the footage is shown exactly as delivered (user-graded).
video.adjust = { contrast: 1, saturation: 1, brightness: 1 };
p.items = [video];
for (const at of [77, 152, 367, 538]) {
  const piece = p.items.filter((i) => i.type === "video").find((i) => i.from < at && i.from + i.durationInFrames > at)!;
  splitItemInDraft(p, piece, at);
}
const zoom: Record<number, { s: number; ox: number; oy: number; name: string; kf?: boolean }> = {
  0: { s: 1, ox: 50, oy: 50, name: "Hook", kf: true },
  77: { s: 1, ox: 50, oy: 50, name: "الشتاء = ثقيل؟" },
  152: { s: 1.12, ox: 50, oy: 48, name: "للأسف خطأ" },
  367: { s: 1.1, ox: 55, oy: 52, name: "Armani · Stronger With You" },
  538: { s: 1.1, ox: 48, oy: 52, name: "Burberry Hero" },
};
for (const v of p.items as VideoItem[]) {
  const z = zoom[v.from];
  v.name = `Clip · ${z.name}`;
  v.transform.scale = z.s;
  v.origin = { x: z.ox, y: z.oy };
  if (z.kf) v.keyframes = { scale: [{ frame: 0, value: 1, easing: "linear" }, { frame: v.durationInFrames - 1, value: 1.06, easing: "linear" }] };
}
// the 1.0 section after "خطأ": split back to 1 at the end of the long clip 152..367
const mid = p.items.find((i) => i.from === 152)!;
const back = splitItemInDraft(p, mid, 197) as VideoItem;
back.transform.scale = 1;
back.name = "Clip · العود والأدهان";
const tighten = splitItemInDraft(p, back, 295) as VideoItem;
tighten.transform.scale = 1.08;
tighten.origin = { x: 50, y: 52 };
tighten.name = "Clip · تقدر تبدّلها";
const end = p.items.find((i) => i.from === 538)!;
const outro = splitItemInDraft(p, end, 670) as VideoItem;
outro.transform.scale = 1;
outro.origin = { x: 50, y: 50 };
outro.name = "Clip · والأهم";

// ---------- captions (word timings in source seconds) ----------
type W = [string, number, number, ("e" | "n" | "en")?];
const groups: W[][] = [
  [["ليس", 0, 0.32], ["شرط", 0.32, 0.66], ["أبدًا", 0.66, 1.08]],
  [["إنك", 1.08, 1.2], ["تشتري", 1.2, 1.54], ["عطر", 1.54, 1.82], ["ثقيل", 1.82, 2.1, "e"], ["بالشتاء", 2.1, 2.56, "e"]],
  [["أصلًا", 2.56, 2.98], ["الربط", 2.98, 3.5], ["إن", 3.5, 3.68], ["الشتاء", 3.68, 4.04]],
  [["لازم", 4.04, 4.46], ["عطر", 4.46, 4.68], ["ثقيل", 4.68, 5.06, "e"]],
  [["للأسف", 5.06, 5.76], ["خطأ", 5.76, 6.24, "en"]],
  [["عادي", 6.57, 6.98], ["ما", 6.98, 7.14], ["تحب", 7.14, 7.38]],
  [["العطور", 7.38, 7.84], ["الثقيلة", 7.84, 8.26]],
  [["مثل", 8.26, 8.52], ["العود", 8.52, 8.94, "en"], ["والأدهان", 8.94, 9.55, "en"]],
  [["تقدر", 9.84, 10.16], ["تبدّلها", 10.16, 10.66], ["مثلًا", 10.66, 10.96]],
  [["بعطر", 10.96, 11.3], ["الأرماني", 11.3, 11.94, "e"]],
  [["أرماني", 12.25, 12.58], ["هذا", 12.58, 12.76], ["Stronger", 12.76, 13.24, "e"], ["With You", 13.24, 13.46, "e"]],
  [["ونسخة", 13.46, 13.88], ["الـIntensely", 13.88, 14.52, "e"]],
  [["فيه", 14.52, 14.74], ["فانيلا", 14.74, 15.42, "e"], ["وتوفي", 15.42, 15.98, "e"]],
  [["وفيهم", 15.98, 16.28], ["مكونات", 16.28, 16.76], ["خشبية", 16.76, 17.26, "e"], ["حلوة", 17.26, 17.94]],
  [["أو", 17.94, 18.18], ["البربري", 18.18, 18.55, "e"], ["هيرو", 18.55, 18.86, "e"], ["بارفيوم", 18.86, 19.48, "e"]],
  [["إذا", 19.48, 19.64], ["تحب", 19.64, 19.92], ["الروايح", 19.92, 20.36], ["الخشبية", 20.36, 20.98, "e"]],
  [["بس", 20.98, 21.14], ["بشكل", 21.14, 21.5], ["أهدأ", 21.5, 21.95, "e"]],
  [["والأهم", 22.33, 22.82], ["إنك", 22.82, 23.24], ["تاخذ", 23.24, 23.56]],
  [["من", 23.56, 23.7], ["ريحانة", 23.7, 24.24, "e"], ["مكة", 24.24, 24.62, "e"], ["وبس", 24.62, 24.95]],
];
groups.forEach((g, gi) => {
  const from = f(g[0][1]);
  const next = groups[gi + 1];
  const endF = Math.min(next ? f(next[0][1]) : SRC_FRAMES, f(g[g.length - 1][2]) + 12);
  const c = createCaptionItem(p, {
    trackId: T("captions"),
    from,
    durationInFrames: Math.max(1, endF - from),
    presetId: "glass",
    words: g.map(([text, s, e, fl]) => ({
      id: uid("w"),
      text,
      start: +(s * FPS - from).toFixed(2),
      end: +(e * FPS - from).toFixed(2),
      ...(fl?.includes("e") ? { emphasis: true } : {}),
      ...(fl?.includes("n") ? { tone: "negative" as const } : {}),
    })),
  });
  c.style.fontFamily = "Noto Naskh Arabic";
  c.style.fontWeight = 500;
  c.style.fontSize = 50;
  c.style.lineHeight = 1.45;
  c.style.emphasisScale = 1.1;
  c.style.maxWidth = 860;
  c.style.reveal = "phrase";
  c.animation.in = "fade";
  c.animation.inParams = defaultParams({ duration: 3 });
  c.transform.y = 1420;
  items.push(c);
});

// ---------- realistic snowfall while he talks about "winter = heavy perfume" ----------
const snow = createOverlayItem(p, { trackId: T("broll"), from: f(2.56), shape: "snow" });
snow.durationInFrames = f(5.06) - f(2.56);
snow.name = "Snow · الشتاء = عطر ثقيل";
snow.strokeWidth = 9;
snow.secondaryColor = "transparent"; // no frost tint: keep the footage colors untouched
snow.animation = defaultAnimationSet({ in: "fade", inParams: defaultParams({ duration: 10 }), out: "fadeOut", outParams: defaultParams({ duration: 4 }) });
items.push(snow);

// ---------- hook ----------
const hook = createTextItem(p, { trackId: T("text"), from: 0, variant: "question", text: "عطر الشتاء… لازم يكون ثقيل؟" });
hook.durationInFrames = f(2.56);
hook.transform.y = 400;
hook.style.fontSize = 58;
hook.style.fontFamily = "Noto Naskh Arabic";
hook.style.fontWeight = 500;
hook.style.lineHeight = 1.45;
hook.animation = defaultAnimationSet({ in: "pop", inParams: defaultParams({ duration: 7 }), emphasis: "underlineReveal", emphasisParams: defaultParams({ duration: 14, delay: 10 }), out: "scaleOut", outParams: defaultParams({ duration: 5 }) });
hook.name = "Hook";
items.push(hook);

// ---------- chips helper ----------
const chip = (text: string, fromS: number, toS: number, x: number, y: number, bg: string, fg: string, name: string, fontFamily?: string): TextItem => {
  const t = createTextItem(p, { trackId: T("overlays"), from: f(fromS), variant: "label", text });
  t.durationInFrames = f(toS) - f(fromS);
  t.name = name;
  t.transform.x = x;
  t.transform.y = y;
  t.style.fontSize = 46;
  t.style.fontWeight = 800;
  t.style.letterSpacing = 0;
  t.style.color = fg;
  if (fontFamily) t.style.fontFamily = fontFamily;
  t.style.background = { enabled: true, color: bg, opacity: 1, radius: 999, paddingX: 26, paddingY: 8 };
  t.style.shadow = { enabled: true, color: "rgba(0,0,0,0.35)", blur: 22, x: 0, y: 8 };
  t.animation = defaultAnimationSet({ in: "pop", inParams: defaultParams({ duration: 7, intensity: 0.9 }), out: "fadeOut", outParams: defaultParams({ duration: 4 }) });
  return t;
};

// ✕ heavy-perfume clichés
items.push(chip("✕ العود", 8.52, 9.55, 690, 430, "#E5484D", "#FFFFFF", "✕ العود"));
items.push(chip("✕ الأدهان", 8.94, 9.55, 410, 430, "#E5484D", "#FFFFFF", "✕ الأدهان"));

// ---------- product cards: real box (cropped from the footage) + ingredients ----------
const productCard = (
  fromS: number,
  toS: number,
  name: string,
  image: string,
  brand: string,
  title: string,
  notes: [string, string, number][],
) => {
  const o = createOverlayItem(p, { trackId: T("graphics"), from: f(fromS), shape: "productCard" });
  o.durationInFrames = f(toS) - f(fromS);
  o.name = name;
  o.width = 840;
  o.height = 460;
  o.transform.x = 510;
  o.transform.y = 432;
  o.images = [image];
  o.texts = [brand, title, ...notes.map((n) => n[0])];
  o.ingredients = notes.map((n) => n[1]);
  o.timings = notes.map((n) => Math.max(4, f(n[2]) - f(fromS)));
  o.fontFamily = "Noto Naskh Arabic";
  // Real photos win when present (public/products/*-official.png, public/ingredients/<id>.jpg).
  const official = image.replace(".png", "-official.png");
  if (fs.existsSync(`public/${official}`)) o.images = [official];
  const photos = notes.map((n) => `ingredients/${n[1]}.jpg`).filter((x) => fs.existsSync(`public/${x}`));
  if (photos.length) o.bgImages = photos;
  o.shadow = { enabled: true, color: "rgba(0,0,0,0.45)", blur: 44, x: 0, y: 18 };
  o.animation = defaultAnimationSet({
    in: "slideDown",
    inParams: defaultParams({ duration: 10, intensity: 0.5 }),
    out: "fadeOut",
    outParams: defaultParams({ duration: 5 }),
  });
  return o;
};
items.push(
  productCard(12.25, 17.94, "Card · Armani SWY Intensely", "products/armani-stronger-with-you-intensely.png", "EMPORIO ARMANI", "Stronger With You Intensely", [
    ["فانيلا", "vanilla", 14.74],
    ["توفي", "toffee", 15.42],
    ["قرفة", "cinnamon", 16.28],
    ["عنبر", "amber", 16.6],
  ]),
);
items.push(
  productCard(18.18, 21.95, "Card · Burberry Hero Parfum", "products/burberry-hero-parfum.png", "BURBERRY", "Hero Parfum", [
    ["خشب الأرز", "cedar", 19.92],
    ["أميريس", "amyris", 20.2],
    ["سيبريول", "cypriol", 20.5],
  ]),
);

// ---------- sfx ----------
const sfx = (name: string, atS: number, file: string, vol: number) =>
  items.push(createAudioItem({ trackId: T("sfx"), role: "sfx", src: `sfx/${file}`, from: f(atS), durationInFrames: 18, volume: vol, name }));
sfx("hook in", 0.05, "card-slide-3.mp3", 0.22);
sfx("خطأ", 5.76, "impact-soft-heavy-002.mp3", 0.35);
sfx("✕ العود", 8.52, "tick-001.mp3", 0.45);
sfx("✕ الأدهان", 8.94, "tick-001.mp3", 0.45);
sfx("Armani card", 12.25, "card-slide-3.mp3", 0.28);
sfx("فانيلا", 14.74, "notification-pop.mp3", 0.2);
sfx("Hero card", 18.18, "card-slide-3.mp3", 0.28);
sfx("notes Hero", 19.92, "notification-pop.mp3", 0.2);

p.items.push(...items);

// ---------- tighten pauses (all layers ripple together) ----------
const cuts: [number, number][] = [
  [6.25, 6.57],
  [9.59, 9.84],
  [11.955, 12.245],
  [21.957, 22.327],
];
for (const [a, b] of [...cuts].reverse()) rippleRangeInDraft(p, f(a), f(b));
// end right after the last word
const lastWord = 24.95 + 0.15 - cuts.reduce((s, [a, b]) => s + (b - a), 0);
const endF = f(lastWord);
p.items = p.items.filter((i) => i.from < endF);
for (const it of p.items) it.durationInFrames = Math.max(1, Math.min(it.durationInFrames, endF - it.from));
p.durationInFrames = endF;
p.media = [{ id: "m_ray41", name: "ray411.mp4", kind: "video", src: "footage/ray411.mp4", durationInFrames: SRC_FRAMES, width: 1080, height: 1920 }];
p.updatedAt = new Date().toISOString();
fs.writeFileSync("projects/ray41.json", JSON.stringify(p, null, 1));
const caps = p.items.filter((i): i is CaptionItem => i.type === "caption").length;
console.log(`projects/ray41.json · ${(endF / FPS).toFixed(2)}s · ${p.items.length} items · ${caps} captions`);
