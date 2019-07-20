import { clamp, get, mergeWhereDefined } from '@gargrave/growbag'

import { RectCollider } from '../collision/RectCollider'
import { Behavior } from '../interfaces/Behavior'
import { Updateable } from '../interfaces/Updateable'
import { Rect } from '../math/Rect'
import { Vector } from '../math/Vector'

/** Partially-applied helper function to clamp min/max value for scale */
const clampScale = (scale: number) => clamp(-1, 1, scale)

type RequiredProps = {}

type OptionalProps = {
  collisionOffset: Rect
  height: number
  speed: number
  startInactive: boolean
  startInvisible: boolean
  width: number
  x: number
  y: number
}

type Props = RequiredProps & OptionalProps
export type GameObjectProps = RequiredProps & Partial<OptionalProps>

const DEFAULT_PROPS: OptionalProps = Object.freeze({
  collisionOffset: new Rect(),
  height: 0,
  speed: 0,
  startInactive: false,
  startInvisible: false,
  width: 0,
  x: 0,
  y: 0,
})

export abstract class GameObject<PropsShape> implements Updateable {
  /**
   * Instance comparison check for two GameObject instances.
   * @param a
   * @param b
   */
  public static eq<T>(a: GameObject<T>, b: GameObject<T>) {
    return a.id === b.id
  }

  /**
   * Returns whether the provided instance can update based on the provided update
   * function name. Note that this is safe, in that if anything is null/undefined
   * (even the instance itself), it will simply return false.
   * @param go
   * @param updateFn
   */
  public static canUpdate<T>(go: GameObject<T>, updateFn: string) {
    return get(go, 'isActive') && get(go, updateFn)
  }

  /**
   * Returns whether the provided instance is in a state that can be drawn.
   * @param go
   */
  public static canDraw<T>(go: GameObject<T>) {
    return !!go && get(go, 'isActive') && get(go, 'isVisible')
  }

  private static nextId = 0

  protected readonly _id: string
  protected _props: Props & PropsShape
  protected behaviors: Behavior[] = []

  protected _width: number = 0
  protected _height: number = 0
  protected _scale = new Vector(1, 1)
  protected _bounds: Rect
  protected _collider: RectCollider
  protected _pos: Vector
  protected _prevPos: Vector
  protected _active: boolean
  protected _visible: boolean = true
  protected _speed = 0
  protected _dirty = true
  protected _forcedDirtyState = false

  protected _currentSpeed = new Vector(0, 0)

  get id() { return this._id } // prettier-ignore
  get props() { return this._props } // prettier-ignore
  get width() { return this._width } // prettier-ignore
  get height() { return this._height } // prettier-ignore
  get scale() { return this._scale } // prettier-ignore
  get bounds() { return this._bounds } // prettier-ignore
  get collider() { return this._collider } // prettier-ignore
  get pos() { return this._pos } // prettier-ignore
  get prevPos() { return this._prevPos} // prettier-ignore
  get isActive() { return this._active } // prettier-ignore
  get isVisible() { return this._visible } // prettier-ignore
  get speed() { return this._speed } // prettier-ignore
  get dirty() { return this._dirty } // prettier-ignore

  protected constructor(props: GameObjectProps) {
    this._props = mergeWhereDefined(DEFAULT_PROPS, props) as Props & PropsShape

    const {
      collisionOffset,
      height,
      speed,
      startInactive,
      startInvisible,
      width,
      x,
      y,
    } = this._props

    this._id = `${this.constructor.name}__${GameObject.nextId++}` // eslint-disable-line
    this._width = width
    this._height = height
    this._pos = new Vector(x, y)
    this._prevPos = new Vector(x, y)
    this._active = !startInactive
    this._visible = !startInvisible
    this._speed = speed

    this._bounds = new Rect(this.pos.x, this.pos.y, this._width, this._height)
    this._collider = new RectCollider(
      this.pos.x,
      this.pos.y,
      this._width,
      this._height,
      collisionOffset,
    )
  }

  protected _updateDirtyState() {
    let newDirtyState = false

    if (this._forcedDirtyState) {
      newDirtyState = true
      this._forcedDirtyState = false
    } else if (!this.pos.eq(this.prevPos)) {
      newDirtyState = true
    }

    this._dirty = newDirtyState
  }

  protected _updateBehaviors(dt: number) {
    for (const b of this.behaviors) {
      b.update(dt)
    }
  }

  public activate() {
    this._active = true
  }

  public deactivate() {
    this._active = false
  }

  public forceDirtyState() {
    this._forcedDirtyState = true
  }

  /**
   * Moves this instance by the amount specified as x/y. If no values are provided,
   * the instance's current x/y speeds are used.
   *
   * Aside from updating position, this also includes moving any bounding boxes,
   * colliders, etc, as appropriate.
   * @param x
   * @param y
   */
  public move(
    x: number = this._currentSpeed.x,
    y: number = this._currentSpeed.y,
  ) {
    this._pos.translate(x, y)
    this._bounds.setPosition(this._pos.x, this._pos.y)
    this._collider.copyFrom(this._bounds)
  }

  public setScaleX(val: number) { this._scale.x = clampScale(val) } // prettier-ignore
  public setScaleY(val: number) { this._scale.y = clampScale(val) } // prettier-ignore

  public addBehavior(b: Behavior) {
    this.behaviors.push(b)
  }

  // ============================================================
  //  Update methods
  // ============================================================
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
