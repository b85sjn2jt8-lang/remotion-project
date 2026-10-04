import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Caustics, Droplet, POUCH_SRC } from "./materials";

// SCENE 04 — WATER FRESHNESS (0:06.4–0:09.1)
// After the wave crosses the lens the camera rises out of the water: the
// near water line drops away, droplets run off the lens, and the pouch stands
// on a glass block at the edge of clear blue water under warm sun.
// Sound: 0:06.8 water rush · 0:08 small droplets.
export const H4WaterFresh: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFEFC8" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="h4-water" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.05"
              numOctaves="2"
              seed={5}
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [0, 82], [26, 14], {
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
        name="Sunlit sky"
        style={{
          background:
            "linear-gradient(180deg, #FFF8E6 0%, #FFEBB8 45%, #FFD98C 62%, #FFE7B0 64%)",
        }}
      />
      <Interactive.Div
        name="Sun"
        style={{
          position: "absolute",
          left: 220,
          top: -380,
          width: 1000,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,255,250,1), rgba(255,244,206,0.7) 40%, rgba(255,244,206,0))",
        }}
      />
      <Interactive.Div
        name="Clear blue water"
        style={{
          position: "absolute",
          left: -200,
          top: 640,
          width: 2320,
          height: 560,
          background:
            "linear-gradient(180deg, #BDE9F0 0%, #7ACCDF 12%, #3FA8CB 45%, #1F86B3 100%)",
        }}
      />
      <AbsoluteFill
        name="Surface shimmer"
        style={{
          top: 640,
          height: 440,
          opacity: 0.3,
          mixBlendMode: "screen",
          filter: "blur(1.5px)",
          translate: interpolate(frame, [0, 82], ["0px 0px", "-90px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: "1 0.35",
          transformOrigin: "50% 0%",
        }}
      >
        <Caustics seed={12} frequency={0.011} />
      </AbsoluteFill>
      <Interactive.Div
        name="Sun glitter path"
        style={{
          position: "absolute",
          left: 500,
          top: 640,
          width: 420,
          height: 440,
          background:
            "linear-gradient(180deg, rgba(255,250,226,0.9) 0%, rgba(255,250,226,0.2) 100%)",
          filter: "blur(16px)",
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(60% 100% at 50% 0%, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />
      <Img
        name="Pouch reflection (in water)"
        src={staticFile(POUCH_SRC)}
        style={{
          position: "absolute",
          left: 1120,
          top: 790,
          width: 560,
          scale: "1 -1",
          opacity: 0.4,
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 55%)",
          filter: "url(#h4-water) blur(1px)",
        }}
      />
      <Interactive.Div
        name="Coral glow on water"
        style={{
          position: "absolute",
          left: 1080,
          top: 800,
          width: 640,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,90,120,0.35), rgba(255,90,120,0))",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />

      <AbsoluteFill
        name="Product on glass block"
        style={{
          transformOrigin: "1400px 700px",
          scale: interpolate(frame, [0, 82], [1.04, 1], {
            easing: Easing.bezier(0.2, 0.6, 0.4, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Glass block (below waterline)"
          style={{
            position: "absolute",
            left: 1100,
            top: 712,
            width: 600,
            height: 90,
            background:
              "linear-gradient(180deg, rgba(240,252,255,0.75) 0%, rgba(150,215,235,0.55) 100%)",
            borderLeft: "2px solid rgba(255,255,255,0.8)",
            borderRight: "2px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(6px)",
          }}
        />
        <Interactive.Div
          name="Glass block top (wet)"
          style={{
            position: "absolute",
            left: 1100,
            top: 672,
            width: 600,
            height: 80,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.95) 0%, rgba(230,248,255,0.8) 55%, rgba(170,225,240,0.75) 100%)",
            border: "2px solid rgba(255,255,255,0.95)",
          }}
        />
        <Interactive.Div
          name="Waterline ring"
          style={{
            position: "absolute",
            left: 1070,
            top: 776,
            width: 660,
            height: 50,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.8)",
            filter: "blur(1px)",
            scale: interpolate(frame, [0, 40, 82], [0.98, 1.04, 0.99], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1180,
            top: 696,
            width: 440,
            height: 24,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(20,60,90,0.45), rgba(20,60,90,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="HIKARI pouch"
          src={staticFile(POUCH_SRC)}
          style={{
            position: "absolute",
            left: 1120,
            top: 130,
            width: 560,
            filter: "drop-shadow(0 0 12px rgba(255,250,232,0.8))",
          }}
        />
        <Interactive.Div
          name="Water light on pouch"
          style={{
            position: "absolute",
            left: 1120,
            top: 130,
            width: 560,
            height: 579,
            maskImage: `url(${staticFile(POUCH_SRC)})`,
            maskSize: "100% 100%",
            opacity: 0.22,
            mixBlendMode: "screen",
            translate: "0px 0px",
          }}
        >
          <AbsoluteFill
            style={{
              translate: interpolate(frame, [0, 82], ["0px 0px", "-60px 20px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <Caustics seed={21} frequency={0.012} />
          </AbsoluteFill>
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Title — LIGHTWEIGHT"
        style={{
          position: "absolute",
          left: 128,
          top: 200,
          fontFamily: "Outfit",
          fontWeight: 200,
          fontSize: 140,
          lineHeight: 1,
          letterSpacing: 6,
          color: "#0B4F75",
          opacity: interpolate(frame, [18, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [18, 42], ["0px 24px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        LIGHTWEIGHT
      </Interactive.Div>
      <Interactive.Div
        name="Title — FAST ABSORBING"
        style={{
          position: "absolute",
          left: 134,
          top: 365,
          fontFamily: "Outfit",
          fontWeight: 600,
          fontSize: 56,
          lineHeight: 1,
          letterSpacing: 12,
          color: "#C2185B",
          opacity: interpolate(frame, [32, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [32, 54], ["0px 20px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        FAST ABSORBING
      </Interactive.Div>

      <Interactive.Div
        name="Near water line (camera rising)"
        style={{
          position: "absolute",
          left: -200,
          top: 0,
          width: 2320,
          height: 1400,
          background:
            "linear-gradient(180deg, rgba(225,248,255,0.95) 0%, rgba(120,205,228,0.85) 3%, rgba(60,170,206,0.7) 30%, rgba(30,130,180,0.75) 100%)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 -6px 18px rgba(255,255,255,0.9)",
          translate: interpolate(frame, [0, 26], ["0px 260px", "0px 1200px"], {
            easing: Easing.bezier(0.4, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Lens droplet 1"
        style={{
          position: "absolute",
          left: 300,
          top: 120,
          width: 110,
          height: 120,
          filter: "blur(3px)",
          translate: interpolate(frame, [0, 46], ["0px 0px", "0px 520px"], {
            easing: Easing.bezier(0.5, 0, 0.9, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [36, 46], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Lens droplet 2"
        style={{
          position: "absolute",
          left: 1700,
          top: 260,
          width: 80,
          height: 88,
          filter: "blur(2px)",
          translate: interpolate(frame, [6, 50], ["0px 0px", "0px 420px"], {
            easing: Easing.bezier(0.5, 0, 0.9, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [42, 50], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Lens droplet 3 (stays)"
        style={{
          position: "absolute",
          left: 1560,
          top: 880,
          width: 190,
          height: 170,
          filter: "blur(10px)",
        }}
      >
        <Droplet />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
