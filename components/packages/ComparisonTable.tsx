"use client";

import { useMemo, useState } from "react";
import { DECIMAL_PACKAGES } from "@/app/data/decimalPackages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, Info } from "lucide-react";

/* ------------------- types & labels ------------------- */
type FeatureKey =
  | "rate"
  | "flooringLivingKitchen"
  | "flooringBalconyPassage"
  | "flooringStairs"
  | "flooringParking"
  | "kitchenTiles"
  | "bathTiles"
  | "sanitaryPer1000"
  | "doorsMain"
  | "doorsBedroom"
  | "windowsOpeningPct"
  | "railing"
  | "sump"
  | "oht";

const LABELS: Record<FeatureKey, string> = {
  rate: "Rate (/ sq ft)",
  flooringLivingKitchen: "Living/Kitchen flooring (₹/sq ft)",
  flooringBalconyPassage: "Balcony/Passage (₹/sq ft)",
  flooringStairs: "Staircase (₹/sq ft)",
  flooringParking: "Parking (₹/sq ft)",
  kitchenTiles: "Kitchen wall tiles (₹/sq ft)",
  bathTiles: "Bathroom wall tiles (₹/sq ft)",
  sanitaryPer1000: "Sanitary + CP per 1000 sq ft (₹)",
  doorsMain: "Main door budget (₹)",
  doorsBedroom: "Bedroom door budget (₹)",
  windowsOpeningPct: "Windows opening (% of built-up)",
  railing: "Railing",
  sump: "Sump capacity (L)",
  oht: "Overhead tank (L)",
};

const ORDER: FeatureKey[] = [
  "rate",
  "flooringLivingKitchen",
  "flooringBalconyPassage",
  "flooringStairs",
  "flooringParking",
  "kitchenTiles",
  "bathTiles",
  "sanitaryPer1000",
  "doorsMain",
  "doorsBedroom",
  "windowsOpeningPct",
  "railing",
  "sump",
  "oht",
];

/* ------------------- component ------------------- */
export default function TwoUpComparison() {
  const [left, setLeft] = useState(DECIMAL_PACKAGES[1].name); // Enhanced
  const [right, setRight] = useState(DECIMAL_PACKAGES[2].name); // Elite
  const [diffOnly, setDiffOnly] = useState(false);

  const leftPkg = DECIMAL_PACKAGES.find((p) => p.name === left)!;
  const rightPkg = DECIMAL_PACKAGES.find((p) => p.name === right)!;

  const rows = useMemo(() => {
    const r = ORDER.map((key) => {
      const l = formatValue(leftPkg, key);
      const rv = formatValue(rightPkg, key);
      return {
        key,
        label: LABELS[key],
        l,
        r: rv,
        different: !equalsForCompare(l, rv),
        delta: getDeltaInfo(key, l, rv), // { betterSide, deltaAbs } | null
      };
    });
    return diffOnly ? r.filter((x) => x.different) : r;
  }, [leftPkg, rightPkg, diffOnly]);

  const diffCount = useMemo(
    () => rows.filter((x) => x.different).length,
    [rows]
  );

  function swap() {
    setLeft(right);
    setRight(left);
  }

  return (
    <section className="space-y-4">
      {/* Heading */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight md:text-xl">
            Compare two packages
          </h3>
          <p className="text-xs text-zinc-500">
            Pick any two packages. We’ll highlight stronger
            inclusions/allowances.
          </p>
        </div>

        {/* Legend chips */}
        <div className="hidden items-center gap-2 md:flex">
          <LegendChip colorClass="bg-[#958f39]" label={leftPkg.name} />
          <LegendChip colorClass="bg-[#8884d8]" label={rightPkg.name} />
        </div>
      </div>

      {/* Controls */}
      <Card className="p-3 md:p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <PackageSelect value={left} onChange={setLeft} align="left" />

          <div className="hidden md:flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swap}
              aria-label="Swap"
              className="brand-border"
              title="Swap packages"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <PackageSelect value={right} onChange={setRight} align="right" />

          {/* Mobile legend */}
          <div className="flex items-center justify-between gap-2 md:hidden">
            <LegendChip colorClass="bg-[#958f39]" label={leftPkg.name} />
            <LegendChip colorClass="bg-[#8884d8]" label={rightPkg.name} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
            <Checkbox
              id="diffOnly"
              checked={diffOnly}
              onCheckedChange={(v) => setDiffOnly(Boolean(v))}
            />
            <Label htmlFor="diffOnly" className="text-sm">
              Show differences only
            </Label>
            {diffOnly && (
              <span className="ml-1 rounded-full bg-zinc-100 px-2 py-[2px] text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {diffCount}
              </span>
            )}
          </div>

          <div className="hidden items-center gap-1 text-xs text-zinc-500 md:flex">
            <Info className="h-3.5 w-3.5" />
            Higher values are highlighted for allowances. Rate (/sq ft) isn’t
            highlighted.
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="sticky top-0 z-10 grid grid-cols-3 items-center gap-3 border-b bg-white/95 px-3 py-2 text-[12px] font-semibold text-zinc-600 backdrop-blur dark:bg-zinc-950/90">
          <div>Inclusion / Allowance</div>
          <div className="text-right md:text-center">{leftPkg.name}</div>
          <div className="text-right">{rightPkg.name}</div>
        </div>

        <ul className="divide-y">
          {rows.map(({ key, label, l, r, different, delta }, idx) => {
            const emphasiseLeft =
              different && shouldEmphasise(key, l, r, "left");
            const emphasiseRight =
              different && shouldEmphasise(key, l, r, "right");
            const zebra = idx % 2 === 1;

            return (
              <li
                key={key}
                className={[
                  "px-3 py-2 text-sm transition-colors",
                  zebra ? "bg-zinc-50/50 dark:bg-zinc-900/40" : "",
                ].join(" ")}
              >
                <div className="grid grid-cols-3 items-center gap-3">
                  <div className="text-zinc-600 dark:text-zinc-300">
                    {label}
                  </div>

                  <Cell value={l} emphasise={emphasiseLeft} align="center" />

                  <Cell
                    value={r}
                    emphasise={emphasiseRight}
                    align="right"
                    delta={
                      delta && delta.betterSide
                        ? {
                            // If right is better, show ▲ green +diff; if worse, ▼ red -diff
                            sign: delta.betterSide === "right" ? "up" : "down",
                            value: delta.deltaAbs,
                            good: delta.betterSide === "right",
                          }
                        : undefined
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t px-3 py-2 text-[11px] text-zinc-500">
          “Elevation work” is billed additionally, as specified in the package
          PDFs.
        </div>
      </Card>
    </section>
  );
}

/* ------------------- small UI bits ------------------- */

function LegendChip({
  colorClass,
  label,
}: {
  colorClass: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs">
      <span className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
      <span className="font-semibold">{label}</span>
    </span>
  );
}

function Cell({
  value,
  emphasise,
  align = "right", // ✅ default must be a single value
  delta,
}: {
  value: string | number;
  emphasise?: boolean;
  align?: "right" | "center" | "left";
  delta?: { sign: "up" | "down"; value: number; good: boolean };
}) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
      ? "text-right md:text-center"
      : "text-left";

  return (
    <div className={alignClass}>
      <div
        className={[
          "rounded px-1 transition-colors inline-block",
          emphasise ? "bg-[#958f39]/12 font-semibold" : "",
        ].join(" ")}
        title={String(value)}
      >
        {String(value)}
      </div>

      {delta && (
        <div
          className={[
            "mt-0.5 text-[10px] font-medium inline-flex items-center gap-1",
            delta.good ? "text-emerald-600" : "text-rose-600",
          ].join(" ")}
          title={
            delta.good ? "Right column is better" : "Left column is better"
          }
        >
          <span>{delta.sign === "up" ? "▲" : "▼"}</span>
          <span>{formatDelta(delta.value)}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------- selects & helpers ------------------- */

function PackageSelect({
  value,
  onChange,
  align = "left",
}: {
  value: (typeof DECIMAL_PACKAGES)[number]["name"];
  onChange: (v: (typeof DECIMAL_PACKAGES)[number]["name"]) => void;
  align?: "left" | "right";
}) {
  const pkg = DECIMAL_PACKAGES.find((p) => p.name === value)!;
  return (
    <div className={align === "right" ? "md:text-right" : "md:text-left"}>
      <label className="mb-1 block text-[11px] font-semibold text-zinc-500">
        {align === "right" ? "Right package" : "Left package"}
      </label>
      <div className="relative inline-block w-full md:w-[min(260px,100%)]">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as any)}
          className="w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-brand/30 dark:bg-zinc-950"
        >
          {DECIMAL_PACKAGES.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} • ₹ {p.ratePerSqft.toLocaleString("en-IN")}/sq ft
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400">
          ▾
        </span>
      </div>
      <div className="mt-1 text-[11px] text-zinc-500">
        Selected: <span className="font-medium">{pkg.name}</span>
      </div>
    </div>
  );
}

function formatValue(
  pkg: (typeof DECIMAL_PACKAGES)[number],
  key: FeatureKey
): string | number {
  switch (key) {
    case "rate":
      return `₹ ${pkg.ratePerSqft.toLocaleString("en-IN")}`;
    case "windowsOpeningPct":
      return `${pkg.windowsOpeningPct}%`;
    case "railing":
      return pkg.railing;
    case "sump":
      return pkg.sumpLiters.toLocaleString("en-IN");
    case "oht":
      return pkg.ohtLiters.toLocaleString("en-IN");
    case "doorsMain":
      return pkg.allowances.mainDoorBudget.toLocaleString("en-IN");
    case "doorsBedroom":
      return pkg.allowances.bedroomDoorBudget.toLocaleString("en-IN");
    default: {
      const a = pkg.allowances as any;
      const v = a[key];
      return typeof v === "number" ? v.toLocaleString("en-IN") : v;
    }
  }
}

function equalsForCompare(a: string | number, b: string | number) {
  return normalize(a) === normalize(b);
}

function normalize(v: string | number) {
  if (typeof v === "number") return String(v);
  return v.replace(/[₹,%\s,]/g, "").toLowerCase();
}

// Which side is "better" and by how much (absolute numeric delta)?
function getDeltaInfo(
  key: FeatureKey,
  l: string | number,
  r: string | number
): { betterSide: "left" | "right" | null; deltaAbs: number } | null {
  if (key === "railing") return null; // non-numeric qualitative
  const ln = Number(normalize(l));
  const rn = Number(normalize(r));
  if (Number.isNaN(ln) || Number.isNaN(rn)) return null;

  const higherIsBetter = key !== "rate"; // For rate, lower is better
  if (ln === rn) return { betterSide: null, deltaAbs: 0 };

  if (higherIsBetter) {
    return ln > rn
      ? { betterSide: "left", deltaAbs: ln - rn }
      : { betterSide: "right", deltaAbs: rn - ln };
  } else {
    // lower is better (rate)
    return ln < rn
      ? { betterSide: "left", deltaAbs: rn - ln }
      : { betterSide: "right", deltaAbs: ln - rn };
  }
}

function shouldEmphasise(
  key: FeatureKey,
  l: string | number,
  r: string | number,
  side: "left" | "right"
) {
  if (key === "railing") return false;
  if (key === "rate") return false; // don’t highlight higher price
  const ln = Number(normalize(l));
  const rn = Number(normalize(r));
  if (Number.isNaN(ln) || Number.isNaN(rn)) return false;
  return side === "left" ? ln > rn : rn > ln;
}

function formatDelta(n: number) {
  // keep it compact (no ₹ or units; this is a quick difference hint)
  if (n >= 1000) return n.toLocaleString("en-IN");
  return String(n);
}
