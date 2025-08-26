"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { useCity } from "@/app/hooks/useCity";

// Props the dynamically-loaded component will accept
type LeafletMapProps = {
  center: [number, number];
  label?: string;
  height?: number;
  className?: string;
};

const LeafletMap = dynamic<LeafletMapProps>(
  async () => {
    const RL = await import("react-leaflet");
    const L = await import("leaflet");

    // Build icon URLs that Next/Webpack can reliably serve
    const markerIcon = new L.Icon({
      iconUrl: new URL(
        "leaflet/dist/images/marker-icon.png",
        import.meta.url
      ).toString(),
      iconRetinaUrl: new URL(
        "leaflet/dist/images/marker-icon-2x.png",
        import.meta.url
      ).toString(),
      shadowUrl: new URL(
        "leaflet/dist/images/marker-shadow.png",
        import.meta.url
      ).toString(),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Fly the map when the center changes
    function Recenter({ center }: { center: [number, number] }) {
      const map = RL.useMap();
      useEffect(() => {
        map.flyTo(center, map.getZoom(), { duration: 0.8 });
      }, [center, map]);
      return null;
    }

    const Component = ({
      center,
      label,
      height = 320,
      className = "",
    }: LeafletMapProps) => (
      <RL.MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom={false}
        className={`relative z-0 h-80 w-full overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10 ${className}`}
        style={{ height }}
      >
        <RL.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RL.Marker position={center} icon={markerIcon}>
          <RL.Popup>{label ?? "Decimal Builders"}</RL.Popup>
        </RL.Marker>
        <Recenter center={center} />
      </RL.MapContainer>
    );

    return Component as any;
  },
  { ssr: false }
);

export default function MapBox({
  className,
  height = 320,
}: {
  className?: string;
  height?: number;
}) {
  const { city } = useCity();

  const center = useMemo<[number, number]>(() => {
    // expects your CITIES to include coords: [lat, lng]
    return (city as any)?.coords ?? [12.9716, 77.5946];
  }, [city]);

  return (
    <LeafletMap
      center={center}
      label={`Decimal Builders — ${city.label}`}
      height={height}
      className={className}
    />
  );
}
