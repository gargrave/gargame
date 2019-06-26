import { Entity, EntityConfig } from './Entity'

class TestEntity extends Entity {
  constructor(config: EntityConfig) {
    super(config)
  }
}

describe('Entity', () => {
  let e: TestEntity

  beforeEach(() => {
    e = new TestEntity({})
  })

  describe('initialization', () => {
    it('generates a unique ID using the class name', () => {
      const e2 = new TestEntity({})
      expect(e.id).toBe('TestEntity__0')
      expect(e2.id).toBe('TestEntity__1')
    })
  })

  describe('active state', () => {
    it('defaults to true', () => {
      expect(e.isActive).toBe(true)
    })

    it('initializes inactive when specified in the config', () => {
      e = new TestEntity({ startInactive: true })
      expect(e.isActive).toBe(false)
    })

    it('activates when calling activate()', () => {
      e = new TestEntity({ startInactive: true })
      expect(e.isActive).toBe(false)
      e.activate()
      expect(e.isActive).toBe(true)
    })

    it('deactivates when calling deactivate()', () => {
      e.deactivate()
      expect(e.isActive).toBe(false)
    })
  })
})
