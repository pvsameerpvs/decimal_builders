// app/data/calc/customPricing.ts
import { DECIMAL_PACKAGES, type PackageName } from "@/app/data/decimalPackages";
import { CUSTOM_ADDONS, type Addon } from "@/app/data/customAddons";

export type BuilderState = {
  base: PackageName;
  builtUpSqft: number;
  openAreaSqft: number;
  selectedIds: string[];
};

export type BuilderBreakdown = {
  baseCost: number;
  addonsCost: number;
  total: number;
  lineItems: Array<{ id: string; title: string; cost: number }>;
};

export function findBase(pkg: PackageName) {
  return DECIMAL_PACKAGES.find((x) => x.name === pkg)!;
}

export function findAddon(id: string): Addon | undefined {
  return CUSTOM_ADDONS.find((x) => x.id === id);
}

function splitAreas(builtUp: number, open: number) {
  const safeOpen = Math.min(Math.max(0, open), Math.max(0, builtUp));
  const covered = Math.max(0, builtUp - safeOpen);
  const effective = covered + safeOpen * 0.65; // for per-sqft items
  return { builtUp, covered, open: safeOpen, effective };
}

// Allowance rules:
//  - flooringLivingKitchen -> FULL CLOSED area (diff × closed)
//  - flooringParking       -> OPEN area only (diff × open), 0 if open == 0
//  - flooringStairs        -> FIXED 10% of BUILT-UP (diff × 0.10 × builtUp)
//  - others                -> CLOSED area × share
// Simple per_sqft          -> EFFECTIVE area × share
// Simple fixed             -> fixed amount
function calcAddonCost(
  addon: Addon,
  basePkg: ReturnType<typeof findBase>,
  areas: { builtUp: number; covered: number; open: number; effective: number }
): number {
  if (addon.kind === "allowance") {
    const baseRate = basePkg.allowances[addon.allowanceKey] ?? 0;
    const delta = addon.targetRate - baseRate;

    if (addon.allowanceKey === "flooringParking") {
      if (areas.open <= 0) return 0;
      return Math.round(delta * areas.open);
    }

    if (addon.allowanceKey === "flooringLivingKitchen") {
      return Math.round(delta * areas.covered);
    }

    if (addon.allowanceKey === "flooringStairs") {
      const stairArea = Math.round(areas.builtUp * 0.10); // exactly 10% of built-up
      return Math.round(delta * stairArea);
    }

    const share = addon.share ?? 1;
    return Math.round(delta * areas.covered * share);
  }

  if (addon.mode === "per_sqft") {
    const share = addon.share ?? 1;
    return Math.round(addon.amount * areas.effective * share);
  }

  if (addon.mode === "fixed") {
    return Math.round(addon.amount);
  }

  return 0;
}

export function calcTotal(state: BuilderState): BuilderBreakdown {
  const base = findBase(state.base);
  const { builtUp, covered, open, effective } = splitAreas(
    state.builtUpSqft,
    state.openAreaSqft
  );

  // Base: covered @100% + open @65%
  const baseCost =
    Math.round(base.ratePerSqft * covered) +
    Math.round(base.ratePerSqft * open * 0.65);

  let addonsCost = 0;
  const lineItems: BuilderBreakdown["lineItems"] = [];

  for (const id of state.selectedIds) {
    const addon = findAddon(id);
    if (!addon) continue;
    const cost = calcAddonCost(addon, base, { builtUp, covered, open, effective });
    if (cost !== 0) {
      addonsCost += cost;
      lineItems.push({ id, title: addon.title, cost });
    }
  }

  const total = baseCost + addonsCost;

  return { baseCost, addonsCost, total, lineItems };
}
