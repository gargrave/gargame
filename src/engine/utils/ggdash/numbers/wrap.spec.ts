import { wrap } from './wrap'
import { CurriedNumberFn } from './numbers.types'

describe('ggdash :: wrap', () => {
  it('returns "max" if value is less than "min"', () => {
    expect(wrap(5, 10, 4)).toBe(10)
  })

  it('returns "min" if value is less than "max"', () => {
    expect(wrap(5, 10, 11)).toBe(5)
  })

  it('returns the original value if it is within the given range', () => {
    expect(wrap(5, 10, 8)).toBe(8)
  })

  it('returns a curried function if "val" is missing', () => {
    const curried = wrap(5, 10) as CurriedNumberFn
    expect(typeof curried).toBe('function')
    expect(curried(4)).toBe(10)
    expect(curried(11)).toBe(5)
  })
})
