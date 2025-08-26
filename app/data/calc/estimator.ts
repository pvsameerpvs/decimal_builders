export type EstimatorState = {
  projectType: string;          // e.g., "Residential - Villa"
  plotSqft: number;             // plot area
  floors: number;               // number of floors
  coveragePct: number;          // % per floor
  packageName: string;          // Essential / Enhanced / Elite / Custom
  ratePerSqft: number;          // selected package rate (/sq ft)
  // ground-floor feature areas
  layout: string;               // 1RK / 1BHK / 2BHK / 3BHK / Office Space
  parkingSqft: number;          // reduced 65%
  balconySqft: number;          // reduced 65%
  utilitySqft: number;          // reduced 65%
  officeSqft: number;           // 100%
};

export type Breakdown = {
  plotSqft: number;
  floors: number;
  coveragePct: number;
  ratePerSqft: number;
  totalBuiltUp: number;
  reducedArea: number;  // capped to ground-floor area
  regularArea: number;
  costRegular: number;
  costReduced: number;
  totalCost: number;
};

export const DEFAULT_STATE: EstimatorState = {
  projectType: "Residential - Villa",
  plotSqft: 2400,
  floors: 2,
  coveragePct: 85,
  packageName: "Essential",
  ratePerSqft: 1860,
  layout: "2BHK",
  parkingSqft: 250,
  balconySqft: 120,
  utilitySqft: 80,
  officeSqft: 0,
};

export function calcBreakdown(s: EstimatorState): Breakdown {
  const plotSqft = Math.max(0, s.plotSqft);
  const floors = Math.max(1, s.floors);
  const coveragePct = Math.min(100, Math.max(50, s.coveragePct));
  const rate = Math.max(0, s.ratePerSqft);

  const perFloorArea = plotSqft * (coveragePct / 100);
  const totalBuiltUp = Math.round(perFloorArea * floors);

  // Reduced rate features on ground floor only
  const reducedInput = Math.max(0, Math.round(s.parkingSqft + s.balconySqft + s.utilitySqft));
  const reducedArea = Math.min(reducedInput, Math.round(perFloorArea)); // cannot exceed ground floor area

  // Office area is normal rate and already included in built-up; we show it via regular/reduced split
  const regularArea = Math.max(0, totalBuiltUp - reducedArea);

  const costRegular = Math.round(regularArea * rate);
  const costReduced = Math.round(reducedArea * rate * 0.65);

  const totalCost = costRegular + costReduced;

  return {
    plotSqft,
    floors,
    coveragePct,
    ratePerSqft: rate,
    totalBuiltUp,
    reducedArea,
    regularArea,
    costRegular,
    costReduced,
    totalCost,
  };
}
