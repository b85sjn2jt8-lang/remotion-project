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
  Droplet,
  Underwater,
  Waterline,
  belowSurfaceClip,
} from "./materials";

// SCENE 01 — THE FLOOD (0:00–0:02.4)
// Opens fully underwater (the loop seam). The camera rises, a ripple runs
// overhead and the lens breaks the surface onto a macro of the real bottle,
// first seen refracted through the water. HYDRATION surfaces with the
// waterline; FLOOD. settles in as the water calms.
export const E1Flood: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A5794" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="e1-under" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="34" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="e1-settle" x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.03" numOctaves="2" seed="8" />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [52, 74], [46, 0], {
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

      <AbsoluteFill name="Above the surface">
        <AbsoluteFill
          name="Icy air"
          style={{
            background:
              "radial-gradient(100% 100% at 70% 30%, #F2FBFF 0%, #CDEEFA 45%, #94D6F1 100%)",
          }}
        />
        <AbsoluteFill
          name="Macro camera (settles)"
          style={{
            transformOrigin: "1390px 540px",
            scale: interpolate(frame, [30, 85], [1.1, 1], {
              easing: Easing.bezier(0.2, 0.6, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Img
            name="EQQUALBERRY bottle (macro)"
            src={staticFile(BOTTLE_SRC)}
            style={{ position: "absolute", left: 900, top: -620, width: 980 }}
          />
        </AbsoluteFill>
        <Interactive.Div
          name="Title — HYDRATION"
          style={{
            position: "absolute",
            left: 120,
            top: 330,
            fontFamily: "Sora",
            fontWeight: 300,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: 4,
            color: "#08365E",
          }}
        >
          HYDRATION
        </Interactive.Div>
        <Interactive.Div
          name="Title — FLOOD."
          style={{
            position: "absolute",
            left: 112,
            top: 500,
            fontFamily: "Sora",
            fontWeight: 800,
            fontSize: 230,
            lineHeight: 1,
            letterSpacing: -8,
            color: "rgba(0,0,0,0)",
            backgroundImage:
              "linear-gradient(170deg, #2EC4F2 0%, #0F8FD6 50%, #0A5AA8 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            filter: "url(#e1-settle)",
            opacity: interpolate(frame, [52, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          FLOOD.
        </Interactive.Div>
        <Interactive.Div
          name="Lens droplet 1"
          style={{
            position: "absolute",
            left: 760,
            top: 160,
            width: 90,
            height: 100,
            filter: "blur(2px)",
            translate: interpolate(frame, [46, 85], ["0px 0px", "0px 420px"], {
              easing: Easing.bezier(0.5, 0, 0.9, 0.6),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Lens droplet 2 (out of focus)"
          style={{
            position: "absolute",
            left: 60,
            top: 820,
            width: 220,
            height: 200,
            filter: "blur(10px)",
          }}
        >
          <Droplet />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Below the surface"
        style={{
          clipPath: belowSurfaceClip(
            interpolate(frame, [18, 50], [-120, 1260], {
              easing: Easing.bezier(0.45, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            frame * 0.18,
          ),
        }}
      >
        <Underwater t={frame} />
        <AbsoluteFill
          name="Bottle seen through the water"
          style={{
            filter: "url(#e1-under)",
            opacity: interpolate(frame, [6, 26], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            mixBlendMode: "luminosity",
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 860,
              top: -720,
              width: 1060,
            }}
          />
          <Interactive.Div
            name="HYDRATION under water"
            style={{
              position: "absolute",
              left: 120,
              top: 350,
              fontFamily: "Sora",
              fontWeight: 300,
              fontSize: 150,
              lineHeight: 1,
              letterSpacing: 4,
              color: "#E6F7FF",
            }}
          >
            HYDRATION
          </Interactive.Div>
        </AbsoluteFill>
        <Interactive.Div
          name="Ripple overhead"
          style={{
            position: "absolute",
            left: -400,
            top: -500,
            width: 2720,
            height: 900,
            borderRadius: "50%",
            border: "8px solid rgba(235,250,255,0.6)",
            filter: "blur(4px)",
            scale: interpolate(frame, [0, 26], [0.2, 1.3], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [0, 6, 26], [0, 0.9, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Waterline crossing the lens"
        style={{
          opacity: interpolate(frame, [16, 19, 48, 51], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Waterline
          y={interpolate(frame, [18, 50], [-120, 1260], {
            easing: Easing.bezier(0.45, 0, 0.5, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          phase={frame * 0.18}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
