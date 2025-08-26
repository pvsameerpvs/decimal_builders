"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// install: @dnd-kit/core @dnd-kit/sortable
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, CheckCircle2 } from "lucide-react";

type ValueItem = {
  id: string;
  title: string;
  blurb: string;
};

const DEFAULT: ValueItem[] = [
  {
    id: "transparency",
    title: "Transparency",
    blurb: "Open BOQs, stage-wise payments, zero hidden extras.",
  },
  {
    id: "quality",
    title: "Quality First",
    blurb: "ISO-grade checklists and third-party QA at milestones.",
  },
  {
    id: "speed",
    title: "On-time Delivery",
    blurb: "Realistic schedules, weekly tracking, escalation paths.",
  },
  {
    id: "safety",
    title: "Safety & Clean Sites",
    blurb: "PPE compliance, debris removal, neighbor friendly.",
  },
];

const LS_KEY = "about-values-order";

function SortableCard({ item }: { item: ValueItem }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 rounded-xl p-4 transition"
      {...attributes}
      {...listeners}
    >
      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-brand">
        <GripVertical className="h-3.5 w-3.5" />
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand" />
          <div className="font-semibold">{item.title}</div>
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {item.blurb}
        </p>
      </div>
    </Card>
  );
}

export default function ValuesDnD() {
  const [items, setItems] = useState<ValueItem[]>(DEFAULT);

  // load from LS
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const map = Object.fromEntries(DEFAULT.map((v) => [v.id, v]));
        const ordered = ids.map((id) => map[id]).filter(Boolean) as ValueItem[];
        const extras = DEFAULT.filter((v) => !ids.includes(v.id));
        setItems([...ordered, ...extras]);
      }
    } catch {}
  }, []);

  // save to LS
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items.map((i) => i.id)));
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        setItems((arr) => arrayMove(arr, oldIndex, newIndex));
      }}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <SortableCard key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
