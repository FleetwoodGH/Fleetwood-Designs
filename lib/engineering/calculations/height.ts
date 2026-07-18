import {
  ENGINEERING_CONSTANTS,
  ENGINEERING_LIMITS,
} from "@/lib/engineering/engineeringConstants";
import { roundDimension } from "@/lib/engineering/calculations/numeric";

import type {
  StorageSystemCalculationInput,
  StorageSystemHeightResult,
  TrayType,
} from "@/lib/engineering/types";

function getTrayHeightContribution(trayType: TrayType) {
  return trayType === "open"
    ? ENGINEERING_CONSTANTS.tray.verticalOverlap
    : ENGINEERING_CONSTANTS.tray.lidHeightContribution;
}

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

export function calculateUsableTrayHeight(
  trayOutsideHeight: number,
  trayType: TrayType,
) {
  const usableTrayHeight = roundDimension(
    trayOutsideHeight -
      ENGINEERING_CONSTANTS.tray.bottomThickness -
      getTrayHeightContribution(trayType),
  );

  if (usableTrayHeight <= 0) {
    const constructionDescription =
      trayType === "open"
        ? "tray bottom and vertical overlap"
        : "tray bottom and lid assembly";

    throw new Error(
      `Tray outside height is too small for the ${constructionDescription}.`,
    );
  }

  return usableTrayHeight;
}

export function calculateTrayOutsideHeight(
  usableTrayHeight: number,
  trayType: TrayType,
) {
  return roundDimension(
    usableTrayHeight +
      ENGINEERING_CONSTANTS.tray.bottomThickness +
      getTrayHeightContribution(trayType),
  );
}

export function calculateMinimumUsableTrayHeight(trayType: TrayType) {
  return calculateUsableTrayHeight(
    ENGINEERING_LIMITS.design.trayOutsideHeight.minimum,
    trayType,
  );
}

export function calculateTrayOutsideHeightValidityBoundary(
  trayType: TrayType,
) {
  return roundDimension(
    ENGINEERING_CONSTANTS.tray.bottomThickness +
      getTrayHeightContribution(trayType),
  );
}

export function calculateStorageSystemHeights(
  input: StorageSystemCalculationInput,
): StorageSystemHeightResult {
  const trayOutsideHeight =
    input.strategy === "outside-led"
      ? roundDimension(input.heights.trayOutsideHeight)
      : calculateTrayOutsideHeight(
          input.heights.usableTrayHeight,
          input.trayType,
        );

  const usableTrayHeight =
    input.strategy === "outside-led"
      ? calculateUsableTrayHeight(trayOutsideHeight, input.trayType)
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
