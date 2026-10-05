import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";

// ARENCIA transitions: a pulse of light filling the lens, a polished metallic
// pink band rising past it, a precise diagonal blade of light, a dolly
// through depth, and a refractive glass edge sweeping across.
// Every overlay is fully off-frame (or invisible) at progress 1, because the
// entering presentation stays applied after the transition ends.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// The circular pulse keeps expanding until it fills the lens with the next shot.
const PulseFill: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const r = interpolate(p, [0, 1], [0, 1240], { ...clamp, easing: Easing.bezier(0.4, 0.1, 0.35, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 960px 540px)` }}>
        <AbsoluteFill style={{ filter: `brightness(${interpolate(p, [0, 1], [1.35, 1], clamp)})` }}>{children}</AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 960 - r - 40,
          top: 540 - r - 40,
          width: r * 2 + 80,
          height: r * 2 + 80,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,160,205,0) 88%, rgba(255,235,245,0.95) 95%, rgba(255,160,205,0) 100%)",
          filter: "blur(4px)",
          opacity: interpolate(p, [0, 0.05, 0.9, 1], [0, 1, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// A polished metallic-pink band rises past the lens; the next shot is below it.
const ChromeRise: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const top = interpolate(p, [0, 1], [1100, -400], { ...clamp, easing: Easing.bezier(0.4, 0.05, 0.5, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `polygon(-100px ${top + 180}px, 2020px ${top + 180}px, 2020px 1200px, -100px 1200px)` }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          top,
          height: 360,
          background:
            "linear-gradient(180deg, rgba(120,20,70,0) 0%, #8E1C55 12%, #F4A6C8 28%, #FFF0F6 34%, #D45A92 46%, #7A1446 58%, #E784B0 72%, #FFE4EF 78%, #B8306F 88%, rgba(120,20,70,0) 100%)",
          filter: "blur(2px)",
        }}
      />
    </AbsoluteFill>
  );
};

// A razor-thin diagonal blade of light crosses the frame precisely; the next
// shot is on its trailing side. Blade line: x(y) = x + (540 − y)·tan 20°.
const LightBlade: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [-520, 2420], { ...clamp, easing: Easing.bezier(0.45, 0, 0.35, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `polygon(-3000px -100px, ${x + 233}px -100px, ${x - 233}px 1180px, -3000px 1180px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x - 3,
          width: 6,
          top: -300,
          height: 1680,
          rotate: "20deg",
          backgroundColor: "#FFF4F9",
          boxShadow: "0 0 16px 5px rgba(255,150,200,0.85), 0 0 60px 18px rgba(255,120,180,0.35)",
        }}
      />
    </AbsoluteFill>
  );
};

// The camera dollies through: the shot slides past into blur, the next one
// resolves from slightly behind.
const DepthDolly: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill
      style={
        entering
          ? {
              opacity: interpolate(p, [0.25, 0.75], [0, 1], clamp),
              scale: `${interpolate(p, [0, 1], [0.92, 1], { ...clamp, easing: Easing.bezier(0.2, 0.6, 0.3, 1) })}`,
              filter: `blur(${interpolate(p, [0.25, 1], [12, 0], clamp)}px)`,
            }
          : {
              scale: `${interpolate(p, [0, 1], [1, 1.25], { ...clamp, easing: Easing.bezier(0.5, 0, 0.8, 0.6) })}`,
              filter: `blur(${interpolate(p, [0.1, 0.8], [0, 16], clamp)}px)`,
            }
      }
    >
      {children}
    </AbsoluteFill>
  );
};

// A refractive edge of pink glass sweeps right to left; the next shot is
// behind it.
const GlassEdge: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [2150, -230], { ...clamp, easing: Easing.bezier(0.4, 0.05, 0.5, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `polygon(${x}px -100px, 2100px -100px, 2100px 1180px, ${x}px 1180px)` }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x,
          width: 200,
          background:
            "linear-gradient(90deg, rgba(255,240,247,0.85) 0%, rgba(255,170,210,0.3) 12%, rgba(255,190,220,0.08) 60%, rgba(255,190,220,0) 100%)",
          backdropFilter: "blur(6px) brightness(1.1)",
        }}
      />
      <AbsoluteFill
        style={{
          left: x - 2,
          width: 4,
          backgroundColor: "#FFF6FA",
          boxShadow: "0 0 14px 4px rgba(255,140,195,0.7)",
        }}
      />
    </AbsoluteFill>
  );
};

export const pulseFill = (): TransitionPresentation<NoProps> => ({ component: PulseFill, props: {} });
export const chromeRise = (): TransitionPresentation<NoProps> => ({ component: ChromeRise, props: {} });
export const lightBlade = (): TransitionPresentation<NoProps> => ({ component: LightBlade, props: {} });
export const depthDolly = (): TransitionPresentation<NoProps> => ({ component: DepthDolly, props: {} });
export const glassEdge = (): TransitionPresentation<NoProps> => ({ component: GlassEdge, props: {} });
