import { defaultParams } from "../../../src/engine/animation/presets";
import type { AnimationSet, VideoItem } from "../../../src/engine/types";

/** Element motion presets (text, captions, overlays, images). Applying one sets IN/EMPHASIS/OUT. */
export const MOTION_PRESETS: {
  id: string;
  label: string;
  desc: string;
  apply: (a: AnimationSet) => void;
}[] = [
  {
    id: "fade",
    label: "Fade",
    desc: "Soft fade in & out",
    apply: (a) => {
      a.in = "fade";
      a.inParams = defaultParams({ duration: 8 });
      a.out = "fadeOut";
    },
  },
  {
    id: "scale",
    label: "Scale",
    desc: "Grow into place",
    apply: (a) => {
      a.in = "scale";
      a.inParams = defaultParams({ duration: 8 });
    },
  },
  {
    id: "pop",
    label: "Pop",
    desc: "Quick spring pop",
    apply: (a) => {
      a.in = "pop";
      a.inParams = defaultParams({ duration: 7 });
    },
  },
  {
    id: "bounce",
    label: "Bounce",
    desc: "Light bounce",
    apply: (a) => {
      a.in = "bounce";
      a.inParams = defaultParams({ duration: 9, intensity: 0.6 });
    },
  },
  {
    id: "slide",
    label: "Slide",
    desc: "Slide up into place",
    apply: (a) => {
      a.in = "slideUp";
      a.inParams = defaultParams({ duration: 9, intensity: 0.6 });
      a.out = "slideOut";
    },
  },
  {
    id: "spring",
    label: "Spring",
    desc: "Physical spring from a direction",
    apply: (a) => {
      a.in = "spring";
      a.inParams = defaultParams({ duration: 10, direction: "up" });
    },
  },
  {
    id: "elastic",
    label: "Elastic",
    desc: "Elastic settle",
    apply: (a) => {
      a.in = "elastic";
      a.inParams = defaultParams({ duration: 10 });
    },
  },
  {
    id: "overshoot",
    label: "Overshoot",
    desc: "Slight overshoot, then settle",
    apply: (a) => {
      a.in = "overshoot";
      a.inParams = defaultParams({ duration: 9 });
    },
  },
  {
    id: "rotate",
    label: "Rotate",
    desc: "Small rotation in",
    apply: (a) => {
      a.in = "rotate";
      a.inParams = defaultParams({ duration: 9 });
    },
  },
  {
    id: "blur",
    label: "Blur",
    desc: "Blur to sharp",
    apply: (a) => {
      a.in = "blurIn";
      a.inParams = defaultParams({ duration: 9 });
      a.out = "blurOut";
    },
  },
  {
    id: "mask",
    label: "Mask",
    desc: "Masked rise",
    apply: (a) => {
      a.in = "maskReveal";
      a.inParams = defaultParams({ duration: 10, direction: "up" });
    },
  },
  {
    id: "reveal",
    label: "Reveal",
    desc: "Wipe from the reading side",
    apply: (a) => {
      a.in = "wipe";
      a.inParams = defaultParams({ duration: 10, direction: "left" });
    },
  },
  {
    id: "tracking",
    label: "Tracking Reveal",
    desc: "Letters close in",
    apply: (a) => {
      a.in = "trackingReveal";
      a.inParams = defaultParams({ duration: 12 });
    },
  },
  {
    id: "wipe",
    label: "Wipe",
    desc: "Hard wipe",
    apply: (a) => {
      a.in = "wipe";
      a.inParams = defaultParams({ duration: 7, direction: "right" });
    },
  },
  {
    id: "punch",
    label: "Punch",
    desc: "Punch emphasis on entry",
    apply: (a) => {
      a.in = "fade";
      a.inParams = defaultParams({ duration: 3 });
      a.emphasis = "punch";
      a.emphasisParams = defaultParams({ duration: 9 });
    },
  },
  {
    id: "floating",
    label: "Floating",
    desc: "Gentle float while visible",
    apply: (a) => {
      a.emphasis = "floating";
    },
  },
  {
    id: "pulse",
    label: "Pulse",
    desc: "Subtle breathing pulse",
    apply: (a) => {
      a.emphasis = "pulse";
    },
  },
];

/** Zoom / reframe presets for video clips. Resolved into keyframes so they stay editable. */
export const VIDEO_PRESETS: {
  id: string;
  label: string;
  desc: string;
  apply: (v: VideoItem) => void;
}[] = [
  {
    id: "punchIn",
    label: "Punch In",
    desc: "Cut-in zoom (1.15×)",
    apply: (v) => {
      clearZoom(v);
      v.transform.scale = 1.15;
    },
  },
  {
    id: "punchOut",
    label: "Punch Out",
    desc: "Back to wide (1×)",
    apply: (v) => {
      clearZoom(v);
      v.transform.scale = 1;
      v.transform.x = 540;
      v.transform.y = 960;
    },
  },
  {
    id: "slowZoom",
    label: "Slow Zoom",
    desc: "1 → 1.08 over the clip",
    apply: (v) => {
      clearZoom(v);
      v.keyframes = {
        ...v.keyframes,
        scale: [
          { frame: 0, value: 1, easing: "linear" },
          { frame: v.durationInFrames - 1, value: 1.08, easing: "linear" },
        ],
      };
    },
  },
  {
    id: "quickZoom",
    label: "Quick Zoom",
    desc: "Fast push to 1.2×",
    apply: (v) => {
      clearZoom(v);
      v.keyframes = {
        ...v.keyframes,
        scale: [
          { frame: 0, value: 1, easing: "linear" },
          { frame: 6, value: 1.2, easing: "easeOut" },
        ],
      };
    },
  },
  {
    id: "panLeft",
    label: "Pan Left",
    desc: "Slow pan, zoomed 1.15×",
    apply: (v) => {
      clearZoom(v);
      v.transform.scale = 1.15;
      v.keyframes = {
        ...v.keyframes,
        x: [
          { frame: 0, value: 540 + 70, easing: "linear" },
          {
            frame: v.durationInFrames - 1,
            value: 540 - 70,
            easing: "easeInOut",
          },
        ],
      };
    },
  },
  {
    id: "panRight",
    label: "Pan Right",
    desc: "Slow pan, zoomed 1.15×",
    apply: (v) => {
      clearZoom(v);
      v.transform.scale = 1.15;
      v.keyframes = {
        ...v.keyframes,
        x: [
          { frame: 0, value: 540 - 70, easing: "linear" },
          {
            frame: v.durationInFrames - 1,
            value: 540 + 70,
            easing: "easeInOut",
          },
        ],
      };
    },
  },
  {
    id: "reframe",
    label: "Reframe",
    desc: "1.3× — then drag the frame in the preview",
    apply: (v) => {
      clearZoom(v);
      v.transform.scale = 1.3;
    },
  },
];

const clearZoom = (v: VideoItem) => {
  if (v.keyframes) {
    delete v.keyframes.scale;
    delete v.keyframes.x;
    delete v.keyframes.y;
  }
  v.motionPreset = undefined;
};
