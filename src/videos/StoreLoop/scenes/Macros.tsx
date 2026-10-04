import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bokeh, Droplet } from "../fx/Atmosphere";
import { ModelPlate } from "../fx/Layers";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Short macro inserts (0.5–2 s). They are bridges between the big scenes: every one moves
// from frame 1 and hands off through the transition element placed across its cuts.

/** C · serum dropper macro (0:10.0–0:11.5, 45 f): tilt down with the falling drop. */
export const C03Dropper: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#f2b6c2", overflow: "hidden" }}>
      <ModelPlate
        name="Macro · dropper"
        id="macroDropper"
        x={960}
        y={interpolate(frame, [0, 45], [580, 500], { easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        height={2320}
        zoom={interpolate(frame, [0, 45], [1.0, 1.04], { output: "perceptual-scale" })}
        originY="45%"
      />
      <Droplet
        x={960}
        y={interpolate(frame, [8, 34], [300, 980], { ...c, easing: Easing.bezier(0.5, 0, 1, 1) })}
        size={70}
        stretch={interpolate(frame, [8, 34], [1, 1.3], c)}
        opacity={interpolate(frame, [6, 9, 32, 35], [0, 1, 1, 0], c)}
      />
    </AbsoluteFill>
  );
};

/** G · cream swirl macro (0:25.0–0:26.0, 30 f): fast rotating push, whites out into scene H. */
export const G07Cream: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#fbf6f4", overflow: "hidden" }}>
      <AbsoluteFill style={{ rotate: `${interpolate(frame, [0, 30], [0, 8])}deg` }}>
        <ModelPlate
          name="Macro · cream swirl"
          id="macroCream"
          x={960}
          y={540}
          height={2100}
          zoom={interpolate(frame, [0, 30], [1.0, 1.25], { output: "perceptual-scale" })}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** I · skin + texture macro (0:31.0–0:32.0, 30 f): slow push, glint across the gel. */
export const I09EyeTexture: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#e8c9bd", overflow: "hidden" }}>
      <ModelPlate
        name="Macro · skin texture"
        id="macroEyeTexture"
        x={interpolate(frame, [0, 30], [980, 920])}
        y={560}
        height={1160}
        zoom={interpolate(frame, [0, 30], [1.02, 1.1], { output: "perceptual-scale" })}
        originX="40%"
        originY="62%"
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,235,240,0.55) 50%, rgba(255,255,255,0) 60%)",
          backgroundSize: "300% 100%",
          backgroundPosition: `${interpolate(frame, [0, 30], [100, 0])}% 0%`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

/** M · Manee brand lifestyle photo (0:46.0–0:47.5, 45 f) — the uploaded reference, unedited. */
export const M13BrandPhoto: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #fde8ea 0%, #f6c6cf 60%, #e8a4b3 100%)", overflow: "hidden" }}>
      <Bokeh seed="m13" count={10} colors={["rgba(255,255,255,0.9)", "rgba(248,170,190,0.9)"]} minSize={120} maxSize={320} driftX={-2} opacity={0.55} blur={16} />
      <div
        style={{
          position: "absolute",
          left: 960 - 395,
          top: -10,
          width: 790,
          height: 1100,
          overflow: "hidden",
          boxShadow: "0 30px 90px rgba(120,30,60,0.35)",
          rotate: `${interpolate(frame, [0, 45], [-2, 0])}deg`,
          translate: interpolate(frame, [0, 45], ["40px 0px", "-20px 0px"]),
        }}
      >
        <Img
          src={staticFile("store-loop/products/PM-03_manee_lifestyle_photo.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transformOrigin: "62% 66%",
            scale: interpolate(frame, [0, 45], [1.0, 1.12], { output: "perceptual-scale" }),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/** O · flower + drop macro (0:53.0–0:55.0, 60 f): drop swells and falls; DropletWipe follows. */
export const O15FlowerDrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#e9a6b4", overflow: "hidden" }}>
      <ModelPlate
        name="Macro · flower drop"
        id="macroFlowerDrop"
        x={960}
        y={interpolate(frame, [0, 60], [700, 520], { easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        height={2200}
        zoom={interpolate(frame, [0, 60], [1.0, 1.1], { output: "perceptual-scale" })}
        originY="70%"
      />
      <Droplet
        x={960}
        y={interpolate(frame, [30, 56], [760, 1250], { ...c, easing: Easing.bezier(0.5, 0, 1, 1) })}
        size={110}
        tint="255,190,205"
        stretch={1.15}
        opacity={interpolate(frame, [28, 31], [0, 1], c)}
      />
    </AbsoluteFill>
  );
};
