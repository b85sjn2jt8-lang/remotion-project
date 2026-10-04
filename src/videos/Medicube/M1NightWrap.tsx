import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { FilmSheen, NightMembrane, TUBE_SRC } from "./materials";

// SHOT 01 — THE NIGHT WRAP (0:00–0:02.3)
// Opens on the dark pearlescent membrane (the loop seam). It peels open onto
// a glossy film stretched close to the lens; behind it, a macro of the real
// tube and the words WRAP / THE NIGHT, softly refracted by the film.
export const M1NightWrap: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#2A0F1E" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="m1-refract" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.012" numOctaves="2" seed="5" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [20, 70], [40, 8], {
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

      <AbsoluteFill
        name="Midnight rose"
        style={{
          background:
            "radial-gradient(90% 110% at 66% 42%, #7A3554 0%, #4E1D38 45%, #2E1022 80%, #1E0915 100%)",
        }}
      />
      <Interactive.Div
        name="Rose-gold glow behind tube"
        style={{
          position: "absolute",
          left: 880,
          top: -100,
          width: 900,
          height: 1100,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(245,185,165,0.5), rgba(245,185,165,0))",
        }}
      />
      <AbsoluteFill
        name="Macro tube (behind the film)"
        style={{
          transformOrigin: "1280px 470px",
          scale: interpolate(frame, [0, 86], [1.1, 1], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [20, 70], [6, 1.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <Img
          name="MEDICUBE tube (macro)"
          src={staticFile(TUBE_SRC)}
          style={{ position: "absolute", left: 900, top: -170, width: 760 }}
        />
      </AbsoluteFill>

      <AbsoluteFill name="Type behind the film" style={{ filter: "url(#m1-refract)" }}>
        <Interactive.Div
          name="Title — WRAP"
          style={{
            position: "absolute",
            left: 130,
            top: 270,
            fontFamily: "Jost",
            fontWeight: 600,
            fontSize: 230,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#F7E6DC",
            opacity: interpolate(frame, [22, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          WRAP
        </Interactive.Div>
        <Interactive.Div
          name="Title — THE NIGHT"
          style={{
            position: "absolute",
            left: 138,
            top: 510,
            fontFamily: "Jost",
            fontWeight: 300,
            fontSize: 110,
            lineHeight: 1,
            letterSpacing: interpolate(frame, [34, 80], [40, 18], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            color: "#EFC3B0",
            opacity: interpolate(frame, [34, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          THE NIGHT
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Wrapping film close to the lens"
        style={{
          backdropFilter: "blur(1.2px) saturate(115%)",
          background:
            "linear-gradient(115deg, rgba(250,210,200,0.06) 0%, rgba(250,210,200,0.14) 50%, rgba(220,200,250,0.08) 100%)",
          scale: interpolate(frame, [0, 86], ["1.08 1", "1 1"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <FilmSheen
          phase={interpolate(frame, [0, 86], [0.1, 1.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          tone="night"
          stretch={interpolate(frame, [0, 86], [1, 1.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Dark membrane peeling open (loop seam)"
        style={{
          clipPath: `polygon(${interpolate(frame, [0, 26], [-400, 2400], {
            easing: Easing.bezier(0.3, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px -100px, 2400px -100px, 2400px 1180px, ${interpolate(frame, [0, 26], [-1000, 1800], {
            easing: Easing.bezier(0.3, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px 1180px)`,
        }}
      >
        <NightMembrane phase={0} />
      </AbsoluteFill>
      <Interactive.Div
        name="Peeling film edge"
        style={{
          position: "absolute",
          left: -40,
          top: -200,
          width: 80,
          height: 1500,
          rotate: "25deg",
          transformOrigin: "50% 50%",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,232,222,0.9) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(4px)",
          translate: interpolate(frame, [0, 26], ["-700px 0px", "2100px 0px"], {
            easing: Easing.bezier(0.3, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [0, 2, 24, 26], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
