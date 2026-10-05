import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the ARENCIA TXA Booster Shot commercial: the dark
// magenta "target" void, a glossy glass sheen, a metallic blush-glass
// platform, rings of light travelling through glass, a concentrated pink gel,
// pearl-like ingredient structures and soft uneven tonal areas.
// Each fills its parent box; scenes position and animate them on an
// <Interactive.Div> so they stay editable in the Studio.

// Cut-outs from the supplied photo (645×645 source, cut at 2×). Shown at no
// more than ~0.65 of these sizes (≈1.3× the source pixels). Set only `width`.
export const TUBE_SRC = "arencia/arencia-tube.png"; // 255×953
export const BOX_SRC = "arencia/arencia-box.png"; // 315×988

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

// ---------------------------------------------------------------- TARGET

// The near-dark magenta void with one tiny soft translucent spot under glossy
// glass and a precise point of light on it — the first and last frame of the
// film (the loop seam). Opaque. `glow` 0–1 is the strength of the point.
export const TargetVoid: React.FC<{ glow: number }> = ({ glow }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 70% at 50% 50%, #3B0A2A 0%, #250619 55%, #12020C 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(160deg, rgba(255,160,205,0.08) 0%, rgba(255,160,205,0) 35%, rgba(255,160,205,0.05) 60%, rgba(255,160,205,0) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          left: 924,
          top: 512,
          width: 72,
          height: 56,
          borderRadius: "46% 54% 50% 50% / 52% 44% 56% 48%",
          background: "radial-gradient(closest-side, rgba(70,10,35,0.85), rgba(70,10,35,0.3) 70%, rgba(70,10,35,0))",
          filter: "blur(3px)",
          rotate: "-12deg",
        }}
      />
      <AbsoluteFill
        style={{
          left: 960 - 90,
          top: 540 - 90,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,214,232,0.9), rgba(255,120,180,0.35) 35%, rgba(255,120,180,0) 100%)",
          opacity: glow,
        }}
      />
      <AbsoluteFill
        style={{
          left: 956,
          top: 536,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FFF4F9",
          boxShadow: "0 0 10px 3px rgba(255,200,225,0.9)",
          opacity: glow,
        }}
      />
    </AbsoluteFill>
  );
};

// A ring of light travelling through translucent glass: soft, blurred, with
// a brighter inner edge. Fills its (square) box.
export const LightRing: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        background:
          "radial-gradient(closest-side, rgba(255,150,200,0) 70%, rgba(255,190,220,0.55) 86%, rgba(255,240,248,0.9) 92%, rgba(255,170,210,0.35) 96%, rgba(255,150,200,0) 100%)",
        filter: "blur(6px)",
        opacity: intensity,
      }}
    />
  );
};

// ---------------------------------------------------------------- SURFACES

// Glossy metallic blush-glass platform seen slightly from above: a bright,
// reflective top face and a deeper rose front face. Top face takes `top` px.
export const MetalPlatform: React.FC<{ top?: number }> = ({ top = 90 }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          height: top,
          background:
            "linear-gradient(180deg, rgba(255,214,228,0.95) 0%, rgba(232,150,182,0.9) 55%, rgba(214,120,160,0.92) 100%)",
          boxShadow: "inset 0 2px 0 rgba(255,245,250,1)",
        }}
      />
      <AbsoluteFill
        style={{
          top: top,
          background:
            "linear-gradient(180deg, rgba(255,226,238,1) 0%, rgba(176,52,104,0.95) 5%, rgba(120,22,70,0.96) 55%, rgba(80,10,46,1) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,240,246,1)",
        }}
      />
      <AbsoluteFill
        style={{
          top: top + 8,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 10%, rgba(255,200,225,0.18) 35%, rgba(255,255,255,0) 50%, rgba(255,200,225,0.12) 75%, rgba(255,255,255,0) 90%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- GEL

// A concentrated, cushioned pink gel moving through clear glass, drawn in
// 1200×700 with a soft organic outline, an inner glow and a sharp gloss.
export const GelLayer: React.FC<{ t: number }> = ({ t }) => {
  const id = useId().replace(/:/g, "");
  const pts: string[] = [];
  const n = 90;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.06 * Math.sin(a * 3 + t * 0.05) + 0.03 * Math.sin(a * 5 - t * 0.07);
    pts.push(`${(600 + Math.cos(a) * 520 * k).toFixed(1)} ${(350 + Math.sin(a) * 230 * k).toFixed(1)}`);
  }
  const d = `M ${pts.join(" L ")} Z`;
  return (
    <svg viewBox="0 0 1200 700" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFB3D2" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#F0679E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C2255F" stopOpacity="0.7" />
        </radialGradient>
        <filter id={`${id}-gloss`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="1600" height="1100">
          <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="b" />
          <feSpecularLighting in="b" surfaceScale="14" specularConstant="1.1" specularExponent="28" lightingColor="#FFFFFF" result="s">
            <feDistantLight azimuth="225" elevation="48" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <path d={d} fill={`url(#${id}-g)`} />
      <path d={d} fill="#FFFFFF" filter={`url(#${id}-gloss)`} opacity="0.9" />
      <path d={d} fill="none" stroke="rgba(255,225,238,0.8)" strokeWidth="2" />
    </svg>
  );
};

// ---------------------------------------------------------------- PEARLS

// A translucent pearl-like structure: pink-white, softly iridescent, with a
// crisp highlight. Fills its (square) box.
export const PearlStructure: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(255,226,238,0.75) 22%, rgba(240,170,200,0.45) 60%, rgba(200,110,160,0.55) 100%)",
        boxShadow: "inset -6px -8px 14px rgba(160,60,110,0.3), inset 4px 4px 10px rgba(255,255,255,0.6)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "18%",
          top: "14%",
          width: "26%",
          height: "18%",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.95)",
          filter: "blur(1px)",
        }}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- TONE

// Several extremely soft, uneven translucent tonal areas on a blush surface
// (abstract, not skin), drawn in 1920×1080. Fixed layout from `seed`.
export const TonalAreas: React.FC<{ seed?: number }> = ({ seed = 5 }) => {
  const id = useId().replace(/:/g, "");
  const rand = rng(seed);
  const areas = new Array(9).fill(0).map(() => ({
    x: 140 + rand() * 1640,
    y: 120 + rand() * 840,
    rx: 60 + rand() * 120,
    ry: 40 + rand() * 90,
    a: rand() * 180,
    o: 0.5 + rand() * 0.5,
  }));
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="2320" height="1480">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="40" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="16" />
        </filter>
      </defs>
      <g filter={`url(#${id}-soft)`}>
        {areas.map((r, i) => (
          <ellipse
            key={i}
            cx={r.x}
            cy={r.y}
            rx={r.rx}
            ry={r.ry}
            fill="#C07E92"
            opacity={r.o}
            transform={`rotate(${r.a.toFixed(1)} ${r.x.toFixed(1)} ${r.y.toFixed(1)})`}
          />
        ))}
      </g>
    </svg>
  );
};

// A smooth ivory-blush surface with a fine satin grain. 1920×1080.
export const BlushSurface: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(80% 90% at 40% 35%, #FFF3F5 0%, #F8E1E6 55%, #EDCBD4 100%)",
      }}
    >
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: "absolute", width: "100%", height: "100%" }}>
        <defs>
          <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0.7  0 0 0 0 0.5  0 0 0 0 0.55  0 0 0 -1.3 0.8" />
          </filter>
        </defs>
        <rect width="1920" height="1080" filter={`url(#${id}-grain)`} opacity="0.2" />
      </svg>
    </AbsoluteFill>
  );
};
