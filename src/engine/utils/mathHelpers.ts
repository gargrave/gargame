export type CurriedNumberFn = (x: number) => number

export const wrap = (
  min: number,
  max: number,
  val?: number,
): number | CurriedNumberFn => {
  const curried = (x: number) => {
    if (x < min) return max
    if (x > max) return min
    return x
  }

  return val ? curried(val) : curried
}

export const clamp = (
  min: number,
  max: number,
  val?: number,
): number | CurriedNumberFn => {
  const curried = (x: number) => Math.min(Math.max(min, x), max)
  return val ? curried(val) : curried
}
