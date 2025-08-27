// components/custom-builder/BuilderClient.tsx
"use client";

import { useMemo, useState } from "react";
import { DECIMAL_PACKAGES, type PackageName } from "@/app/data/decimalPackages";
import { CUSTOM_ADDONS } from "@/app/data/customAddons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

import {
  BuilderState,
  calcTotal,
  findAddon,
  findBase,
} from "@/app/data/calc/customPricing";

import BasePackageSelector from "@/components/custom-builder/BasePackageSelector";
import BuiltUpInput from "@/components/custom-builder/BuiltUpInput";
import OpenAreaInput from "@/components/custom-builder/OpenAreaInput";
import UpgradesAvailable from "@/components/custom-builder/UpgradesAvailable";
import SelectedUpgrades from "@/components/custom-builder/SelectedUpgrades";
import PriceSummary from "@/components/custom-builder/PriceSummary";
import CTAButtons from "@/components/custom-builder/CTAButtons";
import previewImpact from "@/app/data/calc/previewImpact";
import { Wrench } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

export default function BuilderClient() {
  const [state, setState] = useState<BuilderState>({
    base: "Enhanced",
    builtUpSqft: 2400,
    openAreaSqft: 0,
    selectedIds: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const available = useMemo(() => {
    const selected = new Set(state.selectedIds);
    const conflicts = new Set<string>();
    for (const id of state.selectedIds) {
      const ad = findAddon(id);
      ad?.conflicts?.forEach((c) => conflicts.add(c));
    }
    return CUSTOM_ADDONS.filter(
      (a) => !selected.has(a.id) && !conflicts.has(a.id)
    );
  }, [state.selectedIds]);

  const basePkg = findBase(state.base);
  const breakdown = calcTotal(state);

  const openSqft = Math.min(
    Math.max(0, state.openAreaSqft),
    Math.max(0, state.builtUpSqft)
  );
  const coveredSqft = Math.max(0, state.builtUpSqft - openSqft);
  const effectiveSqft = coveredSqft + openSqft * 0.65;

  function add(id: string) {
    setState((s) => ({ ...s, selectedIds: [...s.selectedIds, id] }));
  }
  function remove(id: string) {
    setState((s) => ({
      ...s,
      selectedIds: s.selectedIds.filter((x) => x !== id),
    }));
  }

  function onDragEnd(e: any) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = state.selectedIds.indexOf(String(active.id));
    const newIdx = state.selectedIds.indexOf(String(over.id));
    if (oldIdx >= 0 && newIdx >= 0) {
      setState((s) => ({
        ...s,
        selectedIds: arrayMove(s.selectedIds, oldIdx, newIdx),
      }));
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
          Build your custom package
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Start from a base package, add upgrades, and get a live approximate
          price.
        </p>
      </header>

      {/* Controls */}
      <Card className="overflow-hidden border shadow-sm">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900/40 dark:to-zinc-900/10">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Wrench className="h-4 w-4" />
            Build your package
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Choose a base package and enter built-up + open areas (in sq ft).
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Give the package selector a bit more width on tablets */}
            <div className="sm:col-span-2 lg:col-span-1">
              <BasePackageSelector
                value={state.base}
                onChange={(pkg) =>
                  setState((s) => ({ ...s, base: pkg as PackageName }))
                }
              />
            </div>

            <BuiltUpInput
              value={state.builtUpSqft}
              openAreaSqft={state.openAreaSqft}
              onChange={(nextBuilt, nextOpenClamped) =>
                setState((s) => ({
                  ...s,
                  builtUpSqft: nextBuilt,
                  openAreaSqft: nextOpenClamped,
                }))
              }
            />

            <OpenAreaInput
              value={state.openAreaSqft}
              builtUpSqft={state.builtUpSqft}
              onChange={(v) => setState((s) => ({ ...s, openAreaSqft: v }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-2">
        <UpgradesAvailable
          available={available as any}
          basePkg={basePkg}
          builtUpSqft={state.builtUpSqft}
          coveredSqft={coveredSqft}
          openSqft={openSqft}
          effectiveSqft={effectiveSqft}
          onAdd={add}
        />

        <SelectedUpgrades
          selectedIds={state.selectedIds}
          basePkg={basePkg}
          builtUpSqft={state.builtUpSqft}
          coveredSqft={coveredSqft}
          openSqft={openSqft}
          effectiveSqft={effectiveSqft}
          sensors={sensors as any}
          onDragEnd={onDragEnd}
          onRemove={remove}
          onClear={() => setState((s) => ({ ...s, selectedIds: [] }))}
        />
      </div>

      {/* Pricing */}
      <PriceSummary
        baseCost={breakdown.baseCost}
        addonsCost={breakdown.addonsCost}
        total={breakdown.total}
      />

      {/* CTA */}
      <CTAButtons
        state={state}
        estimate={breakdown.total}
        onReset={() =>
          setState({
            base: "Enhanced",
            builtUpSqft: 2400,
            openAreaSqft: 0,
            selectedIds: [],
          })
        }
      />
    </div>
  );
}
