import { Entity, EntityProps } from '../Entity'
import { Game } from '../Game'
import { DESTROY_QUEUE_INTERVAL, Scene } from './Scene'
import { GuiObject } from '../GuiObject'

class TestEntity extends Entity {
  constructor(props: EntityProps) {
    super(props)
  }
}

class TestGuiObject extends GuiObject<{}> {
  constructor() {
    super()
  }
}

const mockGame = ({
  guiLayers: ['testLayer'],
} as unknown) as Game // eslint-disable-line

describe('Scene', () => {
  let scene: Scene

  beforeEach(() => {
    jest.resetAllMocks()
    scene = new Scene(mockGame)
  })

  describe('Entity handling', () => {
    describe('Entity updates', () => {
      it('calls update/draw methods only on active Entities', () => {
        const activeEntity = new TestEntity({})
        activeEntity.earlyUpdate = jest.fn()
        activeEntity.update = jest.fn()
        activeEntity.lateUpdate = jest.fn()
        activeEntity.draw = jest.fn()
        scene.addEntity(activeEntity)

        const inactiveEntity = new TestEntity({ startInactive: true })
        inactiveEntity.earlyUpdate = jest.fn()
        inactiveEntity.update = jest.fn()
        inactiveEntity.lateUpdate = jest.fn()
        inactiveEntity.draw = jest.fn()
        scene.addEntity(inactiveEntity)

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
    })

    describe('Entity destroying', () => {
      it('correctly cleans up all destroyed Entity references', () => {
        const e1 = new TestEntity({ collisionGroups: ['cool'] })
        const e2 = new TestEntity({ collisionGroups: ['test'] })
        scene.addEntity(e1)
        scene.addEntity(e2)

        expect(Object.entries(scene.entityMap)).toHaveLength(2)
        expect(scene.updateableEntities).toHaveLength(2)
        expect(scene.destroyQueue).toHaveLength(0)

        scene.addToDestroyQueue(e2)
        expect(scene.destroyQueue).toHaveLength(1)
        scene.lateUpdate(DESTROY_QUEUE_INTERVAL + 1) // trigger a "cleanup" call

        expect(Object.entries(scene.entityMap)).toHaveLength(1)
        expect(scene.updateableEntities).toHaveLength(1)
        expect(scene.collidableEntities['cool']).toHaveLength(1)
        expect(scene.collidableEntities['test']).toHaveLength(0)
        expect(scene.destroyQueue).toHaveLength(0)
      })
    })
  })

  describe('GUI handling', () => {
    describe('getGuiLayer', () => {
      it('returns the associated Gui Layer (Array) if it exists', () => {
        expect(scene.getGuiLayer('testLayer')).toEqual([])
      })

      it('returns undefined for a layer key that does not exist', () => {
        expect(scene.getGuiLayer('nope')).toBeUndefined()
      })
    })

    describe('addGuiObject', () => {
      it('ignores the GuiObject and returns false if it is already in any GUI layer', () => {
        const guiObj = new TestGuiObject()
        const layer = scene.getGuiLayer('testLayer')

        expect(layer).toHaveLength(0)
        const result1 = scene.addGuiObject(guiObj, 'testLayer')
        expect(result1).toBe(true)
        expect(layer).toHaveLength(1)
        const result2 = scene.addGuiObject(guiObj, 'testLayer')
        expect(result2).toBe(false)
        expect(layer).toHaveLength(1)
      })

      it('returns false if the specified layer does not exist', () => {
        const result = scene.addGuiObject(new TestGuiObject(), 'noWayMan')
        expect(result).toBe(false)
      })
    })
  })
})
