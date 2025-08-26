"use client";

import { Star } from "lucide-react";

export default function StarRating({
  value,
  outOf = 5,
  size = 16,
  className = "",
}: {
  value: number;
  outOf?: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(value);
  const frac = value - full >= 0.75 ? 1 : value - full >= 0.25 ? 0.5 : 0;
  const stars = Array.from({ length: outOf });

  return (
    <div className={["inline-flex items-center", className].join(" ")}>
      {stars.map((_, i) => {
        const idx = i + 1;
        const filled = idx <= full;
        const isPartial = !filled && idx === full + 1 && frac > 0;
        return (
          <span
            key={i}
            className="relative inline-block"
            style={{ width: size, height: size }}
          >
            {/* base outline */}
            <Star
              width={size}
              height={size}
              className="text-zinc-300 dark:text-zinc-600"
              strokeWidth={2}
            />
            {/* full fill */}
            {filled && (
              <Star
                width={size}
                height={size}
                className="absolute left-0 top-0 text-amber-500"
                stroke="currentColor"
                fill="currentColor"
              />
            )}
            {/* half/partial fill */}
            {isPartial && (
              <Star
                width={size}
                height={size}
                className="absolute left-0 top-0 text-amber-500"
                stroke="currentColor"
                fill="currentColor"
                style={{
                  clipPath: `inset(0 ${frac === 0.5 ? "50%" : "0"} 0 0)`,
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
