import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { GelToFilm } from "./materials";

// SHOT 03 — WRAPPING TECHNOLOGY (0:04.9–0:07.8)
// Abstract macro: a thin translucent gel flows over a pearlescent surface,
// levels out and becomes a smooth, glossy wrapping film. Liquid → thin film
// → smooth wrap, seen from just above the surface.
export const M3GelToFilm: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#3E1830" }}>
      <AbsoluteFill
        name="Night above the surface"
        style={{
          background:
            "linear-gradient(180deg, #2C0F21 0%, #5A2443 30%, #9A5070 36%, #3E1830 37%)",
        }}
      />
      <AbsoluteFill
        name="Macro camera travel"
        style={{
          translate: interpolate(frame, [0, 88], ["0px 0px", "-120px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 88], [1.06, 1], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Pearlescent surface"
          style={{
            position: "absolute",
            left: -200,
            top: 380,
            width: 2400,
            height: 800,
            background:
              "linear-gradient(180deg, #E9B8B8 0%, #D79AA6 30%, #B97890 70%, #8E5272 100%)",
          }}
        />
        <Interactive.Div
          name="Pearl iridescence"
          style={{
            position: "absolute",
            left: -200,
            top: 380,
            width: 2400,
            height: 800,
            background:
              "linear-gradient(100deg, rgba(255,230,220,0) 10%, rgba(255,230,220,0.35) 30%, rgba(225,205,245,0.3) 45%, rgba(255,226,200,0.3) 60%, rgba(255,230,220,0) 80%)",
            filter: "blur(30px)",
            mixBlendMode: "screen",
            translate: interpolate(frame, [0, 88], ["-200px 0px", "200px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Gel becoming film"
          style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}
        >
          <GelToFilm
            front={interpolate(frame, [4, 70], [-100, 2500], {
              easing: Easing.bezier(0.3, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            phase={interpolate(frame, [0, 88], [0, 3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Title — OVERNIGHT"
        style={{
          position: "absolute",
          left: 130,
          top: 110,
          fontFamily: "Jost",
          fontWeight: 300,
          fontSize: 110,
          lineHeight: 1,
          letterSpacing: 18,
          color: "#F7E6DC",
          opacity: interpolate(frame, [18, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [18, 44], ["0px 20px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        OVERNIGHT
      </Interactive.Div>
      <Interactive.Div
        name="Title — WRAPPING CARE"
        style={{
          position: "absolute",
          left: 136,
          top: 238,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 60,
          lineHeight: 1,
          letterSpacing: 16,
          color: "#EFB9A4",
          opacity: interpolate(frame, [32, 46], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        WRAPPING CARE
      </Interactive.Div>
    </AbsoluteFill>
  );
};
