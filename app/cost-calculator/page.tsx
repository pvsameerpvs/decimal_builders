"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PROJECT_TYPES = [
  "Residential - Villa",
  "Commercial - Apartments",
  "Commercial - PG",
  "Commercial - Hospital",
  "Commercial - Industrial",
] as const;

const PACKAGES = [
  { name: "Essential", rate: 1860 },
  { name: "Enhanced", rate: 2100 },
  { name: "Elite", rate: 2500 },
] as const;

type Unit = "sqft" | "sqm";

export default function CostCalculator() {
  const [projectType, setProjectType] = React.useState<
    (typeof PROJECT_TYPES)[number]
  >("Residential - Villa");

  const [unit, setUnit] = React.useState<Unit>("sqft");
  const [areaInput, setAreaInput] = React.useState<number>(200); // user-entered number in selected unit

  const [packageName, setPackageName] = React.useState<string>("Enhanced");
  const [rate, setRate] = React.useState<number>(2100); // ₹ per sq ft

  // India GST (varies by project scope in reality). Default 18%.
  const [gstPct, setGstPct] = React.useState<number>(18);

  // Convert to sq ft if needed
  const areaSqft = Math.max(
    0,
    unit === "sqft" ? areaInput : Math.round(areaInput * 10.7639)
  );

  const subtotal = Math.max(0, areaSqft * Math.max(0, rate));
  const gst = Math.round(subtotal * (Math.max(0, gstPct) / 100));
  const total = subtotal + gst;

  const data = [
    { name: "Sub-total", value: subtotal },
    { name: `GST ${gstPct}%`, value: gst },
    { name: "Total", value: total },
  ];

  const inr = (n: number) => n.toLocaleString("en-IN");

  const selectPackage = (p: { name: string; rate: number }) => {
    setPackageName(p.name);
    setRate(p.rate);
  };

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
        Home Construction Cost Calculator
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Inputs */}
        <Card className="p-4 md:p-6 space-y-5">
          {/* Project type */}
          <div>
            <div className="mb-2 text-sm font-medium">Project Type</div>
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPES.map((t) => (
                <Button
                  key={t}
                  variant={projectType === t ? "default" : "outline"}
                  className={
                    projectType === t
                      ? "bg-[#958f39] hover:bg-[#7d782f] text-white"
                      : ""
                  }
                  onClick={() => setProjectType(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* Area + unit */}
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Built-up area ({unit === "sqft" ? "sq ft" : "sq m"})
              </label>
              <Input
                type="number"
                inputMode="numeric"
                value={areaInput}
                onChange={(e) => setAreaInput(Number(e.target.value))}
                placeholder={unit === "sqft" ? "e.g. 2400" : "e.g. 223"}
              />
              <p className="mt-1 text-xs text-zinc-500">
                Converted area: <b>{inr(areaSqft)}</b> sq ft
              </p>
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant={unit === "sqft" ? "default" : "outline"}
                className={
                  unit === "sqft" ? "bg-[#958f39] hover:bg-[#7d782f]" : ""
                }
                onClick={() => setUnit("sqft")}
              >
                sq ft
              </Button>
              <Button
                variant={unit === "sqm" ? "default" : "outline"}
                className={
                  unit === "sqm" ? "bg-[#958f39] hover:bg-[#7d782f]" : ""
                }
                onClick={() => setUnit("sqm")}
              >
                sq m
              </Button>
            </div>
          </div>

          {/* Package selector */}
          <div>
            <div className="mb-2 text-sm font-medium">Package</div>
            <div className="grid gap-2 md:grid-cols-3">
              {PACKAGES.map((p) => (
                <button
                  key={p.name}
                  onClick={() => selectPackage(p)}
                  className={[
                    "rounded-lg border p-3 text-left transition",
                    packageName === p.name
                      ? "border-[#958f39] ring-2 ring-[#958f39]"
                      : "hover:border-zinc-300 dark:hover:border-zinc-700",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-xl font-extrabold">
                    ₹ {inr(p.rate)}{" "}
                    <span className="text-xs font-normal">/ sq ft</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom rate override */}
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Selected package
                </label>
                <Input
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Rate (/ sq ft) ₹
                </label>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Tips: Essential 1860 · Enhanced 2100 · Elite 2500
                </p>
              </div>
            </div>
          </div>

          {/* GST */}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">GST (%)</label>
              <Input
                type="number"
                inputMode="numeric"
                value={gstPct}
                onChange={(e) => setGstPct(Number(e.target.value))}
              />
              <p className="mt-1 text-xs text-zinc-500">
                Defaulting to <b>18%</b>. Actual GST may vary by category/scope.
              </p>
            </div>

            <div className="flex items-end">
              <Button className="w-full">Get Detailed Quote</Button>
            </div>
          </div>
        </Card>

        {/* Right: Chart + summary */}
        <Card className="p-4 md:p-6 space-y-4 h-auto">
          <div className="grid gap-2 md:grid-cols-3">
            <Stat label="Area (sq ft)" value={inr(areaSqft)} />
            <Stat label="Rate (/ sq ft)" value={`₹ ${inr(rate)}`} />
            <Stat label="GST" value={`${gstPct}%`} />
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <Stat label="Sub-total" value={`₹ ${inr(subtotal)}`} />
            <Stat label={`GST ${gstPct}%`} value={`₹ ${inr(gst)}`} />
            <Stat label="Total" value={`₹ ${inr(total)}`} highlight />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(v) =>
                    `₹ ${Number(v).toLocaleString("en-IN")}`
                  }
                />
                <Tooltip
                  formatter={(val: number) => [`₹ ${inr(val)}`, "Amount"]}
                  labelClassName="text-sm"
                />
                <Bar dataKey="value" fill="#958f39" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            This is a rough, indicative figure. For a line-item estimate
            (materials, labor, BOQ, contingencies), request a detailed quote.
          </p>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-lg border p-3",
        highlight ? "bg-[#958f39]/10" : "",
      ].join(" ")}
    >
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
