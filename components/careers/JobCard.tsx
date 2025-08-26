import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Job } from "@/app/data/careers";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold">{job.title}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {job.snippet}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {job.type}
            </span>
            {job.experience && <span>{job.experience} experience</span>}
          </div>
        </div>
        <Link href={`/careers/${job.id}`} className="shrink-0">
          <Button size="sm" className="rounded-lg">
            View
          </Button>
        </Link>
      </div>
    </Card>
  );
}
