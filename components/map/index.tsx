"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useCity } from "@/app/hooks/useCity";

/**
 * Simple, fast Google Maps embed that follows the selected city.
 * You can swap to Mapbox later without changing usage sites.
 */
export default function MapBox() {
  const { city } = useCity();

  const q = useMemo(() => {
    // Query uses address if present, else city label
    return encodeURIComponent(
      city.address?.[0] || `${city.label} office Decimal Builders`
    );
  }, [city]);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-72 w-full md:h-80">
        <iframe
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          title={`Map — ${city.label}`}
        />
      </div>
    </Card>
  );
}
