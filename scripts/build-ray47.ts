/**
 * RAY47: Laytani (Beverly Hills Avenue) as an alternative to Kilian Angels' Share.
 * Full clip, no cuts. npx tsx scripts/build-ray47.ts → projects/ray47.json
 */
import fs from "node:fs";
import { defaultAnimationSet, defaultParams } from "../src/engine/animation/presets";
import { createCaptionItem, createOverlayItem, createTextItem, createVideoItem, emptyProject, uid } from "../src/engine/factory";
import type { Item, Project } from "../src/engine/types";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const SRC_FRAMES = 794;
const p: Project = emptyProject("Ray47 · Laytani vs Angels' Share", "ray47");
const T = (k: string) => p.tracks.find((t) => t.kind === k)!.id;
const items: Item[] = [];
const img = (path: string) => (fs.existsSync(`public/${path}`) ? path : undefined);

// ---------- video: full clip, untouched colors ----------
const v = createVideoItem(p, { trackId: T("video"), src: "footage/ray47.mp4", from: 0, durationInFrames: SRC_FRAMES, name: "RAY47" });
items.push(v);

// ---------- blur the product until 00:10:08 (frame 308), tracking the slow camera drift ----------
const blur = createOverlayItem(p, { trackId: T("broll"), from: 0, shape: "blur" });
blur.name = "Blur · المنتج حتى 10:08";
blur.durationInFrames = 308;
blur.width = 600;
blur.height = 820;
blur.strokeWidth = 34;
blur.transform.x = 520;
blur.transform.y = 1110;
blur.keyframes = {
  y: [
    { frame: 0, value: 1110, easing: "linear" },
    { frame: 150, value: 1100, easing: "easeInOut" },
    { frame: 297, value: 995, easing: "easeInOut" },
    { frame: 307, value: 960, easing: "easeInOut" },
  ],
};
blur.animation = defaultAnimationSet({ in: "none", out: "fadeOut", outParams: defaultParams({ duration: 8 }) });
items.push(blur);

// ---------- Kilian card when he names it (notes pyramid) ----------
const kilian = createOverlayItem(p, { trackId: T("graphics"), from: f(2.26), shape: "productCard" });
kilian.variant = "pyramid";
kilian.name = "Card · Kilian Angels' Share";
kilian.durationInFrames = f(8.6) - f(2.26);
kilian.width = 860;
kilian.height = 400;
kilian.radius = 30;
kilian.transform.x = 510;
kilian.transform.y = 420;
kilian.fontFamily = "Tajawal";
kilian.secondaryColor = "#F0C98A";
kilian.texts = ["KILIAN PARIS", "Angels' Share", "كونياك · خشبي · حلو", "كونياك", "قرفة · تونكا · خشب البلوط", "برالين · فانيلا · صندل"];
kilian.ingredients = ["amber", "cinnamon", "vanilla", "cedar"];
kilian.timings = [10, 14, 18];
kilian.highlights = [-1, -1, -1];
const kilianImg = img("products/kilian-angels-share-official.png");
if (kilianImg) kilian.images = [kilianImg];
kilian.shadow = { enabled: true, color: "rgba(0,0,0,0.4)", blur: 40, x: 0, y: 16 };
kilian.animation = defaultAnimationSet({ in: "slideDown", inParams: defaultParams({ duration: 10, intensity: 0.5 }), out: "fadeOut", outParams: defaultParams({ duration: 6 }) });
items.push(kilian);

// ---------- comparison while he says "ذكّرني بـ Angels' Share… تشابه كبير" ----------
const cmp = createOverlayItem(p, { trackId: T("graphics"), from: f(14.3), shape: "compareCard" });
cmp.name = "Compare · Kilian vs Laytani";
cmp.durationInFrames = f(20.15) - f(14.3);
cmp.width = 880;
cmp.height = 540;
cmp.transform.x = 510;
cmp.transform.y = 520;
cmp.compare = {
  title: "مقارنة المكونات",
  right: { brand: "KILIAN PARIS", name: "Angels' Share", price: "1200 ريال", image: kilianImg, priceColor: "#FF8A80" },
  left: { brand: "BEVERLY HILLS AVENUE", name: "Laytani", price: "150 ريال", image: img("products/laytani-beverly-hills-avenue.png"), priceColor: "#7BE08F" },
  shared: ["كونياك", "قرفة", "تونكا", "فانيلا", "برالين", "خشبي"],
  similarityLabel: "تشابه كبير",
  similarity: 0.88,
};
cmp.timings = [4, f(17.5) - f(14.3), f(19.08) - f(14.3)];
cmp.shadow = { enabled: true, color: "rgba(0,0,0,0.4)", blur: 40, x: 0, y: 16 };
cmp.animation = defaultAnimationSet({ in: "scale", inParams: defaultParams({ duration: 9, intensity: 0.6 }), out: "fadeOut", outParams: defaultParams({ duration: 5 }) });
items.push(cmp);

// ---------- price duel: "150 ريال ولا 1200؟" ----------
const tag = (text: string, atS: number, x: number, bg: string, fg: string, name: string) => {
  const t = createTextItem(p, { trackId: T("overlays"), from: f(atS), variant: "price", text });
  t.durationInFrames = f(23.75) - f(atS);
  t.name = name;
  t.transform.x = x;
  t.transform.y = 560;
  t.style.fontFamily = "Tajawal";
  t.style.fontSize = 74;
  t.style.fontWeight = 800;
  t.style.color = fg;
  t.style.strokeWidth = 0;
  t.style.background = { enabled: true, color: bg, opacity: 1, radius: 26, paddingX: 34, paddingY: 10 };
  t.animation = defaultAnimationSet({ in: "pop", inParams: defaultParams({ duration: 8 }), emphasis: "punch", emphasisParams: defaultParams({ duration: 9, intensity: 0.6 }), out: "fadeOut", outParams: defaultParams({ duration: 5 }) });
  return t;
};
items.push(tag("150 ريال", 21.48, 790, "#1F7A44", "#FFFFFF", "Price · Laytani 150"));
items.push(tag("1200 ريال", 22.86, 250, "#8E1F1F", "#FFFFFF", "Price · Kilian 1200"));
const vs = createTextItem(p, { trackId: T("overlays"), from: f(22.86), variant: "label", text: "ولا" });
vs.durationInFrames = f(23.75) - f(22.86);
vs.transform.y = 560;
vs.style.fontSize = 46;
vs.transform.x = 525;
items.push(vs);

// ---------- captions (source = timeline, nothing cut) ----------
type W = [string, number, number, "e"?];
const groups: W[][] = [
  [["تحدّي", 0, 0.4, "e"], ["أجيب", 0.4, 0.76], ["لك", 0.76, 0.92], ["عطر", 0.92, 1.2]],
  [["ريحته", 1.2, 1.46], ["قريبة", 1.46, 2.08], ["من", 2.08, 2.26], ["Kilian", 2.26, 2.58, "e"], ["Angels' Share", 2.58, 3.14, "e"]],
  [["وبديل", 3.2, 3.9], ["بسعر", 3.9, 4.32], ["أقل", 4.32, 4.68, "e"], ["بكثير", 4.68, 5.22, "e"]],
  [["بدل", 5.22, 5.48], ["ما", 5.48, 5.6], ["تدفع", 5.6, 5.94], ["الألف", 5.94, 6.58, "e"], ["والألفين", 6.58, 7.36, "e"]],
  [["وكمان", 7.36, 8.14], ["الزيوت", 8.14, 8.64], ["الأخرى", 8.64, 9.1]],
  [["هذا", 10.3, 10.68], ["عطر", 10.68, 11.24], ["Laytani", 11.24, 11.84, "e"]],
  [["من", 11.84, 12.26], ["بيفرلي", 12.26, 12.62, "e"], ["هيلز", 12.62, 13.06, "e"]],
  [["أول", 13.06, 13.5], ["ما", 13.5, 13.72], ["شمّيته", 13.72, 14.3]],
  [["ذكّرني", 14.3, 15.08], ["مباشرة", 15.08, 15.72], ["بـAngels' Share", 15.72, 16.64, "e"]],
  [["حتى", 16.64, 16.98], ["لما", 16.98, 17.16], ["بحثت", 17.16, 17.5], ["على", 17.5, 17.62], ["مكونات", 17.62, 18.16], ["العطرين", 18.16, 18.7]],
  [["فيها", 18.7, 19.08], ["تشابه", 19.08, 19.66, "e"], ["كبير", 19.66, 20.06, "e"]],
  [["فأي", 20.2, 20.72], ["شي", 20.72, 20.82], ["أفضل؟", 20.82, 21.4]],
  [["150", 21.48, 21.88, "e"], ["ريال", 21.88, 22.54], ["ولا", 22.54, 22.86], ["1200؟", 22.86, 23.2, "e"]],
  [["احكم", 23.8, 24.42], ["بعقلك", 24.42, 24.92, "e"]],
  [["وتعال", 24.92, 25.58], ["زورنا", 25.58, 25.96], ["بالموقع", 25.96, 26.36, "e"]],
];
groups.forEach((g, gi) => {
  const from = f(g[0][1]);
  const next = groups[gi + 1];
  const endF = Math.min(next ? f(next[0][1]) : SRC_FRAMES, f(g[g.length - 1][2]) + 12);
  const c = createCaptionItem(p, {
    trackId: T("captions"),
    from,
    durationInFrames: Math.max(1, endF - from),
    presetId: "phrase-by-phrase",
    words: g.map(([text, s, e, fl]) => ({ id: uid("w"), text, start: +(s * FPS - from).toFixed(2), end: +(e * FPS - from).toFixed(2), ...(fl ? { emphasis: true } : {}) })),
  });
  // House caption style: bold white Tajawal on a dark translucent pill, key words in gold.
  c.style.fontFamily = "Tajawal";
  c.style.fontWeight = 800;
  c.style.fontSize = 54;
  c.style.lineHeight = 1.3;
  c.style.emphasisScale = 1;
  c.style.emphasisOwnLine = false;
  c.style.textColor = "#FFFFFF";
  c.style.emphasisColor = "#F5B83D";
  c.style.strokeWidth = 0;
  c.style.shadow = { enabled: false, color: "rgba(0,0,0,0.4)", blur: 20, x: 0, y: 6 };
  c.style.background = { enabled: true, color: "#000000", opacity: 0.62, radius: 18, paddingX: 24, paddingY: 6 };
  c.style.maxWidth = 860;
  c.style.reveal = "phrase";
  c.animation.in = "fade";
  c.animation.inParams = defaultParams({ duration: 3 });
  c.transform.y = 1420;
  items.push(c);
});

p.items = items;
p.durationInFrames = SRC_FRAMES;
p.media = [{ id: "m_ray47", name: "ray47.mp4", kind: "video", src: "footage/ray47.mp4", durationInFrames: SRC_FRAMES, width: 1080, height: 1920 }];
p.updatedAt = new Date().toISOString();
fs.writeFileSync("projects/ray47.json", JSON.stringify(p, null, 1));
console.log(`projects/ray47.json · ${(SRC_FRAMES / FPS).toFixed(2)}s · ${items.length} items`);
