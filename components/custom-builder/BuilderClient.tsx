// "use client";

// import { useMemo, useState } from "react";
// import { DECIMAL_PACKAGES, type PackageName } from "@/app/data/decimalPackages";
// import { CUSTOM_ADDONS } from "@/app/data/customAddons";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   KeyboardSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
//   sortableKeyboardCoordinates,
// } from "@dnd-kit/sortable";
// import {
//   BuilderState,
//   calcTotal,
//   findAddon,
//   findBase,
// } from "@/app/data/calc/customPricing";
// import FeatureCard from "./FeatureCard";
// import PriceSummary from "./PriceSummary";

// export default function BuilderClient() {
//   const [state, setState] = useState<BuilderState>({
//     base: "Enhanced",
//     builtUpSqft: 2400,
//     gstPct: 18,
//     selectedIds: [],
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   // Prevent conflicting selections
//   const available = useMemo(() => {
//     const selected = new Set(state.selectedIds);
//     const conflicts = new Set<string>();
//     for (const id of state.selectedIds) {
//       const ad = findAddon(id);
//       ad?.conflicts?.forEach((c) => conflicts.add(c));
//     }
//     return CUSTOM_ADDONS.filter(
//       (a) => !selected.has(a.id) && !conflicts.has(a.id)
//     );
//   }, [state.selectedIds]);

//   const basePkg = findBase(state.base);
//   const breakdown = calcTotal(state);

//   const inr = (n: number) => n.toLocaleString("en-IN");

//   function add(id: string) {
//     setState((s) => ({ ...s, selectedIds: [...s.selectedIds, id] }));
//   }
//   function remove(id: string) {
//     setState((s) => ({
//       ...s,
//       selectedIds: s.selectedIds.filter((x) => x !== id),
//     }));
//   }

//   function onDragEnd(e: DragEndEvent) {
//     const { active, over } = e;
//     if (!over || active.id === over.id) return;
//     const oldIdx = state.selectedIds.indexOf(String(active.id));
//     const newIdx = state.selectedIds.indexOf(String(over.id));
//     if (oldIdx >= 0 && newIdx >= 0) {
//       setState((s) => ({
//         ...s,
//         selectedIds: arrayMove(s.selectedIds, oldIdx, newIdx),
//       }));
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <header>
//         <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
//           Build your custom package
//         </h1>
//         <p className="text-sm text-zinc-600 dark:text-zinc-300">
//           Start from a base package, add upgrades, and get a live approximate
//           price.
//         </p>
//       </header>

//       {/* Controls */}
//       <Card className="p-4 md:p-6">
//         <div className="grid gap-4 md:grid-cols-3">
//           <div>
//             <div className="mb-1 text-sm font-medium">Base package</div>
//             <div className="flex flex-wrap gap-2">
//               {DECIMAL_PACKAGES.map((p) => (
//                 <Button
//                   key={p.name}
//                   variant={state.base === p.name ? "default" : "outline"}
//                   className={
//                     state.base === p.name
//                       ? "bg-[#958f39] hover:bg-[#7d782f]"
//                       : ""
//                   }
//                   onClick={() =>
//                     setState((s) => ({ ...s, base: p.name as PackageName }))
//                   }
//                 >
//                   {p.name} • ₹ {inr(p.ratePerSqft)}/sq ft
//                 </Button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <div className="mb-1 text-sm font-medium">
//               Built-up area (sq ft)
//             </div>
//             <Input
//               type="number"
//               inputMode="numeric"
//               value={state.builtUpSqft}
//               onChange={(e) =>
//                 setState((s) => ({
//                   ...s,
//                   builtUpSqft: Math.max(0, Number(e.target.value)),
//                 }))
//               }
//             />
//           </div>

//           <div>
//             <div className="mb-1 text-sm font-medium">GST (%)</div>
//             <Input
//               type="number"
//               inputMode="numeric"
//               value={state.gstPct}
//               onChange={(e) =>
//                 setState((s) => ({
//                   ...s,
//                   gstPct: Math.max(0, Number(e.target.value)),
//                 }))
//               }
//             />
//           </div>
//         </div>
//       </Card>

//       {/* Two-column layout */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Available add-ons */}
//         <section className="space-y-3">
//           <div className="text-sm font-semibold">Available upgrades</div>
//           <div className="grid gap-2">
//             {available.map((a) => (
//               <FeatureCard
//                 key={a.id}
//                 id={a.id}
//                 title={a.title}
//                 description={a.description}
//                 category={a.category}
//                 // rough impact preview:
//                 impact={previewImpact(a, basePkg, state.builtUpSqft)}
//                 mode="available"
//                 onAdd={() => add(a.id)}
//               />
//             ))}
//             {available.length === 0 && (
//               <div className="rounded-lg border p-3 text-sm text-zinc-500">
//                 All compatible upgrades are selected.
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Selected add-ons (sortable) */}
//         <section className="space-y-3">
//           <div className="flex items-center justify-between">
//             <div className="text-sm font-semibold">Selected upgrades</div>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setState((s) => ({ ...s, selectedIds: [] }))}
//             >
//               Clear
//             </Button>
//           </div>

//           <DndContext
//             sensors={sensors}
//             collisionDetection={closestCenter}
//             onDragEnd={onDragEnd}
//           >
//             <SortableContext
//               items={state.selectedIds}
//               strategy={verticalListSortingStrategy}
//             >
//               <div className="grid gap-2">
//                 {state.selectedIds.map((id) => {
//                   const a = findAddon(id)!;
//                   return (
//                     <FeatureCard
//                       key={id}
//                       id={id}
//                       title={a.title}
//                       description={a.description}
//                       category={a.category}
//                       impact={previewImpact(a, basePkg, state.builtUpSqft)}
//                       mode="selected"
//                       onRemove={() => remove(id)}
//                     />
//                   );
//                 })}
//                 {state.selectedIds.length === 0 && (
//                   <div className="rounded-lg border p-3 text-sm text-zinc-500">
//                     Drag to reorder after you add items. Reordering is optional.
//                   </div>
//                 )}
//               </div>
//             </SortableContext>
//           </DndContext>
//         </section>
//       </div>

//       {/* Pricing */}
//       <PriceSummary
//         baseCost={breakdown.baseCost}
//         addonsCost={breakdown.addonsCost}
//         gst={breakdown.gst}
//         total={breakdown.total}
//       />

//       {/* CTA */}
//       <div className="flex flex-wrap items-center gap-2">
//         <Button
//           className="bg-[#958f39] hover:bg-[#7d782f] text-white"
//           onClick={() => {
//             const params = new URLSearchParams({
//               base: state.base,
//               area: String(state.builtUpSqft),
//               addons: state.selectedIds.join(","),
//               estimate: String(breakdown.total),
//             }).toString();
//             window.location.href = `/contact?${params}`;
//           }}
//         >
//           Request Decimal Builders Quote
//         </Button>
//         <Button
//           variant="outline"
//           onClick={() =>
//             setState({
//               base: "Enhanced",
//               builtUpSqft: 2400,
//               gstPct: 18,
//               selectedIds: [],
//             })
//           }
//         >
//           Reset
//         </Button>
//       </div>
//     </div>
//   );
// }

// // quick text impact preview (approx)
// function previewImpact(
//   addon: ReturnType<typeof findAddon> extends (...args: any) => infer R
//     ? R
//     : any,
//   basePkg: any,
//   builtUpSqft: number
// ) {
//   if (!addon) return undefined;
//   if (addon.kind === "allowance") {
//     const baseRate = basePkg.allowances[addon.allowanceKey] ?? 0;
//     const delta = addon.targetRate - baseRate;
//     const cost = Math.round(delta * builtUpSqft * addon.share);
//     if (cost === 0) return undefined;
//     return `${cost > 0 ? "+" : "–"} ₹ ${Math.abs(cost).toLocaleString(
//       "en-IN"
//     )} (approx)`;
//   }
//   if (addon.mode === "per_sqft") {
//     const share = addon.share ?? 1;
//     const cost = Math.round(addon.amount * builtUpSqft * share);
//     return `+ ₹ ${cost.toLocaleString("en-IN")} (approx)`;
//   }
//   if (addon.mode === "fixed") {
//     return `+ ₹ ${Math.round(addon.amount).toLocaleString("en-IN")} (approx)`;
//   }
//   if (addon.mode === "percent") {
//     return `+ ${addon.amount}% on base`;
//   }
//   return undefined;
// }
