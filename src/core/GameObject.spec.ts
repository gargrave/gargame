import { Rect } from '../math/Rect'
import { GameObject, GameObjectConfig } from './GameObject'

class TestGO extends GameObject {
  constructor(config: GameObjectConfig) {
    super(config)
  }
}

describe('GameObject', () => {
  let go: GameObject

  beforeEach(() => {
    go = new TestGO({})
  })

  describe('Initialization', () => {
    it('correctly sets default values', () => {
      expect(go.bounds.eq(new Rect(0, 0, 0, 0))).toBe(true)
      expect(go.collRect.eq(new Rect(0, 0, 0, 0))).toBe(true)
      expect(go.height).toBe(0)
      expect(go.isVisible).toBe(true)
      expect(go.pos.x).toBe(0)
      expect(go.pos.y).toBe(0)
      expect(go.prevPos.x).toBe(0)
      expect(go.prevPos.y).toBe(0)
      expect(go.speed).toBe(0)
      expect(go.width).toBe(0)
    })

    it('correctly overrides default values based on config', () => {
      const config: GameObjectConfig = {
        height: 200,
        speed: 33,
        startInvisible: true,
        width: 100,
        x: 4,
        y: 2,
      }
      go = new TestGO(config)

      expect(go.bounds.eq(new Rect(4, 2, 100, 200))).toBe(true)
      expect(go.collRect.eq(new Rect(4, 2, 100, 200))).toBe(true)
      expect(go.height).toBe(200)
      expect(go.isVisible).toBe(false)
      expect(go.pos.x).toBe(4)
      expect(go.pos.y).toBe(2)
      expect(go.prevPos.x).toBe(4)
      expect(go.prevPos.y).toBe(2)
      expect(go.speed).toBe(33)
      expect(go.width).toBe(100)
    })
  })
})
