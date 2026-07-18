import DimensionField from "@/components/DimensionField";
import ParameterInput from "@/components/ParameterInput";

type StorageSystemHeightInputsProps = {
  trayHeight: string;
  lidHeight: string;
  minimumHeight: number;
  trayHeightIsValid: boolean;
  lidHeightIsValid: boolean;
  trayHeightHasError: boolean;
  lidHeightHasError: boolean;
  onTrayHeightChange: (value: string) => void;
  onLidHeightChange: (value: string) => void;
};

export default function StorageSystemHeightInputs({
  trayHeight,
  lidHeight,
  minimumHeight,
  trayHeightIsValid,
  lidHeightIsValid,
  trayHeightHasError,
  lidHeightHasError,
  onTrayHeightChange,
  onLidHeightChange,
}: StorageSystemHeightInputsProps) {
  return (
    <ParameterInput
      title="Configure the storage-system heights"
      description="Tray height determines the outside height of each tray. Lid height determines the available clearance above the upper tray."
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        <DimensionField
          id="tray-height"
          label="Tray height"
          value={trayHeight}
          minimum={minimumHeight}
          isValid={trayHeightIsValid}
          hasError={trayHeightHasError}
          onChange={onTrayHeightChange}
        />

        {trayHeightIsValid && (
          <DimensionField
            id="lid-height"
            label="Lid height"
            value={lidHeight}
            minimum={minimumHeight}
            isValid={lidHeightIsValid}
            hasError={lidHeightHasError}
            onChange={onLidHeightChange}
          />
        )}
      </div>
    </ParameterInput>
  );
}
