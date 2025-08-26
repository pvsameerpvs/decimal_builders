"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/estimator/StepIndicator";
import AreaInputs from "@/components/estimator/AreaInputs";
import PackageSelector from "@/components/estimator/PackageSelector";
import GroundFloorOptions from "@/components/estimator/GroundFloorOptions";
import SummaryCard from "@/components/estimator/SummaryCard";

import { Separator } from "@/components/ui/separator";
import {
  calcBreakdown,
  DEFAULT_STATE,
  EstimatorState,
} from "../data/calc/estimator";

const STEPS = [
  "Project",
  "Area & Floors",
  "Package",
  "Ground Floor",
  "Summary",
] as const;

export default function EstimatorClient() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<EstimatorState>(DEFAULT_STATE);

  const breakdown = useMemo(() => calcBreakdown(state), [state]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const canNext =
    step === 0
      ? !!state.projectType
      : step === 1
      ? state.plotSqft > 0 && state.floors >= 1
      : step === 2
      ? state.ratePerSqft > 0
      : step === 3
      ? true
      : true;

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
        Construction Cost Calculator
      </h1>

      <Card>
        <CardContent className="p-4 md:p-6">
          <StepIndicator
            steps={STEPS as unknown as string[]}
            activeIndex={step}
          />

          <Separator className="my-4" />

          {/* Step content */}
          <div className="mt-2">
            {step === 0 && (
              <AreaInputs.ProjectType
                projectType={state.projectType}
                coveragePct={state.coveragePct}
                onProjectTypeChange={(projectType, coveragePct) =>
                  setState((s) => ({ ...s, projectType, coveragePct }))
                }
              />
            )}

            {step === 1 && (
              <AreaInputs.AreaAndFloors
                plotSqft={state.plotSqft}
                floors={state.floors}
                coveragePct={state.coveragePct}
                onChange={(patch) => setState((s) => ({ ...s, ...patch }))}
              />
            )}

            {step === 2 && (
              <PackageSelector
                selected={state.packageName}
                rate={state.ratePerSqft}
                onChange={(patch) => setState((s) => ({ ...s, ...patch }))}
              />
            )}

            {step === 3 && (
              <GroundFloorOptions
                layout={state.layout}
                parkingSqft={state.parkingSqft}
                balconySqft={state.balconySqft}
                utilitySqft={state.utilitySqft}
                officeSqft={state.officeSqft}
                onChange={(patch) => setState((s) => ({ ...s, ...patch }))}
              />
            )}

            {step === 4 && <SummaryCard state={state} breakdown={breakdown} />}
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={back} disabled={step === 0}>
              Back
            </Button>
            <div className="flex items-center gap-2">
              {step < STEPS.length - 1 && (
                <Button onClick={next} disabled={!canNext}>
                  Next
                </Button>
              )}
              {step === STEPS.length - 1 && (
                <Button
                  className="bg-[#958f39] hover:bg-[#7d782f] text-white"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Start Over
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Always-visible quick total */}
      <SummaryCard.Compact breakdown={breakdown} />
    </div>
  );
}
