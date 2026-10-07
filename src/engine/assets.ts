import { createContext, useContext } from "react";
import { staticFile } from "remotion";

/** Media paths in project data are relative to public/ (e.g. "footage/a.mp4"). */
export const assetUrl = (src: string) =>
  /^(https?:|blob:|data:)/.test(src) || src.startsWith("/")
    ? src
    : staticFile(src);

/**
 * Optional src → proxy src map. The editor preview passes lightweight proxies here for smooth
 * scrubbing; final renders pass nothing and always use the original media.
 */
export const ProxyContext = createContext<Record<string, string>>({});

export const useMediaUrl = (src: string) => {
  const proxies = useContext(ProxyContext);
  return assetUrl(proxies[src] ?? src);
};
