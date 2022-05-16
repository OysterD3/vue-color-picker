export const round = (
  n: number,
  decimal = 2,
  base = Math.pow(10, decimal),
): number => {
  return Math.round(base * n) / base;
};
