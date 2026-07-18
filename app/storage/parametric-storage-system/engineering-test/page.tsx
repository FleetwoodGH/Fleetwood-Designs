import {
  calculateMinimumUsableTrayHeight,
  calculateOutsideLed,
  calculateUsableSpaceLed,
} from "@/lib/engineering/calculations";
import { generateMakerWorldParameters } from "@/lib/engineering/makerworld";
import type {
  CalculationResult,
  OutsideLedStorageSystemCalculationInput,
  UsableSpaceLedStorageSystemCalculationInput,
} from "@/lib/engineering/types";

const outsideLedInput: OutsideLedStorageSystemCalculationInput = {
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
    trayOutsideHeight: 25,
  },
};

const usableSpaceLedInput: UsableSpaceLedStorageSystemCalculationInput = {
  ...outsideLedInput,
  strategy: "usable-space-led",
  width: 40,
  depth: 30,
  heights: {
    usableTrayHeight: 18.5,
  },
};

const openOutsideLedInput: OutsideLedStorageSystemCalculationInput = {
  ...outsideLedInput,
  trayType: "open",
};

const openUsableSpaceLedInput: UsableSpaceLedStorageSystemCalculationInput = {
  ...usableSpaceLedInput,
  trayType: "open",
  width: 78,
  depth: 30,
  heights: {
    usableTrayHeight: 20.5,
  },
};

const liddedOutsideLedInput: OutsideLedStorageSystemCalculationInput = {
  ...outsideLedInput,
  trayType: "lid",
};

const liddedUsableSpaceLedInput: UsableSpaceLedStorageSystemCalculationInput = {
  ...usableSpaceLedInput,
  trayType: "lid",
  width: 78,
  depth: 30,
};

const outsideLedResult = calculateOutsideLed(outsideLedInput);
const usableSpaceLedResult = calculateUsableSpaceLed(usableSpaceLedInput);
const openOutsideLedResult = calculateOutsideLed(openOutsideLedInput);
const openUsableSpaceLedResult = calculateUsableSpaceLed(
  openUsableSpaceLedInput,
);
const liddedOutsideLedResult = calculateOutsideLed(liddedOutsideLedInput);
const liddedUsableSpaceLedResult = calculateUsableSpaceLed(
  liddedUsableSpaceLedInput,
);
const makerWorldParameters = generateMakerWorldParameters(outsideLedResult);

function validateHeightResult(
  result: CalculationResult,
  testName: string,
  expectedUsableTrayHeight: number,
) {
  if (!result.heights || !result.tray) {
    throw new Error(`${testName} did not produce storage-system heights.`);
  }

  const expectedValues = {
    trayOutsideHeight: 25,
    usableTrayHeight: expectedUsableTrayHeight,
    lidHeight: 13,
    baseHeight: 72,
    closedOutsideHeight: 85,
  };

  for (const [name, expected] of Object.entries(expectedValues)) {
    const actual = result.heights[name as keyof typeof expectedValues];

    if (actual !== expected) {
      throw new Error(
        `${testName} expected ${name} to equal ${expected}, received ${actual}.`,
      );
    }
  }

  if (
    result.tray.outsideHeight !== expectedValues.trayOutsideHeight ||
    result.tray.usableHeight !== expectedValues.usableTrayHeight
  ) {
    throw new Error(`${testName} did not populate the tray height result.`);
  }
}

validateHeightResult(
  outsideLedResult,
  "Divider-tray outside-led height validation",
  18.5,
);
validateHeightResult(
  usableSpaceLedResult,
  "Divider-tray usable-space-led height validation",
  18.5,
);
validateHeightResult(
  liddedOutsideLedResult,
  "Lidded-tray outside-led height validation",
  18.5,
);
validateHeightResult(
  liddedUsableSpaceLedResult,
  "Lidded-tray usable-space-led height validation",
  18.5,
);
validateHeightResult(
  openOutsideLedResult,
  "Open-tray outside-led height validation",
  20.5,
);
validateHeightResult(
  openUsableSpaceLedResult,
  "Open-tray usable-space-led height validation",
  20.5,
);

if (!outsideLedResult.heights || !outsideLedResult.dividers) {
  throw new Error(
    "MakerWorld mapping validation requires storage-system heights and dividers.",
  );
}

const makerWorldSourceHeights = outsideLedResult.heights;
const makerWorldSourceDividers = outsideLedResult.dividers;

const makerWorldParameterByName = new Map(
  makerWorldParameters.groups.flatMap((group) =>
    group.parameters.map((parameter) => [parameter.name, parameter] as const),
  ),
);

if (makerWorldParameterByName.size !== 21) {
  throw new Error(
    `MakerWorld mapping expected 21 editable parameters, received ${makerWorldParameterByName.size}.`,
  );
}

function validateMakerWorldParameter(
  name: string,
  expectedValue: number,
  expectedDisplayValue: string,
) {
  const parameter = makerWorldParameterByName.get(name);

  if (!parameter) {
    throw new Error(`MakerWorld mapping did not include ${name}.`);
  }

  if (
    parameter.value !== expectedValue ||
    parameter.displayValue !== expectedDisplayValue
  ) {
    throw new Error(
      `MakerWorld mapping expected ${name} to equal ${expectedDisplayValue}, ` +
        `received ${parameter.displayValue}.`,
    );
  }
}

validateMakerWorldParameter(
  "boxWidth",
  outsideLedResult.box.outsideWidth,
  outsideLedResult.box.outsideWidth.toFixed(2),
);
validateMakerWorldParameter(
  "boxDepth",
  outsideLedResult.box.outsideDepth,
  outsideLedResult.box.outsideDepth.toFixed(2),
);
validateMakerWorldParameter(
  "lidHeight",
  makerWorldSourceHeights.lidHeight,
  makerWorldSourceHeights.lidHeight.toFixed(2),
);
validateMakerWorldParameter(
  "trayHeight",
  makerWorldSourceHeights.trayOutsideHeight,
  makerWorldSourceHeights.trayOutsideHeight.toFixed(2),
);
validateMakerWorldParameter(
  "trayNumber",
  outsideLedResult.trayNumber,
  outsideLedResult.trayNumber.toFixed(0),
);

makerWorldSourceDividers.verticalPositions.forEach((position, index) => {
  const roundedPosition = Number(position.toFixed(3));

  validateMakerWorldParameter(
    `dividerV${index + 1}`,
    roundedPosition,
    roundedPosition.toFixed(3),
  );
});

validateMakerWorldParameter("dividerV4", 0, "0.000");
validateMakerWorldParameter("dividerV5", 0, "0.000");

makerWorldSourceDividers.verticalToggles.forEach((toggle, index) => {
  validateMakerWorldParameter(
    `toggleV${index + 1}`,
    toggle,
    toggle.toFixed(0),
  );
});

makerWorldSourceDividers.horizontalPositions.forEach((position, index) => {
  const roundedPosition = Number(position.toFixed(3));

  validateMakerWorldParameter(
    `dividerH${index + 1}`,
    roundedPosition,
    roundedPosition.toFixed(3),
  );
});

validateMakerWorldParameter("dividerH2", 0, "0.000");
validateMakerWorldParameter("dividerH3", 0, "0.000");

makerWorldSourceDividers.horizontalToggles
  .slice(0, 3)
  .forEach((toggle, index) => {
    validateMakerWorldParameter(
      `toggleH${index + 1}`,
      toggle,
      toggle.toFixed(0),
    );
  });

function validateRejectedCalculation(
  calculation: () => CalculationResult,
  expectedMessage: string,
  testName: string,
) {
  try {
    calculation();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(expectedMessage)
    ) {
      return;
    }

    throw error;
  }

  throw new Error(
    `${testName} unexpectedly accepted an unsupported dimension.`,
  );
}

validateRejectedCalculation(
  () =>
    calculateOutsideLed({
      ...outsideLedInput,
      width: 94.999,
    }),
  "Box outside width must be at least 95 mm",
  "Outside width boundary validation",
);
calculateOutsideLed({ ...outsideLedInput, width: 95 });

validateRejectedCalculation(
  () =>
    calculateOutsideLed({
      ...outsideLedInput,
      depth: 39.999,
    }),
  "Box outside depth must be at least 40 mm",
  "Outside depth boundary validation",
);
calculateOutsideLed({ ...outsideLedInput, depth: 40 });

validateRejectedCalculation(
  () =>
    calculateOutsideLed({
      ...outsideLedInput,
      heights: { trayOutsideHeight: 14.999 },
    }),
  "Tray outside height must be at least 15 mm",
  "Outside tray height boundary validation",
);
const minimumOutsideHeightResult = calculateOutsideLed({
  ...outsideLedInput,
  heights: { trayOutsideHeight: 15 },
});

if (minimumOutsideHeightResult.heights?.trayOutsideHeight !== 15) {
  throw new Error("The 15 mm outside tray height boundary was not preserved.");
}

const minimumUsableTrayHeight =
  calculateMinimumUsableTrayHeight(outsideLedInput.trayType);

validateRejectedCalculation(
  () =>
    calculateUsableSpaceLed({
      ...usableSpaceLedInput,
      heights: { usableTrayHeight: minimumUsableTrayHeight - 0.001 },
    }),
  "Tray outside height must be at least 15 mm",
  "Usable tray height boundary validation",
);
const minimumUsableHeightResult = calculateUsableSpaceLed({
  ...usableSpaceLedInput,
  heights: { usableTrayHeight: minimumUsableTrayHeight },
});

if (minimumUsableHeightResult.heights?.trayOutsideHeight !== 15) {
  throw new Error(
    "The derived outside tray height did not equal the 15 mm design minimum.",
  );
}

const minimumOpenUsableTrayHeight = calculateMinimumUsableTrayHeight("open");

validateRejectedCalculation(
  () =>
    calculateUsableSpaceLed({
      ...openUsableSpaceLedInput,
      heights: { usableTrayHeight: minimumOpenUsableTrayHeight - 0.001 },
    }),
  "Tray outside height must be at least 15 mm",
  "Open-tray usable height boundary validation",
);
const minimumOpenUsableHeightResult = calculateUsableSpaceLed({
  ...openUsableSpaceLedInput,
  heights: { usableTrayHeight: minimumOpenUsableTrayHeight },
});

if (minimumOpenUsableHeightResult.heights?.trayOutsideHeight !== 15) {
  throw new Error(
    "The open-tray usable height did not derive the 15 mm outside minimum.",
  );
}

validateRejectedCalculation(
  () =>
    calculateOutsideLed({
      ...outsideLedInput,
      heights: { trayOutsideHeight: 6.5 },
    }),
  "must be greater than 6.5 mm",
  "Outside tray height validity validation",
);

validateRejectedCalculation(
  () =>
    calculateOutsideLed({
      ...openOutsideLedInput,
      heights: { trayOutsideHeight: 4.5 },
    }),
  "must be greater than 4.5 mm",
  "Open-tray outside height validity validation",
);

export default function EngineeringTestPage() {
  const result = outsideLedResult;

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
          Engineering validity, Fusion design-limit, and dimension-strategy
          validation for a 2 × 4 equal grid.
        </p>
      </header>

      <section className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold">Input</h2>

        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-neutral-500">Outside width</dt>
            <dd className="font-medium">{outsideLedInput.width} mm</dd>
          </div>

          <div>
            <dt className="text-sm text-neutral-500">Outside depth</dt>
            <dd className="font-medium">{outsideLedInput.depth} mm</dd>
          </div>

          <div>
            <dt className="text-sm text-neutral-500">Grid</dt>
            <dd className="font-medium">
              {outsideLedInput.rows} × {outsideLedInput.columns}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-neutral-500">
              Tray outside height
            </dt>
            <dd className="font-medium">
              {outsideLedInput.heights.trayOutsideHeight} mm
            </dd>
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
                  {result.tray.outsideWidth} × {result.tray.outsideDepth} ×{" "}
                  {result.tray.outsideHeight} mm
                </dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-500">Tray usable</dt>
                <dd className="mt-1 font-medium">
                  {result.tray.usableWidth} × {result.tray.usableDepth} ×{" "}
                  {result.tray.usableHeight} mm
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
                {result.heights.closedOutsideHeight} mm
              </dd>
            </div>
          )}
        </dl>
      </section>

      <section className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-950">
          Engineering validation passed
        </h2>

        <p className="mt-2 text-emerald-800">
          Open trays convert 25 mm outside to 20.5 mm usable height, while
          trays with lids retain the 18.5 mm usable height. Both variants and
          both dimension strategies preserve the 72 mm base and 85 mm closed
          storage-system heights. Design-limit boundaries and the MakerWorld
          mapping also match the current CalculationResult.
        </p>
      </section>
    </main>
  );
}
