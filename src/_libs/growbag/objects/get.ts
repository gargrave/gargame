export function get<T>(
  obj: {} | undefined,
  path: string | string[],
  defaultValue?: T,
): T | undefined {
  if (!obj) return defaultValue

  const splitPath = Array.isArray(path) ? path : path.split('.')

  let value
  for (const p of splitPath) {
    value = value ? value[p] : obj[p]
    if (!value) {
      return defaultValue
    }
  }

  return value || defaultValue
}
