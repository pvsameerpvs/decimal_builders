// ✅ Server component (no "use client" here)

import ReviewsClient from "./ReviewsClient";

export const metadata = { title: "Reviews" };

export default function Page() {
  return <ReviewsClient />;
}
