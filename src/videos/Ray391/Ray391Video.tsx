import { Audio, Video } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ArabicCaptions } from "../../components/ArabicCaptions";
import { ProgressBar } from "../../components/ProgressBar";
import { SafeZones } from "../../components/SafeZones";
import type { ArabicSocialVideoProps } from "../../schema";
import { CompareCard } from "./CompareCard";
import { CouponCard } from "./CouponCard";
import { HookPrices } from "./HookPrices";
import { PriceCard } from "./PriceCard";

/**
 * RAY391 · Jean Paul Gaultier discount-code reel (Gulf Arabic voice-over, POV in store).
 *
 * The user's dialogue edit is the LOCKED BASE CUT: the clips below play the source back-to-back
 * with no gaps (each `trimBefore` = previous `trimBefore` + previous duration). They exist only to
 * change the punch-in (`scale` / `transformOrigin`) on sentence boundaries — no speech is removed.
 *  - Captions: public/captions/ray391.json (word timings in source time, emphasis/tone/page breaks).
 *  - Graphics are timed to the spoken words; each one is also its own composition in "Ray391-Scenes".
 * If you change clip lengths, update `durationInFrames` of "Ray391" in src/Root.tsx (sum of clips).
 */
export const Ray391Video: React.FC<ArabicSocialVideoProps> = ({
  accentColor,
  sfxVolume,
  showProgressBar,
  showSafeZones,
  captions,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries name="Edit timeline">
        {/* المحلات تسوي عروض… بـ49 و96 ريال */}
        <TransitionSeries.Sequence
          name="Clip 1"
          durationInFrames={138}
          premountFor={30}
        >
          <Sequence name="Clip 1 · Hook" trimBefore={0} layout="absolute-fill">
            <HookClipVideo />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* إنها كذّابة وتخدع الناس */}
        <TransitionSeries.Sequence
          name="Clip 2"
          durationInFrames={50}
          premountFor={30}
        >
          <Sequence
            name="Clip 2 · كذّابة"
            trimBefore={138}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1.12,
                transformOrigin: "50% 45%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* كود خصم 15% · مو أرخص سعر، الأصلي */}
        <TransitionSeries.Sequence
          name="Clip 3"
          durationInFrames={164}
          premountFor={30}
        >
          <Sequence
            name="Clip 3 · كود الخصم"
            trimBefore={188}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1,
                transformOrigin: "50% 50%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* لكن بهالكود طيّرنا المربح */}
        <TransitionSeries.Sequence
          name="Clip 4"
          durationInFrames={65}
          premountFor={30}
        >
          <Sequence
            name="Clip 4 · طيّرنا المربح"
            trimBefore={352}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1.08,
                transformOrigin: "45% 60%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* جان بول بخمس مية ريال تقريبًا */}
        <TransitionSeries.Sequence
          name="Clip 5"
          durationInFrames={94}
          premountFor={30}
        >
          <Sequence
            name="Clip 5 · جان بول"
            trimBefore={417}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1.16,
                transformOrigin: "44% 60%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* يخصم 75 ريال وشحن مجاني */}
        <TransitionSeries.Sequence
          name="Clip 6"
          durationInFrames={121}
          premountFor={30}
        >
          <Sequence
            name="Clip 6 · الخصم"
            trimBefore={511}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1,
                transformOrigin: "50% 50%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* فإنك تاخذه بـ420 */}
        <TransitionSeries.Sequence
          name="Clip 7"
          durationInFrames={57}
          premountFor={30}
        >
          <Sequence name="Clip 7 · 420" trimBefore={632} layout="absolute-fill">
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1.12,
                transformOrigin: "46% 60%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* هذا شي بحد ذاته جبّار */}
        <TransitionSeries.Sequence
          name="Clip 8"
          durationInFrames={48}
          premountFor={30}
        >
          <Sequence
            name="Clip 8 · جبّار"
            trimBefore={689}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1.2,
                transformOrigin: "46% 58%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* واللي يعرفون العطور… */}
        <TransitionSeries.Sequence
          name="Clip 9"
          durationInFrames={84}
          premountFor={30}
        >
          <Sequence
            name="Clip 9 · العطور"
            trimBefore={737}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1,
                transformOrigin: "50% 50%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
        {/* سعر منافس جدًا وإذا ما كان الأقل */}
        <TransitionSeries.Sequence
          name="Clip 10"
          durationInFrames={95}
          premountFor={30}
        >
          <Sequence
            name="Clip 10 · الأقل"
            trimBefore={821}
            layout="absolute-fill"
          >
            <Video
              name="Footage"
              src={staticFile("footage/ray391.mp4")}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                scale: 1.1,
                transformOrigin: "47% 58%",
                filter: "contrast(1.04) saturate(1.05)",
              }}
            />
            <ArabicCaptions
              src="captions/ray391.json"
              captionStyle={captions}
            />
          </Sequence>
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence name="Hook · fake prices" durationInFrames={186}>
        <HookPrices />
      </Sequence>
      <Sequence
        name="Coupon 15%"
        from={210}
        durationInFrames={66}
        premountFor={15}
      >
        <CouponCard />
      </Sequence>
      <Sequence
        name="Cheapest vs original"
        from={296}
        durationInFrames={66}
        premountFor={15}
      >
        <CompareCard />
      </Sequence>
      <Sequence
        name="Price 500 → 420"
        from={425}
        durationInFrames={304}
        premountFor={15}
      >
        <PriceCard />
      </Sequence>

      <Sequence name="SFX · pop 49" from={85} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/notification-pop.mp3")}
          volume={() => 0.3 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · strike كذّابة" from={150} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/impact-soft-heavy-002.mp3")}
          volume={() => 0.4 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · coupon in" from={210} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/card-slide-3.mp3")}
          volume={() => 0.3 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · 15% lands" from={258} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/impact-generic-light-002.mp3")}
          volume={() => 0.35 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · ✕ أرخص سعر" from={319} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/tick-001.mp3")}
          volume={() => 0.5 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · ✓ الأصلي" from={340} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/notification-pop.mp3")}
          volume={() => 0.25 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · 500 appears" from={456} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/notification-pop.mp3")}
          volume={() => 0.25 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · −75 chip" from={576} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/tick-001.mp3")}
          volume={() => 0.45 * sfxVolume}
        />
      </Sequence>
      <Sequence name="SFX · 420 lands" from={683} durationInFrames={30}>
        <Audio
          src={staticFile("sfx/impact-punch-medium-003.mp3")}
          volume={() => 0.35 * sfxVolume}
        />
      </Sequence>

      {showProgressBar ? <ProgressBar color={accentColor} /> : null}
      {showSafeZones ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};

// Clip 1 slowly pushes in (1 → 1.06) under the hook.
const HookClipVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Video
      name="Footage"
      src={staticFile("footage/ray391.mp4")}
      objectFit="cover"
      style={{
        width: "100%",
        height: "100%",
        scale: interpolate(frame, [0, 137], [1, 1.06], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        filter: "contrast(1.04) saturate(1.05)",
      }}
    />
  );
};
