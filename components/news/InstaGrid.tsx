"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import type { InstaItem } from "@/app/data/media";

export default function InstaGrid({ items }: { items: InstaItem[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-extrabold tracking-tight md:text-xl">
          Instagram Highlights
        </h2>
        <span className="text-xs text-zinc-500">{items.length} posts</span>
      </div>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {items.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            target="_blank"
            aria-label={p.alt ?? "Instagram post"}
            className="group relative block overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20"
          >
            <Image
              src={p.img}
              alt={p.alt ?? "Instagram post"}
              width={500}
              height={500}
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
              <Instagram className="h-6 w-6 text-white drop-shadow" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
