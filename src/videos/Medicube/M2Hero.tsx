import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { FilmSheen, GlassCrescent, Pearl, RoseGlass, TUBE_SRC } from "./materials";

// SHOT 02 — PRODUCT HERO (0:02.3–0:05.3)
// The film peels past the lens onto the full tube, standing on rose-gold
// glass under soft moonlight, a translucent glass crescent behind it.
export const M2Hero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#4E1D38" }}>
      <AbsoluteFill
        name="Background"
        style={{
          scale: interpolate(frame, [0, 88], [1, 1.025], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Deep blush night"
          style={{
            background:
              "radial-gradient(85% 100% at 62% 40%, #B0607A 0%, #7C3555 35%, #4E1D38 70%, #2C0F21 100%)",
          }}
        />
        <Interactive.Div
          name="Moonlight"
          style={{
            position: "absolute",
            left: 1180,
            top: -260,
            width: 900,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(232,232,250,0.55), rgba(232,232,250,0))",
          }}
        />
        <Interactive.Div
          name="Glass crescent of light"
          style={{
            position: "absolute",
            left: 830,
            top: 40,
            width: 760,
            height: 760,
            rotate: interpolate(frame, [0, 88], ["-14deg", "-8deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            filter: "drop-shadow(0 0 40px rgba(255,220,220,0.35))",
          }}
        >
          <GlassCrescent />
        </Interactive.Div>
        <Interactive.Div
          name="Headline — COLLAGEN NIGHT"
          style={{
            position: "absolute",
            left: 130,
            top: 340,
            fontFamily: "Jost",
            fontWeight: 300,
            fontSize: 98,
            lineHeight: 1,
            letterSpacing: 8,
            color: "#F7E6DC",
            clipPath: `inset(0 ${interpolate(frame, [14, 36], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          COLLAGEN NIGHT
        </Interactive.Div>
        <Interactive.Div
          name="Headline — WRAPPING MASK"
          style={{
            position: "absolute",
            left: 130,
            top: 460,
            fontFamily: "Jost",
            fontWeight: 600,
            fontSize: 98,
            lineHeight: 1,
            letterSpacing: 6,
            color: "rgba(0,0,0,0)",
            backgroundImage: "linear-gradient(100deg, #F9D6C4 0%, #E7A68E 55%, #F3C7B3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            clipPath: `inset(0 ${interpolate(frame, [24, 46], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          WRAPPING MASK
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1180px 820px",
          scale: interpolate(frame, [0, 88], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Rose-gold glass"
          style={{ position: "absolute", left: 860, top: 800, width: 640, height: 420 }}
        >
          <RoseGlass />
        </Interactive.Div>
        <Interactive.Div
          name="Tube reflection"
          style={{
            position: "absolute",
            left: 1033,
            top: 860,
            width: 294,
            height: 76,
            overflow: "hidden",
            opacity: 0.32,
          }}
        >
          <Img
            src={staticFile(TUBE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 294,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 12%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1020,
            top: 846,
            width: 320,
            height: 26,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(30,8,20,0.6), rgba(30,8,20,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="MEDICUBE tube"
          src={staticFile(TUBE_SRC)}
          style={{
            position: "absolute",
            left: 1033,
            top: 220,
            width: 294,
            filter: "drop-shadow(0 0 14px rgba(250,190,170,0.75))",
          }}
        />
        <Interactive.Div
          name="Moving pearl light on tube"
          style={{
            position: "absolute",
            left: 1033,
            top: 220,
            width: 294,
            height: 640,
            maskImage: `url(${staticFile(TUBE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 38%, rgba(255,240,232,0.6) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [20, 74], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Film sliver near the lens"
        style={{
          position: "absolute",
          left: 1500,
          top: -100,
          width: 700,
          height: 1300,
          rotate: "12deg",
          background:
            "linear-gradient(90deg, rgba(250,210,200,0) 0%, rgba(250,210,200,0.12) 40%, rgba(255,240,232,0.25) 50%, rgba(250,210,200,0.1) 60%, rgba(250,210,200,0) 100%)",
          backdropFilter: "blur(6px)",
          maskImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          translate: interpolate(frame, [0, 88], ["60px 0px", "-40px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <FilmSheen
          phase={interpolate(frame, [0, 88], [0.3, 0.9], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          tone="night"
        />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground pearl (out of focus)"
        style={{
          position: "absolute",
          left: 60,
          top: 840,
          width: 220,
          height: 220,
          filter: "blur(12px)",
          opacity: 0.85,
        }}
      >
        <Pearl />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
