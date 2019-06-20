import { Drawable, Updateable } from '../interfaces'
import { Vector } from '../math'

export default abstract class Entity implements Drawable, Updateable {
  protected _pos = new Vector(0, 0)
  protected _speed = 0

  protected _prevPos = new Vector(0, 0)

  get pos() { return this._pos } // prettier-ignore
  set pos(pos: Vector) { this._pos = pos } // prettier-ignore
  get prevPos() { return this._prevPos} // prettier-ignore
  get speed() { return this._speed } // prettier-ignore
  set speed(speed: number) { this._speed = speed } // prettier-ignore

  earlyUpdate(dt: number) {
    this._prevPos.copyFrom(this._pos)
  }

  update(dt: number) {}

  lateUpdate(dt: number) {}

  draw(ctx: CanvasRenderingContext2D, dt: number) {}
}
