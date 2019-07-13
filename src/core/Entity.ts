import { get, mergeWhereDefined } from '@gargrave/growbag'

import { DebugColors } from '../constants/colors'
import { Drawable } from '../interfaces/Drawable'
import { Rect } from '../math/Rect'
import { Primitive } from '../rendering/Primitive'
import { Log } from '../utils/Log'
import { Globals as gl } from '../Globals'

import { GameObject, GameObjectProps } from './GameObject'

const boundsDrawer = (bounds: Rect) => (ctx: CanvasRenderingContext2D) =>
  Primitive.Stroke.rect(ctx, DebugColors.Bounds, bounds)

const collRectDrawer = (bounds: Rect) => (ctx: CanvasRenderingContext2D) =>
  Primitive.Stroke.rect(ctx, DebugColors.Origin, bounds)

export type RequiredProps = {}

export type OptionalProps = {
  collisionGroups: string[]
}

type Props = GameObjectProps & RequiredProps & OptionalProps
export type EntityProps = GameObjectProps &
  RequiredProps &
  Partial<OptionalProps>

const DEFAULT_PROPS: OptionalProps = Object.freeze({
  collisionGroups: [],
})

export abstract class Entity extends GameObject<Props> implements Drawable {
  private readonly drawBounds: (ctx: CanvasRenderingContext2D) => void
  private readonly drawColl: (ctx: CanvasRenderingContext2D) => void

  get collisionGroups() { return this._props.collisionGroups } // prettier-ignore

  protected constructor(props: EntityProps) {
    super(props)

    const myProps = mergeWhereDefined<Props>(DEFAULT_PROPS, props)
    this._props = mergeWhereDefined(this._props, myProps)

    this.drawBounds = boundsDrawer(this._bounds)
    this.drawColl = collRectDrawer(this._collider)
  }

  protected _drawBehaviors(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
  }

  // ============================================================
  //  Collision handling
  // ============================================================
  public onCollisionEnter(group: string, other: Entity) {
    Log.warn(`onCollisionEnter not implemented for: ${this.constructor.name}`)
  }

  public onCollision(group: string, other: Entity) {
    Log.warn(`onCollision not implemented for: ${this.constructor.name}`)
  }

  public onCollisionExit(group: string, other: Entity) {
    Log.warn(`onCollisionExit not implemented for: ${this.constructor.name}`)
  }

  // ============================================================
  //  Draw methods
  // ============================================================
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
