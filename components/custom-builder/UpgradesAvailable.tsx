"use client";

import FeatureCard from "@/components/custom-builder/FeatureCard";
import type { Addon } from "@/app/data/customAddons";
import previewImpact from "@/app/data/calc/previewImpact";

type Props = {
  available: Addon[];
  basePkg: any;
  builtUpSqft: number;
  coveredSqft: number;
  openSqft: number;
  effectiveSqft: number;
  onAdd: (id: string) => void;
  className?: string;
};

export default function UpgradesAvailable({
  available,
  basePkg,
  builtUpSqft,
  coveredSqft,
  openSqft,
  effectiveSqft,
  onAdd,
  className,
}: Props) {
  return (
    <section className={className ?? ""}>
      <div className="space-y-3">
        <div className="text-sm font-semibold">Available upgrades</div>
        <div className="grid gap-2">
          {available.map((a) => (
            <FeatureCard
              key={a.id}
              id={a.id}
              title={a.title}
              description={a.description}
              category={a.category}
              impact={previewImpact(
                a,
                basePkg,
                builtUpSqft,
                coveredSqft,
                openSqft,
                effectiveSqft
              )}
              mode="available"
              onAdd={() => onAdd(a.id)}
            />
          ))}
          {available.length === 0 && (
            <div className="rounded-lg border p-3 text-sm text-zinc-500">
              All compatible upgrades are selected.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
