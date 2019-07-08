import { get } from '@gargrave/growbag'

import { Entity } from '../Entity'
import { Globals as gl } from '../../Globals'

import { Scene } from './Scene'

const COLLISION_KEY_DELIMITER = '&&'

const makeCollisionKey = (sender: Entity, target: Entity) =>
  `${sender.id}${COLLISION_KEY_DELIMITER}${target.id}`

const isCollidable = (e: Entity) =>
  get(e, 'isActive') && get(e, 'collider.active')

export class SceneCollisions {
  private readonly entitiesInScene: { [key: string]: Entity } = {}
  private readonly collidableEntitiesInScene: { [key: string]: string[] } = {}

  constructor(private scene: Scene) {
    this.entitiesInScene = scene.entityMap
    this.collidableEntitiesInScene = scene.collidableEntities
  }

  public updateAutoCollisions() {
    const collChecks = this.collidableEntitiesInScene
    const prevColl = this.scene.currentCollisions
    const newColl = {}

    let listener: Entity
    let target: Entity

    Object.entries(collChecks).forEach(([group, entityIds]) => {
      const collTargetGroups = get(
        gl.game,
        `collGroups.${group}.collidesWith`,
        [],
      ) as any[] // eslint-disable-line

      collTargetGroups.forEach(collGroup => {
        const collTargetIds = collChecks[collGroup]
        if (get(collTargetIds, 'length')) {
          entityIds.forEach(eid => {
            listener = this.entitiesInScene[eid]

            if (isCollidable(listener)) {
              collTargetIds.forEach(tid => {
                target = this.entitiesInScene[tid]

                if (isCollidable(target)) {
                  if (listener.collider.overlaps(target.collider)) {
                    const collKey = makeCollisionKey(listener, target)

                    if (prevColl[collKey]) {
                      // if the detected collision also happened in the previous frame,
                      // we know this is a "continued" collision;
                      // call the "on collision" handler, and
                      // remove if from prevColl so it does not call the "collision exit" handler
                      listener.onCollision(collGroup, target)
                      delete prevColl[collKey]
                    } else {
                      // otherwise, this is a new collision, so we will call the "collision enter" handler
                      listener.onCollisionEnter(collGroup, target)
                    }

                    // add all detected collisions into the "new collisions" set,
                    // as these will be passed back to the scene to hold onto for the next frame
                    newColl[collKey] = collGroup
                  }
                }
              })
            }
          })
        }
      })
    })

    // any keys remaining here are no longer colliding, so we need to call the "collision exit" handler
    Object.entries(prevColl).forEach(([collKey, collGroup]) => {
      const [entityId, targetId] = collKey.split(COLLISION_KEY_DELIMITER)
      const listener = this.entitiesInScene[entityId]
      const target = this.entitiesInScene[targetId]
      listener.onCollisionExit(collGroup, target)
    })

    return newColl
  }

  /**
   * Performs a manual scan for a collisions between the spcified Entity and `targetGroup`
   * Returns either the first collisions found, or null if none are found.
   * @param entity
   * @param targetGroup
   */
  public getFirstCollision(entity: Entity, targetGroup: string) {
    if (!isCollidable(entity)) {
      return null
    }

    const collTargetGroup = this.scene.collidableEntities[targetGroup]
    const entities = this.scene.entityMap

    let target: Entity
    if (collTargetGroup && collTargetGroup.length) {
      for (const tid of collTargetGroup) {
        target = entities[tid]

        if (isCollidable(target)) {
          if (entity.collider.overlaps(target.collider)) {
            return target
          }
        }
      }
    }

    return null
  }
}
