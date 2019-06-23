import { Drawable } from '../interfaces'
import GameObject, { GameObjectConfig } from './GameObject'

export default abstract class Entity extends GameObject implements Drawable {
  constructor(config: GameObjectConfig) {
    super(config)
  }

  protected _drawBehaviors(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._drawBehaviors(ctx)
  }
}
