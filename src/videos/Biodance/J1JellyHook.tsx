import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CaviarPearl, JellySurface } from "./materials";

// SHOT 01 — JELLY HOOK (0:00–0:02.3)
// Extremely close to translucent lavender jelly (the loop seam). One pearl
// descends and presses softly into the surface, which bends around it, then
// releases; the jelly settles with a gentle elastic return and JELLY appears
// beneath it, softly refracted — then a small SERUM.
export const J1JellyHook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E1D6F6" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="j1-warp" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="2" seed="7" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [44, 86], [70, 12], {
                easing: Easing.bezier(0.2, 0.6, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <AbsoluteFill name="Lavender jelly">
        <JellySurface />
      </AbsoluteFill>

      <AbsoluteFill name="Type under the jelly" style={{ filter: "url(#j1-warp) blur(1px)" }}>
        <Interactive.Div
          name="Title — JELLY"
          style={{
            position: "absolute",
            left: 0,
            top: 300,
            width: 1920,
            textAlign: "center",
            fontFamily: "DM Sans",
            fontWeight: 700,
            fontSize: 380,
            lineHeight: 1,
            letterSpacing: -6,
            color: "#9F86D8",
            opacity: interpolate(frame, [46, 66], [0, 0.85], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          JELLY
        </Interactive.Div>
      </AbsoluteFill>
      <AbsoluteFill
        name="Jelly gloss over the type"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0) 58%), rgba(226,216,247,0.18)",
          opacity: interpolate(frame, [40, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Small — SERUM"
        style={{
          position: "absolute",
          left: 0,
          top: 720,
          width: 1920,
          textAlign: "center",
          fontFamily: "DM Sans",
          fontWeight: 500,
          fontSize: 52,
          lineHeight: 1,
          color: "#6E58AE",
          letterSpacing: interpolate(frame, [64, 86], [60, 44], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [64, 76], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        SERUM
      </Interactive.Div>

      <Interactive.Div
        name="Jelly bending around the pearl"
        style={{
          position: "absolute",
          left: 660,
          top: 240,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(110,80,180,0.32) 0%, rgba(110,80,180,0.18) 40%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0) 80%)",
          scale: interpolate(frame, [24, 36, 46, 58, 66, 74], [0.6, 1, 1.04, 0.8, 0.9, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [24, 34, 46, 56, 64, 74], [0, 1, 1, 0, 0.25, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Pearl contact shadow"
        style={{
          position: "absolute",
          left: 820,
          top: 430,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(90,60,160,0.35), rgba(90,60,160,0))",
          filter: "blur(10px)",
          opacity: interpolate(frame, [20, 32, 46, 58], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Pearl pressing in"
        style={{
          position: "absolute",
          left: 840,
          top: 420,
          width: 240,
          height: 240,
          translate: interpolate(frame, [6, 32, 46, 68], ["-80px -760px", "0px 0px", "0px 0px", "420px -900px"], {
            easing: [Easing.bezier(0.2, 0.6, 0.3, 1), Easing.linear, Easing.bezier(0.5, 0, 0.7, 0.6)],
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [32, 40, 46, 68], [1, 0.95, 0.96, 1.25], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
