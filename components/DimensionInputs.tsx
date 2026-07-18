import DimensionField from "@/components/DimensionField";
import ParameterInput from "@/components/ParameterInput";

type DimensionInputsProps = {
  title: string;
  description: string;

  width: string;
  depth: string;

  widthLabel: string;
  depthLabel: string;

  minWidth: number;
  minDepth: number;

  widthIsValid: boolean;
  depthIsValid: boolean;

  widthHasError: boolean;
  depthHasError: boolean;

  onWidthChange: (value: string) => void;
  onDepthChange: (value: string) => void;
};

export default function DimensionInputs({
  title,
  description,
  width,
  depth,
  widthLabel,
  depthLabel,
  minWidth,
  minDepth,
  widthIsValid,
  depthIsValid,
  widthHasError,
  depthHasError,
  onWidthChange,
  onDepthChange,
}: DimensionInputsProps) {
  return (
    <ParameterInput title={title} description={description}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        <DimensionField
          id="requested-width"
          label={widthLabel}
          value={width}
          minimum={minWidth}
          isValid={widthIsValid}
          hasError={widthHasError}
          onChange={onWidthChange}
        />

        {widthIsValid && (
          <DimensionField
            id="requested-depth"
            label={depthLabel}
            value={depth}
            minimum={minDepth}
            isValid={depthIsValid}
            hasError={depthHasError}
            onChange={onDepthChange}
          />
        )}
      </div>
    </ParameterInput>
  );
}
