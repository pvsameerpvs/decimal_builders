import type { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "Our house construction steps are simple and easy to understand: Plan – Build – Track – Settle in.",
};

export default function Page() {
  return <HowItWorksClient />;
}
