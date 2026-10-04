import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { AmberGlass, Caustics, Droplet, POUCH_SRC } from "./materials";

// SCENE 02 — HIKARI HERO REVEAL (0:02.1–0:04.5)
// The full pouch stands on a wet clear-glass block in warm golden light,
// with a coral/magenta refraction behind it and an out-of-focus glass edge
// in front. Sound: 0:02.2 soft product reveal impact.
export const H2HeroReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFE7AE" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 82], [1, 1.02], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Golden-white gradient"
          style={{
            background:
              "radial-gradient(85% 95% at 68% 35%, #FFFDF4 0%, #FFF0C4 35%, #FFD98A 70%, #FFC266 100%)",
          }}
        />
        <Interactive.Div
          name="Sun glow behind pouch"
          style={{
            position: "absolute",
            left: 920,
            top: -60,
            width: 900,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,248,1), rgba(255,246,214,0.6) 50%, rgba(255,246,214,0))",
          }}
        />
        <Interactive.Div
          name="Coral-magenta refraction"
          style={{
            position: "absolute",
            left: 700,
            top: -200,
            width: 260,
            height: 1500,
            rotate: "28deg",
            background:
              "linear-gradient(90deg, rgba(255,140,60,0) 0%, rgba(255,120,70,0.45) 30%, rgba(240,48,110,0.45) 60%, rgba(200,30,120,0) 100%)",
            filter: "blur(30px)",
            translate: interpolate(frame, [0, 82], ["-60px 0px", "80px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Headline — ULTRAFRESH"
          style={{
            position: "absolute",
            left: 128,
            top: 320,
            fontFamily: "Outfit",
            fontWeight: 200,
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: 4,
            color: "#A3124F",
            maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${interpolate(frame, [10, 30], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [10, 30], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
          }}
        >
          ULTRAFRESH
        </Interactive.Div>
        <Interactive.Div
          name="Headline — SUNSCREEN"
          style={{
            position: "absolute",
            left: 132,
            top: 470,
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: 6,
            color: "#E06A0C",
            maskImage: `linear-gradient(100deg, rgba(0,0,0,1) ${interpolate(frame, [24, 44], [-30, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%, rgba(0,0,0,0) ${interpolate(frame, [24, 44], [-10, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%)`,
          }}
        >
          SUNSCREEN
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1310px 760px",
          scale: interpolate(frame, [0, 82], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Glass block front"
          style={{
            position: "absolute",
            left: 890,
            top: 852,
            width: 840,
            height: 300,
            background:
              "linear-gradient(180deg, rgba(255,250,232,0.55) 0%, rgba(255,222,160,0.35) 60%, rgba(255,200,130,0.4) 100%)",
            borderLeft: "2px solid rgba(255,255,255,0.7)",
            borderRight: "2px solid rgba(255,255,255,0.7)",
            boxShadow: "inset 0 20px 30px rgba(255,255,255,0.5)",
            backdropFilter: "blur(10px)",
          }}
        />
        <Interactive.Div
          name="Glass block top (wet)"
          style={{
            position: "absolute",
            left: 890,
            top: 790,
            width: 840,
            height: 124,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.9) 0%, rgba(255,246,222,0.75) 50%, rgba(255,214,150,0.7) 100%)",
            border: "2px solid rgba(255,255,255,0.95)",
            overflow: "hidden",
          }}
        >
          <Img
            name="Pouch reflection"
            src={staticFile(POUCH_SRC)}
            style={{
              position: "absolute",
              left: 130,
              top: 60,
              width: 580,
              scale: "1 -1",
              opacity: 0.3,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 12%)",
            }}
          />
          <AbsoluteFill style={{ opacity: 0.14, mixBlendMode: "screen" }}>
            <Caustics seed={8} frequency={0.02} />
          </AbsoluteFill>
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1050,
            top: 832,
            width: 520,
            height: 34,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(120,50,10,0.5), rgba(120,50,10,0))",
            filter: "blur(5px)",
          }}
        />
        <Img
          name="HIKARI pouch"
          src={staticFile(POUCH_SRC)}
          style={{
            position: "absolute",
            left: 1020,
            top: 250,
            width: 580,
            filter: "drop-shadow(0 0 14px rgba(255,248,220,0.8))",
          }}
        />
        <Interactive.Div
          name="Moving sunlight on pouch"
          style={{
            position: "absolute",
            left: 1020,
            top: 250,
            width: 580,
            height: 600,
            maskImage: `url(${staticFile(POUCH_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(115deg, rgba(255,255,255,0) 38%, rgba(255,250,232,0.7) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [16, 70], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Droplet on glass 1"
          style={{
            position: "absolute",
            left: 960,
            top: 860,
            width: 40,
            height: 30,
          }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Droplet on glass 2"
          style={{
            position: "absolute",
            left: 1640,
            top: 846,
            width: 28,
            height: 21,
          }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Droplet on glass 3"
          style={{
            position: "absolute",
            left: 1590,
            top: 880,
            width: 18,
            height: 14,
          }}
        >
          <Droplet />
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Foreground"
        style={{
          translate: interpolate(frame, [0, 82], ["0px 0px", "-50px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Glass edge (out of focus)"
          style={{
            position: "absolute",
            left: -300,
            top: -100,
            width: 420,
            height: 1300,
            filter: "blur(18px)",
            rotate: "4deg",
          }}
        >
          <AmberGlass radius={60} />
        </Interactive.Div>
        <Interactive.Div
          name="Lens droplet (out of focus)"
          style={{
            position: "absolute",
            left: 1700,
            top: 820,
            width: 170,
            height: 150,
            filter: "blur(9px)",
          }}
        >
          <Droplet />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
