import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Droplet, HeartLeaf, SageGlass, TUBE_SRC } from "./materials";

// SHOT 02 — PRODUCT REVEAL (0:02.4–0:05.4)
// The foam clears onto the real tube standing on wet sage glass, backlit
// translucent heartleaf silhouettes behind it, soft daylight and a green
// rim. HEARTLEAF tucks behind the tube; + QUERCETINOL™ follows.
export const H2ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#E4EBDC" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 90], [1, 1.025], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Ivory-sage studio"
          style={{
            background:
              "radial-gradient(90% 100% at 62% 38%, #FAFBF5 0%, #E7EDDF 45%, #C9D8BF 80%, #AFC4A5 100%)",
          }}
        />
        <Interactive.Div
          name="Daylight"
          style={{
            position: "absolute",
            left: 760,
            top: -260,
            width: 1100,
            height: 1000,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,255,250,0.95), rgba(255,255,250,0))",
          }}
        />
        <Interactive.Div
          name="Heartleaf (far, backlit)"
          style={{
            position: "absolute",
            left: 1300,
            top: 40,
            width: 620,
            height: 620,
            filter: "blur(10px)",
            opacity: 0.8,
            rotate: interpolate(frame, [0, 90], ["18deg", "22deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <HeartLeaf />
        </Interactive.Div>
        <Interactive.Div
          name="Heartleaf (behind tube)"
          style={{
            position: "absolute",
            left: 860,
            top: 120,
            width: 700,
            height: 700,
            filter: "blur(4px)",
            opacity: 0.85,
            rotate: interpolate(frame, [0, 90], ["-8deg", "-5deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <HeartLeaf />
        </Interactive.Div>
        <Interactive.Div
          name="Headline — HEARTLEAF"
          style={{
            position: "absolute",
            left: 118,
            top: 280,
            fontFamily: "Figtree",
            fontWeight: 800,
            fontSize: 196,
            lineHeight: 1,
            letterSpacing: -4,
            color: "#2E4A35",
            clipPath: `inset(0 ${interpolate(frame, [12, 34], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          HEARTLEAF
        </Interactive.Div>
        <Interactive.Div
          name="Headline — + QUERCETINOL™"
          style={{
            position: "absolute",
            left: 126,
            top: 500,
            fontFamily: "Figtree",
            fontWeight: 300,
            fontSize: 86,
            lineHeight: 1,
            letterSpacing: 6,
            color: "#4E7457",
            opacity: interpolate(frame, [30, 44], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [30, 52], ["0px 20px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          + QUERCETINOL™
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1180px 820px",
          scale: interpolate(frame, [0, 90], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Wet sage glass"
          style={{ position: "absolute", left: 830, top: 800, width: 700, height: 420 }}
        >
          <SageGlass />
        </Interactive.Div>
        <Interactive.Div
          name="Tube reflection"
          style={{
            position: "absolute",
            left: 1052,
            top: 860,
            width: 256,
            height: 70,
            overflow: "hidden",
            opacity: 0.3,
          }}
        >
          <Img
            src={staticFile(TUBE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 256,
              scale: "1 -1",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 12%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1040,
            top: 846,
            width: 280,
            height: 24,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(30,50,35,0.55), rgba(30,50,35,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ANUA Heartleaf tube"
          src={staticFile(TUBE_SRC)}
          style={{
            position: "absolute",
            left: 1052,
            top: 221,
            width: 256,
            filter: "drop-shadow(0 0 12px rgba(200,230,190,0.85))",
          }}
        />
        <Interactive.Div
          name="Daylight across tube"
          style={{
            position: "absolute",
            left: 1052,
            top: 221,
            width: 256,
            height: 639,
            maskImage: `url(${staticFile(TUBE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(255,255,250,0.6) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [20, 76], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Condensation 1"
          style={{ position: "absolute", left: 900, top: 880, width: 34, height: 26 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Condensation 2"
          style={{ position: "absolute", left: 1400, top: 870, width: 24, height: 18 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Condensation 3"
          style={{ position: "absolute", left: 1350, top: 905, width: 16, height: 12 }}
        >
          <Droplet />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground leaf (out of focus)"
        style={{
          position: "absolute",
          left: -260,
          top: 640,
          width: 640,
          height: 640,
          filter: "blur(18px)",
          rotate: "-28deg",
          opacity: 0.85,
          translate: interpolate(frame, [0, 90], ["0px 0px", "-40px 10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <HeartLeaf />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground droplet (out of focus)"
        style={{
          position: "absolute",
          left: 1720,
          top: 820,
          width: 200,
          height: 180,
          filter: "blur(10px)",
        }}
      >
        <Droplet />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
