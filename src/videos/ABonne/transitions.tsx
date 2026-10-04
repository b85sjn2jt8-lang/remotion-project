import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { CollagenSphere, LotionRibbon, MilkSheet } from "./materials";

// Transitions of the A BONNE commercial, each made of the product's own
// materials: a curtain of milk, a ribbon of lotion, a collagen sphere passing
// the lens, warm sunlight and rising milk.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// A band of milk sweeps left → right; the next shot is behind it.
const MilkCurtain: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const tx = interpolate(p, [0, 1], [-1700, 1700], {
    ...clamp,
    easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
  });
  const cx = 960 + tx;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(90deg, rgba(0,0,0,1) ${cx - 150}px, rgba(0,0,0,0) ${cx + 150}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 310,
          top: -160,
          width: 1300,
          height: 1400,
          rotate: "90deg",
          translate: `${tx}px 0px`,
        }}
      >
        <MilkSheet phase={p * 4} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A very thick ribbon of lotion travels across the lens; the new shot sits
// behind its tail.
const RIBBON_PATH =
  "M -900 600 C 0 450, 700 690, 1300 540 S 2500 430, 3200 600";
const LotionSweep: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const head = interpolate(p, [0, 0.75], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.5, 1),
  });
  const tail = interpolate(p, [0.2, 1], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.5, 0, 0.6, 1),
  });
  // The path runs roughly x = -900 → 3200, so its tail sits near this x.
  const tailX = -900 + tail * 4100;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(90deg, rgba(0,0,0,1) ${tailX + 300}px, rgba(0,0,0,0) ${tailX + 600}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill>
        <LotionRibbon d={RIBBON_PATH} progress={head} tail={tail} width={1320} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A collagen sphere drifts toward the lens from the right; the next shot is
// seen magnified inside it until it fills the frame.
const SphereLens: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill
        style={{ filter: `blur(${interpolate(p, [0.4, 1], [0, 6], clamp)}px)` }}
      >
        {children}
      </AbsoluteFill>
    );
  }
  const ease = Easing.bezier(0.5, 0, 0.3, 1);
  const cx = interpolate(p, [0, 1], [1750, 960], { ...clamp, easing: ease });
  const cy = interpolate(p, [0, 1], [620, 540], { ...clamp, easing: ease });
  const r = interpolate(p, [0, 1], [260, 1250], { ...clamp, easing: ease });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at ${cx}px ${cy}px)` }}>
        <AbsoluteFill
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            scale: interpolate(p, [0, 1], [1.25, 1], clamp),
          }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - r,
          top: cy - r,
          width: 2 * r,
          height: 2 * r,
          opacity: interpolate(p, [0.75, 1], [1, 0], clamp),
        }}
      >
        <CollagenSphere />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Warm sunlight floods in from the upper left and the next shot emerges
// from the glow.
const SunBloom: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill
        style={{
          filter: `brightness(${interpolate(p, [0, 0.6], [1, 1.25], clamp)})`,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ opacity: interpolate(p, [0.35, 0.7], [0, 1], clamp) }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 90% at 15% 0%, rgba(255,247,236,1) 0%, rgba(255,232,220,0.85) 40%, rgba(255,226,226,0) 80%)",
          opacity: interpolate(p, [0, 0.45, 1], [0, 1, 0], clamp),
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

// Milk rises from below and drains away upward, leaving the next shot.
const MilkRise: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const ty = interpolate(p, [0, 1], [1300, -1900], {
    ...clamp,
    easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
  });
  const cy = 540 + ty;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(180deg, rgba(0,0,0,0) ${cy - 150}px, rgba(0,0,0,1) ${cy + 150}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: -100,
          top: -260,
          width: 2120,
          height: 1600,
          translate: `0px ${ty}px`,
        }}
      >
        <MilkSheet phase={p * 3 + 1} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const milkCurtain = (): TransitionPresentation<NoProps> => ({
  component: MilkCurtain,
  props: {},
});
export const lotionSweep = (): TransitionPresentation<NoProps> => ({
  component: LotionSweep,
  props: {},
});
export const sphereLens = (): TransitionPresentation<NoProps> => ({
  component: SphereLens,
  props: {},
});
export const sunBloom = (): TransitionPresentation<NoProps> => ({
  component: SunBloom,
  props: {},
});
export const milkRise = (): TransitionPresentation<NoProps> => ({
  component: MilkRise,
  props: {},
});
