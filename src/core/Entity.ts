import { get } from '@gargrave/growbag'

import { DebugColors } from '../constants/colors'
import { Drawable } from '../interfaces/Drawable'
import { Rect } from '../math/Rect'
import { Primitive } from '../rendering/Primitive'
import { Log } from '../utils/Log'
import { Globals as gl } from '../Globals'

import { GameObject, GameObjectConfig } from './GameObject'

export type EntityConfig = GameObjectConfig & {
  collisionGroups?: string[]
}

const boundsDrawer = (bounds: Rect) => (ctx: CanvasRenderingContext2D) =>
  Primitive.Stroke.rect(ctx, DebugColors.Bounds, bounds)

const collRectDrawer = (bounds: Rect) => (ctx: CanvasRenderingContext2D) =>
  Primitive.Stroke.rect(ctx, DebugColors.Origin, bounds)

export abstract class Entity extends GameObject implements Drawable {
  /**
   * Returns whether the provided Entity can update based on the provided update
   * function name. Note that this is safe, in that if anything is null/undefined
   * (even the Entity instance itself), it will simply return false.
   * @param e
   * @param updateFn
   */
  public static canUpdate(e: Entity, updateFn: string) {
    return !!e && get(e, 'isActive') && get(e, updateFn)
  }

  private readonly drawBounds: (ctx: CanvasRenderingContext2D) => void
  private readonly drawColl: (ctx: CanvasRenderingContext2D) => void

  protected readonly _collisionGroups: string[]

  get collisionGroups() { return this._collisionGroups } // prettier-ignore

  protected constructor(config: EntityConfig) {
    super(config)
    this._collisionGroups = config.collisionGroups || []
    this.drawBounds = boundsDrawer(this._bounds)
    this.drawColl = collRectDrawer(this._collider)
  }

  protected _drawBehaviors(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
  }

  public onCollisionEnter(group: string, other: Entity) {
    Log.warn(`onCollisionEnter not implemented for: ${this.constructor.name}`)
  }

  public onCollision(group: string, other: Entity) {
    Log.warn(`onCollision not implemented for: ${this.constructor.name}`)
  }

  public onCollisionExit(group: string, other: Entity) {
    Log.warn(`onCollisionExit not implemented for: ${this.constructor.name}`)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._drawBehaviors(ctx)
    if (gl.debug) {
      this.debugDraw(ctx)
    }
  }

  public debugDraw(ctx: CanvasRenderingContext2D) {
    this.drawBounds(ctx)
    if (get(this, '_collider.active')) {
      this.drawColl(ctx)
    }
  }
}
