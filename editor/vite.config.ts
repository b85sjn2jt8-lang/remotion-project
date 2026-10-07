import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { editorApi } from "./server/api";

// The editor app. public/ of the Remotion project is served at "/", so staticFile() paths
// resolve identically in the editor preview and in the Remotion render.
export default defineConfig({
  root: __dirname,
  publicDir: path.resolve(__dirname, "../public"),
  plugins: [react(), editorApi()],
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ["**/projects/**", "**/presets/**", "**/.cache/**", "**/out/**"],
    },
  },
  resolve: { dedupe: ["react", "react-dom", "remotion"] },
});
