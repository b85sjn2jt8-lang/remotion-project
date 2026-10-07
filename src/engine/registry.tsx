import type React from "react";
import { CompareCard } from "../videos/Ray391/CompareCard";
import { CouponCard } from "../videos/Ray391/CouponCard";
import { HookPrices } from "../videos/Ray391/HookPrices";
import { PriceCard } from "../videos/Ray391/PriceCard";

/**
 * Hand-built scenes from the code base that the editor can place on the timeline as a block.
 * They keep their own internal motion; the editor controls timing, position, scale and opacity.
 * Register new code-built scenes here to make them available in the editor's library.
 */
export const COMPONENT_REGISTRY: Record<
  string,
  { label: string; component: React.FC; defaultDuration: number }
> = {
  "ray391.hookPrices": {
    label: "Ray391 · Hook prices",
    component: HookPrices,
    defaultDuration: 186,
  },
  "ray391.coupon": {
    label: "Ray391 · Coupon 15%",
    component: CouponCard,
    defaultDuration: 66,
  },
  "ray391.compare": {
    label: "Ray391 · Cheapest vs original",
    component: CompareCard,
    defaultDuration: 66,
  },
  "ray391.price": {
    label: "Ray391 · Price 500 → 420",
    component: PriceCard,
    defaultDuration: 304,
  },
};
