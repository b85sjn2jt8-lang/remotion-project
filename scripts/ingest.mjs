#!/usr/bin/env node
/**
 * Prepare raw footage for editing in Remotion.
 *
 *   npm run ingest -- footage/my-clip.mov                 # prepare + analyze
 *   npm run ingest -- footage/my-clip.mov --captions      # + transcribe (whisper.cpp, runs locally)
 *   npm run ingest -- footage/my-clip.mov --srt my.srt    # + import existing .srt captions
 *
 * Output:
 *   public/footage/<name>.mp4    H.264 / SDR bt709 / 30fps CFR / max 1920px tall — what Remotion plays
 *   edits/<name>.json            metadata, detected silences, suggested clip cuts (in frames)
 *   public/captions/<name>.json  word-level captions in @remotion/captions `Caption[]` format
 *
 * Uses the ffmpeg/ffprobe that ship with Remotion (`npx remotion ffmpeg`), so nothing extra
 * needs to be installed except for transcription (whisper.cpp is downloaded on first use).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FPS = 30;
const MAX_HEIGHT = 1920;

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const VALUE_OPTIONS = [
  "--srt",
  "--model",
  "--language",
  "--min-silence",
  "--pad",
];
const input = args.find(
  (a, i) => !a.startsWith("--") && !VALUE_OPTIONS.includes(args[i - 1]),
);

if (!input || !fs.existsSync(input)) {
  console.error(
    "Usage: npm run ingest -- <path-to-footage> [--captions] [--srt file.srt]",
  );
  console.error(
    "       [--model small.en] [--language en] [--min-silence 0.35] [--pad 0.08] [--no-transcode]",
  );
  process.exit(1);
}

const root = process.cwd();
const name = path
  .basename(input, path.extname(input))
  .replace(/[^a-zA-Z0-9_-]+/g, "-")
  .toLowerCase();
const outVideo = path.join(root, "public", "footage", `${name}.mp4`);
const outEdit = path.join(root, "edits", `${name}.json`);
const outCaptions = path.join(root, "public", "captions", `${name}.json`);
for (const f of [outVideo, outEdit, outCaptions]) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
}

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const remotionTool = (tool, toolArgs) => {
  const res = spawnSync(npx, ["remotion", tool, ...toolArgs], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 200,
    shell: process.platform === "win32",
  });
  if (res.status !== 0) {
    throw new Error(`remotion ${tool} failed:\n${res.stderr}`);
  }
  return { stdout: res.stdout, stderr: res.stderr };
};

// 1. Probe ----------------------------------------------------------------------
console.log(`▸ Probing ${input}`);
const probe = JSON.parse(
  remotionTool("ffprobe", [
    "-v",
    "error",
    "-print_format",
    "json",
    "-show_streams",
    "-show_format",
    input,
  ]).stdout,
);
const vStream = probe.streams.find((s) => s.codec_type === "video");
const aStream = probe.streams.find((s) => s.codec_type === "audio");
if (!vStream) {
  throw new Error("No video stream found");
}
const rotation = Math.abs(
  Number(
    vStream.side_data_list?.find((d) => d.rotation !== undefined)?.rotation ??
      vStream.tags?.rotate ??
      0,
  ),
);
const rotated = rotation === 90 || rotation === 270;
const srcWidth = rotated ? vStream.height : vStream.width;
const srcHeight = rotated ? vStream.width : vStream.height;
const isHdr = ["arib-std-b67", "smpte2084"].includes(vStream.color_transfer);
const durationInSeconds = Number(probe.format.duration);

// 2. Transcode ------------------------------------------------------------------
if (flag("no-transcode")) {
  console.log("▸ Skipping transcode (--no-transcode)");
} else {
  console.log(
    `▸ Transcoding → ${path.relative(root, outVideo)} (${srcWidth}x${srcHeight}${isHdr ? ", HDR → SDR" : ""})`,
  );
  const filters = [];
  if (isHdr) {
    // iPhone/Android HDR (HLG / PQ) looks washed out or orange in the browser. Tonemap to SDR bt709.
    filters.push(
      "zscale=t=linear:npl=100",
      "format=gbrpf32le",
      "zscale=p=bt709",
      "tonemap=hable:desat=0",
      "zscale=t=bt709:m=bt709:r=tv",
    );
  }
  if (srcHeight > MAX_HEIGHT) {
    filters.push(`scale=-2:${MAX_HEIGHT}`);
  }
  filters.push("format=yuv420p");
  remotionTool("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    input,
    "-vf",
    filters.join(","),
    "-r",
    String(FPS),
    "-fps_mode",
    "cfr",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-g",
    String(FPS),
    "-color_primaries",
    "bt709",
    "-color_trc",
    "bt709",
    "-colorspace",
    "bt709",
    ...(aStream ? ["-c:a", "aac", "-b:a", "192k", "-ar", "48000"] : ["-an"]),
    "-movflags",
    "+faststart",
    outVideo,
  ]);
}

// 3. Silence detection (adaptive threshold, see Remotion skill "silence-detection") -------
const minSilence = Number(option("min-silence", "0.35"));
const pad = Number(option("pad", "0.08"));
let silences = [];
let loudness = null;
if (aStream) {
  console.log("▸ Detecting silences");
  const ln = remotionTool("ffmpeg", [
    "-hide_banner",
    "-i",
    input,
    "-map",
    "0:a:0",
    "-af",
    "loudnorm=print_format=json",
    "-f",
    "null",
    "-",
  ]).stderr;
  const json = ln.slice(ln.lastIndexOf("{"), ln.lastIndexOf("}") + 1);
  loudness = JSON.parse(json);
  const thresh = Number(loudness.input_thresh);
  const sd = remotionTool("ffmpeg", [
    "-hide_banner",
    "-i",
    input,
    "-map",
    "0:a:0",
    "-af",
    `silencedetect=noise=${Number.isFinite(thresh) ? thresh : -40}dB:d=${minSilence}`,
    "-f",
    "null",
    "-",
  ]).stderr;
  let start = null;
  for (const line of sd.split("\n")) {
    const s = line.match(/silence_start: (-?[\d.]+)/);
    const e = line.match(/silence_end: ([\d.]+)/);
    if (s) {
      start = Math.max(0, Number(s[1]));
    }
    if (e && start !== null) {
      silences.push({ start, end: Number(e[1]) });
      start = null;
    }
  }
  if (start !== null) {
    silences.push({ start, end: durationInSeconds });
  }
}

// Speech segments = complement of silences, padded so words don't get clipped.
const keep = [];
let cursor = 0;
for (const s of [
  ...silences,
  { start: durationInSeconds, end: durationInSeconds },
]) {
  const segStart = Math.max(0, cursor - pad);
  const segEnd = Math.min(durationInSeconds, s.start + pad);
  if (segEnd - segStart >= 0.3) {
    keep.push({ startSec: segStart, endSec: segEnd });
  }
  cursor = s.end;
}
const clips = keep.map((k, i) => ({
  name: `Clip ${i + 1}`,
  startSec: Number(k.startSec.toFixed(3)),
  endSec: Number(k.endSec.toFixed(3)),
  trimBefore: Math.round(k.startSec * FPS),
  durationInFrames: Math.max(1, Math.round((k.endSec - k.startSec) * FPS)),
}));
const keptFrames = clips.reduce((a, c) => a + c.durationInFrames, 0);

fs.writeFileSync(
  outEdit,
  JSON.stringify(
    {
      source: path.relative(root, input),
      footage: `footage/${name}.mp4`,
      captions: `captions/${name}.json`,
      fps: FPS,
      width: srcWidth,
      height: srcHeight,
      hdr: isHdr,
      durationInSeconds,
      durationInFrames: Math.round(durationInSeconds * FPS),
      loudness: loudness && {
        integrated: Number(loudness.input_i),
        threshold: Number(loudness.input_thresh),
      },
      silenceSettings: { minSilence, pad },
      silences,
      clips,
      keptFrames,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `▸ Wrote ${path.relative(root, outEdit)} — ${clips.length} speech segments, ` +
    `${(keptFrames / FPS).toFixed(1)}s of ${durationInSeconds.toFixed(1)}s kept`,
);

// 4. Captions -------------------------------------------------------------------
const srt = option("srt", null);
if (srt) {
  const { parseSrt } = await import("@remotion/captions");
  const { captions } = parseSrt({ input: fs.readFileSync(srt, "utf8") });
  fs.writeFileSync(outCaptions, JSON.stringify(captions, null, 2) + "\n");
  console.log(
    `▸ Imported ${captions.length} captions from ${srt} → ${path.relative(root, outCaptions)}`,
  );
} else if (flag("captions")) {
  const { installWhisperCpp, downloadWhisperModel, transcribe, toCaptions } =
    await import("@remotion/install-whisper-cpp");
  const model = option("model", "small.en");
  const language = option("language", model.endsWith(".en") ? "en" : "auto");
  const whisperPath = path.join(root, "whisper.cpp");
  const whisperCppVersion = "1.5.5";
  console.log(
    `▸ Transcribing with whisper.cpp (${model}) — first run downloads the model`,
  );
  await installWhisperCpp({ to: whisperPath, version: whisperCppVersion });
  await downloadWhisperModel({ model, folder: whisperPath });
  const wav = path.join(whisperPath, `${name}.16k.wav`);
  remotionTool("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    input,
    "-ar",
    "16000",
    "-ac",
    "1",
    wav,
  ]);
  const whisperCppOutput = await transcribe({
    model,
    whisperPath,
    whisperCppVersion,
    inputPath: wav,
    tokenLevelTimestamps: true,
    language,
  });
  const { captions } = toCaptions({ whisperCppOutput });
  fs.writeFileSync(outCaptions, JSON.stringify(captions, null, 2) + "\n");
  fs.rmSync(wav);
  console.log(
    `▸ Wrote ${captions.length} words → ${path.relative(root, outCaptions)}`,
  );
}

console.log(
  `\nIn a composition: <Video src={staticFile("footage/${name}.mp4")} />`,
);
