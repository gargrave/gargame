import { Entity, Globals as gl, Primitive } from '../engine'

import { CollisionGroup } from './config/collisionGroups'

export class Tile extends Entity {
  private readonly color: string

  constructor(x, y, size) {
    super({
      collisionGroups: [CollisionGroup.tile],
      height: size,
      width: size,
      x,
      y,
    })

    const c = () => Math.floor(Math.random() * 255)
    this.color = `rgb(${c()}, ${c()}, ${c()})`
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(this._pos.x, this._pos.y, this._width, this._height)
    Primitive.Fill.rect(ctx, this.color, this._bounds, 0)

    if (gl.debug) {
      this.debugDraw(ctx)
    }
  }
}
