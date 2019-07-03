import { GameObject } from '../core/GameObject'
import { Sprite } from '../rendering/Sprite'
import { BaseBehavior } from './BaseBehavior'

export class WithSprite extends BaseBehavior {
  private _sprite: Sprite

  set sprite(sprite: Sprite) { this._sprite = sprite } // prettier-ignore

  constructor(host: GameObject, sprite: Sprite) {
    super(host)
    this._sprite = sprite
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._sprite.draw(ctx)
  }
}
