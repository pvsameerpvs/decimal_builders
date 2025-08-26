// components/pros/ProApplyForm.tsx
"use client";

import * as React from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { useCity } from "@/app/hooks/useCity";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
  name: string;
  company?: string;
  trade: string;
  experience: string;
  city: string;
  phone?: string;
  email: string;
  portfolio?: string; // drive/linkedin/instagram
  message?: string;
};

const TRADES = [
  "Civil / Masonry",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Flooring",
  "Painting",
  "False Ceiling",
  "Waterproofing",
  "Fabrication",
  "Landscaping",
];

export default function ProApplyForm() {
  const pathname = usePathname();
  const { city } = useCity();
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        name: "",
        company: "",
        trade: TRADES[0],
        experience: "3+ years",
        city: city.label,
        phone: "",
        email: "",
        portfolio: "",
        message: "",
      },
    });

  // Keep city synced if changed in header
  React.useEffect(() => {
    setValue("city", city.label);
  }, [city.label, setValue]);

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    try {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          ...values,
          subject: "Professional Onboarding",
          context: "Pro Signup",
          page_path: pathname,
        }
      );
      setStatus("sent");
      reset({
        ...values,
        name: "",
        company: "",
        phone: "",
        email: "",
        portfolio: "",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 3500);
    } catch (e) {
      console.error(e);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  }

  const disabled = status === "sending";

  return (
    <Card className="p-4 sm:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium">Full name*</label>
            <Input
              {...register("name", { required: true })}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Company</label>
            <Input
              {...register("company")}
              placeholder="Company / Firm (optional)"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Trade*</label>
            <select
              {...register("trade", { required: true })}
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            >
              {TRADES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Experience*
            </label>
            <select
              {...register("experience", { required: true })}
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            >
              {["1–3 years", "3+ years", "5+ years", "10+ years"].map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">City*</label>
            <Input
              {...register("city", { required: true })}
              placeholder="Your city"
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              Tip: Use the header city switcher to update this automatically.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Email*</label>
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Phone / WhatsApp
            </label>
            <Input {...register("phone")} placeholder="+91 XXXXX XXXXX" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Portfolio / Links
            </label>
            <Input
              {...register("portfolio")}
              placeholder="Drive / Instagram / Website"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">Notes</label>
          <Textarea
            {...register("message")}
            placeholder="Team size, tools, recent work, preferred areas…"
            className="min-h-[110px]"
          />
        </div>

        <Button type="submit" className="w-full" disabled={disabled}>
          {status === "sending"
            ? "Submitting…"
            : status === "sent"
            ? "Submitted ✓"
            : status === "error"
            ? "Failed — try again"
            : "Submit application"}
        </Button>

        <p className="text-[11px] text-zinc-500">
          We verify profiles before assigning work. Your details remain
          confidential.
        </p>
      </form>
    </Card>
  );
}
