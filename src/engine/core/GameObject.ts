import { Behavior, Updateable } from '../interfaces'
import { Vector } from '../math'

export type GameObjectConfig = {
  height?: number
  speed?: number
  width?: number
}

export default abstract class GameObject implements Updateable {
  protected behaviors: Behavior[] = []

  protected _width: number = 0
  protected _height: number = 0
  protected _pos = new Vector(0, 0)
  protected _prevPos = new Vector(0, 0)

  protected _speed = 0
  protected _dirty = true

  get width() { return this._width } // prettier-ignore
  get height() { return this._height } // prettier-ignore
  get pos() { return this._pos } // prettier-ignore
  get prevPos() { return this._prevPos} // prettier-ignore

  get speed() { return this._speed } // prettier-ignore
  set speed(speed: number) { this._speed = speed } // prettier-ignore
  get dirty() { return this._dirty } // prettier-ignore

  constructor(config: GameObjectConfig) {
    const { height, speed, width } = config
    this._width = width || 0
    this._speed = speed || 0
    this._height = height || 0
  }

  protected _updateDirtyState() {
    this._dirty = false
    if (!this.pos.eq(this.prevPos)) {
      this._dirty = true
    }
  }

  protected _updateBehaviors(dt: number) {
    for (const b of this.behaviors) {
      b.update(dt)
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
    this._updateBehaviors(dt)
  }

  public lateUpdate(dt: number) {
    this._prevPos.copyFrom(this._pos)
  }
}
