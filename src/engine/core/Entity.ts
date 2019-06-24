import { Colors } from '../constants/colors'
import { Drawable } from '../interfaces/Drawable'
import { Rect } from '../math/Rect'
import { Primitive } from '../rendering/Primitive'
import { Globals as gl } from '../Globals'

import { GameObject, GameObjectConfig } from './GameObject'

const boundsDrawer = (bounds: Rect) => (ctx: CanvasRenderingContext2D) =>
  Primitive.Stroke.rect(ctx, Colors.Debug.Bounds, bounds, 1)

export abstract class Entity extends GameObject implements Drawable {
  private drawBounds: (ctx: CanvasRenderingContext2D) => void

  constructor(config: GameObjectConfig) {
    super(config)
    this.drawBounds = boundsDrawer(this._bounds)
  }

  protected _drawBehaviors(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
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
