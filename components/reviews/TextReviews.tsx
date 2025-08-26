"use client";

import { Card } from "@/components/ui/card";
import StarRating from "./StarRating";
import type { TextReview } from "@/app/data/reviews";

function Avatar({ name, src }: { name: string; src?: string }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand text-xs font-bold">
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

export default function TextReviews({ items }: { items: TextReview[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((r, idx) => (
        <Card key={idx} className="p-4">
          <div className="flex items-start gap-3">
            <Avatar name={r.name} src={r.avatar} />
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate text-sm font-semibold">{r.name}</div>
                <span className="text-[11px] text-zinc-500">{r.date}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <StarRating value={r.rating} size={14} />
                <span className="text-[11px] text-zinc-500">
                  {r.city ? `${r.city} • ` : ""}
                  {r.project ?? "Project"}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                {r.comment}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
