"use client";

import { useState } from "react";
import DecisionStep from "@/components/DecisionStep";
import NumberSelector from "@/components/NumberSelector";
import ParameterInput from "@/components/ParameterInput";

type BuildType = "box" | "system" | null;
type TrayType = "open" | "lid" | "dividers" | null;
type DividerLayout = "equal" | "custom" | null;
type DimensionStrategy = "outside-led" | "usable-space-led" | null;

const MIN_GRID_SIZE = 1;
const MAX_GRID_SIZE = 6;
const MIN_WIDTH = 20;

const buildOptions = [
  {
    id: "box",
    title: "Storage Box",
    description: "A simple configurable storage box without trays.",
    icon: "📦",
  },
  {
    id: "system",
    title: "Storage System",
    description:
      "A configurable storage system with one or more storage trays.",
    icon: "🗃️",
  },
];

const trayOptions = [
  {
    id: "open",
    title: "Open Trays",
    description: "Stackable trays with easy access to their contents.",
    icon: "▱",
  },
  {
    id: "lid",
    title: "Trays with Lids",
    description: "Individual trays that can be closed and used separately.",
    icon: "▰",
  },
  {
    id: "dividers",
    title: "Trays with Dividers",
    description: "Organise smaller items in separate compartments.",
    icon: "▦",
  },
];

const dividerLayoutOptions = [
  {
    id: "equal",
    title: "Equal Grid",
    description: "Create evenly sized compartments automatically.",
    icon: "⬚",
  },
  {
    id: "custom",
    title: "Custom Layout",
    description:
      "Create compartments of different sizes. Manual guidance included.",
    icon: "◫",
  },
];

const dimensionStrategyOptions = [
  {
    id: "outside-led",
    title: "Overall Outside Size",
    description:
      "Start with the maximum outside size of the complete storage solution. Tray and compartment dimensions will be calculated automatically.",
    icon: "⬜",
  },
  {
    id: "usable-space-led",
    title: "Required Usable Space",
    description:
      "Start with the space required for the stored items. The overall outside dimensions will be calculated automatically.",
    icon: "◻️",
  },
];

export default function StorageDesignAssistant() {
  const [buildType, setBuildType] = useState<BuildType>(null);
  const [trayType, setTrayType] = useState<TrayType>(null);
  const [dividerLayout, setDividerLayout] = useState<DividerLayout>(null);
  const [dimensionStrategy, setDimensionStrategy] =
    useState<DimensionStrategy>(null);

  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [gridConfirmed, setGridConfirmed] = useState(false);

  const [requestedWidth, setRequestedWidth] = useState("");

  function resetDimensionParameters() {
    setRequestedWidth("");
  }

  function resetDimensions() {
    setDimensionStrategy(null);
    resetDimensionParameters();
  }

  function resetGrid() {
    setRows(2);
    setColumns(2);
    setGridConfirmed(false);
    resetDimensions();
  }

  function handleBuildTypeSelect(optionId: string) {
    if (optionId !== "box" && optionId !== "system") {
      return;
    }

    setBuildType(optionId);
    setTrayType(null);
    setDividerLayout(null);
    resetGrid();
  }

  function handleTrayTypeSelect(optionId: string) {
    if (optionId !== "open" && optionId !== "lid" && optionId !== "dividers") {
      return;
    }

    setTrayType(optionId);
    setDividerLayout(null);
    resetGrid();
  }

  function handleDividerLayoutSelect(optionId: string) {
    if (optionId !== "equal" && optionId !== "custom") {
      return;
    }

    setDividerLayout(optionId);
    resetGrid();
  }

  function handleDimensionStrategySelect(optionId: string) {
    if (optionId !== "outside-led" && optionId !== "usable-space-led") {
      return;
    }

    setDimensionStrategy(optionId);
    resetDimensionParameters();
  }

  function updateRows(value: number) {
    setRows(Math.min(MAX_GRID_SIZE, Math.max(MIN_GRID_SIZE, value)));
    setGridConfirmed(false);
    resetDimensions();
  }

  function updateColumns(value: number) {
    setColumns(Math.min(MAX_GRID_SIZE, Math.max(MIN_GRID_SIZE, value)));
    setGridConfirmed(false);
    resetDimensions();
  }

  function handleWidthChange(value: string) {
    if (value === "" || /^\d+$/.test(value)) {
      setRequestedWidth(value);
    }
  }

  function getUsableSpaceDescription() {
    if (buildType === "box") {
      return "You will specify the required usable inside dimensions of the box. The outside dimensions will be calculated automatically.";
    }

    if (trayType === "open") {
      return "You will specify the required usable dimensions inside an open tray. The tray and overall box dimensions will be calculated automatically.";
    }

    if (trayType === "lid") {
      return "You will specify the required usable dimensions inside a tray with a lid. The tray and overall box dimensions will be calculated automatically.";
    }

    if (trayType === "dividers" && dividerLayout === "equal") {
      return `You will specify the required dimensions of one compartment. The complete ${rows} × ${columns} grid, tray and overall box dimensions will be calculated automatically.`;
    }

    if (trayType === "dividers" && dividerLayout === "custom") {
      return "You will specify the required usable tray area. Custom compartment positions will be configured separately.";
    }

    return "";
  }

  function getWidthTitle() {
    if (dimensionStrategy === "outside-led") {
      return "Specify the overall width";
    }

    if (trayType === "dividers" && dividerLayout === "equal") {
      return "Specify the compartment width";
    }

    if (buildType === "box") {
      return "Specify the usable box width";
    }

    return "Specify the usable tray width";
  }

  function getWidthLabel() {
    if (dimensionStrategy === "outside-led") {
      return "Overall outside width";
    }

    if (trayType === "dividers" && dividerLayout === "equal") {
      return "Width of one compartment";
    }

    if (buildType === "box") {
      return "Usable inside width";
    }

    return "Usable tray width";
  }

  function getWidthDescription() {
    if (dimensionStrategy === "outside-led") {
      return "Enter the maximum outside width of the complete storage solution.";
    }

    if (trayType === "dividers" && dividerLayout === "equal") {
      return `Enter the required usable width of one compartment. The total width of the ${columns}-column grid will be calculated automatically.`;
    }

    if (buildType === "box") {
      return "Enter the usable width required inside the storage box.";
    }

    if (trayType === "lid") {
      return "Enter the usable width required inside one tray with a lid.";
    }

    if (trayType === "dividers") {
      return "Enter the usable width required inside the divided tray.";
    }

    return "Enter the usable width required inside one open tray.";
  }

  const requestedWidthValue =
    requestedWidth === "" ? null : Number(requestedWidth);

  const widthIsValid =
    requestedWidthValue !== null &&
    Number.isInteger(requestedWidthValue) &&
    requestedWidthValue >= MIN_WIDTH;

  const widthHasError = requestedWidth !== "" && !widthIsValid;

  const designPhaseComplete =
    buildType === "box" ||
    (buildType === "system" && trayType !== null && trayType !== "dividers") ||
    (trayType === "dividers" && dividerLayout === "custom") ||
    (trayType === "dividers" && dividerLayout === "equal" && gridConfirmed);

  return (
    <div className="space-y-12">
      <DecisionStep
        question="What would you like to build?"
        options={buildOptions}
        selectedOption={buildType}
        onSelect={handleBuildTypeSelect}
      />

      {buildType === "system" && (
        <DecisionStep
          question="Which type of tray would you like to use?"
          options={trayOptions}
          selectedOption={trayType}
          onSelect={handleTrayTypeSelect}
        />
      )}

      {buildType === "box" && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Configuration selected
          </h2>

          <p className="mt-2 text-neutral-600">
            You have selected a storage box. Continue below to configure its
            dimensions.
          </p>
        </section>
      )}

      {trayType === "dividers" && (
        <DecisionStep
          question="How would you like to organise the compartments?"
          options={dividerLayoutOptions}
          selectedOption={dividerLayout}
          onSelect={handleDividerLayoutSelect}
        />
      )}

      {trayType && trayType !== "dividers" && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Tray configuration selected
          </h2>

          <p className="mt-2 text-neutral-600">
            Continue below to configure the dimensions of your storage system.
          </p>
        </section>
      )}

      {dividerLayout === "equal" && (
        <ParameterInput
          title="Configure the equal grid"
          description="Choose how many equally sized rows and columns the tray should contain."
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <NumberSelector
              label="Rows"
              value={rows}
              min={MIN_GRID_SIZE}
              max={MAX_GRID_SIZE}
              onChange={updateRows}
            />

            <NumberSelector
              label="Columns"
              value={columns}
              min={MIN_GRID_SIZE}
              max={MAX_GRID_SIZE}
              onChange={updateColumns}
            />
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="text-sm text-neutral-600">
              This creates {rows * columns} equally sized compartments.
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Maximum: {MAX_GRID_SIZE} rows × {MAX_GRID_SIZE} columns.
            </p>

            <button
              type="button"
              onClick={() => setGridConfirmed(true)}
              className="mt-6 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Continue
            </button>
          </div>
        </ParameterInput>
      )}

      {dividerLayout === "custom" && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Custom layout selected
          </h2>

          <p className="mt-2 text-neutral-600">
            Manual guidance for configuring custom divider positions will be
            added here.
          </p>
        </section>
      )}

      {gridConfirmed && dividerLayout === "equal" && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Design configuration complete
          </h2>

          <p className="mt-2 text-neutral-600">
            Your tray will contain {rows} rows and {columns} columns, creating{" "}
            {rows * columns} equally sized compartments.
          </p>
        </section>
      )}

      {designPhaseComplete && (
        <section className="space-y-8 border-t border-neutral-200 pt-12">
          <header>
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
              Phase 2
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
              Dimensions
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
              Choose whether the total outside size or the required usable space
              should determine the design.
            </p>
          </header>

          <DecisionStep
            question="Which dimensions should lead the design?"
            options={dimensionStrategyOptions}
            selectedOption={dimensionStrategy}
            onSelect={handleDimensionStrategySelect}
          />
        </section>
      )}

      {dimensionStrategy === "outside-led" && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Overall outside size selected
          </h2>

          <p className="mt-2 leading-7 text-neutral-600">
            You will specify the overall outside dimensions of the complete
            storage solution. All tray, usable-space and compartment dimensions
            will be calculated from the outside in.
          </p>
        </section>
      )}

      {dimensionStrategy === "usable-space-led" && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Required usable space selected
          </h2>

          <p className="mt-2 leading-7 text-neutral-600">
            {getUsableSpaceDescription()}
          </p>
        </section>
      )}

      {dimensionStrategy && (
        <ParameterInput
          title={getWidthTitle()}
          description={getWidthDescription()}
        >
          <div className="max-w-sm">
            <label
              htmlFor="requested-width"
              className="block text-sm font-medium text-neutral-900"
            >
              {getWidthLabel()}
            </label>

            <div className="relative mt-2">
              <input
                id="requested-width"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={requestedWidth}
                onChange={(event) => handleWidthChange(event.target.value)}
                aria-invalid={widthHasError}
                aria-describedby={
                  widthHasError
                    ? "requested-width-error"
                    : "requested-width-help"
                }
                className={[
                  "w-full rounded-lg border bg-white px-4 py-3 pr-14 text-neutral-900 outline-none transition",
                  "focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2",
                  widthHasError
                    ? "border-red-500"
                    : "border-neutral-300 hover:border-neutral-400",
                ].join(" ")}
              />

              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-neutral-500">
                mm
              </span>
            </div>

            {widthHasError ? (
              <p
                id="requested-width-error"
                className="mt-2 text-sm text-red-600"
              >
                Width must be at least {MIN_WIDTH} mm.
              </p>
            ) : (
              <p
                id="requested-width-help"
                className="mt-2 text-sm text-neutral-500"
              >
                Enter a whole number of at least {MIN_WIDTH} mm.
              </p>
            )}
          </div>
        </ParameterInput>
      )}

      {widthIsValid && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Width specified
          </h2>

          <p className="mt-2 text-neutral-600">
            {getWidthLabel()}: {requestedWidthValue} mm.
          </p>
        </section>
      )}
    </div>
  );
}
