"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, CheckCircle2, Calculator } from "lucide-react";

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Differentiators from "@/components/packages/Differentiators";
import ComparisonTable from "@/components/packages/ComparisonTable";
import { DECIMAL_PACKAGES } from "../data/decimalPackages";

export default function PackagesClient() {
  return (
    <div className="space-y-8">
      <section>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
              Construction Packages (Decimal Builders)
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 sm:text-sm">
              Transparent inclusions and allowances. Download the full PDF for
              details.
            </p>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-2 sm:shrink-0">
            <Link href="/custom-builder" className="shrink-0">
              <Button
                size="sm"
                className="h-9 px-3 text-xs md:h-10 md:px-4 md:text-sm bg-[#958f39] text-white hover:bg-[#7d782f]"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Build custom package
              </Button>
            </Link>

            <Link href="/construction-packages" className="shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 text-xs md:h-10 md:px-4 md:text-sm font-semibold"
              >
                See all
              </Button>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {DECIMAL_PACKAGES.map((pkg, idx) => (
            <Card key={pkg.name} className="flex flex-col overflow-hidden">
              {/* Image */}
              <div className="relative h-40 w-full">
                <Image
                  src={pkg.img}
                  alt={`${pkg.name} package`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  priority={idx === 0}
                />
                {pkg.badge && (
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold shadow-sm dark:bg-zinc-900/90">
                    {pkg.badge}
                  </div>
                )}
              </div>

              {/* Header */}
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>{pkg.name}</span>
                  <span className="text-base font-extrabold text-brand">
                    ₹ {pkg.ratePerSqft.toLocaleString("en-IN")} / sq ft
                  </span>
                </CardTitle>
                <CardDescription className="text-[13px]">
                  Fixed-scope, timeline-bound delivery with quality checks.
                </CardDescription>
              </CardHeader>

              {/* Content */}
              <CardContent className="flex flex-1 flex-col">
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <span>
                      Windows opening ~{pkg.windowsOpeningPct}% of built-up;{" "}
                      {pkg.windowsType}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <span>
                      Main door budget ₹
                      {pkg.allowances.mainDoorBudget.toLocaleString("en-IN")};
                      bedroom doors ₹
                      {pkg.allowances.bedroomDoorBudget.toLocaleString("en-IN")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <span>
                      Flooring (living/kitchen): ₹
                      {pkg.allowances.flooringLivingKitchen}/sq ft ·
                      Balcony/passage: ₹{pkg.allowances.flooringBalconyPassage}
                      /sq ft
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <span>
                      Sanitary &amp; CP: ₹
                      {pkg.allowances.sanitaryPer1000.toLocaleString("en-IN")}{" "}
                      per 1,000 sq ft
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                    <span>
                      Sump {pkg.sumpLiters.toLocaleString("en-IN")} L · OHT{" "}
                      {pkg.ohtLiters.toLocaleString("en-IN")} L{" "}
                      {pkg.ohtBrand ? `(${pkg.ohtBrand})` : ""}
                    </span>
                  </li>
                </ul>

                {/* Show more */}
                {pkg.notes?.length ? (
                  <details className="mt-3 text-sm [&_summary]:cursor-pointer">
                    <summary className="text-zinc-700 underline underline-offset-4 dark:text-zinc-200">
                      Show more inclusions
                    </summary>
                    <ul className="mt-2 space-y-2">
                      {pkg.notes.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}

                {/* Actions */}
                <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                  {/* Customize: pre-fill base+rate (+ default area) */}
                  <Link
                    href={{
                      pathname: "/custom-builder",
                      query: {
                        base: pkg.name,
                        rate: String(pkg.ratePerSqft),
                        area: "2400",
                      },
                    }}
                  >
                    <Button className="w-full rounded-lg bg-[#958f39] text-white hover:bg-[#7d782f]">
                      Customize
                    </Button>
                  </Link>

                  {/* Download PDF */}
                  <a
                    href={pkg.pdf}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="brand-border flex w-full items-center justify-center gap-1 rounded-lg text-xs font-medium"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>PDF</span>
                    </Button>
                  </a>
                </div>

                {/* Optional: light enquire link below */}
                <div className="mt-2 text-center">
                  <Link
                    href="/contact"
                    className="text-xs text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-300"
                  >
                    Prefer a guided quote? Talk to us →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Decimal Builders */}
      <Differentiators />

      {/* Side-by-side allowances table */}
      <ComparisonTable />
    </div>
  );
}
