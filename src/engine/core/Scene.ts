import { Drawable } from '../interfaces/Drawable'
import { DrawableGUI } from '../interfaces/DrawableGUI'
import { Updateable } from '../interfaces/Updateable'
import { Log } from '../utils/Log'
import { exclude } from '../utils/collectionHelpers'
import { Globals as gl } from '../Globals'

import { Game } from './Game'
import { Entity } from './Entity'
import { GuiObject } from './GuiObject'

export const DESTROY_QUEUE_INTERVAL = 1000

export class Scene implements Drawable, DrawableGUI, Updateable {
  private lastDestroyProcess = 0

  protected _entityMap: { [key: string]: Entity } = {}
  protected _updateableEntities: string[] = []
  protected _collidableEntities: { [key: string]: string[] } = {}
  protected _destroyQueue: string[] = []

  protected guiObjects: GuiObject[] = []

  protected game: Game

  get entityMap() { return this._entityMap } // prettier-ignore
  get updateableEntities() { return this._updateableEntities } // prettier-ignore
  get collidableEntities() { return this._collidableEntities } // prettier-ignore
  get destroyQueue() { return this._destroyQueue } // prettier-ignore

  constructor(game: Game) {
    this.game = game
  }

  private _processDestroyQueue() {
    this.lastDestroyProcess = 0
    const dq = this._destroyQueue
    if (dq.length) {
      Log.info(`Destroying ${dq.length} Entities`)

      for (const eid of dq) {
        const entity = this._entityMap[eid]
        // clear this Entity from any collision groups to which it is currently registered
        entity.collisionGroups.forEach(cg => {
          this._collidableEntities[cg] = exclude(this._collidableEntities[cg], [
            eid,
          ])
        })

        delete this._entityMap[eid]
      }

      this._updateableEntities = exclude(this._updateableEntities, dq)
      this._destroyQueue = []
    }
  }

  public enter() {
    gl.scene = this
  }

  public exit() {
    this._entityMap = {}
    this._updateableEntities = []
    this.guiObjects = []
  }

  public add(entity: Entity) {
    this._entityMap[entity.id] = entity
    this._updateableEntities.push(entity.id)

    const coll = entity.collisionGroups || []
    coll.forEach(c => {
      if (!(c in this._collidableEntities)) {
        this._collidableEntities[c] = []
      }

      this._collidableEntities[c].push(entity.id)
    })
  }

  public addToDestroyQueue(entity: Entity) {
    this._destroyQueue.push(entity.id)
  }

  public addGuiObject(g: GuiObject) {
    this.guiObjects.push(g)
  }

  public earlyUpdate(dt: number) {
    let e: Entity
    for (const eid of this._updateableEntities) {
      e = this._entityMap[eid]
      if (e) {
        e.isActive && e.earlyUpdate && e.earlyUpdate(dt)
      }
    }

    for (const g of this.guiObjects) {
      g.earlyUpdate && g.earlyUpdate(dt)
    }
  }

  public update(dt: number) {
    let e: Entity
    for (const eid of this._updateableEntities) {
      e = this._entityMap[eid]
      if (e) {
        e.isActive && e.update(dt)
      }
    }

    for (const g of this.guiObjects) g.update(dt)

    // TODO: call onCollisionEnter if this is a new collision
    // TODO: call onCollision if this is a recurring collision
    // TODO: call onCollisionExit if a previous collision has ended
    let collisionTarget: Entity
    Object.entries(this._collidableEntities).forEach(([group, entityIds]) => {
      //TODO: make a Lodash like get-function for this
      const collTargetGroups =
        (this.game.collGroups[group] || {}).collidesWith || []

      collTargetGroups.forEach(collGroup => {
        const targets = this._collidableEntities[collGroup]
        if (targets.length) {
          entityIds.forEach(eid => {
            e = this._entityMap[eid]
            if (e && e.isActive) {
              targets.forEach(tid => {
                collisionTarget = this._entityMap[tid]
                if (collisionTarget && collisionTarget.isActive) {
                  if (e.collRect.overlaps(collisionTarget.collRect)) {
                    e.onCollisionEnter(collGroup, collisionTarget)
                  }
                }
              })
            }
          })
        }
      })
    })
  }

  public getFirstCollision(entity: Entity, targetGroup: string) {
    const targets = this._collidableEntities[targetGroup]
    let collisionTarget: Entity

    if (targets.length) {
      for (const tid of targets) {
        collisionTarget = this._entityMap[tid]
        if (collisionTarget && collisionTarget.isActive) {
          if (entity.collRect.overlaps(collisionTarget.collRect)) {
            return collisionTarget
          }
        }
      }
    }

    return null
  }

  public lateUpdate(dt: number) {
    let e: Entity
    for (const eid of this._updateableEntities) {
      e = this._entityMap[eid]
      if (e) {
        e.isActive && e.lateUpdate && e.lateUpdate(dt)
      }
    }

    for (const g of this.guiObjects) g.lateUpdate && g.lateUpdate(dt)

    this.lastDestroyProcess += dt
    if (this.lastDestroyProcess >= DESTROY_QUEUE_INTERVAL) {
      this._processDestroyQueue()
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    let e: Entity
    for (const eid of this._updateableEntities) {
      e = this._entityMap[eid]
      if (e) {
        e.isActive && e.draw(ctx)
      }
    }
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    for (const g of this.guiObjects) {
      g.drawGUI(ctx)
    }
  }
}
