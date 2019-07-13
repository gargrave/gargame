import { unique } from './unique'

describe('unique', () => {
  it('returns an empty Array if input is empty', () => {
    const result = unique([])
    expect(result).toEqual([])
  })

  it('returns an identical new Array if already unique', () => {
    const input = ['c', 'a', 'b', 'd']
    const result = unique(input)
    expect(result).toEqual(input)
  })

  it('returns a new Array with duplicate values filtered out', () => {
    const input = ['c', 'a', 'b', 'd', 'a', 'b', 'a', 'c', 'd', 'a']
    const result = unique(input)
    expect(result).toEqual(['c', 'a', 'b', 'd'])
  })

  it('also correctly filters arrays of numbers', () => {
    const input = [3, 5, 1, 4, 2, 1, 1, 2, 3, 4, 5]
    const result = unique(input)
    expect(result).toEqual([3, 5, 1, 4, 2])
  })

  it('also correctly filters a mix of numbers and strings', () => {
    const input = [3, 'a', 5, 1, 'a', 4, 2, 1, 1, 'b', 2, 3, 4, 5]
    const result = unique(input)
    expect(result).toEqual([3, 'a', 5, 1, 4, 2, 'b'])
  })
})
