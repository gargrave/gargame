/**
 * Returns the value at the specified x/y coordinates from `arr`. Note that `arr` is
 * a regular one-dimensional Array, but is being treated as if it were a grid of `width` size.
 * @param arr
 * @param width
 * @param x
 * @param y
 */
export function getAtXy<T>(arr: T[], width: number, x: number, y: number): T {
  if (x * y > arr.length) {
    throw new Error(
      `getAtXy :: x/y value of ${x}/${y} is too high for Array of length: ${arr.length}`,
    )
  }

  return arr[x + y * width]
}
