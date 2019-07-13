// TODO: need tests here
export function any<T>(arr: T[], predicate: (T) => boolean): boolean {
  for (const value of arr) {
    if (predicate(value)) {
      return true
    }
  }

  return false
}
