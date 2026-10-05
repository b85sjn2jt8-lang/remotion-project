import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the ANUA Birch 70 Moisture Boosting Serum
// commercial: frosted glass condensation, dew drops, lens frost, abstract
// birch trunks and bark, fresh birch micro leaves and a thin serum film.
// Each fills its parent box; scenes position and animate them on an
// <Interactive.Div> so they stay editable in the Studio. `progress`/`t`
// props are driven by inline interpolate() calls in each scene.

// The cut-out bottle (355×887). Scenes set only `width`; height follows.
export const BOTTLE_SRC = "birch70/birch70-bottle.png";
export const BOTTLE_W = 355;
export const BOTTLE_H = 887;

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

// ---------------------------------------------------------- CONDENSATION

type Bead = { x: number; y: number; r: number; p: number; e: number };
const makeBeads = (count: number, seed: number): Bead[] => {
  const rand = rng(seed);
  return new Array(count).fill(0).map(() => {
    const k = rand();
    return {
      x: rand() * 1920,
      y: rand() * 1080,
      r: 1.4 + k * k * k * 11,
      p: rand(),
      e: 0.85 + rand() * 0.3,
    };
  });
};

// Fine condensation beads on a pane of glass in front of the lens, drawn in
// a 1920×1080 box. Beads appear as `progress` goes 0→1. A running drop can
// clear a vertical path: no beads within `clearW`/2 of `clearX` above `clearY`.
export const Condensation: React.FC<{
  progress: number;
  seed?: number;
  count?: number;
  clearX?: number;
  clearY?: number;
  clearW?: number;
}> = ({ progress, seed = 3, count = 1100, clearX = -999, clearY = -999, clearW = 70 }) => {
  const beads = makeBeads(count, seed);
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      {beads.map((b, i) => {
        const v = Math.min(1, Math.max(0, (progress - b.p * 0.85) / 0.15));
        if (v <= 0) return null;
        if (Math.abs(b.x - clearX) < clearW / 2 && b.y < clearY) return null;
        const r = b.r * (0.4 + 0.6 * v);
        return (
          <g key={i} opacity={v}>
            <ellipse cx={b.x} cy={b.y + r * 0.12} rx={r} ry={r * b.e} fill="rgba(110,135,160,0.16)" />
            <ellipse cx={b.x} cy={b.y} rx={r} ry={r * b.e} fill="rgba(255,255,255,0.35)" stroke="rgba(120,145,170,0.28)" strokeWidth={Math.max(0.5, r * 0.16)} />
            <circle cx={b.x - r * 0.32} cy={b.y - r * 0.34} r={r * 0.28} fill="rgba(255,255,255,0.95)" />
          </g>
        );
      })}
    </svg>
  );
};

// The frosted condensation that covers the lens — the first and last frame
// of the film (the loop seam). At `amount` 1 it is opaque soft frost white.
export const LensFrost: React.FC<{ amount: number }> = ({ amount }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backdropFilter: `blur(${amount * 36}px)`,
          background: `radial-gradient(90% 90% at 50% 45%, rgba(248,251,253,${amount}) 0%, rgba(238,244,249,${amount}) 70%, rgba(226,235,243,${amount}) 100%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: amount }}>
        <Condensation progress={1} seed={41} count={700} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A clear dew drop, lit from the top-left. Fills its box; refracts and
// brightens what is behind it.
export const DewDrop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 48% 48% / 54% 54% 46% 46%",
        background:
          "radial-gradient(circle at 50% 70%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 40%, rgba(150,175,200,0.18) 80%, rgba(110,140,170,0.35) 100%)",
        boxShadow:
          "inset 0 -6px 10px rgba(255,255,255,0.8), inset 0 6px 10px rgba(100,130,160,0.3), 0 8px 14px rgba(90,120,150,0.18)",
        backdropFilter: "blur(2px) brightness(1.08)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "20%",
          top: "13%",
          width: "30%",
          height: "20%",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.95)",
          filter: "blur(1px)",
        }}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- BIRCH

// An abstract birch trunk: pale silver-cream bark with soft horizontal
// lenticels and a few dark marks. Drawn upright in a 200×1200 box.
export const BirchTrunk: React.FC<{ seed?: number }> = ({ seed = 2 }) => {
  const id = useId().replace(/:/g, "");
  const rand = rng(seed);
  const marks = new Array(26).fill(0).map(() => ({
    y: rand() * 1200,
    x: 10 + rand() * 120,
    w: 20 + rand() * 70,
    h: 2 + rand() * 5,
    d: rand() < 0.2,
  }));
  return (
    <svg viewBox="0 0 200 1200" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9C6BE" />
          <stop offset="30%" stopColor="#F2EEE6" />
          <stop offset="65%" stopColor="#E6E1D6" />
          <stop offset="100%" stopColor="#B8B6B0" />
        </linearGradient>
      </defs>
      <rect width="200" height="1200" fill={`url(#${id}-g)`} />
      {marks.map((m, i) => (
        <rect
          key={i}
          x={m.x}
          y={m.y}
          width={m.w}
          height={m.h}
          rx={m.h / 2}
          fill={m.d ? "#4A4740" : "#9C978C"}
          opacity={m.d ? 0.55 : 0.5}
        />
      ))}
    </svg>
  );
};

// A close, tactile birch bark surface: papery cream-white with fine fibres,
// horizontal lenticels and a soft sheen. Fills its box (1600×1000 design).
export const BirchBark: React.FC = () => {
  const id = useId().replace(/:/g, "");
  const rand = rng(77);
  const lenticels = new Array(46).fill(0).map(() => ({
    x: rand() * 1600,
    y: rand() * 1000,
    w: 30 + rand() * rand() * 260,
    h: 2.5 + rand() * 6,
    o: 0.18 + rand() * 0.4,
    c: rand() < 0.15,
  }));
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6F3EC" />
          <stop offset="55%" stopColor="#ECE6DA" />
          <stop offset="100%" stopColor="#DCD5C8" />
        </linearGradient>
        <radialGradient id={`${id}-len`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5E584D" />
          <stop offset="60%" stopColor="#8C8577" />
          <stop offset="100%" stopColor="#8C8577" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-fib`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.06" numOctaves="4" seed="12" />
          <feDiffuseLighting surfaceScale="2.4" lightingColor="#FFFFFF" diffuseConstant="1">
            <feDistantLight azimuth="250" elevation="55" />
          </feDiffuseLighting>
          <feColorMatrix values="0 0 0 0 0.62  0 0 0 0 0.6  0 0 0 0 0.55  -0.6 -0.6 -0.6 0 1.1" />
        </filter>
        <filter id={`${id}-mottle`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.006" numOctaves="3" seed="31" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.52  0 0 0 0 0.47  0 0 0 -2.2 1.25" />
        </filter>
        <filter id={`${id}-soft`} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-g)`} />
      <rect width="1600" height="1000" filter={`url(#${id}-mottle)`} opacity="0.35" />
      <rect width="1600" height="1000" filter={`url(#${id}-fib)`} opacity="0.45" />
      <g filter={`url(#${id}-soft)`}>
        {lenticels.map((l, i) => (
          <ellipse
            key={i}
            cx={l.x}
            cy={l.y}
            rx={l.w / 2}
            ry={l.h / 2}
            fill={l.c ? "#3F3A33" : `url(#${id}-len)`}
            opacity={l.c ? l.o * 0.8 : l.o}
          />
        ))}
      </g>
    </svg>
  );
};

// A fresh young birch leaf: ovate with a finely serrated edge, glossy,
// with a midrib and side veins. Drawn tip-down in 300×400 (stalk at top).
export const BirchLeaf: React.FC<{ beads?: boolean }> = ({ beads = true }) => {
  const id = useId().replace(/:/g, "");
  // ovate outline with fine serration, from stalk (150, 20) round to tip (150, 385)
  const pts: string[] = [];
  const n = 72;
  for (let i = 0; i <= n; i++) {
    const u = i / n; // 0..1 down the right side, then mirrored
    const y = 20 + u * 365;
    const w = 128 * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.8)), 0.9) * (1 - 0.25 * u);
    const serr = i % 2 === 0 ? 0 : 5 * Math.sin(Math.PI * u);
    pts.push(`${(150 + w + serr).toFixed(1)} ${y.toFixed(1)}`);
  }
  const left = pts
    .slice()
    .reverse()
    .map((p) => {
      const [x, y] = p.split(" ").map(Number);
      return `${(300 - x).toFixed(1)} ${y.toFixed(1)}`;
    });
  const d = `M ${pts.join(" L ")} L ${left.join(" L ")} Z`;
  return (
    <svg viewBox="0 0 300 400" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9CC873" />
          <stop offset="50%" stopColor="#6FA24B" />
          <stop offset="100%" stopColor="#4C7E34" />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <path d={d} />
        </clipPath>
      </defs>
      <path d={d} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-c)`}>
        <g fill="none" stroke="#C9E4A8" strokeOpacity="0.55" strokeLinecap="round">
          <path d="M 150 20 L 150 385" strokeWidth="3" />
          <path d="M 150 90 L 245 60 M 150 140 L 262 112 M 150 190 L 262 168 M 150 240 L 248 222 M 150 290 L 222 280 M 150 335 L 192 330" strokeWidth="1.6" />
          <path d="M 150 90 L 55 60 M 150 140 L 38 112 M 150 190 L 38 168 M 150 240 L 52 222 M 150 290 L 78 280 M 150 335 L 108 330" strokeWidth="1.6" />
        </g>
        <ellipse cx="110" cy="150" rx="50" ry="110" fill="#FFFFFF" opacity="0.18" transform="rotate(-12 110 150)" />
      </g>
      <path d="M 150 22 L 150 -40" stroke="#7A6A50" strokeWidth="4" strokeLinecap="round" />
      {beads ? (
        <g>
          <circle cx="190" cy="200" r="9" fill="rgba(255,255,255,0.3)" stroke="rgba(40,70,30,0.35)" strokeWidth="1.2" />
          <circle cx="187" cy="197" r="2.8" fill="#FFFFFF" />
          <circle cx="118" cy="270" r="6" fill="rgba(255,255,255,0.3)" stroke="rgba(40,70,30,0.35)" strokeWidth="1" />
          <circle cx="116" cy="268" r="1.9" fill="#FFFFFF" />
        </g>
      ) : null}
    </svg>
  );
};

// ---------------------------------------------------------------- SERUM

// Organic, softly irregular outline of a spreading film, in box px.
// Also used by the serum-spread transition.
export const filmPath = (cx: number, cy: number, r: number, seed: number, t: number) => {
  const rand = rng(seed);
  const ph = [rand() * 6.28, rand() * 6.28, rand() * 6.28];
  const pts: string[] = [];
  const n = 96;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k =
      1 +
      0.07 * Math.sin(a * 3 + ph[0] + t * 0.03) +
      0.04 * Math.sin(a * 5 + ph[1] - t * 0.05) +
      0.02 * Math.sin(a * 9 + ph[2] + t * 0.08);
    pts.push(`${(cx + Math.cos(a) * r * k * 1.25).toFixed(1)} ${(cy + Math.sin(a) * r * k * 0.8).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")} Z`;
};

// A thin, watery, slightly glossy serum layer spreading over frosted glass,
// drawn in a 1920×1080 box from (`cx`, `cy`) with radius `r`. Children (type)
// are only visible where the film has spread.
export const SerumFilm: React.FC<{
  r: number;
  cx?: number;
  cy?: number;
  t?: number;
  seed?: number;
  children?: React.ReactNode;
}> = ({ r, cx = 960, cy = 540, t = 0, seed = 5, children }) => {
  const id = useId().replace(/:/g, "");
  const d = filmPath(cx, cy, Math.max(1, r), seed, t);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `path("${d}")`,
          background:
            "radial-gradient(60% 60% at 40% 35%, rgba(226,238,248,0.5) 0%, rgba(196,218,238,0.34) 60%, rgba(178,206,230,0.42) 100%)",
        }}
      >
        {children}
      </AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <filter id={`${id}-gloss`} filterUnits="userSpaceOnUse" x="-400" y="-400" width="2720" height="1880">
            <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="b" />
            <feSpecularLighting in="b" surfaceScale="9" specularConstant="0.9" specularExponent="26" lightingColor="#FFFFFF" result="s">
              <feDistantLight azimuth="225" elevation="42" />
            </feSpecularLighting>
            <feComposite in="s" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id={`${id}-rim`} filterUnits="userSpaceOnUse" x="-400" y="-400" width="2720" height="1880">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <path d={d} fill="#FFFFFF" filter={`url(#${id}-gloss)`} opacity="0.85" />
        <path d={d} fill="none" stroke="rgba(140,175,205,0.55)" strokeWidth="5" filter={`url(#${id}-rim)`} />
        <path d={d} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
      </svg>
    </AbsoluteFill>
  );
};

// Frosted glass surface seen in macro: pale ice-white with fine grain.
export const FrostedGlass: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4F8FB" />
          <stop offset="60%" stopColor="#E4EDF5" />
          <stop offset="100%" stopColor="#D5E2EE" />
        </linearGradient>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.62  0 0 0 0 0.7  0 0 0 -1.2 0.75" />
        </filter>
      </defs>
      <rect width="1920" height="1080" fill={`url(#${id}-g)`} />
      <rect width="1920" height="1080" filter={`url(#${id}-grain)`} opacity="0.35" />
    </svg>
  );
};
