export const ENGINEERING_CONSTANTS = {
  box: {
    wallThickness: 4,
    backWallThickness: 5,
    bottomThickness: 3,
  },

  tray: {
    clearance: 0.4,
    wallThickness: 2.5,
    sideAirGap: 2,
    internalHeightAllowance: 4,
    verticalOverlap: 2,
  },

  divider: {
    thickness: 2,
  },

  base: {
    topAllowance: 1,
  },
} as const;

export const ENGINEERING_LIMITS = {
  grid: {
    minimumRows: 1,
    maximumRows: 6,
    minimumColumns: 1,
    maximumColumns: 6,
  },

  trays: {
    minimum: 1,
    maximum: 10,
  },
} as const;
