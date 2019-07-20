/**
 * Returns whether any values in `arr` return true for `predicate`.
 * @param arr
 * @param predicate
 */
export function any<T>(arr: T[], predicate: (T) => boolean): boolean {
  for (const value of arr) {
    if (predicate(value)) {
      return true
    }
  }
  return false
}
