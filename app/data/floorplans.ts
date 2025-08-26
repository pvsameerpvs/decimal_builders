export type Facing =
  | "North"
  | "South"
  | "East"
  | "West"
  | "North East"
  | "South East"
  | "North West"
  | "South West";

export type PlanType = "Residential" | "Commercial" | "Mixed";

export const PLANS = [
  {
    id: "fp-101",
    title: "30x40 Modern Duplex",
    img: "/floorplans/Cover.webp",
    plotSqft: 1200,
    floors: 3, // G+2
    bedrooms: 3,
    facing: "East" as Facing,
    type: "Residential" as PlanType,
    budgetAED: 821820,
    vastu: true,
    tags: ["duplex", "balcony", "carport"],
  },
  {
    id: "fp-102",
    title: "30x50 Family Home",
    img: "/floorplans/Cover.webp",
    plotSqft: 1500,
    floors: 2,
    bedrooms: 3,
    facing: "North" as Facing,
    type: "Residential" as PlanType,
    budgetAED: 425713,
    vastu: false,
    tags: ["3BHK", "compact"],
  },
  {
    id: "fp-103",
    title: "30x40 Narrow Plot Residence",
    img: "/floorplans/Cover.webp",
    plotSqft: 1200,
    floors: 4,
    bedrooms: 2,
    facing: "West" as Facing,
    type: "Residential" as PlanType,
    budgetAED: 1_586_406,
    vastu: true,
    tags: ["stairs", "lift-ready"],
  },
  {
    id: "fp-104",
    title: "40x60 Contemporary Villa",
    img: "/floorplans/Cover.webp",
    plotSqft: 2400,
    floors: 2,
    bedrooms: 4,
    facing: "South East" as Facing,
    type: "Residential" as PlanType,
    budgetAED: 1_405_451,
    vastu: false,
    tags: ["villa", "garden"],
  },
  {
    id: "fp-105",
    title: "40x60 Terrace House",
    img: "/floorplans/Cover.webp",
    plotSqft: 2400,
    floors: 2,
    bedrooms: 3,
    facing: "North West" as Facing,
    type: "Residential" as PlanType,
    budgetAED: 3_160_374,
    vastu: true,
    tags: ["terrace", "family"],
  },
  {
    id: "fp-106",
    title: "30x40 Budget Build",
    img: "/floorplans/Cover.webp",
    plotSqft: 1200,
    floors: 2,
    bedrooms: 2,
    facing: "South" as Facing,
    type: "Residential" as PlanType,
    budgetAED: 482_370,
    vastu: false,
    tags: ["budget", "starter"],
  },
];
