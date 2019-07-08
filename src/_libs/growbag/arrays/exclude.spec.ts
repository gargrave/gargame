import { exclude } from './exclude'

describe('exclude', () => {
  it('returns a new array with the specified values excluded', () => {
    const a = [1, 2, 3, 4, 5]
    const b = [2, 4]
    const result = exclude(a, b)
    expect(result).not.toBe(a)
    expect(result).toEqual([1, 3, 5])
  })

  it('returns a new copy of the same array if "omit" is empty', () => {
    const a = [1, 2, 3]
    const b = []
    const result = exclude(a, b)
    expect(result).not.toBe(a)
    expect(result).toEqual(a)
  })

  it('excludes string-based values correctly', () => {
    const a = ['a', 'b', 'c']
    const b = ['b']
    const result = exclude(a, b)
    expect(result).toEqual(['a', 'c'])
  })
})
