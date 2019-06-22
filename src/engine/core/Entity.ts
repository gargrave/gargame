import { Drawable } from '../interfaces'
import GameObject from './GameObject'

export default abstract class Entity extends GameObject implements Drawable {
  protected _drawBehaviors(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._drawBehaviors(ctx)
  }
}
