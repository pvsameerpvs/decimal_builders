export default function previewImpact(
  addon: any,
  basePkg: any,
  builtUpSqft: number,
  coveredSqft: number,
  openSqft: number,
  effectiveSqft: number
) {
  if (!addon) return undefined;

  if (addon.kind === "allowance") {
    const baseRate = basePkg.allowances[addon.allowanceKey] ?? 0;
    const delta = addon.targetRate - baseRate;

    if (addon.allowanceKey === "flooringParking") {
      if (openSqft <= 0) return undefined;
      const cost = Math.round(delta * openSqft);
      return `${cost > 0 ? "+" : "–"} ₹ ${Math.abs(cost).toLocaleString(
        "en-IN"
      )} (approx)`;
    }

    if (addon.allowanceKey === "flooringLivingKitchen") {
      const cost = Math.round(delta * coveredSqft);
      if (cost === 0) return undefined;
      return `${cost > 0 ? "+" : "–"} ₹ ${Math.abs(cost).toLocaleString(
        "en-IN"
      )} (approx)`;
    }

    if (addon.allowanceKey === "flooringStairs") {
      const stairArea = Math.round(builtUpSqft * 0.1);
      const cost = Math.round(delta * stairArea);
      if (cost === 0) return undefined;
      return `${cost > 0 ? "+" : "–"} ₹ ${Math.abs(cost).toLocaleString(
        "en-IN"
      )} (approx)`;
    }

    const share = addon.share ?? 1;
    const cost = Math.round(delta * coveredSqft * share);
    if (cost === 0) return undefined;
    return `${cost > 0 ? "+" : "–"} ₹ ${Math.abs(cost).toLocaleString(
      "en-IN"
    )} (approx)`;
  }

  if (addon.mode === "per_sqft") {
    const share = addon.share ?? 1;
    const cost = Math.round(addon.amount * effectiveSqft * share);
    return `+ ₹ ${cost.toLocaleString("en-IN")} (approx)`;
  }

  if (addon.mode === "fixed") {
    return `+ ₹ ${Math.round(addon.amount).toLocaleString("en-IN")} (approx)`;
  }

  if (addon.mode === "percent") {
    return `+ ${addon.amount}% on base`;
  }

  return undefined;
}
