export function get<T>(
  obj: {},
  path: string | string[],
  defaultValue?: T,
): T | undefined {
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
