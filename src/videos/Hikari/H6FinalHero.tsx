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
  AmberGlass,
  Caustics,
  Droplet,
  GoldenFlare,
  POUCH_SRC,
} from "./materials";

// SCENE 06 — FINAL SUN + WATER HERO (0:11.3–0:15)
// Sun behind, clear water below: the pouch stands large in a film of water
// on reflective glass, ripples spreading from its base. At 0:14.2 golden
// light expands across the lens while a ripple crosses the foreground, until
// the frame is pure gold — the opening frame, so the film loops.
// Sound: 0:11.5 final hero impact · 0:14.2 water + sunlight transition.
export const H6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFE3A6" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="h6-water" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.045"
              numOctaves="2"
              seed={9}
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [0, 30, 60, 110], [10, 24, 14, 18], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <AbsoluteFill name="Background">
        <AbsoluteFill
          name="Warm summer atmosphere"
          style={{
            background:
              "radial-gradient(90% 100% at 66% 30%, #FFFCEE 0%, #FFEDBE 30%, #FFD488 62%, #F9AE5E 100%)",
          }}
        />
        <Interactive.Div
          name="Sun behind the pouch"
          style={{
            position: "absolute",
            left: 860,
            top: -260,
            width: 1000,
            height: 1000,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,250,1), rgba(255,246,214,0.7) 40%, rgba(255,246,214,0))",
            scale: interpolate(frame, [0, 110], [0.96, 1.04], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Coral reflection left edge"
          style={{
            position: "absolute",
            left: -360,
            top: 120,
            width: 700,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,96,90,0.45), rgba(255,96,90,0))",
            filter: "blur(30px)",
            mixBlendMode: "screen",
          }}
        />
        <Interactive.Div
          name="Magenta reflection right edge"
          style={{
            position: "absolute",
            left: 1640,
            top: 360,
            width: 600,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(236,40,120,0.4), rgba(236,40,120,0))",
            filter: "blur(30px)",
            mixBlendMode: "screen",
          }}
        />
        <Interactive.Div
          name="Water film on glass"
          style={{
            position: "absolute",
            left: -200,
            top: 800,
            width: 2320,
            height: 400,
            background:
              "linear-gradient(180deg, rgba(200,236,240,0) 0%, rgba(170,222,234,0.9) 10%, #84C9DC 55%, #5BB0CC 100%)",
          }}
        />
        <AbsoluteFill
          name="Caustics in the water film"
          style={{
            top: 810,
            height: 270,
            opacity: 0.28,
            mixBlendMode: "screen",
            filter: "blur(1.5px)",
            translate: interpolate(frame, [0, 110], ["0px 0px", "-100px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Caustics seed={4} frequency={0.016} />
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product (settle)"
        style={{
          transformOrigin: "1333px 840px",
          scale: interpolate(frame, [0, 36], [1.06, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Img
          name="Pouch reflection (wet glass)"
          src={staticFile(POUCH_SRC)}
          style={{
            position: "absolute",
            left: 1000,
            top: 840,
            width: 667,
            scale: "1 -1",
            opacity: 0.42,
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 40%)",
            filter: "url(#h6-water) blur(1px)",
          }}
        />
        <Interactive.Div
          name="Ripple 1 from base"
          style={{
            position: "absolute",
            left: 783,
            top: 780,
            width: 1100,
            height: 130,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.85)",
            boxShadow: "0 4px 8px rgba(40,110,150,0.25)",
            filter: "blur(1px)",
            scale: interpolate(frame, [20, 80], [0.55, 1.4], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [20, 28, 80], [0, 0.9, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Ripple 2 from base"
          style={{
            position: "absolute",
            left: 783,
            top: 780,
            width: 1100,
            height: 130,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.75)",
            filter: "blur(1px)",
            scale: interpolate(frame, [40, 100], [0.55, 1.3], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [40, 48, 100], [0, 0.8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1100,
            top: 824,
            width: 470,
            height: 30,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(30,60,80,0.5), rgba(30,60,80,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="HIKARI pouch"
          src={staticFile(POUCH_SRC)}
          style={{
            position: "absolute",
            left: 1000,
            top: 150,
            width: 667,
            filter: "drop-shadow(0 0 16px rgba(255,250,230,0.85))",
          }}
        />
        <Interactive.Div
          name="Moving sunlight on pouch"
          style={{
            position: "absolute",
            left: 1000,
            top: 150,
            width: 667,
            height: 690,
            maskImage: `url(${staticFile(POUCH_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(115deg, rgba(255,255,255,0) 38%, rgba(255,250,232,0.7) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [24, 76], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Line — SPF 50"
        style={{
          position: "absolute",
          left: 124,
          top: 210,
          fontFamily: "Outfit",
          fontWeight: 800,
          fontSize: 220,
          lineHeight: 1,
          letterSpacing: -6,
          color: "rgba(0,0,0,0)",
          backgroundImage:
            "linear-gradient(160deg, #FF7A3D 0%, #F0306E 55%, #C0105C 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${interpolate(frame, [12, 30], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [12, 30], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
        }}
      >
        SPF 50
      </Interactive.Div>
      <Interactive.Div
        name="Line — PA++++"
        style={{
          position: "absolute",
          left: 134,
          top: 440,
          fontFamily: "Outfit",
          fontWeight: 400,
          fontSize: 92,
          lineHeight: 1,
          letterSpacing: 10,
          color: "#C9620C",
          maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${interpolate(frame, [22, 40], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [22, 40], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
        }}
      >
        PA++++
      </Interactive.Div>
      <Interactive.Div
        name="Line — ULTRAFRESH SUNSCREEN"
        style={{
          position: "absolute",
          left: 136,
          top: 600,
          fontFamily: "Outfit",
          fontWeight: 600,
          fontSize: 46,
          letterSpacing: 9,
          color: "#8E1048",
          opacity: interpolate(frame, [38, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ULTRAFRESH SUNSCREEN
      </Interactive.Div>
      <Interactive.Div
        name="Line — 50 ml"
        style={{
          position: "absolute",
          left: 136,
          top: 672,
          fontFamily: "Outfit",
          fontWeight: 400,
          fontSize: 36,
          letterSpacing: 4,
          color: "#9A4A1A",
          opacity: interpolate(frame, [48, 62], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        50 ml
      </Interactive.Div>

      <Interactive.Div
        name="Foreground droplet (out of focus)"
        style={{
          position: "absolute",
          left: 40,
          top: 820,
          width: 280,
          height: 250,
          filter: "blur(10px)",
          translate: interpolate(frame, [0, 110], ["0px 0px", "-30px 10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground glass (out of focus)"
        style={{
          position: "absolute",
          left: 1780,
          top: -120,
          width: 360,
          height: 760,
          filter: "blur(20px)",
          rotate: "10deg",
          translate: interpolate(frame, [0, 110], ["0px 0px", "30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AmberGlass radius={60} />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground ripple (loop)"
        style={{
          position: "absolute",
          left: -340,
          top: 760,
          width: 2600,
          height: 520,
          borderRadius: "50%",
          border: "6px solid rgba(255,255,255,0.8)",
          filter: "blur(3px)",
          scale: interpolate(frame, [84, 106], [0.3, 1.3], {
            easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [84, 90, 106], [0, 0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Golden flare (loop seam)"
        style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}
      >
        <GoldenFlare
          open={interpolate(frame, [86, 109], [1, 0], {
            easing: Easing.bezier(0.4, 0, 0.7, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
