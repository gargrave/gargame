import { Animation, AnimationProps } from './Animation'
import { Entity } from '../core/Entity'
import { Texture } from '../resources/Texture'

class TestEntity extends Entity {
  constructor(props = {}) {
    super(props)
  }
}

let anim: Animation

describe('Animation', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('Frame callbacks', () => {
    let callbacks

    beforeEach(() => {
      callbacks = {
        0: jest.fn(),
        1: jest.fn(),
        3: jest.fn(),
        9001: jest.fn(), // just to test that invalid frames are safely ignored
        start: jest.fn(),
      }

      const props: AnimationProps = {
        callbacks,
        firstFrame: 0,
        frameDuration: 1,
        height: 0,
        lastFrame: 4,
        texture: new Texture(''),
        width: 0,
      }

      anim = new Animation(new TestEntity(), props)
    })

    it('calls all callbacks on the correct frames on every pass', () => {
      anim.update(1)
      anim.update(1)
      anim.update(1)

      expect(callbacks[1]).toHaveBeenCalledTimes(1)
      expect(callbacks[1]).toHaveBeenCalledWith(1)
      expect(callbacks[3]).toHaveBeenCalledTimes(1)
      expect(callbacks[3]).toHaveBeenCalledWith(3)

      anim.update(1)
      anim.update(1)
      anim.update(1)
      anim.update(1)
      anim.update(1)

      expect(callbacks[1]).toHaveBeenCalledTimes(2)
      expect(callbacks[3]).toHaveBeenCalledTimes(2)
    })

    it('calls a special "start" callback when animation starts', () => {
      anim.start()
      expect(callbacks['start']).toHaveBeenCalledTimes(1)
      expect(callbacks['start']).toHaveBeenCalledWith('start')
    })
  })
})
