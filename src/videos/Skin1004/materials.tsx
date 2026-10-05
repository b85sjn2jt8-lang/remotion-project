import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the SKIN1004 Madagascar Centella commercial:
// sunlit Madagascar earth, drifting sand, Centella asiatica leaves (round,
// scalloped, palmate veins), warm dew, amber glass, an earth-stone platform
// and a clear watery essence flowing over glass. Each fills its parent box;
// scenes position and animate them on an <Interactive.Div> so they stay
// editable in the Studio. `t`/`front` props come from inline interpolate().

// Cut-outs from the supplied photo. Scenes set only `width`; height follows.
export const BOTTLE_SRC = "skin1004/skin1004-bottle.png"; // 242×676
export const BOX_SRC = "skin1004/skin1004-box.png"; // 246×685

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

// ---------------------------------------------------------------- EARTH

// Warm, sunlit Madagascar earth: wind-rippled sand over red-brown soil, lit
// by a low golden sun so every ripple casts a long soft shadow. 2400×1600.
export const EarthTexture: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 2400 1600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C996" />
          <stop offset="50%" stopColor="#D2A36A" />
          <stop offset="100%" stopColor="#A9713F" />
        </linearGradient>
        <filter id={`${id}-ripple`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.016" numOctaves="3" seed="21" />
          <feDiffuseLighting surfaceScale="9" lightingColor="#FFE2B0" diffuseConstant="1.1">
            <feDistantLight azimuth="200" elevation="16" />
          </feDiffuseLighting>
          <feColorMatrix values="0.95 0 0 0 0.05  0 0.8 0 0 0.02  0 0 0.6 0 0  -0.9 -0.9 -0.9 0 1.6" />
        </filter>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="5" />
          <feDiffuseLighting surfaceScale="1.6" lightingColor="#FFE9C4" diffuseConstant="1">
            <feDistantLight azimuth="200" elevation="30" />
          </feDiffuseLighting>
          <feColorMatrix values="0.9 0 0 0 0.05  0 0.75 0 0 0.03  0 0 0.55 0 0  -0.7 -0.7 -0.7 0 1.3" />
        </filter>
        <filter id={`${id}-soil`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0012 0.003" numOctaves="3" seed="8" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.27  0 0 0 0 0.12  0 0 0 -2.4 1.3" />
        </filter>
      </defs>
      <rect width="2400" height="1600" fill={`url(#${id}-g)`} />
      <rect width="2400" height="1600" filter={`url(#${id}-soil)`} opacity="0.5" />
      <rect width="2400" height="1600" filter={`url(#${id}-ripple)`} opacity="0.75" />
      <rect width="2400" height="1600" filter={`url(#${id}-grain)`} opacity="0.4" />
    </svg>
  );
};

type Grain = { x: number; y: number; r: number; v: number; o: number };
const makeGrains = (count: number, seed: number): Grain[] => {
  const rand = rng(seed);
  return new Array(count).fill(0).map(() => ({
    x: rand() * 1920,
    y: rand() * 1080,
    r: 0.8 + rand() * rand() * 2.6,
    v: 2 + rand() * 7,
    o: 0.35 + rand() * 0.5,
  }));
};

// Fine sand grains skating across the surface, catching the sun. `t` is in
// frames; grains wrap around the 1920×1080 box.
export const SandDrift: React.FC<{ t: number; seed?: number; count?: number }> = ({
  t,
  seed = 4,
  count = 420,
}) => {
  const grains = makeGrains(count, seed);
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      {grains.map((g, i) => {
        const x = (((g.x + g.v * t) % 2000) + 2000) % 2000 - 40;
        const y = g.y + Math.sin(t * 0.08 + i) * 2;
        return (
          <g key={i} opacity={g.o}>
            <ellipse cx={x - g.r * 3} cy={y} rx={g.r * 3} ry={g.r * 0.5} fill="rgba(255,226,170,0.25)" />
            <circle cx={x} cy={y} r={g.r} fill="#FFE7BC" />
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------- CENTELLA

// Centella asiatica leaf: kidney-round with a softly scalloped margin, a
// narrow notch where the stalk joins, and palmate veins fanning from it.
// Drawn in 400×460 (blade centre 200, 200; stalk running down to y 460).
// `tone`: fresh green, warm backlit, or a flat brown shadow.
export const CentellaLeaf: React.FC<{
  tone?: "fresh" | "warm" | "shadow";
  seed?: number;
  beads?: boolean;
}> = ({ tone = "fresh", seed = 3, beads = true }) => {
  const id = useId().replace(/:/g, "");
  const rand = rng(seed);
  const ph = rand() * 6.28;
  const lobes = 15 + Math.floor(rand() * 4);
  const pts: string[] = [];
  const n = 300;
  // angle measured from the notch at the bottom (90° = straight down);
  // smooth rounded crenations, slight asymmetry, a softly irregular outline
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const a = Math.PI / 2 + 0.07 + u * (Math.PI * 2 - 0.14);
    const cren = 1 - 0.028 * (0.5 - 0.5 * Math.cos(u * Math.PI * 2 * lobes));
    const wobble = 1 + 0.035 * Math.sin(u * Math.PI * 2 + ph) + 0.015 * Math.sin(u * Math.PI * 6 + ph * 2);
    const r = 170 * cren * wobble;
    pts.push(`${(200 + Math.cos(a) * r * 1.1).toFixed(1)} ${(200 + Math.sin(a) * r).toFixed(1)}`);
  }
  const d = `M 200 214 L ${pts.join(" L ")} Z`;
  const c =
    tone === "warm"
      ? ["#C9B56E", "#A39350", "#7A6C36", "#5E5328"]
      : tone === "shadow"
        ? ["#5A3B22", "#5A3B22", "#5A3B22", "#5A3B22"]
        : ["#B4C27E", "#8C9D58", "#6A7C42", "#4E5E30"];
  const veins = [-150, -118, -86, -54, -22, 10, 42, 74, 106, 138];
  return (
    <svg viewBox="0 0 400 460" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={c[2]} />
          <stop offset="45%" stopColor={c[1]} />
          <stop offset="85%" stopColor={c[0]} />
          <stop offset="100%" stopColor={c[2]} />
        </radialGradient>
        <radialGradient id={`${id}-cup`} cx="50%" cy="56%" r="50%">
          <stop offset="0%" stopColor="#1F2810" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#1F2810" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1F2810" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFBEA" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#FFFBEA" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <path d={d} />
        </clipPath>
        <filter id={`${id}-tex`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed={seed} />
          <feDiffuseLighting surfaceScale="1.4" lightingColor="#FFFFFF" diffuseConstant="1">
            <feDistantLight azimuth="225" elevation="52" />
          </feDiffuseLighting>
          <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.9  0 0 0 0 0.72  -0.5 -0.5 -0.5 0 1.12" />
        </filter>
        <filter id={`${id}-mottle`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed={seed + 40} />
          <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.72  0 0 0 0 0.3  0 0 0 -2.6 1.3" />
        </filter>
      </defs>
      {tone === "shadow" ? (
        <g>
          <path d={d} fill={c[0]} />
          <path d="M 200 224 C 203 300 206 360 208 430" stroke={c[0]} strokeWidth="8" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <path d="M 200 224 C 203 300 206 360 208 430" stroke="#7F8C4C" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d={d} fill={`url(#${id}-g)`} />
          <g clipPath={`url(#${id}-c)`}>
            <rect width="400" height="460" filter={`url(#${id}-mottle)`} opacity="0.35" />
            <rect width="400" height="460" filter={`url(#${id}-tex)`} opacity="0.4" />
            <rect width="400" height="460" fill={`url(#${id}-cup)`} />
            <g stroke="#E6EDC2" strokeOpacity="0.17" fill="none" strokeLinecap="round">
              {veins.map((v, i) => {
                const a = ((v - 90) * Math.PI) / 180;
                const bend = (i % 2 === 0 ? 1 : -1) * 8;
                const x2 = 200 + Math.cos(a) * 158 * 1.1;
                const y2 = 222 + Math.sin(a) * 158;
                const xm = 200 + Math.cos(a) * 80 * 1.1 - Math.sin(a) * bend;
                const ym = 222 + Math.sin(a) * 80 + Math.cos(a) * bend;
                return (
                  <path
                    key={i}
                    d={`M 200 222 Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>
            <rect width="400" height="460" fill={`url(#${id}-sheen)`} />
            <path d={d} fill="none" stroke="#3A4620" strokeOpacity="0.45" strokeWidth="5" />
            <path d={d} fill="none" stroke="#F2F0C8" strokeOpacity="0.25" strokeWidth="1.5" transform="translate(-1.5 -1.5)" />
          </g>
          {beads ? (
            <g>
              <circle cx="262" cy="150" r="8" fill="rgba(255,250,235,0.3)" stroke="rgba(50,60,25,0.35)" strokeWidth="1.1" />
              <circle cx="259.5" cy="147.5" r="2.4" fill="#FFFFFF" />
              <circle cx="132" cy="236" r="5.5" fill="rgba(255,250,235,0.3)" stroke="rgba(50,60,25,0.35)" strokeWidth="1" />
              <circle cx="130.3" cy="234.3" r="1.7" fill="#FFFFFF" />
              <circle cx="226" cy="300" r="4" fill="rgba(255,250,235,0.3)" stroke="rgba(50,60,25,0.35)" strokeWidth="0.9" />
            </g>
          ) : null}
        </g>
      )}
    </svg>
  );
};

// The warm, out-of-focus Centella leaf that fills the lens — the first and
// last frame of the film (the loop seam). Backlit amber-olive with palmate
// veins fanning out from below the frame.
export const LensLeafWarm: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(85% 95% at 50% 45%, #B98F4E 0%, #8E6C35 50%, #5E4422 100%)",
        }}
      />
      <AbsoluteFill style={{ filter: "blur(18px)", opacity: 0.45 }}>
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <g fill="none" stroke="#E7C98A" strokeLinecap="round">
            <path d="M 960 1300 C 900 900 700 500 300 -100" strokeWidth="16" />
            <path d="M 960 1300 C 960 900 960 500 960 -100" strokeWidth="18" />
            <path d="M 960 1300 C 1020 900 1220 500 1620 -100" strokeWidth="16" />
            <path d="M 960 1300 C 820 1000 400 700 -100 500" strokeWidth="13" />
            <path d="M 960 1300 C 1100 1000 1520 700 2020 500" strokeWidth="13" />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, rgba(255,230,170,0) 30%, rgba(255,230,170,0.12) 50%, rgba(255,230,170,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

// A warm, clear dew drop catching the sun. Fills its box.
export const WarmDrop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 48% 48% / 54% 54% 46% 46%",
        background:
          "radial-gradient(circle at 50% 68%, rgba(255,246,220,0.6) 0%, rgba(255,255,255,0.08) 42%, rgba(120,80,30,0.2) 82%, rgba(90,60,25,0.38) 100%)",
        boxShadow:
          "inset 0 -5px 8px rgba(255,244,215,0.75), inset 0 5px 8px rgba(80,55,20,0.3), 0 6px 10px rgba(80,50,20,0.25)",
        backdropFilter: "blur(1.5px) brightness(1.12)",
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

// ---------------------------------------------------------------- SURFACES

// Translucent warm amber glass slab seen from slightly above. Fills its box;
// the top edge catches the light, the body glows from within.
export const AmberGlass: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(255,234,186,0.75) 0%, rgba(240,190,112,0.5) 10%, rgba(226,166,88,0.45) 60%, rgba(214,150,74,0.55) 100%)",
        boxShadow:
          "inset 0 2px 0 rgba(255,246,222,1), inset 0 14px 24px rgba(255,236,190,0.45), inset 0 -10px 20px rgba(150,90,30,0.25)",
        backdropFilter: "blur(6px)",
      }}
    />
  );
};

// Textured earth-stone platform with a thin glossy, wet-looking top surface.
export const EarthStone: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 2400 500" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B08055" />
          <stop offset="35%" stopColor="#8E6240" />
          <stop offset="100%" stopColor="#5C3E26" />
        </linearGradient>
        <filter id={`${id}-tex`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.03" numOctaves="4" seed="17" />
          <feDiffuseLighting surfaceScale="3" lightingColor="#FFE0B5" diffuseConstant="1">
            <feDistantLight azimuth="210" elevation="38" />
          </feDiffuseLighting>
          <feColorMatrix values="0 0 0 0 0.75  0 0 0 0 0.55  0 0 0 0 0.38  -0.6 -0.6 -0.6 0 1.05" />
        </filter>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1D6" stopOpacity="0.55" />
          <stop offset="18%" stopColor="#FFF1D6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFF1D6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="2400" height="500" fill={`url(#${id}-g)`} />
      <rect width="2400" height="500" filter={`url(#${id}-tex)`} opacity="0.45" />
      <rect width="2400" height="500" fill={`url(#${id}-gloss)`} />
      <rect width="2400" height="3" fill="#FFF3DC" opacity="0.8" />
    </svg>
  );
};

// ---------------------------------------------------------------- ESSENCE

// The leading edge of a clear, watery essence sweeping across glass, drawn
// in 1920×1080. It covers the band `top`–`bottom`; its rippled front is at
// `front` (px) and it flows to the right (or the left with `toLeft`).
const flowPath = (front: number, top: number, bottom: number, t: number, toLeft: boolean) => {
  const pts: string[] = [];
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const y = top + ((bottom - top) * i) / n;
    const u = i / n;
    const bulge = 60 * Math.sin(Math.PI * u) + 18 * Math.sin(u * 9 + t * 0.4) + 8 * Math.sin(u * 23 - t * 0.7);
    const x = toLeft ? front - bulge : front + bulge;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const back = toLeft ? 2400 : -480;
  return `M ${back} ${top} L ${pts.join(" L ")} L ${back} ${bottom} Z`;
};

export const EssenceFlow: React.FC<{
  front: number;
  top: number;
  bottom: number;
  t: number;
  toLeft?: boolean;
  children?: React.ReactNode;
}> = ({ front, top, bottom, t, toLeft = false, children }) => {
  const id = useId().replace(/:/g, "");
  const d = flowPath(front, top, bottom, t, toLeft);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `path("${d}")`,
          background: "linear-gradient(180deg, rgba(255,250,238,0.2), rgba(255,240,215,0.1))",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%" }}>
          <defs>
            <filter id={`${id}-caustic`} filterUnits="userSpaceOnUse" x="-2000" y="-200" width="6000" height="1500">
              <feTurbulence type="turbulence" baseFrequency="0.006 0.012" numOctaves="2" seed="13" />
              <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.93  0 0 0 0 0.78  -5 0 0 0 1.05" />
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>
          <g transform={`translate(${(toLeft ? -1 : 1) * t * 6} 0)`}>
            <rect x="-1000" y="-100" width="4000" height="1300" filter={`url(#${id}-caustic)`} opacity="0.55" />
          </g>
        </svg>
        {children}
      </AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <filter id={`${id}-gloss`} filterUnits="userSpaceOnUse" x="-800" y="-200" width="3520" height="1480">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b" />
            <feSpecularLighting in="b" surfaceScale="7" specularConstant="1" specularExponent="30" lightingColor="#FFF6E2" result="s">
              <feDistantLight azimuth={toLeft ? 315 : 225} elevation="40" />
            </feSpecularLighting>
            <feComposite in="s" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id={`${id}-rim`} filterUnits="userSpaceOnUse" x="-800" y="-200" width="3520" height="1480">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>
        <path d={d} fill="#FFFFFF" filter={`url(#${id}-gloss)`} opacity="0.9" />
        <path d={d} fill="none" stroke="rgba(150,105,50,0.4)" strokeWidth="6" filter={`url(#${id}-rim)`} />
        <path d={d} fill="none" stroke="rgba(255,252,240,0.95)" strokeWidth="1.6" />
      </svg>
    </AbsoluteFill>
  );
};
