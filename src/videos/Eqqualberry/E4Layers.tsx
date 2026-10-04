import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BOTTLE_SRC, Droplet } from "./materials";

// SCENE 04 — MULTI-LAYER HYDRATION (0:07.3–0:10.2)
// The camera travels through successive panes of blue water-glass, each
// refracting the world a little differently. The type hangs in the
// midground; the bottle waits behind the last pane and focus racks to it.
export const E4Layers: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0E5F9E" }}>
      <AbsoluteFill
        name="Deep blue space"
        style={{
          background:
            "radial-gradient(80% 90% at 66% 48%, #69C6EE 0%, #2A97D2 40%, #0E5F9E 80%, #08427A 100%)",
        }}
      />
      <Interactive.Div
        name="Backlight behind bottle"
        style={{
          position: "absolute",
          left: 980,
          top: 120,
          width: 600,
          height: 840,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(225,250,255,0.8), rgba(225,250,255,0))",
        }}
      />
      <Img
        name="EQQUALBERRY bottle (background)"
        src={staticFile(BOTTLE_SRC)}
        style={{
          position: "absolute",
          left: 1130,
          top: 260,
          width: 300,
          filter: `blur(${interpolate(frame, [0, 52, 78], [10, 9, 0], {
            easing: Easing.bezier(0.4, 0, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          scale: interpolate(frame, [0, 88], [0.94, 1.02], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Floor reflection glow"
        style={{
          position: "absolute",
          left: 1060,
          top: 800,
          width: 440,
          height: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(5,40,80,0.45), rgba(5,40,80,0))",
          filter: "blur(6px)",
        }}
      />

      <Interactive.Div
        name="Title — MULTI-LAYER"
        style={{
          position: "absolute",
          left: 120,
          top: 340,
          fontFamily: "Sora",
          fontWeight: 700,
          fontSize: 132,
          lineHeight: 1,
          letterSpacing: -2,
          color: "#FFFFFF",
          textShadow: "0 10px 40px rgba(5,40,90,0.4)",
          opacity: interpolate(frame, [14, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [14, 30, 56, 80], [10, 0, 0, 5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        MULTI-LAYER
      </Interactive.Div>
      <Interactive.Div
        name="Title — HYDRATION"
        style={{
          position: "absolute",
          left: 124,
          top: 490,
          fontFamily: "Sora",
          fontWeight: 200,
          fontSize: 132,
          lineHeight: 1,
          letterSpacing: 6,
          color: "#DFF6FF",
          opacity: interpolate(frame, [22, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(frame, [22, 38, 56, 80], [10, 0, 0, 5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        HYDRATION
      </Interactive.Div>

      <Interactive.Div
        name="Water-glass layer 4 (last)"
        style={{
          position: "absolute",
          left: 210,
          top: 110,
          width: 1500,
          height: 860,
          borderRadius: 60,
          background:
            "linear-gradient(135deg, rgba(200,240,255,0.18) 0%, rgba(120,205,240,0.08) 50%, rgba(80,170,225,0.16) 100%)",
          border: "2px solid rgba(235,250,255,0.75)",
          boxShadow: "inset 0 0 60px rgba(220,248,255,0.25)",
          backdropFilter: "blur(2px) saturate(130%)",
          scale: interpolate(frame, [30, 88], [0.5, 1.45], {
            easing: Easing.bezier(0.4, 0, 0.7, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [30, 40, 70, 86], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Water-glass layer 3"
        style={{
          position: "absolute",
          left: 210,
          top: 110,
          width: 1500,
          height: 860,
          borderRadius: 60,
          background:
            "linear-gradient(135deg, rgba(200,240,255,0.2) 0%, rgba(120,205,240,0.08) 50%, rgba(80,170,225,0.18) 100%)",
          border: "2px solid rgba(235,250,255,0.75)",
          boxShadow: "inset 0 0 60px rgba(220,248,255,0.25)",
          backdropFilter: "blur(3px) saturate(130%)",
          scale: interpolate(frame, [16, 70], [0.55, 2.6], {
            easing: Easing.bezier(0.5, 0, 0.8, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [16, 26, 60, 70], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Water-glass layer 2"
        style={{
          position: "absolute",
          left: 210,
          top: 110,
          width: 1500,
          height: 860,
          borderRadius: 60,
          background:
            "linear-gradient(135deg, rgba(200,240,255,0.22) 0%, rgba(120,205,240,0.1) 50%, rgba(80,170,225,0.2) 100%)",
          border: "2px solid rgba(235,250,255,0.8)",
          boxShadow: "inset 0 0 60px rgba(220,248,255,0.3)",
          backdropFilter: "blur(4px) saturate(130%)",
          scale: interpolate(frame, [4, 54], [0.6, 2.8], {
            easing: Easing.bezier(0.5, 0, 0.8, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [4, 12, 44, 54], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Water-glass layer 1 (passing the lens)"
        style={{
          position: "absolute",
          left: 210,
          top: 110,
          width: 1500,
          height: 860,
          borderRadius: 60,
          background:
            "linear-gradient(135deg, rgba(200,240,255,0.25) 0%, rgba(120,205,240,0.1) 50%, rgba(80,170,225,0.22) 100%)",
          border: "3px solid rgba(235,250,255,0.85)",
          boxShadow: "inset 0 0 60px rgba(220,248,255,0.3)",
          backdropFilter: "blur(6px) saturate(130%)",
          scale: interpolate(frame, [0, 36], [1.2, 3], {
            easing: Easing.bezier(0.5, 0, 0.8, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [0, 28, 36], [1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Moisture droplet between layers 1"
        style={{
          position: "absolute",
          left: 880,
          top: 300,
          width: 40,
          height: 46,
          translate: interpolate(frame, [0, 88], ["0px 0px", "-260px -120px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 88], [0.8, 2.4], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Moisture droplet between layers 2"
        style={{
          position: "absolute",
          left: 1020,
          top: 700,
          width: 30,
          height: 34,
          translate: interpolate(frame, [10, 88], ["0px 0px", "220px 200px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [10, 88], [0.7, 2.6], {
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
      <Interactive.Div
        name="Foreground water blur"
        style={{
          position: "absolute",
          left: 1640,
          top: 760,
          width: 320,
          height: 300,
          filter: "blur(14px)",
          translate: interpolate(frame, [0, 88], ["0px 0px", "60px 40px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Droplet />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
