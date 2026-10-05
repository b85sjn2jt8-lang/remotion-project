import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";

// BEAUTY OF JOSEON Green Plum transitions: a ripple that opens like an optic,
// a translucent green organic form passing the lens, two clear sheets
// closing in from the sides, and a clear liquid level rising and draining.
// Every overlay is fully off-frame (or invisible) at progress 1, because the
// entering presentation stays applied after the transition ends.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Displace: React.FC<{ id: string; scale: number }> = ({ id, scale }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.006" numOctaves="2" seed="11" />
        <feDisplacementMap in="SourceGraphic" scale={scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

// The ripple keeps spreading and becomes an optic: inside its ring the next
// shot appears, refracted at first, then settling sharp.
const RippleOptic: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const r = interpolate(p, [0, 1], [0, 1200], { ...clamp, easing: Easing.bezier(0.35, 0.2, 0.4, 1) });
  return (
    <AbsoluteFill>
      <Displace id="gp-optic" scale={interpolate(p, [0, 1], [60, 0], clamp)} />
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 960px 540px)` }}>
        <AbsoluteFill style={{ filter: "url(#gp-optic)", scale: `${interpolate(p, [0, 1], [1.08, 1], clamp)}` }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 960 - r,
          top: 540 - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          boxShadow: "0 0 0 2px rgba(255,255,255,0.95), 0 0 0 9px rgba(90,140,120,0.22), inset 0 0 30px rgba(255,255,255,0.55)",
          opacity: interpolate(p, [0, 0.05, 0.9, 1], [0, 1, 1, 0], clamp),
        }}
      />
      <AbsoluteFill
        style={{
          left: 960 - r * 0.82,
          top: 540 - r * 0.82,
          width: r * 1.64,
          height: r * 1.64,
          borderRadius: "50%",
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.7)",
          opacity: interpolate(p, [0, 0.1, 0.8, 1], [0, 0.8, 0.5, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// A translucent pale-green organic form drifts past close to the lens; the
// next shot is behind its trailing side.
const OrganicPass: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const cx = interpolate(p, [0, 1], [2900, -1000], { ...clamp, easing: Easing.bezier(0.4, 0.05, 0.55, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ maskImage: `linear-gradient(90deg, rgba(0,0,0,0) ${cx - 200}px, #000 ${cx + 200}px)` }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - 820,
          top: 540 - 760,
          width: 1640,
          height: 1520,
          borderRadius: "46% 54% 52% 48% / 50% 44% 56% 50%",
          rotate: "-14deg",
          backdropFilter: "blur(26px) saturate(1.1)",
          background:
            "radial-gradient(55% 55% at 45% 45%, rgba(214,236,190,0.55) 0%, rgba(190,222,176,0.45) 60%, rgba(170,210,165,0.35) 100%)",
          boxShadow: "inset 0 0 80px rgba(255,255,255,0.5)",
        }}
      />
    </AbsoluteFill>
  );
};

// Two clear sheets close in from both sides, carrying the next shot, and
// meet in the middle.
const SideSheets: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  // the fade at each front must leave the frame by p = 1, so `a` runs on past the middle
  const a = interpolate(p, [0, 0.85, 1], [-60, 960, 1990], { ...clamp, easing: Easing.bezier(0.3, 0.3, 0.4, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(90deg, #000 ${a}px, rgba(0,0,0,0) ${a + 60}px, rgba(0,0,0,0) ${1860 - a}px, #000 ${1920 - a}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: a + 20,
          width: 4,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 0 18px 4px rgba(200,232,218,0.8)",
          opacity: interpolate(p, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0], clamp),
        }}
      />
      <AbsoluteFill
        style={{
          left: 1896 - a,
          width: 4,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 0 18px 4px rgba(200,232,218,0.8)",
          opacity: interpolate(p, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

const Meniscus: React.FC<{ y: number; p: number }> = ({ y, p }) => {
  const pts: string[] = [];
  for (let i = 0; i <= 32; i++) {
    const x = -40 + (2000 * i) / 32;
    pts.push(`${x.toFixed(1)} ${(y + 10 * Math.sin(i * 0.7 + p * 9) + 6 * Math.sin(i * 1.9 - p * 13)).toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <filter id="gp-men" filterUnits="userSpaceOnUse" x="-200" y="-400" width="2320" height="1880">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <path d={`M ${pts.join(" L ")}`} fill="none" stroke="rgba(120,175,150,0.5)" strokeWidth="12" filter="url(#gp-men)" />
      <path d={`M ${pts.join(" L ")}`} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="2.5" />
    </svg>
  );
};

// A clear liquid level rises and fills the lens; the next shot is below it.
const LiquidRise: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const y = interpolate(p, [0, 1], [1180, -100], { ...clamp, easing: Easing.bezier(0.35, 0, 0.45, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `polygon(-100px ${y}px, 2020px ${y}px, 2020px 1200px, -100px 1200px)` }}>
        {children}
      </AbsoluteFill>
      <Meniscus y={y} p={p} />
    </AbsoluteFill>
  );
};

// The liquid drains away downwards; the next shot is above the falling level.
const LiquidDrain: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const y = interpolate(p, [0, 1], [-100, 1180], { ...clamp, easing: Easing.bezier(0.35, 0, 0.45, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `polygon(-100px -120px, 2020px -120px, 2020px ${y}px, -100px ${y}px)` }}>
        {children}
      </AbsoluteFill>
      <Meniscus y={y} p={p} />
    </AbsoluteFill>
  );
};

export const rippleOptic = (): TransitionPresentation<NoProps> => ({ component: RippleOptic, props: {} });
export const organicPass = (): TransitionPresentation<NoProps> => ({ component: OrganicPass, props: {} });
export const sideSheets = (): TransitionPresentation<NoProps> => ({ component: SideSheets, props: {} });
export const liquidRise = (): TransitionPresentation<NoProps> => ({ component: LiquidRise, props: {} });
export const liquidDrain = (): TransitionPresentation<NoProps> => ({ component: LiquidDrain, props: {} });
