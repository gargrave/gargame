import { exclude, get } from '@gargrave/growbag'

import { Drawable } from '../../interfaces/Drawable'
import { Updateable } from '../../interfaces/Updateable'
import { Log } from '../../utils/Log'
import { Globals as gl } from '../../Globals'
import { Game } from '../Game'
import { Entity } from '../Entity'
import { GuiObject } from '../GuiObject'
import { SceneCollisions } from './SceneCollisions'
import { GameObject } from '../GameObject'

export const DESTROY_QUEUE_INTERVAL = 1000

export class Scene implements Drawable, Updateable {
  private lastDestroyProcess = 0
  private guiLayers: { [key: string]: GuiObject<unknown>[] } = {}

  protected _entityMap: { [key: string]: Entity } = {}
  protected _updateableEntities: string[] = []
  protected _collidableEntities: { [key: string]: string[] } = {}
  protected _destroyQueue: string[] = []
  protected _currentCollisions: { [key: string]: string }
  protected _collisionHandler: SceneCollisions

  protected game: Game
  protected needsFullGuiClear = false

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

    // initialize all expected GUI layers
    game.guiLayers.forEach(layer => (this.guiLayers[layer] = []))
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

  public clear() {
    this._entityMap = {}
    this._updateableEntities = []
    this._collidableEntities = {}
    this._currentCollisions = {}
    // HACK: this is a temp fix to deal with collision problems
    this._collisionHandler = new SceneCollisions(this)
  }

  public addToDestroyQueue(entity: Entity) {
    this._destroyQueue.push(entity.id)
  }

  public addGuiObject<T>(go: GuiObject<T>, layer: string = 'default') {
    const guiLayer = get<GuiObject<T>[]>(this.guiLayers, layer)
    if (!guiLayer) return

    // TODO: ensure go is not already in this layer
    guiLayer.push(go)
  }

  // ============================================================
  //  Update methods
  // ============================================================
  private _baseUpdate(dt: number, updateFn: string) {
    // update all current/active Entities
    let entity: Entity
    for (const eid of this._updateableEntities) {
      entity = this._entityMap[eid]
      if (GameObject.canUpdate(entity, updateFn)) {
        entity[updateFn](dt)
      }
    }

    // update all active GUI Objects in all layers
    Object.values(this.guiLayers).forEach(guiLayer => {
      for (const go of guiLayer) {
        if (GameObject.canUpdate(go, updateFn)) {
          go[updateFn](dt)
        }
      }
    })
  }

  public earlyUpdate(dt: number) {
    this._baseUpdate(dt, 'earlyUpdate')
  }

  public update(dt: number) {
    this._baseUpdate(dt, 'update')
    this._currentCollisions = this.collisionHandler.updateAutoCollisions()
  }

  public lateUpdate(dt: number) {
    this._baseUpdate(dt, 'lateUpdate')

    this.lastDestroyProcess += dt
    if (this.lastDestroyProcess >= DESTROY_QUEUE_INTERVAL) {
      this._processDestroyQueue()
    }

    this.needsFullGuiClear = false
  }

  // ============================================================
  //  Draw methods
  // ============================================================
  public draw(ctx: CanvasRenderingContext2D) {
    let e: Entity
    for (const eid of this._updateableEntities) {
      e = this._entityMap[eid]
      if (e) {
        e.isActive && e.isVisible && e.draw(ctx)
      }
    }
  }

  public drawGuiLayer(layerName: string, ctx: CanvasRenderingContext2D) {
    const guiObjects = get<GuiObject<unknown>[]>(this.guiLayers, layerName)
    if (!guiObjects) return

    if (this.needsFullGuiClear) {
      ctx.clearRect(0, 0, gl.game.width, gl.game.height)
    }

    for (const go of guiObjects) {
      if (GuiObject.canDraw(go)) {
        go.drawGUI(ctx)
      }
    }
  }
}
