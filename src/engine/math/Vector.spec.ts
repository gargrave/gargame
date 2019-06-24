import { Vector } from './Vector'

describe('Vector', () => {
  describe('copyFrom', () => {
    it("correctly copies another Vector's position", () => {
      const vec = new Vector(10, 10)
      const v2 = new Vector(20, 20)
      vec.copyFrom(v2)

      expect(vec.x).toBe(20)
      expect(vec.y).toBe(20)
      // leaves "other" untouched
      expect(v2.x).toBe(20)
      expect(v2.y).toBe(20)
    })
  })

  describe('eq', () => {
    it('returns "true" when x/y values are identical', () => {
      const v1 = new Vector(1, 1)
      const v2 = new Vector(1, 1)
      expect(v1.eq(v2)).toBe(true)
    })

    it('returns "false" when x is different', () => {
      const v1 = new Vector(1, 1)
      const v2 = new Vector(2, 1)
      expect(v1.eq(v2)).toBe(false)
    })

    it('returns "false" when y is different', () => {
      const v1 = new Vector(1, 1)
      const v2 = new Vector(1, 2)
      expect(v1.eq(v2)).toBe(false)
    })
  })
})
