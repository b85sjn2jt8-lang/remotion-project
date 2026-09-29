import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { ProgressBar } from "../../components/ProgressBar";
import { SafeZones } from "../../components/SafeZones";
import type { SocialVideoProps } from "../../schema";
import { WeightBadge } from "./WeightBadge";

/**
 * TIMELINE: the original footage plays untouched (no crop, zoom or effect on the product);
 * only the "17.5 g" highlight is layered on top, from frame 0.
 *  - To use the AI-edited (floating case) version later, swap the footage `src`
 *    and update `durationInFrames` of this video in src/Root.tsx.
 */
export const CaseWeightVideo: React.FC<SocialVideoProps> = ({
  accentColor,
  showProgressBar,
  showSafeZones,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence
        name="Clip 1 · source"
        trimBefore={0}
        durationInFrames={59}
        layout="absolute-fill"
      >
        <Video
          name="Footage"
          src={staticFile("footage/case-weight.mp4")}
          objectFit="cover"
          style={{ width: "100%", height: "100%", scale: 1 }}
        />
      </Sequence>

      <Sequence name="Weight 17.5 g" durationInFrames={59}>
        <WeightBadge />
      </Sequence>

      {showProgressBar ? <ProgressBar color={accentColor} /> : null}
      {showSafeZones ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};
