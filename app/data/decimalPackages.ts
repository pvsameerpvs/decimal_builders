// data/decimalPackages.ts

export type PackageName = "Essential" | "Enhanced" | "Elite";

export type DecimalPackage = {
  name: PackageName;
  ratePerSqft: number; // ₹ per sq ft
  img: string;
  pdf: string;
  badge?: string;
  // Key allowances & budgets pulled directly from PDFs
  allowances: {
    flooringLivingKitchen: number; // ₹/sq ft
    flooringBalconyPassage: number; // ₹/sq ft
    flooringStairs: number; // ₹/sq ft
    flooringParking: number; // ₹/sq ft
    kitchenTiles: number; // ₹/sq ft @2ft height
    bathTiles: number; // ₹/sq ft up to 7ft
    sanitaryPer1000: number; // ₹ per 1000 sq ft
    mainDoorBudget: number; // ₹
    bedroomDoorBudget: number; // ₹
  };
  windowsOpeningPct: number; // % of built-up area
  windowsType: string;
  railing: string;
  grillsRate: number; // ₹/sq ft
  sumpLiters: number;
  ohtLiters: number;
  ohtBrand?: string;
  notes: string[]; // extra bullets
};

export const DECIMAL_PACKAGES: DecimalPackage[] = [
  {
    name: "Essential",
    ratePerSqft: 1810,
    img: "/images/Cover.webp",
    pdf: "/media/packages/ESSENTIAL-PACKAGE-DECIMAL-BUILDERS.pdf",
    badge: "Popular",
    allowances: {
      flooringLivingKitchen: 60,
      flooringBalconyPassage: 40,
      flooringStairs: 80,
      flooringParking: 40,
      kitchenTiles: 40,
      bathTiles: 40,
      sanitaryPer1000: 40000,
      mainDoorBudget: 22000,
      bedroomDoorBudget: 10500,
    },
    windowsOpeningPct: 10,
    windowsType: "Aluminium/UPVC 3-track",
    railing: "MS railing",
    grillsRate: 200,
    sumpLiters: 6000,
    ohtLiters: 1500,
    ohtBrand: "Apollo",
    notes: [
      "Designs: Arch layout, 2D plan, 3D elevation, structural, electrical & plumbing",
      "Waterproofing for open areas; terrace weatherproof",
      "Elevation work at additional cost",
    ],
  },
  {
    name: "Enhanced",
    ratePerSqft: 2050,
    img: "/images/Cover.webp",
    pdf: "/media/packages/ENHANCED-PACKAGE-DECIMAL-BUILDERS.pdf",
    badge: "Best value",
    allowances: {
      flooringLivingKitchen: 110,
      flooringBalconyPassage: 60,
      flooringStairs: 130,
      flooringParking: 55,
      kitchenTiles: 60,
      bathTiles: 60,
      sanitaryPer1000: 50000,
      mainDoorBudget: 40000,
      bedroomDoorBudget: 14500,
    },
    windowsOpeningPct: 10,
    windowsType: "UPVC 3-track",
    railing: "SS railing",
    grillsRate: 200,
    sumpLiters: 8000,
    ohtLiters: 2000,
    ohtBrand: "Sintex",
    notes: [
      "Designs: Arch layout, 2D plan, 3D elevation, structural, electrical & plumbing",
      "Waterproofing for open areas; terrace weatherproof",
      "Elevation work at additional cost",
    ],
  },
  {
    name: "Elite",
    ratePerSqft: 2450,
    img: "/images/Cover.webp",
    pdf: "/media/packages/ELITE-PACKAGE-DECIMAL-BUILDERS.pdf",
    badge: "Premium",
    allowances: {
      flooringLivingKitchen: 150,
      flooringBalconyPassage: 80,
      flooringStairs: 150,
      flooringParking: 65,
      kitchenTiles: 90,
      bathTiles: 90,
      sanitaryPer1000: 75000,
      mainDoorBudget: 50000,
      bedroomDoorBudget: 16000,
    },
    windowsOpeningPct: 11,
    windowsType: "UPVC 3-track",
    railing: "SS/Wood railing with glass",
    grillsRate: 200,
    sumpLiters: 9000,
    ohtLiters: 2500,
    ohtBrand: "Sintex",
    notes: [
      "Designs: Arch layout, 2D plan, 3D elevation, structural, electrical & plumbing",
      "Waterproofing for open areas; terrace weatherproof",
      "Elevation work at additional cost",
    ],
  },
];
