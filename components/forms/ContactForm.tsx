"use client";

import * as React from "react";
import emailjs from "@emailjs/browser";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCity } from "@/app/hooks/useCity";

/* ------------------- validation ------------------- */
const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  city: z.string().min(2, "Enter your city"),
  subject: z.string().min(2, "Enter a subject"),
  budget: z.string().optional(),
  timeframe: z.string().optional(),
  message: z.string().min(10, "Please add at least 10 characters"),
});

type FormValues = z.infer<typeof Schema>;

/* ------------------- component ------------------- */
type Props = {
  heading?: string;
  defaultSubject?: string;
  contextTag?: string; // e.g. "Contact Page", "Packages", "Custom Builder"
  compact?: boolean; // for footer/modals
};

export default function ContactForm({
  heading = "Tell us about your project",
  defaultSubject = "General Enquiry",
  contextTag = "Contact Page",
  compact = false,
}: Props) {
  const { city } = useCity();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: city.label,
      subject: defaultSubject,
      message: "",
      budget: "",
      timeframe: "",
    },
  });

  // keep city in sync if user changes it via header selector
  React.useEffect(() => {
    setValue("city", city.label, { shouldValidate: true });
  }, [city.label, setValue]);

  const [sendError, setSendError] = React.useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setSendError(null);
    try {
      // Safe on client only (this file is "use client")
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          ...values,
          context: contextTag,
          page_path: pathname,
          user_agent:
            typeof window !== "undefined" ? navigator.userAgent : "server",
        }
      );

      // reset but keep city + default subject
      reset({
        name: "",
        email: "",
        phone: "",
        city: city.label,
        subject: defaultSubject,
        message: "",
        budget: "",
        timeframe: "",
      });
    } catch (err: any) {
      console.error(err);
      setSendError("Failed to send. Please try again.");
    }
  };

  return (
    <Card className={`space-y-4 p-4 sm:p-6 ${compact ? "md:p-4" : ""}`}>
      <div>
        <h3 className="text-lg font-extrabold tracking-tight">{heading}</h3>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
          You’re contacting our{" "}
          <span className="font-semibold">{city.label}</span> team.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Input
              placeholder="Your name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              type="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="Phone / WhatsApp" {...register("phone")} />
          </div>

          <div>
            <Input
              placeholder="City"
              aria-invalid={!!errors.city}
              {...register("city")}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Subject"
              aria-invalid={!!errors.subject}
              {...register("subject")}
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <Input placeholder="Budget (₹)" {...register("budget")} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Timeline (e.g., 6 months)"
            {...register("timeframe")}
          />
          <Input
            placeholder="Project Type (Villa / Renovation / Commercial)"
            // If you want this to be a separate field, keep it as `timeframe`/another key.
            // Otherwise you can bind it to `subject` like you had:
            // {...register("subject")}
          />
        </div>

        <div>
          <Textarea
            placeholder="Project details, plot size, floors, special requirements…"
            className="min-h-[120px]"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send"}
        </Button>

        {/* Submit result messages */}
        {isSubmitSuccessful && !sendError && (
          <p className="text-center text-xs text-green-600">Sent ✓</p>
        )}
        {sendError && (
          <p className="text-center text-xs text-red-600">{sendError}</p>
        )}
      </form>

      <p className="text-[11px] text-zinc-500">
        We never share your details. Replies usually within 24–48 hours.
      </p>
    </Card>
  );
}
