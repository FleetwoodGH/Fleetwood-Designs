import DimensionField from "@/components/DimensionField";
import ParameterInput from "@/components/ParameterInput";

type BoxHeightInputProps = {
  boxHeight: string;
  boxHeightLabel: string;
  minimumHeight: number;
  boxHeightIsValid: boolean;
  boxHeightHasError: boolean;
  onBoxHeightChange: (value: string) => void;
};

export default function BoxHeightInput({
  boxHeight,
  boxHeightLabel,
  minimumHeight,
  boxHeightIsValid,
  boxHeightHasError,
  onBoxHeightChange,
}: BoxHeightInputProps) {
  return (
    <ParameterInput
      title="Configure the box height"
      description="Enter the height required for the standalone storage box."
    >
      <div className="max-w-md">
        <DimensionField
          id="box-height"
          label={boxHeightLabel}
          value={boxHeight}
          minimum={minimumHeight}
          isValid={boxHeightIsValid}
          hasError={boxHeightHasError}
          onChange={onBoxHeightChange}
        />
      </div>
    </ParameterInput>
  );
}
