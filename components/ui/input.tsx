import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("h-11 w-full rounded-xl border bg-white px-4 text-sm ring-1 ring-black/5 transition placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand dark:bg-zinc-900 dark:ring-white/10", className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
