"use client";

import type { VideoReview } from "@/app/data/reviews";

function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default function VideoTestimonials({ items }: { items: VideoReview[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((v) => (
        <div key={v.youtubeId} className="space-y-2">
          <YouTube id={v.youtubeId} title={v.title} />
          <div className="text-sm font-semibold">{v.title}</div>
          {v.date && <div className="text-xs text-zinc-500">{v.date}</div>}
        </div>
      ))}
    </div>
  );
}
