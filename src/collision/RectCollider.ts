import { Rect, SimpleRect } from '../math'
import { Collider } from '../interfaces'

export class RectCollider extends Rect implements Collider {
  protected _active: boolean = true

  get active() { return this._active } // prettier-ignore

  constructor(x: number, y: number, w: number, h: number, offset?: SimpleRect) {
    super(x, y, w, h, offset)
  }

  public activate() { this._active = true } // prettier-ignore
  public deactivate() { this._active = false } // prettier-ignore
}
