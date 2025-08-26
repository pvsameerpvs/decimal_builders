"use client";

import { PROJECTS } from "../data/projects";
import DeliveryPaceChart from "./DeliveryPaceChart";
import ProjectCards from "./ProjectCards";

const CHART_DATA = [
  { name: "Q1", villas: 2, reno: 4 },
  { name: "Q2", villas: 3, reno: 6 },
  { name: "Q3", villas: 6, reno: 5 },
  { name: "Q4", villas: 8, reno: 7 },
];

export default function ProjectsClient() {
  return (
    <div className="space-y-6">
      <section>
        <div className="mb-3">
          <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
            Our Projects
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Built with precision, quality, and trust—crafting your dream home to
            perfection.
          </p>
        </div>

        <ProjectCards items={PROJECTS} />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Recent delivery pace
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Quarterly completions (demo data).
          </p>
        </div>

        {/* Chart without its own header */}
        <DeliveryPaceChart data={CHART_DATA} />
      </section>
    </div>
  );
}
