"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BedDouble, Maximize2, Ruler, Layers, Compass } from "lucide-react";
import ImageLightbox from "@/components/floorplans/ImageLightbox";
import MediaChips from "@/components/floorplans/MediaChips";

export type Plan = {
  id: string;
  title: string;
  img: string;
  plotSqft: number;
  floors: number; // G+X => floors = X+1
  bedrooms: number;
  facing:
    | "North"
    | "South"
    | "East"
    | "West"
    | "North East"
    | "South East"
    | "North West"
    | "South West";
  type: "Residential" | "Commercial" | "Mixed";
  budgetAED: number;
  vastu: boolean;
  tags: string[];
  media?: {
    design?: string[];
    floorplan?: string[];
    render3d?: string[];
    pdf?: string[];
  };
};

export default function PlanGrid({ plans }: { plans: Plan[] }) {
  const [open, setOpen] = useState<Plan | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <button
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm ring-1 ring-black/5 transition hover:bg-white dark:bg-zinc-900/90"
                onClick={() => setOpen(p)}
                aria-label="Open preview"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="truncate pr-2">{p.title}</span>
                {p.vastu && (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                    Vastu
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-[13px]">
                {p.type} · {p.facing}
              </CardDescription>
              {/* NEW: show media availability */}
              <MediaChips media={p.media} />
            </CardHeader>

            <CardContent>
              <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <Ruler className="h-4 w-4" /> {p.plotSqft} sq ft
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="h-4 w-4" /> G+{p.floors - 1}
                </li>
                <li className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4" /> {p.bedrooms} BHK
                </li>
                <li className="flex items-center gap-2">
                  <Compass className="h-4 w-4" /> {p.facing}
                </li>
              </ul>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-bold">
                  AED {p.budgetAED.toLocaleString()}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="brand-border"
                  onClick={() => setOpen(p)}
                >
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ImageLightbox
        open={!!open}
        onOpenChange={(v) => !v && setOpen(null)}
        plan={open ?? undefined}
      />
    </>
  );
}
