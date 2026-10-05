import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, DewDrop } from "./materials";

// SHOT 05 — DEW ATMOSPHERE (0:11.1–0:12.8)
// Back to the bottle, layered between panes of frosted glass. The camera
// slides sideways very slightly: dew, glass, bottle and the huge 70 move at
// different speeds. Soft mist passes behind; the light slowly brightens.
export const B5DewAtmosphere: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#ECF2F8" }}>
      <AbsoluteFill
        name="Mist-blue air"
        style={{
          background:
            "linear-gradient(180deg, #F6F9FC 0%, #E7EFF6 60%, #D7E4EF 100%)",
        }}
      />
      <Interactive.Div
        name="Huge 70 (far layer)"
        style={{
          position: "absolute",
          left: 700,
          top: -60,
          fontFamily: "Urbanist",
          fontWeight: 200,
          fontSize: 1000,
          lineHeight: 1,
          letterSpacing: -24,
          color: "rgba(140,172,200,0.5)",
          translate: interpolate(frame, [0, 82], ["0px 0px", "-20px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        70
      </Interactive.Div>
      <Interactive.Div
        name="Soft mist passing"
        style={{
          position: "absolute",
          left: -200,
          top: 300,
          width: 2400,
          height: 600,
          background:
            "radial-gradient(30% 45% at 30% 50%, rgba(255,255,255,0.7), rgba(255,255,255,0)), radial-gradient(25% 40% at 70% 55%, rgba(255,255,255,0.6), rgba(255,255,255,0))",
          filter: "blur(30px)",
          translate: interpolate(frame, [0, 82], ["-260px 0px", "220px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill
        name="Light brightening"
        style={{
          background: "radial-gradient(70% 80% at 60% 30%, rgba(255,255,255,0.7), rgba(255,255,255,0))",
          opacity: interpolate(frame, [0, 82], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Frosted pane — behind the bottle"
        style={{
          position: "absolute",
          left: 1380,
          top: -40,
          width: 420,
          height: 1160,
          backdropFilter: "blur(14px)",
          background: "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(240,246,251,0.22))",
          boxShadow: "inset 2px 0 0 rgba(255,255,255,0.9), inset -1px 0 0 rgba(180,200,220,0.5)",
          translate: interpolate(frame, [0, 82], ["0px 0px", "-40px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        name="Product stage (camera slide)"
        style={{
          translate: interpolate(frame, [0, 82], ["0px 0px", "-60px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Frosted glass platform"
          style={{
            position: "absolute",
            left: -200,
            top: 888,
            width: 2400,
            height: 340,
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(236,243,249,0.75) 20%, rgba(214,228,240,0.7) 100%)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,1), 0 -1px 0 rgba(170,195,215,0.5)",
          }}
        />
        <Interactive.Div
          name="Bottle reflection"
          style={{
            position: "absolute",
            left: 1120,
            top: 900,
            width: 240,
            height: 120,
            overflow: "hidden",
            opacity: 0.28,
            filter: "blur(1.5px)",
          }}
        >
          <Img
            src={staticFile(BOTTLE_SRC)}
            style={{
              position: "absolute",
              left: 0,
              top: -2,
              width: 240,
              scale: "1 -1",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 16%)",
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 1100,
            top: 886,
            width: 280,
            height: 26,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(70,95,120,0.45), rgba(70,95,120,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ANUA Birch 70 bottle"
          src={staticFile(BOTTLE_SRC)}
          style={{
            position: "absolute",
            left: 1120,
            top: 300,
            width: 240,
            filter: "drop-shadow(0 10px 22px rgba(90,120,150,0.18))",
          }}
        />
        <Interactive.Div
          name="Dew on the platform"
          style={{ position: "absolute", left: 1420, top: 960, width: 34, height: 26 }}
        >
          <DewDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Frosted pane — in front, left"
        style={{
          position: "absolute",
          left: -80,
          top: -40,
          width: 700,
          height: 1160,
          backdropFilter: "blur(10px)",
          background: "linear-gradient(90deg, rgba(240,246,251,0.2), rgba(255,255,255,0.42))",
          boxShadow: "inset -2px 0 0 rgba(255,255,255,0.95), inset -6px 0 12px rgba(190,210,228,0.35)",
          translate: interpolate(frame, [0, 82], ["0px 0px", "-100px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Title — FRESH"
        style={{
          position: "absolute",
          left: 130,
          top: 330,
          fontFamily: "Urbanist",
          fontWeight: 200,
          fontSize: 170,
          lineHeight: 1,
          letterSpacing: 30,
          color: "#465D74",
          opacity: interpolate(frame, [14, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [14, 36], [10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        FRESH
      </Interactive.Div>
      <Interactive.Div
        name="Title — HYDRATION"
        style={{
          position: "absolute",
          left: 136,
          top: 530,
          fontFamily: "Urbanist",
          fontWeight: 500,
          fontSize: 64,
          lineHeight: 1,
          letterSpacing: 24,
          color: "#5A7189",
          opacity: interpolate(frame, [24, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [24, 46], [10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        HYDRATION
      </Interactive.Div>

      <Interactive.Div
        name="Foreground dew drop (soft focus)"
        style={{
          position: "absolute",
          left: 1580,
          top: 560,
          width: 300,
          height: 350,
          filter: "blur(12px)",
          opacity: 0.85,
          translate: interpolate(frame, [0, 82], ["40px 0px", "-120px 0px"], {
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <DewDrop />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
