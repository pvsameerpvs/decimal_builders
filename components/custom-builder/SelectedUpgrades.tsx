"use client";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type SensorDescriptor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import FeatureCard from "@/components/custom-builder/FeatureCard";
import { findAddon } from "@/app/data/calc/customPricing";
import previewImpact from "@/app/data/calc/previewImpact";
import { Button } from "@/components/ui/button";

type Props = {
  selectedIds: string[];
  basePkg: any;
  builtUpSqft: number;
  coveredSqft: number;
  openSqft: number;
  effectiveSqft: number;
  sensors: SensorDescriptor<any>[];
  onDragEnd: (e: DragEndEvent) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  className?: string;
};

export default function SelectedUpgrades({
  selectedIds,
  basePkg,
  builtUpSqft,
  coveredSqft,
  openSqft,
  effectiveSqft,
  sensors,
  onDragEnd,
  onRemove,
  onClear,
  className,
}: Props) {
  return (
    <section className={className ?? ""}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Selected upgrades</div>
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={selectedIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-2">
              {selectedIds.map((id) => {
                const a = findAddon(id)!;
                return (
                  <FeatureCard
                    key={id}
                    id={id}
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
                    mode="selected"
                    onRemove={() => onRemove(id)}
                  />
                );
              })}
              {selectedIds.length === 0 && (
                <div className="rounded-lg border p-3 text-sm text-zinc-500">
                  Drag to reorder after you add items. Reordering is optional.
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}
