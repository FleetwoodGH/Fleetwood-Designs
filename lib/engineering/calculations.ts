import {
  ENGINEERING_CONSTANTS,
  ENGINEERING_LIMITS,
} from "@/lib/engineering/engineeringConstants";

import type {
  CalculationInput,
  CalculationResult,
  CompartmentDimensions,
  DividerConfiguration,
  TrayDimensions,
} from "@/lib/engineering/types";

const CALCULATION_PRECISION = 3;
const DIVIDER_POSITION_PRECISION = 6;

function roundDimension(value: number) {
  return Number(value.toFixed(CALCULATION_PRECISION));
}

function roundDividerPosition(value: number) {
  return Number(value.toFixed(DIVIDER_POSITION_PRECISION));
}

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

function validateCalculationInput(input: CalculationInput) {
  requirePositiveValue(input.width, "Width");
  requirePositiveValue(input.depth, "Depth");
  requirePositiveValue(input.height, "Height");

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

  if (input.buildType === "system") {
    requirePositiveInteger(input.trayNumber, "Tray number");

    if (
      input.trayNumber < ENGINEERING_LIMITS.trays.minimum ||
      input.trayNumber > ENGINEERING_LIMITS.trays.maximum
    ) {
      throw new Error(
        `Tray number must be between ${ENGINEERING_LIMITS.trays.minimum} and ${ENGINEERING_LIMITS.trays.maximum}.`,
      );
    }

    if (!input.trayType) {
      throw new Error("Tray type is required for a storage system.");
    }
  }

  if (input.trayType === "dividers" && !input.dividerLayout) {
    throw new Error("Divider layout is required for trays with dividers.");
  }
}

/* -------------------------------------------------------------------------- */
/* Box calculations                                                           */
/* -------------------------------------------------------------------------- */

function calculateBoxInsideWidth(boxOutsideWidth: number) {
  return roundDimension(
    boxOutsideWidth - 2 * ENGINEERING_CONSTANTS.box.wallThickness,
  );
}

function calculateBoxOutsideWidth(boxInsideWidth: number) {
  return roundDimension(
    boxInsideWidth + 2 * ENGINEERING_CONSTANTS.box.wallThickness,
  );
}

function calculateBoxInsideDepth(boxOutsideDepth: number) {
  return roundDimension(
    boxOutsideDepth -
      ENGINEERING_CONSTANTS.construction.hingeDepthClearancePerPart -
      ENGINEERING_CONSTANTS.box.wallThickness -
      ENGINEERING_CONSTANTS.box.backWallThickness,
  );
}

function calculateBoxOutsideDepth(boxInsideDepth: number) {
  return roundDimension(
    boxInsideDepth +
      ENGINEERING_CONSTANTS.box.wallThickness +
      ENGINEERING_CONSTANTS.box.backWallThickness +
      ENGINEERING_CONSTANTS.construction.hingeDepthClearancePerPart,
  );
}

/* -------------------------------------------------------------------------- */
/* Tray calculations                                                          */
/* -------------------------------------------------------------------------- */

function calculateTrayOutsideWidth(boxInsideWidth: number) {
  return roundDimension(
    boxInsideWidth - 2 * ENGINEERING_CONSTANTS.tray.clearance,
  );
}

function calculateBoxInsideWidthFromTray(trayOutsideWidth: number) {
  return roundDimension(
    trayOutsideWidth + 2 * ENGINEERING_CONSTANTS.tray.clearance,
  );
}

function calculateTrayOutsideDepth(boxInsideDepth: number) {
  return roundDimension(
    boxInsideDepth - 2 * ENGINEERING_CONSTANTS.tray.clearance,
  );
}

function calculateBoxInsideDepthFromTray(trayOutsideDepth: number) {
  return roundDimension(
    trayOutsideDepth + 2 * ENGINEERING_CONSTANTS.tray.clearance,
  );
}

function calculateTrayUsableWidth(trayOutsideWidth: number) {
  return roundDimension(
    trayOutsideWidth -
      2 * ENGINEERING_CONSTANTS.tray.wallThickness -
      2 * ENGINEERING_CONSTANTS.tray.sideAirGap,
  );
}

function calculateTrayOutsideWidthFromUsableWidth(trayUsableWidth: number) {
  return roundDimension(
    trayUsableWidth +
      2 * ENGINEERING_CONSTANTS.tray.wallThickness +
      2 * ENGINEERING_CONSTANTS.tray.sideAirGap,
  );
}

function calculateTrayUsableDepth(trayOutsideDepth: number) {
  return roundDimension(
    trayOutsideDepth - 2 * ENGINEERING_CONSTANTS.tray.wallThickness,
  );
}

function calculateTrayOutsideDepthFromUsableDepth(trayUsableDepth: number) {
  return roundDimension(
    trayUsableDepth + 2 * ENGINEERING_CONSTANTS.tray.wallThickness,
  );
}

/* -------------------------------------------------------------------------- */
/* Compartment calculations                                                   */
/* -------------------------------------------------------------------------- */

function calculateCompartmentDimensions(
  trayUsableWidth: number,
  trayUsableDepth: number,
  rows: number,
  columns: number,
): CompartmentDimensions {
  const dividerThickness = ENGINEERING_CONSTANTS.divider.thickness;

  const totalVerticalDividerThickness = (columns - 1) * dividerThickness;

  const totalHorizontalDividerThickness = (rows - 1) * dividerThickness;

  const width = roundDimension(
    (trayUsableWidth - totalVerticalDividerThickness) / columns,
  );

  const depth = roundDimension(
    (trayUsableDepth - totalHorizontalDividerThickness) / rows,
  );

  if (width <= 0 || depth <= 0) {
    throw new Error(
      "The selected dimensions are too small for the requested grid and divider thickness.",
    );
  }

  return {
    width,
    depth,
    height: null,
  };
}

function calculateTrayUsableWidthFromCompartment(
  compartmentWidth: number,
  columns: number,
) {
  return roundDimension(
    columns * compartmentWidth +
      (columns - 1) * ENGINEERING_CONSTANTS.divider.thickness,
  );
}

function calculateTrayUsableDepthFromCompartment(
  compartmentDepth: number,
  rows: number,
) {
  return roundDimension(
    rows * compartmentDepth +
      (rows - 1) * ENGINEERING_CONSTANTS.divider.thickness,
  );
}

/* -------------------------------------------------------------------------- */
/* Divider calculations                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Calculates normalised divider centre positions.
 *
 * The available clear space is divided into equal compartments.
 * Divider thickness is inserted between those compartments.
 */
function calculateEqualDividerPositions(
  usableLength: number,
  compartmentCount: number,
) {
  if (compartmentCount <= 1) {
    return [];
  }

  const dividerThickness = ENGINEERING_CONSTANTS.divider.thickness;

  const dividerCount = compartmentCount - 1;

  const availableCompartmentLength =
    usableLength - dividerCount * dividerThickness;

  const compartmentLength = availableCompartmentLength / compartmentCount;

  if (compartmentLength <= 0) {
    throw new Error(
      "The usable dimension is too small for the requested number of compartments.",
    );
  }

  return Array.from({ length: dividerCount }, (_, index) => {
    const dividerNumber = index + 1;

    const dividerCentrePosition =
      dividerNumber * compartmentLength +
      (dividerNumber - 0.5) * dividerThickness;

    return roundDividerPosition(dividerCentrePosition / usableLength);
  });
}

function createDividerToggles(
  activeDividerCount: number,
  maximumDividerCount: number,
) {
  return Array.from({ length: maximumDividerCount }, (_, index) =>
    index < activeDividerCount ? 1 : 0,
  );
}

function calculateEqualDividerConfiguration(
  trayUsableWidth: number,
  trayUsableDepth: number,
  rows: number,
  columns: number,
): DividerConfiguration {
  const maximumVerticalDividers = ENGINEERING_LIMITS.grid.maximumColumns - 1;

  const maximumHorizontalDividers = ENGINEERING_LIMITS.grid.maximumRows - 1;

  const verticalPositions = calculateEqualDividerPositions(
    trayUsableWidth,
    columns,
  );

  const horizontalPositions = calculateEqualDividerPositions(
    trayUsableDepth,
    rows,
  );

  return {
    verticalPositions,
    horizontalPositions,

    verticalToggles: createDividerToggles(
      verticalPositions.length,
      maximumVerticalDividers,
    ),

    horizontalToggles: createDividerToggles(
      horizontalPositions.length,
      maximumHorizontalDividers,
    ),
  };
}

/* -------------------------------------------------------------------------- */
/* Result helpers                                                             */
/* -------------------------------------------------------------------------- */

function createTrayDimensions(
  outsideWidth: number,
  outsideDepth: number,
  usableWidth: number,
  usableDepth: number,
): TrayDimensions {
  if (
    outsideWidth <= 0 ||
    outsideDepth <= 0 ||
    usableWidth <= 0 ||
    usableDepth <= 0
  ) {
    throw new Error(
      "The calculated tray dimensions must be greater than zero.",
    );
  }

  return {
    outsideWidth: roundDimension(outsideWidth),
    outsideDepth: roundDimension(outsideDepth),
    outsideHeight: null,

    usableWidth: roundDimension(usableWidth),
    usableDepth: roundDimension(usableDepth),
    usableHeight: null,
  };
}

/* -------------------------------------------------------------------------- */
/* Outside-led calculation                                                    */
/* -------------------------------------------------------------------------- */

export function calculateOutsideLed(
  input: CalculationInput,
): CalculationResult {
  validateCalculationInput(input);

  if (input.strategy !== "outside-led") {
    throw new Error(
      "calculateOutsideLed only accepts outside-led calculation input.",
    );
  }

  const warnings = ["Height calculations are not yet implemented."];

  const boxInsideWidth = calculateBoxInsideWidth(input.width);

  const boxInsideDepth = calculateBoxInsideDepth(input.depth);

  if (boxInsideWidth <= 0 || boxInsideDepth <= 0) {
    throw new Error(
      "The outside dimensions are too small for the configured box construction.",
    );
  }

  if (input.buildType === "box") {
    return {
      strategy: input.strategy,

      box: {
        outsideWidth: roundDimension(input.width),
        outsideDepth: roundDimension(input.depth),
        outsideHeight: roundDimension(input.height),

        insideWidth: boxInsideWidth,
        insideDepth: boxInsideDepth,
        insideHeight: null,
      },

      tray: null,
      compartment: null,
      dividers: null,

      trayNumber: 0,
      rows: null,
      columns: null,

      warnings,
    };
  }

  const trayOutsideWidth = calculateTrayOutsideWidth(boxInsideWidth);

  const trayOutsideDepth = calculateTrayOutsideDepth(boxInsideDepth);

  const trayUsableWidth = calculateTrayUsableWidth(trayOutsideWidth);

  const trayUsableDepth = calculateTrayUsableDepth(trayOutsideDepth);

  const tray = createTrayDimensions(
    trayOutsideWidth,
    trayOutsideDepth,
    trayUsableWidth,
    trayUsableDepth,
  );

  const equalGridSelected =
    input.trayType === "dividers" && input.dividerLayout === "equal";

  const compartment = equalGridSelected
    ? calculateCompartmentDimensions(
        trayUsableWidth,
        trayUsableDepth,
        input.rows,
        input.columns,
      )
    : null;

  const dividers = equalGridSelected
    ? calculateEqualDividerConfiguration(
        trayUsableWidth,
        trayUsableDepth,
        input.rows,
        input.columns,
      )
    : null;

  return {
    strategy: input.strategy,

    box: {
      outsideWidth: roundDimension(input.width),
      outsideDepth: roundDimension(input.depth),
      outsideHeight: roundDimension(input.height),

      insideWidth: boxInsideWidth,
      insideDepth: boxInsideDepth,
      insideHeight: null,
    },

    tray,
    compartment,
    dividers,

    trayNumber: input.trayNumber,
    rows: equalGridSelected ? input.rows : null,
    columns: equalGridSelected ? input.columns : null,

    warnings,
  };
}

/* -------------------------------------------------------------------------- */
/* Usable-space-led calculation                                               */
/* -------------------------------------------------------------------------- */

export function calculateUsableSpaceLed(
  input: CalculationInput,
): CalculationResult {
  validateCalculationInput(input);

  if (input.strategy !== "usable-space-led") {
    throw new Error(
      "calculateUsableSpaceLed only accepts usable-space-led calculation input.",
    );
  }

  const warnings = ["Height calculations are not yet implemented."];

  if (input.buildType === "box") {
    const boxOutsideWidth = calculateBoxOutsideWidth(input.width);

    const boxOutsideDepth = calculateBoxOutsideDepth(input.depth);

    return {
      strategy: input.strategy,

      box: {
        outsideWidth: boxOutsideWidth,
        outsideDepth: boxOutsideDepth,
        outsideHeight: roundDimension(input.height),

        insideWidth: roundDimension(input.width),
        insideDepth: roundDimension(input.depth),
        insideHeight: null,
      },

      tray: null,
      compartment: null,
      dividers: null,

      trayNumber: 0,
      rows: null,
      columns: null,

      warnings,
    };
  }

  const equalGridSelected =
    input.trayType === "dividers" && input.dividerLayout === "equal";

  let trayUsableWidth: number;
  let trayUsableDepth: number;
  let compartment: CompartmentDimensions | null;

  if (equalGridSelected) {
    trayUsableWidth = calculateTrayUsableWidthFromCompartment(
      input.width,
      input.columns,
    );

    trayUsableDepth = calculateTrayUsableDepthFromCompartment(
      input.depth,
      input.rows,
    );

    compartment = {
      width: roundDimension(input.width),
      depth: roundDimension(input.depth),
      height: null,
    };
  } else {
    trayUsableWidth = roundDimension(input.width);
    trayUsableDepth = roundDimension(input.depth);
    compartment = null;
  }

  const trayOutsideWidth =
    calculateTrayOutsideWidthFromUsableWidth(trayUsableWidth);

  const trayOutsideDepth =
    calculateTrayOutsideDepthFromUsableDepth(trayUsableDepth);

  const boxInsideWidth = calculateBoxInsideWidthFromTray(trayOutsideWidth);

  const boxInsideDepth = calculateBoxInsideDepthFromTray(trayOutsideDepth);

  const boxOutsideWidth = calculateBoxOutsideWidth(boxInsideWidth);

  const boxOutsideDepth = calculateBoxOutsideDepth(boxInsideDepth);

  const tray = createTrayDimensions(
    trayOutsideWidth,
    trayOutsideDepth,
    trayUsableWidth,
    trayUsableDepth,
  );

  const dividers = equalGridSelected
    ? calculateEqualDividerConfiguration(
        trayUsableWidth,
        trayUsableDepth,
        input.rows,
        input.columns,
      )
    : null;

  return {
    strategy: input.strategy,

    box: {
      outsideWidth: boxOutsideWidth,
      outsideDepth: boxOutsideDepth,
      outsideHeight: roundDimension(input.height),

      insideWidth: boxInsideWidth,
      insideDepth: boxInsideDepth,
      insideHeight: null,
    },

    tray,
    compartment,
    dividers,

    trayNumber: input.trayNumber,
    rows: equalGridSelected ? input.rows : null,
    columns: equalGridSelected ? input.columns : null,

    warnings,
  };
}

/* -------------------------------------------------------------------------- */
/* Public calculation entry point                                             */
/* -------------------------------------------------------------------------- */

export function calculateStorageDesign(
  input: CalculationInput,
): CalculationResult {
  if (input.strategy === "outside-led") {
    return calculateOutsideLed(input);
  }

  return calculateUsableSpaceLed(input);
}
