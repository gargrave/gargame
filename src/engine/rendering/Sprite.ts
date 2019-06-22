import { Entity } from '../core'
import { Drawable } from '../interfaces'
import { Texture } from '../resources'

export type SpriteConfig = {
  height: number
  texture: Texture
  width: number
  x?: number
  y?: number
}

export default class Sprite implements Drawable {
  constructor(private host: Entity, private config: SpriteConfig) {}

  draw(ctx: CanvasRenderingContext2D) {
    // TODO: do not clear and redraw if host is not dirty
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
