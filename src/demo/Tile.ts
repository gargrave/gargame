import { Entity, GameObjectConfig, Globals as gl, Primitive } from '../engine'

const SIZE = 32
const defaultConfig: GameObjectConfig = {
  height: SIZE,
  width: SIZE,
}

export class Tile extends Entity {
  private heyIHaveBeenDrawn = false

  constructor(gridX, gridY) {
    super({
      ...defaultConfig,
      x: gridX * SIZE,
      y: gridY * SIZE,
    })
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // if (this.heyIHaveBeenDrawn) return

    ctx.clearRect(this._pos.x, this._pos.y, this._width, this._height)
    Primitive.Fill.rect(ctx, '#00cc00', this._bounds, 0)

    this.heyIHaveBeenDrawn = true
    if (gl.debug) {
      this.debugDraw(ctx)
    }
  }
}
