"use client";

import { Button } from "@/components/ui/button";
import type { BuilderState } from "@/app/data/calc/customPricing";

type Props = {
  state: BuilderState;
  estimate: number;
  onReset: () => void;
  className?: string;
};

export default function CTAButtons({
  state,
  estimate,
  onReset,
  className,
}: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      <Button
        className="bg-[#958f39] hover:bg-[#7d782f] text-white"
        onClick={() => {
          const params = new URLSearchParams({
            base: state.base,
            area: String(state.builtUpSqft),
            open: String(state.openAreaSqft),
            addons: state.selectedIds.join(","),
            estimate: String(estimate),
          }).toString();
          window.location.href = `/contact?${params}`;
        }}
      >
        Request Decimal Builders Quote
      </Button>
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
