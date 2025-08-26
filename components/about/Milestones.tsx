import { Card } from "@/components/ui/card";
import { CalendarDays, Hammer, Building2, Award } from "lucide-react";

const steps = [
  {
    icon: CalendarDays,
    title: "Founded",
    meta: "2018",
    text: "Started with a mission to make construction predictable and transparent.",
  },
  {
    icon: Hammer,
    title: "100th Project",
    meta: "2021",
    text: "Scaled to multi-site execution with standardized QA checklists.",
  },
  {
    icon: Building2,
    title: "Dubai Operations",
    meta: "2023",
    text: "Brought ISO-grade process to UAE with city-aware pricing.",
  },
  {
    icon: Award,
    title: "250+ Deliveries",
    meta: "2025",
    text: "Consistent on-time record and 3-year structural warranty.",
  },
];

export default function Milestones() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {steps.map(({ icon: Icon, title, meta, text }) => (
        <Card
          key={title}
          className="rounded-xl border bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <div className="font-semibold">{title}</div>
                <span className="text-xs text-zinc-500">{meta}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {text}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
