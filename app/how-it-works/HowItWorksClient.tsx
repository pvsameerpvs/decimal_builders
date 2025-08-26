"use client";

import HowItWorksStepper from "@/components/HowItWorks";
import { Card, CardContent } from "@/components/ui/card";
import { Ruler, Hammer, Shield, Clock } from "lucide-react";

export default function HowItWorksClient() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
          How it Works
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Our house construction steps are simple and easy to understand: Plan –
          Build – Track – Settle in.
        </p>
      </header>

      {/* 1) Interactive Stepper (primary) */}
      <HowItWorksStepper
        title="How it works"
        subtitle="Our house construction steps are simple and easy to understand: Plan – Build – Track – Settle in."
        accentClassName="bg-[#958f39]"
        steps={[
          {
            label: "Raise a Request",
            description:
              "Tell us your project basics and your preferred timeline. We'll verify the site and prepare the next steps.",
          },
          {
            label: "Meet our Expert",
            description:
              "We schedule a consultation to understand your needs and budget.",
          },
          {
            label: "Book with Us",
            description:
              "Lock your package and project plan with a transparent proposal.",
          },
          {
            label: "Receive Designs",
            description:
              "Get concept drawings and revise them until you're happy.",
          },
          {
            label: "Track & Transact",
            description:
              "We use an escrow-like model. Funds move stage-wise, and you can track progress from your customer app.",
          },
          {
            label: "Settle In",
            description: "Handover and move in with post-completion support.",
          },
        ]}
      />

      {/* 2) 4-card process grid with icons */}
      <section className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10 md:p-8">
        <h3 className="mb-4 text-xl font-extrabold tracking-tight md:text-2xl">
          How it works
        </h3>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Ruler,
              title: "1) Free Estimate",
              text: "Share floor area & requirements. Get a cost in 48 hrs.",
            },
            {
              icon: Hammer,
              title: "2) Scope & Contract",
              text: "Lock materials, finishes, timeline & payment schedule.",
            },
            {
              icon: Shield,
              title: "3) Build & QA",
              text: "Dedicated PM, site photos, snag tracking, stage checks.",
            },
            {
              icon: Clock,
              title: "4) Handover",
              text: "Final QA, documentation, and warranty activation.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="rounded-xl border bg-white p-0 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
            >
              <CardContent className="p-4">
                <Icon className="mb-3 h-5 w-5 text-[#958f39]" />
                <div className="font-semibold">{title}</div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3) Quick 3-step overview (skim) */}
      <section>
        <ul className="grid gap-4 md:grid-cols-3">
          {["Consultation", "Design & Permits", "Construction"].map((s, i) => (
            <li
              key={s}
              className="rounded-xl border bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
            >
              <div className="mb-2 text-lg font-semibold">
                {i + 1}. {s}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Short explanation of the step. Use the interactive stepper above
                for details.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
