import { ENGINEERING_CONSTANTS } from "@/lib/engineering/engineeringConstants";

import type {
  StorageSystemHeightInput,
  StorageSystemHeightResult,
} from "@/lib/engineering/types";

const CALCULATION_PRECISION = 3;

function roundDimension(value: number) {
  return Number(value.toFixed(CALCULATION_PRECISION));
}

export function calculateBaseHeight(
  trayHeight: number,
  trayNumber: number,
) {
  return roundDimension(
    trayHeight * trayNumber +
      ENGINEERING_CONSTANTS.base.topAllowance -
      (trayNumber - 1) * ENGINEERING_CONSTANTS.tray.verticalOverlap,
  );
}

export function calculateOutsideHeight(
  baseHeight: number,
  lidHeight: number,
) {
  return roundDimension(baseHeight + lidHeight);
}

export function calculateStorageSystemHeights(
  input: StorageSystemHeightInput,
  trayNumber: number,
): StorageSystemHeightResult {
  const trayHeight = roundDimension(input.trayHeight);
  const lidHeight = roundDimension(input.lidHeight);
  const baseHeight = calculateBaseHeight(trayHeight, trayNumber);

  return {
    trayHeight,
    lidHeight,
    baseHeight,
    outsideHeight: calculateOutsideHeight(baseHeight, lidHeight),
  };
}
