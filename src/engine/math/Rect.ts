export class Rect {
  protected _x!: number
  protected _y!: number
  protected _w!: number
  protected _h!: number
  protected _bottom!: number
  protected _right!: number

  get x() { return this._x } // prettier-ignore
  get y() { return this._y } // prettier-ignore
  get w() { return this._w } // prettier-ignore
  get h() { return this._h } // prettier-ignore
  get bottom() { return this._bottom } // prettier-ignore
  get right() { return this._right } // prettier-ignore

  constructor(x: number, y: number, w: number, h: number) {
    this.setTo(x, y, w, h)
  }

  public setTo(x: number, y: number, w: number, h: number) {
    this._x = x
    this._y = y
    this._w = w
    this._h = h
    this._bottom = this._y + this._h
    this._right = this._x + this._w
  }

  public setPosition(x: number, y: number) {
    this._x = x
    this._y = y
    this._bottom = this._y + this._h
    this._right = this._x + this._w
  }

  public copyFrom(other: Rect) {
    const { x, y, w, h } = other
    this.setTo(x, y, w, h)
  }

  public overlaps(other: Rect) {
    if (this._x > other._right || this._right < other._x) {
      return false
    }

    if (this._y > other._bottom || this._bottom < other._y) {
      return false
    }

    return true
  }

  public eq(other: Rect) {
    return (
      other.x === this._x &&
      other.y === this._y &&
      other.w === this._w &&
      other.h === this._h
    )
  }

  public toString() {
    return `Rect [x: ${this._x} | y: ${this._y} | w: ${this._w} | h: ${this._h}]`
  }
}
