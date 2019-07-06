/**
 * Simple utility class for tracking the basic essentials for a geometric rectangle.
 * Can be instantiated directly if you only need the basic measurements, or it can
 * be extended to add more behavior for things like bounding boxes et al.
 */
export class SimpleRect {
  protected _x: number
  protected _y: number
  protected _w: number
  protected _h: number
  protected _bottom!: number
  protected _right!: number

  get x() { return this._x } // prettier-ignore
  get y() { return this._y } // prettier-ignore
  get w() { return this._w } // prettier-ignore
  get h() { return this._h } // prettier-ignore
  get bottom() { return this._bottom } // prettier-ignore
  get right() { return this._right } // prettier-ignore

  constructor(x?: number, y?: number, w?: number, h?: number) {
    this._x = x || 0
    this._y = y || 0
    this._w = w || 0
    this._h = h || 0
    this._bottom = this._y + this._h
    this._right = this._x + this._w
  }

  /**
   * Returns whether Rect `other` has identical position and dimensions as this instance.
   *
   * Note that this is strictly a value check, not a reference check, so the check should
   * be thought of as "does this occupy the exact same space," rather than "is this
   * the same Rect"
   * @param other
   */
  public eq(other: SimpleRect) {
    return (
      other.x === this._x &&
      other.y === this._y &&
      other.w === this._w &&
      other.h === this._h
    )
  }

  /**
   * Returns whether this instance has any pixels overlapping with `other`.
   * @param other
   */
  public overlaps(other: SimpleRect) {
    if (this._x >= other._right || this._right <= other._x) {
      return false
    }

    if (this._y >= other._bottom || this._bottom <= other._y) {
      return false
    }

    return true
  }

  public toString() {
    return `Rectangle [x: ${this._x} | y: ${this._y} | w: ${this._w} | h: ${this._h}]`
  }
}

/**
 * An extension class of SimpleRect providing more "active" functionality,
 * including specifying a `offset` value to permanently change the
 * position and size calculations.
 *
 * This is useful for colliders, bounding boxes, and anything else that needs
 * more interaction than simply keeping track of measurements.
 */
export class Rect extends SimpleRect {
  /**
   * Returns a NEW Rect instance based on `other` + `offset`. Take note that this
   * does create a new instance, rather than mutating an existing one, so generally
   * speaking, it is probably not something you want to be calling every single frame.
   * @param other
   * @param offset
   */
  public static from(other: SimpleRect, offset?: SimpleRect) {
    return new Rect(other.x, other.y, other.w, other.h, offset)
  }

  protected _offset: SimpleRect

  get offset() { return this._offset } // prettier-ignore

  constructor(
    x?: number,
    y?: number,
    w?: number,
    h?: number,
    offset?: SimpleRect,
  ) {
    super(x || 0, y || 0, w || 0, h || 0)

    this._offset = offset
      ? new SimpleRect(offset.x, offset.y, offset.w, offset.h)
      : new SimpleRect()

    this.setTo(x || 0, y || 0, w || 0, h || 0)
  }

  /**
   * Sets all values of this instance to the provided values, including updating
   * width and height. Note that any existing offsets are still accounted for here.
   * @param x
   * @param y
   * @param w
   * @param h
   */
  public setTo(x: number, y: number, w: number, h: number) {
    const { x: ox, y: oy, w: ow, h: oh } = this._offset

    this._w = w + ow - ox
    this._h = h + oh - oy
    this.setPosition(x, y)
  }

  /**
   * Sets the positional coordinates for this instance, while retaining existing
   * width, height, and offset settings.
   * @param x
   * @param y
   */
  public setPosition(x: number, y: number) {
    const { x: ox, y: oy } = this._offset

    this._x = x + ox
    this._y = y + oy
    this._bottom = this._y + this._h
    this._right = this._x + this._w
  }

  /**
   * Moves this instance in relation to another Rect. What this is effectively doing
   * is setting position to `other` and then moving it.
   *
   * This is useful for when you need to have one Rect follow another,
   * either closely or directly.
   * @param other
   * @param dx
   * @param dy
   */
  public translateFrom(other: Rect, dx: number = 0, dy: number = 0) {
    this.setPosition(other.x + dx, other.y + dy)
  }

  /**
   * Sets this instance's bounds to match `other`
   * Note that this DOES NOT return a new instance, but rather just mutates this
   * instance, which will generally be a tiny bit more performant than using Rect.from().
   * @param other
   */
  public copyFrom(other: SimpleRect) {
    const { x, y, w, h } = other
    this.setTo(x, y, w, h)
  }
}
