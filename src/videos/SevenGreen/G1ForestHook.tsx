import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BiotaSpray, Droplet, GoldTriangle, LensLeaf } from "./materials";

// SHOT 01 — FOREST HOOK (0:00–0:02.3)
// Opens behind a dark leaf at the lens (the loop seam). It slides away onto
// almost total darkness; one drop lands on a black water surface and its
// ripple uncovers thin gold triangle lines beneath the water, then the type.
// Forest-green light and biota shadows drift in.
export const G1ForestHook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#040C08" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="g1-ripple" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="4" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [30, 80], [60, 6], {
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

      <Interactive.Div
        name="Forest-green light entering"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          background:
            "radial-gradient(70% 80% at 50% 10%, rgba(40,95,62,0.85) 0%, rgba(20,55,36,0.5) 45%, rgba(6,18,12,0) 80%)",
          opacity: interpolate(frame, [22, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Biota shadow drifting"
        style={{
          position: "absolute",
          left: 1200,
          top: -260,
          width: 700,
          height: 1050,
          filter: "blur(18px)",
          opacity: interpolate(frame, [26, 60], [0, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          rotate: "-150deg",
          translate: interpolate(frame, [0, 86], ["120px 0px", "-160px 20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <BiotaSpray tone="shadow" seed={7} />
      </Interactive.Div>

      <Interactive.Div
        name="Black water surface"
        style={{
          position: "absolute",
          left: -200,
          top: 600,
          width: 2320,
          height: 600,
          background:
            "linear-gradient(180deg, rgba(20,45,30,0.9) 0%, #08160E 30%, #030906 100%)",
          boxShadow: "0 -2px 10px rgba(90,140,105,0.25)",
        }}
      />
      <AbsoluteFill
        name="Gold triangle beneath the water"
        style={{
          filter: "url(#g1-ripple)",
          clipPath: `ellipse(${interpolate(frame, [30, 78], [0, 1500], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [30, 78], [0, 420], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 960px 790px)`,
        }}
      >
        <Interactive.Div
          name="Gold triangle"
          style={{
            position: "absolute",
            left: 560,
            top: 620,
            width: 800,
            height: 693,
            scale: "1 0.34",
            transformOrigin: "50% 0%",
            opacity: interpolate(frame, [32, 60], [0, 0.95], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <GoldTriangle progress={1} width={4} />
        </Interactive.Div>
      </AbsoluteFill>
      <Interactive.Div
        name="Ripple 1"
        style={{
          position: "absolute",
          left: -240,
          top: 640,
          width: 2400,
          height: 300,
          borderRadius: "50%",
          boxShadow:
            "0 0 0 3px rgba(170,210,180,0.55), 0 6px 12px rgba(0,0,0,0.5), inset 0 4px 6px rgba(190,225,200,0.4)",
          filter: "blur(1.2px)",
          scale: interpolate(frame, [30, 80], [0.01, 1], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [30, 33, 80], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Ripple 2"
        style={{
          position: "absolute",
          left: -240,
          top: 640,
          width: 2400,
          height: 300,
          borderRadius: "50%",
          boxShadow:
            "0 0 0 2px rgba(170,210,180,0.45), inset 0 3px 5px rgba(190,225,200,0.3)",
          filter: "blur(1.2px)",
          scale: interpolate(frame, [38, 86], [0.01, 0.75], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [38, 41, 86], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Falling drop"
        style={{
          position: "absolute",
          left: 935,
          top: -140,
          width: 50,
          height: 62,
          translate: interpolate(frame, [14, 30], ["0px 0px", "0px 920px"], {
            easing: Easing.bezier(0.5, 0, 1, 0.5),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [29, 31], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>

      <Interactive.Div
        name="Title — ROOTED"
        style={{
          position: "absolute",
          left: 0,
          top: 230,
          width: 1920,
          textAlign: "center",
          fontFamily: "Josefin Sans",
          fontWeight: 300,
          fontSize: 170,
          lineHeight: 1,
          letterSpacing: 30,
          color: "#E9D9A6",
          clipPath: `ellipse(${interpolate(frame, [40, 70], [0, 1400], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [40, 70], [0, 900], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 960px 560px)`,
        }}
      >
        ROOTED
      </Interactive.Div>
      <Interactive.Div
        name="Title — IN BOTANICALS"
        style={{
          position: "absolute",
          left: 0,
          top: 430,
          width: 1920,
          textAlign: "center",
          fontFamily: "Josefin Sans",
          fontWeight: 400,
          fontSize: 58,
          lineHeight: 1,
          letterSpacing: 22,
          color: "#BFD3B8",
          clipPath: `ellipse(${interpolate(frame, [48, 78], [0, 1400], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [48, 78], [0, 700], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 960px 360px)`,
        }}
      >
        IN BOTANICALS
      </Interactive.Div>

      <AbsoluteFill
        name="Dark leaf leaving the lens (loop seam)"
        style={{
          clipPath: `ellipse(1400px 2200px at ${interpolate(frame, [0, 22], [960, 3600], {
            easing: Easing.bezier(0.2, 0.4, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px 540px)`,
        }}
      >
        <LensLeaf />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
