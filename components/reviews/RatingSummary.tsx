"use client";

import { Card } from "@/components/ui/card";
import StarRating from "./StarRating";

export default function RatingSummary({
  avg,
  total,
  dist, // {5:number,4:number,...}
}: {
  avg: number;
  total: number;
  dist: Record<1 | 2 | 3 | 4 | 5, number>;
}) {
  const maxCount = Math.max(...Object.values(dist), 1);

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-extrabold">
            {avg.toFixed(1)}
            <span className="text-lg text-zinc-500">/5</span>
          </div>
          <StarRating value={avg} size={18} className="mt-1" />
          <div className="mt-1 text-xs text-zinc-500">{total} reviews</div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = dist[star as 1 | 2 | 3 | 4 | 5] ?? 0;
          const w = Math.round((count / maxCount) * 100);
          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <div className="w-6 text-right font-medium">{star}★</div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full bg-amber-500"
                  style={{ width: `${w}%` }}
                />
              </div>
              <div className="w-8 text-right text-zinc-500">{count}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
