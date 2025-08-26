export type CityId = "Bangalore" | "Kerala" | "Dubai";

export type City = {
  id: CityId;
  label: string;
  phone: string;
  whatsapp: string;           // full wa.me link with prefilled text
  address?: string[];
  hours?: string;
  blurb?: string;

  // 👇 NEW (used by the Map component and for formatting/pricing if you want)
  coords: [number, number];   // [lat, lng]
  locale?: string;            // e.g. "en-IN", "en-AE"
  currency?: "INR" | "AED";   // optional convenience
};

export const CITIES: City[] = [
  {
    id: "Bangalore",
    label: "Bangalore",
    phone: "+91 98765 43210",
    whatsapp:
      "https://wa.me/919876543210?text=Hi%20Decimal%20Builders!%20I%E2%80%99m%20from%20Bangalore%20and%20would%20like%20to%20discuss%20my%20project.",
    address: ["Indiranagar, Bangalore, KA 560038"],
    hours: "Mon–Sat, 10 AM – 7 PM",
    blurb: "Turnkey villas, extensions & renovations across Bengaluru.",
    coords: [12.9716, 77.5946],  // ✅ Bengaluru
    locale: "en-IN",
    currency: "INR",
  },
  {
    id: "Kerala",
    label: "Kerala",
    phone: "+91 98765 43211",
    whatsapp:
      "https://wa.me/919876543211?text=Hi%20Decimal%20Builders!%20I%E2%80%99m%20from%20Kerala%20and%20would%20like%20to%20discuss%20my%20project.",
    address: ["MG Road, Kochi, KL 682035"],
    hours: "Mon–Sat, 10 AM – 7 PM",
    blurb: "Homes designed for Kerala climate with local materials.",
    coords: [9.9312, 76.2673],   // ✅ Kochi
    locale: "en-IN",
    currency: "INR",
  },
  {
    id: "Dubai",
    label: "Dubai",
    phone: "+971 50 123 4567",
    whatsapp:
      "https://wa.me/971501234567?text=Hi%20Decimal%20Builders!%20I%E2%80%99m%20from%20Dubai%20and%20would%20like%20to%20discuss%20my%20project.",
    address: ["Business Bay, Dubai, UAE"],
    hours: "Sun–Thu, 9 AM – 6 PM",
    blurb: "Premium finishes & fast-track delivery across Dubai.",
    coords: [25.2048, 55.2708],  // ✅ Dubai
    locale: "en-AE",
    currency: "AED",
  },
];
