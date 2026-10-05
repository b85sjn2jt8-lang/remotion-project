import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, BOX_SRC, CentellaLeaf, EarthTexture, WarmDrop } from "./materials";

// SHOT 05 — SOOTHE + HYDRATE (0:11.1–0:12.8)
// The calmest moment. Bottle in the middle, box behind, warm ivory light over
// a faint earth texture, a soft Centella leaf in front. A thin layer of
// moisture glides very slowly across a pane of glass near the lens.
export const K5SootheHydrate: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3E7D2" }}>
      <AbsoluteFill
        name="Warm ivory light"
        style={{
          background:
            "radial-gradient(75% 85% at 62% 38%, #FCF5E8 0%, #F2E3C8 50%, #E1C59A 100%)",
        }}
      />
      <Interactive.Div
        name="Subtle earth texture"
        style={{
          position: "absolute",
          left: -200,
          top: 520,
          width: 2320,
          height: 700,
          opacity: 0.22,
          filter: "blur(5px)",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 60%)",
        }}
      >
        <EarthTexture />
      </Interactive.Div>

      <AbsoluteFill
        name="Product stage (very slow push)"
        style={{
          transformOrigin: "1220px 900px",
          scale: interpolate(frame, [0, 82], [1, 1.02], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Ivory surface"
          style={{
            position: "absolute",
            left: -200,
            top: 840,
            width: 2320,
            height: 400,
            background:
              "linear-gradient(180deg, rgba(255,248,234,0.95) 0%, rgba(238,220,190,0.95) 12%, rgba(214,186,146,0.95) 100%)",
            boxShadow: "inset 0 2px 0 rgba(255,250,240,1)",
          }}
        />
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 1265,
            top: 860,
            width: 240,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(90,55,25,0.45), rgba(90,55,25,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="SKIN1004 box"
          src={staticFile(BOX_SRC)}
          style={{
            position: "absolute",
            left: 1280,
            top: 290,
            width: 208,
            filter: "blur(0.6px) drop-shadow(-6px 8px 16px rgba(90,50,15,0.18))",
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 1100,
            top: 908,
            width: 229,
            height: 90,
            overflow: "hidden",
            opacity: 0.22,
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 229,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 14%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Bottle contact shadow"
          style={{
            position: "absolute",
            left: 1085,
            top: 896,
            width: 260,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(90,55,25,0.5), rgba(90,55,25,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="SKIN1004 bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1100,
            top: 270,
            width: 229,
            filter: "drop-shadow(0 0 22px rgba(255,200,120,0.3))",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Title — SOOTHE"
        style={{
          position: "absolute",
          left: 130,
          top: 340,
          fontFamily: "Albert Sans",
          fontWeight: 200,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 30,
          color: "#4A2F1C",
          opacity: interpolate(frame, [8, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        SOOTHE
      </Interactive.Div>
      <Interactive.Div
        name="Title — HYDRATE"
        style={{
          position: "absolute",
          left: 130,
          top: 520,
          fontFamily: "Albert Sans",
          fontWeight: 200,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: 30,
          color: "#8A5A26",
          opacity: interpolate(frame, [26, 46], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        HYDRATE
      </Interactive.Div>

      <AbsoluteFill name="Moisture layer on the foreground glass">
        <Interactive.Div
          name="Moisture sheen"
          style={{
            position: "absolute",
            left: -1000,
            top: -300,
            width: 1000,
            height: 1700,
            rotate: "22deg",
            background:
              "linear-gradient(90deg, rgba(255,250,238,0) 0%, rgba(255,250,238,0.22) 40%, rgba(255,255,255,0.32) 50%, rgba(255,250,238,0.22) 60%, rgba(255,250,238,0) 100%)",
            translate: interpolate(frame, [0, 82], ["400px 0px", "1500px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Bead on the glass — upper"
          style={{
            position: "absolute",
            left: 760,
            top: 160,
            width: 26,
            height: 30,
            opacity: 0.75,
            translate: interpolate(frame, [0, 82], ["0px 0px", "0px 14px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <WarmDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Bead on the glass — right"
          style={{
            position: "absolute",
            left: 1520,
            top: 240,
            width: 18,
            height: 21,
            opacity: 0.7,
          }}
        >
          <WarmDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Foreground Centella leaf (soft focus)"
        style={{
          position: "absolute",
          left: 1580,
          top: 640,
          width: 520,
          height: 598,
          rotate: "-36deg",
          filter: "blur(18px)",
          opacity: 0.95,
          translate: interpolate(frame, [0, 82], ["10px 0px", "-10px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CentellaLeaf tone="fresh" seed={7} beads={false} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
