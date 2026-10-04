import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Droplet, FoamMass, HeartLeaf, SageGlass, TUBE_SRC } from "./materials";

// SHOT 06 — FINAL HERO (0:12.1–0:15)
// Ivory-and-sage studio, one enormous translucent heartleaf behind the tube,
// wet green glass with a little foam and a film of water at the base. From
// frame 425 foam rolls toward the lens and fills the frame on frame 449 —
// the same foam the film opens on, so it loops.
export const H6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E7EDDF" }}>
      <AbsoluteFill
        name="Ivory-sage studio"
        style={{
          background:
            "radial-gradient(90% 100% at 66% 40%, #FBFCF7 0%, #E9EFE2 42%, #CCDAC2 78%, #ADC3A4 100%)",
        }}
      />
      <Interactive.Div
        name="Enormous heartleaf"
        style={{
          position: "absolute",
          left: 780,
          top: -170,
          width: 1060,
          height: 1060,
          filter: "blur(3px)",
          opacity: 0.85,
          rotate: interpolate(frame, [0, 88], ["-6deg", "-3deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <HeartLeaf />
      </Interactive.Div>
      <Interactive.Div
        name="Moving daylight"
        style={{
          position: "absolute",
          left: -600,
          top: -300,
          width: 700,
          height: 1700,
          rotate: "20deg",
          background:
            "linear-gradient(90deg, rgba(255,255,250,0) 0%, rgba(255,255,250,0.45) 50%, rgba(255,255,250,0) 100%)",
          mixBlendMode: "screen",
          translate: interpolate(frame, [10, 70], ["0px 0px", "2800px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Wet green glass base"
        style={{ position: "absolute", left: 900, top: 820, width: 800, height: 400 }}
      >
        <SageGlass />
      </Interactive.Div>
      <Interactive.Div
        name="Tube reflection"
        style={{
          position: "absolute",
          left: 1164,
          top: 869,
          width: 272,
          height: 80,
          overflow: "hidden",
          opacity: 0.3,
        }}
      >
        <Img
          src={staticFile(TUBE_SRC)}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 272,
            scale: "1 -1",
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 12%)",
          }}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Water film"
        style={{
          position: "absolute",
          left: 1020,
          top: 850,
          width: 560,
          height: 56,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(225,240,220,0.5), rgba(225,240,220,0))",
          boxShadow: "inset 0 2px 3px rgba(255,255,255,0.7)",
        }}
      />
      <Interactive.Div
        name="Contact shadow"
        style={{
          position: "absolute",
          left: 1150,
          top: 856,
          width: 300,
          height: 26,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(30,50,35,0.55), rgba(30,50,35,0))",
          filter: "blur(4px)",
        }}
      />
      <Img
        name="ANUA Heartleaf tube"
        src={staticFile(TUBE_SRC)}
        style={{
          position: "absolute",
          left: 1164,
          top: 190,
          width: 272,
          filter: "drop-shadow(0 0 14px rgba(200,230,190,0.85))",
        }}
      />
      <Interactive.Div
        name="Daylight across tube"
        style={{
          position: "absolute",
          left: 1164,
          top: 190,
          width: 272,
          height: 679,
          maskImage: `url(${staticFile(TUBE_SRC)})`,
          maskSize: "100% 100%",
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(255,255,250,0.6) 50%, rgba(255,255,255,0) 62%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [16, 66], [100, 0], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0%`,
          mixBlendMode: "soft-light",
        }}
      />
      <Interactive.Div
        name="Foam at base left"
        style={{
          position: "absolute",
          left: 990,
          top: 806,
          width: 230,
          height: 90,
          borderRadius: "50% 50% 40% 40% / 70% 70% 30% 30%",
          overflow: "hidden",
          filter: "drop-shadow(0 8px 10px rgba(60,85,62,0.25))",
        }}
      >
        <FoamMass t={frame} w={230} h={90} edge="none" seed={41} bubbleScale={0.6} />
      </Interactive.Div>
      <Interactive.Div
        name="Foam at base right"
        style={{
          position: "absolute",
          left: 1400,
          top: 818,
          width: 190,
          height: 74,
          borderRadius: "50% 50% 40% 40% / 70% 70% 30% 30%",
          overflow: "hidden",
          filter: "drop-shadow(0 8px 10px rgba(60,85,62,0.25))",
        }}
      >
        <FoamMass t={frame} w={190} h={74} edge="none" seed={43} bubbleScale={0.6} />
      </Interactive.Div>

      <Interactive.Div
        name="Line — PORE DEEP"
        style={{
          position: "absolute",
          left: 124,
          top: 270,
          fontFamily: "Figtree",
          fontWeight: 800,
          fontSize: 116,
          lineHeight: 1,
          letterSpacing: -2,
          color: "#2E4A35",
          clipPath: `inset(0 ${interpolate(frame, [12, 30], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        PORE DEEP
      </Interactive.Div>
      <Interactive.Div
        name="Line — CLEANSING FOAM"
        style={{
          position: "absolute",
          left: 128,
          top: 400,
          fontFamily: "Figtree",
          fontWeight: 300,
          fontSize: 108,
          lineHeight: 1,
          letterSpacing: 2,
          color: "#3F6248",
          clipPath: `inset(0 ${interpolate(frame, [20, 38], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        CLEANSING FOAM
      </Interactive.Div>
      <Interactive.Div
        name="Line — HEARTLEAF + QUERCETINOL™"
        style={{
          position: "absolute",
          left: 132,
          top: 570,
          fontFamily: "Figtree",
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: 8,
          color: "#4E7457",
          opacity: interpolate(frame, [34, 48], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        HEARTLEAF + QUERCETINOL™
      </Interactive.Div>
      <Interactive.Div
        name="Line — 150 ml"
        style={{
          position: "absolute",
          left: 132,
          top: 640,
          fontFamily: "Figtree",
          fontWeight: 400,
          fontSize: 34,
          letterSpacing: 4,
          color: "#5F8467",
          opacity: interpolate(frame, [42, 56], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        150 ml
      </Interactive.Div>

      <Interactive.Div
        name="Foreground droplet (out of focus)"
        style={{
          position: "absolute",
          left: 40,
          top: 840,
          width: 230,
          height: 210,
          filter: "blur(11px)",
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground leaf (out of focus)"
        style={{
          position: "absolute",
          left: 1700,
          top: -180,
          width: 520,
          height: 520,
          filter: "blur(18px)",
          rotate: "150deg",
          opacity: 0.8,
        }}
      >
        <HeartLeaf />
      </Interactive.Div>

      <Interactive.Div
        name="Foam rolling to the lens (loop seam)"
        style={{
          position: "absolute",
          left: -340,
          top: -110,
          width: 2600,
          height: 1300,
          translate: interpolate(frame, [63, 87], ["2760px 0px", "0px 0px"], {
            easing: Easing.bezier(0.5, 0, 0.8, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <FoamMass t={0} w={2600} h={1300} edge="left" seed={9} bubbleScale={1.6} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
