import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the ANUA commercial. They only draw a material
// (cotton, glass, serum) and fill their parent box — position, size and
// animation live on the <Interactive.Div> wrapper in each scene, so every
// element stays draggable and keyframeable in the Studio.

// The cut-out master product image (956×882). Never resized non-uniformly:
// scenes set only `width` and let the height follow.
export const JAR_SRC = "anua/anua-jar.png";

// A pressed cotton pad seen from the front: embossed dot quilting, fibre
// noise and a pressed seam near the rim. `tint` soaks it in pink serum (0–1).
export const CottonPad: React.FC<{ tint?: number }> = ({ tint = 0 }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 1000 1000"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="44%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="62%" stopColor="#FDF4F6" />
          <stop offset="88%" stopColor="#F5DEE4" />
          <stop offset="100%" stopColor="#EBC7D0" />
        </radialGradient>
        <radialGradient id={`${id}-soak`} cx="55%" cy="58%" r="60%">
          <stop offset="0%" stopColor="#F7B9C7" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#F2A2B5" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#E98BA2" stopOpacity="0.85" />
        </radialGradient>
        <pattern
          id={`${id}-quilt`}
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <circle cx="18" cy="18" r="5.5" fill="#D9A9B6" fillOpacity="0.32" />
          <circle cx="16.5" cy="16.5" r="3" fill="#FFFFFF" fillOpacity="0.8" />
        </pattern>
        <filter id={`${id}-fibre`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            seed="7"
          />
          <feColorMatrix
            values="0 0 0 0 0.75  0 0 0 0 0.55  0 0 0 0 0.6  0 0 0 0.55 -0.12"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id={`${id}-soft`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <circle cx="500" cy="500" r="488" />
        </clipPath>
      </defs>
      <g filter={`url(#${id}-soft)`}>
        <circle cx="500" cy="500" r="490" fill={`url(#${id}-body)`} />
        <circle
          cx="500"
          cy="500"
          r="490"
          fill={`url(#${id}-soak)`}
          opacity={tint}
        />
        <g clipPath={`url(#${id}-clip)`}>
          <rect
            x="0"
            y="0"
            width="1000"
            height="1000"
            fill={`url(#${id}-quilt)`}
          />
          <rect
            x="0"
            y="0"
            width="1000"
            height="1000"
            fill="#FFFFFF"
            filter={`url(#${id}-fibre)`}
          />
        </g>
        <circle
          cx="500"
          cy="500"
          r="452"
          fill="none"
          stroke="#E3B8C3"
          strokeOpacity="0.55"
          strokeWidth="10"
        />
        <circle
          cx="500"
          cy="500"
          r="462"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.9"
          strokeWidth="5"
        />
        <ellipse
          cx="400"
          cy="330"
          rx="230"
          ry="150"
          fill="#FFFFFF"
          opacity="0.45"
        />
      </g>
    </svg>
  );
};

// Translucent rose acrylic / glass disc with a bright rim and refraction blur.
export const GlassDisc: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        background:
          "linear-gradient(140deg, rgba(255,240,244,0.6) 0%, rgba(248,184,201,0.32) 45%, rgba(236,132,160,0.4) 100%)",
        border: "2px solid rgba(255,255,255,0.75)",
        boxShadow:
          "inset 0 0 0 6px rgba(255,255,255,0.18), inset 0 0 40px rgba(255,255,255,0.35), 0 24px 50px rgba(170,50,90,0.14)",
        backdropFilter: "blur(10px) saturate(150%)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "12%",
          top: "8%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          borderTop: "3px solid rgba(255,255,255,0.8)",
          rotate: "-30deg",
          filter: "blur(1.5px)",
        }}
      />
    </AbsoluteFill>
  );
};

// A glossy drop of pink serum (egg-shaped, lit from the top-left).
export const SerumDrop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 50% 50% / 58% 58% 42% 42%",
        background:
          "radial-gradient(circle at 36% 30%, rgba(255,255,255,0.98) 0%, rgba(255,232,238,0.8) 9%, rgba(246,160,182,0.62) 42%, rgba(220,86,124,0.85) 100%)",
        boxShadow:
          "inset -10px -16px 24px rgba(160,30,72,0.35), inset 8px 10px 18px rgba(255,255,255,0.55), 0 16px 34px rgba(190,60,95,0.28)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "58%",
          top: "62%",
          width: "18%",
          height: "12%",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.55)",
          filter: "blur(2px)",
        }}
      />
    </AbsoluteFill>
  );
};

// A tiny air bubble suspended in serum.
export const Bubble: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.85)",
        background:
          "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.15) 28%, rgba(255,210,222,0.08) 70%, rgba(255,255,255,0.35) 100%)",
        boxShadow: "0 0 8px rgba(255,255,255,0.35)",
      }}
    />
  );
};

// The large serum-soaked pad that passes the lens at the end of the film and
// is still covering it on the first frame — that shared frame is the loop seam.
// Opaque in the middle so the frame matches exactly whatever is behind it.
export const LensPad: React.FC = () => {
  return (
    <AbsoluteFill style={{ filter: "blur(10px)" }}>
      <AbsoluteFill
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, #F9D3DC 0%, #F7CAD5 55%, #F4BCCA 80%, rgba(240,170,188,0.75) 92%, rgba(240,170,188,0) 100%)",
        }}
      />
      <AbsoluteFill style={{ opacity: 0.55 }}>
        <CottonPad tint={0.75} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
