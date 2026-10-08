/**
 * Local editor backend, mounted into the Vite dev server.
 * Projects, presets, media, fonts and renders live on disk inside the repo, so nothing is lost
 * on refresh and everything can be committed / reused across projects.
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import type { Plugin } from "vite";

const ROOT = path.resolve(__dirname, "../..");
const PROJECTS = path.join(ROOT, "projects");
const HISTORY = path.join(PROJECTS, ".history");
const PRESETS = path.join(ROOT, "presets", "library.json");
const PUBLIC = path.join(ROOT, "public");
const MEDIA = path.join(PUBLIC, "media");
const FONTS = path.join(PUBLIC, "fonts");
const CACHE = path.join(ROOT, ".cache");
const OUT = path.join(ROOT, "out");

// ---------- ffmpeg / remotion binaries (cross-platform: Windows, macOS, Linux) ----------
// Uses the ffmpeg that ships with Remotion (no system install needed); falls back to PATH.
const findCompositorDir = () => {
  const base = path.join(ROOT, "node_modules", "@remotion");
  if (!fs.existsSync(base)) return null;
  const exe = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
  for (const d of fs.readdirSync(base)) {
    if (d.startsWith("compositor-") && fs.existsSync(path.join(base, d, exe)))
      return path.join(base, d);
  }
  return null;
};
const COMPOSITOR = findCompositorDir();
const binEnv = () => {
  if (!COMPOSITOR) return process.env;
  const key =
    process.platform === "darwin" ? "DYLD_LIBRARY_PATH" : "LD_LIBRARY_PATH";
  return {
    ...process.env,
    [key]: [COMPOSITOR, process.env[key]].filter(Boolean).join(path.delimiter),
  };
};
const bin = (name: "ffmpeg" | "ffprobe") =>
  COMPOSITOR
    ? path.join(COMPOSITOR, process.platform === "win32" ? `${name}.exe` : name)
    : name;
const run = (
  name: "ffmpeg" | "ffprobe",
  args: string[],
  opts: { maxBuffer?: number } = {},
) =>
  spawnSync(bin(name), args, {
    env: binEnv(),
    maxBuffer: opts.maxBuffer ?? 1024 * 1024 * 64,
  });
const REMOTION_CLI = path.join(
  ROOT,
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);

const json = (res: ServerResponse, data: unknown, status = 200) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const readBody = (req: IncomingMessage): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

const safeName = (n: string) =>
  n.replace(/[^\p{L}\p{N}._-]+/gu, "-").replace(/^-+|-+$/g, "") || "file";
const safeId = (n: string) => n.replace(/[^a-zA-Z0-9_-]/g, "");

const ffprobe = (file: string) => {
  const r = run(
    "ffprobe",
    [
      "-v",
      "error",
      "-print_format",
      "json",
      "-show_streams",
      "-show_format",
      file,
    ],
    {},
  );
  if (r.status !== 0) return null;
  return JSON.parse(r.stdout.toString("utf8")) as {
    streams: {
      codec_type: string;
      codec_name: string;
      width?: number;
      height?: number;
      color_transfer?: string;
    }[];
    format: { duration?: string };
  };
};

// ---------- fonts ----------
const WEIGHTS: Record<string, string> = {
  thin: "100",
  extralight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};
const listFonts = () => {
  if (!fs.existsSync(FONTS)) return [];
  return fs
    .readdirSync(FONTS)
    .filter((f) => /\.(woff2?|ttf|otf)$/i.test(f))
    .map((file) => {
      const base = file.replace(/\.(woff2?|ttf|otf)$/i, "");
      const parts = base.split(/[-_]/);
      let weight = "400";
      const last = parts[parts.length - 1].toLowerCase();
      if (/^\d{3}$/.test(last)) {
        weight = last;
        parts.pop();
      } else if (WEIGHTS[last]) {
        weight = WEIGHTS[last];
        parts.pop();
      }
      // "Tajawal-Arabic-800" → family "Tajawal" (subset files)
      const subset =
        parts.length > 1 && /^(arabic|latin)$/i.test(parts[parts.length - 1])
          ? parts.pop()
          : undefined;
      const family = parts.join(" ").replace(/([a-z])([A-Z])/g, "$1 $2");
      return { family, file, weight, subset: subset?.toLowerCase() };
    });
};

// ---------- waveform ----------
const waveform = (src: string) => {
  const file = path.join(PUBLIC, src);
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return null;
  fs.mkdirSync(path.join(CACHE, "waveforms"), { recursive: true });
  const stat = fs.statSync(file);
  const cacheFile = path.join(
    CACHE,
    "waveforms",
    `${safeName(src)}-${stat.size}.json`,
  );
  if (fs.existsSync(cacheFile))
    return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  const RATE = 8000;
  const PER_SEC = 100;
  const r = run(
    "ffmpeg",
    [
      "-v",
      "error",
      "-i",
      file,
      "-vn",
      "-ac",
      "1",
      "-ar",
      String(RATE),
      "-c:a",
      "pcm_s16le",
      "-f",
      "wav",
      "-",
    ],
    {
      maxBuffer: 1024 * 1024 * 512,
    },
  );
  if (r.status !== 0) return null;
  // Piped WAV: skip the header up to the "data" chunk (size fields are unknown when piping).
  const dataAt = r.stdout.indexOf("data");
  const body = r.stdout.subarray(dataAt >= 0 ? dataAt + 8 : 44);
  const pcm = new Int16Array(
    body.buffer,
    body.byteOffset,
    Math.floor(body.length / 2),
  );
  const win = RATE / PER_SEC;
  const peaks: number[] = [];
  let max = 1;
  for (let i = 0; i < pcm.length; i += win) {
    let p = 0;
    for (let j = i; j < Math.min(pcm.length, i + win); j++)
      p = Math.max(p, Math.abs(pcm[j]));
    peaks.push(p);
    max = Math.max(max, p);
  }
  const data = {
    peaksPerSecond: PER_SEC,
    peaks: peaks.map((p) => +(p / max).toFixed(3)),
  };
  fs.writeFileSync(cacheFile, JSON.stringify(data));
  return data;
};

// ---------- proxy media ----------
// Lightweight VP9 proxies (540p, keyframe every 10 frames) for smooth scrubbing in the editor.
// Final renders always use the original file.
const PROXIES = path.join(PUBLIC, "proxies");
const proxyJobs = new Map<string, Promise<string | null>>();
const ensureProxy = (src: string) => {
  const file = path.join(PUBLIC, src);
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file))
    return Promise.resolve(null);
  const stat = fs.statSync(file);
  const name = `${safeName(src.replace(/\.[^.]+$/, ""))}-${stat.size}-720.webm`;
  const out = path.join(PROXIES, name);
  const rel = `proxies/${name}`;
  if (fs.existsSync(out)) return Promise.resolve(rel);
  if (!proxyJobs.has(rel)) {
    fs.mkdirSync(PROXIES, { recursive: true });
    proxyJobs.set(
      rel,
      new Promise((resolve) => {
        const tmp = `${out}.part.webm`;
        const child = spawn(
          bin("ffmpeg"),
          [
            "-v",
            "error",
            "-y",
            "-i",
            file,
            "-vf",
            "scale=-2:1280",
            "-r",
            "30",
            "-c:v",
            "libvpx-vp9",
            "-b:v",
            "2.5M",
            "-deadline",
            "realtime",
            "-cpu-used",
            "8",
            "-row-mt",
            "1",
            "-g",
            "10",
            "-c:a",
            "libopus",
            "-b:a",
            "96k",
            tmp,
          ],
          { env: binEnv() },
        );
        child.on("close", (code) => {
          if (code === 0) {
            fs.renameSync(tmp, out);
            resolve(rel);
          } else resolve(null);
          proxyJobs.delete(rel);
        });
      }),
    );
  }
  return proxyJobs.get(rel)!;
};

// ---------- transcription (whisper.cpp via scripts/ingest.mjs) ----------
type TranscribeJob = {
  status: "running" | "done" | "error";
  captions?: string;
  log: string;
};
const transcribes = new Map<string, TranscribeJob>();
const startTranscribe = (src: string, model: string, language: string) => {
  const file = path.join(PUBLIC, src);
  const job: TranscribeJob = { status: "running", log: "" };
  transcribes.set(src, job);
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) {
    job.status = "error";
    job.log = "file not found";
    return job;
  }
  const name = path
    .basename(file, path.extname(file))
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .toLowerCase();
  const child = spawn(
    process.execPath,
    [
      "scripts/ingest.mjs",
      file,
      "--no-transcode",
      "--captions",
      "--model",
      model,
      "--language",
      language,
    ],
    { cwd: ROOT },
  );
  const onData = (d: Buffer) =>
    (job.log = (job.log + d.toString()).slice(-3000));
  child.stdout.on("data", onData);
  child.stderr.on("data", onData);
  child.on("close", (code) => {
    const out = path.join(PUBLIC, "captions", `${name}.json`);
    if (code === 0 && fs.existsSync(out)) {
      job.status = "done";
      job.captions = `captions/${name}.json`;
    } else job.status = "error";
  });
  return job;
};

// ---------- render ----------
type RenderJob = {
  id: string;
  status: "running" | "done" | "error";
  progress: number;
  output: string;
  log: string;
};
const renders = new Map<string, RenderJob>();
const BROWSER =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";

const startRender = (projectId: string) => {
  const project = JSON.parse(
    fs.readFileSync(path.join(PROJECTS, `${projectId}.json`), "utf8"),
  );
  fs.mkdirSync(path.join(CACHE, "render"), { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  const propsFile = path.join(CACHE, "render", `${projectId}-props.json`);
  fs.writeFileSync(propsFile, JSON.stringify({ project }));
  const output = path.join(OUT, `${projectId}.mp4`);
  const args = [
    "remotion",
    "render",
    "EditorProject",
    output,
    `--props=${propsFile}`,
    "--codec=h264",
    "--crf=18",
    "--audio-bitrate=320k",
  ];
  if (fs.existsSync(BROWSER)) args.push(`--browser-executable=${BROWSER}`);
  const job: RenderJob = {
    id: projectId,
    status: "running",
    progress: 0,
    output: path.relative(ROOT, output),
    log: "",
  };
  renders.set(projectId, job);
  const child = spawn(process.execPath, [REMOTION_CLI, ...args.slice(1)], {
    cwd: ROOT,
  });
  const onData = (d: Buffer) => {
    const s = d.toString();
    job.log = (job.log + s).slice(-4000);
    const m =
      [...s.matchAll(/Rendered (\d+)\/(\d+)/g)].pop() ??
      [...s.matchAll(/(\d+)\/(\d+)/g)].pop();
    if (m) job.progress = Math.min(0.99, Number(m[1]) / Number(m[2]));
  };
  child.stdout.on("data", onData);
  child.stderr.on("data", onData);
  child.on("close", (code) => {
    job.status = code === 0 ? "done" : "error";
    if (code === 0) job.progress = 1;
  });
  return job;
};

// ---------- router ----------
const handle = async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const p = url.pathname;
  const m = req.method ?? "GET";

  if (p === "/api/projects" && m === "GET") {
    fs.mkdirSync(PROJECTS, { recursive: true });
    const list = fs
      .readdirSync(PROJECTS)
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        const d = JSON.parse(fs.readFileSync(path.join(PROJECTS, f), "utf8"));
        return { id: d.id, name: d.name, updatedAt: d.updatedAt };
      });
    return json(res, list);
  }
  const pm = p.match(/^\/api\/projects\/([\w-]+)$/);
  if (pm) {
    const id = safeId(pm[1]);
    const file = path.join(PROJECTS, `${id}.json`);
    if (m === "GET") {
      if (!fs.existsSync(file)) return json(res, { error: "not found" }, 404);
      res.setHeader("Content-Type", "application/json");
      return res.end(fs.readFileSync(file));
    }
    if (m === "PUT") {
      const body = await readBody(req);
      const data = JSON.parse(body.toString("utf8"));
      if (data.id !== id) return json(res, { error: "id mismatch" }, 400);
      // Rolling backups (one per minute, keep 30) before overwriting.
      if (fs.existsSync(file)) {
        fs.mkdirSync(HISTORY, { recursive: true });
        const stamp = new Date()
          .toISOString()
          .slice(0, 16)
          .replace(/[:T]/g, "-");
        fs.copyFileSync(file, path.join(HISTORY, `${id}-${stamp}.json`));
        const old = fs
          .readdirSync(HISTORY)
          .filter((f) => f.startsWith(`${id}-`))
          .sort();
        for (const f of old.slice(0, Math.max(0, old.length - 30)))
          fs.unlinkSync(path.join(HISTORY, f));
      }
      const tmp = `${file}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify(data, null, 1));
      fs.renameSync(tmp, file);
      return json(res, { ok: true, savedAt: new Date().toISOString() });
    }
  }

  if (p === "/api/presets") {
    if (m === "GET") {
      if (!fs.existsSync(PRESETS))
        return json(res, { version: 1, presets: [] });
      res.setHeader("Content-Type", "application/json");
      return res.end(fs.readFileSync(PRESETS));
    }
    if (m === "PUT") {
      const body = await readBody(req);
      JSON.parse(body.toString("utf8"));
      fs.mkdirSync(path.dirname(PRESETS), { recursive: true });
      fs.writeFileSync(PRESETS, body);
      return json(res, { ok: true });
    }
  }

  if (p === "/api/fonts" && m === "GET") return json(res, listFonts());
  if (p === "/api/fonts" && m === "POST") {
    const name = safeName(url.searchParams.get("name") ?? "font.woff2");
    if (!/\.(woff2?|ttf|otf)$/i.test(name))
      return json(res, { error: "font must be woff2/woff/ttf/otf" }, 400);
    fs.writeFileSync(path.join(FONTS, name), await readBody(req));
    return json(res, listFonts());
  }

  if (p === "/api/upload" && m === "POST") {
    fs.mkdirSync(MEDIA, { recursive: true });
    const name = safeName(url.searchParams.get("name") ?? "upload");
    let dest = path.join(MEDIA, name);
    fs.writeFileSync(dest, await readBody(req));
    const probe = ffprobe(dest);
    const v = probe?.streams.find(
      (s) =>
        s.codec_type === "video" &&
        s.codec_name !== "mjpeg" &&
        s.codec_name !== "png",
    );
    const a = probe?.streams.find((s) => s.codec_type === "audio");
    const isImage = /\.(png|jpe?g|webp|gif|svg)$/i.test(name);
    let kind: "video" | "image" | "audio" = isImage
      ? "image"
      : v
        ? "video"
        : a
          ? "audio"
          : "image";
    // Normalise video for smooth browser preview: H.264 / SDR / 30fps CFR. Original upload is kept.
    if (
      kind === "video" &&
      v &&
      (v.codec_name !== "h264" ||
        ["arib-std-b67", "smpte2084"].includes(v.color_transfer ?? ""))
    ) {
      const out = dest.replace(/\.[^.]+$/, "") + "-edit.mp4";
      run("ffmpeg", [
        "-v",
        "error",
        "-y",
        "-i",
        dest,
        "-vf",
        "format=yuv420p",
        "-r",
        "30",
        "-c:v",
        "libx264",
        "-crf",
        "18",
        "-preset",
        "fast",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        out,
      ]);
      if (fs.existsSync(out)) dest = out;
    }
    if (isImage) kind = "image";
    const pr = ffprobe(dest);
    const dur = Number(pr?.format.duration ?? 0);
    const vs = pr?.streams.find((s) => s.codec_type === "video");
    return json(res, {
      id: `m_${Date.now().toString(36)}`,
      name,
      kind,
      src: path.relative(PUBLIC, dest).split(path.sep).join("/"),
      durationInFrames:
        kind === "image" ? undefined : Math.max(1, Math.round(dur * 30)),
      width: vs?.width,
      height: vs?.height,
    });
  }

  if (p === "/api/library" && m === "GET") {
    // Built-in reusable assets: sfx + media folder.
    const list = (dir: string) =>
      fs.existsSync(path.join(PUBLIC, dir))
        ? fs
            .readdirSync(path.join(PUBLIC, dir))
            .filter((f) => !f.startsWith(".") && !f.endsWith(".txt"))
            .map((f) => `${dir}/${f}`)
        : [];
    const withDur = (src: string) => {
      const pr = ffprobe(path.join(PUBLIC, src));
      return {
        src,
        durationInFrames: Math.max(
          1,
          Math.round(Number(pr?.format.duration ?? 1) * 30),
        ),
      };
    };
    return json(res, {
      sfx: list("sfx").map(withDur),
      music: list("music").map(withDur),
    });
  }

  if (p === "/api/waveform" && m === "GET") {
    const data = waveform(url.searchParams.get("src") ?? "");
    return data ? json(res, data) : json(res, { error: "no audio" }, 404);
  }

  if (p === "/api/proxy" && m === "GET") {
    const proxy = await ensureProxy(url.searchParams.get("src") ?? "");
    return proxy
      ? json(res, { proxy })
      : json(res, { error: "cannot create proxy" }, 404);
  }

  if (p === "/api/transcribe" && m === "POST") {
    const {
      src,
      model = "medium",
      language = "ar",
    } = JSON.parse((await readBody(req)).toString("utf8"));
    const existing = transcribes.get(src);
    if (existing?.status === "running") return json(res, existing);
    return json(res, startTranscribe(src, model, language));
  }
  if (p === "/api/transcribe" && m === "GET") {
    return json(
      res,
      transcribes.get(url.searchParams.get("src") ?? "") ?? { status: "idle" },
    );
  }

  if (p === "/api/render" && m === "POST") {
    const { projectId } = JSON.parse((await readBody(req)).toString("utf8"));
    const existing = renders.get(projectId);
    if (existing?.status === "running") return json(res, existing);
    return json(res, startRender(safeId(projectId)));
  }
  const rm = p.match(/^\/api\/render\/([\w-]+)$/);
  if (rm && m === "GET")
    return json(res, renders.get(rm[1]) ?? { status: "idle" });

  const om = p.match(/^\/api\/output\/([\w-]+)\.mp4$/);
  if (om && m === "GET") {
    const f = path.join(OUT, `${safeId(om[1])}.mp4`);
    if (!fs.existsSync(f)) return json(res, { error: "not rendered" }, 404);
    res.setHeader("Content-Type", "video/mp4");
    return fs.createReadStream(f).pipe(res);
  }

  json(res, { error: "unknown endpoint" }, 404);
};

export const editorApi = (): Plugin => ({
  name: "editor-api",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url?.startsWith("/api/")) return next();
      handle(req, res).catch((e) => json(res, { error: String(e) }, 500));
    });
  },
});
