import { icons } from "lucide-react";
import React, { useMemo, useState } from "react";
import { dragProps } from "../payloads";

const FEATURED = [
  "Zap",
  "BatteryCharging",
  "Cable",
  "Smartphone",
  "Laptop",
  "Headphones",
  "Camera",
  "Wifi",
  "Bluetooth",
  "Cpu",
  "ShieldCheck",
  "BadgeCheck",
  "Star",
  "Heart",
  "ThumbsUp",
  "Flame",
  "Sparkles",
  "Gift",
  "Tag",
  "Percent",
  "ShoppingCart",
  "ShoppingBag",
  "Truck",
  "Package",
  "CreditCard",
  "Wallet",
  "Clock",
  "Timer",
  "Calendar",
  "MapPin",
  "Phone",
  "MessageCircle",
  "Send",
  "Bell",
  "Eye",
  "Search",
  "TrendingUp",
  "TrendingDown",
  "ArrowBigRight",
  "ArrowBigDown",
  "Check",
  "X",
  "CircleAlert",
  "Info",
  "Crown",
  "Trophy",
  "Rocket",
  "Coffee",
  "Utensils",
  "Pizza",
];

export const IconsTab: React.FC = () => {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    if (!q.trim()) return FEATURED;
    const s = q.toLowerCase();
    return Object.keys(icons)
      .filter((n) => n.toLowerCase().includes(s))
      .slice(0, 80);
  }, [q]);
  return (
    <>
      <div className="panel-head">Icons</div>
      <div style={{ padding: "0 14px 8px" }}>
        <input
          className="text-input"
          placeholder="Search 1,500+ icons…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 6,
          padding: "0 14px 14px",
        }}
      >
        {list.map((name) => {
          const Icon = icons[name as keyof typeof icons];
          if (!Icon) return null;
          return (
            <div
              key={name}
              className="lib-card"
              style={{
                height: 46,
                alignItems: "center",
                justifyContent: "center",
              }}
              data-tip={name}
              {...dragProps({ kind: "icon", name })}
            >
              <Icon size={20} />
            </div>
          );
        })}
      </div>
    </>
  );
};
