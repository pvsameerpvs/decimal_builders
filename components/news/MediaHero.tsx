"use client";

import Link from "next/link";
import { SOCIAL } from "@/app/data/media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Instagram, Youtube } from "lucide-react";

export default function MediaHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white to-brand/10 dark:from-zinc-950 dark:to-brand/10" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full brand-bg opacity-20 blur-3xl" />

      <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:gap-10 md:p-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2">
            <Badge className="bg-brand/10 text-brand hover:bg-brand/10">
              <Megaphone className="mr-1 h-3.5 w-3.5" />
              Press & Social
            </Badge>
          </div>

          <h1 className="h-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            News & Media
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300 md:text-[15px]">
            See what the press is saying, watch our site walkthroughs, and
            browse project updates from Instagram and YouTube.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={SOCIAL.instagram} target="_blank">
              <Button size="sm" variant="outline" className="brand-border">
                <Instagram className="mr-2 h-4 w-4" />
                Follow on Instagram
              </Button>
            </Link>
            <Link href={SOCIAL.youtube} target="_blank">
              <Button size="sm">
                <Youtube className="mr-2 h-4 w-4" />
                Subscribe on YouTube
              </Button>
            </Link>
          </div>
        </div>

        {/* small stat blocks */}
        <div className="grid grid-cols-2 gap-3 self-end md:w-72">
          {[
            { k: "250+", v: "Projects Delivered" },
            { k: "48 hrs", v: "Press Response" },
            { k: "4.9/5", v: "Customer Rating" },
            { k: "3 yrs", v: "Structural Warranty" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-xl bg-white/70 p-3 text-center shadow-sm ring-1 ring-black/5 dark:bg-zinc-900/70 dark:ring-white/10"
            >
              <div className="h-heading text-lg font-extrabold">{s.k}</div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-300">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
