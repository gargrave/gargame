import { Behavior } from '../interfaces/Behavior'
import { Updateable } from '../interfaces/Updateable'
import { Rect } from '../math/Rect'
import { Vector } from '../math/Vector'

export type GameObjectConfig = {
  height?: number
  speed?: number
  width?: number
  x?: number
  y?: number
}

export abstract class GameObject implements Updateable {
  protected behaviors: Behavior[] = []

  protected _width: number = 0
  protected _height: number = 0
  protected _bounds: Rect
  protected _collRect: Rect
  protected _pos: Vector
  protected _prevPos: Vector

  protected _speed = 0
  protected _dirty = true

  get width() { return this._width } // prettier-ignore
  get height() { return this._height } // prettier-ignore
  get bounds() { return this._bounds } // prettier-ignore
  get collRect() { return this._collRect } // prettier-ignore
  get pos() { return this._pos } // prettier-ignore
  get prevPos() { return this._prevPos} // prettier-ignore

  get speed() { return this._speed } // prettier-ignore
  set speed(speed: number) { this._speed = speed } // prettier-ignore
  get dirty() { return this._dirty } // prettier-ignore

  protected constructor(config: GameObjectConfig) {
    const { height, speed, width, x, y } = config
    this._width = width || 0
    this._speed = speed || 0
    this._height = height || 0
    this._pos = new Vector(x || 0, y || 0)
    this._prevPos = new Vector(x || 0, y || 0)
    this._bounds = new Rect(this.pos.x, this.pos.y, this._width, this._height)
    this._collRect = new Rect(this.pos.x, this.pos.y, this._width, this._height)
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

  protected move(x: number, y: number) {
    this._pos.translate(x, y)
    this._bounds.setPosition(this._pos.x, this._pos.y)
    this._collRect.copyFrom(this._bounds)
  }

  public addBehavior(b: Behavior) {
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
