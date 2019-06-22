import { Behavior, Updateable } from '../interfaces'
import { Vector } from '../math'

export default abstract class GameObject implements Updateable {
  protected behaviors: Behavior[] = []

  protected _pos = new Vector(0, 0)
  protected _prevPos = new Vector(0, 0)
  protected _dirty: boolean = true

  get pos() { return this._pos } // prettier-ignore
  set pos(pos: Vector) { this._pos = pos } // prettier-ignore
  get prevPos() { return this._prevPos} // prettier-ignore
  get dirty() { return this._dirty } // prettier-ignore

  protected _updateDirtyState() {
    this._dirty = false
    if (!this.pos.eq(this.prevPos)) {
      this._dirty = true
    }
  }

  public addBehavior(b: Behavior) {
    // TODO: ensure behavior is not already there
    this.behaviors.push(b)
  }

  public earlyUpdate(dt: number) {
    this._updateDirtyState()
  }

  public update(dt: number) {
    for (const b of this.behaviors) {
      b.update(dt)
    }
  }

  public lateUpdate(dt: number) {
    this._prevPos.copyFrom(this._pos)
  }
}
