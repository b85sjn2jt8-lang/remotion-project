import React from "react";
import { useEditor } from "../../project/store";
import { dragProps } from "../payloads";
import { STICKERS } from "../stickers";

export const StickersTab: React.FC = () => {
  const g = useEditor((s) => s.project!.global);
  return (
    <>
      <div className="panel-head">Stickers</div>
      <div className="lib-grid">
        {STICKERS.map((s) => {
          const st = s.style(g);
          return (
            <div
              key={s.id}
              className="lib-card"
              {...dragProps({ kind: "sticker", id: s.id })}
            >
              <div className="thumb">
                <span
                  style={{
                    fontFamily: `"${st.fontFamily ?? "Tajawal"}"`,
                    fontWeight: st.fontWeight,
                    fontSize: Math.min(30, (st.fontSize ?? 50) / 3),
                    color: st.color,
                    rotate: `${s.rotation}deg`,
                    background: st.background?.enabled
                      ? st.background.color
                      : undefined,
                    opacity: 1,
                    borderRadius: st.background?.enabled
                      ? Math.min(10, st.background.radius / 3)
                      : 0,
                    padding: st.background?.enabled ? "2px 10px" : 0,
                    WebkitTextStroke: st.strokeWidth
                      ? `1px ${st.strokeColor}`
                      : undefined,
                  }}
                >
                  {s.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
