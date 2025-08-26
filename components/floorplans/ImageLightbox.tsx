"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
  if (!plan) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{plan.title}</span>
            {plan.vastu && <Badge variant="secondary">Vastu</Badge>}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={plan.img}
              alt={plan.title}
              fill
              className="object-cover"
            />
          </div>
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
