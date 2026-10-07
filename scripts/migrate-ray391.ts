/**
 * Migrates the hand-coded Ray391 edit (src/videos/Ray391) into an editor project:
 *   npx tsx scripts/migrate-ray391.ts   → projects/ray391.json
 * The original composition stays untouched; this only creates editable data.
 */
import fs from "node:fs";
import {
  defaultAnimationSet,
  defaultParams,
} from "../src/engine/animation/presets";
import {
  createAudioItem,
  createCaptionItem,
  createComponentItem,
  createVideoItem,
  emptyProject,
  uid,
} from "../src/engine/factory";
import type { CaptionWord, Item, Project } from "../src/engine/types";

type SrcWord = {
  text: string;
  startMs: number;
  endMs: number;
  emphasis?: boolean;
  tone?: "negative";
  pageBreakAfter?: boolean;
};

const FPS = 30;
const toF = (ms: number) => (ms / 1000) * FPS;
const p: Project = emptyProject("Ray391 · Jean Paul Gaultier", "ray391");
p.global.accentColor = "#F2B33D";
p.global.captionY = 610;
const track = (kind: string) => p.tracks.find((t) => t.kind === kind)!.id;

const items: Item[] = [];

// 1) Video clips (locked base cut, punch-ins per sentence) — from Ray391Video.tsx
const clips: [string, number, number, number, number, number][] = [
  ["Clip 1 · Hook", 0, 138, 1, 50, 50],
  ["Clip 2 · كذّابة", 138, 50, 1.12, 50, 45],
  ["Clip 3 · كود الخصم", 188, 164, 1, 50, 50],
  ["Clip 4 · طيّرنا المربح", 352, 65, 1.08, 45, 60],
  ["Clip 5 · جان بول", 417, 94, 1.16, 44, 60],
  ["Clip 6 · الخصم", 511, 121, 1, 50, 50],
  ["Clip 7 · 420", 632, 57, 1.12, 46, 60],
  ["Clip 8 · جبّار", 689, 48, 1.2, 46, 58],
  ["Clip 9 · العطور", 737, 84, 1, 50, 50],
  ["Clip 10 · الأقل", 821, 95, 1.1, 47, 58],
];
for (const [name, start, dur, scale, ox, oy] of clips) {
  const v = createVideoItem(p, {
    trackId: track("video"),
    src: "footage/ray391.mp4",
    from: start,
    durationInFrames: dur,
    trimBefore: start,
    name,
  });
  v.transform.scale = scale;
  v.origin = { x: ox, y: oy };
  v.adjust = { contrast: 1.04, saturation: 1.05, brightness: 1 };
  if (start === 0) {
    v.keyframes = {
      scale: [
        { frame: 0, value: 1, easing: "linear" },
        { frame: 137, value: 1.06, easing: "linear" },
      ],
    };
    v.motionPreset = "slowZoom";
  }
  items.push(v);
}

// 2) Captions: one caption item per authored group (pageBreakAfter)
const words: SrcWord[] = JSON.parse(
  fs.readFileSync("public/captions/ray391.json", "utf8"),
);
const groups: SrcWord[][] = [[]];
for (const w of words) {
  groups[groups.length - 1].push(w);
  if (w.pageBreakAfter) groups.push([]);
}
const pages = groups.filter((g) => g.length);
pages.forEach((g, i) => {
  const from = Math.round(toF(g[0].startMs));
  const next = pages[i + 1];
  const endMs = Math.min(
    next ? next[0].startMs : Infinity,
    g[g.length - 1].endMs + 400,
  );
  const end = Math.round(toF(endMs));
  const cw: CaptionWord[] = g.map((w) => ({
    id: uid("w"),
    text: w.text,
    start: +(toF(w.startMs) - from).toFixed(2),
    end: +(toF(w.endMs) - from).toFixed(2),
    ...(w.emphasis ? { emphasis: true } : {}),
    ...(w.tone ? { tone: w.tone } : {}),
  }));
  const c = createCaptionItem(p, {
    trackId: track("captions"),
    from,
    durationInFrames: Math.max(1, end - from),
    words: cw,
    presetId: "keyword-focus",
  });
  // Match the look of the original ArabicCaptions component.
  c.style.fontSize = 74;
  c.style.emphasisScale = 118 / 74;
  c.style.strokeWidth = 10;
  c.style.lineHeight = 1.2;
  c.animation = defaultAnimationSet({
    in: "wordReveal",
    inParams: defaultParams({ duration: 4, intensity: 0.9 }),
    emphasis: "punch",
    emphasisParams: defaultParams({ duration: 8, intensity: 0.8 }),
  });
  c.transform.y = 610;
  items.push(c);
});

// 3) Code-built graphics
const comps: [string, string, number, number][] = [
  ["ray391.hookPrices", "Hook · fake prices", 0, 186],
  ["ray391.coupon", "Coupon 15%", 210, 66],
  ["ray391.compare", "Cheapest vs original", 296, 66],
  ["ray391.price", "Price 500 → 420", 425, 304],
];
for (const [componentId, name, from, dur] of comps) {
  items.push(
    createComponentItem(p, {
      trackId: track("graphics"),
      componentId,
      name,
      from,
      durationInFrames: dur,
    }),
  );
}

// 4) SFX
const sfx: [string, number, string, number][] = [
  ["pop 49", 85, "notification-pop.mp3", 0.3],
  ["strike كذّابة", 150, "impact-soft-heavy-002.mp3", 0.4],
  ["coupon in", 210, "card-slide-3.mp3", 0.3],
  ["15% lands", 258, "impact-generic-light-002.mp3", 0.35],
  ["✕ أرخص سعر", 319, "tick-001.mp3", 0.5],
  ["✓ الأصلي", 340, "notification-pop.mp3", 0.25],
  ["500 appears", 456, "notification-pop.mp3", 0.25],
  ["−75 chip", 576, "tick-001.mp3", 0.45],
  ["420 lands", 683, "impact-punch-medium-003.mp3", 0.35],
];
for (const [name, from, file, vol] of sfx) {
  items.push(
    createAudioItem({
      trackId: track("sfx"),
      role: "sfx",
      src: `sfx/${file}`,
      from,
      durationInFrames: 20,
      volume: vol,
      name,
    }),
  );
}

p.items = items;
p.durationInFrames = 916;
p.media = [
  {
    id: "m_footage",
    name: "ray391.mp4",
    kind: "video",
    src: "footage/ray391.mp4",
    durationInFrames: 922,
    width: 1080,
    height: 1920,
  },
];
p.updatedAt = new Date().toISOString();
fs.mkdirSync("projects", { recursive: true });
fs.writeFileSync("projects/ray391.json", JSON.stringify(p, null, 1));
console.log(
  `projects/ray391.json — ${items.length} items, ${pages.length} captions`,
);
