import NumberSelector from "@/components/NumberSelector";

type EqualGridInputProps = {
  rows: number;
  columns: number;
  min: number;
  max: number;
  confirmed: boolean;
  onRowsChange: (value: number) => void;
  onColumnsChange: (value: number) => void;
  onConfirm: () => void;
};

export default function EqualGridInput({
  rows,
  columns,
  min,
  max,
  confirmed,
  onRowsChange,
  onColumnsChange,
  onConfirm,
}: EqualGridInputProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        Configure the equal grid
      </h2>

      <p className="mt-1 max-w-2xl text-xs leading-4 text-neutral-500">
        Choose the number of equally sized rows and columns.
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <NumberSelector
          label="Rows"
          value={rows}
          min={min}
          max={max}
          onChange={onRowsChange}
        />

        <NumberSelector
          label="Columns"
          value={columns}
          min={min}
          max={max}
          onChange={onColumnsChange}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
        {confirmed ? (
          <p
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700"
            role="status"
          >
            <span aria-hidden="true">✓</span>
            Divider configuration confirmed
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
          {rows * columns} compartments · Maximum {max} × {max}.
        </p>
      </div>
    </section>
  );
}
