import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { FilmSail, NightMembrane, Pearl, RoseGlass, TUBE_SRC } from "./materials";

// SHOT 06 — FINAL PEARL HERO (0:12.1–0:15)
// Blush-to-champagne morning, a curved sail of film behind the tube, wet
// pearlescent rose glass beneath it. From frame 425 a pearlescent membrane
// comes toward the lens; on frame 449 it is the dark membrane of frame 0.
export const M6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F6DDD6" }}>
      <AbsoluteFill
        name="Blush to champagne"
        style={{
          background:
            "radial-gradient(90% 100% at 66% 38%, #FFF8F2 0%, #F9E4DC 40%, #EFC7C2 75%, #DFA6AA 100%)",
        }}
      />
      <Interactive.Div
        name="Film sail behind the tube"
        style={{
          position: "absolute",
          left: 760,
          top: -40,
          width: 1100,
          height: 1100,
          rotate: interpolate(frame, [0, 88], ["-4deg", "2deg"], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          filter: "drop-shadow(0 30px 50px rgba(160,80,100,0.18))",
        }}
      >
        <FilmSail phase={interpolate(frame, [0, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      </Interactive.Div>
      <Interactive.Div
        name="Moving highlight"
        style={{
          position: "absolute",
          left: -600,
          top: -300,
          width: 700,
          height: 1700,
          rotate: "20deg",
          background:
            "linear-gradient(90deg, rgba(255,250,244,0) 0%, rgba(255,250,244,0.5) 50%, rgba(255,250,244,0) 100%)",
          mixBlendMode: "screen",
          translate: interpolate(frame, [14, 70], ["0px 0px", "2800px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Wet pearlescent rose glass"
        style={{ position: "absolute", left: 960, top: 810, width: 680, height: 420 }}
      >
        <RoseGlass />
      </Interactive.Div>
      <Interactive.Div
        name="Tube reflection"
        style={{
          position: "absolute",
          left: 1144,
          top: 870,
          width: 313,
          height: 80,
          overflow: "hidden",
          opacity: 0.35,
        }}
      >
        <Img
          src={staticFile(TUBE_SRC)}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 313,
            scale: "1 -1",
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 12%)",
          }}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Contact shadow"
        style={{
          position: "absolute",
          left: 1130,
          top: 857,
          width: 340,
          height: 26,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(90,30,50,0.55), rgba(90,30,50,0))",
          filter: "blur(4px)",
        }}
      />
      <Img
        name="MEDICUBE tube"
        src={staticFile(TUBE_SRC)}
        style={{
          position: "absolute",
          left: 1144,
          top: 190,
          width: 313,
          filter: "drop-shadow(0 0 14px rgba(250,200,185,0.8))",
        }}
      />
      <Interactive.Div
        name="Moving pearl light on tube"
        style={{
          position: "absolute",
          left: 1144,
          top: 190,
          width: 313,
          height: 681,
          maskImage: `url(${staticFile(TUBE_SRC)})`,
          maskSize: "100% 100%",
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(255,246,240,0.65) 50%, rgba(255,255,255,0) 62%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [18, 66], [100, 0], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0%`,
          mixBlendMode: "soft-light",
        }}
      />

      <Interactive.Div
        name="Line — COLLAGEN NIGHT"
        style={{
          position: "absolute",
          left: 130,
          top: 290,
          fontFamily: "Jost",
          fontWeight: 300,
          fontSize: 100,
          lineHeight: 1,
          letterSpacing: 8,
          color: "#4A1F33",
          clipPath: `inset(0 ${interpolate(frame, [14, 32], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        COLLAGEN NIGHT
      </Interactive.Div>
      <Interactive.Div
        name="Line — WRAPPING MASK"
        style={{
          position: "absolute",
          left: 130,
          top: 410,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 100,
          lineHeight: 1,
          letterSpacing: 6,
          color: "#4A1F33",
          clipPath: `inset(0 ${interpolate(frame, [22, 40], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        WRAPPING MASK
      </Interactive.Div>
      <Interactive.Div
        name="Line — WRAP THE NIGHT."
        style={{
          position: "absolute",
          left: 134,
          top: 580,
          fontFamily: "Jost",
          fontWeight: 500,
          fontSize: 38,
          letterSpacing: 10,
          color: "#B5687A",
          opacity: interpolate(frame, [36, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        WRAP THE NIGHT.
      </Interactive.Div>
      <Interactive.Div
        name="Line — REVEAL THE GLOW."
        style={{
          position: "absolute",
          left: 134,
          top: 636,
          fontFamily: "Jost",
          fontWeight: 500,
          fontSize: 38,
          letterSpacing: 10,
          color: "#B5687A",
          opacity: interpolate(frame, [46, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        REVEAL THE GLOW.
      </Interactive.Div>

      <Interactive.Div
        name="Foreground pearl (out of focus)"
        style={{
          position: "absolute",
          left: 50,
          top: 830,
          width: 240,
          height: 240,
          filter: "blur(12px)",
          opacity: 0.9,
        }}
      >
        <Pearl />
      </Interactive.Div>

      <AbsoluteFill
        name="Membrane sweeping over the lens (loop seam)"
        style={{
          clipPath: `polygon(-1100px -100px, ${interpolate(frame, [63, 87], [-1100, 3000], {
            easing: Easing.bezier(0.45, 0, 0.7, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px -100px, ${interpolate(frame, [63, 87], [-1700, 2400], {
            easing: Easing.bezier(0.45, 0, 0.7, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px 1180px, -1100px 1180px)`,
        }}
      >
        <NightMembrane phase={0} />
      </AbsoluteFill>
      <Interactive.Div
        name="Leading film edge"
        style={{
          position: "absolute",
          left: -40,
          top: -200,
          width: 80,
          height: 1500,
          rotate: "25deg",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,236,226,0.95) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(4px)",
          translate: interpolate(frame, [63, 87], ["-1400px 0px", "2700px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.7, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [63, 65, 85, 87], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
