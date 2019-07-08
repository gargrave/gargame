import { exclude } from '@gargrave/growbag'

import { Drawable } from '../../interfaces/Drawable'
import { DrawableGUI } from '../../interfaces/DrawableGUI'
import { Updateable } from '../../interfaces/Updateable'
import { Log } from '../../utils/Log'
import { Globals as gl } from '../../Globals'
import { Game } from '../Game'
import { Entity } from '../Entity'
import { GuiObject } from '../GuiObject'
import { SceneCollisions } from './SceneCollisions'

export const DESTROY_QUEUE_INTERVAL = 1000

export class Scene implements Drawable, DrawableGUI, Updateable {
  private lastDestroyProcess = 0

  protected _entityMap: { [key: string]: Entity } = {}
  protected _updateableEntities: string[] = []
  protected _collidableEntities: { [key: string]: string[] } = {}
  protected _destroyQueue: string[] = []
  protected _currentCollisions: { [key: string]: string }
  protected _collisionHandler: SceneCollisions

  protected guiObjects: GuiObject[] = []

  protected game: Game

  get entityMap() { return this._entityMap } // prettier-ignore
  get updateableEntities() { return this._updateableEntities } // prettier-ignore
  get collidableEntities() { return this._collidableEntities } // prettier-ignore
  get destroyQueue() { return this._destroyQueue } // prettier-ignore
  get currentCollisions() { return this._currentCollisions } // prettier-ignore
  get collisionHandler() { return this._collisionHandler } // prettier-ignore

  constructor(game: Game) {
    this.game = game
    this._currentCollisions = {}
    this._collisionHandler = new SceneCollisions(this)
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
    this._currentCollisions = {}
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

    this._currentCollisions = this.collisionHandler.updateAutoCollisions()
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
        e.isActive && e.isVisible && e.draw(ctx)
      }
    }
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    for (const g of this.guiObjects) {
      g.drawGUI(ctx)
    }
  }
}
