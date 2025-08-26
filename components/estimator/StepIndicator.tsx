"use client";

export default function StepIndicator({
  steps,
  activeIndex,
}: {
  steps: string[];
  activeIndex: number;
}) {
  return (
    <ol className="grid grid-cols-1 gap-3 md:grid-cols-5">
      {steps.map((label, i) => {
        const active = i === activeIndex;
        const done = i < activeIndex;
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                done
                  ? "bg-emerald-500 text-white"
                  : active
                  ? "bg-[#958f39] text-white"
                  : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
              ].join(" ")}
            >
              {i + 1}
            </span>
            <span
              className={[
                "text-sm",
                active ? "font-semibold" : "text-zinc-600 dark:text-zinc-400",
              ].join(" ")}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
