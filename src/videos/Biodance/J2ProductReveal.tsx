import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, CaviarPearl, OpticalSphere, PearlPlatform } from "./materials";

// SHOT 02 — PRODUCT REVEAL (0:02.3–0:05.3)
// The jelly stretches past the lens and clears onto the real bottle, upright
// on luminous pearl glass. An enormous lavender sphere stands behind it,
// centred on the real spherical cap (cap ≈ 1182, 514). The camera slides
// slightly sideways; the bottle never moves.
export const J2ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F4F0FA" }}>
      <AbsoluteFill
        name="Pearl white to lavender"
        style={{
          background:
            "radial-gradient(80% 90% at 60% 35%, #FFFFFF 0%, #F3EEFB 45%, #E2D8F4 100%)",
        }}
      />
      <Interactive.Div
        name="Enormous lavender sphere (echoes the cap)"
        style={{
          position: "absolute",
          left: 782,
          top: 114,
          width: 800,
          height: 800,
          translate: interpolate(frame, [0, 90], ["15px 0px", "-15px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <OpticalSphere />
      </Interactive.Div>

      <Interactive.Div
        name="Title — CAVIAR PDRN"
        style={{
          position: "absolute",
          left: 130,
          top: 380,
          fontFamily: "DM Sans",
          fontWeight: 600,
          fontSize: 112,
          lineHeight: 1,
          letterSpacing: 4,
          color: "#5B45A0",
          clipPath: `inset(0 ${interpolate(frame, [14, 38], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        CAVIAR PDRN
      </Interactive.Div>
      <Interactive.Div
        name="Title — JELLY SERUM MIST"
        style={{
          position: "absolute",
          left: 134,
          top: 520,
          fontFamily: "DM Sans",
          fontWeight: 400,
          fontSize: 44,
          lineHeight: 1,
          letterSpacing: 16,
          color: "#8A76C4",
          clipPath: `inset(0 ${interpolate(frame, [26, 50], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        JELLY SERUM MIST
      </Interactive.Div>

      <AbsoluteFill
        name="Product stage (camera slide)"
        style={{
          translate: interpolate(frame, [0, 90], ["30px 0px", "-30px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Pearl-glass platform"
          style={{ position: "absolute", left: -200, top: 860, width: 2400, height: 400 }}
        >
          <PearlPlatform top={90} />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 1082,
            top: 878,
            width: 197,
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
              width: 197,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 16%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1066,
            top: 866,
            width: 230,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(80,55,150,0.5), rgba(80,55,150,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="BIODANCE Caviar PDRN bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1082,
            top: 411,
            width: 197,
            filter: "drop-shadow(0 0 16px rgba(190,170,240,0.7))",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground sphere (out of focus)"
        style={{
          position: "absolute",
          left: 90,
          top: 700,
          width: 320,
          height: 320,
          filter: "blur(16px)",
          opacity: 0.8,
          translate: interpolate(frame, [0, 90], ["80px 0px", "-80px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
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
