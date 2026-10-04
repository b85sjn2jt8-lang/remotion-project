import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the ANUA Heartleaf cleansing-foam commercial:
// rich white foam, an abstract pore surface, translucent heartleaf
// silhouettes, sage glass, water and droplets. Each fills its parent box;
// scenes position and animate them on an <Interactive.Div> so they stay
// editable in the Studio. `t` props (frames) are driven by inline
// interpolate() calls in each scene.

// The cut-out tube (719×1795). Scenes set only `width`; height follows.
export const TUBE_SRC = "heartleaf/anua-heartleaf-tube.png";

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

// ---------------------------------------------------------------- FOAM

type Bub = { x: number; y: number; r: number; p: number };
const makeBubbles = (count: number, seed: number, w: number, h: number): Bub[] => {
  const rand = rng(seed);
  return new Array(count).fill(0).map(() => {
    const k = rand();
    return {
      x: rand() * w,
      y: rand() * h,
      // mostly fine micro-bubbles, a few larger ones
      r: 1.2 + k * k * k * k * 8,
      p: rand() * Math.PI * 2,
    };
  });
};

// Lumpy foam edge: soft peaks of different sizes, never perfect circles.
const lumpy = (len: number, base: number, amp: number, phase: number, seed: number) => {
  const rand = rng(seed);
  const pts: string[] = [];
  const n = 90;
  const freqs = [rand() * 2 + 3, rand() * 4 + 8, rand() * 8 + 17];
  for (let i = 0; i <= n; i++) {
    const s = (i / n) * len;
    const u = i / n;
    const v =
      amp *
      (0.55 * Math.abs(Math.sin(u * Math.PI * freqs[0] + phase * 0.3)) +
        0.3 * Math.abs(Math.sin(u * Math.PI * freqs[1] - phase * 0.5 + 1)) +
        0.15 * Math.abs(Math.sin(u * Math.PI * freqs[2] + phase)));
    pts.push(`${s.toFixed(1)} ${(base - v).toFixed(1)}`);
  }
  return pts;
};

// A mass of rich cleansing foam, drawn at its real size `w`×`h` (box px) so
// bubbles stay round. The lumpy, peaked edge faces `edge`; the body is dense
// micro-bubble texture with soft shading and wet highlights. `t` makes the
// bubbles breathe and the peaks shift.
export const FoamMass: React.FC<{
  t: number;
  w: number;
  h: number;
  edge?: "left" | "right" | "both" | "top" | "none";
  seed?: number;
  bubbleScale?: number;
}> = ({ t, w, h, edge = "left", seed = 1, bubbleScale = 1 }) => {
  const id = useId().replace(/:/g, "");
  const amp = Math.min(90, h * 0.22, w * 0.22);
  let d = `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`;
  if (edge === "top") {
    d = `M ${lumpy(w, amp + 10, amp, t * 0.05, seed).join(" L ")} L ${w} ${h} L 0 ${h} Z`;
  } else if (edge === "both") {
    const L = lumpy(h, amp + 10, amp, t * 0.05, seed).map((pt) => {
      const [a, b] = pt.split(" ").map(Number);
      return `${b.toFixed(1)} ${a.toFixed(1)}`;
    });
    const R = lumpy(h, amp + 10, amp, t * 0.05 + 2, seed + 1)
      .map((pt) => {
        const [a, b] = pt.split(" ").map(Number);
        return `${(w - b).toFixed(1)} ${a.toFixed(1)}`;
      })
      .reverse();
    d = `M ${L.join(" L ")} L ${R.join(" L ")} Z`;
  } else if (edge === "left" || edge === "right") {
    const pts = lumpy(h, amp + 10, amp, t * 0.05, seed).map((pt) => {
      const [a, b] = pt.split(" ").map(Number);
      // a runs along the edge (y), b is depth into the foam (x)
      return edge === "left" ? `${b.toFixed(1)} ${a.toFixed(1)}` : `${(w - b).toFixed(1)} ${a.toFixed(1)}`;
    });
    d =
      edge === "left"
        ? `M ${pts.join(" L ")} L ${w} ${h} L ${w} 0 Z`
        : `M ${pts.join(" L ")} L 0 ${h} L 0 0 Z`;
  }
  const count = Math.min(2600, Math.round((w * h) / 1300));
  const bubbles = makeBubbles(count, seed * 7 + 3, w, h);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={d} />
        </clipPath>
        <radialGradient id={`${id}-shade`} cx="40%" cy="35%" r="85%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F6F8F2" />
          <stop offset="100%" stopColor="#E1E7DA" />
        </radialGradient>
        <filter id={`${id}-gloss`} filterUnits="userSpaceOnUse" x={-500} y={-500} width={w + 1000} height={h + 1000}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="16" result="b" />
          <feSpecularLighting in="b" surfaceScale="10" specularConstant="0.7" specularExponent="18" lightingColor="#FFFFFF" result="s">
            <feDistantLight azimuth="230" elevation="50" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
          <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
        </filter>
        <filter id={`${id}-peaks`} filterUnits="userSpaceOnUse" x={0} y={0} width={w} height={h}>
          <feTurbulence type="fractalNoise" baseFrequency="0.0045" numOctaves="4" seed={seed} />
          <feDiffuseLighting surfaceScale="34" lightingColor="#FFFFFF" diffuseConstant="1.05">
            <feDistantLight azimuth="230" elevation="48" />
          </feDiffuseLighting>
          <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.56  0 0 0 0 0.48  -0.55 -0.55 -0.55 0 1.25" />
        </filter>
      </defs>
      <g filter={`url(#${id}-gloss)`}>
        <path d={d} fill={`url(#${id}-shade)`} />
      </g>
      <g clipPath={`url(#${id}-clip)`}>
        {/* soft peaks and valleys across the foam body */}
        <rect width={w} height={h} filter={`url(#${id}-peaks)`} opacity="0.85" />
        {bubbles.map((b, i) => {
          const r = b.r * bubbleScale * (1 + 0.14 * Math.sin(t * 0.18 + b.p));
          return (
            <g key={i}>
              <circle
                cx={b.x}
                cy={b.y}
                r={r}
                fill="rgba(255,255,255,0.3)"
                stroke="rgba(120,138,116,0.32)"
                strokeWidth={Math.max(0.5, r * 0.14)}
              />
              <circle cx={b.x - r * 0.35} cy={b.y - r * 0.35} r={r * 0.3} fill="rgba(255,255,255,0.95)" />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------- PORES

type Pore = { x: number; y: number; r: number; dirty: boolean; s: number };
const makePores = (seed: number): Pore[] => {
  const rand = rng(seed);
  const pores: Pore[] = [];
  // Loose jittered grid so pores feel organic but evenly spread.
  for (let gy = 0; gy < 9; gy++) {
    for (let gx = 0; gx < 16; gx++) {
      if (rand() < 0.22) continue;
      pores.push({
        x: (gx + 0.2 + rand() * 0.6) * 160,
        y: (gy + 0.2 + rand() * 0.6) * 160,
        r: 5 + rand() * rand() * 16,
        dirty: rand() < 0.26,
        s: rand(),
      });
    }
  }
  return pores;
};

// Abstract cosmetic skin surface (2560×1440 box): soft ivory-green with
// fine texture and shallow round pore depressions lit from the top-left.
// Some pores hold translucent impurity particles; a pore is cleaned once
// `cleanX` (box px) has passed it, or everywhere when `clean` is 1.
export const PoreSurface: React.FC<{
  cleanX?: number;
  clean?: number;
  sheen?: number;
}> = ({ cleanX = -1, clean = 0, sheen = 0 }) => {
  const id = useId().replace(/:/g, "");
  const pores = makePores(29);
  return (
    <svg viewBox="0 0 2560 1440" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3F4EA" />
          <stop offset="55%" stopColor="#E6EBDD" />
          <stop offset="100%" stopColor="#D5DEC9" />
        </linearGradient>
        <radialGradient id={`${id}-pore`} cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#B7C2AC" />
          <stop offset="60%" stopColor="#CDD6C2" />
          <stop offset="100%" stopColor="#E3E9DA" />
        </radialGradient>
        <filter id={`${id}-tex`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="4" seed="4" />
          <feDiffuseLighting surfaceScale="2.6" lightingColor="#FFFFFF" diffuseConstant="1">
            <feDistantLight azimuth="230" elevation="58" />
          </feDiffuseLighting>
          <feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.66  0 0 0 0 0.56  -0.33 -0.33 -0.33 0 0.62" />
        </filter>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <rect width="2560" height="1440" fill={`url(#${id}-skin)`} />
      <rect width="2560" height="1440" filter={`url(#${id}-tex)`} opacity="0.9" />
      {pores.map((p, i) => {
        const dirtyNow = p.dirty && clean < 1 && p.x > cleanX;
        return (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <ellipse rx={p.r * 1.25} ry={p.r} fill="rgba(255,255,255,0.7)" transform="translate(2.5 3)" filter={`url(#${id}-soft)`} />
            <ellipse rx={p.r} ry={p.r * 0.82} fill={`url(#${id}-pore)`} />
            {dirtyNow ? (
              <g opacity={0.75 * (1 - clean)}>
                <ellipse rx={p.r * 0.55} ry={p.r * 0.42} fill="rgba(70,66,48,0.55)" filter={`url(#${id}-soft)`} />
                <circle cx={-p.r * 0.2} cy={-p.r * 0.1} r={p.r * 0.16} fill="rgba(60,52,36,0.6)" />
                <circle cx={p.r * 0.25} cy={p.r * 0.12} r={p.r * 0.11} fill="rgba(80,74,52,0.5)" />
              </g>
            ) : null}
          </g>
        );
      })}
      <rect
        width="2560"
        height="1440"
        fill="#FFFFFF"
        opacity={0.18 * sheen}
      />
    </svg>
  );
};

// ---------------------------------------------------------------- LEAF

// A translucent heartleaf (Houttuynia cordata) silhouette: cordate blade
// with its curved veins, like backlit frosted glass.
export const HeartLeaf: React.FC<{ tone?: "glass" | "shadow" }> = ({
  tone = "glass",
}) => {
  const id = useId().replace(/:/g, "");
  const blade =
    "M 500 170 C 560 70 760 40 860 160 C 960 290 900 520 760 690 C 660 810 560 900 500 990 C 440 900 340 810 240 690 C 100 520 40 290 140 160 C 240 40 440 70 500 170 Z";
  const glass = tone === "glass";
  return (
    <svg viewBox="0 0 1000 1000" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={glass ? "#E9F1E1" : "#3E5A44"} stopOpacity={glass ? 0.75 : 0.5} />
          <stop offset="55%" stopColor={glass ? "#A9C29E" : "#2F4A36"} stopOpacity={glass ? 0.5 : 0.45} />
          <stop offset="100%" stopColor={glass ? "#6F9172" : "#22382A"} stopOpacity={glass ? 0.65 : 0.5} />
        </linearGradient>
      </defs>
      <path d={blade} fill={`url(#${id}-g)`} stroke={glass ? "rgba(255,255,255,0.75)" : "none"} strokeWidth="5" />
      <g
        fill="none"
        stroke={glass ? "rgba(255,255,255,0.55)" : "rgba(30,50,36,0.35)"}
        strokeWidth="6"
        strokeLinecap="round"
      >
        <path d="M 500 175 C 505 400 505 700 500 985" />
        <path d="M 500 190 C 380 300 300 520 330 760" />
        <path d="M 500 190 C 620 300 700 520 670 760" />
        <path d="M 500 200 C 300 260 190 400 200 560" />
        <path d="M 500 200 C 700 260 810 400 800 560" />
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------- GLASS & WATER

// Wet, translucent sage-glass platform: lit top face, refracting front.
export const SageGlass: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          top: "22%",
          borderRadius: 14,
          background:
            "linear-gradient(180deg, rgba(220,234,214,0.8) 0%, rgba(160,190,155,0.6) 50%, rgba(110,145,112,0.65) 100%)",
          border: "2px solid rgba(255,255,255,0.7)",
          boxShadow:
            "inset 0 14px 30px rgba(255,255,255,0.5), inset 0 -24px 40px rgba(40,70,48,0.25), 0 40px 60px rgba(40,60,45,0.22)",
          backdropFilter: "blur(8px)",
        }}
      />
      <AbsoluteFill
        style={{
          height: "28%",
          clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(180deg, rgba(248,252,245,0.95) 0%, rgba(214,230,206,0.9) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// A clear water droplet.
export const Droplet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 48% 48% / 54% 54% 46% 46%",
        background:
          "radial-gradient(circle at 50% 66%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 42%, rgba(40,70,48,0.16) 82%, rgba(25,45,30,0.32) 100%)",
        boxShadow:
          "inset 0 -5px 8px rgba(255,255,255,0.75), inset 0 5px 7px rgba(25,50,32,0.28), 0 6px 10px rgba(25,50,32,0.16)",
        backdropFilter: "blur(1.5px) brightness(1.08)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "22%",
          top: "14%",
          width: "28%",
          height: "20%",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.95)",
          filter: "blur(0.8px)",
        }}
      />
    </AbsoluteFill>
  );
};
