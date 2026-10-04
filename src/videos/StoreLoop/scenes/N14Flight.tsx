import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Bokeh } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import type { ModelId } from "../models";
import type { ProductId } from "../products";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// N · CINEMATIC BEAUTY MONTAGE (0:47.5–0:53, 165 f) — replaces the product flight.
// model close-up → macro skin → pink liquid → product hero → hair → water → product hero →
// eye macro → serum glass → model. Every shot is a photograph with ONE slow camera move (push or
// drift); products are still; a translucent pink-glass bar crosses each cut (foreground wipe).

const Shot: React.FC<{ id: ModelId; height: number; originX?: string; originY?: string; driftX?: number; dur: number; filter?: string }> = ({
  id,
  height,
  originX = "50%",
  originY = "45%",
  driftX = -12,
  dur,
  filter,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#f3d3da", overflow: "hidden" }}>
      <ModelPlate
        name={`Montage · ${id}`}
        id={id}
        x={960 + interpolate(frame, [0, dur], [0, driftX])}
        y={540}
        height={height}
        zoom={interpolate(frame, [0, dur], [1.0, 1.04], { output: "perceptual-scale" })}
        originX={originX}
        originY={originY}
        filter={filter}
      />
    </AbsoluteFill>
  );
};

const ProductShot: React.FC<{ id: ProductId; width: number; dur: number }> = ({ id, width, dur }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #fdeef1 0%, #f5cfd8 45%, #e5a5b6 100%)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 160, top: -200, width: 560, height: 1500, borderRadius: 90, rotate: "14deg", background: "linear-gradient(170deg, rgba(255,255,255,0.5), rgba(255,200,212,0.1))" }} />
      <div style={{ position: "absolute", left: 1240, top: -260, width: 480, height: 1600, borderRadius: 300, rotate: "-10deg", background: "linear-gradient(200deg, rgba(255,255,255,0.4), rgba(240,150,175,0.08))", filter: "blur(4px)" }} />
      <Bokeh seed={`n14-${id}`} count={7} colors={["rgba(255,255,255,0.9)", "rgba(244,170,190,0.9)"]} minSize={120} maxSize={280} opacity={0.4} blur={18} />
      <div style={{ position: "absolute", left: -100, right: -100, top: 880, bottom: -100, background: "linear-gradient(180deg, rgba(255,214,224,0.95), rgba(236,160,182,0.95))" }} />
      <AbsoluteFill style={{ scale: interpolate(frame, [0, dur], [1.0, 1.04]), transformOrigin: "960px 600px" }}>
        <Product
          name={`Montage hero · ${id}`}
          id={id}
          x={960}
          y={880 - (width * (id === "altheaTube" ? 3.044 : 1.108)) / 2}
          width={width}
          sweep={interpolate(frame, [0, dur], [0.1, 0.9], { ...c, easing: Easing.bezier(0.45, 0, 0.55, 1) })}
          reflectionGap={2}
          reflectionOpacity={0.22}
          wrap="255,205,218"
          cast="130,40,70"
          ground={2}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** translucent pink glass bar sweeping across a cut (foreground wipe; the image stays visible) */
const GlassBar: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Glass x={interpolate(frame, [0, 10], [2500, -600])} y={540} w={900} h={1500} rot={12} tint="255,170,195" blur={10} opacity={0.75} radius={120} />
  );
};

const CUTS = [16, 32, 48, 72, 88, 104, 128, 144, 154];

export const N14Flight: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="N1 model close-up" durationInFrames={16}>
      <Shot id="pool" height={1700} originY="35%" dur={16} />
    </Sequence>
    <Sequence name="N2 macro skin" from={16} durationInFrames={16}>
      <Shot id="macroEyeTexture" height={1200} originX="40%" originY="70%" dur={16} />
    </Sequence>
    <Sequence name="N3 pink liquid" from={32} durationInFrames={16}>
      <Shot id="macroPinkLiquid" height={1440} dur={16} />
    </Sequence>
    <Sequence name="N4 product hero · Dr.Althea tube" from={48} durationInFrames={24}>
      <ProductShot id="altheaTube" width={210} dur={24} />
    </Sequence>
    <Sequence name="N5 hair" from={72} durationInFrames={16}>
      <Shot id="macroHair" height={2330} dur={16} driftX={-20} />
    </Sequence>
    <Sequence name="N6 water" from={88} durationInFrames={16}>
      <Shot id="shoulderSea" height={1500} originX="12%" originY="30%" dur={16} />
    </Sequence>
    <Sequence name="N7 product hero · Hikari" from={104} durationInFrames={24}>
      <ProductShot id="hikari" width={560} dur={24} />
    </Sequence>
    <Sequence name="N8 eye macro" from={128} durationInFrames={16}>
      <Shot id="macroEyeTexture" height={1500} originX="48%" originY="28%" dur={16} />
    </Sequence>
    <Sequence name="N9 serum glass" from={144} durationInFrames={10}>
      <Shot id="macroDropper" height={2310} originY="40%" dur={10} />
    </Sequence>
    <Sequence name="N10 model" from={154} durationInFrames={11}>
      <Shot id="cheekWet" height={1100} dur={11} />
    </Sequence>
    {CUTS.map((cut) => (
      <Sequence key={cut} name={`N · glass bar across cut ${cut}`} from={cut - 5} durationInFrames={10}>
        <GlassBar />
      </Sequence>
    ))}
  </AbsoluteFill>
);
