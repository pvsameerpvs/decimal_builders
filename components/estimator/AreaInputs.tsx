"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export namespace AreaInputs {
  export function ProjectType({
    projectType,
    coveragePct,
    onProjectTypeChange,
  }: {
    projectType: string;
    coveragePct: number;
    onProjectTypeChange: (project: string, coveragePct: number) => void;
  }) {
    const TYPES: Array<{ name: string; coverage: number }> = [
      { name: "Residential - Villa", coverage: 85 },
      { name: "Commercial - Apartments", coverage: 80 },
      { name: "Commercial - PG", coverage: 85 },
      { name: "Commercial - Hospital", coverage: 75 },
      { name: "Commercial - Industrial", coverage: 70 },
    ];

    return (
      <div className="space-y-3">
        <Label className="text-xs">Project Type</Label>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Button
              key={t.name}
              variant={projectType === t.name ? "default" : "outline"}
              className={
                projectType === t.name ? "bg-[#958f39] hover:bg-[#7d782f]" : ""
              }
              onClick={() => onProjectTypeChange(t.name, t.coverage)}
            >
              {t.name}
            </Button>
          ))}
        </div>
        <p className="text-xs text-zinc-500">
          Default coverage set to <strong>{coveragePct}%</strong> for the
          selected type (editable next step).
        </p>
      </div>
    );
  }

  export function AreaAndFloors({
    plotSqft,
    floors,
    coveragePct,
    onChange,
  }: {
    plotSqft: number;
    floors: number;
    coveragePct: number;
    onChange: (
      patch: Partial<{ plotSqft: number; floors: number; coveragePct: number }>
    ) => void;
  }) {
    const builtUp = Math.max(
      0,
      Math.round(plotSqft * floors * (coveragePct / 100))
    );

    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <Label className="text-xs">Plot area (sq ft)</Label>
          <Input
            type="number"
            inputMode="numeric"
            value={plotSqft}
            onChange={(e) => onChange({ plotSqft: Number(e.target.value) })}
            placeholder="e.g. 2400"
          />

          <Label className="text-xs">Number of floors</Label>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            value={floors}
            onChange={(e) =>
              onChange({ floors: Math.max(1, Number(e.target.value)) })
            }
          />
        </div>

        <div className="space-y-3">
          <Label className="text-xs">Coverage per floor (%)</Label>
          <Slider
            value={[coveragePct]}
            onValueChange={(v) => onChange({ coveragePct: v[0] })}
            min={50}
            max={100}
            step={1}
          />
          <div className="text-xs text-zinc-600 dark:text-zinc-300">
            Estimated built-up area: <strong>{builtUp.toLocaleString()}</strong>{" "}
            sq ft
          </div>
        </div>
      </div>
    );
  }
}

export default AreaInputs;
