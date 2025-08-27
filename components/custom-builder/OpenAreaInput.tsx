"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  value: number; // numeric value from parent/RHF
  builtUpSqft: number; // max clamp
  onChange: (next: number) => void; // commit numeric on blur
  className?: string;
};

export default function OpenAreaInput({
  value,
  builtUpSqft,
  onChange,
  className,
}: Props) {
  const [draft, setDraft] = useState<string>(value ? String(value) : "");
  const focusedRef = useRef(false);

  // Keep draft in sync with external value when not focused
  useEffect(() => {
    if (!focusedRef.current) {
      setDraft(value ? String(value) : "");
    }
  }, [value]);

  return (
    <div className={className ?? ""}>
      <div className="mb-1 text-sm font-medium">
        Open area (sq ft) — balcony/utility/parking
      </div>

      {/* Use text + numeric keyboard so empty string is allowed */}
      <Input
        type="text"
        inputMode="numeric"
        placeholder="e.g., 200"
        value={draft}
        onFocus={() => (focusedRef.current = true)}
        onChange={(e) => {
          // Let the user type freely (including empty)
          const next = e.target.value.replace(/[^\d]/g, ""); // digits only
          setDraft(next);
        }}
        onBlur={() => {
          focusedRef.current = false;
          // Parse & clamp on blur
          const n = draft === "" ? 0 : parseInt(draft, 10);
          const clamped = Math.min(Math.max(0, n), Math.max(0, builtUpSqft));
          onChange(clamped);
          setDraft(clamped ? String(clamped) : ""); // show blank if 0
        }}
      />

      <div className="mt-1 text-[11px] text-zinc-500">
        Open area is charged at <strong>65%</strong> of package rate.
      </div>
    </div>
  );
}
