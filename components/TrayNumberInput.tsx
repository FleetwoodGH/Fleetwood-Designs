import NumberSelector from "@/components/NumberSelector";

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
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        Choose the number of trays
      </h2>

      <p className="mt-1 max-w-2xl text-xs leading-4 text-neutral-500">
        How many trays should the system contain?
      </p>

      <div className="max-w-xs">
        <div className="mt-4">
          <NumberSelector
            label="Number of trays"
            value={value}
            min={min}
            max={max}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
        {confirmed ? (
          <p
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700"
            role="status"
          >
            <span aria-hidden="true">✓</span>
            Tray number confirmed
          </p>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            className="touch-manipulation rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            Continue
          </button>
        )}

        <p className="text-sm text-neutral-500">
          Supported range: {min}–{max} trays.
        </p>
      </div>
    </section>
  );
}
