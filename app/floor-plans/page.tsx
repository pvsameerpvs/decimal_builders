import type { Metadata } from "next";
import FloorPlansClient from "./FloorPlansClient";

export const metadata: Metadata = {
  title: "Floor Plans & Designs",
  description:
    "Browse floor plans with filters, image previews, and PDF viewer — frontend-only.",
};

export default function Page() {
  return <FloorPlansClient />;
}
