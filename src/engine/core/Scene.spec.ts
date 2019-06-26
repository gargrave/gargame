import { Entity, EntityConfig } from './Entity'
import { Game } from './Game'
import { Scene } from './Scene'

class TestEntity extends Entity {
  constructor(config: EntityConfig) {
    super(config)
  }
}

const mockGame = {} as Game // eslint-disable-line

describe('Scene', () => {
  let scene: Scene

  beforeEach(() => {
    jest.resetAllMocks()
    scene = new Scene(mockGame)
  })

  describe('Entity updates', () => {
    it('calls update/draw methods only on active Entities', () => {
      const activeEntity = new TestEntity({})
      activeEntity.earlyUpdate = jest.fn()
      activeEntity.update = jest.fn()
      activeEntity.lateUpdate = jest.fn()
      activeEntity.draw = jest.fn()
      scene.add(activeEntity)

      const inactiveEntity = new TestEntity({ startInactive: true })
      inactiveEntity.earlyUpdate = jest.fn()
      inactiveEntity.update = jest.fn()
      inactiveEntity.lateUpdate = jest.fn()
      inactiveEntity.draw = jest.fn()
      scene.add(inactiveEntity)

      scene.earlyUpdate(1)
      scene.update(1)
      scene.lateUpdate(1)
      scene.draw({} as CanvasRenderingContext2D)

      scene.earlyUpdate(1)
      scene.update(1)
      scene.lateUpdate(1)
      scene.draw({} as CanvasRenderingContext2D)

      expect(activeEntity.earlyUpdate).toHaveBeenCalledTimes(2)
      expect(activeEntity.update).toHaveBeenCalledTimes(2)
      expect(activeEntity.lateUpdate).toHaveBeenCalledTimes(2)
      expect(activeEntity.draw).toHaveBeenCalledTimes(2)
      expect(inactiveEntity.earlyUpdate).toHaveBeenCalledTimes(0)
      expect(inactiveEntity.update).toHaveBeenCalledTimes(0)
      expect(inactiveEntity.lateUpdate).toHaveBeenCalledTimes(0)
      expect(inactiveEntity.draw).toHaveBeenCalledTimes(0)
    })

    it.todo('performs collision checks only on active Entities')
  })
})
