"use client";

import { CheckCircle2, FileText, Hammer, Layers, Ruler } from "lucide-react";

export default function Differentiators() {
  const items = [
    {
      icon: FileText,
      title: "Complete drawings included",
      text: "Architectural layout, 2D floor plan, 3D elevation, structural, electrical & plumbing drawings are part of every package.",
    },
    {
      icon: Layers,
      title: "Clear structural baseline",
      text: 'Steel 3.0 kg/sq ft, UltraTech (or equivalent) cement, 6"/4" solid blocks, 5 ft foundation, 10 ft ceiling, 1.5 ft plinth, RCC M20/M25.',
    },
    {
      icon: Ruler,
      title: "Transparent allowances",
      text: "Per-sq-ft rates for flooring & tiles; published budgets for doors, sanitaryware, sinks and faucets — no guesswork.",
    },
    {
      icon: Hammer,
      title: "Documented scope",
      text: "Waterproofing for open areas, terrace weatherproofing, grills & railings, tanks & sump capacities, and window opening % are specified.",
    },
  ];

  return (
    <section className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10 md:p-8">
      <h3 className="mb-4 text-xl font-extrabold tracking-tight md:text-2xl">
        Why customers pick Decimal Builders
      </h3>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
          >
            <Icon className="mb-3 h-5 w-5 text-[#958f39]" />
            <div className="font-semibold">{title}</div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {text}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
        <CheckCircle2 className="h-4 w-4 text-[#958f39]" />
        Every card below links to its full PDF with inclusions & allowances.
      </p>
    </section>
  );
}
