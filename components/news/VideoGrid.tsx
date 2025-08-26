"use client";

import type { VideoItem } from "@/app/data/media";

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

export default function VideoGrid({ items }: { items: VideoItem[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-extrabold tracking-tight md:text-xl">
          Latest Videos
        </h2>
        <span className="text-xs text-zinc-500">{items.length} videos</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((v) => (
          <div key={v.youtubeId} className="space-y-2">
            <YouTube id={v.youtubeId} title={v.title} />
            <div className="text-sm font-semibold">{v.title}</div>
            {v.date && <div className="text-xs text-zinc-500">{v.date}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
