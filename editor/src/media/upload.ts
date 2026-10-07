import type { MediaAsset } from "../../../src/engine/types";
import { commit } from "../project/store";

/** Uploads a file into public/media (originals are kept; video is normalised for preview). */
export const uploadFile = async (file: File): Promise<MediaAsset> => {
  const res = await fetch(`/api/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    body: file,
  });
  if (!res.ok) throw new Error(await res.text());
  const asset = (await res.json()) as MediaAsset;
  commit((p) => {
    p.media.push(asset);
  });
  return asset;
};
