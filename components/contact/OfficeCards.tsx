import { Card } from "@/components/ui/card";
import { CITIES } from "@/app/data/cities";

export default function OfficeCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {CITIES.map((c) => (
        <Card key={c.id} className="p-4">
          <div className="text-sm font-semibold">{c.label} Office</div>
          <ul className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
            {c.address?.map((l) => (
              <li key={l}>{l}</li>
            ))}
            {c.phone ? <li>Phone: {c.phone}</li> : null}
            {c.hours ? <li>Hours: {c.hours}</li> : null}
          </ul>
        </Card>
      ))}
    </div>
  );
}
