import { Rect, SimpleRect } from './Rect'

describe('SimpleRect', () => {
  describe('eq', () => {
    it('returns "true" when x/y values are identical', () => {
      const rect = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 2, 3, 4)
      expect(rect.eq(r2)).toBe(true)
    })

    it('returns "false" when x is different', () => {
      const rect = new Rect(1, 2, 3, 4)
      const r2 = new Rect(986, 2, 3, 4)
      expect(rect.eq(r2)).toBe(false)
    })

    it('returns "false" when y is different', () => {
      const rect = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 523492, 3, 4)
      expect(rect.eq(r2)).toBe(false)
    })

    it('returns "false" when w is different', () => {
      const rect = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 2, 125, 4)
      expect(rect.eq(r2)).toBe(false)
    })

    it('returns "false" when h is different', () => {
      const rect = new Rect(1, 2, 3, 4)
      const r2 = new Rect(1, 2, 3, 92356492834912)
      expect(rect.eq(r2)).toBe(false)
    })
  })

  describe('overlaps', () => {
    it('returns false when no overlap is found', () => {
      const rect = new Rect(10, 10, 10, 10)
      const r2 = new Rect(30, 30, 10, 10)
      expect(rect.overlaps(r2)).toBe(false)
    })

    it('returns false when Rects are next to one-another, but not touching', () => {
      const rect = new Rect(10, 10, 10, 10)
      const r2 = new Rect(21, 10, 10, 10)
      expect(rect.overlaps(r2)).toBe(false)
    })

    it('returns true with a single-pixel overlap', () => {
      const rect = new Rect(0, 0, 2, 2)
      const r2 = new Rect(1, 1, 1, 1)
      expect(rect.overlaps(r2)).toBe(true)
    })

    it('returns true with a major overlap', () => {
      const rect = new Rect(10, 10, 10, 10)
      const r2 = new Rect(15, 15, 10, 10)
      expect(rect.overlaps(r2)).toBe(true)
    })
  })

  describe('toString', () => {
    it('returns a nice clean string representation of its current state', () => {
      const result = `${new SimpleRect(1, 2, 3, 4)}`
      expect(result).toBe('Rectangle [x: 1 | y: 2 | w: 3 | h: 4]')
    })
  })
})

describe('Rect', () => {
  describe('static properties', () => {
    describe('Rect.from()', () => {
      it('returns a new copy from the existing Rect', () => {
        const a = new Rect(1, 2, 3, 4)
        const b = Rect.from(a)
        expect(b).not.toBe(a)
        expect(b.eq(a)).toBe(true)
      })
    })
  })

  describe('instance properties', () => {
    describe('initialization', () => {
      it('sets default values when not provided', () => {
        const r = new Rect()
        expect(r.x).toBe(0)
        expect(r.y).toBe(0)
        expect(r.w).toBe(0)
        expect(r.h).toBe(0)
        expect(r.bottom).toBe(0)
        expect(r.right).toBe(0)
      })

      it('correctly sets values when provided', () => {
        const r = new Rect(1, 2, 3, 4)
        expect(r.x).toBe(1)
        expect(r.y).toBe(2)
        expect(r.w).toBe(3)
        expect(r.h).toBe(4)
        expect(r.bottom).toBe(6)
        expect(r.right).toBe(4)
      })
    })

    describe('setTo', () => {
      it('sets its bounds to the provided values', () => {
        const rect = new Rect(1, 2, 3, 4)
        rect.setTo(5, 6, 7, 8)

        const expected = new SimpleRect(5, 6, 7, 8)
        expect(rect.eq(expected)).toBe(true)
        expect(rect.right).toBe(12)
        expect(rect.bottom).toBe(14)
      })

      it('correctly calculates offsets in one direction', () => {
        const offset = new SimpleRect(1, 1, 0, 0)
        const rect = new Rect(0, 0, 0, 0, offset)
        rect.setTo(1, 2, 3, 4)

        const expected = new SimpleRect(2, 3, 2, 3)
        expect(rect.eq(expected)).toBe(true)
      })

      it('correctly calculates offsets in both directions', () => {
        const offset = new SimpleRect(1, 1, -1, -1)
        const rect = new Rect(0, 0, 0, 0, offset)
        rect.setTo(1, 2, 3, 4)

        const expected = new SimpleRect(2, 3, 1, 2)
        expect(rect.eq(expected)).toBe(true)
      })
    })

    describe('setPosition', () => {
      it('sets its position with offset and keeps its previous width/height', () => {
        const offset = new SimpleRect(1, 1, -1, -1)
        const rect = new Rect(1, 2, 3, 4, offset)
        rect.setPosition(5, 6)

        const expected = new SimpleRect(6, 7, 1, 2)
        expect(rect.eq(expected)).toBe(true)
        expect(rect.right).toBe(7)
        expect(rect.bottom).toBe(9)
      })
    })

    describe('translateFrom', () => {
      it('correctly sets the position from other + vel (and leaves `other` intact)', () => {
        const offset = new Rect(1, 1, 1, 1)
        const rect = new Rect(1, 2, 1, 2, offset)
        const other = new Rect(2, 3, 2, 3)
        const otherCopy = Rect.from(other) // copy now, and test after call to ensure it is unchanged
        rect.translateFrom(other, 2, 3)

        const expected = new SimpleRect(5, 7, 1, 2)
        expect(rect.eq(expected)).toBe(true)
        expect(other.eq(otherCopy)).toBe(true)
      })

      it('defaults to setting position exactly on other if no vel is provided', () => {
        const rect = new Rect(1, 2, 1, 2)
        const other = new Rect(2, 3, 2, 3)
        rect.translateFrom(other)

        const expected = new SimpleRect(2, 3, 1, 2)
        expect(rect.eq(expected)).toBe(true)
      })
    })

    describe('copyFrom', () => {
      it("copies another Rect's values (ignoring offset)", () => {
        const offset = new Rect(1, 1, -1, -1)
        const rect = new Rect(1, 2, 3, 4)
        const r2 = new Rect(5, 6, 7, 8, offset)
        rect.copyFrom(r2)

        expect(rect.x).toBe(6)
        expect(rect.y).toBe(7)
        expect(rect.w).toBe(5)
        expect(rect.h).toBe(6)
        expect(rect).not.toBe(r2)

        // leaves "other" untouched
        expect(r2.x).toBe(6)
        expect(r2.y).toBe(7)
        expect(r2.w).toBe(5)
        expect(r2.h).toBe(6)
      })
    })
  })
})
