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

export type PlanMedia = {
  /** Elevations / interiors / marketing designs */
  design?: string[];
  /** Floor plan images (png/jpg/webp) */
  floorplan?: string[];
  /** 3D renders or scene images */
  render3d?: string[];
  /** One or more brochure/plan PDFs */
  pdf?: string[];
};

export const PLANS = [
  {
    id: "fp-101",
    title: "30x40 Modern Duplex",
    img: "/images/floorplans/fp-101/design-01.jpeg",
    plotSqft: 1200,
    floors: 3, // G+2
    bedrooms: 3,
    facing: "East" as Facing,
    type: "Residential" as PlanType,
    budgetAED: 821_820,
    vastu: true,
    tags: ["duplex", "balcony", "carport"],
    media: {
      design: ["/images/floorplans/fp-101/design-01.jpeg", "/images/floorplans/fp-101/design-02.jpeg"],
      floorplan: ["/images/floorplans/fp-101/plan-01.png","/images/floorplans/fp-101/plan-01.png"],
      render3d: ["/images/floorplans/fp-101/3d-1.jpeg", "/images/floorplans/fp-101/3d-2.png"],
      pdf: ["images/floorplans/fp-101/brochure.pdf"],
    } as PlanMedia,
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
    budgetAED: 425_713,
    vastu: false,
    tags: ["3BHK", "compact"],
    media: {
      floorplan: ["/floorplans/fp-102/plan.webp"],
    } as PlanMedia,
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
    media: {
      render3d: ["/floorplans/fp-103/3d-1.webp"],
      pdf: ["/floorplans/fp-103/details.pdf"],
    } as PlanMedia,
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
    media: {
      design: ["/floorplans/fp-104/design.webp"],
      floorplan: ["/floorplans/fp-104/plan.webp"],
    } as PlanMedia,
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
    media: {
      render3d: ["/floorplans/fp-105/3d.webp"],
    } as PlanMedia,
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
    media: {} as PlanMedia, // none yet; all optional
  },
];
