import { Behavior, Drawable, Updateable } from '../interfaces'
import { Vector } from '../math'

export default abstract class Entity implements Drawable, Updateable {
  protected behaviors: Behavior[] = []

  protected _pos = new Vector(0, 0)
  protected _prevPos = new Vector(0, 0)
  protected _speed = 0

  get pos() { return this._pos } // prettier-ignore
  set pos(pos: Vector) { this._pos = pos } // prettier-ignore
  get prevPos() { return this._prevPos} // prettier-ignore

  get speed() { return this._speed } // prettier-ignore
  set speed(speed: number) { this._speed = speed } // prettier-ignore

  protected addBehavior(b: Behavior) {
    this.behaviors.push(b)
  }

  earlyUpdate(dt: number) {
    this._prevPos.copyFrom(this._pos)
    // TODO: add an 'isDirty' property
  }

  update(dt: number) {
    for (const b of this.behaviors) {
      b.update(dt)
    }
  }

  lateUpdate(dt: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    for (const b of this.behaviors) {
      b.draw(ctx)
    }
  }
}
