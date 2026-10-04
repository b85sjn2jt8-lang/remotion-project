import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { Droplet, FoamMass, HeartLeaf } from "./materials";

// Heartleaf transitions, made of the product's own materials: a foam wipe,
// a plunge into foam, a water-droplet lens, a clean water rinse and a
// heartleaf shadow passing across.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// A band of foam rolls across the lens right → left; the next shot sits
// behind its trailing edge.
const FoamWipe: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [1960, -2700], {
    ...clamp,
    easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
  });
  const trail = x + 2500;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(90deg, rgba(0,0,0,0) ${trail - 400}px, rgba(0,0,0,1) ${trail - 200}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x,
          top: -110,
          width: 2600,
          height: 1300,
          filter: "drop-shadow(-24px 16px 36px rgba(60,85,62,0.25))",
        }}
      >
        <FoamMass t={p * 20} w={2600} h={1300} edge="both" seed={15} bubbleScale={1.5} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The camera pushes into the foam and comes out in the macro.
const FoamPlunge: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill
      style={{
        scale: entering
          ? interpolate(p, [0, 1], [0.88, 1], { ...clamp, easing: Easing.bezier(0.2, 0.7, 0.3, 1) })
          : interpolate(p, [0, 1], [1, 1.3], { ...clamp, easing: Easing.bezier(0.5, 0, 0.8, 0.5) }),
        filter: entering
          ? `blur(${interpolate(p, [0, 1], [14, 0], clamp)}px) brightness(${interpolate(p, [0, 1], [1.25, 1], clamp)})`
          : `blur(${interpolate(p, [0, 1], [0, 14], clamp)}px) brightness(${interpolate(p, [0, 1], [1, 1.3], clamp)})`,
        opacity: entering ? interpolate(p, [0, 0.55], [0, 1], clamp) : 1,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// A clear droplet slides onto the lens; the next shot is seen magnified
// inside it until the droplet spreads over the frame.
const DropletLens: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const ease = Easing.bezier(0.5, 0, 0.35, 1);
  const cx = interpolate(p, [0, 1], [1500, 960], { ...clamp, easing: ease });
  const cy = interpolate(p, [0, 1], [200, 540], { ...clamp, easing: ease });
  const r = interpolate(p, [0, 1], [110, 1250], { ...clamp, easing: ease });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `ellipse(${r}px ${r * 1.08}px at ${cx}px ${cy}px)` }}>
        <AbsoluteFill style={{ transformOrigin: `${cx}px ${cy}px`, scale: interpolate(p, [0, 1], [1.35, 1], clamp) }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - r,
          top: cy - r * 1.08,
          width: 2 * r,
          height: 2.16 * r,
          opacity: interpolate(p, [0.6, 1], [1, 0], clamp),
        }}
      >
        <Droplet />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A sheet of clean water runs down the frame and rinses the shot away.
const WaterRinse: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const y = interpolate(p, [0, 1], [-300, 1400], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(180deg, rgba(0,0,0,1) ${y - 260}px, rgba(0,0,0,0) ${y - 60}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          top: y - 320,
          height: 340,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(215,232,210,0.4) 45%, rgba(255,255,255,0.95) 88%, rgba(255,255,255,0) 100%)",
          backdropFilter: "blur(8px) brightness(1.04)",
        }}
      />
    </AbsoluteFill>
  );
};

// The soft shadow of a heartleaf passes over; the shots swap beneath it.
const LeafShadow: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [-2200, 2200], {
    ...clamp,
    easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
  });
  const cx = x + 1100;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(90deg, rgba(0,0,0,1) ${cx - 250}px, rgba(0,0,0,0) ${cx + 250}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x,
          top: -560,
          width: 2200,
          height: 2200,
          rotate: "-30deg",
          filter: "blur(40px)",
          opacity: 0.75,
        }}
      >
        <HeartLeaf tone="shadow" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const foamWipe = (): TransitionPresentation<NoProps> => ({ component: FoamWipe, props: {} });
export const foamPlunge = (): TransitionPresentation<NoProps> => ({ component: FoamPlunge, props: {} });
export const dropletLens = (): TransitionPresentation<NoProps> => ({ component: DropletLens, props: {} });
export const waterRinse = (): TransitionPresentation<NoProps> => ({ component: WaterRinse, props: {} });
export const leafShadow = (): TransitionPresentation<NoProps> => ({ component: LeafShadow, props: {} });
