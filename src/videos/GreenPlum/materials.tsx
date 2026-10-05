import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the BEAUTY OF JOSEON Green Plum Refreshing Toner
// (AHA + BHA) commercial: a smooth pale-mint surface, clear toner drops and
// ripples, thin clear liquid layers, an abstract textured cosmetic surface,
// a restrained green plum and plum leaves, mint glass and a mint platform.
// Each fills its parent box; scenes position and animate them on an
// <Interactive.Div> so they stay editable in the Studio.

// Cut-outs from the supplied photo (225×225 source, cut at 4×). To respect
// the low-resolution source, scenes show them at no more than ~0.75 of these
// sizes (≈3× the original pixels). Scenes set only `width`.
export const BOTTLE_SRC = "greenplum/greenplum-bottle.png"; // 219×691
export const BOX_SRC = "greenplum/greenplum-box.png"; // 254×725

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

// ---------------------------------------------------------------- SURFACE

// The smooth, pale translucent-mint surface — the first and last frame of
// the film (the loop seam). Opaque, static: soft light pooled in the middle,
// a faint glass grain and a gentle sheen.
export const MintSurface: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 80% at 50% 45%, #E8F4EE 0%, #D6EBE1 45%, #C2DFD2 100%)",
        }}
      />
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: "absolute", width: "100%", height: "100%" }}>
        <defs>
          <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="6" />
            <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.65  0 0 0 0 0.6  0 0 0 -1.3 0.8" />
          </filter>
        </defs>
        <rect width="1920" height="1080" filter={`url(#${id}-grain)`} opacity="0.25" />
      </svg>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.28) 46%, rgba(255,255,255,0) 60%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Concentric ripple rings spreading from the centre of a 1000×1000 box.
// `spread` 0–1 moves the rings outward; rings fade as they travel.
export const RippleRings: React.FC<{ spread: number; rings?: number; strength?: number }> = ({
  spread,
  rings = 4,
  strength = 1,
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 1000 1000" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <g filter={`url(#${id}-soft)`} fill="none">
        {new Array(rings).fill(0).map((_, i) => {
          const k = Math.max(0, Math.min(1, spread - i * 0.12));
          if (k <= 0) return null;
          const r = 10 + k * 490;
          const o = (1 - k) * strength;
          return (
            <g key={i} opacity={o}>
              <circle cx="500" cy="500" r={r + 3} stroke="rgba(80,130,110,0.35)" strokeWidth="5" />
              <circle cx="500" cy="500" r={r} stroke="rgba(255,255,255,0.95)" strokeWidth="3" />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// A clear toner drop, faintly mint, lit from the top-left. Fills its box.
export const ClearDrop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 48% 48% / 56% 56% 44% 44%",
        background:
          "radial-gradient(circle at 50% 68%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 42%, rgba(120,170,150,0.2) 82%, rgba(80,130,110,0.38) 100%)",
        boxShadow:
          "inset 0 -5px 8px rgba(255,255,255,0.8), inset 0 5px 8px rgba(60,110,90,0.28), 0 6px 10px rgba(60,100,85,0.2)",
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

// ---------------------------------------------------------------- LIQUID

// A thin clear liquid layer gliding over glass, drawn in 1920×1080. It
// covers everything behind its smooth, softly rippled front at `front` (px),
// flowing right (or left with `toLeft`). Children only show inside it.
const layerPath = (front: number, t: number, toLeft: boolean) => {
  const pts: string[] = [];
  const n = 36;
  for (let i = 0; i <= n; i++) {
    const y = -60 + (1200 * i) / n;
    const u = i / n;
    const bulge = 34 * Math.sin(Math.PI * u) + 10 * Math.sin(u * 7 + t * 0.25);
    const x = toLeft ? front - bulge : front + bulge;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const back = toLeft ? 2600 : -700;
  return `M ${back} -60 L ${pts.join(" L ")} L ${back} 1140 Z`;
};

export const LiquidLayer: React.FC<{
  front: number;
  t: number;
  toLeft?: boolean;
  tint?: string;
  children?: React.ReactNode;
}> = ({ front, t, toLeft = false, tint = "rgba(214,238,228,0.22)", children }) => {
  const id = useId().replace(/:/g, "");
  const d = layerPath(front, t, toLeft);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `path("${d}")`, background: tint }}>{children}</AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <filter id={`${id}-gloss`} filterUnits="userSpaceOnUse" x="-900" y="-300" width="3720" height="1680">
            <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="b" />
            <feSpecularLighting in="b" surfaceScale="6" specularConstant="0.9" specularExponent="34" lightingColor="#FFFFFF" result="s">
              <feDistantLight azimuth={toLeft ? 315 : 225} elevation="42" />
            </feSpecularLighting>
            <feComposite in="s" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id={`${id}-rim`} filterUnits="userSpaceOnUse" x="-900" y="-300" width="3720" height="1680">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        <path d={d} fill="#FFFFFF" filter={`url(#${id}-gloss)`} opacity="0.85" />
        <path d={d} fill="none" stroke="rgba(70,125,105,0.35)" strokeWidth="6" filter={`url(#${id}-rim)`} />
        <path d={d} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.6" />
      </svg>
    </AbsoluteFill>
  );
};

// An abstract cosmetic surface (not skin): pale mint-ivory ceramic with a
// fine uneven micro-texture lit from the top-left. 1920×1080.
export const TexturedSurface: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id={`${id}-bumps`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="27" />
          <feDiffuseLighting surfaceScale="2.2" lightingColor="#FFFFFF" diffuseConstant="1.15">
            <feDistantLight azimuth="225" elevation="45" />
          </feDiffuseLighting>
          <feColorMatrix values="0.5 0 0 0 0.45  0 0.52 0 0 0.47  0 0 0.5 0 0.44  0 0 0 0 1" />
        </filter>
      </defs>
      <rect width="1920" height="1080" filter={`url(#${id}-bumps)`} />
    </svg>
  );
};

// The same ceramic, perfectly smooth: soft gradient and a satin sheen.
export const SmoothSurface: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(160deg, #EEF6F1 0%, #DFEEE6 55%, #CFE5DA 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 65%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- BOTANICAL

// A single green plum, photographed rather than illustrated: a soft waxy
// bloom over yellow-green skin, a shallow stem cavity, faint speckles and a
// diffused highlight. Drawn in 400×420 (fruit centred at 200, 230).
export const GreenPlum: React.FC = () => {
  const id = useId().replace(/:/g, "");
  const rand = rng(9);
  const dots = new Array(70).fill(0).map(() => {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 165;
    return { x: 200 + Math.cos(a) * r, y: 236 + Math.sin(a) * r * 0.95, s: 0.8 + rand() * 1.4 };
  });
  return (
    <svg viewBox="0 0 400 420" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-skin`} cx="40%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#D9E6A0" />
          <stop offset="35%" stopColor="#AFC873" />
          <stop offset="75%" stopColor="#7E9E4A" />
          <stop offset="100%" stopColor="#5C7A35" />
        </radialGradient>
        <radialGradient id={`${id}-bloom`} cx="50%" cy="45%" r="55%">
          <stop offset="60%" stopColor="#F2F6E6" stopOpacity="0" />
          <stop offset="100%" stopColor="#F2F6E6" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id={`${id}-hi`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-c`}>
          <ellipse cx="200" cy="236" rx="172" ry="166" />
        </clipPath>
        <filter id={`${id}-tex`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" />
          <feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.97  0 0 0 0 0.85  0 0 0 -2 1.15" />
        </filter>
      </defs>
      <ellipse cx="200" cy="236" rx="172" ry="166" fill={`url(#${id}-skin)`} />
      <g clipPath={`url(#${id}-c)`}>
        <rect width="400" height="420" filter={`url(#${id}-tex)`} opacity="0.25" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="#F3F1C8" opacity="0.35" />
        ))}
        <path d="M 200 72 C 186 150 186 300 200 400" stroke="#5F7D38" strokeOpacity="0.25" strokeWidth="10" fill="none" />
        <ellipse cx="200" cy="236" rx="172" ry="166" fill={`url(#${id}-bloom)`} />
        <ellipse cx="146" cy="160" rx="60" ry="40" fill={`url(#${id}-hi)`} transform="rotate(-30 146 160)" />
        <ellipse cx="200" cy="80" rx="26" ry="10" fill="#4E6A2C" opacity="0.4" />
      </g>
      <path d="M 200 80 C 202 60 208 44 216 32" stroke="#6A5A3A" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
};

// A slender plum leaf: elliptic with a drawn-out tip, finely serrated, with
// a midrib and fine side veins. Drawn tip-up in 240×600 (stalk at bottom).
export const PlumLeaf: React.FC<{ tone?: "fresh" | "soft" }> = ({ tone = "fresh" }) => {
  const id = useId().replace(/:/g, "");
  const right: string[] = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const u = i / n; // 0 at stalk (y 580) to 1 at tip (y 20)
    const y = 580 - u * 560;
    const w = 100 * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.75)), 1.1) * (1 - 0.2 * u);
    const serr = i % 2 === 0 ? 0 : 2.5 * Math.sin(Math.PI * u);
    right.push(`${(120 + w + serr).toFixed(1)} ${y.toFixed(1)}`);
  }
  const left = right
    .slice()
    .reverse()
    .map((p) => {
      const [x, y] = p.split(" ").map(Number);
      return `${(240 - x).toFixed(1)} ${y.toFixed(1)}`;
    });
  const d = `M ${right.join(" L ")} L ${left.join(" L ")} Z`;
  const c = tone === "soft" ? ["#C7D8B0", "#A3BC88", "#86A06A"] : ["#A9C47A", "#7FA052", "#5B7C38"];
  return (
    <svg viewBox="0 0 240 600" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor={c[2]} />
          <stop offset="45%" stopColor={c[0]} />
          <stop offset="100%" stopColor={c[1]} />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <path d={d} />
        </clipPath>
      </defs>
      <path d="M 120 578 L 122 610" stroke="#6E6A3E" strokeWidth="5" strokeLinecap="round" />
      <path d={d} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-c)`}>
        <g stroke="#EAF2D2" strokeOpacity="0.32" fill="none" strokeLinecap="round">
          <path d="M 120 580 C 121 400 120 200 120 22" strokeWidth="2.6" />
          {[520, 460, 400, 340, 280, 220, 160].map((y, i) => (
            <g key={i}>
              <path d={`M 120 ${y} Q 160 ${y - 24} 200 ${y - 64}`} strokeWidth="1.2" />
              <path d={`M 120 ${y} Q 80 ${y - 24} 40 ${y - 64}`} strokeWidth="1.2" />
            </g>
          ))}
        </g>
        <ellipse cx="90" cy="300" rx="30" ry="190" fill="#FFFFFF" opacity="0.14" />
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------- GLASS

// Pale translucent mint-glass platform seen slightly from above: a lit top
// face and a clearer front face with bright edges. Fills its box; the top
// face takes the first `top` px.
export const MintPlatform: React.FC<{ top?: number }> = ({ top = 100 }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          height: top,
          background:
            "linear-gradient(180deg, rgba(236,248,242,0.92) 0%, rgba(206,234,221,0.75) 100%)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,1)",
          backdropFilter: "blur(6px)",
        }}
      />
      <AbsoluteFill
        style={{
          top,
          background:
            "linear-gradient(180deg, rgba(240,250,245,0.95) 0%, rgba(178,216,199,0.55) 6%, rgba(160,204,184,0.45) 60%, rgba(140,190,168,0.55) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1)",
          backdropFilter: "blur(8px)",
        }}
      />
    </AbsoluteFill>
  );
};

// A clear pane of mint glass with chamfered, light-catching edges. Fills its box.
export const MintPane: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(100deg, rgba(200,232,218,0.22) 0%, rgba(220,242,232,0.12) 50%, rgba(200,232,218,0.24) 100%)",
        boxShadow:
          "inset 3px 0 0 rgba(255,255,255,0.95), inset -3px 0 0 rgba(255,255,255,0.8), inset 10px 0 18px rgba(120,180,155,0.3), inset -10px 0 18px rgba(120,180,155,0.3)",
        backdropFilter: "blur(1.5px) saturate(1.1)",
      }}
    />
  );
};

// A large, quiet structure of concentric glass/liquid rings (echoing the
// opening ripple), drawn in a 1000×1000 box. `shimmer` slides the light
// along the rings.
export const GlassRings: React.FC<{ shimmer: number }> = ({ shimmer }) => {
  const id = useId().replace(/:/g, "");
  const radii = [260, 380, 480];
  return (
    <svg viewBox="0 0 1000 1000" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${shimmer * 360} 0.5 0.5)`}>
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#E3F2EA" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E3F2EA" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="1400" height="1400">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
      <circle cx="500" cy="500" r="480" fill={`url(#${id}-glow)`} />
      <g fill="none" filter={`url(#${id}-soft)`}>
        {radii.map((r, i) => (
          <g key={i}>
            <circle cx="500" cy="500" r={r + 6} stroke="rgba(110,160,140,0.12)" strokeWidth="14" />
            <circle cx="500" cy="500" r={r} stroke={`url(#${id}-g)`} strokeWidth={5 - i} opacity={0.75 - i * 0.15} />
          </g>
        ))}
      </g>
    </svg>
  );
};
