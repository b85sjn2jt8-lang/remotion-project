import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";

// Skincare-derived scene transitions for the ANUA commercial.
// Each one is built from a physical thing in the film: a lens rack-focus,
// a soft light sweep, the circular pad, a liquid ripple and a sheet of pink glass.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Lens rack-focus: the outgoing shot drifts out of focus while the next one
// pulls into focus.
const RackFocus: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  const blur = entering
    ? interpolate(p, [0, 1], [22, 0], clamp)
    : interpolate(p, [0, 1], [0, 22], clamp);
  return (
    <AbsoluteFill
      style={{
        filter: `blur(${blur}px)`,
        opacity: entering ? interpolate(p, [0, 0.6], [0, 1], clamp) : 1,
        scale: entering
          ? interpolate(p, [0, 1], [1.05, 1], {
              ...clamp,
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            })
          : interpolate(p, [0, 1], [1, 1.03], clamp),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Soft studio light sweep: a warm white band crosses the frame and the shots
// exchange underneath its brightest point.
const LightSweep: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: entering ? interpolate(p, [0.3, 0.6], [0, 1], clamp) : 1,
          filter: entering
            ? `brightness(${interpolate(p, [0.3, 1], [1.15, 1], clamp)})`
            : `brightness(${interpolate(p, [0, 0.6], [1, 1.15], clamp)})`,
        }}
      >
        {children}
      </AbsoluteFill>
      {entering ? (
        <AbsoluteFill
          style={{
            left: -1400,
            width: 1300,
            background:
              "linear-gradient(90deg, rgba(255,246,248,0) 0%, rgba(255,246,248,0.45) 42%, rgba(255,255,255,0.7) 50%, rgba(255,246,248,0.45) 58%, rgba(255,246,248,0) 100%)",
            rotate: "12deg",
            top: -300,
            height: 1700,
            translate: `${interpolate(p, [0, 1], [0, 4400], {
              ...clamp,
              easing: Easing.bezier(0.45, 0, 0.55, 1),
            })}px 0px`,
            mixBlendMode: "screen",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

// The cotton pad's circle opens from the centre of frame, with a soft cotton
// rim riding the edge of the reveal.
const PadIris: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  const r = interpolate(p, [0, 1], [0, 1200], {
    ...clamp,
    easing: Easing.bezier(0.5, 0, 0.25, 1),
  });
  if (!entering) {
    return (
      <AbsoluteFill
        style={{ scale: interpolate(p, [0, 1], [1, 1.12], clamp) }}
      >
        {children}
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 50% 50%)` }}>
        <AbsoluteFill
          style={{ scale: interpolate(p, [0, 1], [1.15, 1], clamp) }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 960 - r - 60,
          top: 540 - r - 60,
          width: 2 * r + 120,
          height: 2 * r + 120,
          borderRadius: "50%",
          border: "120px solid rgba(255,247,249,0.85)",
          filter: "blur(30px)",
          opacity: interpolate(p, [0.3, 0.5, 0.85, 1], [0, 1, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// A liquid ripple spreads from the lower centre and carries the next shot
// inside it, its crest catching the light.
const RippleReveal: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  const rx = interpolate(p, [0, 1], [0, 1500], {
    ...clamp,
    easing: Easing.bezier(0.3, 0.6, 0.35, 1),
  });
  const ry = rx * 0.78;
  if (!entering) {
    return (
      <AbsoluteFill
        style={{
          filter: `blur(${interpolate(p, [0, 1], [0, 8], clamp)}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ clipPath: `ellipse(${rx}px ${ry}px at 50% 60%)` }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 960 - rx,
          top: 648 - ry,
          width: 2 * rx,
          height: 2 * ry,
          borderRadius: "50%",
          border: "10px solid rgba(255,255,255,0.75)",
          boxShadow:
            "0 0 40px rgba(255,255,255,0.6), inset 0 0 50px rgba(255,190,205,0.7)",
          filter: "blur(3px)",
          opacity: interpolate(p, [0, 0.1, 0.8, 1], [0, 1, 0.8, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// A tall sheet of rose glass slides across the lens. The shots dissolve into
// each other underneath it, softened as if seen through the glass.
const GlassPass: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const entering = presentationDirection === "entering";
  // Left edge of the glass sheet travels from off-right to off-left.
  const x = interpolate(p, [0, 1], [1920, -1500], {
    ...clamp,
    easing: Easing.bezier(0.55, 0, 0.35, 1),
  });
  const blur = interpolate(p, [0, 0.5, 1], [0, 10, 0], clamp);
  if (!entering) {
    return (
      <AbsoluteFill style={{ filter: `blur(${blur}px)` }}>
        {children}
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          filter: `blur(${blur}px)`,
          maskImage: `linear-gradient(90deg, rgba(0,0,0,0) ${x + 400}px, rgba(0,0,0,1) ${x + 1000}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x,
          width: 1400,
          background:
            "linear-gradient(90deg, rgba(248,186,202,0) 0%, rgba(248,186,202,0.45) 20%, rgba(242,160,182,0.4) 46%, rgba(255,236,241,0.6) 52%, rgba(242,160,182,0.4) 58%, rgba(248,186,202,0.45) 80%, rgba(248,186,202,0) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const rackFocus = (): TransitionPresentation<NoProps> => ({
  component: RackFocus,
  props: {},
});
export const lightSweep = (): TransitionPresentation<NoProps> => ({
  component: LightSweep,
  props: {},
});
export const padIris = (): TransitionPresentation<NoProps> => ({
  component: PadIris,
  props: {},
});
export const rippleReveal = (): TransitionPresentation<NoProps> => ({
  component: RippleReveal,
  props: {},
});
export const glassPass = (): TransitionPresentation<NoProps> => ({
  component: GlassPass,
  props: {},
});
