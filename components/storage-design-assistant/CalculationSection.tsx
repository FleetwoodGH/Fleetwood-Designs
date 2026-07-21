import CalculationPreview from "@/components/CalculationPreview";
import MakerWorldParameterPreview from "@/components/MakerWorldParameterPreview";

import type { CalculationState } from "@/components/storage-design-assistant/types";

import { generateMakerWorldParameters } from "@/lib/engineering/makerworld";

type CalculationSectionProps = {
  calculationState: CalculationState;
};

export default function CalculationSection({
  calculationState,
}: CalculationSectionProps) {
  const makerWorldParameters =
    calculationState.result?.tray && calculationState.result.heights
      ? generateMakerWorldParameters(calculationState.result)
      : null;

  return (
    <>
      {calculationState.result && (
        <div className="min-h-[calc(100vh-3.125rem)]">
          {makerWorldParameters && (
            <MakerWorldParameterPreview parameters={makerWorldParameters} />
          )}

          <details className="group border-t border-neutral-200 pt-5">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <span
                className="text-neutral-400 transition group-open:rotate-90"
                aria-hidden="true"
              >
                ▶
              </span>
              Technical Details
            </summary>

            <div className="mt-5">
              <CalculationPreview result={calculationState.result} />
            </div>
          </details>
        </div>
      )}

      {calculationState.error && (
        <section
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
        >
          <h2 className="text-sm font-semibold text-red-950">
            Calculation could not be completed
          </h2>

          <p className="mt-1 text-sm leading-5 text-red-800">
            {calculationState.error}
          </p>
        </section>
      )}
    </>
  );
}
