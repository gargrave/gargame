import { Drawable, Updateable } from '../interfaces'

export default class Entity implements Drawable, Updateable {
  protected _speed = 50

  get speed() { return this._speed } // prettier-ignore
  set speed(speed: number) { this._speed = speed } // prettier-ignore

  update(dt: number) {}

  lateUpdate(dt: number) {}

  draw(ctx: CanvasRenderingContext2D, dt: number) {}
}
