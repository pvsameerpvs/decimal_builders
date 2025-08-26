"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

type Project = {
  title: string;
  desc: string;
  img: string;
};

export default function ProjectCards({ items }: { items: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((p) => (
        <Card key={p.title} className="overflow-hidden">
          <div className="relative h-40 w-full">
            <Image
              src={p.img}
              alt={p.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle>{p.title}</CardTitle>
            <CardDescription className="text-[13px]">{p.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/projects">
              <Button
                variant="outline"
                size="sm"
                className="brand-border rounded-lg"
              >
                View details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
