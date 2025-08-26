// components/pros/ProsFAQ.tsx
import { Card, CardContent } from "@/components/ui/card";

const FAQ = [
  {
    q: "Who can apply?",
    a: "Registered firms or experienced individual contractors with references and sample work.",
  },
  {
    q: "How are payments released?",
    a: "Stage-wise against QC approval and photo evidence. Scope and rates are agreed before start.",
  },
  {
    q: "Where do you operate?",
    a: "Primarily India (Bangalore, Kerala) with Dubai operations for select projects.",
  },
];

export default function ProsFAQ() {
  return (
    <Card className="md:col-span-3">
      <CardContent className="p-4 md:p-6">
        <div className="mb-3 text-sm font-semibold">FAQs</div>
        <ul className="grid gap-3 md:grid-cols-3">
          {FAQ.map(({ q, a }) => (
            <li
              key={q}
              className="rounded-xl border bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
            >
              <div className="font-semibold">{q}</div>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                {a}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
