export default class Vector {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  get x() { return this._x } // prettier-ignore
  get y() { return this._y } // prettier-ignore

  translate(dx: number, dy: number) {
    this._x += dx
    this._y += dy
  }
}
