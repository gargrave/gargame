import { Colors } from '../constants/colors'
import { Drawable } from '../interfaces/Drawable'
import { Rect } from '../math/Rect'
import { Primitive } from '../rendering/Primitive'
import { Log } from '../utils/Log'
import { Globals as gl } from '../Globals'

import { GameObject, GameObjectConfig } from './GameObject'

export type EntityConfig = GameObjectConfig & {
  collisionGroups?: string[]
  startInactive?: boolean
}

const boundsDrawer = (bounds: Rect) => (ctx: CanvasRenderingContext2D) =>
  Primitive.Stroke.rect(ctx, Colors.Debug.Bounds, bounds, 1)

export abstract class Entity extends GameObject implements Drawable {
  private static nextId = 0

  private readonly drawBounds: (ctx: CanvasRenderingContext2D) => void

  protected readonly _id: string
  protected readonly _collisionGroups: string[]
  protected _active: boolean

  get id() { return this._id } // prettier-ignore
  get collisionGroups() { return this._collisionGroups } // prettier-ignore
  get isActive() { return this._active } // prettier-ignore

  protected constructor(config: EntityConfig) {
    super(config)
    this._id = `${this.constructor.name}__${Entity.nextId++}` // eslint-disable-line
    this._collisionGroups = config.collisionGroups || []
    this._active = config.startInactive !== true
    this.drawBounds = boundsDrawer(this._bounds)
  }

  public activate() {
    this._active = true
  }

  public deactivate() {
    this._active = false
  }

  protected _drawBehaviors(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
  }

  public onCollisionEnter(group: string, other: Entity) {
    Log.warn(`onCollisionEnter not implemented for: ${this.constructor.name}`)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._drawBehaviors(ctx)
    if (gl.debug) {
      this.debugDraw(ctx)
    }
  }

  public debugDraw(ctx: CanvasRenderingContext2D) {
    this.drawBounds(ctx)
  }
}
