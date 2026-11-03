/**
 * RAY47: Laytani (Beverly Hills Avenue) as an alternative to Kilian Angels' Share.
 * Full clip, no cuts. npx tsx scripts/build-ray47.ts → projects/ray47.json
 */
import fs from "node:fs";
import { defaultAnimationSet, defaultParams } from "../src/engine/animation/presets";
import { createAudioItem, createCaptionItem, createImageItem, createOverlayItem, createTextItem, createVideoItem, emptyProject, uid } from "../src/engine/factory";
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
// Colors exactly as delivered: no picture adjustment at all.
v.adjust = { contrast: 1, saturation: 1, brightness: 1 };
// Reveal (option 2): quick punch-in on the product at 00:10:08, back to wide when the comparison starts.
v.origin = { x: 48, y: 46 };
v.keyframes = {
  scale: [
    { frame: 307, value: 1, easing: "linear" },
    { frame: 313, value: 1.14, easing: "easeOut" },
    { frame: f(14.3) - 1, value: 1.14, easing: "linear" },
    { frame: f(14.3), value: 1, easing: "linear" },
  ],
};
items.push(v);

// ---------- blur the product until 00:10:08 (frame 308), tracking the slow camera drift ----------
const blur = createOverlayItem(p, { trackId: T("broll"), from: 0, shape: "blur" });
blur.name = "Blur · المنتج حتى 10:08";
blur.durationInFrames = 308;
blur.width = 680;
blur.height = 900;
blur.strokeWidth = 60; // option 2: strong blur (user choice)
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
blur.animation = defaultAnimationSet({ in: "none", out: "quickDisappear", outParams: defaultParams({ duration: 3 }) });
items.push(blur);

// reveal whoosh
items.push(createAudioItem({ trackId: T("sfx"), role: "sfx", src: "sfx/card-slide-3.mp3", from: 304, durationInFrames: 20, volume: 0.35, name: "Reveal whoosh" }));

// ---------- product name (option 4): gold arrow to the bottle + name ----------
{
  const FROM = 337;
  const DUR = f(13.06) - FROM + 10;
  const arrow = createOverlayItem(p, { trackId: T("overlays"), from: FROM + 4, shape: "arrow" });
  arrow.name = "Arrow · Laytani";
  arrow.durationInFrames = DUR - 4;
  arrow.width = 260;
  arrow.height = 120;
  arrow.strokeWidth = 12;
  arrow.color = "#F5B83D";
  arrow.transform.x = 760;
  arrow.transform.y = 640;
  arrow.transform.rotation = 120;
  items.push(arrow);
  const name = (text: string, y: number, size: number, weight: number, color: string, label: string) => {
    const t = createTextItem(p, { trackId: T("overlays"), from: FROM, variant: "label", text });
    t.name = label;
    t.durationInFrames = DUR;
    t.transform.x = 790;
    t.transform.y = y;
    t.style.fontFamily = "Montserrat";
    t.style.fontSize = size;
    t.style.fontWeight = weight;
    t.style.color = color;
    t.style.letterSpacing = 0.02;
    t.style.background.enabled = false;
    t.style.shadow = { enabled: true, color: "rgba(0,0,0,0.6)", blur: 18, x: 0, y: 4 };
    t.animation = defaultAnimationSet({ in: "pop", inParams: defaultParams({ duration: 8 }), out: "fadeOut", outParams: defaultParams({ duration: 5 }) });
    items.push(t);
  };
  name("LAYTANI", 470, 64, 800, "#FFFFFF", "Name · LAYTANI");
  name("Beverly Hills Avenue", 530, 30, 600, "#F5B83D", "Name · Beverly Hills Avenue");
}

// ---------- Kilian (option 6): dark banner, real bottle, name, key notes ----------
const kilianImg = img("products/kilian-angels-share-official.png");
{
  const FROM = f(2.26);
  const END = f(8.6);
  const anim = () =>
    defaultAnimationSet({ in: "fade", inParams: defaultParams({ duration: 8 }), out: "fadeOut", outParams: defaultParams({ duration: 6 }) });
  const panel = createTextItem(p, { trackId: T("text"), from: FROM, variant: "label", text: " " });
  panel.name = "Kilian · panel";
  panel.durationInFrames = END - FROM;
  panel.transform.x = 510;
  panel.transform.y = 450;
  panel.style.background = { enabled: true, color: "#0E0B08", opacity: 0.78, radius: 30, paddingX: 420, paddingY: 150 };
  panel.style.shadow.enabled = false;
  panel.animation = anim();
  items.push(panel);
  if (kilianImg) {
    const b = createImageItem(p, { trackId: T("graphics"), src: kilianImg, from: FROM, durationInFrames: END - FROM, width: Math.round((260 * 696) / 858), height: 260 });
    b.name = "Kilian · bottle";
    b.transform.x = 280;
    b.transform.y = 450;
    b.radius = 0;
    b.shadow.enabled = false;
    b.fit = "contain";
    b.animation = defaultAnimationSet({ in: "pop", inParams: defaultParams({ duration: 9 }), out: "fadeOut", outParams: defaultParams({ duration: 6 }) });
    items.push(b);
  }
  const line = (text: string, y: number, set: (t: ReturnType<typeof createTextItem>) => void, name: string) => {
    const t = createTextItem(p, { trackId: T("overlays"), from: FROM + 4, variant: "label", text });
    t.name = name;
    t.durationInFrames = END - FROM - 4;
    t.transform.x = 650;
    t.transform.y = y;
    t.style.fontFamily = "Montserrat";
    t.style.fontWeight = 800;
    t.style.letterSpacing = 0.02;
    t.style.color = "#FFFFFF";
    t.style.background.enabled = false;
    t.style.shadow = { enabled: true, color: "rgba(0,0,0,0.65)", blur: 18, x: 0, y: 4 };
    t.animation = anim();
    set(t);
    items.push(t);
  };
  line("KILIAN PARIS", 390, (t) => { t.style.fontSize = 28; t.style.letterSpacing = 0.3; t.style.color = "#F5B83D"; t.style.fontWeight = 600; }, "Kilian · brand");
  line("Angels' Share", 450, (t) => { t.style.fontSize = 58; }, "Kilian · name");
  line("كونياك · قرفة · فانيلا", 520, (t) => { t.style.fontFamily = "Tajawal"; t.style.fontSize = 36; t.style.fontWeight = 500; t.style.color = "#F6E7CF"; }, "Kilian · notes");
}

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
  left: { brand: "BEVERLY HILLS AVENUE", name: "Laytani", price: "150 ريال", image: img("products/laytani-beverly-hills-avenue-official.png") ?? img("products/laytani-beverly-hills-avenue.png"), priceColor: "#7BE08F" },
  // Real overlap from the published notes: vanilla + sandalwood in both bases, warm spices
  // (Kilian: cinnamon · Laytani: cardamom, pepper) and woods (Kilian: oak · Laytani: guaiac, sandalwood).
  shared: ["فانيلا", "صندل", "توابل دافئة", "أخشاب"],
  similarityLabel: "تشابه كبير",
  similarity: 0.88,
};
cmp.timings = [4, f(17.5) - f(14.3), f(19.08) - f(14.3)];
cmp.shadow = { enabled: true, color: "rgba(0,0,0,0.4)", blur: 40, x: 0, y: 16 };
cmp.animation = defaultAnimationSet({ in: "scale", inParams: defaultParams({ duration: 9, intensity: 0.6 }), out: "fadeOut", outParams: defaultParams({ duration: 5 }) });
items.push(cmp);

// ---------- price duel (option 6, smaller): ✓ 150 ريال vs ✕ 1200 ريال ----------
{
  const from = f(21.48) - 6;
  const duel = createOverlayItem(p, { trackId: T("graphics"), from, shape: "comparisonCard" });
  duel.name = "Price · 150 vs 1200";
  duel.durationInFrames = f(23.75) - from;
  duel.texts = ["150 ريال", "1200 ريال"];
  duel.color = "#1F7A44";
  duel.secondaryColor = "#FFFFFF";
  duel.fontFamily = "Tajawal";
  duel.width = 600;
  duel.height = 170;
  duel.radius = 22;
  duel.transform.x = 510;
  duel.transform.y = 560;
  items.push(duel);
}

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
