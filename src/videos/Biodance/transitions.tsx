import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { JellySurface, MistDrift, OpticalSphere } from "./materials";

// BIODANCE transitions: the jelly stretching toward the lens and clearing,
// a passage through the giant sphere, a soft wall of jelly sliding past, a
// veil of micro mist, and an optical sphere rolling across the lens.
// Every overlay is fully off-frame (or invisible) at progress 1, because the
// entering presentation stays applied after the transition ends.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// The jelly stretches toward the camera and turns transparent, the next shot
// clearing through its refraction.
const JellyStretch: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill
        style={{
          scale: `${interpolate(p, [0, 1], [1, 1.6], { ...clamp, easing: Easing.bezier(0.5, 0, 0.7, 0.6) })}`,
          filter: `blur(${interpolate(p, [0.1, 0.8], [0, 12], clamp)}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }
  const amount = interpolate(p, [0.2, 1], [80, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: interpolate(p, [0.2, 0.7], [0, 1], clamp) }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="bd-stretch" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="2" seed="5" />
            <feDisplacementMap in="SourceGraphic" scale={amount} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <AbsoluteFill
        style={{
          filter: "url(#bd-stretch)",
          scale: `${interpolate(p, [0.2, 1], [1.08, 1], clamp)}`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: "rgba(214,198,246,0.6)",
          opacity: interpolate(p, [0.2, 1], [1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// The camera passes through the giant sphere (centred near the cap at
// 1182, 514): the next world opens inside its optical rim.
const ThroughSphere: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const r = interpolate(p, [0, 1], [0, 1800], { ...clamp, easing: Easing.bezier(0.45, 0.1, 0.4, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 1182px 514px)` }}>
        <AbsoluteFill style={{ scale: `${interpolate(p, [0, 1], [1.3, 1], clamp)}` }}>{children}</AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 1182 - r - 60,
          top: 514 - r - 60,
          width: r * 2 + 120,
          height: r * 2 + 120,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(200,180,245,0) 82%, rgba(170,145,225,0.55) 90%, rgba(255,255,255,0.85) 95%, rgba(200,180,245,0) 100%)",
          filter: "blur(5px)",
          opacity: interpolate(p, [0, 0.05, 0.9, 1], [0, 1, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// A soft translucent wall of jelly slides across from the right; the next
// shot is behind its trailing side.
const JellyWall: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [2000, -900], { ...clamp, easing: Easing.bezier(0.4, 0.05, 0.5, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ maskImage: `linear-gradient(90deg, rgba(0,0,0,0) ${x + 300}px, #000 ${x + 520}px)` }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x,
          width: 820,
          borderRadius: "40% 60% 55% 45% / 50% 50% 50% 50%",
          overflow: "hidden",
          opacity: 0.92,
          boxShadow: "inset 20px 0 40px rgba(255,255,255,0.7), inset -20px 0 40px rgba(150,125,210,0.35)",
        }}
      >
        <AbsoluteFill style={{ width: 1920 }}>
          <JellySurface />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A veil of micro mist drifts across the lens; the next shot condenses out of it.
const MistVeil: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: entering ? interpolate(p, [0.3, 0.75], [0, 1], clamp) : 1,
          filter: entering
            ? `blur(${interpolate(p, [0.3, 1], [6, 0], clamp)}px)`
            : `blur(${interpolate(p, [0, 0.7], [0, 6], clamp)}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      {entering ? (
        <AbsoluteFill style={{ opacity: interpolate(p, [0, 0.3, 0.7, 1], [0, 1, 1, 0], clamp) }}>
          <AbsoluteFill
            style={{ background: "radial-gradient(70% 70% at 50% 50%, rgba(255,255,255,0.75), rgba(236,228,250,0.35))" }}
          />
          <MistDrift t={p * 120} count={700} seed={21} />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

// A large optical sphere rolls across the lens left to right; the next shot
// is behind it.
const SphereRoll: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const cx = interpolate(p, [0, 1], [-700, 2640], { ...clamp, easing: Easing.bezier(0.4, 0.05, 0.5, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ maskImage: `linear-gradient(90deg, #000 ${cx - 200}px, rgba(0,0,0,0) ${cx + 200}px)` }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - 640,
          top: 540 - 640,
          width: 1280,
          height: 1280,
          backdropFilter: "blur(14px)",
          borderRadius: "50%",
        }}
      >
        <OpticalSphere />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const jellyStretch = (): TransitionPresentation<NoProps> => ({ component: JellyStretch, props: {} });
export const throughSphere = (): TransitionPresentation<NoProps> => ({ component: ThroughSphere, props: {} });
export const jellyWall = (): TransitionPresentation<NoProps> => ({ component: JellyWall, props: {} });
export const mistVeil = (): TransitionPresentation<NoProps> => ({ component: MistVeil, props: {} });
export const sphereRoll = (): TransitionPresentation<NoProps> => ({ component: SphereRoll, props: {} });
