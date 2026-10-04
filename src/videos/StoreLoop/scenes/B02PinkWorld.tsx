import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bokeh, Droplet, Dust } from "../fx/Atmosphere";
import { Glass, ModelPlate } from "../fx/Layers";
import { Product } from "../fx/Product";
import { Headline } from "../fx/Type";

const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// B · PINK K-BEAUTY WORLD (0:05–0:10, 150 f).
// Wet-look Korean-inspired model touching her cheek (mirrored so her face stays clear of the
// product); the real Anua jar large at the right (cropped corner off-frame); HYDRATE / GLOW / CARE
// sits behind the jar; translucent pink glass + droplets in front. Lateral dolly + push, rack focus.
export const B02PinkWorld: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 40% 40%, #fde3e4 0%, #f3bcc4 55%, #e397a6 100%)", overflow: "hidden" }}>
      <ModelPlate
        name="Model · cheek touch (wet look)"
        id="cheekWet"
        x={interpolate(frame, [0, 150], [800, 700], { easing: Easing.bezier(0.4, 0, 0.6, 1) })}
        y={560}
        height={1120}
        zoom={interpolate(frame, [0, 150], [1.0, 1.1], { output: "perceptual-scale" })}
        originX="55%"
        originY="40%"
        flip
        blur={interpolate(frame, [0, 70, 96, 130, 150], [0, 0, 5, 5, 2], c)}
        feather={[0, 14, 0, 4]}
      />
      <Bokeh seed="b02" count={8} colors={["rgba(255,240,242,0.9)", "rgba(248,170,185,0.9)"]} minSize={120} maxSize={300} driftX={-1} opacity={0.45} blur={16} />

      <Headline tier="h2"
        name="HYDRATE GLOW CARE"
        lines={["HYDRATE", "GLOW", "CARE"]}
        x={1500}
        y={14} 
        align="right"
        inAt={24}
        outAt={132}
        color="#ffffff"
        driftX={-50}
        shadow="0 8px 36px rgba(160,40,80,0.35)"
      />

      <Product
        name="Anua · beside model"
        id="anua"
        anchor="bottom-right"
        x={1932}
        y={1094}
        width={interpolate(frame, [0, 150], [690, 760], { easing: Easing.bezier(0.45, 0, 0.55, 1) })}
        blur={interpolate(frame, [0, 70, 96], [7, 7, 0], { ...c, easing: Easing.bezier(0.4, 0, 0.2, 1) })}
        sweep={interpolate(frame, [100, 140], [0, 1], c)}
        wrap="255,195,210"
        cast="120,30,60"
      />

      <Glass x={interpolate(frame, [0, 150], [260, -40])} y={interpolate(frame, [0, 150], [900, 930])} w={820} h={420} rot={18} tint="248,160,175" blur={20} opacity={0.72} />
      <Droplet x={interpolate(frame, [0, 150], [1220, 1080])} y={interpolate(frame, [0, 150], [430, 400])} size={260} blur={11} opacity={0.75} />
      <Droplet x={interpolate(frame, [0, 150], [1120, 1070])} y={interpolate(frame, [0, 150], [700, 760])} size={50} blur={0.5} />
      <Dust seed="b02d" count={24} color="255,240,242" vy={-0.4} opacity={0.6} />
    </AbsoluteFill>
  );
};
