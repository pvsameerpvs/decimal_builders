import { Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-zinc-100 p-2 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
          <Inbox className="h-5 w-5" />
        </span>
        <div>
          <div className="text-sm font-semibold">No openings at the moment</div>
          <div className="text-xs text-zinc-500">
            Join the talent pool below to be the first to know.
          </div>
        </div>
      </div>
    </Card>
  );
}
