"use client";

import { Breakdown, EstimatorState } from "@/app/data/calc/estimator";
import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCard({
  state,
  breakdown,
}: {
  state: EstimatorState;
  breakdown: Breakdown;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-4 md:p-6">
        <div>
          <div className="text-lg font-semibold">Summary</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            {state.projectType} · {state.packageName} @{" "}
            {state.ratePerSqft.toLocaleString()} / sq ft
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Stat
            label="Plot area"
            value={`${breakdown.plotSqft.toLocaleString()} sq ft`}
          />
          <Stat label="Floors" value={`${breakdown.floors}`} />
          <Stat
            label="Coverage per floor"
            value={`${breakdown.coveragePct}%`}
          />
          <Stat
            label="Built-up area"
            value={`${breakdown.totalBuiltUp.toLocaleString()} sq ft`}
          />
          <Stat
            label="Reduced-rate area (65%)"
            value={`${breakdown.reducedArea.toLocaleString()} sq ft`}
          />
          <Stat
            label="Regular area (100%)"
            value={`${breakdown.regularArea.toLocaleString()} sq ft`}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Stat
            label="Cost @ 100%"
            value={`₹/AED ${breakdown.costRegular.toLocaleString()}`}
          />
          <Stat
            label="Cost @ 65%"
            value={`₹/AED ${breakdown.costReduced.toLocaleString()}`}
          />
        </div>

        <div className="rounded-xl bg-[#958f39]/10 p-4">
          <div className="text-sm">Estimated Total</div>
          <div className="text-3xl font-extrabold">
            ₹/AED {breakdown.totalCost.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            This is a ballpark figure. For an accurate quote, contact us.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function Compact({ breakdown }: { breakdown: Breakdown }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Quick Estimate
        </div>
        <div className="text-2xl font-extrabold">
          ₹/AED {breakdown.totalCost.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}

SummaryCard.Compact = Compact;
