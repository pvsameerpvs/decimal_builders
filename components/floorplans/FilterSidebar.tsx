"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export type Filters = {
  facing: Array<
    | "North"
    | "South"
    | "East"
    | "West"
    | "North East"
    | "South East"
    | "North West"
    | "South West"
  >;
  floors: number[];
  bedrooms: number[];
  construction: Array<"Residential" | "Commercial" | "Mixed">;
  vastu: boolean;
  plot: [number, number];
  budget: [number, number];
};

export default function FilterSidebar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const toggle = (key: keyof Filters, value: any) => {
    const arr = (filters as any)[key] as any[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next } as Filters);
  };

  const setRange = (key: keyof Filters, value: [number, number]) =>
    onChange({ ...filters, [key]: value } as Filters);

  return (
    <div className="flex flex-col gap-5 text-sm">
      {/* Plot size */}
      <div>
        <Label className="text-xs">Plot Dimensions (sq ft)</Label>
        <Slider
          value={[filters.plot[0], filters.plot[1]]}
          onValueChange={(v) =>
            setRange("plot", [v[0], v[1]] as [number, number])
          }
          min={0}
          max={6000}
          step={50}
          className="mt-3"
        />
        <div className="mt-2 text-xs text-zinc-500">
          {filters.plot[0]} – {filters.plot[1]} sq ft
        </div>
      </div>

      {/* Budget */}
      <div>
        <Label className="text-xs">House Budget (AED)</Label>
        <Slider
          value={[filters.budget[0], filters.budget[1]]}
          onValueChange={(v) =>
            setRange("budget", [v[0], v[1]] as [number, number])
          }
          min={0}
          max={10_000_000}
          step={50_000}
          className="mt-3"
        />
        <div className="mt-2 text-xs text-zinc-500">
          AED {filters.budget[0].toLocaleString()} –{" "}
          {filters.budget[1].toLocaleString()}
        </div>
      </div>

      {/* Facing */}
      <Block
        title="Road Facing Direction"
        items={[
          "North",
          "South",
          "East",
          "West",
          "North East",
          "South East",
          "North West",
          "South West",
        ]}
        selected={filters.facing}
        onToggle={(v) => toggle("facing", v)}
      />

      {/* Floors */}
      <Block
        title="Number of Floors"
        items={[1, 2, 3, 4, 5].map(String)}
        selected={filters.floors.map(String)}
        onToggle={(v) => toggle("floors", Number(v))}
      />

      {/* Bedrooms */}
      <Block
        title="Number of Bedrooms"
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(String)}
        selected={filters.bedrooms.map(String)}
        onToggle={(v) => toggle("bedrooms", Number(v))}
      />

      {/* Type */}
      <Block
        title="Type of Construction"
        items={["Residential", "Commercial", "Mixed"]}
        selected={filters.construction}
        onToggle={(v) => toggle("construction", v)}
      />

      {/* Vastu */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="vastu"
          checked={filters.vastu}
          onCheckedChange={(v) => onChange({ ...filters, vastu: Boolean(v) })}
        />
        <Label htmlFor="vastu">Vastu Compliant</Label>
      </div>
    </div>
  );
}

function Block({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <label
            key={it}
            className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
              selected.includes(it)
                ? "border-brand/60 ring-1 ring-brand/40"
                : ""
            }`}
          >
            <Checkbox
              checked={selected.includes(it)}
              onCheckedChange={() => onToggle(it)}
            />
            <span>{it}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
