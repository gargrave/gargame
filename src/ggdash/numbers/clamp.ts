import { CurriedNumberFn } from '../ggdash.types'

export const clamp = (
  min: number,
  max: number,
  val?: number,
): number | CurriedNumberFn => {
  const curried = (x: number) => Math.min(Math.max(min, x), max)
  return val ? curried(val) : curried
}
