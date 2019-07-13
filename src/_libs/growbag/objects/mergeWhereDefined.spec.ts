import { mergeWhereDefined } from './mergeWhereDefined'

describe('mergeWhereDefined', () => {
  it('returns the original object if no overrides are provided', () => {
    const orig = { name: 'Billy' }
    const result = mergeWhereDefined(orig)
    expect(result).toBe(orig)
  })

  it('returns a new object with overrides correctly applied', () => {
    const orig = { age: 42, name: 'Billy' }
    const other = { name: 'Larry', occupation: 'Plumber' }
    const result = mergeWhereDefined(orig, other)

    expect(result).not.toBe(orig)
    expect(result).toEqual({
      age: 42,
      name: 'Larry',
      occupation: 'Plumber',
    })
  })

  it('returns a new object with multiple overrides correctly applied', () => {
    const orig = { age: 42, name: 'Billy' }
    const other = { name: 'Larry', occupation: 'Plumber' }
    const otherOther = { favoriteFood: 'Jelly Beans', name: 'Susie Q' }
    const result = mergeWhereDefined(orig, other, otherOther)

    expect(result).not.toBe(orig)
    expect(result).toEqual({
      age: 42,
      favoriteFood: 'Jelly Beans',
      name: 'Susie Q',
      occupation: 'Plumber',
    })
  })

  it('skips overrides that are undefined, but not other falsey values', () => {
    const orig = { age: 42, name: 'Billy' }
    const other = {
      emptyString: '',
      homeTown: undefined,
      isScaredRightNow: false,
      name: 'Larry',
      occupation: 'Plumber',
      timesScared: 0,
    }
    const result = mergeWhereDefined<{}>(orig, other)

    expect(result).not.toBe(orig)
    expect('homeTown' in result).toBe(false)
    expect(result).toEqual({
      age: 42,
      emptyString: '',
      isScaredRightNow: false,
      name: 'Larry',
      occupation: 'Plumber',
      timesScared: 0,
    })
  })
})
