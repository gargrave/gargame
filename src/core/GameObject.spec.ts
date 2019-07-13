import { Rect } from '../math/Rect'
import { GameObject, GameObjectProps } from './GameObject'

class TestGO<T> extends GameObject<T> {
  constructor(props: GameObjectProps) {
    super(props)
  }
}

describe('GameObject', () => {
  describe('instance properties', () => {
    let go: GameObject<{}>

    beforeEach(() => {
      go = new TestGO({})
    })

    describe('Initialization', () => {
      it('correctly sets default values', () => {
        expect(go.bounds.eq(new Rect(0, 0, 0, 0))).toBe(true)
        expect(go.collider.eq(new Rect(0, 0, 0, 0))).toBe(true)
        expect(go.height).toBe(0)
        expect(go.isVisible).toBe(true)
        expect(go.pos.x).toBe(0)
        expect(go.pos.y).toBe(0)
        expect(go.prevPos.x).toBe(0)
        expect(go.prevPos.y).toBe(0)
        expect(go.speed).toBe(0)
        expect(go.width).toBe(0)
      })

      it('correctly overrides default values based on props', () => {
        const props: GameObjectProps = {
          height: 200,
          speed: 33,
          startInvisible: true,
          width: 100,
          x: 4,
          y: 2,
        }
        go = new TestGO(props)

        expect(go.bounds.eq(new Rect(4, 2, 100, 200))).toBe(true)
        expect(go.collider.eq(new Rect(4, 2, 100, 200))).toBe(true)
        expect(go.height).toBe(200)
        expect(go.isVisible).toBe(false)
        expect(go.pos.x).toBe(4)
        expect(go.pos.y).toBe(2)
        expect(go.prevPos.x).toBe(4)
        expect(go.prevPos.y).toBe(2)
        expect(go.speed).toBe(33)
        expect(go.width).toBe(100)
      })

      it('correctly overrides the collision offset rect', () => {
        const props: GameObjectProps = {
          collisionOffset: new Rect(1, 2, 3, 4),
          height: 200,
          speed: 33,
          width: 100,
          x: 25,
          y: 74,
        }
        go = new TestGO(props)
        expect(go.collider.eq(new Rect(26, 76, 102, 202))).toBe(true)
      })
    })

    describe('move', () => {
      it('updates the position and any associated properties', () => {
        const props: GameObjectProps = {
          collisionOffset: new Rect(1, 1, -1, -1),
          height: 10,
          width: 20,
          x: 30,
          y: 40,
        }
        go = new TestGO(props)

        expect(go.pos.x).toBe(30)
        expect(go.pos.y).toBe(40)
        expect(go.bounds.eq(new Rect(30, 40, 20, 10))).toBe(true)
        expect(go.collider.eq(new Rect(31, 41, 18, 8))).toBe(true)

        go.move(2, 2)

        expect(go.pos.x).toBe(32)
        expect(go.pos.y).toBe(42)
        expect(go.bounds.eq(new Rect(32, 42, 20, 10))).toBe(true)
        expect(go.collider.eq(new Rect(33, 43, 18, 8))).toBe(true)
      })
    })
  })
})
