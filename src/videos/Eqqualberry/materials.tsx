import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the EQQUALBERRY commercial: deep glacier water,
// the blue water sphere with ceramide flakes, ice, bubbles and droplets.
// Each fills its parent box; scenes position, size and animate them on an
// <Interactive.Div> so they stay editable in the Studio. Time-based props
// (`t`, in frames) are driven by an inline interpolate() in each scene.

// The cut-out bottle (570×1072). Scenes set only `width`; height follows.
export const BOTTLE_SRC = "eqqualberry/eqqualberry-bottle.png";

// Deterministic pseudo-random numbers so flakes and bubbles never change
// between renders.
const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

type Flake = { x: number; y: number; s: number; r: number; o: number; d: string };
const makeFlakes = (count: number, seed: number): Flake[] => {
  const rand = rng(seed);
  return new Array(count).fill(0).map(() => {
    // Irregular 5–7 sided platelet, like a ceramide flake in the serum.
    const sides = 5 + Math.floor(rand() * 3);
    const pts: string[] = [];
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2 + rand() * 0.5;
      const rr = 0.55 + rand() * 0.45;
      pts.push(`${(Math.cos(a) * rr).toFixed(3)} ${(Math.sin(a) * rr * 0.75).toFixed(3)}`);
    }
    return {
      x: rand(),
      y: rand(),
      s: 0.4 + rand() * rand() * 2.2,
      r: rand() * 360,
      o: 0.45 + rand() * 0.5,
      d: `M ${pts.join(" L ")} Z`,
    };
  });
};

// White ceramide flakes suspended in liquid, drifting with the fluid.
// `t` (frames) moves them; `size` scales them; `count` sets density.
export const CeramideFlakes: React.FC<{
  t: number;
  count?: number;
  size?: number;
  seed?: number;
}> = ({ t, count = 160, size = 6, seed = 11 }) => {
  const flakes = makeFlakes(count, seed);
  return (
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      {flakes.map((f, i) => {
        const drift = Math.sin(t * 0.03 + i) * 6;
        const x = (f.x * 1000 + t * (0.4 + f.s * 0.3) + drift + 1000) % 1000;
        const y = (f.y * 1000 - t * 0.25 * f.s + Math.cos(t * 0.02 + i * 1.7) * 5 + 1000) % 1000;
        return (
          <path
            key={i}
            d={f.d}
            fill="#FFFFFF"
            opacity={f.o}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(f.r + t * 0.4 * (i % 2 ? 1 : -1)).toFixed(1)}) scale(${(f.s * size).toFixed(2)})`}
          />
        );
      })}
    </svg>
  );
};

type B = { x: number; y: number; r: number; v: number };
const makeBubbles = (count: number, seed: number): B[] => {
  const rand = rng(seed);
  return new Array(count).fill(0).map(() => ({
    x: rand(),
    y: rand(),
    r: 3 + rand() * rand() * 22,
    v: 0.6 + rand() * 1.6,
  }));
};

// Rising micro bubbles: a thin bright rim, clear centre and a highlight.
export const Bubbles: React.FC<{ t: number; count?: number; seed?: number }> = ({
  t,
  count = 26,
  seed = 5,
}) => {
  const bubbles = makeBubbles(count, seed);
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
      {bubbles.map((b, i) => {
        const y = (((b.y * 1180 - t * b.v * 2.2) % 1180) + 1180) % 1180 - 50;
        const x = b.x * 1920 + Math.sin(t * 0.08 + i) * 4;
        return (
          <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <circle r={b.r} fill="rgba(255,255,255,0.08)" stroke="rgba(235,250,255,0.85)" strokeWidth={Math.max(1, b.r * 0.12)} />
            <circle cx={-b.r * 0.35} cy={-b.r * 0.35} r={b.r * 0.28} fill="rgba(255,255,255,0.9)" />
          </g>
        );
      })}
    </svg>
  );
};

// Fine caustic network (bright contour lines of fractal noise).
export const Caustics: React.FC<{ seed: number; frequency?: number }> = ({
  seed,
  frequency = 0.012,
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves="2" seed={seed} />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 0 0 0 0 0 0 0 0 0 0.4 1 0.4 0 0 0 0 0 0 0 0 0 0" />
            <feFuncG type="table" tableValues="0 0 0 0 0 0 0 0 0 0 0.4 1 0.4 0 0 0 0 0 0 0 0 0 0" />
            <feFuncB type="table" tableValues="0 0 0 0 0 0 0 0 0 0 0.4 1 0.4 0 0 0 0 0 0 0 0 0 0" />
            <feFuncA type="linear" slope="0" intercept="1" />
          </feComponentTransfer>
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" />
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
};

// Full-frame underwater view: depth gradient, light from the surface, god
// rays, caustics, bubbles and a few suspended flakes. At t = 0 it is exactly
// the first (and last) frame of the film — the loop seam.
export const Underwater: React.FC<{ t: number }> = ({ t }) => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #7FD6F5 0%, #36A9DE 22%, #137FC0 52%, #0A5794 78%, #063E72 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          top: -60,
          height: 200,
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(230,250,255,0.9), rgba(230,250,255,0))",
          filter: "blur(10px)",
        }}
      />
      <AbsoluteFill
        style={{
          left: -400,
          width: 2720,
          background:
            "repeating-linear-gradient(105deg, rgba(220,248,255,0) 0px, rgba(220,248,255,0.16) 60px, rgba(220,248,255,0) 160px, rgba(220,248,255,0) 330px)",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
          filter: "blur(14px)",
          translate: `${t * 1.2}px 0px`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.12,
          mixBlendMode: "screen",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          translate: `${-t * 0.8}px ${t * 0.3}px`,
          left: -200,
          width: 2400,
        }}
      >
        <Caustics seed={7} frequency={0.011} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.55, filter: "blur(1.5px)" }}>
        <CeramideFlakes t={t} count={50} size={4} seed={3} />
      </AbsoluteFill>
      <AbsoluteFill>
        <Bubbles t={t} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The big translucent blue water sphere from the product's own key visual:
// refractive cyan body, suspended flakes, a glossy window highlight.
export const WaterSphere: React.FC<{ t: number }> = ({ t }) => {
  return (
    <AbsoluteFill style={{ borderRadius: "50%", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 46% 40%, rgba(150,225,250,0.85) 0%, rgba(70,185,232,0.8) 45%, rgba(25,135,200,0.85) 80%, rgba(12,95,165,0.95) 100%)",
        }}
      />
      <AbsoluteFill style={{ opacity: 0.85 }}>
        <CeramideFlakes t={t} count={420} size={5} seed={19} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          borderRadius: "50%",
          boxShadow:
            "inset 0 0 0 3px rgba(225,250,255,0.55), inset -40px -60px 120px rgba(4,60,120,0.45), inset 40px 50px 90px rgba(220,248,255,0.35)",
        }}
      />
      <AbsoluteFill
        style={{
          left: "10%",
          top: "12%",
          width: "36%",
          height: "22%",
          borderRadius: "50%",
          borderTop: "14px solid rgba(255,255,255,0.75)",
          rotate: "-32deg",
          filter: "blur(4px)",
        }}
      />
    </AbsoluteFill>
  );
};

// Thick block of clear ice / glass seen almost head-on, with a lit top face,
// faint internal fractures and trapped bubbles.
export const IceBlock: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          top: "18%",
          borderRadius: 18,
          background:
            "linear-gradient(180deg, rgba(225,248,255,0.75) 0%, rgba(160,220,242,0.55) 45%, rgba(110,190,228,0.6) 100%)",
          border: "2px solid rgba(255,255,255,0.8)",
          boxShadow:
            "inset 0 12px 30px rgba(255,255,255,0.6), inset 0 -30px 50px rgba(30,110,170,0.25), 0 40px 60px rgba(10,60,110,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", opacity: 0.5 }}>
          <path d="M 12 20 L 28 46 L 22 70 M 28 46 L 44 52" stroke="#FFFFFF" strokeWidth="0.35" fill="none" />
          <path d="M 70 15 L 62 40 L 78 62 L 74 88" stroke="#FFFFFF" strokeWidth="0.3" fill="none" />
          <circle cx="40" cy="74" r="1.2" fill="none" stroke="#FFFFFF" strokeWidth="0.3" />
          <circle cx="58" cy="30" r="0.8" fill="none" stroke="#FFFFFF" strokeWidth="0.3" />
          <circle cx="86" cy="50" r="1" fill="none" stroke="#FFFFFF" strokeWidth="0.3" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          height: "24%",
          clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(180deg, rgba(250,254,255,0.95) 0%, rgba(205,240,252,0.85) 100%)",
          boxShadow: "inset 0 -2px 0 rgba(255,255,255,0.9)",
        }}
      />
    </AbsoluteFill>
  );
};

// A clear water droplet / condensation bead on a surface.
export const Droplet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 48% 48% / 54% 54% 46% 46%",
        background:
          "radial-gradient(circle at 50% 66%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 42%, rgba(10,70,130,0.18) 82%, rgba(5,45,95,0.35) 100%)",
        boxShadow:
          "inset 0 -5px 8px rgba(255,255,255,0.75), inset 0 5px 7px rgba(5,50,100,0.3), 0 6px 10px rgba(5,50,100,0.18)",
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

// A sharp-edged shard of glacier ice.
export const IceShard: React.FC<{ variant?: 0 | 1 }> = ({ variant = 0 }) => {
  const id = useId().replace(/:/g, "");
  const d =
    variant === 0
      ? "M 50 0 L 88 30 L 100 78 L 62 100 L 14 86 L 0 40 Z"
      : "M 30 0 L 100 18 L 84 70 L 46 100 L 0 64 Z";
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2FCFF" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#A8E2F6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3FA5D8" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} stroke="rgba(255,255,255,0.9)" strokeWidth="0.8" />
      <path d="M 50 0 L 56 52 L 100 78 M 56 52 L 14 86" stroke="rgba(255,255,255,0.55)" strokeWidth="0.5" fill="none" />
    </svg>
  );
};

// Height of the rippling water surface at x for a given phase.
const surfaceY = (x: number, y: number, phase: number, amp: number) =>
  y +
  amp *
    (0.6 * Math.sin((x / 1920) * Math.PI * 2 * 1.6 + phase) +
      0.4 * Math.sin((x / 1920) * Math.PI * 2 * 3.4 - phase * 1.3 + 0.7));

// CSS clip-path for everything BELOW the water surface at height `y`.
export const belowSurfaceClip = (y: number, phase: number, amp = 18) => {
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const x = (i / 48) * 1920;
    pts.push(`${x.toFixed(0)}px ${surfaceY(x, y, phase, amp).toFixed(1)}px`);
  }
  return `polygon(${pts.join(", ")}, 1920px 2400px, 0px 2400px)`;
};

// The bright meniscus line where the camera crosses the water surface.
export const Waterline: React.FC<{ y: number; phase: number; amp?: number }> = ({
  y,
  phase,
  amp = 18,
}) => {
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const x = (i / 48) * 1920;
    pts.push(`${x.toFixed(0)} ${surfaceY(x, y, phase, amp).toFixed(1)}`);
  }
  const d = `M ${pts.join(" L ")}`;
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <path d={d} fill="none" stroke="rgba(150,220,245,0.6)" strokeWidth="26" style={{ filter: "blur(10px)" }} />
      <path d={d} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="4" style={{ filter: "blur(1px)" }} />
    </svg>
  );
};
