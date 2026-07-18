import { ENGINEERING_CONSTANTS } from "@/lib/engineering/engineeringConstants";
import { roundDimension } from "@/lib/engineering/calculations/numeric";

import type {
  StorageSystemCalculationInput,
  StorageSystemHeightResult,
} from "@/lib/engineering/types";

export function calculateBaseHeight(
  trayOutsideHeight: number,
  trayNumber: number,
) {
  return roundDimension(
    trayOutsideHeight * trayNumber +
      ENGINEERING_CONSTANTS.base.topAllowance -
      (trayNumber - 1) * ENGINEERING_CONSTANTS.tray.verticalOverlap,
  );
}

export function calculateClosedOutsideHeight(
  baseHeight: number,
  lidHeight: number,
) {
  return roundDimension(baseHeight + lidHeight);
}

export function calculateUsableTrayHeight(trayOutsideHeight: number) {
  const usableTrayHeight = roundDimension(
    trayOutsideHeight -
      ENGINEERING_CONSTANTS.tray.bottomThickness -
      ENGINEERING_CONSTANTS.tray.lidHeightContribution,
  );

  if (usableTrayHeight <= 0) {
    throw new Error(
      "Tray outside height is too small for the tray bottom and lid assembly.",
    );
  }

  return usableTrayHeight;
}

export function calculateTrayOutsideHeight(usableTrayHeight: number) {
  return roundDimension(
    usableTrayHeight +
      ENGINEERING_CONSTANTS.tray.bottomThickness +
      ENGINEERING_CONSTANTS.tray.lidHeightContribution,
  );
}

export function calculateStorageSystemHeights(
  input: StorageSystemCalculationInput,
): StorageSystemHeightResult {
  const trayOutsideHeight =
    input.strategy === "outside-led"
      ? roundDimension(input.heights.trayOutsideHeight)
      : calculateTrayOutsideHeight(input.heights.usableTrayHeight);

  const usableTrayHeight =
    input.strategy === "outside-led"
      ? calculateUsableTrayHeight(trayOutsideHeight)
      : roundDimension(input.heights.usableTrayHeight);

  const lidHeight = ENGINEERING_CONSTANTS.box.lidHeight;
  const baseHeight = calculateBaseHeight(
    trayOutsideHeight,
    input.trayNumber,
  );

  return {
    trayOutsideHeight,
    usableTrayHeight,
    lidHeight,
    baseHeight,
    closedOutsideHeight: calculateClosedOutsideHeight(baseHeight, lidHeight),
  };
}
