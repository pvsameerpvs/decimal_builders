"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DEFAULT_PACKAGES } from "@/app/data/packages";

export default function PackageSelector({
  selected,
  rate,
  onChange,
}: {
  selected: string;
  rate: number;
  onChange: (
    patch: Partial<{ packageName: string; ratePerSqft: number }>
  ) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {DEFAULT_PACKAGES.map((p) => (
        <Card
          key={p.name}
          className={[
            "cursor-pointer transition",
            selected === p.name
              ? "ring-2 ring-[#958f39]"
              : "hover:ring-1 hover:ring-zinc-300 dark:hover:ring-zinc-700",
          ].join(" ")}
          onClick={() =>
            onChange({ packageName: p.name, ratePerSqft: p.ratePerSqft })
          }
        >
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{p.name}</div>
              <span className="text-xs rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-900">
                {p.badge}
              </span>
            </div>
            <div className="text-2xl font-extrabold">
              {p.ratePerSqft.toLocaleString()}{" "}
              <span className="text-sm font-normal">/ sq ft</span>
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              {p.notes}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="md:col-span-3">
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <Label className="text-xs">Selected package</Label>
            <Input
              value={selected}
              onChange={(e) => onChange({ packageName: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Rate (/ sq ft)</Label>
            <Input
              type="number"
              inputMode="numeric"
              value={rate}
              onChange={(e) =>
                onChange({ ratePerSqft: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex items-end">
            <Button
              className="w-full bg-[#958f39] hover:bg-[#7d782f] text-white"
              onClick={() =>
                onChange({
                  packageName: "Custom",
                  ratePerSqft: Math.max(0, rate),
                })
              }
            >
              Use custom rate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
