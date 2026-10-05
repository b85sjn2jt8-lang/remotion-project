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
  BiotaSpray,
  Droplet,
  GoldTriangle,
  LensLeaf,
  Leaf,
  Mist,
  PACKAGE_SRC,
  WetStone,
} from "./materials";

// SHOT 06 — FINAL HERO (0:12.1–0:15.0)
// The package centred on wet stone inside a tall structure of gold triangle
// light, with leaves in the foreground. A dark leaf then drifts over the lens
// and fills the frame. The last frame is the first frame of the film (loop).
export const G6FinalHero: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#06120B" }}>
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
          name="Deep forest green"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 42%, #22513A 0%, #133222 40%, #081A10 75%, #040C08 100%)",
          }}
        />
        <Interactive.Div
          name="Biota — left backlit"
          style={{
            position: "absolute",
            left: 150,
            top: -180,
            width: 480,
            height: 720,
            rotate: "160deg",
            filter: "blur(12px)",
            opacity: 0.45,
          }}
        >
          <BiotaSpray tone="glow" seed={41} />
        </Interactive.Div>
        <Interactive.Div
          name="Biota — right backlit"
          style={{
            position: "absolute",
            left: 1300,
            top: -200,
            width: 480,
            height: 720,
            rotate: "200deg",
            filter: "blur(12px)",
            opacity: 0.45,
          }}
        >
          <BiotaSpray tone="glow" seed={13} />
        </Interactive.Div>
        <Interactive.Div
          name="Golden triangle light structure"
          style={{
            position: "absolute",
            left: 480,
            top: 20,
            width: 960,
            height: 831,
            opacity: interpolate(frame, [0, 20], [0.75, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <GoldTriangle progress={1} width={3} />
        </Interactive.Div>
        <Interactive.Div
          name="Inner triangle echo"
          style={{
            position: "absolute",
            left: 600,
            top: 124,
            width: 720,
            height: 623,
            opacity: 0.35,
          }}
        >
          <GoldTriangle
            progress={interpolate(frame, [4, 40], [0, 1], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            width={2}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Backlight halo"
          style={{
            position: "absolute",
            left: 460,
            top: 60,
            width: 1000,
            height: 860,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(170,210,150,0.28), rgba(170,210,150,0))",
          }}
        />

        <Interactive.Div
          name="Title — NATURE"
          style={{
            position: "absolute",
            left: 110,
            top: 330,
            fontFamily: "Josefin Sans",
            fontWeight: 600,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: 18,
            color: "#E9D9A6",
            clipPath: `inset(0 ${interpolate(frame, [8, 32], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          NATURE
        </Interactive.Div>
        <Interactive.Div
          name="Title — SEVEN GREEN"
          style={{
            position: "absolute",
            left: 114,
            top: 466,
            fontFamily: "Josefin Sans",
            fontWeight: 300,
            fontSize: 54,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#E3EBDD",
            clipPath: `inset(0 ${interpolate(frame, [16, 40], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          SEVEN GREEN
        </Interactive.Div>
        <Interactive.Div
          name="Product — BOTANICAL"
          style={{
            position: "absolute",
            left: 1290,
            top: 380,
            fontFamily: "Josefin Sans",
            fontWeight: 300,
            fontSize: 56,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#E3EBDD",
            opacity: interpolate(frame, [20, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [20, 48], ["-24px 0px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          BOTANICAL
        </Interactive.Div>
        <Interactive.Div
          name="Product — SHAMPOO BAR"
          style={{
            position: "absolute",
            left: 1290,
            top: 456,
            fontFamily: "Josefin Sans",
            fontWeight: 300,
            fontSize: 56,
            lineHeight: 1,
            letterSpacing: 12,
            color: "#E3EBDD",
            opacity: interpolate(frame, [26, 42], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [26, 54], ["-24px 0px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          SHAMPOO BAR
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "960px 860px",
          scale: interpolate(frame, [0, 88], [1, 1.035], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Wet stone"
          style={{ position: "absolute", left: 0, top: 840, width: 1920, height: 400 }}
        >
          <WetStone />
        </Interactive.Div>
        <Interactive.Div
          name="Stone horizon fade"
          style={{
            position: "absolute",
            left: 0,
            top: 805,
            width: 1920,
            height: 80,
            background: "linear-gradient(180deg, rgba(9,28,18,1) 0%, rgba(9,28,18,0) 100%)",
          }}
        />
        <Interactive.Div
          name="Floor mist"
          style={{
            position: "absolute",
            left: 160,
            top: 720,
            width: 1600,
            height: 320,
            opacity: 0.55,
            translate: interpolate(frame, [0, 88], ["-50px 0px", "50px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Mist />
        </Interactive.Div>
        <Interactive.Div
          name="Package reflection"
          style={{
            position: "absolute",
            left: 580,
            top: 866,
            width: 761,
            height: 160,
            overflow: "hidden",
            opacity: 0.3,
          }}
        >
          <Img
            src={staticFile(PACKAGE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -4,
              width: 761,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 22%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 550,
            top: 848,
            width: 820,
            height: 40,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(0,6,3,0.85), rgba(0,6,3,0))",
            filter: "blur(5px)",
          }}
        />
        <Img
          name="SEVEN GREEN package"
          src={staticFile(PACKAGE_SRC)}
          style={{
            position: "absolute",
            left: 580,
            top: 210,
            width: 761,
            filter: "drop-shadow(0 0 20px rgba(150,210,150,0.4))",
          }}
        />
        <Interactive.Div
          name="Gold light across the package"
          style={{
            position: "absolute",
            left: 580,
            top: 210,
            width: 761,
            height: 660,
            maskImage: `url(${staticFile(PACKAGE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 40%, rgba(255,236,190,0.3) 50%, rgba(255,255,255,0) 60%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [10, 60], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Droplet on stone — left"
          style={{ position: "absolute", left: 470, top: 900, width: 34, height: 26, opacity: 0.85 }}
        >
          <Droplet />
        </Interactive.Div>
        <Interactive.Div
          name="Droplet on stone — right"
          style={{ position: "absolute", left: 1420, top: 930, width: 26, height: 20, opacity: 0.8 }}
        >
          <Droplet />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Small — CACUMEN BIOTAE + ISATIS INDIGOTICA"
        style={{
          position: "absolute",
          left: 0,
          top: 975,
          width: 1920,
          textAlign: "center",
          fontFamily: "Josefin Sans",
          fontWeight: 400,
          fontSize: 30,
          lineHeight: 1,
          letterSpacing: 10,
          color: "#CDB772",
          opacity: interpolate(frame, [30, 46], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        CACUMEN BIOTAE + ISATIS INDIGOTICA
      </Interactive.Div>

      <Interactive.Div
        name="Foreground leaf — left (out of focus)"
        style={{
          position: "absolute",
          left: 20,
          top: 640,
          width: 340,
          height: 860,
          rotate: "56deg",
          filter: "blur(16px)",
          translate: interpolate(frame, [0, 88], ["-20px 0px", "20px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Leaf tone="deep" beads={false} />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground leaf — right (out of focus)"
        style={{
          position: "absolute",
          left: 1640,
          top: 600,
          width: 340,
          height: 860,
          rotate: "-48deg",
          filter: "blur(16px)",
          translate: interpolate(frame, [0, 88], ["20px 0px", "-20px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Leaf tone="deep" beads={false} />
      </Interactive.Div>

      <AbsoluteFill
        name="Dark leaf covering the lens (loop seam)"
        style={{
          clipPath: `ellipse(1400px 2200px at ${interpolate(frame, [63, 87], [-1700, 960], {
            easing: Easing.bezier(0.5, 0, 0.8, 0.6),
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
