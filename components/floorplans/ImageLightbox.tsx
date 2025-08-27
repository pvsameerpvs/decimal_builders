"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Ruler, Layers, BedDouble, Compass } from "lucide-react";
import type { Plan } from "@/components/floorplans/PlanGrid";

export default function ImageLightbox({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  plan?: Plan;
}) {
  const groups = useMemo(() => {
    if (!plan?.media) return [];
    return [
      {
        key: "design",
        label: "Design",
        items: plan.media.design ?? [],
        kind: "img" as const,
      },
      {
        key: "floorplan",
        label: "Floor Plan",
        items: plan.media.floorplan ?? [],
        kind: "img" as const,
      },
      {
        key: "render3d",
        label: "3D Images",
        items: plan.media.render3d ?? [],
        kind: "img" as const,
      },
      {
        key: "pdf",
        label: "PDF",
        items: plan.media.pdf ?? [],
        kind: "pdf" as const,
      },
    ].filter((g) => g.items.length > 0);
  }, [plan]);

  const [tab, setTab] = useState<string>(groups[0]?.key ?? "info");
  useEffect(() => setTab(groups[0]?.key ?? "info"), [plan, groups]);

  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="truncate">{plan.title}</span>
            {plan.vastu && <Badge variant="secondary">Vastu</Badge>}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          {/* Media area */}
          <div className="min-w-0">
            {groups.length ? (
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="mb-3">
                  {groups.map((g) => (
                    <TabsTrigger key={g.key} value={g.key}>
                      {g.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {groups.map((g) => (
                  <TabsContent key={g.key} value={g.key} className="mt-0">
                    {g.kind === "img" ? (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
                        {g.items.map((src, i) => (
                          <div
                            key={src + i}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg"
                          >
                            <Image
                              src={src}
                              alt={`${plan.title} – ${g.label} ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 50vw, 100vw"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative h-[60vh] overflow-hidden rounded-lg border">
                        <embed
                          src={g.items[0]}
                          type="application/pdf"
                          className="h-full w-full"
                        />
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              // Fallback to cover image when no grouped media yet
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={plan.img}
                  alt={plan.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <Info
                icon={<Ruler className="h-4 w-4" />}
                label="Plot"
                value={`${plan.plotSqft} sq ft`}
              />
              <Info
                icon={<Layers className="h-4 w-4" />}
                label="Floors"
                value={`G+${plan.floors - 1}`}
              />
              <Info
                icon={<BedDouble className="h-4 w-4" />}
                label="Bedrooms"
                value={`${plan.bedrooms} BHK`}
              />
              <Info
                icon={<Compass className="h-4 w-4" />}
                label="Facing"
                value={plan.facing}
              />
            </div>
            <div className="font-semibold">
              Approx. Budget: AED {plan.budgetAED.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              Tags: {plan.tags.join(", ")}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-2">
      {icon}
      <div>
        <div className="text-[11px] text-zinc-500">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
