"use client";

import type { ShortReview } from "@/app/data/reviews";

function YouTubeShort({ id, title }: { id: string; title?: string }) {
  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title || "YouTube Short"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default function ShortsGrid({ items }: { items: ShortReview[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((s, i) => (
        <div key={i} className="space-y-2">
          <YouTubeShort id={s.youtubeId} title={s.title} />
          {s.title && <div className="text-sm font-semibold">{s.title}</div>}
          {s.date && <div className="text-xs text-zinc-500">{s.date}</div>}
        </div>
      ))}
    </div>
  );
}
