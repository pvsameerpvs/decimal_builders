// components/custom-builder/PriceSummary.tsx
"use client";

import { Card } from "@/components/ui/card";

export default function PriceSummary({
  baseCost,
  addonsCost,
  total,
}: {
  baseCost: number;
  addonsCost: number;
  total: number;
}) {
  const inr = (n: number) => n.toLocaleString("en-IN");
  return (
    <Card className="p-4 md:p-6 space-y-2">
      <Row k="Base cost" v={`₹ ${inr(baseCost)}`} />
      <Row k="Add-ons" v={`₹ ${inr(addonsCost)}`} />
      <div className="mt-2 rounded-xl bg-[#958f39]/10 p-3">
        <div className="text-sm">Estimated Total</div>
        <div className="text-2xl font-extrabold">
          ₹ {inr(total)}{" "}
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
            gst not inlcude
          </span>
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Approximate pricing. Final quote depends on drawings, site conditions
          & selections.
        </div>
      </div>
    </Card>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-zinc-600 dark:text-zinc-300">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}
