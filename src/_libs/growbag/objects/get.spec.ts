import { get } from './get'

describe('get', () => {
  describe('Invalid calls', () => {
    it('returns undefined if the base object does not exist', () => {
      const onos = undefined
      const result = get(onos, 'this.is.the.path')
      expect(result).toBeUndefined()
    })

    it('returns undefined when a single "path" does not exist', () => {
      const result = get({}, 'whatever')
      expect(result).toBeUndefined()
    })

    it('returns undefined when a nested "path" does not exist', () => {
      const result = get({}, 'whatever.something')
      expect(result).toBeUndefined()
    })

    it('returns undefined when a sub-property does not exist', () => {
      const result = get(
        { user: { data: { name: 'Larry' } } },
        'user.asdf.name',
      )
      expect(result).toBeUndefined()
    })

    it('returns undefined if a sub-property is missing', () => {
      const result = get({ user: { data: { name: 'Larry' } } }, 'user..name')
      expect(result).toBeUndefined()
    })
  })

  describe('Valid calls', () => {
    it('returns a nested value one level deep', () => {
      const obj = { name: 'Larry' }
      const result = get(obj, 'name')
      expect(result).toBe(obj.name)
    })

    it('returns a nested value multiple layers deep', () => {
      const obj = { user: { data: { name: 'Larry' } } }
      const result = get(obj, 'user.data.name')
      expect(result).toBe(obj.user.data.name)
    })

    it('correctly parses nested objects from an array of strings', () => {
      const obj = { user: { data: { name: 'Larry' } } }
      const result = get(obj, ['user', 'data', 'name'])
      expect(result).toBe(obj.user.data.name)
    })
  })

  describe('Default value handling', () => {
    it('returns the default value if the base object does not exist', () => {
      const defaultValue = { name: 'KEWL' }
      const onos = undefined
      const result = get(onos, 'this.is.the.path', defaultValue)
      expect(result).toEqual(defaultValue)
    })

    it('returns the default value when "path" does not exist', () => {
      const result = get({}, 'does.not.exist', 'defaultString')
      expect(result).toBe('defaultString')
    })

    it('returns the default value when a sub-property does not exist', () => {
      const result = get(
        { user: { data: { name: 'Larry' } } },
        'user.asdf.name',
        'defaultString',
      )
      expect(result).toBe('defaultString')
    })
  })
})
