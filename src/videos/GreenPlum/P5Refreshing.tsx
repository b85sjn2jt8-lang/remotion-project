import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, BOX_SRC, ClearDrop, LiquidLayer, MintPane, MintPlatform } from "./materials";

// SHOT 05 — REFRESHING TONER (0:11.1–0:12.8)
// Back to the products, seen between clear mint glass panes. The camera
// slides slightly sideways for parallax; a thin layer of toner glides over
// the foreground glass; a large soft clear drop sits close to the lens.
export const P5Refreshing: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F4F1E9" }}>
      <AbsoluteFill
        name="Soft ivory"
        style={{
          background:
            "radial-gradient(75% 85% at 62% 40%, #FCFBF6 0%, #F2EFE6 55%, #E2E9DF 100%)",
        }}
      />
      <Interactive.Div
        name="Mint pane — far"
        style={{
          position: "absolute",
          left: 1480,
          top: -40,
          width: 300,
          height: 1160,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-20px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MintPane />
      </Interactive.Div>
      <Interactive.Div
        name="Mint pane — behind the products"
        style={{
          position: "absolute",
          left: 1000,
          top: -40,
          width: 560,
          height: 1160,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-36px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MintPane />
      </Interactive.Div>

      <AbsoluteFill
        name="Product stage (camera slide)"
        style={{
          translate: interpolate(frame, [0, 82], ["0px 0px", "-56px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Mint glass platform"
          style={{ position: "absolute", left: -200, top: 830, width: 2400, height: 400 }}
        >
          <MintPlatform top={90} />
        </Interactive.Div>
        <Interactive.Div
          name="Box contact shadow"
          style={{
            position: "absolute",
            left: 1236,
            top: 850,
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
            left: 1250,
            top: 371,
            width: 172,
            filter: "drop-shadow(-4px 8px 14px rgba(60,90,75,0.16))",
          }}
        />
        <Interactive.Div
          name="Bottle contact shadow"
          style={{
            position: "absolute",
            left: 1106,
            top: 888,
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
            left: 1120,
            top: 395,
            width: 160,
            filter: "drop-shadow(0 8px 16px rgba(60,100,85,0.18))",
          }}
        />
      </AbsoluteFill>

      <Interactive.Div
        name="Mint pane — in front"
        style={{
          position: "absolute",
          left: 820,
          top: -40,
          width: 230,
          height: 1160,
          translate: interpolate(frame, [0, 82], ["0px 0px", "-90px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <MintPane />
      </Interactive.Div>

      <Interactive.Div
        name="Title — REFRESH"
        style={{
          position: "absolute",
          left: 130,
          top: 320,
          fontFamily: "Hanken Grotesk",
          fontWeight: 200,
          fontSize: 140,
          lineHeight: 1,
          letterSpacing: 24,
          color: "#2F5547",
          opacity: interpolate(frame, [6, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        REFRESH
      </Interactive.Div>
      <Interactive.Div
        name="Title — SMOOTH"
        style={{
          position: "absolute",
          left: 130,
          top: 480,
          fontFamily: "Hanken Grotesk",
          fontWeight: 200,
          fontSize: 140,
          lineHeight: 1,
          letterSpacing: 24,
          color: "#5D8676",
          opacity: interpolate(frame, [22, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        SMOOTH
      </Interactive.Div>
      <Interactive.Div
        name="Small — DAILY TONER"
        style={{
          position: "absolute",
          left: 136,
          top: 660,
          fontFamily: "Hanken Grotesk",
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1,
          letterSpacing: 18,
          color: "#8C7398",
          opacity: interpolate(frame, [38, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DAILY TONER
      </Interactive.Div>

      <AbsoluteFill name="Thin toner layer on the foreground glass">
        <LiquidLayer
          front={interpolate(frame, [0, 82], [-200, 2300], {
            easing: Easing.bezier(0.4, 0, 0.6, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          t={interpolate(frame, [0, 82], [0, 82], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          tint="rgba(214,238,228,0.05)"
        />
      </AbsoluteFill>
      <Interactive.Div
        name="Large clear drop near the lens (soft focus)"
        style={{
          position: "absolute",
          left: 1620,
          top: 560,
          width: 260,
          height: 310,
          filter: "blur(9px)",
          opacity: 0.85,
          translate: interpolate(frame, [0, 82], ["40px 0px", "-120px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ClearDrop />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
