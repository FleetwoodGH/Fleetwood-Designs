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
        <>
          <CalculationPreview result={calculationState.result} />

          {makerWorldParameters && (
            <MakerWorldParameterPreview parameters={makerWorldParameters} />
          )}
        </>
      )}

      {calculationState.error && (
        <section
          className="rounded-xl border border-red-200 bg-red-50 p-6"
          role="alert"
        >
          <h2 className="text-lg font-semibold text-red-950">
            Calculation could not be completed
          </h2>

          <p className="mt-2 leading-7 text-red-800">
            {calculationState.error}
          </p>
        </section>
      )}
    </>
  );
}
