// app/data/customAddons.ts
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
  conflicts?: string[];
};

type AllowanceUpgrade = AddonBase & {
  kind: "allowance";
  allowanceKey: AllowanceKey;
  targetRate: number;   // ₹/sq ft customer target
  share: number;        // used for non-LK/non-parking/non-stairs items
};

type SimpleAddon = AddonBase & {
  kind: "simple" | "percent";
  mode: "per_sqft" | "fixed" | "percent";
  amount: number;
  share?: number;
};

export type Addon = AllowanceUpgrade | SimpleAddon;

// Area shares (some are overridden by calc rules)
export const AREA_SHARE = {
  livingKitchen: 1.0,       // LK uses FULL CLOSED area
  balconyPassage: 0.10,
  stairs: 0.10,             // <-- now 10% of built-up (calc uses exactly 10%)
  parking: 1.0,             // parking uses OPEN area only
  kitchenWallTiles: 0.08,
  bathWallTiles: 0.14,
} as const;

export const CUSTOM_ADDONS: Addon[] = [
  // LIVING / DINING / ROOMS / KITCHEN FLOOR
  {
    id: "flooring-lk-110",
    title: "Upgrade living/dining/rooms/kitchen flooring to ₹110/sq ft",
    description: "Value upgrade across all closed areas.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringLivingKitchen",
    targetRate: 110,
    share: AREA_SHARE.livingKitchen,
    conflicts: ["flooring-lk-150"],
  },
  {
    id: "flooring-lk-150",
    title: "Upgrade living/dining/rooms/kitchen flooring to ₹150/sq ft",
    description: "Premium tiles across all closed areas.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringLivingKitchen",
    targetRate: 150,
    share: AREA_SHARE.livingKitchen,
    conflicts: ["flooring-lk-110"],
  },

  // BALCONY / PASSAGE / UTILITY FLOOR
  {
    id: "flooring-bp-60",
    title: "Upgrade balcony/passage/utility tiles to ₹60/sq ft",
    description: "Anti-skid tiles upgrade for open circulation areas.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringBalconyPassage",
    targetRate: 60,
    share: AREA_SHARE.balconyPassage,
    conflicts: ["flooring-bp-80"],
  },
  {
    id: "flooring-bp-80",
    title: "Upgrade balcony/passage/utility tiles to ₹80/sq ft",
    description: "Premium anti-skid tiles for circulation areas.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringBalconyPassage",
    targetRate: 80,
    share: AREA_SHARE.balconyPassage,
    conflicts: ["flooring-bp-60"],
  },

  // STAIRCASE / STEPS FLOOR (calc uses 10% of built-up)
  {
    id: "flooring-stairs-130",
    title: "Upgrade staircase/steps tiles to ₹130/sq ft",
    description: "Mid-tier upgrade for stair treads and risers.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringStairs",
    targetRate: 130,
    share: AREA_SHARE.stairs,
    conflicts: ["flooring-stairs-150"],
  },
  {
    id: "flooring-stairs-150",
    title: "Upgrade staircase/steps tiles to ₹150/sq ft",
    description: "Premium upgrade for stair treads and risers.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringStairs",
    targetRate: 150,
    share: AREA_SHARE.stairs,
    conflicts: ["flooring-stairs-130"],
  },

  // PARKING FLOOR (uses OPEN area only; 0 if open=0)
  {
    id: "flooring-parking-55",
    title: "Upgrade parking tiles to ₹55/sq ft",
    description: "Higher-spec tiles suitable for parking areas.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringParking",
    targetRate: 55,
    share: AREA_SHARE.parking, // ignored by calc (uses open directly)
    conflicts: ["flooring-parking-65"],
  },
  {
    id: "flooring-parking-65",
    title: "Upgrade parking tiles to ₹65/sq ft",
    description: "Premium tiles designed for parking loads.",
    category: "Flooring",
    kind: "allowance",
    allowanceKey: "flooringParking",
    targetRate: 65,
    share: AREA_SHARE.parking,
    conflicts: ["flooring-parking-55"],
  },

  // KITCHEN WALL TILES
  {
    id: "kitchen-tiles-60",
    title: "Kitchen wall tiles @ ₹60/sq ft",
    description: "Upgrade to better finish at 2ft height.",
    category: "Kitchen",
    kind: "allowance",
    allowanceKey: "kitchenTiles",
    targetRate: 60,
    share: AREA_SHARE.kitchenWallTiles,
    conflicts: ["kitchen-tiles-90"],
  },
  {
    id: "kitchen-tiles-90",
    title: "Kitchen wall tiles @ ₹90/sq ft",
    description: "Premium kitchen wall tiles at 2ft height.",
    category: "Kitchen",
    kind: "allowance",
    allowanceKey: "kitchenTiles",
    targetRate: 90,
    share: AREA_SHARE.kitchenWallTiles,
    conflicts: ["kitchen-tiles-60"],
  },

  // BATHROOM WALL TILES
  {
    id: "bath-tiles-60",
    title: "Bathroom wall tiles @ ₹60/sq ft",
    description: "Mid-tier tile selection up to 7ft.",
    category: "Bath",
    kind: "allowance",
    allowanceKey: "bathTiles",
    targetRate: 60,
    share: AREA_SHARE.bathWallTiles,
    conflicts: ["bath-tiles-90"],
  },
  {
    id: "bath-tiles-90",
    title: "Bathroom wall tiles @ ₹90/sq ft",
    description: "Premium tile selection up to 7ft.",
    category: "Bath",
    kind: "allowance",
    allowanceKey: "bathTiles",
    targetRate: 90,
    share: AREA_SHARE.bathWallTiles,
    conflicts: ["bath-tiles-60"],
  },

  // Optional simple add-ons
  {
    id: "smart-prewiring",
    title: "Smart home pre-wiring",
    description: "Conduits & routes for IoT/smart devices.",
    category: "Smart",
    kind: "simple",
    mode: "per_sqft",
    amount: 35,
  },
  {
    id: "ss-glass-railing",
    title: "SS/Wood railing with glass",
    description: "Aesthetic upgrade for staircase/balcony.",
    category: "Exterior",
    kind: "simple",
    mode: "fixed",
    amount: 65000,
  },
  {
    id: "cp-upgrade",
    title: "Sanitary & CP fittings uplift (+₹25,000 / 1,000 sq ft)",
    description: "Higher grade sanitaryware and CP fittings.",
    category: "Bath",
    kind: "simple",
    mode: "per_sqft",
    amount: 25,
  },
];
