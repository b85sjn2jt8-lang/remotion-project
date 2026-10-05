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
  BOX_SRC,
  ClearDrop,
  GlassRings,
  MintPlatform,
  MintSurface,
  PlumLeaf,
} from "./materials";

// SHOT 06 — FINAL PLUM HERO (0:12.1–0:15.0)
// Bottle forward, box just behind, on pale translucent mint glass, framed by
// a large structure of glass ripple rings. From frame 63 (film frame 425) a
// clear drop lands right in front of the lens and its ripple spreads until
// the frame is the pale-mint surface of the very first frame (loop).
export const P6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F4F1E9" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 88], [1, 1.02], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Ivory to mint"
          style={{
            background:
              "linear-gradient(180deg, #FAF8F2 0%, #EEF1E8 50%, #DCEBE2 100%)",
          }}
        />
        <Interactive.Div
          name="Botanical shadow"
          style={{
            position: "absolute",
            left: 1560,
            top: -240,
            width: 240,
            height: 600,
            rotate: "28deg",
            filter: "blur(12px)",
            opacity: 0.12,
            mixBlendMode: "multiply",
            translate: interpolate(frame, [0, 88], ["0px 0px", "-24px 6px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <PlumLeaf tone="fresh" />
        </Interactive.Div>
        <Interactive.Div
          name="Glass ripple structure"
          style={{
            position: "absolute",
            left: 500,
            top: 90,
            width: 1000,
            height: 1000,
            opacity: interpolate(frame, [0, 20], [0.7, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <GlassRings
            shimmer={interpolate(frame, [0, 88], [0, 0.25], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </Interactive.Div>

        <Interactive.Div
          name="Main — GREEN PLUM"
          style={{
            position: "absolute",
            left: 110,
            top: 360,
            fontFamily: "Hanken Grotesk",
            fontWeight: 300,
            fontSize: 96,
            lineHeight: 1,
            letterSpacing: 8,
            color: "#2F5547",
            clipPath: `inset(0 ${interpolate(frame, [8, 32], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          GREEN PLUM
        </Interactive.Div>
        <Interactive.Div
          name="Secondary — REFRESHING TONER"
          style={{
            position: "absolute",
            left: 114,
            top: 484,
            fontFamily: "Hanken Grotesk",
            fontWeight: 500,
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#5D8676",
            opacity: interpolate(frame, [18, 34], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          REFRESHING TONER
        </Interactive.Div>
        <Interactive.Div
          name="Then — AHA + BHA"
          style={{
            position: "absolute",
            left: 114,
            top: 560,
            fontFamily: "Hanken Grotesk",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: 14,
            color: "#8C7398",
            opacity: interpolate(frame, [30, 46], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          AHA + BHA
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1000px 880px",
          scale: interpolate(frame, [0, 88], [1, 1.025], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Mint glass platform"
          style={{ position: "absolute", left: -200, top: 830, width: 2320, height: 400 }}
        >
          <MintPlatform top={92} />
        </Interactive.Div>
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 846,
            top: 856,
            width: 206,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(50,90,75,0.42), rgba(50,90,75,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="Beauty of Joseon box"
          src={staticFile(BOX_SRC)}
          style={{
            position: "absolute",
            left: 860,
            top: 360,
            width: 178,
            filter: "drop-shadow(-4px 8px 14px rgba(60,90,75,0.16))",
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 980,
            top: 903,
            width: 164,
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
              width: 164,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle contact shadow"
          style={{
            position: "absolute",
            left: 966,
            top: 892,
            width: 192,
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
            left: 980,
            top: 388,
            width: 164,
            filter: "drop-shadow(0 8px 16px rgba(60,100,85,0.18)) drop-shadow(0 0 14px rgba(255,252,240,0.6))",
          }}
        />
        <Interactive.Div
          name="Daylight passing"
          style={{
            position: "absolute",
            left: 760,
            top: 300,
            width: 560,
            height: 640,
            background:
              "linear-gradient(105deg, rgba(255,250,236,0) 35%, rgba(255,250,236,0.35) 50%, rgba(255,250,236,0) 65%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [10, 62], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground plum leaf (out of focus)"
        style={{
          position: "absolute",
          left: 1640,
          top: 560,
          width: 280,
          height: 700,
          rotate: "-34deg",
          filter: "blur(18px)",
          opacity: 0.9,
          translate: interpolate(frame, [0, 88], ["20px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <PlumLeaf tone="soft" />
      </Interactive.Div>

      <Interactive.Div
        name="Drop landing in front of the lens"
        style={{
          position: "absolute",
          left: 920,
          top: -160,
          width: 80,
          height: 98,
          translate: interpolate(frame, [54, 64], ["0px 0px", "0px 650px"], {
            easing: Easing.bezier(0.5, 0, 1, 0.5),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [54, 64], [1, 1.6], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [52, 54, 63, 65], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ClearDrop />
      </Interactive.Div>
      <AbsoluteFill
        name="Ripple fills the frame with the mint surface (loop seam)"
        style={{
          clipPath: `circle(${interpolate(frame, [64, 87], [0, 1200], {
            easing: Easing.bezier(0.3, 0.3, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px at 960px 540px)`,
        }}
      >
        <MintSurface />
      </AbsoluteFill>
      <Interactive.Div
        name="Ripple edge"
        style={{
          position: "absolute",
          left: interpolate(frame, [64, 87], [960, -240], {
            easing: Easing.bezier(0.3, 0.3, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          top: interpolate(frame, [64, 87], [540, -660], {
            easing: Easing.bezier(0.3, 0.3, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          width: interpolate(frame, [64, 87], [0, 2400], {
            easing: Easing.bezier(0.3, 0.3, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: interpolate(frame, [64, 87], [0, 2400], {
            easing: Easing.bezier(0.3, 0.3, 0.45, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          borderRadius: "50%",
          boxShadow: "0 0 0 2px rgba(255,255,255,0.9), 0 0 0 8px rgba(90,140,120,0.22), inset 0 0 24px rgba(255,255,255,0.5)",
          opacity: interpolate(frame, [64, 66, 84, 87], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
