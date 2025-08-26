"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Hammer,
  Ruler,
  Shield,
  Clock,
  PhoneCall,
  Star,
  Home as HomeIcon,
  Building2,
  Briefcase,
  Warehouse,
  School,
  Hotel,
  Download,
} from "lucide-react";
import HowItWorks from "@/components/HowItWorks";

import HowItWorksStepper from "@/components/HowItWorks";
import PackagesClient from "./construction-packages/PackagesClient";
import ProjectCards from "./projects/ProjectCards";
import { PROJECTS } from "./data/projects";
import { motion, useReducedMotion } from "framer-motion";
import step1 from "@/public/hiw/Home.png";
import step2 from "@/public/hiw/Home.png";
import step3 from "@/public/hiw/Home.png";
import step4 from "@/public/hiw/Home.png";
import step5 from "@/public/hiw/Home.png";
import step6 from "@/public/hiw/Home.png";

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="space-y-16 md:space-y-20">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
        {/* subtle bg */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white to-brand/10 dark:from-zinc-950 dark:to-brand/10" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full brand-bg opacity-20 blur-3xl" />

        {/* content */}
        <div className="grid gap-8 p-4 sm:p-6 md:grid-cols-2 md:gap-10 md:p-10">
          {/* Left copy */}
          <div className="order-2 md:order-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold text-brand">
              <Shield className="h-3.5 w-3.5" />
              ISO-grade Quality • On-time Delivery
            </div>

            <h1 className="h-heading mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Build with confidence.
            </h1>

            <p className="max-w-xl text-xs text-zinc-600 dark:text-zinc-300 sm:text-sm md:text-base">
              Decimal Builders delivers turnkey villas, extensions, and
              renovations across Bangalore & Dubai — with transparent pricing, a
              dedicated project manager, and workmanship warranties.
            </p>

            {/* CTAs (small on mobile) */}
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
              <Link href="/construction-packages">
                <Button
                  size="sm"
                  className="h-9 px-3 text-xs bg-brand md:h-10 md:px-4 md:text-sm rounded-lg"
                >
                  View Packages
                </Button>
              </Link>

              <Link href="/cost-calculator">
                <Button
                  size="sm"
                  variant="outline"
                  className="brand-border h-9 px-3 text-xs md:h-10 md:px-4 md:text-sm rounded-lg"
                >
                  Cost Calculator
                </Button>
              </Link>

              <Link href="/contact" className="ml-auto md:ml-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group h-9 gap-2 px-2 text-xs md:h-10 md:px-3 md:text-sm rounded-lg"
                >
                  <span className="relative inline-flex items-center justify-center">
                    {/* soft pulse on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-2 hidden rounded-full bg-emerald-500/15 blur-sm transition-opacity group-hover:block"
                    />
                    <motion.span
                      aria-hidden
                      className="inline-flex"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: [0, -15, 10, -10, 0],
                              x: [0, 0.4, -0.4, 0.6, -0.6, 0],
                            }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              duration: 1.2,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 1.2,
                            }
                      }
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: [0, -20, 15, -15, 0],
                              x: [0, 1, -1, 1, -1, 0],
                              transition: {
                                duration: 0.8,
                                repeat: Infinity,
                                repeatDelay: 0.4,
                              },
                            }
                      }
                    >
                      <PhoneCall className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <span>Speak to an expert</span>
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] sm:text-xs md:text-sm">
              <div className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-zinc-500">reviews</span>
              </div>
              <span className="hidden h-4 w-px bg-black/10 dark:bg-white/10 sm:block" />
              <div className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-brand" />
                <span className="font-semibold">3-year</span>
                <span className="text-zinc-500">structural warranty</span>
              </div>
              <span className="hidden h-4 w-px bg-black/10 dark:bg-white/10 sm:block" />
              <div className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand" />
                <span className="font-semibold">On-time</span>
                <span className="text-zinc-500">delivery</span>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
              <Image
                src="/images/Cover.webp"
                alt="Decimal Builders – modern villa exterior"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              {/* top badge */}
              <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold shadow-sm dark:bg-zinc-900/90 sm:left-3 sm:top-3 sm:text-xs">
                Ongoing site • 6,200 sq ft
              </div>

              {/* bottom info */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent p-2 text-white sm:gap-3 sm:p-3">
                <div className="text-[11px] sm:text-xs md:text-sm">
                  <div className="font-semibold">Whitefield, Bangalore</div>
                  <div className="opacity-90">
                    G+1 Villa • 5 months timeline
                  </div>
                </div>
                <Link href="/projects">
                  <Button
                    size="sm"
                    className="rounded-lg bg-white/90 text-black hover:bg-white h-8 px-3 text-xs"
                  >
                    View projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 border-t p-4 text-center text-xs dark:border-white/10 sm:gap-4 sm:p-6 md:grid-cols-4 md:p-8 md:text-sm">
          {[
            { k: "52+", v: "Projects Delivered" },
            { k: "12 yrs", v: "Structural Warranty" },
            { k: "98%", v: "On-time Record" },
            { k: "412+ ", v: "Quality Checks" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-xl bg-white/60 p-3 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10 md:p-4"
            >
              <div className="h-heading text-xl font-extrabold sm:text-2xl">
                {s.k}
              </div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-300 sm:text-xs">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}

      <PackagesClient />

      {/* SERVICES (NEW) */}
      <section>
        <div className="mb-3">
          <h2 className="h-heading text-2xl font-extrabold tracking-tight md:text-3xl">
            Our Construction Services
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Expertise in delivering top-notch construction with precision,
            quality, and transparency.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Home Construction */}
          <Card className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-5">
              <div className="relative md:col-span-2">
                <Image
                  src="/images/Cover.webp" // TODO: replace
                  alt="Home construction"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold shadow-sm dark:bg-zinc-900/90">
                  Residential
                </div>
              </div>
              <div className="md:col-span-3">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="h-5 w-5 text-brand" />
                    <CardTitle>Home Construction</CardTitle>
                  </div>
                  <CardDescription className="text-[13px]">
                    From concept to handover — villas, duplexes, and luxury
                    homes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Duplex Homes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Luxury Homes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Villas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Extensions & Renovations
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/floor-plans">
                      <Button
                        variant="outline"
                        size="sm"
                        className="brand-border rounded-lg"
                      >
                        Explore floor plans
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* Commercial Construction */}
          <Card className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-5">
              <div className="relative md:col-span-2">
                <Image
                  src="/images/Cover.webp" // TODO: replace
                  alt="Commercial construction"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold shadow-sm dark:bg-zinc-900/90">
                  Commercial
                </div>
              </div>
              <div className="md:col-span-3">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-brand" />
                    <CardTitle>Commercial Construction</CardTitle>
                  </div>
                  <CardDescription className="text-[13px]">
                    Efficient delivery for revenue-focused spaces.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      PG / Rental
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Schools
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Hotels
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Offices
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                      Warehousing
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <Link href="/projects">
                      <Button
                        variant="outline"
                        size="sm"
                        className="brand-border rounded-lg"
                      >
                        See commercial projects
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="sm" className="rounded-lg">
                        Request a proposal
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* PROJECTS (NEW) */}
      <section>
        <div className="mb-3">
          <h2 className="h-heading text-2xl font-extrabold tracking-tight md:text-3xl">
            Our Construction Projects
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Built with precision, quality, and trust, ensuring your dream home
            is crafted to perfection.
          </p>
        </div>

        <ProjectCards items={PROJECTS} />
      </section>

      {/* PROCESS */}
      <section className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10 md:p-8">
        <h3 className="h-heading mb-4 text-xl font-extrabold tracking-tight md:text-2xl">
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
            <div
              key={title}
              className="rounded-xl border bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/60"
            >
              <Icon className="mb-3 h-5 w-5 text-brand" />
              <div className="font-semibold">{title}</div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <HowItWorksStepper
        title="How it works"
        subtitle="Our house construction steps are simple and easy to understand: Plan – Build – Track – Settle in."
        accentClassName="bg-[#958f39]"
        steps={[
          {
            label: "Raise a Request",
            description:
              "Tell us your project basics and your preferred timeline. We'll verify the site and prepare the next steps.",
            image: step1,
          },
          {
            label: "Meet our Expert",
            description:
              "We schedule a consultation to understand your needs and budget.",
            image: step2,
          },
          {
            label: "Book with Us",
            description:
              "Lock your package and project plan with a transparent proposal.",
            image: step3,
          },
          {
            label: "Receive Designs",
            description:
              "Get concept drawings and revise them until you're happy.",
            image: step4,
          },
          {
            label: "Track & Transact",
            description:
              "We use an escrow-like model. Funds move stage‑wise, and you can track progress from your customer app.",
            image: step5,
          },
          {
            label: "Settle In",
            description: "Handover and move in with post‑completion support.",
            image: step6,
          },
        ]}
      />

      <section className="grid gap-6 md:grid-cols-5">
        <Card className="relative overflow-hidden md:col-span-3">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand/10 to-transparent" />
          <CardHeader className="pb-2">
            <CardTitle>“Professional team, zero surprises.”</CardTitle>
            <CardDescription>Homeowner • Sarjapur Road</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">
            On-time delivery and clear communication. Loved the weekly updates
            with photos and the transparent billing. Would recommend Decimal
            Builders to anyone building in Bangalore.
            <div className="mt-4">
              <Link href="/reviews">
                <Button
                  variant="outline"
                  size="sm"
                  className="brand-border rounded-lg"
                >
                  Read reviews
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>PDF & gallery space</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-lg ring-1 ring-black/10 dark:ring-white/10">
              <Image
                src="/images/profile-cover.jpg" // TODO: replace with your image
                alt="Company profile preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-sm font-semibold text-white">
                View PDF • 12 MB
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/media/profile.pdf" target="_blank">
                <Button size="sm" className="rounded-lg">
                  Open PDF
                </Button>
              </Link>
              <Link href="/news">
                <Button
                  size="sm"
                  variant="outline"
                  className="brand-border rounded-lg"
                >
                  News & Media
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
