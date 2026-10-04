import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { GlassDisc, JAR_SRC, SerumDrop } from "./elements";

// SCENE 06 — PRODUCT + LIQUID (0:13–0:16)
// The jar stands in a shallow layer of rose water on wet glass. A drop lands
// beside it, the ripple travels under the jar and wobbles its reflection,
// while the camera trucks slowly sideways and a light sweep crosses the set.
// Sound: 0:13 glass/water transition · 0:13.6 drop.
export const S6Liquid: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#FCE6EB" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id="s6-water" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.06"
              numOctaves="2"
              seed={3}
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale={interpolate(frame, [0, 40, 56, 105], [8, 10, 40, 12], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <AbsoluteFill
        name="Background (truck slow)"
        style={{
          translate: interpolate(frame, [0, 105], ["14px 0px", "-14px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Studio wall"
          style={{
            background:
              "linear-gradient(180deg, #FFF6F8 0%, #FDE7EC 45%, #F8D3DC 70%)",
          }}
        />
        <Interactive.Div
          name="Window light"
          style={{
            position: "absolute",
            left: 120,
            top: -120,
            width: 760,
            height: 620,
            borderRadius: 60,
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.2))",
            rotate: "-8deg",
            filter: "blur(40px)",
          }}
        />
        <Interactive.Div
          name="Rose bounce"
          style={{
            position: "absolute",
            left: 1300,
            top: 260,
            width: 800,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(240,140,168,0.45), rgba(240,140,168,0))",
            filter: "blur(30px)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        name="Stage (truck)"
        style={{
          translate: interpolate(frame, [0, 105], ["40px 0px", "-40px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Wet glass floor"
          style={{
            position: "absolute",
            left: -200,
            top: 690,
            width: 2320,
            height: 500,
            background:
              "linear-gradient(180deg, rgba(250,214,223,0) 0%, rgba(246,196,209,0.95) 8%, #F0AFC0 45%, #E596AB 100%)",
          }}
        />
        <Interactive.Div
          name="Horizon glint"
          style={{
            position: "absolute",
            left: -200,
            top: 712,
            width: 2320,
            height: 6,
            backgroundColor: "rgba(255,255,255,0.75)",
            filter: "blur(3px)",
          }}
        />
        <Img
          name="Jar reflection (in water)"
          src={staticFile(JAR_SRC)}
          style={{
            position: "absolute",
            left: 670,
            top: 822,
            width: 580,
            scale: "1 -1",
            opacity: 0.42,
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 55%)",
            filter: "url(#s6-water) blur(1px)",
          }}
        />
        <Interactive.Div
          name="Rose water pool"
          style={{
            position: "absolute",
            left: 520,
            top: 770,
            width: 880,
            height: 120,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(236,120,152,0.4) 0%, rgba(240,140,168,0.3) 70%, rgba(240,140,168,0) 100%)",
            boxShadow: "inset 0 3px 4px rgba(255,255,255,0.55)",
          }}
        />
        <Interactive.Div
          name="Drop ripple 1"
          style={{
            position: "absolute",
            left: 580,
            top: 740,
            width: 1600,
            height: 240,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 4px rgba(255,255,255,0.8), 0 6px 10px 3px rgba(180,50,90,0.25), inset 0 4px 6px rgba(255,255,255,0.7)",
            filter: "blur(1.2px)",
            scale: interpolate(frame, [32, 80], [0.01, 1], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [32, 35, 80], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Drop ripple 2"
          style={{
            position: "absolute",
            left: 580,
            top: 740,
            width: 1600,
            height: 240,
            borderRadius: "50%",
            boxShadow:
              "0 0 0 3px rgba(255,255,255,0.7), 0 5px 8px 2px rgba(180,50,90,0.2), inset 0 3px 5px rgba(255,255,255,0.6)",
            filter: "blur(1.2px)",
            scale: interpolate(frame, [40, 96], [0.01, 0.8], {
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [40, 43, 96], [0, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Contact shadow"
          style={{
            position: "absolute",
            left: 680,
            top: 808,
            width: 560,
            height: 28,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(110,20,50,0.55), rgba(110,20,50,0))",
            filter: "blur(4px)",
          }}
        />
        <Img
          name="ANUA jar"
          src={staticFile(JAR_SRC)}
          style={{ position: "absolute", left: 670, top: 287, width: 580 }}
        />
        <Interactive.Div
          name="Light sweep on jar"
          style={{
            position: "absolute",
            left: 670,
            top: 287,
            width: 580,
            height: 535,
            maskImage: `url(${staticFile(JAR_SRC)})`,
            maskSize: "100% 100%",
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 65%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [48, 92], [100, 0], {
              easing: Easing.bezier(0.45, 0, 0.55, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}% 0%`,
            mixBlendMode: "soft-light",
          }}
        />
        <Interactive.Div
          name="Water line in front of base"
          style={{
            position: "absolute",
            left: 640,
            top: 808,
            width: 640,
            height: 40,
            borderRadius: "50%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(244,166,188,0.35) 55%, rgba(255,255,255,0.45) 100%)",
            clipPath: "inset(50% 0 0 0)",
          }}
        />
        <Interactive.Div
          name="Falling drop"
          style={{
            position: "absolute",
            left: 1355,
            top: -160,
            width: 64,
            height: 78,
            translate: interpolate(frame, [16, 32], ["0px 0px", "0px 940px"], {
              easing: Easing.bezier(0.5, 0, 1, 0.5),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [16, 31], ["1 1", "0.85 1.25"], {
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [31, 33], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <SerumDrop />
        </Interactive.Div>
      </AbsoluteFill>

      <Interactive.Div
        name="Environment light sweep"
        style={{
          position: "absolute",
          left: -900,
          top: -300,
          width: 700,
          height: 1700,
          rotate: "18deg",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
          mixBlendMode: "screen",
          translate: interpolate(frame, [46, 96], ["0px 0px", "3400px 0px"], {
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        name="Foreground (truck fast)"
        style={{
          translate: interpolate(frame, [0, 105], ["110px 0px", "-110px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Foreground glass sphere"
          style={{
            position: "absolute",
            left: 60,
            top: 760,
            width: 360,
            height: 360,
            filter: "blur(20px)",
            opacity: 0.85,
          }}
        >
          <GlassDisc />
        </Interactive.Div>
        <Interactive.Div
          name="Foreground serum bead"
          style={{
            position: "absolute",
            left: 1700,
            top: 880,
            width: 200,
            height: 230,
            filter: "blur(12px)",
            opacity: 0.85,
          }}
        >
          <SerumDrop />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
