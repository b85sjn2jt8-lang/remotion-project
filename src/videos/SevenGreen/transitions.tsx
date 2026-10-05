import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { FoamMass } from "../Heartleaf/materials";
import { Droplet, Leaf } from "./materials";

// SEVEN GREEN transitions: a leaf passing close to the lens, a bank of
// forest mist, a droplet landing on the lens, and a foam curtain.
// Every overlay is fully off-frame (or invisible) at progress 1, because the
// entering presentation stays applied after the transition ends.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// A large out-of-focus leaf sweeps right-to-left across the lens; the next
// shot is revealed behind its trailing edge.
const LeafPass: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill style={{ filter: `brightness(${interpolate(p, [0, 1], [1, 0.75], clamp)})` }}>
        {children}
      </AbsoluteFill>
    );
  }
  // leaf box left edge; its centre line is at x + 650, tilted 10°
  const x = interpolate(p, [0, 1], [2000, -1700], {
    ...clamp,
    easing: Easing.bezier(0.4, 0.05, 0.55, 1),
  });
  const cx = x + 650;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `polygon(${cx + 114}px -100px, 3800px -100px, 3800px 1180px, ${cx - 111}px 1180px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x,
          top: -900,
          width: 1300,
          height: 2900,
          rotate: "10deg",
          filter: "blur(10px) brightness(0.8)",
        }}
      >
        <Leaf tone="deep" beads={false} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Forest mist drifts across; the next shot condenses out of it.
const MistDrift: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: entering ? interpolate(p, [0.3, 0.75], [0, 1], clamp) : 1,
          filter: entering
            ? `blur(${interpolate(p, [0.3, 1], [8, 0], clamp)}px)`
            : `blur(${interpolate(p, [0, 0.7], [0, 8], clamp)}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      {entering ? (
        <AbsoluteFill
          style={{
            left: -1400,
            width: 3200,
            top: -200,
            height: 1480,
            background:
              "radial-gradient(30% 45% at 30% 55%, rgba(205,228,210,0.85), rgba(205,228,210,0)), radial-gradient(28% 40% at 62% 45%, rgba(190,220,198,0.8), rgba(190,220,198,0)), radial-gradient(25% 40% at 85% 60%, rgba(205,228,210,0.7), rgba(205,228,210,0))",
            filter: "blur(30px)",
            translate: `${interpolate(p, [0, 1], [-300, 900], { ...clamp, easing: Easing.bezier(0.4, 0, 0.6, 1) })}px 0px`,
            opacity: interpolate(p, [0, 0.35, 0.65, 1], [0, 0.9, 0.9, 0], clamp),
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

// A droplet lands on the lens: the next shot appears magnified inside it,
// and the droplet spreads until it fills the frame.
const DropletLens: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill style={{ filter: `blur(${interpolate(p, [0.2, 1], [0, 6], clamp)}px)` }}>
        {children}
      </AbsoluteFill>
    );
  }
  const r = interpolate(p, [0.25, 1], [40, 1200], {
    ...clamp,
    easing: Easing.bezier(0.5, 0, 0.3, 1),
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 920,
          top: -60,
          width: 80,
          height: 100,
          translate: `0px ${interpolate(p, [0, 0.25], [0, 580], { ...clamp, easing: Easing.bezier(0.5, 0, 1, 0.5) })}px`,
          scale: `${interpolate(p, [0, 0.25], [0.6, 1.4], clamp)}`,
          opacity: interpolate(p, [0, 0.05, 0.25, 0.3], [0, 1, 1, 0], clamp),
        }}
      >
        <Droplet />
      </AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 960px 540px)` }}>
        <AbsoluteFill
          style={{
            scale: `${interpolate(p, [0.25, 1], [1.35, 1], clamp)}`,
            filter: `brightness(${interpolate(p, [0.25, 1], [1.2, 1], clamp)})`,
          }}
        >
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
          boxShadow:
            "inset 0 0 40px 10px rgba(3,14,8,0.6), inset 0 -10px 30px rgba(220,245,225,0.45), 0 0 0 2px rgba(220,245,225,0.35)",
          opacity: interpolate(p, [0.25, 0.3, 0.85, 1], [0, 1, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// Two banks of foam close in from top and bottom, then part on the next shot.
const FoamCurtain: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const close = interpolate(p, [0, 0.45, 0.55, 1], [0, 1, 1, 0], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: interpolate(p, [0.49, 0.51], [0, 1], clamp) }}>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          left: -140,
          top: 0,
          width: 2200,
          height: 760,
          translate: `0px ${interpolate(close, [0, 1], [-900, -150], clamp)}px`,
          scale: "1 -1",
          filter: "drop-shadow(0 -20px 40px rgba(0,10,4,0.5))",
        }}
      >
        <FoamMass t={p * 14} w={2200} h={760} edge="top" seed={8} bubbleScale={1.8} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: -140,
          top: 0,
          width: 2200,
          height: 760,
          translate: `0px ${interpolate(close, [0, 1], [1200, 470], clamp)}px`,
          filter: "drop-shadow(0 -20px 40px rgba(0,10,4,0.5))",
        }}
      >
        <FoamMass t={p * 14} w={2200} h={760} edge="top" seed={12} bubbleScale={1.8} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: "linear-gradient(0deg, rgba(40,110,64,0.4), rgba(40,110,64,0.05))",
          mixBlendMode: "multiply",
          opacity: close,
        }}
      />
    </AbsoluteFill>
  );
};

export const leafPass = (): TransitionPresentation<NoProps> => ({ component: LeafPass, props: {} });
export const mistDrift = (): TransitionPresentation<NoProps> => ({ component: MistDrift, props: {} });
export const dropletLens = (): TransitionPresentation<NoProps> => ({ component: DropletLens, props: {} });
export const foamCurtain = (): TransitionPresentation<NoProps> => ({ component: FoamCurtain, props: {} });
