import MediaHero from "@/components/news/MediaHero";
import NewsGrid from "@/components/news/NewsGrid";
import VideoGrid from "@/components/news/VideoGrid";
import InstaGrid from "@/components/news/InstaGrid";
import { NEWS, VIDEOS, INSTAGRAM } from "@/app/data/media";

export const metadata = { title: "News & Media" };

export default function Page() {
  return (
    <div className="space-y-8">
      <MediaHero />
      <NewsGrid items={NEWS} />
      <VideoGrid items={VIDEOS} />
      <InstaGrid items={INSTAGRAM} />
    </div>
  );
}
