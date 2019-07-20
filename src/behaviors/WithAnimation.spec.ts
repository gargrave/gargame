import { Entity } from '../core'
import { Animation, AnimationProps } from '../rendering'

import { WithAnimation } from './WithAnimation'

class TestEntity extends Entity {
  constructor(props = {}) {
    super(props)
  }
}

describe('WithAnimation', () => {
  let wa: WithAnimation
  let entity: Entity

  beforeEach(() => {
    entity = new TestEntity()
    wa = new WithAnimation(
      {
        idle: new Animation(entity, {} as AnimationProps),
        run: new Animation(entity, {} as AnimationProps),
      },
      'run',
    )
  })

  describe('initialization', () => {
    it('uses a valid "default animation key" as the first animation', () => {
      expect(wa.defaultAnimationKey).toBe('run')
      expect(wa.currentAnimationKey).toBe('run')
    })

    it('uses the first animation key for default when the provided default is invalid', () => {
      wa = new WithAnimation(
        {
          idle: new Animation(entity, {} as AnimationProps),
          run: new Animation(entity, {} as AnimationProps),
        },
        'invalidKey',
      )
      expect(wa.defaultAnimationKey).toBe('idle')
      expect(wa.currentAnimationKey).toBe('idle')
    })
  })
})
