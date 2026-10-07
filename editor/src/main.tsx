import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<App />);

// Dev-only handle for automated UI tests.
if (import.meta.env.DEV) {
  void Promise.all([
    import("./project/store"),
    import("./project/playback"),
  ]).then(([store, playback]) => {
    (window as unknown as Record<string, unknown>).__editor = {
      ...store,
      ...playback,
    };
  });
}
