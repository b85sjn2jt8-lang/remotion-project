import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  BOTTLE_SRC,
  CaviarPearl,
  JellySurface,
  MistDrift,
  OpticalSphere,
  PearlPlatform,
} from "./materials";

// SHOT 06 — FINAL CAVIAR PDRN HERO (0:12.1–0:15.0)
// The real bottle at ~45% of frame height (≈2.2× the source pixels) on pearl
// glass, a thin film of jelly at its base, and one huge lavender sphere
// centred exactly on the real spherical cap (cap ≈ 962, 519). From frame 63
// (film frame 425) the sphere comes toward the camera and its lavender jelly
// fills the frame — the texture of the very first frame (loop).
export const J6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F4F0FA" }}>
      <AbsoluteFill
        name="Pearl white to soft lavender"
        style={{
          background:
            "radial-gradient(80% 90% at 50% 40%, #FFFFFF 0%, #F2EDFB 45%, #DFD4F3 100%)",
        }}
      />
      <Interactive.Div
        name="Huge sphere aligned with the cap"
        style={{
          position: "absolute",
          left: 532,
          top: 89,
          width: 860,
          height: 860,
          scale: interpolate(frame, [0, 63, 87], [1.02, 1, 3.4], {
            easing: [Easing.linear, Easing.bezier(0.5, 0, 0.6, 1)],
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <OpticalSphere />
      </Interactive.Div>
      <AbsoluteFill name="Fine mist in the light" style={{ opacity: 0.5 }}>
        <MistDrift
          t={interpolate(frame, [0, 88], [0, 88], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          count={160}
          seed={9}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Main — CAVIAR PDRN"
        style={{
          position: "absolute",
          left: 110,
          top: 360,
          fontFamily: "DM Sans",
          fontWeight: 600,
          fontSize: 100,
          lineHeight: 1,
          letterSpacing: 2,
          color: "#5B45A0",
          clipPath: `inset(0 ${interpolate(frame, [8, 32], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        CAVIAR PDRN
      </Interactive.Div>
      <Interactive.Div
        name="Secondary — JELLY SERUM MIST"
        style={{
          position: "absolute",
          left: 114,
          top: 484,
          fontFamily: "DM Sans",
          fontWeight: 400,
          fontSize: 40,
          lineHeight: 1,
          letterSpacing: 14,
          color: "#7F6BBE",
          opacity: interpolate(frame, [18, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        JELLY SERUM MIST
      </Interactive.Div>
      <Interactive.Div
        name="Small — JELLY → MIST"
        style={{
          position: "absolute",
          left: 116,
          top: 560,
          fontFamily: "DM Sans",
          fontWeight: 500,
          fontSize: 32,
          lineHeight: 1,
          letterSpacing: 10,
          color: "#9A88D0",
          opacity: interpolate(frame, [28, 42], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        JELLY → MIST
      </Interactive.Div>
      <Interactive.Div
        name="Small — 50 ml"
        style={{
          position: "absolute",
          left: 116,
          top: 616,
          fontFamily: "DM Sans",
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 1,
          letterSpacing: 6,
          color: "#A699CF",
          opacity: interpolate(frame, [34, 48], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        50 ml
      </Interactive.Div>

      <AbsoluteFill
        name="Product stage (slow push)"
        style={{
          transformOrigin: "962px 900px",
          scale: interpolate(frame, [0, 63], [1, 1.025], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Pearl-glass platform"
          style={{ position: "absolute", left: -200, top: 880, width: 2320, height: 400 }}
        >
          <PearlPlatform top={90} />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 858,
            top: 898,
            width: 205,
            height: 90,
            overflow: "hidden",
            opacity: 0.28,
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 205,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 16%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 842,
            top: 886,
            width: 238,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(80,55,150,0.5), rgba(80,55,150,0))",
            filter: "blur(4px)",
          }}
        />
        <Interactive.Div
          name="Thin jelly film around the base"
          style={{
            position: "absolute",
            left: 740,
            top: 880,
            width: 440,
            height: 46,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(200,182,242,0.15) 0%, rgba(190,170,238,0.45) 70%, rgba(255,255,255,0.8) 88%, rgba(190,170,238,0) 100%)",
          }}
        />
        <Img
          name="BIODANCE Caviar PDRN bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 858,
            top: 412,
            width: 205,
            filter: "drop-shadow(0 0 18px rgba(190,170,240,0.75))",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground pearl — left (out of focus)"
        style={{
          position: "absolute",
          left: 220,
          top: 800,
          width: 260,
          height: 260,
          filter: "blur(16px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 88], ["30px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground pearl — right (out of focus)"
        style={{
          position: "absolute",
          left: 1560,
          top: 640,
          width: 200,
          height: 200,
          filter: "blur(13px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 88], ["-20px 0px", "-60px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CaviarPearl />
      </Interactive.Div>

      <AbsoluteFill
        name="The sphere's jelly fills the frame (loop seam)"
        style={{
          clipPath: `circle(${interpolate(frame, [63, 87], [0, 1500], {
            easing: Easing.bezier(0.55, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 962px 519px)`,
        }}
      >
        <JellySurface />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
