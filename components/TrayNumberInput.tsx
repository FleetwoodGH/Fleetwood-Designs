import NumberSelector from "@/components/NumberSelector";
import ParameterInput from "@/components/ParameterInput";

type TrayNumberInputProps = {
  value: number;
  min: number;
  max: number;
  confirmed: boolean;
  onChange: (value: number) => void;
  onConfirm: () => void;
};

export default function TrayNumberInput({
  value,
  min,
  max,
  confirmed,
  onChange,
  onConfirm,
}: TrayNumberInputProps) {
  return (
    <ParameterInput
      title="Choose the number of trays"
      description="Select how many trays should fit inside the storage system."
    >
      <div className="max-w-xs">
        <NumberSelector
          label="Number of trays"
          value={value}
          min={min}
          max={max}
          onChange={onChange}
        />
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <p className="text-sm text-neutral-600">
          The storage system will contain {value}{" "}
          {value === 1 ? "tray" : "trays"}.
        </p>

        <p className="mt-2 text-sm text-neutral-500">
          Current supported range: {min}–{max} trays.
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-6 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          {confirmed ? "Tray number confirmed" : "Continue"}
        </button>
      </div>
    </ParameterInput>
  );
}
