"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import clsx from "clsx";
import {
  Menu,
  ChevronDown,
  Phone,
  Building2,
  Layers,
  Ruler,
  HelpCircle,
  Megaphone,
  Calculator,
  Home,
  BookUser,
  Package,
  Newspaper,
  Briefcase,
  Users,
  Star,
  Hammer,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useCity } from "@/app/hooks/useCity";
import CitySelector from "@/components/geo/CitySelector";
import NextImage from "next/image";
import ThemeToggle from "./theme-toggle";
import { useTheme } from "next-themes";
import SubHeaderOffers from "./SubHeaderOffers";

const NAV = [
  { label: "Our Projects", href: "/projects" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Cost Estimator", href: "/estimators" },
  { label: "How it Works", href: "/how-it-works" },
];

const MORE = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Construction Packages", href: "/construction-packages" },
  { label: "Blogs & Articles", href: "/blogs" },
  { label: "Cost Calculator", href: "/cost-calculator" },
  { label: "Custom Builder", href: "/custom-builder" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "News & Media", href: "/news" },
  { label: "Join as a professional", href: "/join-as-professional" },
  { label: "Reviews", href: "/reviews" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { city } = useCity();
  const { resolvedTheme } = useTheme(); // respects your theme button
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeHref = useMemo(() => {
    const match = NAV.find(
      (n) => pathname === n.href || pathname.startsWith(n.href + "/")
    );
    return match?.href ?? null;
  }, [pathname]);

  if (!mounted) {
    // Avoid hydration mismatch—render nothing until theme is known
    return null;
  }

  const isDark = resolvedTheme === "dark";

  // Use YOUR exact files
  const mobileSrc = isDark ? "/logo-dark-mobile.png" : "/logo-light-mobile.png";
  const desktopSrc = isDark
    ? "/logo-dark-desktop.svg"
    : "/logo-dark-desktop.svg";
  const offers = [
    {
      text: "🌸 Onam Special: Flat 15% OFF on all Home Construction Packages",
      href: "/contact",
    },
    {
      text: "🏠 Book your dream home this Onam & get FREE site visits across Bangalore",
      href: "/contact",
    },
    {
      text: "🎁 Onam Gift: Complimentary interior design consultation on every package",
      href: "/contact",
    },
    {
      text: "🪔 Limited Time: Onam Festive Discounts valid till Thiruvonam day!",
      href: "/contact",
    },
  ];
  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full border-b bg-white/85 backdrop-blur-md transition-all dark:border-white/10 dark:bg-zinc-950/80",
        scrolled ? "shadow-sm" : "shadow-none"
      )}
    >
      <SubHeaderOffers offers={offers} mode="autoHide" />

      {/* 3-column grid: logo (start) / nav (center) / actions (end) */}
      <div
        className="
          container-max grid items-center
          h-14 md:h-18 lg:h-20
        
          gap-x-2 md:gap-x-4 lg:gap-x-6
        "
      >
        {/* LEFT: burger + logo */}
        <div className="col-start-1 flex min-w-0 items-center gap-2 md:gap-3">
          <button
            className="rounded-lg p-2 ring-1 ring-black/10 transition hover:bg-black/5 dark:ring-white/10 dark:hover:bg-white/5 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link
            href="/"
            aria-label="Decimal Builders — Home"
            className="group flex min-w-0 items-center"
          >
            {/* Desktop (>= md) */}
            <NextImage
              src={desktopSrc}
              alt="Decimal Builders logo"
              width={160}
              height={40}
              priority
              sizes="(min-width: 768px) 160px"
              className="hidden h-8 w-auto select-none md:block md:h-9 lg:h-10"
            />
          </Link>
        </div>

        {/* CENTER: site nav (desktop & up only) */}
        <nav className="col-start-2 hidden items-center justify-center gap-6 md:flex">
          {NAV.map((item) => {
            const isActive =
              activeHref &&
              (item.href === activeHref || activeHref.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group relative whitespace-nowrap text-[13.5px] font-semibold leading-none transition",
                  isActive ? "text-black dark:text-white" : "hover:opacity-80"
                )}
              >
                {item.label}
                {!isActive && (
                  <span className="absolute -bottom-[6px] left-0 h-[2px] w-0 bg-brand transition-all duration-200 group-hover:w-full" />
                )}
                {isActive && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-[6px] left-0 h-[2px] w-full bg-brand"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 140)}
              className="flex items-center gap-1 whitespace-nowrap text-[13.5px] font-semibold leading-none transition hover:opacity-80"
            >
              More <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
                >
                  {MORE.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      className={clsx(
                        "block rounded-lg px-3 py-2 text-[13px] leading-none transition hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        pathname === m.href || pathname.startsWith(m.href + "/")
                          ? "font-semibold text-brand"
                          : "font-medium"
                      )}
                    >
                      {m.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* RIGHT: actions (desktop & up) */}
        <div className="col-start-3 hidden items-center justify-end gap-3 md:flex lg:gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-brand px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Build
          </Link>
          <div className="h-4 w-px bg-black/10 dark:bg-white/15" />
          <Link
            href={city.whatsapp}
            target="_blank"
            className="group flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition group-hover:scale-105 dark:bg-white dark:text-black">
              <Phone className="h-3.5 w-3.5" />
            </span>
            <span className="text-[12px] font-bold leading-none">
              {city.phone}
            </span>
          </Link>
          {/* City selector at far right on desktop */}
          <div className="ml-2 hidden lg:flex">
            <CitySelector />
          </div>
          <div className="ml-2 hidden lg:flex">
            <ThemeToggle />
          </div>
        </div>
        {/* Mobile / tablet (<= md) */}
        <NextImage
          src={mobileSrc}
          alt="Decimal Builders logo"
          width={160}
          height={40}
          priority
          sizes="(max-width: 767px) 128px"
          className="h-8 w-auto select-none justify-self-center pl-3 md:hidden"
        />
        {/* MOBILE/TABLET: CitySelector fixed at far right, same row */}
        <div className="col-start-3 row-start-1 justify-self-end md:hidden">
          <CitySelector />
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="flex h-full flex-col">
          {/* Top bar with logo */}
          <div className="flex items-center justify-between border-b px-4 py-3 dark:border-white/10">
            <NextImage
              src={desktopSrc}
              alt="Decimal Builders logo"
              width={140}
              height={36}
              priority
              className="h-5 md:h-6 lg:h-7 w-auto select-none"
            />

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 ring-1 ring-black/10 transition hover:bg-black/5 dark:ring-white/10 dark:hover:bg-white/5"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Primary menu */}
          <div className="mt-3 flex-1 overflow-y-auto px-2">
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {
                  transition: { staggerChildren: 0.02, staggerDirection: -1 },
                },
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="space-y-1"
            >
              {[
                { href: "/projects", label: "Our Projects", icon: Building2 },
                { href: "/floor-plans", label: "Floor Plans", icon: Layers },
                { href: "/estimators", label: "Cost Estimator", icon: Ruler },
                {
                  href: "/how-it-works",
                  label: "How it Works",
                  icon: HelpCircle,
                },
                { href: "/", label: "Home", icon: Home },
                { href: "/about", label: "About Us", icon: BookUser },
                {
                  href: "/construction-packages",
                  label: "Construction Packages",
                  icon: Package,
                },
                { href: "/blogs", label: "Blogs & Articles", icon: Newspaper },
                {
                  href: "/cost-calculator",
                  label: "Cost Calculator",
                  icon: Calculator,
                },
                {
                  href: "/custom-builder",
                  label: "Custom Builder",
                  icon: Hammer,
                },
                { href: "/careers", label: "Careers", icon: Briefcase },
                { href: "/contact", label: "Contact Us", icon: Phone },
                { href: "/news", label: "News & Media", icon: Megaphone },
                {
                  href: "/join-as-professional",
                  label: "Join as a professional",
                  icon: Users,
                },
                { href: "/reviews", label: "Reviews", icon: Star },
              ].map(({ href, label, icon: Icon }) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="group relative flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <span className="absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r w-0 bg-transparent" />
                    <Icon className="h-5 w-5 text-brand" />
                    <span className="text-sm font-semibold">{label}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Bottom actions */}
          <div className="border-t bg-white px-3 py-2 dark:border-white/10 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              {/* Primary actions (equal width) */}
              <div className="grid flex-1 grid-cols-2 gap-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 items-center justify-center rounded-lg bg-brand px-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                >
                  Build
                </Link>

                <Link
                  href={city.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg text-xs ring-1 ring-black/10 transition hover:bg-zinc-50 dark:ring-white/10 dark:hover:bg-zinc-800/40"
                >
                  <Phone className="h-3 w-3 pl-1" />
                  <span className="truncate pr-1">{city.phone}</span>
                </Link>
              </div>

              {/* Compact theme toggle at far right */}
              <ThemeToggle
                aria-label="Toggle theme"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg ring-1 ring-black/10 dark:ring-white/10"
              />
            </div>
          </div>
        </div>
      </Sheet>
    </header>
  );
}
