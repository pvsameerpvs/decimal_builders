"use client";

import { Briefcase, Star, AlarmClock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { JOBS } from "../data/careers";
import JobCard from "@/components/careers/JobCard";
import EmptyState from "@/components/careers/EmptyState";
import Perks from "@/components/careers/Perks";
import TalentPoolForm from "@/components/careers/TalentPoolForm";

export default function CareersClient() {
  const hasJobs = JOBS.length > 0;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <header className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10 md:p-8">
        <div className="flex items-start gap-4">
          <div className="hidden rounded-xl bg-brand/10 p-2 text-brand md:block">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
              Careers
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
              We’re always excited to meet great people. If you don’t see a role
              that fits, join our talent pool—our team will reach out when
              there’s a match.
            </p>

            {/* quick highlights */}
            <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
              <Card className="flex items-center gap-2 p-3">
                <Star className="h-4 w-4 text-brand" />
                <div>
                  <div className="font-semibold">Growth & ownership</div>
                  <div className="text-zinc-500">Lead high-impact projects</div>
                </div>
              </Card>
              <Card className="flex items-center gap-2 p-3">
                <AlarmClock className="h-4 w-4 text-brand" />
                <div>
                  <div className="font-semibold">On-time delivery culture</div>
                  <div className="text-zinc-500">Clear goals & reviews</div>
                </div>
              </Card>
              <Card className="flex items-center gap-2 p-3">
                <MapPin className="h-4 w-4 text-brand" />
                <div>
                  <div className="font-semibold">India-first, Dubai ops</div>
                  <div className="text-zinc-500">Multi-city exposure</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Open Roles */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
              Open roles
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {hasJobs
                ? "Apply now—roles update frequently."
                : "No active openings right now."}
            </p>
          </div>
        </div>

        {hasJobs ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {JOBS.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* Why work with us */}
      <Perks />

      {/* Talent pool form */}
      {/* <section id="apply" className="space-y-3">
        <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
          Join our talent pool
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Share your expertise, location and experience. We’ll verify and get
          back when a suitable role opens.
        </p>
        <TalentPoolForm />
      </section> */}
    </div>
  );
}
