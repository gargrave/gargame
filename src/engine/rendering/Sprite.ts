import { Entity } from '../core'
import { Drawable } from '../interfaces'
import { Texture } from '../resources'

export type SpriteConfig = {
  height: number
  src: Texture
  width: number
  x?: number
  y?: number
}

export default class Sprite implements Drawable {
  private host: Entity
  private src: Texture
  private h: number
  private w: number
  private imgX: number
  private imgY: number

  constructor(host: Entity, config: SpriteConfig) {
    this.host = host
    // TODO: ensure the naming here is the same as Animation
    this.src = config.src
    this.h = config.height
    this.w = config.width
    this.imgX = config.x || 0
    this.imgY = config.y || 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { pos, prevPos } = this.host

    ctx.clearRect(prevPos.x, prevPos.y, this.w, this.h)
    ctx.drawImage(
      this.src.img,
      this.imgX,
      this.imgY,
      this.w,
      this.h,
      pos.x,
      pos.y,
      this.w,
      this.h,
    )
  }
}
