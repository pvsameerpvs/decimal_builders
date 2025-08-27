"use client";

import { Button } from "@/components/ui/button";
import { DECIMAL_PACKAGES, type PackageName } from "@/app/data/decimalPackages";

type Props = {
  value: PackageName;
  onChange: (next: PackageName) => void;
  className?: string;
};

const inr = (n: number) => n.toLocaleString("en-IN");

export default function BasePackageSelector({
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className={className ?? ""}>
      <div className="mb-1 text-sm font-medium">Base package</div>
      <div className="flex flex-wrap gap-2">
        {DECIMAL_PACKAGES.map((p) => (
          <Button
            key={p.name}
            variant={value === p.name ? "default" : "outline"}
            className={
              value === p.name ? "bg-[#958f39] hover:bg-[#7d782f]" : ""
            }
            onClick={() => onChange(p.name as PackageName)}
          >
            {p.name} • ₹ {inr(p.ratePerSqft)}/sq ft
          </Button>
        ))}
      </div>
    </div>
  );
}
