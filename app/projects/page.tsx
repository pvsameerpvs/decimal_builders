import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Modern homes and renovations delivered with precision, quality, and trust.",
};

export default function Page() {
  return <ProjectsClient />;
}
