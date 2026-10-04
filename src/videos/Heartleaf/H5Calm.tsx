import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Droplet, HeartLeaf, TUBE_SRC } from "./materials";

// SHOT 05 — CALM + HYDRATING FINISH (0:09.9–0:12.5)
// The mood settles: a translucent sage-water world, heartleaf shadows
// drifting across it, the tube seen through layers of water-glass. A large
// clear droplet falls slowly, then focus moves from the droplet to the tube.
export const H5Calm: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#B9CEB0" }}>
      <AbsoluteFill
        name="Sage water light"
        style={{
          background:
            "radial-gradient(90% 100% at 64% 40%, #EEF4E8 0%, #D2E0C8 40%, #A9C3A0 75%, #84A47F 100%)",
        }}
      />
      <Interactive.Div
        name="Heartleaf shadow 1"
        style={{
          position: "absolute",
          left: 1200,
          top: -200,
          width: 900,
          height: 900,
          filter: "blur(26px)",
          opacity: 0.55,
          rotate: interpolate(frame, [0, 78], ["24deg", "30deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0, 78], ["0px 0px", "-60px 20px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <HeartLeaf tone="shadow" />
      </Interactive.Div>
      <Interactive.Div
        name="Heartleaf shadow 2"
        style={{
          position: "absolute",
          left: 560,
          top: 420,
          width: 700,
          height: 700,
          filter: "blur(30px)",
          opacity: 0.4,
          rotate: interpolate(frame, [0, 78], ["-150deg", "-144deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <HeartLeaf tone="shadow" />
      </Interactive.Div>
      <Img
        name="Tube (seen through the layers)"
        src={staticFile(TUBE_SRC)}
        style={{
          position: "absolute",
          left: 1190,
          top: 250,
          width: 224,
          filter: `blur(${interpolate(frame, [0, 40, 70], [9, 8, 0], {
            easing: Easing.bezier(0.4, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      />
      <Interactive.Div
        name="Soft shadow under tube"
        style={{
          position: "absolute",
          left: 1170,
          top: 800,
          width: 270,
          height: 30,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(30,55,35,0.45), rgba(30,55,35,0))",
          filter: "blur(6px)",
        }}
      />
      <Interactive.Div
        name="Water-glass layer far"
        style={{
          position: "absolute",
          left: 1000,
          top: -100,
          width: 620,
          height: 1300,
          borderRadius: 0,
          background:
            "linear-gradient(120deg, rgba(240,248,236,0.35) 0%, rgba(190,215,182,0.12) 50%, rgba(150,185,145,0.22) 100%)",
          borderLeft: "2px solid rgba(255,255,255,0.55)",
          borderRight: "2px solid rgba(255,255,255,0.35)",
          backdropFilter: "blur(2px)",
          translate: interpolate(frame, [0, 78], ["30px 0px", "-30px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Water-glass layer near"
        style={{
          position: "absolute",
          left: 860,
          top: -100,
          width: 900,
          height: 1300,
          borderRadius: 0,
          background:
            "linear-gradient(120deg, rgba(240,248,236,0.28) 0%, rgba(190,215,182,0.08) 50%, rgba(150,185,145,0.18) 100%)",
          borderLeft: "2px solid rgba(255,255,255,0.45)",
          borderRight: "2px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(1.5px)",
          translate: interpolate(frame, [0, 78], ["-50px 0px", "50px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Title — CALM."
        style={{
          position: "absolute",
          left: 124,
          top: 300,
          fontFamily: "Figtree",
          fontWeight: 300,
          fontSize: 200,
          lineHeight: 1,
          letterSpacing: 8,
          color: "#2E4A35",
          opacity: interpolate(frame, [16, 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [16, 34], [12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        CALM.
      </Interactive.Div>
      <Interactive.Div
        name="Title — HYDRATING FINISH"
        style={{
          position: "absolute",
          left: 132,
          top: 540,
          fontFamily: "Figtree",
          fontWeight: 600,
          fontSize: 56,
          letterSpacing: 14,
          color: "#3F6248",
          opacity: interpolate(frame, [34, 48], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [34, 56], ["0px 16px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        HYDRATING FINISH
      </Interactive.Div>

      <Interactive.Div
        name="Large droplet falling (focus pull)"
        style={{
          position: "absolute",
          left: 800,
          top: -260,
          width: 150,
          height: 180,
          translate: interpolate(frame, [4, 78], ["0px 0px", "0px 1300px"], {
            easing: Easing.bezier(0.3, 0, 0.7, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [0, 36, 64], [0, 0, 12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <Droplet />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
