import { getAtXy } from './getAtXY'
import { range } from './range'
import { PartiallyAppliedBinaryFn } from '../growbag.types'

describe('getAtXY', () => {
  describe('Called directly', () => {
    describe('100 elements in grid', () => {
      const arr = range(100)

      it('returns the correct value for a 9-width grid', () => {
        expect(getAtXy(arr, 9, 2, 2)).toBe(20)
      })

      it('returns the correct value for a 10-width grid', () => {
        expect(getAtXy(arr, 10, 2, 2)).toBe(22)
      })
    })

    describe('47 elements in grid', () => {
      // these tests are the same as above; just a demonstration that array size
      // should not affect the outcome
      const arr = range(47)

      it('returns the correct value for a 9-width grid', () => {
        expect(getAtXy(arr, 9, 2, 2)).toBe(20)
      })

      it('returns the correct value for a 10-width grid', () => {
        expect(getAtXy(arr, 10, 2, 2)).toBe(22)
      })
    })

    describe('Error handling', () => {
      const arr = range(10)

      it('throws an error if the requested value is out of bounds', () => {
        expect(() => getAtXy(arr, 10, 10, 2)).toThrowError()
      })
    })
  })

  describe('Partially applied', () => {
    describe('100 elements in grid', () => {
      const arr = range(100)

      it('returns a patially-applied version of the function which behaves the same', () => {
        const curried = getAtXy(arr, 10) as PartiallyAppliedBinaryFn<
          number,
          number
        >
        expect(typeof curried).toBe('function')
        expect(curried).toHaveLength(2)
        expect(curried(2, 2)).toBe(22)
      })
    })
  })
})
