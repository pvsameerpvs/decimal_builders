// app/projects/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProjects() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-4">
          <Skeleton className="mb-3 h-32 w-full rounded-lg" />
          <Skeleton className="mb-2 h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
// app/projects/loading.tsx
// import Image from "next/image";

// export default function LoadingProjects() {
//   return (
//     <div className="min-h-screen grid place-items-center">
//       <Image
//         src="/logoo.svg"
//         alt="Decimal Builders logo"
//         width={160}
//         height={40}
//         priority
//         className="h-10 w-auto select-none animate-pulse"
//       />
//       <span className="sr-only">Loading projects…</span>
//     </div>
//   );
// }
