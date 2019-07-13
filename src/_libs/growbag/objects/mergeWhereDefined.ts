export function mergeWhereDefined<T>(defaultValues: {}, ...overrides: {}[]): T {
  if (!overrides.length) return defaultValues as T

  const obj = { ...defaultValues }

  for (const other of overrides) {
    Object.keys(other).forEach(key => {
      if (other[key] !== undefined) {
        obj[key] = other[key]
      }
    })
  }

  return obj as T
}
