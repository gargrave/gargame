import { CurriedNumberFn } from '../growbag.types'

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
