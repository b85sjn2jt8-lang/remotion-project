import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const frames = process.argv[3].split(",").map(Number);
const outDir = process.argv[2];
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browserExecutable = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const composition = await selectComposition({ serveUrl, id: "StoreLoop", browserExecutable });
for (const f of frames) {
  await renderStill({ composition, serveUrl, frame: f, output: `${outDir}/f${String(f).padStart(4, "0")}.jpg`, imageFormat: "jpeg", jpegQuality: 90, browserExecutable });
  console.log("still", f);
}
