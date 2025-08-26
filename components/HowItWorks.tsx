"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepItem = {
  label: string;
  subLabel?: string;
  description?: string;
  image?: StaticImageData | string;
};

export type HowItWorksStepperProps = {
  steps: StepItem[];
  title?: string;
  subtitle?: string;
  initial?: number;
  autoplayMs?: number;
  accentClassName?: string;
  className?: string;
};

export default function HowItWorksStepper({
  steps,
  title = "How it works",
  subtitle,
  initial = 0,
  autoplayMs = 0,
  accentClassName = "bg-zinc-900 dark:bg-zinc-100",
  className,
}: HowItWorksStepperProps) {
  const [active, setActive] = React.useState(
    Math.min(Math.max(0, initial), Math.max(0, steps.length - 1))
  );

  React.useEffect(() => {
    if (!autoplayMs) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % steps.length),
      autoplayMs
    );
    return () => clearInterval(t);
  }, [autoplayMs, steps.length]);

  const go = (i: number) => setActive(i);
  const prev = () => setActive((i) => (i - 1 + steps.length) % steps.length);
  const next = () => setActive((i) => (i + 1) % steps.length);

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        ) : null}
      </div>

      {/* Stepper rail */}
      <div className="relative mx-auto mt-6 max-w-6xl px-4">
        <ol className="grid grid-cols-3 gap-4 md:flex md:flex-row md:items-start md:justify-between">
          {steps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li
                key={i}
                className="group flex flex-col items-center text-center md:w-40"
              >
                <button
                  onClick={() => go(i)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset transition-all",
                    isActive
                      ? cn(
                          accentClassName,
                          "text-white ring-transparent shadow-sm"
                        )
                      : isDone
                      ? "bg-zinc-100 text-zinc-900 ring-zinc-300 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700"
                      : "bg-white text-zinc-900 ring-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
                  )}
                >
                  {isDone ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{i + 1}</span>
                  )}
                </button>
                <div className="mt-2 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {s.label}
                </div>
                {s.subLabel ? (
                  <div className="mt-1 hidden text-[11px] text-zinc-500 dark:text-zinc-400 md:block">
                    {s.subLabel}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Content & visual */}
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 items-start gap-6 px-4 lg:grid-cols-2">
        <div className="order-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:order-1">
          <div className="relative aspect-[16/10] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={String(steps[active]?.image) + active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {steps[active]?.image ? (
                  <Image
                    src={steps[active].image as any}
                    alt={steps[active].label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                    Add an image for this step
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="order-1 flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:order-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(steps.length).padStart(2, "0")}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {steps[active]?.label}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={prev}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
            >
              {steps[active]?.description ?? "Add a description for this step."}
            </motion.p>
          </AnimatePresence>

          <div className="mt-4 grid grid-cols-6 gap-2 md:hidden">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active
                    ? cn(accentClassName)
                    : "bg-zinc-300 dark:bg-zinc-700"
                )}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
