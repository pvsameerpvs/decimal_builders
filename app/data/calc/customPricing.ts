import { DECIMAL_PACKAGES, type PackageName } from "@/app/data/decimalPackages";
import { CUSTOM_ADDONS, type Addon } from "@/app/data/customAddons";

export type BuilderState = {
  base: PackageName;
  builtUpSqft: number;
  gstPct: number; // e.g. 18
  selectedIds: string[];
};

export type BuilderBreakdown = {
  baseCost: number;
  addonsCost: number;
  gst: number;
  total: number;
  lineItems: Array<{ id: string; title: string; cost: number }>;
};

export function findBase(pkg: PackageName) {
  const p = DECIMAL_PACKAGES.find((x) => x.name === pkg)!;
  return p;
}

export function findAddon(id: string): Addon | undefined {
  return CUSTOM_ADDONS.find((x) => x.id === id);
}

export function calcAddonCost(
  addon: Addon,
  basePkg: ReturnType<typeof findBase>,
  builtUpSqft: number
): number {
  if (addon.kind === "allowance") {
    // Δ = (target - base allowance) × (built-up × share)
    const baseRate = basePkg.allowances[addon.allowanceKey] ?? 0;
    const delta = addon.targetRate - baseRate;
    const area = builtUpSqft * addon.share;
    return Math.round(delta * area);
  }

  // simple modes
  if (addon.mode === "per_sqft") {
    const share = addon.share ?? 1;
    return Math.round(addon.amount * builtUpSqft * share);
  }
  if (addon.mode === "fixed") {
    return Math.round(addon.amount);
  }
  if (addon.mode === "percent") {
    // percent is applied on base cost later (handled in calcTotal)
    return 0;
  }
  return 0;
}

export function calcTotal(state: BuilderState): BuilderBreakdown {
  const base = findBase(state.base);
  const built = Math.max(0, state.builtUpSqft);
  const baseCost = Math.round(base.ratePerSqft * built);

  let addonsCost = 0;
  const lineItems: BuilderBreakdown["lineItems"] = [];

  // First pass: additive add-ons (allowance/simple except percent)
  for (const id of state.selectedIds) {
    const addon = findAddon(id);
    if (!addon) continue;
    if (addon.kind === "simple" && addon.mode === "percent") {
      // skip here; percent handled after base+additives
      continue;
    }
    const cost = calcAddonCost(addon, base, built);
    if (cost !== 0) {
      addonsCost += cost;
      lineItems.push({ id, title: addon.title, cost });
    }
  }

  // Percent add-ons
  let percentUps = 0;
  for (const id of state.selectedIds) {
    const addon = findAddon(id);
    if (!addon) continue;
    if (addon.kind === "simple" && addon.mode === "percent") {
      percentUps += addon.amount;
      lineItems.push({
        id,
        title: addon.title,
        cost: Math.round(((baseCost + addonsCost) * addon.amount) / 100),
      });
    }
  }
  const percentCost = Math.round(((baseCost + addonsCost) * percentUps) / 100);
  const preTax = baseCost + addonsCost + percentCost;

  const gst = Math.round((preTax * Math.max(0, state.gstPct)) / 100);
  const total = preTax + gst;

  // Replace the percent placeholder costs with actual amount
  if (percentUps > 0) {
    // recompute the last appended percent items to exact value
    let running = baseCost + addonsCost;
    for (let i = 0; i < lineItems.length; i++) {
      const add = findAddon(lineItems[i].id);
      if (add?.kind === "simple" && add.mode === "percent") {
        const c = Math.round((running * add.amount) / 100);
        lineItems[i].cost = c;
        running += c;
      }
    }
  }

  return { baseCost, addonsCost: preTax - baseCost, gst, total, lineItems };
}
