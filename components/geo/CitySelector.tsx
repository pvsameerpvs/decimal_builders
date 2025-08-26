"use client";

import { useState } from "react";
import { useCity } from "@/app/hooks/useCity";
import { CITIES } from "@/app/data/cities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CityContactForm from "@/components/forms/CityContactForm";
import { MapPin, ChevronDown } from "lucide-react";

export default function CitySelector() {
  const { city, setCityId } = useCity();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger pill — small & compact */}
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="inline-flex h-7 items-center rounded-full border-brand/20 bg-brand/10 px-2 text-[11px] font-semibold text-brand hover:bg-brand/15"
        aria-label="Change city"
      >
        {city.label}
        <ChevronDown className="ml-1 h-3.5 w-3.5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* p-0 to let us make header/footer sticky; custom max width + height */}
        <DialogContent className="z-[999999] max-w-[95vw] sm:max-w-2xl p-0 overflow-hidden">
          {/* Sticky header for better UX on small screens */}
          <DialogHeader className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
            <DialogTitle className="text-sm font-semibold">
              Choose your city
            </DialogTitle>
            <DialogDescription className="text-xs">
              We tailor pricing, timelines, and contacts based on your city.
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable body */}
          <div className="max-h-[70vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 space-y-4">
            {/* City options */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {CITIES.map((c) => {
                const active = c.id === city.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCityId(c.id)}
                    className={[
                      "rounded-xl border p-3 text-left transition",
                      active
                        ? "border-brand bg-brand/5"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-brand">
                        <MapPin className="h-3.5 w-3.5" />
                      </span>
                      <div className="text-sm font-semibold">{c.label}</div>
                    </div>
                    {c.blurb && (
                      <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                        {c.blurb}
                      </p>
                    )}
                    {c.address?.length ? (
                      <p className="mt-1 text-[11px] text-zinc-500">
                        {c.address[0]}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Selected city details + form */}
            <div className="rounded-xl border p-3 sm:p-4">
              <div className="mb-2 text-sm font-semibold">
                Contact – {city.label}
              </div>
              <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-0.5">
                {city.address?.map((line) => (
                  <li key={line}>{line}</li>
                ))}
                {city.hours ? <li>Hours: {city.hours}</li> : null}
                <li>Phone: {city.phone}</li>
              </ul>

              <div className="mt-3">
                <CityContactForm
                  cityLabel={city.label}
                  whatsappUrl={city.whatsapp}
                />
              </div>
            </div>
          </div>

          {/* Sticky footer */}
          <DialogFooter className="sticky bottom-0 z-10 border-t bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
            <Button
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
