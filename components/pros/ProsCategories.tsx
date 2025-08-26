// components/pros/ProsCategories.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Hammer, Cable, PaintBucket, Wrench } from "lucide-react";

const CATS = [
  {
    icon: Hammer,
    title: "Civil & Masonry",
    points: ["Structure", "Brickwork", "Plastering"],
  },
  {
    icon: Cable,
    title: "MEP Contractors",
    points: ["Electrical", "Plumbing", "HVAC"],
  },
  {
    icon: PaintBucket,
    title: "Finishing",
    points: ["Flooring", "Painting", "False ceiling"],
  },
  {
    icon: Wrench,
    title: "Specialists",
    points: ["Waterproofing", "Fabrication", "Landscaping"],
  },
];

export default function ProsCategories() {
  return (
    <Card className="md:col-span-2">
      <CardContent className="p-4 md:p-6">
        <div className="mb-3 text-sm font-semibold">We onboard for:</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATS.map(({ icon: Icon, title, points }) => (
            <div
              key={title}
              className="rounded-xl border bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
            >
              <Icon className="mb-3 h-5 w-5 text-brand" />
              <div className="font-semibold">{title}</div>
              <ul className="mt-1 list-disc pl-5 text-xs text-zinc-600 dark:text-zinc-300">
                {points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
