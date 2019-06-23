import { GuiObject } from '../core'

export type LabelConfig = {
  fontSize?: number
  x: number
  y: number
}

export class Label extends GuiObject {
  private config: LabelConfig
  private textHasUpdated: boolean = false

  private _text: string = ''

  get text() { return this._text } // prettier-ignore

  constructor(text: string, config: LabelConfig) {
    super()

    const { fontSize = 24, x, y } = config
    this.config = {
      ...config,
      fontSize,
    }

    this.setText(text)
    this._pos.setTo(x, y)
    this._height = fontSize
  }

  protected _updateDirtyState() {
    super._updateDirtyState()
    if (!this._dirty) {
      if (this.textHasUpdated) {
        this._dirty = true
      }
    }
  }

  public setText(text: string) {
    this._text = text
    this.textHasUpdated = true
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    if (!this.dirty) return

    ctx.save()

    // set font and re-cache text measurements
    ctx.font = `${this._height}px serif`
    this._width = Math.ceil(ctx.measureText(this._text).width)

    const { x: px, y: py } = this.prevPos
    ctx.clearRect(px, py + 1, this._width, -this._height)
    ctx.fillText(this.text, this.pos.x, this.pos.y)

    ctx.restore()
    this.textHasUpdated = false
  }
}
