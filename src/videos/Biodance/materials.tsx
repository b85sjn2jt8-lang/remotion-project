import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the BIODANCE Caviar PDRN Jelly Serum Mist
// commercial: a translucent lavender jelly surface, optical lavender glass
// spheres (echoing the real spherical cap), pearlescent caviar pearls, a
// floating jelly mass, an ultra-fine mist of micro droplets, and a pearl-glass
// surface that turns from frosted to glossy. Each fills its parent box;
// scenes position and animate them on an <Interactive.Div>.

// Cut-out from the supplied photo (225×225 source, cut at 4×). Shown at no
// more than ~0.56 of this size (≈2.2× the source pixels). Set only `width`.
// The spherical cap's centre sits at (0.507, 0.219) of the box, radius 0.477 × width.
export const BOTTLE_SRC = "biodance/biodance-bottle.png"; // 369×878

const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

// ---------------------------------------------------------------- JELLY

// Looking through a premium lavender hydrogel — the first and last frame of
// the film (the loop seam). Opaque and static: soft internal light paths, a
// gentle gloss and depth at the edges.
export const JellySurface: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(75% 85% at 45% 40%, #F1EBFB 0%, #E1D6F6 45%, #CBBBEC 85%, #BBA8E3 100%)",
        }}
      />
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: "absolute", width: "100%", height: "100%" }}>
        <defs>
          <filter id={`${id}-paths`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.0025 0.004" numOctaves="2" seed="21" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.98  0 0 0 0 1  -4 0 0 0 1.1" />
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <rect width="1920" height="1080" filter={`url(#${id}-paths)`} opacity="0.26" />
      </svg>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.32) 44%, rgba(255,255,255,0) 58%)",
        }}
      />
    </AbsoluteFill>
  );
};

// A translucent lavender optical-glass sphere: violet rim, luminous core, a
// caustic crescent at the base and a soft specular window. Fills its box.
export const OpticalSphere: React.FC<{ strength?: number }> = ({ strength = 1 }) => {
  return (
    <AbsoluteFill style={{ borderRadius: "50%", opacity: strength }}>
      <AbsoluteFill
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 55%, rgba(236,228,252,0.25) 0%, rgba(214,198,246,0.3) 55%, rgba(170,145,225,0.55) 85%, rgba(140,110,205,0.7) 100%)",
          boxShadow: "inset 0 -30px 60px rgba(255,255,255,0.35), inset 0 20px 50px rgba(120,90,190,0.25)",
        }}
      />
      <AbsoluteFill
        style={{
          left: "18%",
          top: "64%",
          width: "64%",
          height: "26%",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,250,255,0.75), rgba(255,250,255,0))",
          filter: "blur(6px)",
        }}
      />
      <AbsoluteFill
        style={{
          left: "20%",
          top: "12%",
          width: "34%",
          height: "22%",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0))",
          rotate: "-24deg",
        }}
      />
    </AbsoluteFill>
  );
};

// A pearlescent caviar pearl: pearl-white with a faint lavender/silver
// iridescence and a crisp highlight. Fills its (square) box.
export const CaviarPearl: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 34% 30%, #FFFFFF 0%, #F6F2FD 18%, #E3DAF5 48%, #C9BCE8 78%, #B3A6DB 100%)",
        boxShadow: "inset -8px -10px 18px rgba(120,100,180,0.28), inset 6px 6px 12px rgba(255,255,255,0.7)",
      }}
    >
      <AbsoluteFill
        style={{
          borderRadius: "50%",
          background:
            "conic-gradient(from 200deg, rgba(255,220,240,0) 0deg, rgba(255,220,240,0.22) 60deg, rgba(210,235,255,0.2) 140deg, rgba(255,255,255,0) 220deg)",
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          left: "20%",
          top: "15%",
          width: "24%",
          height: "17%",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.95)",
          filter: "blur(1px)",
        }}
      />
    </AbsoluteFill>
  );
};

// A floating mass of lavender jelly, drawn in 900×600: soft organic outline,
// translucent body, luminous core and a sharp gel gloss.
export const JellyMass: React.FC<{ t: number }> = ({ t }) => {
  const id = useId().replace(/:/g, "");
  const pts: string[] = [];
  const n = 96;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.05 * Math.sin(a * 3 + t * 0.06) + 0.025 * Math.sin(a * 5 - t * 0.09);
    pts.push(`${(450 + Math.cos(a) * 360 * k).toFixed(1)} ${(300 + Math.sin(a) * 210 * k).toFixed(1)}`);
  }
  const d = `M ${pts.join(" L ")} Z`;
  return (
    <svg viewBox="0 0 900 600" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="44%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#F4EEFE" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#CDBBF0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#9C84D6" stopOpacity="0.8" />
        </radialGradient>
        <filter id={`${id}-gloss`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="1300" height="1000">
          <feGaussianBlur in="SourceAlpha" stdDeviation="18" result="b" />
          <feSpecularLighting in="b" surfaceScale="12" specularConstant="1.05" specularExponent="26" lightingColor="#FFFFFF" result="s">
            <feDistantLight azimuth="225" elevation="50" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <path d={d} fill={`url(#${id}-g)`} />
      <path d={d} fill="#FFFFFF" filter={`url(#${id}-gloss)`} opacity="0.9" />
      <path d={d} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
    </svg>
  );
};

// ---------------------------------------------------------------- MIST

type Drop = { a: number; r0: number; d: number; s: number; delay: number; z: number };
const makeDrops = (count: number, seed: number): Drop[] => {
  const rand = rng(seed);
  return new Array(count).fill(0).map(() => ({
    a: rand() * Math.PI * 2,
    r0: 0.55 + 0.45 * Math.sqrt(rand()),
    d: 0.35 + rand() * 0.9,
    s: 1.3 + rand() * rand() * 4.2,
    delay: rand() * 0.55,
    z: rand(),
  }));
};

// Ultra-fine micro droplets leaving a jelly mass centred at (cx, cy) with
// radii (rx, ry), drawn in 1920×1080. `progress` 0–1: droplets separate from
// the surface, drift outward and toward the camera (growing, softening).
export const MistField: React.FC<{
  progress: number;
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  count?: number;
  seed?: number;
}> = ({ progress, cx = 960, cy = 640, rx = 360, ry = 210, count = 1300, seed = 8 }) => {
  const id = useId().replace(/:/g, "");
  const drops = makeDrops(count, seed);
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-d`} cx="38%" cy="34%" r="66%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="35%" stopColor="#E4D9FA" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#A48ADB" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7E62C4" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      {drops.map((p, i) => {
        const k = Math.max(0, Math.min(1, (progress - p.delay) / 0.45));
        if (k <= 0) return null;
        const e = 1 - Math.pow(1 - k, 2);
        const toward = 1 + e * p.z * 1.5;
        const x0 = cx + Math.cos(p.a) * rx * p.r0;
        const y0 = cy + Math.sin(p.a) * ry * p.r0;
        const x = cx + (x0 - cx) * (1 + e * p.d * 1.5) * toward;
        const y = cy + (y0 - cy) * (1 + e * p.d * 1.3) * toward - e * 90;
        const r = p.s * (0.6 + e * p.z * 2.6);
        const o = Math.min(1, k * 4) * (1 - Math.max(0, (k - 0.75) / 0.25) * 0.7);
        return <circle key={i} cx={x} cy={y} r={r} fill={`url(#${id}-d)`} opacity={o} />;
      })}
    </svg>
  );
};

// Slow, sparse micro-mist drifting through light (for calm shots). 1920×1080.
export const MistDrift: React.FC<{ t: number; count?: number; seed?: number }> = ({ t, count = 260, seed = 3 }) => {
  const rand = rng(seed);
  const drops = new Array(count).fill(0).map(() => ({
    x: rand() * 1920,
    y: rand() * 1080,
    s: 0.6 + rand() * rand() * 2.2,
    v: 0.6 + rand() * 1.6,
    o: 0.3 + rand() * 0.5,
  }));
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      {drops.map((p, i) => (
        <circle
          key={i}
          cx={(((p.x + p.v * t * 3) % 2000) + 2000) % 2000 - 40}
          cy={p.y - p.v * t * 0.8}
          r={p.s}
          fill="#FFFFFF"
          opacity={p.o}
        />
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------- SURFACES

// Frosted pearl glass: matte, softly grainy, pale. 1920×1080.
export const FrostedPearl: React.FC = () => {
  const id = useId().replace(/:/g, "");
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #F2EEF8 0%, #E6E0F1 60%, #DAD2EA 100%)" }}>
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: "absolute", width: "100%", height: "100%" }}>
        <defs>
          <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="9" />
            <feColorMatrix values="0 0 0 0 0.98  0 0 0 0 0.97  0 0 0 0 1  0 0 0 -1.6 1.1" />
          </filter>
        </defs>
        <rect width="1920" height="1080" filter={`url(#${id}-grain)`} opacity="0.7" />
      </svg>
    </AbsoluteFill>
  );
};

// The same pearl glass, hydrated: clear, glossy and luminous. 1920×1080.
export const GlossyPearl: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(70% 80% at 45% 40%, #FFFFFF 0%, #EEE7FB 45%, #D8CBF2 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0) 52%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.3) 74%, rgba(255,255,255,0) 78%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Tiny dewy droplets settled on glass, drawn in 1920×1080; `progress` 0–1
// lets them land (appear) at their own moments.
export const SettledDew: React.FC<{ progress: number; seed?: number; count?: number }> = ({
  progress,
  seed = 12,
  count = 420,
}) => {
  const rand = rng(seed);
  const drops = new Array(count).fill(0).map(() => ({
    x: rand() * 1920,
    y: rand() * 1080,
    r: 1.8 + rand() * rand() * rand() * 11,
    p: rand(),
  }));
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      {drops.map((d, i) => {
        const v = Math.max(0, Math.min(1, (progress - d.p * 0.8) / 0.12));
        if (v <= 0) return null;
        return (
          <g key={i} opacity={v}>
            <circle cx={d.x} cy={d.y + d.r * 0.15} r={d.r} fill="rgba(130,105,190,0.18)" />
            <circle cx={d.x} cy={d.y} r={d.r} fill="rgba(255,255,255,0.45)" stroke="rgba(120,95,190,0.55)" strokeWidth={Math.max(0.7, d.r * 0.18)} />
            <circle cx={d.x - d.r * 0.32} cy={d.y - d.r * 0.34} r={d.r * 0.28} fill="#FFFFFF" />
          </g>
        );
      })}
    </svg>
  );
};

// Luminous pearl-glass platform: lit top face, clearer lavender front face.
export const PearlPlatform: React.FC<{ top?: number }> = ({ top = 90 }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          height: top,
          background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(232,224,248,0.9) 100%)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,1)",
        }}
      />
      <AbsoluteFill
        style={{
          top,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(206,190,240,0.75) 6%, rgba(190,172,232,0.7) 60%, rgba(170,150,222,0.8) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1)",
        }}
      />
    </AbsoluteFill>
  );
};
