// components/custom-builder/FeatureCard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function FeatureCard({
  id,
  title,
  description,
  category,
  impact,
  mode, // "available" | "selected"
  onAdd,
  onRemove,
}: {
  id: string;
  title: string;
  description: string;
  category: string;
  impact?: string;
  mode: "available" | "selected";
  onAdd?: () => void;
  onRemove?: () => void;
}) {
  const sortable = useSortable({ id, disabled: mode === "available" });
  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <Card
      ref={sortable.setNodeRef}
      style={style}
      {...sortable.attributes}
      {...sortable.listeners}
      className="flex items-start justify-between gap-3 p-3"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">
          {description}
        </div>
        {impact && (
          <div className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {impact}
          </div>
        )}
        <div className="mt-1 text-[11px] uppercase tracking-wide text-zinc-500">
          {category}
        </div>
      </div>

      {mode === "available" ? (
        <Button size="sm" onClick={onAdd} className="shrink-0">
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      ) : (
        <Button
          size="icon"
          variant="outline"
          onClick={onRemove}
          className="shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </Card>
  );
}
