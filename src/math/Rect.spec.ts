import { Rect } from './Rect'

describe('Rect', () => {
  describe('initialization', () => {
    const r = new Rect(1, 2, 3, 4)
    expect(r.x).toBe(1)
    expect(r.y).toBe(2)
    expect(r.w).toBe(3)
    expect(r.h).toBe(4)
    expect(r.bottom).toBe(6)
    expect(r.right).toBe(4)
  })

  describe('setTo', () => {
    it('sets its bounds to the provided values', () => {
      const r = new Rect(1, 2, 3, 4)
      r.setTo(5, 6, 7, 8)

      expect(r.x).toBe(5)
      expect(r.y).toBe(6)
      expect(r.w).toBe(7)
      expect(r.h).toBe(8)
      expect(r.bottom).toBe(14)
      expect(r.right).toBe(12)
    })
  })

  describe('setPosition', () => {
    it('sets its position and keeps its previous width/height', () => {
      const r = new Rect(1, 2, 3, 4)
      r.setPosition(5, 6)

      expect(r.x).toBe(5)
      expect(r.y).toBe(6)
      expect(r.w).toBe(3)
      expect(r.h).toBe(4)
      expect(r.bottom).toBe(10)
      expect(r.right).toBe(8)
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

  describe('overlaps', () => {
    it('returns false when no overlap is found', () => {
      const r1 = new Rect(10, 10, 10, 10)
      const r2 = new Rect(30, 30, 10, 10)
      expect(r1.overlaps(r2)).toBe(false)
    })

    it('returns false when Rects are next to one-another, but not touching', () => {
      const r1 = new Rect(10, 10, 10, 10)
      const r2 = new Rect(21, 10, 10, 10)
      expect(r1.overlaps(r2)).toBe(false)
    })

    it('returns true with a single-pixel overlap', () => {
      const r1 = new Rect(0, 0, 2, 2)
      const r2 = new Rect(1, 1, 1, 1)
      expect(r1.overlaps(r2)).toBe(true)
    })

    it('returns true with a major overlap', () => {
      const r1 = new Rect(10, 10, 10, 10)
      const r2 = new Rect(15, 15, 10, 10)
      expect(r1.overlaps(r2)).toBe(true)
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
