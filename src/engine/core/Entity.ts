import { Drawable, Updateable } from '../interfaces'
import { Vector } from '../math'

export default abstract class Entity implements Drawable, Updateable {
  protected _pos = new Vector(0, 0)
  protected _speed = 50

  get pos() { return this._pos } // prettier-ignore
  set pos(pos: Vector) { this._pos = pos } // prettier-ignore
  get speed() { return this._speed } // prettier-ignore
  set speed(speed: number) { this._speed = speed } // prettier-ignore

  update(dt: number) {}
  lateUpdate(dt: number) {}
  draw(ctx: CanvasRenderingContext2D, dt: number) {}
}
