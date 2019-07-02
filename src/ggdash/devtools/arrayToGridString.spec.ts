import { arrayToGridString } from './arrayToGridString'
import { CurriedUnaryFn } from '@gargrave/ggdash/ggdash.types'

describe('ggdash :: arrayToGridString', () => {
  const arr = size =>
    Array(size)
      .fill(null)
      .map((_, i) => i)

  describe('Calling directly', () => {
    it('correctly builds a 1d array as a grid string', () => {
      const str = arrayToGridString(arr(49), 7)
      expect(str).toBe(`00, 01, 02, 03, 04, 05, 06
07, 08, 09, 10, 11, 12, 13
14, 15, 16, 17, 18, 19, 20
21, 22, 23, 24, 25, 26, 27
28, 29, 30, 31, 32, 33, 34
35, 36, 37, 38, 39, 40, 41
42, 43, 44, 45, 46, 47, 48`)
    })

    it('pads with longer numbers', () => {
      const str = arrayToGridString(arr(143), 7)
      expect(str).toBe(`000, 001, 002, 003, 004, 005, 006
007, 008, 009, 010, 011, 012, 013
014, 015, 016, 017, 018, 019, 020
021, 022, 023, 024, 025, 026, 027
028, 029, 030, 031, 032, 033, 034
035, 036, 037, 038, 039, 040, 041
042, 043, 044, 045, 046, 047, 048
049, 050, 051, 052, 053, 054, 055
056, 057, 058, 059, 060, 061, 062
063, 064, 065, 066, 067, 068, 069
070, 071, 072, 073, 074, 075, 076
077, 078, 079, 080, 081, 082, 083
084, 085, 086, 087, 088, 089, 090
091, 092, 093, 094, 095, 096, 097
098, 099, 100, 101, 102, 103, 104
105, 106, 107, 108, 109, 110, 111
112, 113, 114, 115, 116, 117, 118
119, 120, 121, 122, 123, 124, 125
126, 127, 128, 129, 130, 131, 132
133, 134, 135, 136, 137, 138, 139`)
    })
  })

  describe('Curried', () => {
    it('returns a curried version when last arg is missing', () => {
      const curried = arrayToGridString(arr(20)) as CurriedUnaryFn<
        number,
        string
      >
      expect(typeof curried).toBe('function')
      expect(curried).toHaveLength(1)
      const str = curried(4)
      expect(str).toBe(`00, 01, 02, 03
04, 05, 06, 07
08, 09, 10, 11
12, 13, 14, 15
16, 17, 18, 19`)
    })
  })
})
