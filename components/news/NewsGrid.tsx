"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { NewsItem } from "@/app/data/media";

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-extrabold tracking-tight md:text-xl">
          Press Coverage
        </h2>
        <span className="text-xs text-zinc-500">{items.length} articles</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n) => (
          <Card
            key={n.href}
            className="overflow-hidden transition hover:shadow-md"
          >
            <div className="relative h-36 w-full">
              <Image
                src={n.img ?? "/images/press/placeholder.jpg"}
                alt={n.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {n.tag && (
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold shadow-sm dark:bg-zinc-900/90">
                  {n.tag}
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="text-xs text-zinc-500">
                {n.outlet} • {n.date}
              </div>
              <div className="mt-1 line-clamp-2 font-semibold">{n.title}</div>
              <Link
                href={n.href}
                target="_blank"
                className="mt-3 inline-flex items-center text-sm font-medium text-brand"
              >
                Read <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
