"use client";

import { useEffect, useState } from "react";
import { CITIES, type City, type CityId } from "@/app/data/cities";

const KEY = "db_city"; // localStorage key
const DEFAULT_ID: CityId = "Bangalore";

export function useCity() {
  const [cityId, setCityId] = useState<CityId>(DEFAULT_ID);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) as CityId | null;
      if (saved && CITIES.some((c) => c.id === saved)) {
        setCityId(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, cityId);
    } catch {}
  }, [cityId]);

  const city: City =
    CITIES.find((c) => c.id === cityId) ??
    CITIES.find((c) => c.id === DEFAULT_ID)!;

  return { city, cityId, setCityId };
}
