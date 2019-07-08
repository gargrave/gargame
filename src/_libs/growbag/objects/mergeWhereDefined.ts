export const mergeWhereDefined = (defaultValues: {}, ...overrides: {}[]) => {
  if (!overrides.length) return defaultValues

  const obj = { ...defaultValues }

  for (const other of overrides) {
    Object.keys(other).forEach(key => {
      if (other[key] !== undefined) {
        obj[key] = other[key]
      }
    })
  }

  return obj
}
