import { range } from './range'

describe('range', () => {
  it('returns an array with all numbers up to `size` (exclusive)', () => {
    const arr = range(14)
    expect(arr.length).toBe(14)
    for (let i = 0; i < 14; i += 1) {
      expect(arr[i]).toBe(i)
    }
  })

  it('correctly uses a custom starting point', () => {
    const offset = 3
    const arr = range(14, offset)
    expect(arr).toHaveLength(14)
    for (let i = 0; i < 14; i += 1) {
      expect(arr[i]).toBe(i + offset)
    }
  })
})
