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
    const { x: sx, y: sy } = this.host.scale
    const { height, width } = this.config

    ctx.save()

    // translate context accordingly for flipped Sprites
    if (sx === -1) ctx.translate(width, 0)
    if (sy === -1) ctx.translate(0, height)
    ctx.scale(sx, sy)

    ctx.drawImage(
      this.config.texture.img,
      this.config.x || 0, // texture-sub-rect positions
      this.config.y || 0,
      width, // texture sub-rect sizes
      height,
      this.host.pos.x * sx, // canvas draw positions
      this.host.pos.y * sy,
      width, // canvas draw-rect sizes
      height,
    )

    ctx.restore()
  }
}
