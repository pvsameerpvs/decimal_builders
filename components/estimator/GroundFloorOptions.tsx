"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LAYOUTS = ["1RK", "1BHK", "2BHK", "3BHK", "Office Space"] as const;

export default function GroundFloorOptions({
  layout,
  parkingSqft,
  balconySqft,
  utilitySqft,
  officeSqft,
  onChange,
}: {
  layout: string;
  parkingSqft: number;
  balconySqft: number;
  utilitySqft: number;
  officeSqft: number;
  onChange: (
    patch: Partial<{
      layout: string;
      parkingSqft: number;
      balconySqft: number;
      utilitySqft: number;
      officeSqft: number;
    }>
  ) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs">Ground floor layout</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {LAYOUTS.map((l) => (
            <Button
              key={l}
              variant={layout === l ? "default" : "outline"}
              className={layout === l ? "bg-[#958f39] hover:bg-[#7d782f]" : ""}
              onClick={() => onChange({ layout: l })}
            >
              {l}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs">
            Parking area (sq ft) – charged @ 65%
          </Label>
          <Input
            type="number"
            inputMode="numeric"
            value={parkingSqft}
            onChange={(e) =>
              onChange({ parkingSqft: Math.max(0, Number(e.target.value)) })
            }
            placeholder="e.g. 250"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">
            Balcony area (sq ft) – charged @ 65%
          </Label>
          <Input
            type="number"
            inputMode="numeric"
            value={balconySqft}
            onChange={(e) =>
              onChange({ balconySqft: Math.max(0, Number(e.target.value)) })
            }
            placeholder="e.g. 120"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">
            Utility area (sq ft) – charged @ 65%
          </Label>
          <Input
            type="number"
            inputMode="numeric"
            value={utilitySqft}
            onChange={(e) =>
              onChange({ utilitySqft: Math.max(0, Number(e.target.value)) })
            }
            placeholder="e.g. 80"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">
            Office space (sq ft) – charged @ 100%
          </Label>
          <Input
            type="number"
            inputMode="numeric"
            value={officeSqft}
            onChange={(e) =>
              onChange({ officeSqft: Math.max(0, Number(e.target.value)) })
            }
            placeholder="e.g. 200"
          />
        </div>
      </div>

      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Parking, balcony, and utility are billed at <strong>65%</strong> of the
        selected package rate. Office area is billed at 100%. Input only the
        portions of your ground floor used for these.
      </p>
    </div>
  );
}
