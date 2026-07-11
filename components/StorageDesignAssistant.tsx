"use client";

import { useState } from "react";
import DecisionInput from "@/components/DecisionInput";
import DecisionStep from "@/components/DecisionStep";
import NumberSelector from "@/components/NumberSelector";

type BuildType = "box" | "system" | null;
type TrayType = "open" | "lid" | "dividers" | null;
type DividerLayout = "equal" | "custom" | null;

const MIN_GRID_SIZE = 1;
const MAX_GRID_SIZE = 6;

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

export default function StorageDesignAssistant() {
  const [buildType, setBuildType] = useState<BuildType>(null);
  const [trayType, setTrayType] = useState<TrayType>(null);
  const [dividerLayout, setDividerLayout] = useState<DividerLayout>(null);

  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [gridConfirmed, setGridConfirmed] = useState(false);

  function resetGrid() {
    setRows(2);
    setColumns(2);
    setGridConfirmed(false);
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

  function updateRows(value: number) {
    setRows(Math.min(MAX_GRID_SIZE, Math.max(MIN_GRID_SIZE, value)));
    setGridConfirmed(false);
  }

  function updateColumns(value: number) {
    setColumns(Math.min(MAX_GRID_SIZE, Math.max(MIN_GRID_SIZE, value)));
    setGridConfirmed(false);
  }

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
            You have selected a storage box. Dimensions will be configured in
            the next phase.
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
            Dimensions will be configured in the next phase.
          </p>
        </section>
      )}

      {dividerLayout === "equal" && (
        <DecisionInput
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
        </DecisionInput>
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
            {rows * columns} equally sized compartments. Dimensions will be
            configured in the next phase.
          </p>
        </section>
      )}
    </div>
  );
}
