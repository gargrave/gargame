export class Rect {
  protected _x!: number
  protected _y!: number
  protected _w!: number
  protected _h!: number

  get x() { return this._x } // prettier-ignore
  get y() { return this._y } // prettier-ignore
  get w() { return this._w } // prettier-ignore
  get h() { return this._h } // prettier-ignore

  constructor(x: number, y: number, w: number, h: number) {
    this.setTo(x, y, w, h)
  }

  public setTo(x: number, y: number, w: number, h: number) {
    this._x = x
    this._y = y
    this._w = w
    this._h = h
  }

  public setPosition(x: number, y: number) {
    this._x = x
    this._y = y
  }

  public copyFrom(other: Rect) {
    const { x, y, w, h } = other
    this.setTo(x, y, w, h)
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
    return `Rect [x: ${this._x} | y: ${this._y} | w: ${this._w} | h: ${
      this._h
    }]`
  }
}
