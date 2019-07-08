export const clamp = (min: number, max: number, val: number): number =>
  Math.min(Math.max(min, val), max)
