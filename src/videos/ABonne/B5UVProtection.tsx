import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, CollagenSphere } from "./materials";

// SCENE 05 — UV PROTECTION (0:09.7–0:12.5)
// A brighter, sun-kissed pink set. Warm light beams fall from the upper left,
// the bottle casts a long soft shadow, and a barely-there refraction dome
// catches the light around it. No SPF is shown or implied.
// Sound: 0:10 airy sunlight transition.
export const B5UVProtection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFE1DC" }}>
      <AbsoluteFill
        name="Sunlit backdrop"
        style={{
          background:
            "linear-gradient(160deg, #FFF4EA 0%, #FFE0DA 40%, #FBC3CB 75%, #F4A9BA 100%)",
        }}
      />
      <Interactive.Div
        name="Sun glow"
        style={{
          position: "absolute",
          left: -400,
          top: -560,
          width: 1400,
          height: 1100,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,250,240,1), rgba(255,236,214,0.6) 50%, rgba(255,236,214,0))",
          opacity: interpolate(frame, [0, 30], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Sun beam 1"
        style={{
          position: "absolute",
          left: 100,
          top: -500,
          width: 260,
          height: 2000,
          transformOrigin: "50% 0%",
          background:
            "linear-gradient(90deg, rgba(255,246,232,0) 0%, rgba(255,246,232,0.55) 50%, rgba(255,246,232,0) 100%)",
          filter: "blur(18px)",
          mixBlendMode: "screen",
          rotate: interpolate(frame, [0, 88], ["-38deg", "-33deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Sun beam 2"
        style={{
          position: "absolute",
          left: 260,
          top: -500,
          width: 420,
          height: 2200,
          transformOrigin: "50% 0%",
          background:
            "linear-gradient(90deg, rgba(255,246,232,0) 0%, rgba(255,246,232,0.4) 50%, rgba(255,246,232,0) 100%)",
          filter: "blur(26px)",
          mixBlendMode: "screen",
          rotate: interpolate(frame, [0, 88], ["-44deg", "-40deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Sunlit floor"
        style={{
          position: "absolute",
          left: -200,
          top: 780,
          width: 2320,
          height: 400,
          background:
            "linear-gradient(180deg, rgba(255,214,212,0) 0%, rgba(252,200,204,0.95) 12%, #F6B4C0 60%, #EE9EB1 100%)",
        }}
      />
      <Interactive.Div
        name="Plinth"
        style={{
          position: "absolute",
          left: 920,
          top: 828,
          width: 560,
          height: 70,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 40% 35%, #FFF8F1 0%, #FFE3E0 50%, #F7C4CC 100%)",
          boxShadow:
            "0 18px 30px rgba(190,80,110,0.25), inset 0 -6px 12px rgba(230,140,160,0.35)",
        }}
      />
      <Interactive.Div
        name="Long sun shadow"
        style={{
          position: "absolute",
          left: 1200,
          top: 840,
          width: 520,
          height: 40,
          borderRadius: "50%",
          transformOrigin: "0% 50%",
          rotate: "8deg",
          background:
            "linear-gradient(90deg, rgba(150,50,85,0.45) 0%, rgba(150,50,85,0) 100%)",
          filter: "blur(8px)",
        }}
      />
      <Interactive.Div
        name="Contact shadow"
        style={{
          position: "absolute",
          left: 1080,
          top: 848,
          width: 240,
          height: 22,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(120,30,60,0.55), rgba(120,30,60,0))",
          filter: "blur(4px)",
        }}
      />
      <Interactive.Div
        name="Warm halo"
        style={{
          position: "absolute",
          left: 880,
          top: 180,
          width: 640,
          height: 760,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,240,222,0.85), rgba(255,240,222,0))",
          opacity: interpolate(frame, [10, 50], [0.4, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Img
        name="A BONNE bottle"
        src={staticFile(BOTTLE_SRC)}
        style={{
          position: "absolute",
          left: 1096,
          top: 261,
          width: 207,
          filter: "drop-shadow(-6px -4px 16px rgba(255,232,206,0.85))",
        }}
      />
      <Interactive.Div
        name="Sunlight travelling over bottle"
        style={{
          position: "absolute",
          left: 1096,
          top: 261,
          width: 207,
          height: 599,
          maskImage: `url(${staticFile(BOTTLE_SRC)})`,
          maskSize: "100% 100%",
          background:
            "linear-gradient(135deg, rgba(255,240,220,0) 35%, rgba(255,240,220,0.7) 50%, rgba(255,240,220,0) 65%)",
          backgroundSize: "100% 300%",
          backgroundPosition: `0% ${interpolate(frame, [20, 70], [100, 0], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%`,
          mixBlendMode: "soft-light",
        }}
      />
      <Interactive.Div
        name="Light shield (refraction dome)"
        style={{
          position: "absolute",
          left: 900,
          top: 190,
          width: 600,
          height: 720,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.6)",
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0) 82%, rgba(255,246,236,0.22) 96%, rgba(255,255,255,0.35) 100%)",
          boxShadow: "inset 0 0 50px rgba(255,236,214,0.35)",
          opacity: interpolate(frame, [18, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [18, 50], [0.94, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Light glint on dome"
        style={{
          position: "absolute",
          left: 900,
          top: 190,
          width: 600,
          height: 720,
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,250,240,0.9) 14deg, rgba(255,255,255,0) 32deg, rgba(255,255,255,0) 360deg)",
          maskImage:
            "radial-gradient(closest-side, rgba(0,0,0,0) 94%, rgba(0,0,0,1) 98%, rgba(0,0,0,0) 100%)",
          filter: "blur(1px)",
          opacity: interpolate(frame, [24, 40, 80, 88], [0, 1, 1, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          rotate: interpolate(frame, [24, 88], ["-60deg", "120deg"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Title — UV"
        style={{
          position: "absolute",
          left: 130,
          top: 250,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 800,
          fontSize: 260,
          lineHeight: 1,
          letterSpacing: -8,
          color: "rgba(0,0,0,0)",
          backgroundImage:
            "linear-gradient(165deg, #E9C46A 0%, #C9962B 55%, #A9781C 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          filter: "drop-shadow(0 14px 26px rgba(180,110,40,0.25))",
          opacity: interpolate(frame, [14, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [14, 40], ["-40px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        UV
      </Interactive.Div>
      <Interactive.Div
        name="Title — PROTECTION"
        style={{
          position: "absolute",
          left: 140,
          top: 530,
          fontFamily: "Plus Jakarta Sans",
          fontWeight: 300,
          fontSize: 104,
          lineHeight: 1,
          color: "#5E1A38",
          letterSpacing: interpolate(frame, [22, 60], [30, 8], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [22, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        PROTECTION
      </Interactive.Div>

      <Interactive.Div
        name="Foreground warm sphere (out of focus)"
        style={{
          position: "absolute",
          left: 1620,
          top: 640,
          width: 420,
          height: 420,
          filter: "blur(18px)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "-50px -10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CollagenSphere />
      </Interactive.Div>
      <Interactive.Div
        name="Sun flare bokeh"
        style={{
          position: "absolute",
          left: 620,
          top: 140,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,236,210,0.7), rgba(255,236,210,0))",
          filter: "blur(4px)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "40px 30px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
