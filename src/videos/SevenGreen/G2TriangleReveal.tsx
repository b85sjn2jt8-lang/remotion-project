import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BiotaSpray, Mist, PACKAGE_SRC, WetStone } from "./materials";

// SHOT 02 — TRIANGLE REVEAL (0:02.3–0:05.3)
// A leaf passes the lens onto the real package, grounded on dark wet stone.
// Three backlit biota sprays stand behind it in a triangle; a thread of gold
// light travels along the package edges. The botanicals are named on the left.
export const G2TriangleReveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#06120B" }}>
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
          name="Deep forest studio"
          style={{
            background:
              "radial-gradient(70% 85% at 70% 42%, #1F4A31 0%, #12301F 40%, #081A10 75%, #040C08 100%)",
          }}
        />
        <Interactive.Div
          name="Biota spray — left (triangle)"
          style={{
            position: "absolute",
            left: 930,
            top: 300,
            width: 360,
            height: 540,
            rotate: "-24deg",
            filter: "blur(7px)",
            opacity: 0.5,
          }}
        >
          <BiotaSpray tone="glow" seed={11} />
        </Interactive.Div>
        <Interactive.Div
          name="Biota spray — right (triangle)"
          style={{
            position: "absolute",
            left: 1480,
            top: 300,
            width: 360,
            height: 540,
            rotate: "24deg",
            filter: "blur(7px)",
            opacity: 0.5,
          }}
        >
          <BiotaSpray tone="glow" seed={5} />
        </Interactive.Div>
        <Interactive.Div
          name="Biota spray — top (triangle)"
          style={{
            position: "absolute",
            left: 1180,
            top: -120,
            width: 400,
            height: 600,
            filter: "blur(9px)",
            opacity: 0.55,
          }}
        >
          <BiotaSpray tone="glow" seed={7} />
        </Interactive.Div>
        <Interactive.Div
          name="Backlight halo"
          style={{
            position: "absolute",
            left: 920,
            top: 40,
            width: 920,
            height: 880,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(150,200,140,0.32), rgba(150,200,140,0))",
          }}
        />

        <Interactive.Div
          name="Name — CACUMEN BIOTAE"
          style={{
            position: "absolute",
            left: 130,
            top: 360,
            fontFamily: "Josefin Sans",
            fontWeight: 300,
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#E3EBDD",
            clipPath: `inset(0 ${interpolate(frame, [16, 40], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          CACUMEN BIOTAE
        </Interactive.Div>
        <Interactive.Div
          name="Name — plus (gold)"
          style={{
            position: "absolute",
            left: 128,
            top: 452,
            fontFamily: "Josefin Sans",
            fontWeight: 300,
            fontSize: 64,
            lineHeight: 1,
            color: "#D9B862",
            opacity: interpolate(frame, [32, 44], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          +
        </Interactive.Div>
        <Interactive.Div
          name="Name — ISATIS INDIGOTICA"
          style={{
            position: "absolute",
            left: 130,
            top: 540,
            fontFamily: "Josefin Sans",
            fontWeight: 300,
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: 10,
            color: "#E3EBDD",
            clipPath: `inset(0 ${interpolate(frame, [30, 54], [100, 0], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0 0)`,
          }}
        >
          ISATIS INDIGOTICA
        </Interactive.Div>
        <Interactive.Div
          name="Gold rule"
          style={{
            position: "absolute",
            left: 132,
            top: 650,
            width: 240,
            height: 2,
            background: "linear-gradient(90deg, #E8C977, rgba(232,201,119,0))",
            scale: interpolate(frame, [44, 70], ["0 1", "1 1"], {
              easing: Easing.bezier(0.65, 0, 0.35, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transformOrigin: "0% 50%",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Product stage (camera push)"
        style={{
          transformOrigin: "1377px 850px",
          scale: interpolate(frame, [0, 90], [1, 1.05], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Wet stone"
          style={{ position: "absolute", left: -200, top: 800, width: 2400, height: 420 }}
        >
          <WetStone />
        </Interactive.Div>
        <Interactive.Div
          name="Stone horizon fade"
          style={{
            position: "absolute",
            left: 0,
            top: 760,
            width: 1920,
            height: 120,
            background: "linear-gradient(180deg, rgba(8,26,16,1) 0%, rgba(8,26,16,0) 100%)",
          }}
        />
        <Interactive.Div
          name="Floor mist"
          style={{
            position: "absolute",
            left: 600,
            top: 700,
            width: 1500,
            height: 320,
            opacity: 0.55,
            translate: interpolate(frame, [0, 90], ["-40px 0px", "60px 0px"], {
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
            left: 1020,
            top: 856,
            width: 715,
            height: 150,
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
              width: 715,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 22%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 990,
            top: 838,
            width: 775,
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
            left: 1020,
            top: 240,
            width: 715,
            filter: "drop-shadow(0 0 18px rgba(150,205,150,0.35))",
          }}
        />
        <Interactive.Div
          name="Soft light across the package"
          style={{
            position: "absolute",
            left: 1020,
            top: 240,
            width: 715,
            height: 620,
            maskImage: `url(${staticFile(PACKAGE_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(115deg, rgba(255,255,255,0) 38%, rgba(240,250,235,0.32) 50%, rgba(255,255,255,0) 62%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [20, 80], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Gold light travelling the edges"
          style={{
            position: "absolute",
            left: 1020,
            top: 240,
            width: 715,
            height: 620,
            mixBlendMode: "screen",
            opacity: interpolate(frame, [8, 18, 78, 88], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <svg viewBox="0 0 709 615" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <filter id="g2-edge-glow" filterUnits="userSpaceOnUse" x="-200" y="-200" width="1109" height="1015">
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            <path
              d="M 350 3 L 705 609 L 4 609 Z"
              pathLength={1}
              fill="none"
              stroke="#F0CF7A"
              strokeOpacity="0.8"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray="0.16 0.84"
              strokeDashoffset={interpolate(frame, [10, 86], [0.08, -1.08], {
                easing: Easing.bezier(0.45, 0, 0.55, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              filter="url(#g2-edge-glow)"
            />
            <path
              d="M 350 3 L 705 609 L 4 609 Z"
              pathLength={1}
              fill="none"
              stroke="#FFF1C8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.1 0.9"
              strokeDashoffset={interpolate(frame, [10, 86], [0.05, -1.05], {
                easing: Easing.bezier(0.45, 0, 0.55, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
          </svg>
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground leaf (out of focus)"
        style={{
          position: "absolute",
          left: 1700,
          top: 560,
          width: 300,
          height: 760,
          rotate: "-32deg",
          filter: "blur(14px)",
          opacity: 0.95,
          translate: interpolate(frame, [0, 90], ["30px 0px", "-20px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <BiotaSpray tone="shadow" seed={3} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
