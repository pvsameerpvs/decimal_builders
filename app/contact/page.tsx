import dynamic from "next/dynamic";
import ContactForm from "@/components/forms/ContactForm";
import OfficeCards from "@/components/contact/OfficeCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MapBox = dynamic(() => import("@/components/map"), { ssr: false });

export const metadata = { title: "Contact Us" };

export default function Contact() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
          Contact Us
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
          We’re primarily based in <span className="font-semibold">India</span>{" "}
          (with Dubai ops). Share a few details and our city team will get back
          within 24–48 hours.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        {/* Reusable form (EmailJS) */}
        <ContactForm contextTag="Contact Page" />

        {/* Map + offices */}
        <div className="space-y-4">
          <MapBox />
          <OfficeCards />
          <div className="flex gap-2">
            <Link href="/how-it-works">
              <Button variant="outline" className="brand-border">
                See how we work
              </Button>
            </Link>
            <Link href="/cost-calculator">
              <Button>Get rough estimate</Button>
            </Link>
          </div>
          <p className="text-xs text-zinc-500">
            Tip: You can switch your city from the header to update contacts and
            map automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
