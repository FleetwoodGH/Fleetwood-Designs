import type { DimensionTarget } from "@/components/storage-design-assistant/types";
import type { DimensionStrategy } from "@/components/storage-design-assistant/types";

type WorkflowTextContext = {
  trayNumber: number;
  rows: number;
  columns: number;
};

export function getDimensionStrategyDescription(
  target: DimensionTarget,
  context: WorkflowTextContext,
) {
  switch (target) {
    case "box-outside":
      return "You will specify the outside width and depth of the storage box. Its usable inside width and depth will be calculated automatically.";

    case "system-outside":
      return `You will specify the outside width and depth of the complete storage system containing ${context.trayNumber} ${
        context.trayNumber === 1 ? "tray" : "trays"
      }. Tray, usable-space and compartment width and depth will be calculated automatically.`;

    case "box-inside":
      return "You will specify the usable inside width and depth required in the storage box. The outside width and depth will be calculated automatically.";

    case "tray-inside":
      return `You will specify the usable width and depth required inside one tray. The tray and complete ${context.trayNumber}-tray storage-system width and depth will be calculated automatically.`;

    case "compartment-inside":
      return `You will specify the usable width and depth required for one compartment. The complete ${context.rows} × ${context.columns} grid, tray and ${context.trayNumber}-tray storage-system width and depth will be calculated automatically.`;

    case "custom-tray-inside":
      return "You will specify the usable width and depth required inside the tray. Custom divider positions will be configured separately.";

    default:
      return "";
  }
}

export function getDimensionTitle(target: DimensionTarget) {
  switch (target) {
    case "box-outside":
      return "Specify the outside box width and depth";

    case "system-outside":
      return "Specify the overall system width and depth";

    case "box-inside":
      return "Specify the usable box width and depth";

    case "tray-inside":
      return "Specify the usable tray width and depth";

    case "compartment-inside":
      return "Specify the compartment width and depth";

    case "custom-tray-inside":
      return "Specify the usable tray width and depth";

    default:
      return "Specify the width and depth";
  }
}

export function getDimensionDescription(
  target: DimensionTarget,
  context: WorkflowTextContext,
) {
  switch (target) {
    case "box-outside":
      return "Enter the maximum outside width and depth of the storage box.";

    case "system-outside":
      return `Enter the maximum outside width and depth of the complete ${context.trayNumber}-tray storage system.`;

    case "box-inside":
      return "Enter the usable width and depth required inside the storage box.";

    case "tray-inside":
      return "Enter the usable width and depth required inside one tray.";

    case "compartment-inside":
      return `Enter the usable width and depth required for one compartment in the ${context.rows} × ${context.columns} grid.`;

    case "custom-tray-inside":
      return "Enter the usable width and depth required inside the divided tray.";

    default:
      return "";
  }
}

export function getWidthLabel(target: DimensionTarget) {
  switch (target) {
    case "box-outside":
      return "Outside box width";

    case "system-outside":
      return "Overall system width";

    case "box-inside":
      return "Usable box width";

    case "tray-inside":
    case "custom-tray-inside":
      return "Usable tray width";

    case "compartment-inside":
      return "Compartment width";

    default:
      return "Width";
  }
}

export function getDepthLabel(target: DimensionTarget) {
  switch (target) {
    case "box-outside":
      return "Outside box depth";

    case "system-outside":
      return "Overall system depth";

    case "box-inside":
      return "Usable box depth";

    case "tray-inside":
    case "custom-tray-inside":
      return "Usable tray depth";

    case "compartment-inside":
      return "Compartment depth";

    default:
      return "Depth";
  }
}

export function getBoxHeightLabel(target: DimensionTarget) {
  switch (target) {
    case "box-outside":
      return "Outside box height";

    case "box-inside":
      return "Usable box height";

    default:
      return "Box height";
  }
}

export function getTrayHeightTitle(strategy: DimensionStrategy) {
  return strategy === "outside-led"
    ? "Specify the tray outside height"
    : "Specify the required usable tray height";
}

export function getTrayHeightDescription(strategy: DimensionStrategy) {
  return strategy === "outside-led"
    ? "Enter the known outside height of each tray. The usable tray height and complete storage-system height will be calculated automatically."
    : "Enter the usable internal height required in each tray. The tray outside height and complete storage-system height will be calculated automatically.";
}

export function getTrayHeightLabel(strategy: DimensionStrategy) {
  return strategy === "outside-led"
    ? "Tray outside height"
    : "Required usable tray height";
}
