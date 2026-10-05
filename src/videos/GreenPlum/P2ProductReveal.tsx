import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, BOX_SRC, MintPane, MintPlatform } from "./materials";

// SHOT 02 — PRODUCT + BOX REVEAL (0:02.3–0:05.3)
// Out of the ripple: the real bottle, slightly forward, and its box just
// behind, grounded on pale translucent mint glass in soft daylight. Both are
// shown at ≤3× the source photo so the packaging stays honest.
export const P2ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F4F1E9" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 90], [1, 1.02], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Warm ivory to sage"
          style={{
            background:
              "linear-gradient(180deg, #FAF8F2 0%, #F1EEE4 50%, #E1E8DD 100%)",
          }}
        />
        <Interactive.Div
          name="Soft daylight"
          style={{
            position: "absolute",
            left: 760,
            top: -200,
            width: 1100,
            height: 1000,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(255,253,244,0.95), rgba(255,253,244,0))",
          }}
        />
        <Interactive.Div
          name="Title — GREEN PLUM"
          style={{
            position: "absolute",
            left: 130,
            top: 380,
            fontFamily: "Hanken Grotesk",
            fontWeight: 300,
            fontSize: 120,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#2F5547",
            clipPath: `inset(0 ${interpolate(frame, [16, 40], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          GREEN PLUM
        </Interactive.Div>
        <Interactive.Div
          name="Title — REFRESHING TONER"
          style={{
            position: "absolute",
            left: 136,
            top: 530,
            fontFamily: "Hanken Grotesk",
            fontWeight: 500,
            fontSize: 46,
            lineHeight: 1,
            letterSpacing: 16,
            color: "#6F8F80",
            clipPath: `inset(0 ${interpolate(frame, [28, 52], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          REFRESHING TONER
        </Interactive.Div>
        <Interactive.Div
          name="Plum rule"
          style={{
            position: "absolute",
            left: 138,
            top: 610,
            width: 200,
            height: 2,
            background: "linear-gradient(90deg, #A88FA6, rgba(168,143,166,0))",
            scale: interpolate(frame, [44, 66], ["0 1", "1 1"], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transformOrigin: "0% 50%",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (small push-in)"
        style={{
          transformOrigin: "1200px 880px",
          scale: interpolate(frame, [0, 90], [1, 1.03], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Mint glass platform"
          style={{ position: "absolute", left: -200, top: 820, width: 2320, height: 400 }}
        >
          <MintPlatform top={90} />
        </Interactive.Div>
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 1046,
            top: 838,
            width: 200,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(50,90,75,0.4), rgba(50,90,75,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="Beauty of Joseon box"
          src={staticFile(BOX_SRC)}
          style={{
            position: "absolute",
            left: 1060,
            top: 359,
            width: 172,
            filter: "drop-shadow(-4px 8px 14px rgba(60,90,75,0.16))",
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 1170,
            top: 888,
            width: 160,
            height: 80,
            overflow: "hidden",
            opacity: 0.25,
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 160,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle contact shadow"
          style={{
            position: "absolute",
            left: 1156,
            top: 878,
            width: 188,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(50,90,75,0.5), rgba(50,90,75,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="Green Plum toner bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1170,
            top: 385,
            width: 160,
            filter: "drop-shadow(0 8px 16px rgba(60,100,85,0.18))",
          }}
        />
        <Interactive.Div
          name="Warm daylight across the products"
          style={{
            position: "absolute",
            left: 900,
            top: 300,
            width: 600,
            height: 600,
            background:
              "linear-gradient(105deg, rgba(255,250,236,0) 35%, rgba(255,250,236,0.35) 50%, rgba(255,250,236,0) 65%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [10, 84], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground glass element (out of focus)"
        style={{
          position: "absolute",
          left: 1640,
          top: -60,
          width: 200,
          height: 1200,
          rotate: "6deg",
          filter: "blur(10px)",
          translate: interpolate(frame, [0, 90], ["30px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MintPane />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
