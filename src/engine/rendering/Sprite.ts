import { Entity } from '../core/Entity'
import { Drawable } from '../interfaces/Drawable'
import { Texture } from '../resources/Texture'

export type SpriteConfig = {
  height: number
  texture: Texture
  width: number
  x?: number
  y?: number
}

export class Sprite implements Drawable {
  constructor(private host: Entity, private config: SpriteConfig) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(
      this.host.prevPos.x,
      this.host.prevPos.y,
      this.config.width,
      this.config.height,
    )

    ctx.drawImage(
      this.config.texture.img,
      this.config.x || 0,
      this.config.y || 0,
      this.config.width,
      this.config.height,
      this.host.pos.x,
      this.host.pos.y,
      this.config.width,
      this.config.height,
    )
  }
}
