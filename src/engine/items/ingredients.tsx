import React from "react";

/**
 * Detailed vector illustrations of perfume ingredients (gradients for a realistic look).
 * Each draws in a 200×200 viewBox. Used as card backgrounds and chip icons.
 */
export type IngredientId =
  | "vanilla"
  | "toffee"
  | "cinnamon"
  | "amber"
  | "cedar"
  | "amyris"
  | "cypriol"
  | "pepper"
  | "lavender";

export const INGREDIENT_LABELS: Record<IngredientId, string> = {
  vanilla: "فانيلا",
  toffee: "توفي",
  cinnamon: "قرفة",
  amber: "عنبر",
  cedar: "خشب الأرز",
  amyris: "أميريس",
  cypriol: "سيبريول",
  pepper: "فلفل وردي",
  lavender: "لافندر",
};

const Vanilla: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <linearGradient id={`${id}-pod`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5a3416" />
        <stop offset="0.45" stopColor="#2c1608" />
        <stop offset="0.55" stopColor="#3d200c" />
        <stop offset="1" stopColor="#170a03" />
      </linearGradient>
      <radialGradient id={`${id}-fl`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff6c9" />
        <stop offset="0.6" stopColor="#f3e2a0" />
        <stop offset="1" stopColor="#d8bf6a" />
      </radialGradient>
    </defs>
    {[-22, -8, 6].map((r, i) => (
      <g key={i} transform={`rotate(${r} 100 100)`}>
        <path
          d={`M ${30 + i * 8} 168 C 60 110, 120 60, ${168 - i * 6} 28 C 172 34, 170 38, 166 40 C 128 74, 70 124, ${40 + i * 8} 174 Z`}
          fill={`url(#${id}-pod)`}
        />
        <path
          d={`M ${38 + i * 8} 164 C 70 116, 122 70, ${160 - i * 6} 36`}
          stroke="#7a4a22"
          strokeWidth="1.4"
          fill="none"
          opacity="0.7"
        />
      </g>
    ))}
    <g transform="translate(130 138)">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-17"
          rx="10"
          ry="19"
          fill={`url(#${id}-fl)`}
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="7" fill="#e7b54a" />
    </g>
  </>
);

const Toffee: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <linearGradient id={`${id}-t`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e9a75a" />
        <stop offset="0.5" stopColor="#b9692a" />
        <stop offset="1" stopColor="#7a3f14" />
      </linearGradient>
      <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8a4a18" />
        <stop offset="1" stopColor="#5e2f0c" />
      </linearGradient>
    </defs>
    {[
      [28, 92, 0],
      [96, 70, 8],
      [70, 128, -6],
    ].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <path d="M0 14 L48 0 L76 14 L28 28 Z" fill="#f2bd76" />
        <path d="M0 14 L28 28 L28 70 L0 56 Z" fill={`url(#${id}-s)`} />
        <path d="M28 28 L76 14 L76 56 L28 70 Z" fill={`url(#${id}-t)`} />
        <path
          d="M34 34 L68 24"
          stroke="#fff3d6"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>
    ))}
  </>
);

const Cinnamon: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <linearGradient id={`${id}-c`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b56a3a" />
        <stop offset="0.5" stopColor="#8a4523" />
        <stop offset="1" stopColor="#5a2a12" />
      </linearGradient>
    </defs>
    {[
      [20, 70, -18],
      [26, 100, -10],
      [34, 128, -2],
    ].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <rect
          x="0"
          y="0"
          width="150"
          height="24"
          rx="12"
          fill={`url(#${id}-c)`}
        />
        {[18, 46, 80, 112, 136].map((lx) => (
          <path
            key={lx}
            d={`M${lx} 3 q 4 9 0 18`}
            stroke="#4a210d"
            strokeWidth="1.6"
            fill="none"
            opacity="0.6"
          />
        ))}
        <ellipse cx="150" cy="12" rx="9" ry="12" fill="#6b3216" />
        <path
          d="M150 12 m -6 0 a 6 7 0 1 1 6 7 a 3 4 0 1 1 -3 -4"
          stroke="#d08a55"
          strokeWidth="1.6"
          fill="none"
        />
      </g>
    ))}
  </>
);

const Amber: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <radialGradient id={`${id}-a`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffe08a" />
        <stop offset="0.45" stopColor="#f0a020" />
        <stop offset="1" stopColor="#9c4a05" />
      </radialGradient>
    </defs>
    {[
      "M40 120 L70 70 L110 80 L120 130 L80 160 Z",
      "M110 60 L150 40 L176 80 L150 110 L118 96 Z",
      "M120 140 L156 118 L182 150 L160 182 L126 172 Z",
    ].map((d, i) => (
      <g key={i}>
        <path d={d} fill={`url(#${id}-a)`} opacity="0.95" />
        <path
          d={d}
          fill="none"
          stroke="#ffd56b"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </g>
    ))}
    <circle cx="74" cy="92" r="6" fill="#fff6d6" opacity="0.8" />
    <circle cx="140" cy="62" r="4" fill="#fff6d6" opacity="0.8" />
  </>
);

const WoodSlice: React.FC<{ id: string; tone: [string, string, string] }> = ({
  id,
  tone,
}) => (
  <>
    <defs>
      <radialGradient id={`${id}-w`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={tone[0]} />
        <stop offset="0.85" stopColor={tone[1]} />
        <stop offset="1" stopColor={tone[2]} />
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="112" rx="84" ry="70" fill={tone[2]} />
    <ellipse cx="100" cy="100" rx="84" ry="70" fill={`url(#${id}-w)`} />
    {[14, 26, 38, 50, 62].map((r) => (
      <ellipse
        key={r}
        cx={100 + r * 0.06}
        cy={100}
        rx={r}
        ry={r * 0.83}
        fill="none"
        stroke={tone[2]}
        strokeWidth="2"
        opacity="0.45"
      />
    ))}
    <path d="M100 100 L170 74" stroke={tone[2]} strokeWidth="3" opacity="0.5" />
  </>
);

const WoodChips: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <linearGradient id={`${id}-ch`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d9b07a" />
        <stop offset="1" stopColor="#8a5a2c" />
      </linearGradient>
    </defs>
    {[
      [30, 60, 20],
      [90, 40, -30],
      [60, 110, 50],
      [120, 100, -10],
      [100, 150, 30],
    ].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <path d="M0 0 L60 -6 L66 14 L4 22 Z" fill={`url(#${id}-ch)`} />
        <path
          d="M6 6 L58 1 M8 14 L60 9"
          stroke="#7a4c22"
          strokeWidth="1.2"
          opacity="0.6"
        />
      </g>
    ))}
  </>
);

const Roots: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <linearGradient id={`${id}-r`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8a6a46" />
        <stop offset="1" stopColor="#3e2a18" />
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="58" rx="40" ry="26" fill={`url(#${id}-r)`} />
    {[-40, -24, -8, 8, 24, 40].map((dx, i) => (
      <path
        key={i}
        d={`M${100 + dx * 0.6} 70 C ${100 + dx} 110, ${100 + dx * 1.6} 140, ${100 + dx * 2} 184`}
        stroke="#5a3d22"
        strokeWidth={5 - i * 0.4}
        fill="none"
        strokeLinecap="round"
      />
    ))}
  </>
);

const Pepper: React.FC<{ id: string }> = () => (
  <>
    {Array.from({ length: 14 }, (_, i) => {
      const x = 40 + ((i * 53) % 120);
      const y = 40 + ((i * 37) % 120);
      return (
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#c43a5a" />
          <circle cx={x - 4} cy={y - 4} r="4" fill="#ff9ab0" opacity="0.7" />
        </g>
      );
    })}
  </>
);

const Lavender: React.FC<{ id: string }> = () => (
  <>
    {[60, 100, 140].map((x, k) => (
      <g key={x}>
        <path
          d={`M${x} 190 L${x + (k - 1) * 10} 40`}
          stroke="#5b7a3a"
          strokeWidth="3"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse
            key={i}
            cx={x + (k - 1) * 10 * (1 - i / 9) + (i % 2 ? 6 : -6)}
            cy={50 + i * 10}
            rx="6"
            ry="8"
            fill={i % 2 ? "#8e6ad6" : "#a888ea"}
          />
        ))}
      </g>
    ))}
  </>
);

export const IngredientArt: React.FC<{
  id: IngredientId;
  uid: string;
  size: number;
  style?: React.CSSProperties;
}> = ({ id, uid, size, style }) => {
  const key = `${uid}-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={style}>
      {id === "vanilla" && <Vanilla id={key} />}
      {id === "toffee" && <Toffee id={key} />}
      {id === "cinnamon" && <Cinnamon id={key} />}
      {id === "amber" && <Amber id={key} />}
      {id === "cedar" && (
        <WoodSlice id={key} tone={["#e2b27c", "#b97a43", "#6e3f1c"]} />
      )}
      {id === "amyris" && <WoodChips id={key} />}
      {id === "cypriol" && <Roots id={key} />}
      {id === "pepper" && <Pepper id={key} />}
      {id === "lavender" && <Lavender id={key} />}
    </svg>
  );
};
