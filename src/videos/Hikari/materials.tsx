import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the HIKARI commercial: golden sunlight, warm amber
// glass, water (caustics, surface, droplets) and translucent gel-cream.
// Each fills its parent box; scenes position and animate them on an
// <Interactive.Div> wrapper so they stay editable in the Studio.

// The cut-out pouch (579×599). Scenes set only `width`; height follows.
export const POUCH_SRC = "hikari/hikari-pouch.png";

// Full-frame golden sunlight. `open` 0 = the frame is entirely gold (the loop
// seam: first and last frame of the film), 1 = fully opened to reveal the
// scene. The gold clears from the sun point outward.
export const GoldenFlare: React.FC<{ open: number }> = ({ open }) => {
  const r = open * 3100;
  return (
    <AbsoluteFill
      style={{
        maskImage: `radial-gradient(circle at 62% 38%, rgba(0,0,0,0) ${r - 500}px, rgba(0,0,0,1) ${r}px)`,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 90% at 62% 38%, #FFFDF2 0%, #FFF0B8 18%, #FFD66B 45%, #FFB84A 75%, #FF9E4A 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          top: 380,
          height: 70,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(14px)",
        }}
      />
    </AbsoluteFill>
  );
};

// A pane of warm translucent amber glass with a bright bevelled edge.
export const AmberGlass: React.FC<{ radius?: number }> = ({ radius = 40 }) => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: radius,
        background:
          "linear-gradient(120deg, rgba(255,214,110,0.55) 0%, rgba(255,180,70,0.32) 45%, rgba(255,150,80,0.45) 100%)",
        border: "2px solid rgba(255,248,220,0.85)",
        boxShadow:
          "inset 0 0 0 10px rgba(255,236,170,0.18), inset 18px 0 40px rgba(255,255,255,0.35), 0 30px 60px rgba(200,110,30,0.18)",
        backdropFilter: "blur(14px) saturate(140%)",
      }}
    />
  );
};

// Caustic light network (the bright lines sunlight makes through water).
// Thin contours of fractal noise; scenes drift two layers against each other.
export const Caustics: React.FC<{
  seed: number;
  frequency?: number;
  color?: string;
}> = ({ seed, frequency = 0.009, color = "#FFFFFF" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={frequency}
            numOctaves="2"
            seed={seed}
          />
          <feComponentTransfer>
            <feFuncR
              type="table"
              tableValues="0 0 0 0 0 0 0 0 0 0 0.35 1 0.35 0 0 0 0 0 0 0 0 0 0"
            />
            <feFuncG
              type="table"
              tableValues="0 0 0 0 0 0 0 0 0 0 0.35 1 0.35 0 0 0 0 0 0 0 0 0 0"
            />
            <feFuncB
              type="table"
              tableValues="0 0 0 0 0 0 0 0 0 0 0.35 1 0.35 0 0 0 0 0 0 0 0 0 0"
            />
            <feFuncA type="linear" slope="0" intercept="1" />
          </feComponentTransfer>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0"
          />
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={color} filter={`url(#${id})`} />
    </svg>
  );
};

// A clear water droplet on glass: transparent body, dark refracted rim,
// bright window highlight and a caustic glint below it.
export const Droplet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 48% 48% / 54% 54% 46% 46%",
        background:
          "radial-gradient(circle at 50% 64%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.06) 40%, rgba(120,80,40,0.16) 80%, rgba(80,40,20,0.32) 100%)",
        boxShadow:
          "inset 0 -5px 8px rgba(255,255,255,0.75), inset 0 5px 7px rgba(90,50,20,0.28), 0 6px 10px rgba(120,70,30,0.18)",
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

// Translucent gel-cream: a soft jelly blob that wobbles as it settles.
// `wobble` (radians) moves the outline, `squash` > 1 flattens it on impact.
const blobPath = (wobble: number, amp: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 72; i++) {
    const t = (i / 72) * Math.PI * 2;
    const r =
      1 +
      amp *
        (0.6 * Math.sin(3 * t + wobble) + 0.4 * Math.sin(5 * t - wobble * 1.3));
    pts.push(
      `${(500 + Math.cos(t) * 380 * r).toFixed(1)} ${(500 + Math.sin(t) * 300 * r).toFixed(1)}`,
    );
  }
  return `M ${pts.join(" L ")} Z`;
};

export const GelBlob: React.FC<{ wobble: number; amp?: number }> = ({
  wobble,
  amp = 0.04,
}) => {
  const id = useId().replace(/:/g, "");
  const d = blobPath(wobble, amp);
  return (
    <svg
      viewBox="0 0 1000 1000"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.62" />
          <stop offset="40%" stopColor="#FFFCF2" stopOpacity="0.34" />
          <stop offset="78%" stopColor="#FFF1DA" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#E9C9A0" stopOpacity="0.6" />
        </radialGradient>
        <filter
          id={`${id}-gloss`}
          filterUnits="userSpaceOnUse"
          x="-500"
          y="-500"
          width="2000"
          height="2000"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="26" result="b" />
          <feSpecularLighting
            in="b"
            surfaceScale="14"
            specularConstant="1.1"
            specularExponent="38"
            lightingColor="#FFF8E8"
            result="s"
          >
            <feDistantLight azimuth="225" elevation="48" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
          <feComposite
            in="SourceGraphic"
            in2="s2"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
        <filter
          id={`${id}-rim`}
          filterUnits="userSpaceOnUse"
          x="-500"
          y="-500"
          width="2000"
          height="2000"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter
          id={`${id}-soft`}
          filterUnits="userSpaceOnUse"
          x="-500"
          y="-500"
          width="2000"
          height="2000"
        >
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      {/* Warm sunlight focused through the gel onto the glass */}
      <ellipse
        cx="640"
        cy="760"
        rx="300"
        ry="80"
        fill="#FFC861"
        opacity="0.55"
        filter={`url(#${id}-soft)`}
      />
      <path
        d={d}
        fill="#B98250"
        opacity="0.18"
        transform="translate(30 60)"
        filter={`url(#${id}-soft)`}
      />
      <g filter={`url(#${id}-gloss)`}>
        <path d={d} fill={`url(#${id}-body)`} />
      </g>
      {/* Refracted rim: gel edges bend light and read darker and warmer */}
      <path
        d={d}
        fill="none"
        stroke="#C99A66"
        strokeOpacity="0.35"
        strokeWidth="10"
        filter={`url(#${id}-rim)`}
      />
      {/* Sunlight focused inside the gel */}
      <ellipse
        cx="560"
        cy="600"
        rx="190"
        ry="70"
        fill="#FFE7A8"
        opacity="0.55"
        filter={`url(#${id}-soft)`}
      />
      <ellipse
        cx="420"
        cy="360"
        rx="120"
        ry="50"
        fill="#FFFFFF"
        opacity="0.85"
        transform="rotate(-18 420 360)"
        filter={`url(#${id}-soft)`}
      />
    </svg>
  );
};
