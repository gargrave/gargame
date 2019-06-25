import { GameObject } from '../core/GameObject'
import { Sprite } from '../rendering/Sprite'
import { BaseBehavior } from './BaseBehavior'

export class WithSprite extends BaseBehavior {
  constructor(host: GameObject, private sprite: Sprite) {
    super(host)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.sprite.draw(ctx)
  }
}
