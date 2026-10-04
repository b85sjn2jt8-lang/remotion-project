import { useId } from "react";
import { AbsoluteFill } from "remotion";

// Material primitives for the A BONNE commercial: milk, lotion, collagen
// spheres and water drops. Each one fills its parent box; scenes position,
// size and animate them on an <Interactive.Div> wrapper so they stay editable
// in the Studio. Liquid shapes take a `phase` (radians) that scenes animate
// with an inline interpolate() to make the milk flow.

// The cut-out master product image (260×753). Scenes set only `width`, the
// height follows, so the bottle is never stretched.
export const BOTTLE_SRC = "abonne/abonne-bottle.png";

// Height of a wavy edge at x (0–1000) for a given phase.
const waveY = (x: number, phase: number, amp: number) =>
  amp *
  (0.62 * Math.sin((x / 1000) * Math.PI * 2 * 1.3 + phase) +
    0.38 * Math.sin((x / 1000) * Math.PI * 2 * 2.7 - phase * 1.4 + 1.1));

const edge = (y: number, phase: number, amp: number, reverse: boolean) => {
  const pts: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const x = reverse ? 1000 - i * 20 : i * 20;
    pts.push(`${x} ${(y + waveY(x, phase, amp)).toFixed(1)}`);
  }
  return pts.join(" L ");
};

// Glossy relief lighting shared by the liquids: the soft alpha edge becomes a
// rounded, wet highlight, so milk reads as thick liquid rather than flat paint.
const Gloss: React.FC<{ id: string; blur: number; strength: number }> = ({
  id,
  blur,
  strength,
}) => (
  <filter
    id={id}
    filterUnits="userSpaceOnUse"
    x="-3000"
    y="-3000"
    width="9000"
    height="9000"
  >
    <feGaussianBlur in="SourceAlpha" stdDeviation={blur} result="b" />
    <feSpecularLighting
      in="b"
      surfaceScale="11"
      specularConstant="1"
      specularExponent="30"
      lightingColor="#FFFFFF"
      result="s"
    >
      <feDistantLight azimuth="235" elevation="42" />
    </feSpecularLighting>
    <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
    <feComposite
      in="SourceGraphic"
      in2="s2"
      operator="arithmetic"
      k1="0"
      k2="1"
      k3={strength}
      k4="0"
    />
  </filter>
);

// Gaussian blur with a user-space region, so wide strokes are never clipped
// to their thin bounding box.
const Blur: React.FC<{ id: string; amount: number }> = ({ id, amount }) => (
  <filter
    id={id}
    filterUnits="userSpaceOnUse"
    x="-3000"
    y="-3000"
    width="9000"
    height="9000"
  >
    <feGaussianBlur stdDeviation={amount} />
  </filter>
);

// A body of milk with a flowing, wavy surface along the top of the box.
export const MilkWave: React.FC<{ phase: number; amp?: number }> = ({
  phase,
  amp = 40,
}) => {
  const id = useId().replace(/:/g, "");
  const top = amp + 10;
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`${id}-milk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="18%" stopColor="#FDF2F4" />
          <stop offset="55%" stopColor="#F9E3E9" />
          <stop offset="100%" stopColor="#F1C9D4" />
        </linearGradient>
        <Gloss id={`${id}-gloss`} blur={9} strength={0.55} />
      </defs>
      <g filter={`url(#${id}-gloss)`}>
        <path
          d={`M ${edge(top, phase, amp, false)} L 1000 600 L 0 600 Z`}
          fill={`url(#${id}-milk)`}
        />
      </g>
      <path
        d={`M ${edge(top + 30, phase, amp, false)}`}
        fill="none"
        stroke="#E7A2B6"
        strokeOpacity="0.5"
        strokeWidth="34"
        style={{ filter: "blur(12px)" }}
      />
      <path
        d={`M ${edge(top + 5, phase, amp, false)}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="9"
        style={{ filter: "blur(2px)" }}
      />
      <path
        d={`M ${edge(top + 150, phase + 1.7, amp * 0.8, false)}`}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.95"
        strokeWidth="26"
        style={{ filter: "blur(9px)" }}
      />
      <path
        d={`M ${edge(top + 178, phase + 1.7, amp * 0.8, false)}`}
        fill="none"
        stroke="#EBA9BC"
        strokeOpacity="0.4"
        strokeWidth="26"
        style={{ filter: "blur(12px)" }}
      />
      <path
        d={`M ${edge(top + 330, phase + 3.1, amp * 0.6, false)}`}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.8"
        strokeWidth="40"
        style={{ filter: "blur(16px)" }}
      />
    </svg>
  );
};

// A tall sheet of milk with wavy top and bottom edges. When it is centred on
// the frame it covers everything — the loop seam between the last and first
// frame of the film.
export const MilkSheet: React.FC<{ phase: number }> = ({ phase }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 1000 2000"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`${id}-milk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FBEDF0" />
          <stop offset="50%" stopColor="#F8E2E8" />
          <stop offset="70%" stopColor="#FBEDF0" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <Gloss id={`${id}-gloss`} blur={14} strength={0.5} />
      </defs>
      <g filter={`url(#${id}-gloss)`}>
        <path
          d={`M ${edge(70, phase, 60, false)} L ${edge(1930, phase + 2, 60, true)} Z`}
          fill={`url(#${id}-milk)`}
        />
      </g>
      <path
        d={`M ${edge(560, phase * 0.7, 90, false)}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="50"
        style={{ filter: "blur(18px)" }}
      />
      <path
        d={`M ${edge(620, phase * 0.7, 90, false)}`}
        fill="none"
        stroke="#ECAFC0"
        strokeOpacity="0.45"
        strokeWidth="60"
        style={{ filter: "blur(28px)" }}
      />
      <path
        d={`M ${edge(900, phase * 0.6 + 1, 110, false)}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="70"
        style={{ filter: "blur(24px)" }}
      />
      <path
        d={`M ${edge(980, phase * 0.6 + 1, 110, false)}`}
        fill="none"
        stroke="#EDB4C4"
        strokeOpacity="0.4"
        strokeWidth="70"
        style={{ filter: "blur(34px)" }}
      />
      <path
        d={`M ${edge(1300, phase * 0.5 + 2.2, 90, false)}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="60"
        style={{ filter: "blur(22px)" }}
      />
      <path
        d={`M ${edge(1370, phase * 0.5 + 2.2, 90, false)}`}
        fill="none"
        stroke="#EDB4C4"
        strokeOpacity="0.38"
        strokeWidth="60"
        style={{ filter: "blur(30px)" }}
      />
    </svg>
  );
};

// A thick ribbon of lotion drawn along `d` (viewBox 1920×1080). `progress`
// 0–1 is where its head is along the path, `tail` where its end is.
export const LotionRibbon: React.FC<{
  d: string;
  progress: number;
  tail?: number;
  width?: number;
}> = ({ d, progress, tail = 0, width = 150 }) => {
  const id = useId().replace(/:/g, "");
  const dash = `${Math.max(progress - tail, 0.0001)} 2`;
  const stroke = {
    d,
    pathLength: 1,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: dash,
    strokeDashoffset: -tail,
  } as const;
  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <Gloss id={`${id}-gloss`} blur={width / 8} strength={0.6} />
        <Blur id={`${id}-b1`} amount={width * 0.09} />
        <Blur id={`${id}-b2`} amount={width * 0.03} />
        <Blur id={`${id}-b3`} amount={width * 0.025} />
        <Blur id={`${id}-b4`} amount={width * 0.05} />
        <Blur id={`${id}-b5`} amount={width * 0.01} />
      </defs>
      {/* Soft shadow the ribbon casts on the surface below it */}
      <path
        {...stroke}
        stroke="#C8708F"
        strokeOpacity="0.32"
        strokeWidth={width * 1.02}
        transform={`translate(0 ${width * 0.12})`}
        filter={`url(#${id}-b1)`}
      />
      <g filter={`url(#${id}-gloss)`}>
        {/* Rolled-under edge, slightly pink */}
        <path {...stroke} stroke="#F3D0DA" strokeWidth={width} />
        {/* Cream body */}
        <path
          {...stroke}
          stroke="#FFF6F8"
          strokeWidth={width * 0.8}
          transform={`translate(0 ${-width * 0.05})`}
          filter={`url(#${id}-b2)`}
        />
      </g>
      {/* Fold line where the ribbon turns under */}
      <path
        {...stroke}
        stroke="#E7A6B9"
        strokeOpacity="0.55"
        strokeWidth={width * 0.07}
        transform={`translate(0 ${width * 0.26})`}
        filter={`url(#${id}-b3)`}
      />
      {/* Wet highlight along the crest */}
      <path
        {...stroke}
        stroke="#FFFFFF"
        strokeWidth={width * 0.22}
        transform={`translate(0 ${-width * 0.2})`}
        filter={`url(#${id}-b4)`}
      />
      <path
        {...stroke}
        stroke="#FFFFFF"
        strokeWidth={width * 0.05}
        transform={`translate(0 ${-width * 0.24})`}
        filter={`url(#${id}-b5)`}
      />
    </svg>
  );
};

// A transparent collagen sphere: thick pearly rim, soft pink core, one
// window highlight and a little refraction of whatever is behind it.
export const CollagenSphere: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 50% 55%, rgba(255,236,242,0.08) 0%, rgba(255,226,235,0.12) 55%, rgba(255,214,228,0.4) 82%, rgba(255,255,255,0.75) 97%, rgba(255,255,255,0.2) 100%)",
        boxShadow:
          "inset 0 -24px 40px rgba(232,128,160,0.28), inset 0 18px 30px rgba(255,255,255,0.45), 0 20px 50px rgba(200,90,125,0.12)",
        backdropFilter: "blur(3px) brightness(1.06) saturate(1.15)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "18%",
          top: "10%",
          width: "34%",
          height: "20%",
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0))",
          rotate: "-28deg",
        }}
      />
      <AbsoluteFill
        style={{
          left: "58%",
          top: "70%",
          width: "22%",
          height: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(255,255,255,0))",
          rotate: "-30deg",
        }}
      />
    </AbsoluteFill>
  );
};

// A clear water droplet resting on a glossy surface.
export const WaterDrop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        borderRadius: "50% 50% 46% 46% / 56% 56% 44% 44%",
        background:
          "radial-gradient(circle at 50% 70%, rgba(255,255,255,0.55) 0%, rgba(255,230,238,0.1) 45%, rgba(214,90,130,0.25) 85%, rgba(160,40,80,0.35) 100%)",
        boxShadow:
          "inset 0 -6px 10px rgba(255,255,255,0.65), inset 0 6px 8px rgba(170,50,90,0.3), 0 8px 12px rgba(170,50,90,0.2)",
      }}
    >
      <AbsoluteFill
        style={{
          left: "24%",
          top: "16%",
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
