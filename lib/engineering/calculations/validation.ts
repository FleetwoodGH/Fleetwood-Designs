import { ENGINEERING_LIMITS } from "@/lib/engineering/engineeringConstants";

import type { CalculationInput } from "@/lib/engineering/types";

function requirePositiveValue(value: number, parameterName: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${parameterName} must be greater than zero.`);
  }
}

function requirePositiveInteger(value: number, parameterName: string) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${parameterName} must be a positive whole number.`);
  }
}

export function validateBoxOutsideDesignLimits(
  boxOutsideWidth: number,
  boxOutsideDepth: number,
) {
  if (boxOutsideWidth < ENGINEERING_LIMITS.design.boxWidth.minimum) {
    throw new Error(
      `Box outside width must be at least ${ENGINEERING_LIMITS.design.boxWidth.minimum} mm ` +
        "to remain within the supported Fusion design limits.",
    );
  }

  if (boxOutsideDepth < ENGINEERING_LIMITS.design.boxDepth.minimum) {
    throw new Error(
      `Box outside depth must be at least ${ENGINEERING_LIMITS.design.boxDepth.minimum} mm ` +
        "to remain within the supported Fusion design limits.",
    );
  }
}

export function validateTrayOutsideHeightDesignLimit(
  trayOutsideHeight: number,
) {
  if (
    trayOutsideHeight <
    ENGINEERING_LIMITS.design.trayOutsideHeight.minimum
  ) {
    throw new Error(
      `Tray outside height must be at least ${ENGINEERING_LIMITS.design.trayOutsideHeight.minimum} mm ` +
        "to remain within the supported Fusion design limits.",
    );
  }
}

export function validateCalculationInput(input: CalculationInput) {
  requirePositiveValue(input.width, "Width");
  requirePositiveValue(input.depth, "Depth");

  if (input.strategy === "outside-led") {
    validateBoxOutsideDesignLimits(input.width, input.depth);
  }

  if (input.buildType === "box") {
    requirePositiveValue(input.boxHeight, "Box height");
    return;
  }

  if (input.strategy === "outside-led") {
    requirePositiveValue(
      input.heights.trayOutsideHeight,
      "Tray outside height",
    );

    if (
      input.heights.trayOutsideHeight <=
      ENGINEERING_LIMITS.validity.trayHeight.minimumOutsideExclusive
    ) {
      throw new Error(
        `Tray outside height must be greater than ${ENGINEERING_LIMITS.validity.trayHeight.minimumOutsideExclusive} mm.`,
      );
    }

    validateTrayOutsideHeightDesignLimit(
      input.heights.trayOutsideHeight,
    );
  } else {
    requirePositiveValue(input.heights.usableTrayHeight, "Usable tray height");
  }

  requirePositiveInteger(input.rows, "Rows");
  requirePositiveInteger(input.columns, "Columns");

  if (
    input.rows < ENGINEERING_LIMITS.grid.minimumRows ||
    input.rows > ENGINEERING_LIMITS.grid.maximumRows
  ) {
    throw new Error(
      `Rows must be between ${ENGINEERING_LIMITS.grid.minimumRows} and ${ENGINEERING_LIMITS.grid.maximumRows}.`,
    );
  }

  if (
    input.columns < ENGINEERING_LIMITS.grid.minimumColumns ||
    input.columns > ENGINEERING_LIMITS.grid.maximumColumns
  ) {
    throw new Error(
      `Columns must be between ${ENGINEERING_LIMITS.grid.minimumColumns} and ${ENGINEERING_LIMITS.grid.maximumColumns}.`,
    );
  }

  requirePositiveInteger(input.trayNumber, "Tray number");

  if (
    input.trayNumber < ENGINEERING_LIMITS.trays.minimum ||
    input.trayNumber > ENGINEERING_LIMITS.trays.maximum
  ) {
    throw new Error(
      `Tray number must be between ${ENGINEERING_LIMITS.trays.minimum} and ${ENGINEERING_LIMITS.trays.maximum}.`,
    );
  }

  if (input.trayType === "dividers" && !input.dividerLayout) {
    throw new Error("Divider layout is required for trays with dividers.");
  }
}
