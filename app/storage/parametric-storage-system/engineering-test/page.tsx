import { calculateOutsideLed } from "@/lib/engineering/calculations";
import type { StorageSystemCalculationInput } from "@/lib/engineering/types";

const testInput: StorageSystemCalculationInput = {
  buildType: "system",
  trayType: "dividers",
  dividerLayout: "equal",
  trayNumber: 3,
  rows: 2,
  columns: 4,
  strategy: "outside-led",
  width: 125,
  depth: 80,
  heights: {
    trayHeight: 25,
    lidHeight: 13,
  },
};

export default function EngineeringTestPage() {
  const result = calculateOutsideLed(testInput);

  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-white px-6 py-16 text-neutral-900">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
          Engineering Validation
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Calculation Test
        </h1>

        <p className="mt-4 text-neutral-600">
          Outside-led validation for a 2 × 4 equal grid.
        </p>
      </header>

      <section className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold">Input</h2>

        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-neutral-500">Outside width</dt>
            <dd className="font-medium">{testInput.width} mm</dd>
          </div>

          <div>
            <dt className="text-sm text-neutral-500">Outside depth</dt>
            <dd className="font-medium">{testInput.depth} mm</dd>
          </div>

          <div>
            <dt className="text-sm text-neutral-500">Grid</dt>
            <dd className="font-medium">
              {testInput.rows} × {testInput.columns}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-neutral-500">Tray height</dt>
            <dd className="font-medium">{testInput.heights.trayHeight} mm</dd>
          </div>

          <div>
            <dt className="text-sm text-neutral-500">Lid height</dt>
            <dd className="font-medium">{testInput.heights.lidHeight} mm</dd>
          </div>
        </dl>
      </section>

      <section className="mt-8 rounded-xl border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold">Calculated dimensions</h2>

        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-neutral-500">Box inside</dt>
            <dd className="mt-1 font-medium">
              {result.box.insideWidth} × {result.box.insideDepth} mm
            </dd>
          </div>

          {result.tray && (
            <>
              <div>
                <dt className="text-sm text-neutral-500">Tray outside</dt>
                <dd className="mt-1 font-medium">
                  {result.tray.outsideWidth} × {result.tray.outsideDepth} mm
                </dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-500">Tray usable</dt>
                <dd className="mt-1 font-medium">
                  {result.tray.usableWidth} × {result.tray.usableDepth} mm
                </dd>
              </div>
            </>
          )}

          {result.compartment && (
            <div>
              <dt className="text-sm text-neutral-500">One compartment</dt>
              <dd className="mt-1 font-medium">
                {result.compartment.width} × {result.compartment.depth} mm
              </dd>
            </div>
          )}

          {result.heights && (
            <div>
              <dt className="text-sm text-neutral-500">System heights</dt>
              <dd className="mt-1 font-medium">
                Base {result.heights.baseHeight} mm · closed outside{" "}
                {result.heights.outsideHeight} mm
              </dd>
            </div>
          )}
        </dl>
      </section>
    </main>
  );
}
