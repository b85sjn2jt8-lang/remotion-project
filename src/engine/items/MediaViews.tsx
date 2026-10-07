import { Audio, Video } from "@remotion/media";
import React from "react";
import { Img } from "remotion";
import { evalAnimationSet } from "../animation/presets";
import { assetUrl, useMediaUrl } from "../assets";
import type {
  AudioItem,
  BrollVideoItem,
  Crop,
  ImageItem,
  Transition,
  VideoItem,
} from "../types";
import { resolveTransform, shadowCss, TransformBox } from "./common";
import { incomingStyle, outgoingStyle } from "./transitions";

const cropClip = (c: Crop) =>
  c.top || c.right || c.bottom || c.left
    ? `inset(${c.top}% ${c.right}% ${c.bottom}% ${c.left}%)`
    : undefined;

/** Linear fade in/out envelope for audio, in frames. */
export const fadeEnvelope = (
  f: number,
  duration: number,
  fadeIn: number,
  fadeOut: number,
) => {
  let v = 1;
  if (fadeIn > 0) v *= Math.min(1, Math.max(0, f / fadeIn));
  if (fadeOut > 0) v *= Math.min(1, Math.max(0, (duration - f) / fadeOut));
  return v;
};

/**
 * Main-track video clip. Fills the frame; transform x/y move it relative to the frame center.
 * `tail` > 0 means this clip is being shown past its end underneath the next clip's transition.
 */
export const VideoView: React.FC<{
  item: VideoItem;
  frame: number;
  fps: number;
  width: number;
  height: number;
  muted: boolean;
  incoming?: Transition;
  outgoing?: Transition;
}> = ({ item, frame, fps, width, height, muted, incoming, outgoing }) => {
  const src = useMediaUrl(item.src);
  const t = resolveTransform(
    item.transform,
    item.keyframes,
    frame,
    fps,
    item.radius,
  );
  const transitionStyle =
    incoming && incoming.type !== "cut" && frame < incoming.durationInFrames
      ? incomingStyle(incoming.type, frame / incoming.durationInFrames)
      : outgoing && frame >= item.durationInFrames
        ? outgoingStyle(
            outgoing.type,
            (frame - item.durationInFrames) / outgoing.durationInFrames,
          )
        : {};
  const { contrast, saturation, brightness } = item.adjust;
  const filters = [
    contrast !== 1 ? `contrast(${contrast})` : "",
    saturation !== 1 ? `saturate(${saturation})` : "",
    brightness !== 1 ? `brightness(${brightness})` : "",
    t.blur > 0.05 ? `blur(${t.blur}px)` : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      data-item-id={item.id}
      style={{
        position: "absolute",
        width,
        height,
        left: t.x - width / 2,
        top: t.y - height / 2,
        overflow: "hidden",
        borderRadius: t.radius,
        opacity: t.opacity,
        rotate: `${t.rotation}deg`,
        ...transitionStyle,
      }}
    >
      <Video
        src={src}
        trimBefore={item.trimBefore}
        objectFit={item.fit}
        muted={muted || item.muted}
        volume={(f) =>
          item.volume *
          fadeEnvelope(f, item.durationInFrames, item.fadeIn, item.fadeOut)
        }
        style={{
          width: "100%",
          height: "100%",
          scale: String(t.scale),
          transformOrigin: `${item.origin.x}% ${item.origin.y}%`,
          clipPath: cropClip(item.crop),
          filter: filters || undefined,
        }}
      />
    </div>
  );
};

export const ImageView: React.FC<{
  item: ImageItem;
  frame: number;
  fps: number;
}> = ({ item, frame, fps }) => {
  const t = resolveTransform(
    item.transform,
    item.keyframes,
    frame,
    fps,
    item.radius,
  );
  const anim = evalAnimationSet(
    item.animation,
    frame,
    item.durationInFrames,
    fps,
  );
  return (
    <TransformBox itemId={item.id} t={t} anim={anim}>
      <div
        style={{
          width: item.width,
          height: item.height,
          borderRadius: t.radius,
          overflow: "hidden",
          boxShadow: shadowCss(item.shadow),
          clipPath: cropClip(item.crop),
        }}
      >
        <Img
          src={assetUrl(item.src)}
          style={{ width: "100%", height: "100%", objectFit: item.fit }}
        />
      </div>
    </TransformBox>
  );
};

export const BrollVideoView: React.FC<{
  item: BrollVideoItem;
  frame: number;
  fps: number;
  muted: boolean;
}> = ({ item, frame, fps, muted }) => {
  const src = useMediaUrl(item.src);
  const t = resolveTransform(
    item.transform,
    item.keyframes,
    frame,
    fps,
    item.radius,
  );
  const anim = evalAnimationSet(
    item.animation,
    frame,
    item.durationInFrames,
    fps,
  );
  return (
    <TransformBox itemId={item.id} t={{ ...t, scale: 1 }} anim={anim}>
      <div
        style={{
          width: item.width,
          height: item.height,
          borderRadius: t.radius,
          overflow: "hidden",
          boxShadow: shadowCss(item.shadow),
          clipPath: cropClip(item.crop),
          scale: String(t.scale),
        }}
      >
        <Video
          src={src}
          trimBefore={item.trimBefore}
          objectFit={item.fit}
          muted={muted || item.muted}
          volume={(f) =>
            item.volume *
            fadeEnvelope(f, item.durationInFrames, item.fadeIn, item.fadeOut)
          }
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: `${item.origin.x}% ${item.origin.y}%`,
          }}
        />
      </div>
    </TransformBox>
  );
};

export const AudioView: React.FC<{ item: AudioItem; muted: boolean }> = ({
  item,
  muted,
}) => (
  <Audio
    src={assetUrl(item.src)}
    trimBefore={item.trimBefore || undefined}
    muted={muted || item.muted}
    volume={(f) =>
      item.volume *
      fadeEnvelope(f, item.durationInFrames, item.fadeIn, item.fadeOut)
    }
  />
);
