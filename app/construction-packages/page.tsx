import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
  title: "Construction Packages",
  description: "Choose a plan that fits your budget.",
};

export default function Page() {
  return <PackagesClient />;
}
