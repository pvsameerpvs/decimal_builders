"use client";

import { Badge } from "@/components/ui/badge";
import { Palette, Ruler, FileText, Box } from "lucide-react";

export type PlanMedia = {
  design?: string[];
  floorplan?: string[];
  render3d?: string[];
  pdf?: string[];
};

export default function MediaChips({ media }: { media?: PlanMedia }) {
  if (!media) return null;

  const items: Array<{
    key: keyof PlanMedia;
    label: string;
    icon: React.ReactNode;
    has: boolean;
  }> = [
    {
      key: "design",
      label: "Design",
      icon: <Palette className="h-3.5 w-3.5" />,
      has: !!media.design?.length,
    },
    {
      key: "floorplan",
      label: "Plan",
      icon: <Ruler className="h-3.5 w-3.5" />,
      has: !!media.floorplan?.length,
    },
    {
      key: "render3d",
      label: "3D",
      icon: <Box className="h-3.5 w-3.5" />,
      has: !!media.render3d?.length,
    },
    {
      key: "pdf",
      label: "PDF",
      icon: <FileText className="h-3.5 w-3.5" />,
      has: !!media.pdf?.length,
    },
  ];

  const visible = items.filter((i) => i.has);
  if (!visible.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {visible.map((i) => (
        <Badge key={i.key} variant="secondary" className="gap-1">
          {i.icon}
          {i.label}
        </Badge>
      ))}
    </div>
  );
}
