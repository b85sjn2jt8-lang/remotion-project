import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ANUA_PINK } from "../products";

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
export const DropletWipe: React.FC = () => {
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
        background:
          "radial-gradient(circle at 42% 44%, rgba(255,255,255,0.98) 0%, rgba(250,236,238,0.98) 22%, rgba(236,246,238,1) 52%, rgba(214,236,222,1) 82%, rgba(255,214,220,1) 96%, rgba(255,255,255,0.6) 100%)",
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

/** Scene 6 → 7: warm sunlight floods the cream from the upper right, then reveals the sun world. */
export const GoldenBloom: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 85% 10%, rgba(255,250,235,1) 0%, rgba(255,214,140,1) 35%, rgba(255,186,110,0.95) 70%, rgba(255,200,150,0.9) 100%)",
        opacity: interpolate(frame, [0, 12, 15, 25], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    />
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

/** Scene 9 → 10: glossy pink liquid surges over the lens, then drains down off it. */
export const LiquidWipe: React.FC<{ coverAt: number; drainEnd: number }> = ({ coverAt, drainEnd }) => {
  const frame = useCurrentFrame();
  const top = interpolate(frame, [0, coverAt, coverAt + 8, drainEnd], [1200, -260, -260, 1300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const w = Math.sin(frame / 3) * 60;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <linearGradient id="liq-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff7fb6" />
          <stop offset="0.12" stopColor="#f0438e" />
          <stop offset="1" stopColor="#c8156a" />
        </linearGradient>
      </defs>
      <path
        d={`M -200 ${top + 120 + w} C 300 ${top - 120}, 700 ${top + 220 - w}, 1100 ${top + 60} S 1700 ${top - 140 + w}, 2120 ${top + 80} L 2120 2600 L -200 2600 Z`}
        fill="url(#liq-g)"
      />
      <path
        d={`M -200 ${top + 150 + w} C 300 ${top - 90}, 700 ${top + 250 - w}, 1100 ${top + 90} S 1700 ${top - 110 + w}, 2120 ${top + 110}`}
        stroke="rgba(255,235,245,0.75)"
        strokeWidth={14}
        fill="none"
        style={{ filter: "blur(4px)" }}
      />
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
 * LOOP BRIDGE (production plan 2.4) — one 29-frame element split across the loop point.
 * t = 0..18 → main frames 1781..1799, t = 19..28 → main frames 0..9.
 * The Anua jar's plain upper body, built from colours sampled from the reference, approaches the
 * lens; its left edge sweeps right→left reaching x=0 at t=16 at 240 px/frame (480 px at UHD),
 * then the 2880 px blob slides purely leftwards; its trailing edge enters at t=20 and exits at t=28.
 */
export const LoopBridge: React.FC<{ offset: number }> = ({ offset }) => {
  const t = useCurrentFrame() + offset;
  const left = t <= 16 ? 1100 * (1 - Math.pow(t / 16, 3.5)) : -240 * (t - 16);
  const width = t <= 16 ? 2880 + (1 - t / 16) * 1000 : 2880;
  return (
    <div
      style={{
        position: "absolute",
        top: -80,
        bottom: -80,
        left,
        width,
        background: `linear-gradient(to bottom, ${ANUA_PINK.rim} 0%, ${ANUA_PINK.lidBand} 26%, ${ANUA_PINK.bodyLit} 31%, ${ANUA_PINK.body} 58%, ${ANUA_PINK.bodyMid} 100%)`,
        filter: "blur(10px)",
        maskImage: "linear-gradient(to right, transparent 0px, black 150px, black calc(100% - 150px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0px, black 150px, black calc(100% - 150px), transparent 100%)",
      }}
    >
      {/* soft specular streak riding with the jar surface */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 1100,
          width: 360,
          background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,245,246,0.55), rgba(255,255,255,0))",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
};
