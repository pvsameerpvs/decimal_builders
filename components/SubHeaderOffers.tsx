"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Offer = { href?: string; text: string };

type Props = {
  offers: Offer[];
  /** "static" (default) = normal bar; "once" = hide after first scroll; "autoHide" = hide on scroll down, show on scroll up */
  mode?: "static" | "once" | "autoHide";
  /** show a small ✕ on the right */
  dismissible?: boolean;
  className?: string;
};

export default function SubHeaderOffers({
  offers = [],
  mode = "static",
  dismissible = false,
  className,
}: Props) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide behavior
  useEffect(() => {
    if (mode === "static") return;

    if (mode === "once") {
      const once = () => setHidden(true);
      window.addEventListener("scroll", once, { once: true });
      return () => window.removeEventListener("scroll", once);
    }

    if (mode === "autoHide") {
      const onScroll = () => {
        const y = window.scrollY;
        const goingDown = y > lastY.current;
        setHidden(goingDown && y > 8); // hide when scrolling down past 8px
        lastY.current = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [mode]);

  if (hidden) return null;

  return (
    <div
      className={clsx(
        "relative bg-white text-black text-sm border-b border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800",
        className
      )}
    >
      <div className="container-max flex justify-center py-1 px-2">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-fit"
        >
          <CarouselContent>
            {offers.map((offer, index) => (
              <CarouselItem key={index} className="flex-shrink-0 w-full">
                <Link
                  href={offer.href || "#"}
                  className={
                    offer.href ? "cursor-pointer" : "pointer-events-none"
                  }
                >
                  <div className="flex justify-center">
                    <div
                      className={
                        offer.text.length > 50
                          ? "text-[9px] md:text-sm"
                          : offer.text.length > 40
                          ? "text-[10px] md:text-sm"
                          : "text-xs md:text-sm"
                      }
                    >
                      {offer.text}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {dismissible && (
        <button
          aria-label="Dismiss offers"
          onClick={() => setHidden(true)}
          className="absolute right-2 top-1 rounded px-2 py-0.5 text-xs opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
