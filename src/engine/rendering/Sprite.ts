import { Entity } from '../core'
import { Drawable } from '../interfaces'
import { Texture } from '../resources'

export type SpriteConfig = {
  height: number
  src: Texture
  width: number
}

export default class Sprite implements Drawable {
  private src: Texture
  private h: number
  private w: number

  constructor(private host: Entity, config: SpriteConfig) {
    this.src = config.src
    this.h = config.height
    this.w = config.width
  }

  draw(ctx: CanvasRenderingContext2D, dt: number) {
    const { pos, prevPos } = this.host

    ctx.clearRect(prevPos.x, prevPos.y, this.w, this.h)
    ctx.drawImage(
      this.src.img,
      0,
      0,
      this.w,
      this.h,
      pos.x,
      pos.y,
      this.w,
      this.h,
    )
  }
}
