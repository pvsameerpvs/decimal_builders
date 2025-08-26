"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCity } from "@/app/hooks/useCity";
import NextImage from "next/image";
import {
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Careers", href: "/careers" },
  { label: "Join as a professional", href: "/join-as-professional" },
];

const SERVICES = [
  { label: "Construction Packages", href: "/construction-packages" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Custom Builder", href: "/custom-builder" },
  { label: "Cost Calculator", href: "/cost-calculator" },
];

const RESOURCES = [
  { label: "Our Projects", href: "/projects" },
  { label: "Blogs & Articles", href: "/blogs" },
  { label: "Reviews", href: "/reviews" },
  { label: "News & Media", href: "/news" },
];

export default function Footer() {
  const { city } = useCity();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="mt-16 border-t bg-white dark:border-white/10 dark:bg-zinc-950">
      {/* Top CTA bar (subtle) */}
      <div className="container-max">
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
            <span className="inline-flex h-2 w-2 rounded-full bg-brand" />
            <span className="font-semibold">Build with confidence.</span>
            <span className="text-zinc-500 dark:text-zinc-400">
              Transparent pricing • On-time delivery • QA checks
            </span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Start a project <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-max">
        <div className="grid min-h-[280px] grid-cols-1 gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <NextImage
                src="/logo-dark-desktop.svg"
                alt="Decimal Builders logo"
                width={160}
                height={40}
                priority
                className="h-5 w-auto select-none md:h-5 lg:h-10"
                sizes="(min-width: 768px) 160px"
              />
            </div>
            <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-300">
              Full-service construction across India (with Dubai ops). Turnkey
              villas, extensions, and renovations with radical transparency.
            </p>

            {/* Socials */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://instagram.com/"
                target="_blank"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md ring-1 ring-black/10 transition hover:bg-zinc-100 dark:ring-white/10 dark:hover:bg-zinc-900"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md ring-1 ring-black/10 transition hover:bg-zinc-100 dark:ring-white/10 dark:hover:bg-zinc-900"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md ring-1 ring-black/10 transition hover:bg-zinc-100 dark:ring-white/10 dark:hover:bg-zinc-900"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md ring-1 ring-black/10 transition hover:bg-zinc-100 dark:ring-white/10 dark:hover:bg-zinc-900"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-zinc-700 underline-offset-4 transition hover:underline dark:text-zinc-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-zinc-700 underline-offset-4 transition hover:underline dark:text-zinc-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (auto from selected city) */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
              Contact — {city.label}
            </h4>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
              {city.address?.length ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-brand" />
                  <span className="leading-snug">
                    {city.address.map((a) => (
                      <span key={a} className="block">
                        {a}
                      </span>
                    ))}
                  </span>
                </li>
              ) : null}

              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                <a href={`tel:${city.phone}`} className="hover:underline">
                  {city.phone}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-brand" />
                <a
                  href={city.whatsapp}
                  target="_blank"
                  className="hover:underline"
                >
                  WhatsApp — {city.label}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                <a
                  href="mailto:info@decimal.builders"
                  className="hover:underline"
                >
                  info@decimal.builders
                </a>
              </li>

              {city.hours ? (
                <li className="text-xs text-zinc-500 dark:text-zinc-400">
                  Hours: {city.hours}
                </li>
              ) : null}
            </ul>

            {/* Quick CTA */}
            <div className="mt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Start a quote
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-3 dark:border-white/10">
        <div className="container-max flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
          <div>© {year} Decimal Builders. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/sitemap" className="hover:underline">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
