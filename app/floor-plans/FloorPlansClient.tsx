"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import FilterSidebar, {
  type Filters,
} from "@/components/floorplans/FilterSidebar";
import PlanGrid from "@/components/floorplans/PlanGrid";
import { PLANS } from "../data/floorplans";

const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
});

export default function FloorPlansClient() {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(6);
  const [tab, setTab] = useState<"gallery" | "pdf">("gallery");

  const [filters, setFilters] = useState<Filters>({
    facing: [],
    floors: [],
    bedrooms: [],
    construction: [],
    vastu: false,
    plot: [0, 6000],
    budget: [0, 10_000_000],
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLANS.filter((p) => {
      if (p.plotSqft < filters.plot[0] || p.plotSqft > filters.plot[1])
        return false;
      if (p.budgetAED < filters.budget[0] || p.budgetAED > filters.budget[1])
        return false;
      if (filters.vastu && !p.vastu) return false;
      if (filters.facing.length && !filters.facing.includes(p.facing))
        return false;
      if (filters.floors.length && !filters.floors.includes(p.floors))
        return false;
      if (filters.bedrooms.length && !filters.bedrooms.includes(p.bedrooms))
        return false;
      if (filters.construction.length && !filters.construction.includes(p.type))
        return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filters, query]);

  const reset = () => {
    setFilters({
      facing: [],
      floors: [],
      bedrooms: [],
      construction: [],
      vastu: false,
      plot: [0, 6000],
      budget: [0, 10_000_000],
    });
    setQuery("");
    setLimit(6);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
            Floor Plans & Designs
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Filter by plot size, budget, direction, floors, bedrooms and more.
            Click a card to preview images; upload a brochure PDF in the next
            tab.
          </p>
        </div>
        <div className="hidden w-64 md:block">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or tag…"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="pdf">PDF Preview</TabsTrigger>
        </TabsList>

        {/* Gallery */}
        <TabsContent value="gallery" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            {/* Filters */}
            <div className="rounded-2xl border p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight text-zinc-700 dark:text-zinc-200">
                  Filters ({filtered.length})
                </h3>
                <Button size="sm" variant="ghost" onClick={reset}>
                  Reset
                </Button>
              </div>
              <Separator className="mb-4" />
              <FilterSidebar filters={filters} onChange={setFilters} />
              <div className="mt-6 hidden md:block">
                <Input
                  className="mt-1"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. duplex, 3BHK, modern"
                />
              </div>
            </div>

            {/* Grid */}
            <div>
              <PlanGrid plans={filtered.slice(0, limit)} />
              {filtered.length > limit && (
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => setLimit((n) => n + 6)}
                    variant="outline"
                    className="brand-border"
                  >
                    Load more
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* PDF Preview */}
        <TabsContent value="pdf" className="mt-4 space-y-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Upload a PDF to preview here. Great for brochures, plan sets, or
            rate cards.
          </p>
          <div className="rounded-2xl border p-2">
            {/* Only render when active so it unmounts on tab change (clears file) */}
            {tab === "pdf" && <PdfViewer key={tab} />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
