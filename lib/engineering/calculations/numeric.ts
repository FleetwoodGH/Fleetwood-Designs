export const ENGINEERING_NUMERIC_POLICY = {
  dimensionDecimals: 3,
  dividerPositionDecimals: 6,
} as const;

export function roundDimension(value: number) {
  return Number(value.toFixed(ENGINEERING_NUMERIC_POLICY.dimensionDecimals));
}

export function roundDividerPosition(value: number) {
  return Number(
    value.toFixed(ENGINEERING_NUMERIC_POLICY.dividerPositionDecimals),
  );
}
