import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { CentellaLeaf, SandDrift, WarmDrop } from "./materials";

// SKIN1004 transitions: a round Centella leaf gliding diagonally past the
// lens, a warm drift of sand, a falling drop that splits the frame open, a
// swell of amber light, and a botanical shadow passing across.
// Every overlay is fully off-frame (or invisible) at progress 1, because the
// entering presentation stays applied after the transition ends.

type NoProps = Record<string, never>;
type Props = TransitionPresentationComponentProps<NoProps>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// A huge out-of-focus Centella leaf glides from bottom-left to top-right;
// the next shot is revealed behind its trailing side.
const CentellaGlide: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const k = interpolate(p, [0, 1], [0, 1], { ...clamp, easing: Easing.bezier(0.4, 0.05, 0.55, 1) });
  const cx = -1600 + 5100 * k;
  const cy = 1700 - 2550 * k;
  // boundary through the leaf centre, perpendicular to the motion (n = 0.894, -0.447)
  const px = 0.447 * 4000;
  const py = 0.894 * 4000;
  const bx = -0.894 * 4000;
  const by = 0.447 * 4000;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `polygon(${cx + px}px ${cy + py}px, ${cx - px}px ${cy - py}px, ${cx - px + bx}px ${cy - py + by}px, ${cx + px + bx}px ${cy + py + by}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - 1500,
          top: cy - 1500,
          width: 3000,
          height: 3450,
          rotate: "-30deg",
          transformOrigin: "1500px 1500px",
          filter: "blur(34px) brightness(0.92) saturate(0.85)",
        }}
      >
        <CentellaLeaf tone="fresh" seed={21} beads={false} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A warm drift of sand and dust blows across; the next shot settles in behind it.
const SandVeil: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const x = interpolate(p, [0, 1], [-400, 2700], { ...clamp, easing: Easing.bezier(0.4, 0, 0.6, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          maskImage: `linear-gradient(90deg, #000 ${x - 300}px, rgba(0,0,0,0) ${x}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: x - 700,
          width: 1000,
          background:
            "linear-gradient(90deg, rgba(232,196,140,0) 0%, rgba(232,196,140,0.85) 45%, rgba(246,222,180,0.9) 60%, rgba(232,196,140,0) 100%)",
          filter: "blur(30px)",
        }}
      />
      <AbsoluteFill style={{ left: x - 900, width: 1300, overflow: "hidden" }}>
        <AbsoluteFill style={{ width: 1920 }}>
          <SandDrift t={p * 120} seed={31} count={500} />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// A drop falls through the frame leaving a fine water line, and the frame
// splits open along it onto the next shot.
const DropSplit: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const w = interpolate(p, [0.3, 1], [0, 1100], { ...clamp, easing: Easing.bezier(0.5, 0, 0.3, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(-10px ${960 - w}px -10px ${960 - w}px)` }}>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 930,
          top: -80,
          width: 60,
          height: 72,
          translate: `0px ${interpolate(p, [0, 0.3], [0, 1240], { ...clamp, easing: Easing.bezier(0.5, 0, 1, 0.5) })}px`,
          opacity: interpolate(p, [0, 0.04, 0.28, 0.3], [0, 1, 1, 0], clamp),
        }}
      >
        <WarmDrop />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 958 - w,
          width: 4,
          background: "linear-gradient(180deg, rgba(255,246,225,0.95), rgba(255,236,200,0.7))",
          boxShadow: "0 0 14px rgba(255,236,200,0.8)",
          clipPath: `inset(0 0 ${interpolate(p, [0, 0.3], [100, 0], clamp)}% 0)`,
          opacity: interpolate(p, [0.85, 1], [1, 0], clamp),
        }}
      />
      <AbsoluteFill
        style={{
          left: 958 + w,
          width: 4,
          background: "linear-gradient(180deg, rgba(255,246,225,0.95), rgba(255,236,200,0.7))",
          boxShadow: "0 0 14px rgba(255,236,200,0.8)",
          clipPath: `inset(0 0 ${interpolate(p, [0, 0.3], [100, 0], clamp)}% 0)`,
          opacity: interpolate(p, [0.85, 1], [1, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// Warm amber light swells through the shot and the next one settles out of it.
const AmberSwell: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: entering ? interpolate(p, [0.4, 0.6], [0, 1], clamp) : 1,
          filter: entering
            ? `brightness(${interpolate(p, [0.4, 1], [1.25, 1], clamp)}) sepia(${interpolate(p, [0.4, 1], [0.35, 0], clamp)})`
            : `brightness(${interpolate(p, [0, 0.6], [1, 1.25], clamp)}) sepia(${interpolate(p, [0, 0.6], [0, 0.35], clamp)})`,
        }}
      >
        {children}
      </AbsoluteFill>
      {entering ? (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(70% 80% at 50% 50%, rgba(255,200,120,0.85) 0%, rgba(230,160,80,0.5) 60%, rgba(200,130,60,0.3) 100%)",
            opacity: interpolate(p, [0, 0.5, 1], [0, 0.8, 0], clamp),
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

// A large soft botanical shadow passes across from right to left; the next
// shot is revealed in its wake.
const ShadowPass: React.FC<Props> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const cx = interpolate(p, [0, 1], [3200, -1300], { ...clamp, easing: Easing.bezier(0.4, 0.05, 0.55, 1) });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ maskImage: `linear-gradient(90deg, rgba(0,0,0,0) ${cx - 160}px, #000 ${cx + 160}px)` }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: cx - 1300,
          top: 540 - 1300,
          width: 2600,
          height: 2990,
          rotate: "70deg",
          transformOrigin: "1300px 1300px",
          filter: "blur(34px)",
          opacity: 0.55,
          mixBlendMode: "multiply",
        }}
      >
        <CentellaLeaf tone="shadow" seed={14} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const centellaGlide = (): TransitionPresentation<NoProps> => ({ component: CentellaGlide, props: {} });
export const sandVeil = (): TransitionPresentation<NoProps> => ({ component: SandVeil, props: {} });
export const dropSplit = (): TransitionPresentation<NoProps> => ({ component: DropSplit, props: {} });
export const amberSwell = (): TransitionPresentation<NoProps> => ({ component: AmberSwell, props: {} });
export const shadowPass = (): TransitionPresentation<NoProps> => ({ component: ShadowPass, props: {} });
