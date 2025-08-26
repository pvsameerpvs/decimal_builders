import type { Metadata } from "next";
import EstimatorClient from "./EstimatorClient";

export const metadata: Metadata = {
  title: "Construction Cost Estimator",
  description:
    "Estimate construction costs based on area, floors, and package.",
};

export default function Page() {
  return <EstimatorClient />;
}
