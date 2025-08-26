// components/pros/ProsBenefits.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  ClipboardList,
  CalendarCheck,
  Wallet,
} from "lucide-react";

const BENEFITS = [
  {
    icon: ClipboardList,
    title: "Clear Scope",
    text: "Approved BOQs & drawings before start.",
  },
  {
    icon: CalendarCheck,
    title: "Planned Schedules",
    text: "Stage-wise program & site coordination.",
  },
  {
    icon: Wallet,
    title: "Fast Payouts",
    text: "Milestone-linked releases with proof.",
  },
  {
    icon: CheckCircle2,
    title: "Repeat Work",
    text: "Consistent performers get steady pipeline.",
  },
];

export default function ProsBenefits() {
  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="mb-3 text-sm font-semibold">What you get</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
            >
              <Icon className="mb-3 h-5 w-5 text-brand" />
              <div className="font-semibold">{title}</div>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                {text}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
