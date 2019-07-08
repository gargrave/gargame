import { clamp } from './clamp'

describe('clamp', () => {
  it('returns "min" if the value is less than "min', () => {
    expect(clamp(5, 10, 4)).toBe(5)
  })

  it('returns "max" if the value is greater than "max', () => {
    expect(clamp(5, 10, 11)).toBe(10)
  })

  it('returns the original value if it is within the given range', () => {
    expect(clamp(5, 10, 8)).toBe(8)
  })
})
