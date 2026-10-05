import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the NATURE SEVEN GREEN shampoo-bar commercial:
// wet botanical leaves, biota (arborvitae) sprays, dark wet stone, mist,
// thin gold triangle light and droplets. Each fills its parent box; scenes
// position and animate them on an <Interactive.Div> so they stay editable in
// the Studio. `t`/`progress` props are driven by inline interpolate() calls.

// The cut-out package (709×615). Scenes set only `width`; height follows.
export const PACKAGE_SRC = "sevengreen/sevengreen-package.png";
// Package triangle corners in its own 709×615 pixel space (measured).
export const PKG_W = 709;
export const PKG_H = 615;

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

// A wet, lanceolate leaf (isatis / woad-like) with fine vein texture,
// a satin sheen and a few clinging water beads. Drawn tip-up in 400×1000.
export const Leaf: React.FC<{ tone?: "deep" | "fresh" | "silhouette"; beads?: boolean }> = ({
  tone = "deep",
  beads = true,
}) => {
  const id = useId().replace(/:/g, "");
  const blade =
    "M 200 20 C 290 160 350 380 340 600 C 332 760 270 900 200 985 C 130 900 68 760 60 600 C 50 380 110 160 200 20 Z";
  const c =
    tone === "fresh"
      ? ["#5E8F4E", "#2F5A2E", "#1C3B20"]
      : tone === "silhouette"
        ? ["#0E2318", "#0A1A12", "#06110B"]
        : ["#2F5B3C", "#173826", "#0B2116"];
  return (
    <svg viewBox="0 0 400 1000" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor={c[2]} />
          <stop offset="45%" stopColor={c[0]} />
          <stop offset="100%" stopColor={c[1]} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={blade} />
        </clipPath>
        <filter id={`${id}-tex`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.09" numOctaves="3" seed="3" />
          <feDiffuseLighting surfaceScale="2.2" lightingColor="#FFFFFF" diffuseConstant="1">
            <feDistantLight azimuth="235" elevation="55" />
          </feDiffuseLighting>
          <feColorMatrix values="0 0 0 0 0.75  0 0 0 0 0.9  0 0 0 0 0.75  -0.5 -0.5 -0.5 0 1.15" />
        </filter>
      </defs>
      <path d={blade} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="400" height="1000" filter={`url(#${id}-tex)`} opacity={tone === "silhouette" ? 0.15 : 0.45} />
        <g fill="none" stroke={tone === "silhouette" ? "#16301F" : "#9CC08A"} strokeOpacity={tone === "silhouette" ? 0.4 : 0.45} strokeLinecap="round">
          <path d="M 200 30 C 205 300 205 700 200 985" strokeWidth="6" />
          <path d="M 202 220 C 250 260 290 320 320 400" strokeWidth="2.5" />
          <path d="M 198 220 C 150 260 110 320 80 400" strokeWidth="2.5" />
          <path d="M 203 400 C 260 440 300 510 330 590" strokeWidth="2.5" />
          <path d="M 197 400 C 140 440 100 510 70 590" strokeWidth="2.5" />
          <path d="M 203 600 C 250 640 285 700 310 780" strokeWidth="2.2" />
          <path d="M 197 600 C 150 640 115 700 90 780" strokeWidth="2.2" />
          <path d="M 202 780 C 235 820 255 870 265 920" strokeWidth="2" />
          <path d="M 198 780 C 165 820 145 870 135 920" strokeWidth="2" />
        </g>
        <ellipse cx="140" cy="380" rx="60" ry="260" fill="#FFFFFF" opacity={tone === "silhouette" ? 0.03 : 0.12} transform="rotate(8 140 380)" />
      </g>
      {beads && tone !== "silhouette" ? (
        <g>
          {[
            [255, 480, 12],
            [150, 640, 9],
            [235, 760, 15],
            [170, 300, 7],
          ].map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill="rgba(200,230,200,0.18)" stroke="rgba(10,30,18,0.4)" strokeWidth="1.2" />
              <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.3} fill="rgba(255,255,255,0.9)" />
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
};

// A flat spray of biota (arborvitae) foliage — the "cacumen biotae" of the
// product — built from chains of tiny scale-leaves. Drawn stem-down in
// 600×900. Used backlit (`glow`) or as a soft botanical shadow.
type Seg = { x: number; y: number; a: number; s: number };
const sprayGeometry = (seed: number) => {
  const rand = rng(seed);
  const segs: Seg[] = [];
  const branch = (x: number, y: number, a: number, len: number, depth: number) => {
    let cx = x;
    let cy = y;
    let ca = a;
    for (let i = 0; i < len; i++) {
      const s = 16 * Math.pow(0.82, depth) * (1 - i / (len * 1.4));
      segs.push({ x: cx, y: cy, a: ca, s });
      cx += Math.sin(ca) * s * 1.5;
      cy -= Math.cos(ca) * s * 1.5;
      ca += (rand() - 0.5) * 0.08;
      if (depth < 2 && i > 1 && i % 2 === 0) {
        const side = i % 4 === 0 ? 1 : -1;
        branch(cx, cy, ca + side * (0.75 + rand() * 0.25), Math.max(3, Math.floor((len - i) * 0.7)), depth + 1);
      }
    }
  };
  branch(300, 880, 0, 26, 0);
  return segs;
};

export const BiotaSpray: React.FC<{ tone?: "glow" | "shadow" | "deep"; seed?: number }> = ({
  tone = "deep",
  seed = 7,
}) => {
  const id = useId().replace(/:/g, "");
  const segs = sprayGeometry(seed);
  const fill = tone === "glow" ? `url(#${id}-g)` : tone === "shadow" ? "#06150D" : "#1E4430";
  return (
    <svg viewBox="0 0 600 900" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3F7A4A" />
          <stop offset="100%" stopColor="#9CC98A" />
        </linearGradient>
      </defs>
      {segs.map((sg, i) => (
        <ellipse
          key={i}
          cx={sg.x}
          cy={sg.y}
          rx={sg.s * 0.42}
          ry={sg.s * 0.95}
          fill={fill}
          opacity={tone === "shadow" ? 0.9 : 0.95}
          transform={`rotate(${((sg.a * 180) / Math.PI).toFixed(1)} ${sg.x.toFixed(1)} ${sg.y.toFixed(1)})`}
        />
      ))}
    </svg>
  );
};

// Dark, wet black-green stone with fine texture and a soft wet sheen.
export const WetStone: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 2400 600" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14241B" />
          <stop offset="40%" stopColor="#0B1912" />
          <stop offset="100%" stopColor="#050D09" />
        </linearGradient>
        <filter id={`${id}-tex`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="4" seed="9" />
          <feDiffuseLighting surfaceScale="3" lightingColor="#CFE3D2" diffuseConstant="1">
            <feDistantLight azimuth="250" elevation="40" />
          </feDiffuseLighting>
          <feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.75  0 0 0 0 0.62  -0.6 -0.6 -0.6 0 1.0" />
        </filter>
        <radialGradient id={`${id}-sheen`} cx="50%" cy="10%" r="60%">
          <stop offset="0%" stopColor="#7FA88A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7FA88A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="2400" height="600" fill={`url(#${id}-g)`} />
      <rect width="2400" height="600" filter={`url(#${id}-tex)`} opacity="0.35" />
      <rect width="2400" height="600" fill={`url(#${id}-sheen)`} />
    </svg>
  );
};

// Drifting ground mist.
export const Mist: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(50% 60% at 30% 60%, rgba(200,225,205,0.35), rgba(200,225,205,0)), radial-gradient(45% 50% at 75% 55%, rgba(200,225,205,0.28), rgba(200,225,205,0))",
        filter: "blur(24px)",
      }}
    />
  );
};

// Thin gold triangle drawn by light. `progress` 0–1 draws the outline;
// `glow` adds a soft halo. Equilateral-ish, in a 1000×866 box.
export const GoldTriangle: React.FC<{ progress: number; width?: number }> = ({
  progress,
  width = 3,
}) => {
  const id = useId().replace(/:/g, "");
  const d = "M 500 10 L 990 856 L 10 856 Z";
  return (
    <svg viewBox="0 0 1000 866" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4DE9A" />
          <stop offset="50%" stopColor="#D4AF5A" />
          <stop offset="100%" stopColor="#F0D48A" />
        </linearGradient>
        <filter id={`${id}-glow`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="1400" height="1300">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke="#E8C977"
        strokeOpacity="0.55"
        strokeWidth={width * 5}
        strokeDasharray={`${progress} 2`}
        filter={`url(#${id}-glow)`}
      />
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth={width}
        strokeLinejoin="round"
        strokeDasharray={`${progress} 2`}
      />
    </svg>
  );
};

// A clear water droplet on a dark surface.
export const Droplet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 48% 48% / 54% 54% 46% 46%",
        background:
          "radial-gradient(circle at 50% 66%, rgba(220,245,225,0.45) 0%, rgba(255,255,255,0.05) 42%, rgba(5,20,12,0.25) 82%, rgba(3,12,8,0.45) 100%)",
        boxShadow:
          "inset 0 -5px 8px rgba(230,250,235,0.6), inset 0 5px 7px rgba(3,15,8,0.4), 0 6px 10px rgba(0,0,0,0.3)",
        backdropFilter: "blur(1.5px) brightness(1.15)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "22%",
          top: "14%",
          width: "28%",
          height: "20%",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.9)",
          filter: "blur(0.8px)",
        }}
      />
    </AbsoluteFill>
  );
};

// The dark-green leaf that fills the lens — the first and last frame of the
// film (the loop seam). Very close, out of focus, faint veins and sheen.
export const LensLeaf: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(80% 90% at 55% 45%, #163A26 0%, #0D2618 50%, #06140C 100%)",
        }}
      />
      <AbsoluteFill style={{ filter: "blur(16px)", opacity: 0.5 }}>
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <g fill="none" stroke="#3E6E4C" strokeLinecap="round">
            <path d="M -100 900 C 500 640 1200 420 2020 160" strokeWidth="22" />
            <path d="M 400 700 C 520 520 620 380 700 200" strokeWidth="9" />
            <path d="M 900 560 C 1040 400 1140 280 1220 120" strokeWidth="9" />
            <path d="M 600 640 C 760 760 860 880 940 1080" strokeWidth="8" />
            <path d="M 1200 470 C 1380 580 1500 720 1580 900" strokeWidth="8" />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(120deg, rgba(160,200,170,0) 30%, rgba(160,200,170,0.1) 50%, rgba(160,200,170,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

// A thin falling stream of clear water: a refracting core with bright
// edges, rippled by turbulence that shifts with `t` (frames). Fills its box.
export const WaterStream: React.FC<{ t: number }> = ({ t }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 1200" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DDF2E4" stopOpacity="0" />
          <stop offset="18%" stopColor="#E8F8EE" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#BFE0CB" stopOpacity="0.25" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="75%" stopColor="#BFE0CB" stopOpacity="0.2" />
          <stop offset="88%" stopColor="#E8F8EE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#DDF2E4" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-ripple`} filterUnits="userSpaceOnUse" x="-60" y="-50" width="220" height="1300">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 0.012" numOctaves="2" seed={Math.floor(t) % 97} />
          <feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${id}-ripple)`}>
        <rect x="20" y="0" width="60" height="1200" rx="30" fill={`url(#${id}-g)`} />
      </g>
    </svg>
  );
};
