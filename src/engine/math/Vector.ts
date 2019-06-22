export default class Vector {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  get x() { return this._x } // prettier-ignore
  get y() { return this._y } // prettier-ignore

  public setTo(x: number, y: number) {
    this._x = x
    this._y = y
  }

  public translate(dx: number, dy: number) {
    this._x = Math.floor(this._x + dx)
    this._y = Math.floor(this._y + dy)
  }

  public copyFrom(other: Vector) {
    this._x = other.x
    this._y = other.y
  }

  public eq(other: Vector) {
    return other.x === this._x && other.y === this._y
  }

  public toString() {
    return `Vector -> x: ${this._x} | y: ${this._y}`
  }
}
