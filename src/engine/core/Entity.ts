import { Colors } from '../constants/colors'
import { Drawable } from '../interfaces/Drawable'
import { Rect } from '../math/Rect'
import { Primitive } from '../rendering/Primitive'
import { Globals as gl } from '../Globals'

import { GameObject, GameObjectConfig } from './GameObject'

export type EntityConfig = GameObjectConfig & {
  collisionGroups?: string[]
}

const boundsDrawer = (bounds: Rect) => (ctx: CanvasRenderingContext2D) =>
  Primitive.Stroke.rect(ctx, Colors.Debug.Bounds, bounds, 1)

export abstract class Entity extends GameObject implements Drawable {
  private readonly drawBounds: (ctx: CanvasRenderingContext2D) => void

  protected readonly _collisionGroups: string[]

  get collisionGroups() { return this._collisionGroups } // prettier-ignore

  protected constructor(config: EntityConfig) {
    super(config)
    this._collisionGroups = config.collisionGroups || []
    this.drawBounds = boundsDrawer(this._bounds)
  }

  protected _drawBehaviors(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
  }

  public onCollision(collGroup: string, other: Entity) {
    if (collGroup === 'player') {
      console.log('STAR COLLIDED WITH PLAYER: ', this)
    }
    // TODO: need a way for Entities to remove themselves
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
