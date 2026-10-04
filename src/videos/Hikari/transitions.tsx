import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { Caustics, Droplet } from "./materials";

// HIKARI transitions, built from sunlight and water: a refracting amber glass
// bar, a sun-flare sweep, a clear water wave across the lens, and a droplet
// running down the lens.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// SVG displacement for refraction; one filter per transition instance.
const Refract: React.FC<{ id: string; scale: number; freq: string }> = ({
  id,
  scale,
  freq,
}) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={freq}
          numOctaves="2"
          seed="6"
        />
        <feDisplacementMap
          in="SourceGraphic"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

// A thick bar of amber glass slides diagonally across the lens. Under it
// everything refracts; the shots swap beneath its centre.
const GlassRefract: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const x = interpolate(p, [0, 1], [-1300, 2300], {
    ...clamp,
    easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
  });
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const amount = interpolate(p, [0, 0.5, 1], [0, 40, 0], clamp);
  return (
    <AbsoluteFill>
      <Refract id="h-glass-refract" scale={amount} freq="0.004 0.012" />
      <AbsoluteFill
        style={{
          filter: "url(#h-glass-refract)",
          maskImage: `linear-gradient(105deg, rgba(0,0,0,1) ${x - 120}px, rgba(0,0,0,0) ${x + 120}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x - 450,
          top: -300,
          width: 900,
          height: 1700,
          rotate: "15deg",
          background:
            "linear-gradient(90deg, rgba(255,214,110,0) 0%, rgba(255,200,90,0.55) 18%, rgba(255,236,170,0.75) 46%, rgba(255,255,255,0.9) 50%, rgba(240,60,110,0.35) 56%, rgba(255,180,80,0.5) 82%, rgba(255,214,110,0) 100%)",
          backdropFilter: "blur(16px) saturate(150%)",
          maskImage:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// A sun flare sweeps across: a hot horizontal streak blows the frame out
// to warm white and the next shot comes back under it.
const FlareSweep: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill
        style={{
          filter: `brightness(${interpolate(p, [0, 0.5], [1, 1.35], clamp)})`,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }
  const sx = interpolate(p, [0, 1], [-900, 2100], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: interpolate(p, [0.4, 0.62], [0, 1], clamp),
          filter: `brightness(${interpolate(p, [0.4, 1], [1.35, 1], clamp)})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(40% 70% at ${sx}px 45%, rgba(255,255,246,1) 0%, rgba(255,242,200,0.8) 35%, rgba(255,230,170,0) 100%)`,
          opacity: interpolate(p, [0, 0.45, 1], [0, 1, 0], clamp),
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          top: 440,
          height: 90,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,252,236,0.95) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(16px)",
          opacity: interpolate(p, [0, 0.4, 1], [0, 1, 0], clamp),
          translate: `${sx - 960}px 0px`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

// A clear water wave rolls across the lens. Behind its front the picture is
// underwater — refracted, blue, laced with caustics and bubbles — then the
// camera surfaces into the next shot.
const WaterWave: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  const front = interpolate(p, [0, 0.5], [-400, 2400], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.6, 1),
  });
  const under = interpolate(p, [0, 0.35, 0.6, 1], [0, 1, 1, 0], clamp);
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill>
        <Refract id="h-wave-out" scale={under * 60} freq="0.006 0.016" />
        <AbsoluteFill style={{ filter: "url(#h-wave-out)" }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <Refract id="h-wave-in" scale={under * 60} freq="0.006 0.016" />
      <AbsoluteFill
        style={{
          filter: "url(#h-wave-in)",
          opacity: interpolate(p, [0.35, 0.5], [0, 1], clamp),
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${front - 150}px, rgba(0,0,0,0) ${front + 60}px)`,
          opacity: under,
        }}
      >
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(120,214,236,0.55) 0%, rgba(40,150,200,0.6) 60%, rgba(20,110,170,0.7) 100%)",
          }}
        />
        <AbsoluteFill
          style={{
            opacity: 0.28,
            mixBlendMode: "screen",
            translate: `${-p * 200}px ${p * 60}px`,
          }}
        >
          <Caustics seed={14} frequency={0.007} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            left: 520,
            top: 640 - p * 900,
            width: 40,
            height: 40,
            opacity: 0.9,
          }}
        >
          <Droplet />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            left: 1260,
            top: 820 - p * 1100,
            width: 26,
            height: 26,
          }}
        >
          <Droplet />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            left: 1500,
            top: 980 - p * 1000,
            width: 54,
            height: 54,
            filter: "blur(2px)",
          }}
        >
          <Droplet />
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: front - 120,
          width: 160,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(240,252,255,0.95) 60%, rgba(255,255,255,0) 100%)",
          filter: "blur(10px)",
          rotate: "10deg",
          top: -200,
          height: 1500,
          opacity: interpolate(p, [0, 0.05, 0.48, 0.55], [0, 1, 1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// A droplet runs down the lens. The wet trail it leaves is a window onto the
// next shot, which widens until it fills the frame.
const DropletTrail: React.FC<Props> = ({
  children,
  presentationDirection,
  presentationProgress: p,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const ease = Easing.bezier(0.5, 0, 0.4, 1);
  const y = interpolate(p, [0, 0.6], [-200, 1300], { ...clamp, easing: ease });
  const w = interpolate(p, [0.15, 1], [140, 4200], {
    ...clamp,
    easing: Easing.bezier(0.6, 0, 0.4, 1),
  });
  const cx = 1180;
  const amount = interpolate(p, [0, 0.4, 1], [30, 26, 0], clamp);
  return (
    <AbsoluteFill>
      <Refract id="h-drop-trail" scale={amount} freq="0.02 0.004" />
      <AbsoluteFill
        style={{
          filter: "url(#h-drop-trail)",
          clipPath: `inset(0px ${1920 - (cx + w / 2)}px ${Math.max(1080 - y, 0)}px ${cx - w / 2}px round 0px 0px ${w / 2}px ${w / 2}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - 90,
          top: y - 150,
          width: 180,
          height: 200,
          opacity: interpolate(p, [0.55, 0.65], [1, 0], clamp),
        }}
      >
        <Droplet />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const glassRefract = (): TransitionPresentation<NoProps> => ({
  component: GlassRefract,
  props: {},
});
export const flareSweep = (): TransitionPresentation<NoProps> => ({
  component: FlareSweep,
  props: {},
});
export const waterWave = (): TransitionPresentation<NoProps> => ({
  component: WaterWave,
  props: {},
});
export const dropletTrail = (): TransitionPresentation<NoProps> => ({
  component: DropletTrail,
  props: {},
});
