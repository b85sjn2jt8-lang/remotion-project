import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, Caustics, Droplet, Underwater } from "./materials";

// SCENE 06 — FINAL FLOOD HERO (0:11.8–0:15)
// The bottle stands large in a shallow layer of water on wet blue glass, the
// giant water sphere behind it. A drop lands and its ripple runs under the
// bottle. From 0:14.2 the sphere moves toward the lens and floods the frame;
// the last frame is fully submerged — identical to frame 0, so it loops.
export const E6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B4F86" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="e6-water" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.05" numOctaves="2" seed={4} />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [0, 30, 60, 95], [8, 22, 12, 14], {
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
        name="Deep blue studio"
        style={{
          background:
            "radial-gradient(80% 90% at 66% 44%, #3AA9E0 0%, #1A7DBE 40%, #0B4F86 75%, #062F5A 100%)",
        }}
      />
      <AbsoluteFill
        name="Giant water sphere (behind)"
        style={{
          clipPath: "circle(540px at 1260px 470px)",
        }}
      >
        <Underwater
          t={interpolate(frame, [0, 94], [-94, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>
      <Interactive.Div
        name="Sphere rim and highlight"
        style={{
          position: "absolute",
          left: 720,
          top: -70,
          width: 1080,
          height: 1080,
          borderRadius: "50%",
          boxShadow:
            "inset 0 0 0 3px rgba(225,250,255,0.6), inset -50px -70px 140px rgba(4,50,100,0.5), inset 50px 60px 110px rgba(220,248,255,0.3), 0 0 80px rgba(120,210,245,0.35)",
        }}
      >
        <AbsoluteFill
          style={{
            left: "10%",
            top: "12%",
            width: "36%",
            height: "22%",
            borderRadius: "50%",
            borderTop: "16px solid rgba(255,255,255,0.7)",
            rotate: "-32deg",
            filter: "blur(5px)",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Wet blue glass"
        style={{
          position: "absolute",
          left: -200,
          top: 840,
          width: 2320,
          height: 400,
          background:
            "linear-gradient(180deg, rgba(120,200,240,0) 0%, rgba(90,180,228,0.92) 8%, #2C8FCC 50%, #165F9C 100%)",
        }}
      />
      <AbsoluteFill
        name="Light in the water film"
        style={{
          top: 850,
          height: 230,
          opacity: 0.15,
          mixBlendMode: "screen",
          filter: "blur(1.5px)",
          translate: interpolate(frame, [0, 95], ["0px 0px", "-80px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Caustics seed={44} frequency={0.016} />
      </AbsoluteFill>
      <Img
        name="Bottle reflection (water film)"
        src={staticFile(BOTTLE_SRC)}
        style={{
          position: "absolute",
          left: 1080,
          top: 871,
          width: 362,
          scale: "1 -1",
          opacity: 0.4,
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 35%)",
          filter: "url(#e6-water) blur(1px)",
        }}
      />
      <Interactive.Div
        name="Ripple under the bottle 1"
        style={{
          position: "absolute",
          left: 660,
          top: 810,
          width: 1200,
          height: 150,
          borderRadius: "50%",
          border: "3px solid rgba(230,250,255,0.85)",
          filter: "blur(1px)",
          scale: interpolate(frame, [22, 80], [0.08, 1.2], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [22, 26, 80], [0, 0.95, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: "240px 0px",
        }}
      />
      <Interactive.Div
        name="Ripple under the bottle 2"
        style={{
          position: "absolute",
          left: 660,
          top: 810,
          width: 1200,
          height: 150,
          borderRadius: "50%",
          border: "2px solid rgba(230,250,255,0.75)",
          filter: "blur(1px)",
          scale: interpolate(frame, [32, 92], [0.08, 1], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [32, 36, 92], [0, 0.85, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: "240px 0px",
        }}
      />
      <Interactive.Div
        name="Water around the base"
        style={{
          position: "absolute",
          left: 1000,
          top: 846,
          width: 520,
          height: 56,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(180,235,252,0.35), rgba(180,235,252,0))",
          boxShadow: "inset 0 2px 3px rgba(255,255,255,0.6)",
        }}
      />
      <Interactive.Div
        name="Contact shadow"
        style={{
          position: "absolute",
          left: 1090,
          top: 856,
          width: 340,
          height: 26,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(3,30,60,0.6), rgba(3,30,60,0))",
          filter: "blur(4px)",
        }}
      />
      <Img
        name="EQQUALBERRY bottle"
        src={staticFile(BOTTLE_SRC)}
        style={{
          position: "absolute",
          left: 1080,
          top: 190,
          width: 362,
          filter: "drop-shadow(0 0 16px rgba(170,240,255,0.85))",
        }}
      />
      <Interactive.Div
        name="Cold light across bottle"
        style={{
          position: "absolute",
          left: 1080,
          top: 190,
          width: 362,
          height: 681,
          maskImage: `url(${staticFile(BOTTLE_SRC)})`,
          maskSize: "100% 100%",
          background:
            "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(235,252,255,0.7) 50%, rgba(255,255,255,0) 62%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [24, 70], [100, 0], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0%`,
          mixBlendMode: "soft-light",
        }}
      />
      <Interactive.Div
        name="Falling drop"
        style={{
          position: "absolute",
          left: 1475,
          top: -120,
          width: 54,
          height: 66,
          translate: interpolate(frame, [8, 22], ["0px 0px", "0px 980px"], {
            easing: Easing.bezier(0.5, 0, 1, 0.5),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [21, 23], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>

      <Interactive.Div
        name="Line — HYALTOIN"
        style={{
          position: "absolute",
          left: 120,
          top: 250,
          fontFamily: "Sora",
          fontWeight: 700,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: -2,
          color: "#F5E21C",
          textShadow: "0 10px 40px rgba(3,30,60,0.35)",
          clipPath: `inset(0 ${interpolate(frame, [12, 30], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        HYALTOIN
      </Interactive.Div>
      <Interactive.Div
        name="Line — FLOODING"
        style={{
          position: "absolute",
          left: 124,
          top: 410,
          fontFamily: "Sora",
          fontWeight: 200,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 4,
          color: "#FFFFFF",
          clipPath: `inset(0 ${interpolate(frame, [20, 38], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        FLOODING
      </Interactive.Div>
      <Interactive.Div
        name="Line — INTENSE HYDRATION"
        style={{
          position: "absolute",
          left: 128,
          top: 600,
          fontFamily: "Sora",
          fontWeight: 500,
          fontSize: 44,
          letterSpacing: 12,
          color: "#BDEBFA",
          opacity: interpolate(frame, [34, 48], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        INTENSE HYDRATION
      </Interactive.Div>
      <Interactive.Div
        name="Line — 30 ml"
        style={{
          position: "absolute",
          left: 128,
          top: 672,
          fontFamily: "Sora",
          fontWeight: 300,
          fontSize: 36,
          letterSpacing: 4,
          color: "#DFF6FF",
          opacity: interpolate(frame, [44, 58], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        30 ml
      </Interactive.Div>

      <Interactive.Div
        name="Foreground droplet (out of focus)"
        style={{
          position: "absolute",
          left: 1680,
          top: 800,
          width: 260,
          height: 240,
          filter: "blur(12px)",
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground droplet left (out of focus)"
        style={{
          position: "absolute",
          left: 40,
          top: 880,
          width: 180,
          height: 160,
          filter: "blur(10px)",
        }}
      >
        <Droplet />
      </Interactive.Div>

      <AbsoluteFill
        name="Sphere floods the lens (loop seam)"
        style={{
          clipPath: `circle(${interpolate(frame, [71, 94], [540, 1250], {
            easing: Easing.bezier(0.45, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at ${interpolate(frame, [71, 94], [1260, 960], {
            easing: Easing.bezier(0.45, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [71, 94], [470, 540], {
            easing: Easing.bezier(0.45, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [70, 80], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Underwater
          t={interpolate(frame, [0, 94], [-94, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
