import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { Condensation, filmPath } from "./materials";

// ANUA Birch 70 transitions: a frosted pane sliding past the lens, a large
// dew drop rolling down the lens, a thin serum film spreading, and a rack
// focus. Every overlay is fully off-frame (or invisible) at progress 1,
// because the entering presentation stays applied after the transition ends.

type SlideProps = { from: "right" | "left" };
type NoProps = Record<string, never>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// A wide pane of frosted, beaded glass slides past close to the lens; the
// next shot is sharp behind its trailing half.
const FrostedGlassSlide: React.FC<TransitionPresentationComponentProps<SlideProps>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
  passedProps,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const fromRight = passedProps.from === "right";
  // pane box is 1500 wide; its middle hides the cut line
  const x = interpolate(p, [0, 1], fromRight ? [1920, -1560] : [-1500, 1980], {
    ...clamp,
    easing: Easing.bezier(0.4, 0.05, 0.5, 1),
  });
  const cut = x + 750;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: fromRight
            ? `polygon(${cut}px -100px, 3600px -100px, 3600px 1180px, ${cut}px 1180px)`
            : `polygon(-1700px -100px, ${cut}px -100px, ${cut}px 1180px, -1700px 1180px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x,
          width: 1500,
          backdropFilter: "blur(22px) brightness(1.06)",
          background:
            "linear-gradient(90deg, rgba(250,252,254,0.5) 0%, rgba(240,246,251,0.35) 50%, rgba(250,252,254,0.5) 100%)",
          boxShadow:
            "inset 3px 0 0 rgba(255,255,255,0.95), inset -3px 0 0 rgba(255,255,255,0.95), inset 14px 0 24px rgba(190,210,228,0.4), inset -14px 0 24px rgba(190,210,228,0.4)",
        }}
      >
        <AbsoluteFill style={{ left: 0, width: 1500, overflow: "hidden" }}>
          <AbsoluteFill style={{ width: 1920 }}>
            <Condensation progress={1} seed={19} count={800} />
          </AbsoluteFill>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A large dew drop rolls down the lens. It refracts and brightens what is
// behind it; above its centre line, the next shot.
const DewRoll: React.FC<TransitionPresentationComponentProps<NoProps>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const y = interpolate(p, [0, 1], [-720, 1800], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.6, 1),
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `polygon(-100px -100px, 2020px -100px, 2020px ${y}px, -100px ${y}px)` }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: -240,
          top: y - 600,
          width: 2400,
          height: 1200,
          borderRadius: "50%",
          backdropFilter: "blur(9px) brightness(1.1) saturate(1.1)",
          background:
            "radial-gradient(50% 50% at 50% 62%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 60%, rgba(150,178,205,0.22) 92%, rgba(130,160,190,0.35) 100%)",
          boxShadow:
            "inset 0 -30px 60px rgba(255,255,255,0.6), inset 0 30px 60px rgba(120,150,180,0.25)",
        }}
      />
      <AbsoluteFill
        style={{
          left: 520,
          top: y - 520,
          width: 520,
          height: 180,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0))",
          filter: "blur(8px)",
        }}
      />
    </AbsoluteFill>
  );
};

// A thin, glossy serum film spreads out from the centre carrying the next shot.
const SerumSpread: React.FC<TransitionPresentationComponentProps<NoProps>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill style={{ filter: `blur(${interpolate(p, [0.3, 1], [0, 5], clamp)}px)` }}>
        {children}
      </AbsoluteFill>
    );
  }
  const r = interpolate(p, [0, 1], [20, 1700], {
    ...clamp,
    easing: Easing.bezier(0.3, 0.3, 0.4, 1),
  });
  const d = filmPath(960, 620, r, 11, p * 14);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `path("${d}")` }}>{children}</AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <filter id="b70-spread-rim" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="5920" height="5080">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <path d={d} fill="none" stroke="rgba(150,182,210,0.6)" strokeWidth="10" filter="url(#b70-spread-rim)" />
        <path d={d} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="2" />
      </svg>
    </AbsoluteFill>
  );
};

// Rack focus: the shot drifts out of focus into soft light, the next one
// resolves out of it.
const FocusShift: React.FC<TransitionPresentationComponentProps<NoProps>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill
      style={{
        opacity: entering ? interpolate(p, [0.3, 0.7], [0, 1], clamp) : 1,
        filter: entering
          ? `blur(${interpolate(p, [0.3, 1], [22, 0], clamp)}px) brightness(${interpolate(p, [0.3, 1], [1.08, 1], clamp)})`
          : `blur(${interpolate(p, [0, 0.7], [0, 22], clamp)}px) brightness(${interpolate(p, [0, 0.7], [1, 1.08], clamp)})`,
        scale: entering ? `${interpolate(p, [0.3, 1], [1.04, 1], clamp)}` : "1",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const frostedGlassSlide = (from: "right" | "left"): TransitionPresentation<SlideProps> => ({
  component: FrostedGlassSlide,
  props: { from },
});
export const dewRoll = (): TransitionPresentation<NoProps> => ({ component: DewRoll, props: {} });
export const serumSpread = (): TransitionPresentation<NoProps> => ({ component: SerumSpread, props: {} });
export const focusShift = (): TransitionPresentation<NoProps> => ({ component: FocusShift, props: {} });
