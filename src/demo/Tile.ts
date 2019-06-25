import { Entity, GameObjectConfig, Globals as gl, Primitive } from '../engine'

export class Tile extends Entity {
  private heyIHaveBeenDrawn = false
  private color: string

  constructor(x, y, size) {
    super({
      height: size,
      width: size,
      x,
      y,
    })
    const c = () => Math.floor(Math.random() * 255)
    this.color = `rgb(${c()}, ${c()}, ${c()})`
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // if (this.heyIHaveBeenDrawn) return

    ctx.clearRect(this._pos.x, this._pos.y, this._width, this._height)
    Primitive.Fill.rect(ctx, this.color, this._bounds, 0)

    this.heyIHaveBeenDrawn = true
    if (gl.debug) {
      this.debugDraw(ctx)
    }
  }
}
