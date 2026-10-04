import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the MEDICUBE Collagen Night Wrapping Mask
// commercial. The hero material is a transparent, elastic skincare film:
// clear and glossy, catching pearl, rose-gold, champagne and moonlight
// reflections. Each primitive fills its parent box; scenes position and
// animate them on an <Interactive.Div> so they stay editable in the Studio.
// `phase`/`t` props are driven by inline interpolate() calls in each scene.

// The cut-out tube (446×970). Scenes set only `width`; height follows.
export const TUBE_SRC = "medicube/medicube-tube.png";

// Soft specular bands sliding across a film — the reflections that make a
// clear membrane visible. `phase` (0–1+) moves them; `tone` picks the light.
export const FilmSheen: React.FC<{
  phase: number;
  tone?: "night" | "pearl" | "morning";
  stretch?: number;
}> = ({ phase, tone = "pearl", stretch = 1 }) => {
  const a =
    tone === "night"
      ? ["rgba(245,200,180,0.55)", "rgba(220,170,215,0.35)", "rgba(210,220,240,0.3)"]
      : tone === "morning"
        ? ["rgba(255,244,226,0.75)", "rgba(255,226,210,0.5)", "rgba(240,236,255,0.4)"]
        : ["rgba(255,236,230,0.7)", "rgba(246,200,190,0.45)", "rgba(232,222,250,0.4)"];
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          left: -1200 + phase * 900,
          width: 1400 * stretch,
          top: -400,
          height: 1900,
          rotate: "-24deg",
          background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${a[0]} 46%, rgba(255,255,255,0.85) 50%, ${a[0]} 54%, rgba(255,255,255,0) 100%)`,
          filter: "blur(18px)",
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          left: 300 + phase * 700,
          width: 900 * stretch,
          top: -400,
          height: 1900,
          rotate: "-24deg",
          background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${a[1]} 50%, rgba(255,255,255,0) 100%)`,
          filter: "blur(30px)",
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          left: 1300 + phase * 500,
          width: 260 * stretch,
          top: -400,
          height: 1900,
          rotate: "-24deg",
          background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${a[2]} 50%, rgba(255,255,255,0) 100%)`,
          filter: "blur(10px)",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

// Full-frame dark pearlescent-pink membrane: the first and last frame of the
// film (the loop seam). Deep plum base, satin sheen, faint iridescence.
export const NightMembrane: React.FC<{ phase: number }> = ({ phase }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(90% 110% at 60% 40%, #8C4062 0%, #5E2645 40%, #3A1529 75%, #240C1A 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, rgba(240,170,170,0) 20%, rgba(240,170,170,0.18) 40%, rgba(200,170,240,0.12) 55%, rgba(250,210,170,0.16) 70%, rgba(250,210,170,0) 90%)",
          mixBlendMode: "screen",
        }}
      />
      <FilmSheen phase={phase} tone="night" />
    </AbsoluteFill>
  );
};

// A free-standing piece of film stretched between two off-screen anchors
// (left and right). `tension` 0–1 pulls the sagging edges straight;
// `phase` slides the reflections. Drawn in a 1920×1080 box.
export const StretchFilm: React.FC<{
  tension: number;
  phase: number;
  tone?: "night" | "pearl" | "morning";
}> = ({ tension, phase, tone = "pearl" }) => {
  const id = useId().replace(/:/g, "");
  const sag = 240 * (1 - tension) + 40;
  const top = `M -300 260 C 500 ${260 + sag}, 1420 ${260 + sag}, 2220 260`;
  const bottom = `L 2220 860 C 1420 ${860 - sag}, 500 ${860 - sag}, -300 860 Z`;
  const d = `${top} ${bottom}`;
  const c =
    tone === "night"
      ? ["#F3C2B0", "#C9A6E0", "#FFE6D6"]
      : tone === "morning"
        ? ["#FFF1DE", "#F8D9CC", "#FFFFFF"]
        : ["#FADAD2", "#E6D2F2", "#FFF4EE"];
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-film`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor={c[0]} stopOpacity="0.1" />
          <stop offset={`${20 + phase * 30}%`} stopColor={c[0]} stopOpacity="0.32" />
          <stop offset={`${40 + phase * 30}%`} stopColor={c[2]} stopOpacity="0.55" />
          <stop offset={`${55 + phase * 30}%`} stopColor={c[1]} stopOpacity="0.28" />
          <stop offset="100%" stopColor={c[0]} stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={d} />
        </clipPath>
        <filter id={`${id}-blur`} filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="2200">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${id}-edge`} filterUnits="userSpaceOnUse" x="-500" y="-500" width="3000" height="2200">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d={d} fill={`url(#${id}-film)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {/* curved reflections that follow the film's tension */}
        <path
          d={`M -300 ${420 + sag * 0.6} C 500 ${420 + sag * 1.1}, 1420 ${420 + sag * 1.1}, 2220 ${420 + sag * 0.2}`}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.55"
          strokeWidth="46"
          filter={`url(#${id}-blur)`}
          transform={`translate(${(phase - 0.5) * 200} 0)`}
        />
        <path
          d={`M -300 ${700 - sag * 0.2} C 500 ${700 - sag * 0.9}, 1420 ${700 - sag * 0.9}, 2220 ${700 - sag * 0.4}`}
          fill="none"
          stroke={c[1]}
          strokeOpacity="0.5"
          strokeWidth="30"
          filter={`url(#${id}-blur)`}
        />
        {/* faint tension lines running to the anchors */}
        <path
          d={`M -300 560 C 600 ${520 + sag * 0.3}, 1320 ${520 + sag * 0.3}, 2220 560`}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.12 + tension * 0.2}
          strokeWidth="2"
        />
        <path
          d={`M -300 470 C 600 ${450 + sag * 0.6}, 1320 ${450 + sag * 0.6}, 2220 470`}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.1 + tension * 0.15}
          strokeWidth="1.5"
        />
      </g>
      {/* bright, slightly thicker film edges */}
      <path d={top} fill="none" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="3" filter={`url(#${id}-edge)`} />
      <path
        d={`M 2220 860 C 1420 ${860 - sag}, 500 ${860 - sag}, -300 860`}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.8"
        strokeWidth="3"
        filter={`url(#${id}-edge)`}
      />
    </svg>
  );
};

// A sheet of film curved into a sail shape — the backdrop of the final hero.
export const FilmSail: React.FC<{ phase: number }> = ({ phase }) => {
  const id = useId().replace(/:/g, "");
  const w = Math.sin(phase * Math.PI * 2) * 30;
  const d = `M 120 ${900 + w} C 220 380, 620 ${80 - w}, 1000 120 C 900 420, 760 ${760 + w}, 940 ${980 - w} Z`;
  return (
    <svg viewBox="0 0 1100 1100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#F6CFC6" stopOpacity="0.35" />
          <stop offset={`${35 + phase * 20}%`} stopColor="#FFF3EC" stopOpacity="0.7" />
          <stop offset={`${55 + phase * 20}%`} stopColor="#E4D3F2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F3C3B4" stopOpacity="0.45" />
        </linearGradient>
        <filter id={`${id}-edge`} filterUnits="userSpaceOnUse" x="-300" y="-300" width="1700" height="1700">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <path d={d} fill={`url(#${id}-g)`} />
      <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="3" filter={`url(#${id}-edge)`} />
    </svg>
  );
};

// Translucent glass crescent of light (never a cartoon moon icon).
export const GlassCrescent: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 30% 50%, rgba(255,240,236,0.6) 0%, rgba(240,200,210,0.35) 40%, rgba(220,170,200,0.25) 70%, rgba(255,255,255,0.55) 100%)",
        maskImage: "radial-gradient(circle at 66% 42%, rgba(0,0,0,0) 44%, rgba(0,0,0,1) 46%)",
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.6)",
        backdropFilter: "blur(6px)",
      }}
    />
  );
};

// Translucent rose-gold glass platform with a lit top face.
export const RoseGlass: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          top: "22%",
          borderRadius: 14,
          background:
            "linear-gradient(180deg, rgba(250,214,200,0.7) 0%, rgba(214,150,140,0.55) 55%, rgba(170,100,110,0.6) 100%)",
          border: "2px solid rgba(255,236,226,0.75)",
          boxShadow:
            "inset 0 14px 30px rgba(255,240,232,0.5), inset 0 -24px 40px rgba(90,30,50,0.3), 0 40px 60px rgba(40,10,25,0.3)",
          backdropFilter: "blur(8px)",
        }}
      />
      <AbsoluteFill
        style={{
          height: "28%",
          clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(180deg, rgba(255,242,236,0.95) 0%, rgba(240,200,190,0.9) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// An out-of-focus pearl for foreground depth.
export const Pearl: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 34% 30%, #FFFFFF 0%, #FCEDEA 18%, #EBCFD2 50%, #C99BA8 85%, #A87C8E 100%)",
        boxShadow: "inset -10px -14px 30px rgba(120,60,90,0.35), inset 10px 10px 20px rgba(255,255,255,0.6)",
      }}
    />
  );
};

// Liquid gel flowing over a surface and settling into a thin wrapping film.
// `front` (frame px) is the leading edge of the gel; well behind the front
// the gel has levelled into a smooth, mirror-like film. 1920×1080 box.
export const GelToFilm: React.FC<{ front: number; phase: number }> = ({ front, phase }) => {
  const id = useId().replace(/:/g, "");
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const y = 360 + (i / 40) * 760;
    const x =
      front +
      46 * Math.sin(i * 0.32 + phase * 1.6) +
      14 * Math.sin(i * 0.7 - phase * 2.2 + 1);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const edge = pts.join(" L ");
  const gel = `M ${front - 520} 360 L ${edge} L ${front - 520} 1120 Z`;
  return (
    <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}-gel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFEDEA" stopOpacity="0" />
          <stop offset="70%" stopColor="#FFEFEA" stopOpacity="0.36" />
          <stop offset="100%" stopColor="#FFF6F2" stopOpacity="0.6" />
        </linearGradient>
        <filter id={`${id}-gloss`} filterUnits="userSpaceOnUse" x="-1000" y="-500" width="4000" height="2200">
          <feGaussianBlur in="SourceAlpha" stdDeviation="22" result="b" />
          <feSpecularLighting in="b" surfaceScale="16" specularConstant="1.1" specularExponent="34" lightingColor="#FFF2EA" result="s">
            <feDistantLight azimuth="210" elevation="38" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
          <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3="0.9" k4="0" />
        </filter>
        <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="-1000" y="-500" width="4000" height="2200">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${id}-fine`} filterUnits="userSpaceOnUse" x="-1000" y="-500" width="4000" height="2200">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      {/* the settled film: even sheen and crisp, mirror-like reflections */}
      <linearGradient id={`${id}-filmfade`} gradientUnits="userSpaceOnUse" x1={front - 900} y1="0" x2={front - 300} y2="0">
        <stop offset="0%" stopColor="#FFF4F0" stopOpacity="0.14" />
        <stop offset="100%" stopColor="#FFF4F0" stopOpacity="0" />
      </linearGradient>
      <rect x="-200" y="360" width={Math.max(front - 300, 0) + 200} height="760" fill={`url(#${id}-filmfade)`} />
      <g opacity={front > 600 ? 1 : 0}>
        <path
          d={`M -200 ${560 + phase * 10} C 400 548, 900 552, ${front - 400} 560`}
          stroke="#FFFFFF"
          strokeOpacity="0.85"
          strokeWidth="3"
          fill="none"
          filter={`url(#${id}-fine)`}
        />
        <path
          d={`M -200 ${560 + phase * 10} C 400 548, 900 552, ${front - 400} 560`}
          stroke="#FFE6DC"
          strokeOpacity="0.5"
          strokeWidth="26"
          fill="none"
          filter={`url(#${id}-soft)`}
        />
        <path
          d={`M -200 820 C 500 806, 1000 812, ${front - 420} 820`}
          stroke="#F2D9F0"
          strokeOpacity="0.45"
          strokeWidth="18"
          fill="none"
          filter={`url(#${id}-soft)`}
        />
      </g>
      {/* the thick, still-moving gel near the front */}
      <g filter={`url(#${id}-gloss)`}>
        <path d={gel} fill={`url(#${id}-gel)`} />
      </g>
    </svg>
  );
};
