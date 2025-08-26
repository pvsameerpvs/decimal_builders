"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import RatingSummary from "@/components/reviews/RatingSummary";
import TextReviews from "@/components/reviews/TextReviews";
import VideoTestimonials from "@/components/reviews/VideoTestimonials";
import ShortsGrid from "@/components/reviews/ShortsGrid";
import {
  TEXT_REVIEWS,
  VIDEO_REVIEWS,
  SHORTS,
  averageRating,
  distribution,
} from "@/app/data/reviews";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const metadata = { title: "Reviews" };

export default function Page() {
  const avg = averageRating(TEXT_REVIEWS);
  const dist = distribution(TEXT_REVIEWS);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
            Reviews
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
            Real customer feedback—watch handovers, browse Shorts, and read
            verified text reviews.
          </p>
        </div>
        <Link href="/contact" className="shrink-0">
          <Button size="sm" className="rounded-lg">
            <MessageSquare className="mr-2 h-4 w-4" />
            Write a review
          </Button>
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left: sticky rating summary */}
        <div className="lg:sticky lg:top-20 h-max">
          <RatingSummary avg={avg} total={TEXT_REVIEWS.length} dist={dist} />
        </div>

        {/* Right: tabs content */}
        {/* Right: tabs content */}
        <Tabs defaultValue="videos" className="space-y-4">
          {/* Scrollable Tabs header on mobile */}
          <div className="-mx-3 sm:mx-0">
            <div className="overflow-x-auto px-0 sm:px-3">
              <TabsList
                className="
          inline-flex min-w-max gap-1 rounded-lg bg-muted p-1
          w-full justify-start sm:w-auto
        "
              >
                <TabsTrigger
                  value="videos"
                  className="px-3 py-2 text-xs sm:text-sm sm:px-4"
                >
                  Video Testimonials
                </TabsTrigger>
                <TabsTrigger
                  value="text"
                  className="px-3 py-2 text-xs sm:text-sm sm:px-4"
                >
                  Text Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="shorts"
                  className="px-3 py-2 text-xs sm:text-sm sm:px-4"
                >
                  YouTube Shorts
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="videos">
            <VideoTestimonials items={VIDEO_REVIEWS} />
          </TabsContent>

          <TabsContent value="text">
            <TextReviews items={TEXT_REVIEWS} />
          </TabsContent>

          <TabsContent value="shorts">
            <ShortsGrid items={SHORTS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
