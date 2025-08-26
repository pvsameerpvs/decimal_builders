import { Card } from "@/components/ui/card";
import { ShieldCheck, Sparkles, Trophy, GraduationCap } from "lucide-react";

export default function Perks() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Safety & compliance",
      text: "ISO-grade QA, audited sites, safety-first culture.",
    },
    {
      icon: Sparkles,
      title: "Tools & systems",
      text: "Modern stack for scheduling, BOQs, and progress tracking.",
    },
    {
      icon: Trophy,
      title: "High-ownership culture",
      text: "Lean teams, clear goals, recognition for impact.",
    },
    {
      icon: GraduationCap,
      title: "Learning budget",
      text: "Upskilling support for certifications & workshops.",
    },
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
        Why work with us
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="p-4">
            <Icon className="mb-2 h-5 w-5 text-[#958f39]" />
            <div className="font-semibold">{title}</div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {text}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
