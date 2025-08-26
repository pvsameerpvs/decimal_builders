import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950/60 md:p-8">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">
            Ready to plan your build?
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Get a city-aware estimate and a call from a project expert.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/cost-calculator">
            <Button size="sm" className="rounded-lg px-4">
              Get an estimate
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="sm"
              variant="outline"
              className="brand-border rounded-lg px-4"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Speak to an expert
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
