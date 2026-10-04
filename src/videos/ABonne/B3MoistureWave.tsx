import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { LotionRibbon, WaterDrop } from "./materials";

// SCENE 03 — MOISTURE WAVE (0:04.6–0:07.5)
// After the lotion ribbon sweeps the lens, an extreme macro of folding cream
// on a glossy pink surface. Smaller ribbons of lotion glide across and leave
// the words behind them. Sound: 0:05 creamy swipe.
export const B3MoistureWave: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5BCCB" }}>
      <AbsoluteFill
        name="Macro camera drift"
        style={{
          scale: interpolate(frame, [0, 92], [1.08, 1], {
            easing: Easing.bezier(0.2, 0.5, 0.4, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill
          name="Glossy pink surface"
          style={{
            background:
              "linear-gradient(160deg, #FBD3DD 0%, #F5B6C6 40%, #EC98AF 80%, #E48AA3 100%)",
          }}
        />
        <Interactive.Div
          name="Surface sheen"
          style={{
            position: "absolute",
            left: -200,
            top: -260,
            width: 1500,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,246,248,0.8), rgba(255,246,248,0))",
            filter: "blur(10px)",
          }}
        />
        <Interactive.Div
          name="Cream fold back"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
            opacity: 0.9,
          }}
        >
          <LotionRibbon
            d="M 2100 1000 C 1700 760, 1400 980, 1250 840 S 1500 560, 1980 620"
            progress={interpolate(frame, [0, 92], [0.55, 1], {
              easing: Easing.bezier(0.3, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            width={230}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Cream fold front"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
          }}
        >
          <LotionRibbon
            d="M -300 1120 C 200 900, 650 1100, 1050 960 S 1650 900, 2200 1180"
            progress={interpolate(frame, [0, 92], [0.5, 1], {
              easing: Easing.bezier(0.3, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            width={260}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 1"
          style={{
            position: "absolute",
            left: 1420,
            top: 300,
            width: 60,
            height: 54,
          }}
        >
          <WaterDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 2"
          style={{
            position: "absolute",
            left: 1630,
            top: 420,
            width: 34,
            height: 31,
          }}
        >
          <WaterDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 3"
          style={{
            position: "absolute",
            left: 1240,
            top: 520,
            width: 24,
            height: 22,
          }}
        >
          <WaterDrop />
        </Interactive.Div>
        <Interactive.Div
          name="Water droplet 4"
          style={{
            position: "absolute",
            left: 1760,
            top: 230,
            width: 44,
            height: 40,
          }}
        >
          <WaterDrop />
        </Interactive.Div>

        <Interactive.Div
          name="Title — MOISTURIZING"
          style={{
            position: "absolute",
            left: 130,
            top: 290,
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: -3,
            color: "#FFFFFF",
            textShadow: "0 10px 30px rgba(170,50,90,0.3)",
            clipPath: `polygon(${interpolate(frame, [26, 58], [-430, 2370], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) - 3000}px -50px, ${interpolate(frame, [26, 58], [-430, 2370], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px -50px, ${interpolate(frame, [26, 58], [-430, 2370], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px 250px, ${interpolate(frame, [26, 58], [-430, 2370], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) - 3000}px 250px)`,
          }}
        >
          MOISTURIZING
        </Interactive.Div>
        <Interactive.Div
          name="Title — SOFT & SMOOTH"
          style={{
            position: "absolute",
            left: 136,
            top: 470,
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 300,
            fontSize: 86,
            lineHeight: 1,
            letterSpacing: 16,
            color: "#5E1A38",
            clipPath: `polygon(${interpolate(frame, [44, 72], [-436, 2164], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) - 3000}px -40px, ${interpolate(frame, [44, 72], [-436, 2164], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px -40px, ${interpolate(frame, [44, 72], [-436, 2164], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px 160px, ${interpolate(frame, [44, 72], [-436, 2164], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) - 3000}px 160px)`,
          }}
        >
          SOFT &amp; SMOOTH
        </Interactive.Div>
        <Interactive.Div
          name="Reveal ribbon — MOISTURIZING"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
          }}
        >
          <LotionRibbon
            d="M -300 390 C 300 300, 900 460, 1500 350 S 2300 320, 2500 400"
            progress={interpolate(frame, [20, 50], [0, 1], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            tail={interpolate(frame, [26, 58], [0, 1], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            width={190}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Reveal ribbon — SOFT & SMOOTH"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
          }}
        >
          <LotionRibbon
            d="M -300 525 C 300 470, 800 580, 1300 500 S 2100 470, 2300 530"
            progress={interpolate(frame, [38, 64], [0, 1], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            tail={interpolate(frame, [44, 72], [0, 1], {
              easing: Easing.bezier(0.4, 0, 0.5, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            width={120}
          />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
