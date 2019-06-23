import Rect from './Rect'

describe('Rect', () => {
  describe('initialization', () => {
    const r = new Rect(1, 2, 3, 4)
    expect(r.x).toBe(1)
    expect(r.y).toBe(2)
    expect(r.w).toBe(3)
    expect(r.h).toBe(4)
  })

  describe('setTo', () => {
    it('sets its bounds to the provided values', () => {
      const r = new Rect(1, 2, 3, 4)
      r.setTo(5, 6, 7, 8)

      expect(r.x).toBe(5)
      expect(r.y).toBe(6)
      expect(r.w).toBe(7)
      expect(r.h).toBe(8)
    })
  })

  describe('copyFrom', () => {
    it("copies another Rect's values", () => {
      const r1 = new Rect(1, 2, 3, 4)
      const r2 = new Rect(5, 6, 7, 8)
      r1.copyFrom(r2)

      expect(r1.x).toBe(5)
      expect(r1.y).toBe(6)
      expect(r1.w).toBe(7)
      expect(r1.h).toBe(8)
      // leaves "other" untouched
      expect(r2.x).toBe(5)
      expect(r2.y).toBe(6)
      expect(r2.w).toBe(7)
      expect(r2.h).toBe(8)
    })
  })

  describe('eq', () => {
    it('returns "true" when x/y values are identical', () => {
      const r1 = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 2, 3, 4)
      expect(r1.eq(r2)).toBe(true)
    })

    it('returns "false" when x is different', () => {
      const r1 = new Rect(1, 2, 3, 4)
      const r2 = new Rect(986, 2, 3, 4)
      expect(r1.eq(r2)).toBe(false)
    })

    it('returns "false" when y is different', () => {
      const r1 = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 523492, 3, 4)
      expect(r1.eq(r2)).toBe(false)
    })

    it('returns "false" when w is different', () => {
      const r1 = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 2, 125, 4)
      expect(r1.eq(r2)).toBe(false)
    })

    it('returns "false" when h is different', () => {
      const r1 = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 2, 3, 92356492834912)
      expect(r1.eq(r2)).toBe(false)
    })
  })

  describe('toString', () => {
    it('returns a nice clean string representation of its current state', () => {
      const result = `${new Rect(1, 2, 3, 4)}`
      expect(result).toBe('Rect [x: 1 | y: 2 | w: 3 | h: 4]')
    })
  })
})
