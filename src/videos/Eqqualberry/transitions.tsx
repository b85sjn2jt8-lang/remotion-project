import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { Droplet, WaterSphere } from "./materials";

// EQQUALBERRY transitions, all made of water and ice: a refraction ripple,
// a transparent water wall, frost clearing from glass, a plunge into the
// serum, and the blue water sphere passing the lens.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const Refract: React.FC<{ id: string; scale: number; freq: string }> = ({
  id,
  scale,
  freq,
}) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed="12" />
        <feDisplacementMap in="SourceGraphic" scale={scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

// The shots trade places through a passing ripple of refraction.
const RippleRefract: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  const id = entering ? "e-ripple-in" : "e-ripple-out";
  const amount = entering
    ? interpolate(p, [0, 1], [60, 0], clamp)
    : interpolate(p, [0, 1], [0, 60], clamp);
  return (
    <AbsoluteFill style={{ opacity: entering ? interpolate(p, [0.2, 0.7], [0, 1], clamp) : 1 }}>
      <Refract id={id} scale={amount} freq="0.003 0.02" />
      <AbsoluteFill style={{ filter: `url(#${id})` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

// A transparent wall of water sweeps across the lens; the new shot is behind it.
const WaterWall: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [-900, 2500], {
    ...clamp,
    easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
  });
  const amount = interpolate(p, [0, 0.5, 1], [10, 50, 10], clamp);
  return (
    <AbsoluteFill>
      <Refract id="e-wall" scale={amount} freq="0.02 0.003" />
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(90deg, rgba(0,0,0,1) ${x - 200}px, rgba(0,0,0,0) ${x + 100}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x - 450,
          width: 900,
          background:
            "linear-gradient(90deg, rgba(200,240,255,0) 0%, rgba(160,225,250,0.35) 20%, rgba(235,250,255,0.75) 48%, rgba(255,255,255,0.95) 50%, rgba(235,250,255,0.6) 54%, rgba(160,225,250,0.35) 80%, rgba(200,240,255,0) 100%)",
          backdropFilter: "blur(10px)",
          filter: "url(#e-wall)",
          maskImage:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
        }}
      />
      <AbsoluteFill style={{ left: x - 80, top: 300 + p * 500, width: 46, height: 52 }}>
        <Droplet />
      </AbsoluteFill>
      <AbsoluteFill style={{ left: x + 40, top: 120 + p * 700, width: 30, height: 34 }}>
        <Droplet />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The next shot appears behind a pane of frosted ice whose condensation
// clears from the centre outward.
const FrostClear: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill style={{ filter: `blur(${interpolate(p, [0, 0.6], [0, 14], clamp)}px)` }}>
        {children}
      </AbsoluteFill>
    );
  }
  const r = interpolate(p, [0.25, 1], [0, 1500], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.3, 1),
  });
  return (
    <AbsoluteFill style={{ opacity: interpolate(p, [0, 0.3], [0, 1], clamp) }}>
      <AbsoluteFill>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(160deg, rgba(235,250,255,0.85), rgba(190,235,250,0.75))",
          backdropFilter: "blur(18px)",
          maskImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0) ${r}px, rgba(0,0,0,1) ${r + 300}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

// The camera plunges forward into the liquid.
const MacroPlunge: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill
      style={{
        scale: entering
          ? interpolate(p, [0, 1], [0.86, 1], { ...clamp, easing: Easing.bezier(0.2, 0.7, 0.3, 1) })
          : interpolate(p, [0, 1], [1, 1.35], { ...clamp, easing: Easing.bezier(0.5, 0, 0.8, 0.5) }),
        filter: entering
          ? `blur(${interpolate(p, [0, 1], [16, 0], clamp)}px)`
          : `blur(${interpolate(p, [0, 1], [0, 16], clamp)}px)`,
        opacity: entering ? interpolate(p, [0, 0.55], [0, 1], clamp) : 1,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// A blue water sphere drifts toward the lens from the right; the next shot is
// seen through it until it fills the frame.
const SphereApproach: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const ease = Easing.bezier(0.5, 0, 0.35, 1);
  const cx = interpolate(p, [0, 1], [1700, 960], { ...clamp, easing: ease });
  const cy = interpolate(p, [0, 1], [700, 540], { ...clamp, easing: ease });
  const r = interpolate(p, [0, 1], [180, 1250], { ...clamp, easing: ease });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - r,
          top: cy - r,
          width: 2 * r,
          height: 2 * r,
          opacity: interpolate(p, [0, 0.15, 0.55, 0.8], [0, 1, 1, 0], clamp),
        }}
      >
        <WaterSphere t={p * 30} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `circle(${r * 0.94}px at ${cx}px ${cy}px)`,
          opacity: interpolate(p, [0.3, 0.6], [0, 1], clamp),
        }}
      >
        <AbsoluteFill
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            scale: interpolate(p, [0, 1], [1.2, 1], clamp),
          }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const rippleRefract = (): TransitionPresentation<NoProps> => ({ component: RippleRefract, props: {} });
export const waterWall = (): TransitionPresentation<NoProps> => ({ component: WaterWall, props: {} });
export const frostClear = (): TransitionPresentation<NoProps> => ({ component: FrostClear, props: {} });
export const macroPlunge = (): TransitionPresentation<NoProps> => ({ component: MacroPlunge, props: {} });
export const sphereApproach = (): TransitionPresentation<NoProps> => ({ component: SphereApproach, props: {} });
