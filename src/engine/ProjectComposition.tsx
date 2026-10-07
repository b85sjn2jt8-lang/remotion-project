import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ProxyContext } from "./assets";
import { useProjectFonts } from "./fonts";
import { CaptionView } from "./items/CaptionView";
import { resolveTransform, TransformBox } from "./items/common";
import {
  AudioView,
  BrollVideoView,
  ImageView,
  VideoView,
} from "./items/MediaViews";
import { OverlayView } from "./items/OverlayView";
import { TextView } from "./items/TextView";
import { COMPONENT_REGISTRY } from "./registry";
import type {
  ComponentItem,
  GlobalStyles,
  Item,
  Project,
  Track,
  Transition,
  VideoItem,
} from "./types";

export type ProjectCompositionProps = {
  project: Project;
  proxies?: Record<string, string>;
};

/**
 * Renders an editor project. This is the single bridge between the editor's data and Remotion:
 * the editor preview (Player) and the final render (CLI) both use this component.
 * Track order: tracks[0] is the TOP layer.
 */
export const ProjectComposition: React.FC<ProjectCompositionProps> = ({
  project,
  proxies,
}) => {
  useProjectFonts(project.fonts);
  const layers = useMemo(() => buildLayers(project), [project]);
  return (
    <ProxyContext.Provider value={proxies ?? NO_PROXIES}>
      <AbsoluteFill style={{ backgroundColor: project.backgroundColor }}>
        {layers.map(({ track, items }) => (
          <AbsoluteFill
            key={track.id}
            style={{ display: track.hidden ? "none" : undefined }}
          >
            {items.map(({ item, incoming, outgoing }) => (
              <Sequence
                key={item.id}
                name={item.name}
                from={item.from}
                durationInFrames={
                  item.durationInFrames +
                  (outgoing ? outgoing.durationInFrames : 0)
                }
                premountFor={15}
              >
                <ItemRenderer
                  item={item}
                  global={project.global}
                  width={project.width}
                  height={project.height}
                  muted={Boolean(track.muted)}
                  incoming={incoming}
                  outgoing={outgoing}
                />
              </Sequence>
            ))}
          </AbsoluteFill>
        ))}
      </AbsoluteFill>
    </ProxyContext.Provider>
  );
};

const NO_PROXIES: Record<string, string> = {};

type LayerItem = { item: Item; incoming?: Transition; outgoing?: Transition };

const buildLayers = (project: Project) => {
  const byTrack = new Map<string, Item[]>();
  for (const it of project.items) {
    const list = byTrack.get(it.trackId) ?? [];
    list.push(it);
    byTrack.set(it.trackId, list);
  }
  return [...project.tracks].reverse().map((track: Track) => {
    const items = (byTrack.get(track.id) ?? [])
      .slice()
      .sort((a, b) => a.from - b.from);
    const out: LayerItem[] = items.map((item) => ({ item }));
    // Transitions: the clip before a clip with `transitionIn` keeps playing underneath it.
    for (let i = 0; i < out.length; i++) {
      const it = out[i].item;
      if (
        it.type === "video" &&
        it.transitionIn &&
        it.transitionIn.type !== "cut"
      ) {
        out[i].incoming = it.transitionIn;
        const prev = out[i - 1];
        if (
          prev &&
          prev.item.type === "video" &&
          prev.item.from + prev.item.durationInFrames === it.from
        ) {
          prev.outgoing = it.transitionIn;
        }
      }
    }
    // Draw outgoing clips below incoming ones: incoming later in the list → on top. Already sorted.
    return { track, items: out };
  });
};

const ItemRenderer: React.FC<{
  item: Item;
  global: GlobalStyles;
  width: number;
  height: number;
  muted: boolean;
  incoming?: Transition;
  outgoing?: Transition;
}> = ({ item, global, width, height, muted, incoming, outgoing }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  switch (item.type) {
    case "video":
      return (
        <VideoView
          item={item as VideoItem}
          frame={frame}
          fps={fps}
          width={width}
          height={height}
          muted={muted}
          incoming={incoming}
          outgoing={outgoing}
        />
      );
    case "brollVideo":
      return (
        <BrollVideoView item={item} frame={frame} fps={fps} muted={muted} />
      );
    case "image":
      return <ImageView item={item} frame={frame} fps={fps} />;
    case "caption":
      return (
        <CaptionView item={item} frame={frame} fps={fps} global={global} />
      );
    case "text":
      return <TextView item={item} frame={frame} fps={fps} />;
    case "overlay":
      return <OverlayView item={item} frame={frame} fps={fps} />;
    case "audio":
      return <AudioView item={item} muted={muted} />;
    case "component":
      return (
        <ComponentView
          item={item}
          frame={frame}
          fps={fps}
          width={width}
          height={height}
        />
      );
  }
};

const ComponentView: React.FC<{
  item: ComponentItem;
  frame: number;
  fps: number;
  width: number;
  height: number;
}> = ({ item, frame, fps, width, height }) => {
  const entry = COMPONENT_REGISTRY[item.componentId];
  const t = resolveTransform(item.transform, item.keyframes, frame, fps);
  if (!entry) {
    return null;
  }
  const Comp = entry.component;
  return (
    <TransformBox itemId={item.id} t={t} style={{ width, height }}>
      <AbsoluteFill>
        <Comp />
      </AbsoluteFill>
    </TransformBox>
  );
};
