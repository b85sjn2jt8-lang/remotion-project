import { useEffect } from "react";
import { create } from "zustand";
import { useEditor } from "../project/store";

/** Preview-only proxy map (original src → proxy src in public/proxies). */
export const useProxies = create<{
  enabled: boolean;
  map: Record<string, string>;
  pending: string[];
}>(() => ({
  enabled: localStorage.getItem("reels-editor:proxy") !== "off",
  map: {},
  pending: [],
}));

export const setProxyEnabled = (enabled: boolean) => {
  localStorage.setItem("reels-editor:proxy", enabled ? "on" : "off");
  useProxies.setState({ enabled });
};

const requested = new Set<string>();

/** Requests proxies for every video used in the project (generated once, cached on disk). */
export const useProxyGeneration = () => {
  const srcs = useEditor((s) =>
    [
      ...new Set(
        (s.project?.items ?? [])
          .filter((i) => i.type === "video" || i.type === "brollVideo")
          .map((i) => (i as { src: string }).src),
      ),
    ].join("|"),
  );
  useEffect(() => {
    for (const src of srcs.split("|").filter(Boolean)) {
      if (requested.has(src)) continue;
      requested.add(src);
      useProxies.setState((s) => ({ pending: [...s.pending, src] }));
      fetch(`/api/proxy?src=${encodeURIComponent(src)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d: { proxy?: string } | null) =>
          useProxies.setState((s) => ({
            map: d?.proxy ? { ...s.map, [src]: d.proxy } : s.map,
            pending: s.pending.filter((p) => p !== src),
          })),
        )
        .catch(() =>
          useProxies.setState((s) => ({
            pending: s.pending.filter((p) => p !== src),
          })),
        );
    }
  }, [srcs]);
};
