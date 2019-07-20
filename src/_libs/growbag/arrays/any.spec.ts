import { any } from './any'

describe('any', () => {
  it('returns true when a single value matches the test', () => {
    const arr = [
      { passes: false },
      { passes: false },
      { passes: true },
      { passes: false },
      { passes: false },
    ]
    const predicate = jest.fn(val => val.passes)
    const result = any(arr, predicate)

    expect(result).toBe(true)
    expect(predicate).toHaveBeenCalledTimes(3)
    expect(predicate).toHaveBeenLastCalledWith({ passes: true })
  })

  it('returns false if none of the values match the test', () => {
    const arr = [
      { passes: false },
      { passes: false },
      { passes: false },
      { passes: false },
    ]
    const predicate = jest.fn(val => val.passes)
    const result = any(arr, predicate)

    expect(result).toBe(false)
    expect(predicate).toHaveBeenCalledTimes(4)
  })
})
