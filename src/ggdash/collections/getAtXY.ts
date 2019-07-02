/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartiallyAppliedBinaryFn } from '../ggdash.types'

/**
 * Returns the value at the specified x/y coordinates from `arr`. Note that `arr` is
 * a regular one-dimensional Array, but is being treated as if it were a grid of `width` size.
 *
 * If all 4 args are supplied the function will return the result of said args. If either of the last two
 * args are missing, it will instead return a partially-applied version of the function, with `arr` and `width` bound.
 *
 * @param arr
 * @param width
 * @param x
 * @param y
 */
export function getAtXy<T>(
  arr: T[],
  width: number,
  x?: number,
  y?: number,
): T | PartiallyAppliedBinaryFn<number, T> {
  const curried = (gridX: number, gridY: number): T => {
    if (gridX * gridY > arr.length) {
      throw new Error(
        `getAtXy :: x/y value of ${x}/${y} is too high for Array of length: ${arr.length}`,
      )
    }

    return arr[gridX + gridY * width]
  }

  return x && y ? curried(x, y) : curried
}
