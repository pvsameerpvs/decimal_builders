import type { PackageName } from "./decimalPackages";

export type AllowanceKey =
  | "flooringLivingKitchen"
  | "flooringBalconyPassage"
  | "flooringStairs"
  | "flooringParking"
  | "kitchenTiles"
  | "bathTiles";

type AddonBase = {
  id: string;
  title: string;
  description: string;
  category:
    | "Structure"
    | "Flooring"
    | "Kitchen"
    | "Bath"
    | "Doors"
    | "Windows"
    | "Electrical"
    | "Exterior"
    | "Smart";
  // prevent selecting multiple conflicting upgrades
  conflicts?: string[];
};

type AllowanceUpgrade = AddonBase & {
  kind: "allowance";
  allowanceKey: AllowanceKey;
  targetRate: number;   // ₹/sq ft target allowance
  share: number;        // fraction of built-up area covered (0..1)
};

type SimpleAddon = AddonBase & {
  kind: "simple"| "percent";
  mode: "per_sqft" | "fixed" | "percent";
  amount: number;       // ₹ (per sq ft, fixed, or %)
  share?: number;       // optional area fraction (for per_sqft)
};

export type Addon = AllowanceUpgrade | SimpleAddon;

// Typical area shares used for approximations
export const AREA_SHARE = {
  livingKitchen: 0.35,
  balconyPassage: 0.10,
  stairs: 0.05,
  parking: 0.08,
} as const;

export const CUSTOM_ADDONS: Addon[] = [
  {
    id: "flooring-premium-150",
    title: "Upgrade living/kitchen flooring to ₹150/sq ft",
    description: "Premium tiles for living & kitchen spaces.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringLivingKitchen",
    targetRate: 150,
    share: AREA_SHARE.livingKitchen,
    conflicts: ["flooring-lk-110"],
  },
  {
    id: "flooring-lk-110",
    title: "Upgrade living/kitchen flooring to ₹110/sq ft",
    description: "Value upgrade for living & kitchen.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringLivingKitchen",
    targetRate: 110,
    share: AREA_SHARE.livingKitchen,
    conflicts: ["flooring-premium-150"],
  },
  {
    id: "bath-tiles-90",
    title: "Bathroom wall tiles @ ₹90/sq ft",
    description: "Better tile selection up to 7 ft height.",
    category: "Bath",
    kind: "allowance",
    allowanceKey: "bathTiles",
    targetRate: 90,
    share: 0.14, // approx 14% of built-up for bath walls (rough)
  },
  {
    id: "kitchen-tiles-90",
    title: "Kitchen wall tiles @ ₹90/sq ft",
    description: "Premium tiles at 2ft height.",
    category: "Kitchen",
    kind: "allowance",
    allowanceKey: "kitchenTiles",
    targetRate: 90,
    share: 0.08,
  },
  {
    id: "smart-prewiring",
    title: "Smart home pre-wiring",
    description: "Conduits & wiring routes for IoT/smart devices.",
    category: "Smart",
    kind: "simple",
    mode: "per_sqft",
    amount: 35, // ₹/sq ft (entire built-up)
  },
  {
    id: "ss-glass-railing",
    title: "SS/Wood railing with glass",
    description: "Upgrade staircase/balcony railing aesthetics.",
    category: "Exterior",
    kind: "simple",
    mode: "fixed",
    amount: 65000, // lump-sum
  },
  {
    id: "cp-upgrade",
    title: "Sanitary & CP upgrade (+₹25,000 per 1,000 sq ft)",
    description: "Higher grade fittings for bathrooms.",
    category: "Bath",
    kind: "simple",
    mode: "per_sqft",
    amount: 25, // ₹/sq ft per 1000 becomes ₹25/sq ft
  },
  {
    id: "upvc-windows",
    title: "UPVC 3-track windows package",
    description: "Better insulation & finish across openings.",
    category: "Windows",
    kind: "percent",
    mode: "percent",
    amount: 1.5, // +1.5% on base cost (approx)
  },
];
