import React from "react";
import { Img, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { PRODUCTS, type ProductId } from "../products";

// Every transition is ONE element that spans the cut (placed in the main timeline across both
// scenes), so speed, blur and colour are continuous through the edit by construction.

/** A soft-edged band sliding right → left. Left edge starts at `startX` on local frame 0. */
export const BandWipe: React.FC<{
  startX: number;
  speed: number;
  width: number;
  background: string;
  feather?: number;
  blur?: number;
  children?: React.ReactNode;
}> = ({ startX, speed, width, background, feather = 120, blur = 0, children }) => {
  const frame = useCurrentFrame();
  const left = startX - speed * frame;
  const f = (feather / width) * 100;
  return (
    <div
      style={{
        position: "absolute",
        top: -60,
        bottom: -60,
        left,
        width,
        background,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        maskImage: `linear-gradient(to right, transparent 0%, black ${f}%, black ${100 - f}%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${f}%, black ${100 - f}%, transparent 100%)`,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

/** Scene 1 → 2: the Dr.Althea tube's plain white body passing the lens (CG stand-in, no text). */
export const TubeWipe: React.FC = () => (
  <BandWipe
    startX={1920}
    speed={320}
    width={3520}
    feather={260}
    blur={6}
    background="linear-gradient(to right, #e9e7e6 0%, #ffffff 18%, #fbfafa 50%, #f1efee 80%, #dedbda 100%)"
  />
);

/** Scene 3 → 4: a huge serum droplet crossing the lens, tinted pink → fresh mint. */
export const DropletWipe: React.FC<{ gradient?: string }> = ({
  gradient = "radial-gradient(circle at 42% 44%, rgba(255,255,255,0.98) 0%, rgba(250,236,238,0.98) 22%, rgba(236,246,238,1) 52%, rgba(214,236,222,1) 82%, rgba(255,214,220,1) 96%, rgba(255,255,255,0.6) 100%)",
}) => {
  const frame = useCurrentFrame();
  const cx = interpolate(frame, [0, 24], [3200, -1300]);
  return (
    <div
      style={{
        position: "absolute",
        left: cx - 1800,
        top: 540 - 1800,
        width: 3600,
        height: 3600,
        borderRadius: "50%",
        background: gradient,
        boxShadow: "inset 0 0 260px rgba(255,255,255,0.9)",
        filter: "blur(4px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "24%",
          top: "18%",
          width: "22%",
          height: "12%",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0))",
          rotate: "-28deg",
        }}
      />
    </div>
  );
};

/** Scene 4 → 5: a dark out-of-focus leaf passing close to the lens. */
export const LeafWipe: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="leafwipe-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f3a24" />
          <stop offset="0.5" stopColor="#10241a" />
          <stop offset="1" stopColor="#1b0f2e" />
        </linearGradient>
        <filter id="leafwipe-b" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <g
        filter="url(#leafwipe-b)"
        transform={`translate(${interpolate(frame, [0, 24], [2300, -2600])} 540) rotate(-14)`}
      >
        <path
          d="M -2100 0 C -1500 -1500, 1300 -1500, 2100 0 C 1300 1500, -1500 1500, -2100 0 Z"
          fill="url(#leafwipe-g)"
        />
        <path d="M -2000 0 L 2000 0" stroke="#2d5236" strokeWidth={26} opacity={0.6} />
      </g>
    </svg>
  );
};

/** Scene 5 → 6: the moon-arc highlight blooms the frame to white (a ramp, never a flash). */
export const WhiteBloom: React.FC<{ peakAt: number; hold: number; fadeOut: number; color?: string; rampIn?: number }> = ({
  peakAt,
  hold,
  fadeOut,
  color = "#fffdfb",
  rampIn = 12,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity: interpolate(
          frame,
          [peakAt - rampIn, peakAt, peakAt + hold, peakAt + hold + fadeOut],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    />
  );
};

/** Sun flare across a cut: warm bloom peaks at 65% so the image always stays visible. */
export const GoldenBloom: React.FC = () => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [0, 12, 15, 25], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", inset: 0, mixBlendMode: "screen" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 82% 12%, rgba(255,252,236,1) 0%, rgba(255,214,150,0.85) 22%, rgba(255,190,120,0.35) 55%, rgba(255,190,140,0) 85%)",
          opacity: k * 0.85,
        }}
      />
      {[0.25, 0.45, 0.62, 0.8].map((t, i) => (
        <div
          key={t}
          style={{
            position: "absolute",
            left: 1570 - t * 1400 - frame * 6,
            top: 130 + t * 760,
            width: 90 + i * 70,
            height: 90 + i * 70,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,${150 + i * 20},${190 - i * 10},0.5) 0%, rgba(255,150,190,0) 70%)`,
            opacity: k,
          }}
        />
      ))}
    </div>
  );
};

/** Scene 7 → 8: a dark palm frond silhouette sweeping across the lens. */
export const FrondWipe: React.FC = () => {
  const frame = useCurrentFrame();
  const leaflets = [-1500, -1200, -900, -600, -300, 0, 300, 600, 900, 1200, 1500];
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <filter id="frond-b" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <g filter="url(#frond-b)" transform={`translate(${interpolate(frame, [0, 24], [2600, -2700])} 540) rotate(-72)`}>
        <rect x={-1700} y={-560} width={3400} height={1120} rx={500} fill="#2b2117" />
        {leaflets.map((p) => (
          <React.Fragment key={p}>
            <ellipse cx={p} cy={-640} rx={120} ry={420} fill="#2b2117" transform={`rotate(-35 ${p} -640)`} />
            <ellipse cx={p} cy={640} rx={120} ry={420} fill="#2b2117" transform={`rotate(35 ${p} 640)`} />
          </React.Fragment>
        ))}
      </g>
    </svg>
  );
};

/**
 * Liquid surging over the lens and draining off it. Never a flat colour: the liquid body is
 * filled with real liquid texture (`texture` image) or animated ripples, plus a glossy crest.
 */
export const LiquidWipe: React.FC<{
  coverAt: number;
  drainEnd: number;
  colors?: [string, string, string];
  id?: string;
  texture?: string;
  ripples?: boolean;
  /** highest point the surface reaches (y px); -260 = covers the whole frame */
  peak?: number;
  bodyOpacity?: number;
}> = ({ coverAt, drainEnd, colors = ["#ff7fb6", "#f0438e", "#c8156a"], id = "liq-g", texture, ripples = false, peak = -260, bodyOpacity = 1 }) => {
  const frame = useCurrentFrame();
  const top = interpolate(frame, [0, coverAt, coverAt + 6, drainEnd], [1200, peak, peak, 1300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const w = Math.sin(frame / 3) * 60;
  const body = `M -200 ${top + 120 + w} C 300 ${top - 120}, 700 ${top + 220 - w}, 1100 ${top + 60} S 1700 ${top - 140 + w}, 2120 ${top + 80} L 2120 2600 L -200 2600 Z`;
  const crest = `M -200 ${top + 150 + w} C 300 ${top - 90}, 700 ${top + 250 - w}, 1100 ${top + 90} S 1700 ${top - 110 + w}, 2120 ${top + 110}`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="0.12" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={body} />
        </clipPath>
        <pattern id={`${id}-rip`} width="240" height="60" patternUnits="userSpaceOnUse" patternTransform={`translate(${frame * 9} ${frame * 3}) scale(1 0.6)`}>
          <ellipse cx="120" cy="30" rx="110" ry="14" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" />
        </pattern>
      </defs>
      <path d={body} fill={`url(#${id})`} opacity={bodyOpacity} />
      {texture ? (
        <g clipPath={`url(#${id}-clip)`}>
          <image href={texture} x={-200 - frame * 6} y={-120} width={2400} height={1790} preserveAspectRatio="xMidYMid slice" opacity={0.85} />
        </g>
      ) : null}
      {ripples ? <path d={body} fill={`url(#${id}-rip)`} /> : null}
      <path d={crest} stroke="rgba(255,240,248,0.85)" strokeWidth={14} fill="none" style={{ filter: "blur(4px)" }} />
    </svg>
  );
};

/** Scene 10 → 11: the dolly passes behind a sheer white curtain. */
export const CurtainWipe: React.FC = () => (
  <BandWipe
    startX={1920}
    speed={200}
    width={3000}
    feather={420}
    blur={3}
    background="repeating-linear-gradient(to right, rgba(255,255,255,1) 0px, rgba(248,246,242,1) 70px, rgba(255,255,255,1) 150px, rgba(242,238,232,1) 230px, rgba(255,255,255,1) 300px)"
  />
);

/**
 * A REAL product plate passing extremely close to the lens: huge, defocused, with horizontal
 * motion blur, at constant velocity (so it can span a cut). Cropped plates (Anua) get their cut
 * right/bottom edges feathered so no hard crop line is ever visible.
 */
export const LensPass: React.FC<{
  id: ProductId;
  filterId: string;
  fromX: number;
  toX: number;
  frames: number;
  y: number;
  width: number;
  rotate?: number;
  blur?: number;
  motionBlur?: number;
  offset?: number;
}> = ({ id, filterId, fromX, toX, frames, y, width, rotate = 0, blur = 14, motionBlur = 40, offset = 0 }) => {
  const t = useCurrentFrame() + offset;
  const p = PRODUCTS[id];
  const h = width * p.aspect;
  const x = interpolate(t, [0, frames], [fromX, toX]);
  const cropped = id === "anua";
  const mask = cropped
    ? "linear-gradient(to right, black 0%, black 62%, transparent 100%), linear-gradient(to bottom, black 0%, black 70%, transparent 100%)"
    : undefined;
  return (
    <div style={{ position: "absolute", inset: 0, filter: `url(#${filterId})` }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id={filterId} x="-20%" y="-5%" width="140%" height="110%">
          <feGaussianBlur stdDeviation={`${motionBlur} 2`} />
        </filter>
      </svg>
      <Img
        src={staticFile(p.src)}
        style={{
          position: "absolute",
          left: x - width / 2,
          top: y - h / 2,
          width,
          height: h,
          rotate: `${rotate}deg`,
          filter: `blur(${blur}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </div>
  );
};

/** Water splash crossing the lens: a bright water sheet + droplets, right → left. */
export const SplashWipe: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BandWipe
        startX={2100}
        speed={260}
        width={3000}
        feather={420}
        blur={8}
        background="linear-gradient(100deg, rgba(200,236,250,0.55) 0%, rgba(255,255,255,0.7) 30%, rgba(214,240,252,0.6) 60%, rgba(255,226,236,0.55) 100%)"
      />
      {new Array(34).fill(0).map((_, i) => {
        const r = (k: string) => random(`splash-${i}-${k}`);
        const size = 30 + r("s") * 220;
        const x = 2200 + r("x") * 900 - frame * (240 + r("v") * 140);
        const y = r("y") * 1180 - 50 + Math.sin(frame / 4 + i) * 10;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size * (0.8 + r("e") * 0.4),
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(190,230,250,0.35) 45%, rgba(120,190,230,0.55) 90%)",
              boxShadow: "inset 0 -6px 14px rgba(255,255,255,0.6)",
              filter: `blur(${r("b") * 6}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * LOOP BRIDGE — the REAL Anua jar crossing extremely close to the lens, one 40-frame element
 * split across the loop point: t = 0..18 → main frames 1781..1799, t = 19..39 → frames 0..20.
 * Constant velocity (150 px/frame right → left), same blur, same scale, same rotation on both
 * sides of the loop; it covers the whole frame from f1797 to f0, and clears frame by f21.
 */
export const LoopBridge: React.FC<{ offset: number }> = ({ offset }) => (
  <LensPass
    id="anua"
    filterId={`loop-mb-${offset}`}
    fromX={1100 + 150 * 19}
    toX={1100 - 150 * 21}
    frames={40}
    y={560}
    width={3200}
    rotate={-10}
    blur={12}
    motionBlur={34}
    offset={offset}
  />
);

/**
 * Glass-refraction lens crossing the cut right → left: the scenes stay visible THROUGH it
 * (backdrop blur + saturation + a bright glass rim), so the screen is never empty.
 */
export const GlassWipe: React.FC<{ tint?: string; frames?: number }> = ({ tint = "255,190,210", frames = 24 }) => {
  const frame = useCurrentFrame();
  const cx = interpolate(frame, [0, frames], [3300, -1400]);
  return (
    <div
      style={{
        position: "absolute",
        left: cx - 1600,
        top: 540 - 1600,
        width: 3200,
        height: 3200,
        borderRadius: "50%",
        backdropFilter: "blur(14px) saturate(1.35) brightness(1.06)",
        WebkitBackdropFilter: "blur(14px) saturate(1.35) brightness(1.06)",
        background: `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.18) 0%, rgba(${tint},0.12) 55%, rgba(${tint},0.35) 92%, rgba(255,255,255,0.75) 99%, rgba(255,255,255,0) 100%)`,
        boxShadow: `inset 0 0 120px rgba(255,255,255,0.55), inset 0 0 18px rgba(255,255,255,0.9)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "20%",
          top: "16%",
          width: "26%",
          height: "10%",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0))",
          rotate: "-28deg",
        }}
      />
    </div>
  );
};
