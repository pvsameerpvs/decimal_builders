"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  value: number; // built up from parent/RHF
  openAreaSqft: number;
  onChange: (nextBuiltUp: number, nextOpenClamped: number) => void;
  className?: string;
};

export default function BuiltUpInput({
  value,
  openAreaSqft,
  onChange,
  className,
}: Props) {
  const [draft, setDraft] = useState<string>(value ? String(value) : "");
  const focusedRef = useRef(false);

  useEffect(() => {
    if (!focusedRef.current) {
      setDraft(value ? String(value) : "");
    }
  }, [value]);

  return (
    <div className={className ?? ""}>
      <div className="mb-1 text-sm font-medium">Built-up area (sq ft)</div>

      <Input
        type="text"
        inputMode="numeric"
        placeholder="e.g., 1200"
        value={draft}
        onFocus={() => (focusedRef.current = true)}
        onChange={(e) => {
          const next = e.target.value.replace(/[^\d]/g, "");
          setDraft(next);
        }}
        onBlur={() => {
          focusedRef.current = false;
          const built = draft === "" ? 0 : parseInt(draft, 10);
          const builtClamped = Math.max(0, built);
          const nextOpen = Math.min(Math.max(0, openAreaSqft), builtClamped);
          onChange(builtClamped, nextOpen);
          setDraft(builtClamped ? String(builtClamped) : "");
        }}
      />
    </div>
  );
}
