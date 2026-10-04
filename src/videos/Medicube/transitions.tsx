import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { FilmSheen } from "./materials";

// MEDICUBE transitions: the clear wrapping film peeling past the lens, a
// rose-gold light sweep, and pearl-glass refraction.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// A sheet of transparent film peels diagonally past the lens; under its
// glossy, slightly refracting body the next shot appears.
const FilmPeel: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [-900, 3500], {
    ...clamp,
    easing: Easing.bezier(0.45, 0.05, 0.5, 1),
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `polygon(-700px -100px, ${x}px -100px, ${x - 640}px 1180px, -700px 1180px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `polygon(${x - 700}px -100px, ${x + 60}px -100px, ${x - 580}px 1180px, ${x - 1340}px 1180px)`,
          backdropFilter: "blur(5px) saturate(120%)",
          background:
            "linear-gradient(115deg, rgba(255,226,216,0.08) 0%, rgba(255,236,228,0.28) 70%, rgba(255,255,255,0.5) 96%)",
        }}
      >
        <FilmSheen phase={p * 1.5} tone="pearl" />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x - 340,
          width: 70,
          top: -200,
          height: 1500,
          rotate: "26.6deg",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,240,232,0.95) 55%, rgba(255,255,255,0) 100%)",
          filter: "blur(3px)",
          opacity: interpolate(p, [0, 0.05, 0.92, 1], [0, 1, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// A rose-gold light sweep carries one shot into the next.
const RoseGoldSweep: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: entering ? interpolate(p, [0.35, 0.65], [0, 1], clamp) : 1,
          filter: entering
            ? `brightness(${interpolate(p, [0.35, 1], [1.3, 1], clamp)})`
            : `brightness(${interpolate(p, [0, 0.6], [1, 1.3], clamp)})`,
        }}
      >
        {children}
      </AbsoluteFill>
      {entering ? (
        <AbsoluteFill
          style={{
            left: -1300,
            width: 1200,
            top: -300,
            height: 1700,
            rotate: "18deg",
            background:
              "linear-gradient(90deg, rgba(246,190,160,0) 0%, rgba(246,190,160,0.6) 40%, rgba(255,236,222,0.9) 50%, rgba(246,190,160,0.6) 60%, rgba(246,190,160,0) 100%)",
            mixBlendMode: "screen",
            translate: `${interpolate(p, [0, 1], [0, 4300], { ...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1) })}px 0px`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const Refract: React.FC<{ id: string; scale: number }> = ({ id, scale }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="2" seed="17" />
        <feDisplacementMap in="SourceGraphic" scale={scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

// The shots exchange through a pane of pearl glass: both refract, and the
// next comes forward with a pearly bloom.
const PearlRefract: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  const id = entering ? "m-pearl-in" : "m-pearl-out";
  const amount = entering ? interpolate(p, [0, 1], [70, 0], clamp) : interpolate(p, [0, 1], [0, 70], clamp);
  return (
    <AbsoluteFill style={{ opacity: entering ? interpolate(p, [0.2, 0.7], [0, 1], clamp) : 1 }}>
      <Refract id={id} scale={amount} />
      <AbsoluteFill
        style={{
          filter: `url(#${id}) brightness(${entering ? interpolate(p, [0, 1], [1.2, 1], clamp) : interpolate(p, [0, 1], [1, 1.2], clamp)})`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const filmPeel = (): TransitionPresentation<NoProps> => ({ component: FilmPeel, props: {} });
export const roseGoldSweep = (): TransitionPresentation<NoProps> => ({ component: RoseGoldSweep, props: {} });
export const pearlRefract = (): TransitionPresentation<NoProps> => ({ component: PearlRefract, props: {} });
