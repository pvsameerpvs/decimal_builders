import type { Metadata } from "next";
import BuilderClient from "./BuilderClient";

export const metadata: Metadata = {
  title: "Custom Package Builder",
  description: "Build your own package and get an approximate price.",
};

export default function Page() {
  return <BuilderClient />;
}
