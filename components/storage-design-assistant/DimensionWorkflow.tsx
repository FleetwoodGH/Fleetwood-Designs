import DecisionStep from "@/components/DecisionStep";
import DimensionInputs from "@/components/DimensionInputs";

import { dimensionStrategyOptions } from "@/components/storage-design-assistant/workflowOptions";

import type {
  BuildType,
  DimensionStrategy,
  DimensionTarget,
} from "@/components/storage-design-assistant/types";

import {
  getDepthLabel,
  getDimensionDescription,
  getDimensionStrategyDescription,
  getBoxHeightLabel,
  getTrayHeightLabel,
  getWidthLabel,
} from "@/components/storage-design-assistant/workflowText";

type DimensionWorkflowProps = {
  designPhaseComplete: boolean;
  buildType: BuildType;

  dimensionStrategy: DimensionStrategy;
  dimensionTarget: DimensionTarget;

  trayNumber: number;
  rows: number;
  columns: number;

  requestedWidth: string;
  requestedDepth: string;
  boxHeight: string;
  requestedTrayHeight: string;

  minWidth: number;
  minDepth: number;
  widthRequirement: string;
  depthRequirement: string;
  minimumBoxHeight: number;
  minimumTrayHeight: number;
  trayHeightRequirement: string;

  widthIsValid: boolean;
  depthIsValid: boolean;
  boxHeightIsValid: boolean;
  trayHeightIsValid: boolean;

  widthHasError: boolean;
  depthHasError: boolean;
  boxHeightHasError: boolean;
  trayHeightHasError: boolean;

  onDimensionStrategySelect: (optionId: string) => void;
  onDimensionConfirm: () => void;
  onWidthChange: (value: string) => void;
  onDepthChange: (value: string) => void;
  onBoxHeightChange: (value: string) => void;
  onTrayHeightChange: (value: string) => void;
};

export default function DimensionWorkflow({
  designPhaseComplete,
  buildType,
  dimensionStrategy,
  dimensionTarget,
  trayNumber,
  rows,
  columns,
  requestedWidth,
  requestedDepth,
  boxHeight,
  requestedTrayHeight,
  minWidth,
  minDepth,
  widthRequirement,
  depthRequirement,
  minimumBoxHeight,
  minimumTrayHeight,
  trayHeightRequirement,
  widthIsValid,
  depthIsValid,
  boxHeightIsValid,
  trayHeightIsValid,
  widthHasError,
  depthHasError,
  boxHeightHasError,
  trayHeightHasError,
  onDimensionStrategySelect,
  onDimensionConfirm,
  onWidthChange,
  onDepthChange,
  onBoxHeightChange,
  onTrayHeightChange,
}: DimensionWorkflowProps) {
  const textContext = {
    trayNumber,
    rows,
    columns,
  };
  const dimensionEntryComplete =
    buildType === "box" ? boxHeightIsValid : trayHeightIsValid;

  return (
    <>
      {designPhaseComplete && (
        <section
          className={`scroll-mt-20 space-y-5 border-t border-neutral-200 pt-8 ${
            dimensionStrategy ? "" : "min-h-[calc(100vh-5rem)]"
          }`}
          data-workflow-section="dimensions"
        >
          <header>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Dimensions
            </h2>

            <p className="mt-1 max-w-2xl text-xs leading-4 text-neutral-500">
              What dimensions should your storage solution have?
            </p>
          </header>

          <DecisionStep
            question="Which dimensions should lead the design?"
            options={dimensionStrategyOptions}
            selectedOption={dimensionStrategy}
            onSelect={onDimensionStrategySelect}
          />
        </section>
      )}

      {dimensionStrategy && (
        <p className="text-xs leading-4 text-neutral-500">
          {getDimensionStrategyDescription(dimensionTarget, textContext)}
        </p>
      )}

      {dimensionStrategy && (
        <div
          className={`scroll-mt-20 ${
            dimensionEntryComplete ? "" : "min-h-[calc(100vh-5rem)]"
          }`}
          data-workflow-section="dimension-inputs"
        >
          <DimensionInputs
            title={buildType === "box" ? "Box Dimensions" : "Tray Dimensions"}
            description={getDimensionDescription(dimensionTarget, textContext)}
            width={requestedWidth}
            depth={requestedDepth}
            height={buildType === "box" ? boxHeight : requestedTrayHeight}
            widthLabel={getWidthLabel(dimensionTarget)}
            depthLabel={getDepthLabel(dimensionTarget)}
            heightLabel={
              buildType === "box"
                ? getBoxHeightLabel(dimensionTarget)
                : getTrayHeightLabel(dimensionStrategy)
            }
            minWidth={minWidth}
            minDepth={minDepth}
            minHeight={
              buildType === "box" ? minimumBoxHeight : minimumTrayHeight
            }
            widthRequirement={widthRequirement}
            depthRequirement={depthRequirement}
            heightRequirement={
              buildType === "system" ? trayHeightRequirement : undefined
            }
            widthIsValid={widthIsValid}
            depthIsValid={depthIsValid}
            heightIsValid={
              buildType === "box" ? boxHeightIsValid : trayHeightIsValid
            }
            widthHasError={widthHasError}
            depthHasError={depthHasError}
            heightHasError={
              buildType === "box" ? boxHeightHasError : trayHeightHasError
            }
            heightInputMode={buildType === "box" ? "numeric" : "decimal"}
            onWidthChange={onWidthChange}
            onDepthChange={onDepthChange}
            onHeightChange={
              buildType === "box" ? onBoxHeightChange : onTrayHeightChange
            }
            onConfirm={onDimensionConfirm}
          />
        </div>
      )}
    </>
  );
}
