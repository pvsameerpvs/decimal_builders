// components/pros/ProsHero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HardHat, Shield, HandCoins } from "lucide-react";

export default function ProsHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white to-brand/10 dark:from-zinc-950 dark:to-brand/10" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full brand-bg opacity-20 blur-3xl" />

      <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-10">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <HardHat className="h-3.5 w-3.5" />
            Trusted Partners Network
          </div>
          <h1 className="h-heading mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            Join us as a professional
          </h1>
          <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-300 md:text-base">
            We work with verified subcontractors and specialists across civil,
            MEP, interiors and finishing. Get transparent scopes, on-time
            payments, and repeat work.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link href="#apply">
              <Button
                size="sm"
                className="h-9 rounded-lg px-3 text-xs md:h-10 md:px-4 md:text-sm"
              >
                Apply now
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="sm"
                variant="outline"
                className="brand-border h-9 rounded-lg px-3 text-xs md:h-10 md:px-4 md:text-sm"
              >
                How we work
              </Button>
            </Link>
          </div>

          {/* quick badges */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs md:text-sm">
            <div className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-brand" />
              <span className="font-semibold">Scope clarity</span>
            </div>
            <span className="h-4 w-px bg-black/10 dark:bg-white/10" />
            <div className="inline-flex items-center gap-1.5">
              <HandCoins className="h-4 w-4 text-brand" />
              <span className="font-semibold">On-time payments</span>
            </div>
          </div>
        </div>

        {/* optional visual placeholder */}
        <div className="relative hidden md:block">
          <div className="h-full min-h-[220px] rounded-xl border bg-white/60 p-4 text-sm shadow-sm ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10">
            <div className="font-semibold">Why partner with us?</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-300">
              <li>Stage-wise releases via transparent milestone tracker</li>
              <li>Clear BOQs and drawings before mobilization</li>
              <li>Dedicated site coordination and fast RFI closure</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
