import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BiotaSpray, Leaf, Mist, PACKAGE_SRC, WetStone } from "./materials";

// SHOT 05 — TRIANGLE LANGUAGE (0:11.1–0:12.8)
// In a dark forest, three thin beams of gold light glide in and meet to form
// a triangle behind the package, echoing its shape. Mist rolls over the floor.
// Beam corners: apex (1240, 69), bottom-left (799, 830), bottom-right (1681, 830).
export const G5TriangleLanguage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#040C08" }}>
      <AbsoluteFill
        name="Dark forest"
        style={{
          background:
            "radial-gradient(60% 80% at 65% 45%, #173A26 0%, #0C2216 45%, #050F09 80%, #030805 100%)",
        }}
      />
      <Interactive.Div
        name="Forest biota — far left"
        style={{
          position: "absolute",
          left: 560,
          top: -240,
          width: 520,
          height: 780,
          rotate: "172deg",
          filter: "blur(14px)",
          opacity: 0.7,
        }}
      >
        <BiotaSpray tone="deep" seed={31} />
      </Interactive.Div>
      <Interactive.Div
        name="Forest biota — far right"
        style={{
          position: "absolute",
          left: 1560,
          top: -200,
          width: 520,
          height: 780,
          rotate: "192deg",
          filter: "blur(14px)",
          opacity: 0.7,
        }}
      >
        <BiotaSpray tone="deep" seed={17} />
      </Interactive.Div>

      <Interactive.Div
        name="Triangle bloom"
        style={{
          position: "absolute",
          left: 840,
          top: 120,
          width: 800,
          height: 760,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(225,190,110,0.22), rgba(225,190,110,0))",
          opacity: interpolate(frame, [28, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Gold beam — left edge"
        style={{
          position: "absolute",
          left: 580,
          top: 447,
          width: 880,
          height: 4,
          borderRadius: 2,
          rotate: "-59.9deg",
          background:
            "linear-gradient(90deg, rgba(232,201,119,0.5) 0%, #F2D88E 50%, rgba(232,201,119,0.5) 100%)",
          boxShadow: "0 0 14px 3px rgba(232,201,119,0.55)",
          translate: interpolate(frame, [4, 32], ["-752px 1298px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [4, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Gold beam — right edge"
        style={{
          position: "absolute",
          left: 1021,
          top: 447,
          width: 880,
          height: 4,
          borderRadius: 2,
          rotate: "59.9deg",
          background:
            "linear-gradient(90deg, rgba(232,201,119,0.5) 0%, #F2D88E 50%, rgba(232,201,119,0.5) 100%)",
          boxShadow: "0 0 14px 3px rgba(232,201,119,0.55)",
          translate: interpolate(frame, [8, 36], ["752px 1298px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [8, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Gold beam — base"
        style={{
          position: "absolute",
          left: 799,
          top: 828,
          width: 882,
          height: 4,
          borderRadius: 2,
          background:
            "linear-gradient(90deg, rgba(232,201,119,0.5) 0%, #F2D88E 50%, rgba(232,201,119,0.5) 100%)",
          boxShadow: "0 0 14px 3px rgba(232,201,119,0.55)",
          translate: interpolate(frame, [12, 40], ["1500px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [12, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Apex flare"
        style={{
          position: "absolute",
          left: 1180,
          top: 9,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,240,200,0.9), rgba(240,205,120,0))",
          scale: interpolate(frame, [34, 40, 60], [0.2, 1.2, 0.7], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [34, 38, 82], [0, 1, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Title — SEVEN"
        style={{
          position: "absolute",
          left: 130,
          top: 330,
          fontFamily: "Josefin Sans",
          fontWeight: 300,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 24,
          color: "#E9D9A6",
          translate: interpolate(frame, [26, 56], ["0px 30px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [26, 42], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        SEVEN
      </Interactive.Div>
      <Interactive.Div
        name="Title — GREEN"
        style={{
          position: "absolute",
          left: 130,
          top: 490,
          fontFamily: "Josefin Sans",
          fontWeight: 600,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 24,
          color: "#E9D9A6",
          translate: interpolate(frame, [32, 62], ["0px 30px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [32, 48], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        GREEN
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle — HERBAL SHAMPOO BAR"
        style={{
          position: "absolute",
          left: 136,
          top: 680,
          fontFamily: "Josefin Sans",
          fontWeight: 400,
          fontSize: 46,
          lineHeight: 1,
          letterSpacing: 10,
          color: "#BFD3B8",
          clipPath: `inset(0 ${interpolate(frame, [46, 68], [100, 0], {
            easing: Easing.bezier(0.65, 0, 0.35, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}% 0 0)`,
        }}
      >
        HERBAL SHAMPOO BAR
      </Interactive.Div>

      <AbsoluteFill
        name="Product stage (slow drift)"
        style={{
          transformOrigin: "1240px 850px",
          scale: interpolate(frame, [0, 82], [1.04, 1], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Wet stone"
          style={{ position: "absolute", left: -200, top: 820, width: 2400, height: 400 }}
        >
          <WetStone />
        </Interactive.Div>
        <Interactive.Div
          name="Stone horizon fade"
          style={{
            position: "absolute",
            left: 0,
            top: 790,
            width: 1920,
            height: 90,
            background: "linear-gradient(180deg, rgba(10,30,19,1) 0%, rgba(10,30,19,0) 100%)",
          }}
        />
        <Interactive.Div
          name="Gold base reflected on stone"
          style={{
            position: "absolute",
            left: 800,
            top: 836,
            width: 880,
            height: 60,
            background: "radial-gradient(50% 50% at 50% 0%, rgba(232,201,119,0.3), rgba(232,201,119,0))",
            filter: "blur(6px)",
            opacity: interpolate(frame, [30, 44], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Floor mist"
          style={{
            position: "absolute",
            left: 300,
            top: 690,
            width: 1700,
            height: 340,
            opacity: 0.6,
            translate: interpolate(frame, [0, 82], ["60px 0px", "-60px 0px"], {
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
            left: 917,
            top: 857,
            width: 646,
            height: 140,
            overflow: "hidden",
            opacity: 0.28,
          }}
        >
          <Img
            src={staticFile(PACKAGE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -3,
              width: 646,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 22%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 890,
            top: 840,
            width: 700,
            height: 36,
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
            left: 917,
            top: 300,
            width: 646,
            filter: "drop-shadow(0 0 22px rgba(232,201,119,0.3))",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground leaf — left (out of focus)"
        style={{
          position: "absolute",
          left: 380,
          top: 700,
          width: 320,
          height: 800,
          rotate: "62deg",
          filter: "blur(16px)",
          translate: interpolate(frame, [0, 82], ["-30px 0px", "30px 0px"], {
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
          left: 1720,
          top: 560,
          width: 300,
          height: 760,
          rotate: "-28deg",
          filter: "blur(16px)",
          translate: interpolate(frame, [0, 82], ["30px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Leaf tone="deep" beads={false} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
