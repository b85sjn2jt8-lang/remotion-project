import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { ClearDrop, MintSurface, PlumLeaf, RippleRings } from "./materials";

// SHOT 01 — PLUM RESET HOOK (0:00–0:02.3)
// Opens on the pale-mint surface filling the frame (the loop seam); it
// settles into a calm panel on ivory. One clear toner drop falls, lands, and
// a single controlled ripple spreads — under the surface, refracted, AHA + BHA
// appear at two depths. A soft green shadow passes; REFRESH.
export const P1PlumReset: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F6F3EC" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="p1-refract" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="3" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [38, 86], [46, 4], {
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
        name="Ivory"
        style={{ background: "radial-gradient(80% 90% at 50% 40%, #FBF9F4 0%, #F3EFE6 70%, #E9E4D8 100%)" }}
      />
      <Interactive.Div
        name="Panel shadow"
        style={{
          position: "absolute",
          left: 210,
          top: 190,
          width: 1500,
          height: 700,
          borderRadius: 48,
          backgroundColor: "#D6EBE1",
          boxShadow: "0 30px 60px rgba(80,110,95,0.16)",
          opacity: interpolate(frame, [14, 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        name="Mint surface (settles from full frame)"
        style={{
          clipPath: `inset(${interpolate(frame, [0, 22], [0, 190], {
            easing: Easing.bezier(0.3, 0.4, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [0, 22], [0, 210], {
            easing: Easing.bezier(0.3, 0.4, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px round ${interpolate(frame, [0, 22], [0, 48], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <MintSurface />
        <AbsoluteFill
          name="Type under the surface (revealed by the ripple)"
          style={{
            filter: "url(#p1-refract)",
            clipPath: `circle(${interpolate(frame, [38, 80], [0, 900], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px at 960px 540px)`,
          }}
        >
          <Interactive.Div
            name="AHA (deeper)"
            style={{
              position: "absolute",
              left: 390,
              top: 390,
              fontFamily: "Hanken Grotesk",
              fontWeight: 200,
              fontSize: 220,
              lineHeight: 1,
              letterSpacing: 20,
              color: "#6E9C88",
              filter: "blur(1.6px)",
              opacity: 0.85,
            }}
          >
            AHA
          </Interactive.Div>
          <Interactive.Div
            name="plus"
            style={{
              position: "absolute",
              left: 925,
              top: 430,
              fontFamily: "Hanken Grotesk",
              fontWeight: 200,
              fontSize: 130,
              lineHeight: 1,
              color: "#7FA897",
            }}
          >
            +
          </Interactive.Div>
          <Interactive.Div
            name="BHA (nearer)"
            style={{
              position: "absolute",
              left: 1100,
              top: 372,
              fontFamily: "Hanken Grotesk",
              fontWeight: 300,
              fontSize: 250,
              lineHeight: 1,
              letterSpacing: 20,
              color: "#3F6E5C",
            }}
          >
            BHA
          </Interactive.Div>
        </AbsoluteFill>
        <Interactive.Div
          name="Ripple"
          style={{ position: "absolute", left: 160, top: -260, width: 1600, height: 1600 }}
        >
          <RippleRings
            spread={interpolate(frame, [38, 86], [0, 0.9], {
              easing: Easing.bezier(0.2, 0.6, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            rings={3}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Soft green shadow passing"
          style={{
            position: "absolute",
            left: -900,
            top: -200,
            width: 500,
            height: 1250,
            rotate: "-58deg",
            filter: "blur(26px)",
            opacity: 0.16,
            mixBlendMode: "multiply",
            translate: interpolate(frame, [52, 86], ["0px 0px", "2700px 0px"], {
              easing: Easing.bezier(0.4, 0.05, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <PlumLeaf tone="fresh" />
        </Interactive.Div>
        <Interactive.Div
          name="Title — REFRESH"
          style={{
            position: "absolute",
            left: 0,
            top: 730,
            width: 1920,
            textAlign: "center",
            fontFamily: "Hanken Grotesk",
            fontWeight: 500,
            fontSize: 54,
            lineHeight: 1,
            color: "#3F6656",
            letterSpacing: interpolate(frame, [60, 86], [44, 30], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [60, 72], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          REFRESH
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Falling toner drop"
        style={{
          position: "absolute",
          left: 933,
          top: -120,
          width: 54,
          height: 66,
          translate: interpolate(frame, [20, 38], ["0px 0px", "0px 625px"], {
            easing: Easing.bezier(0.5, 0, 1, 0.5),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [37, 39], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ClearDrop />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
