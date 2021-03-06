import { mergeWhereDefined } from '@gargrave/growbag'

import { GameObjectProps } from '../core/GameObject'
import { GuiObject } from '../core/GuiObject'
import { LabelHelpers } from './LabelHelpers'

type OptionalShadowTextProps = {
  color: string
  offsetX: number
  offsetY: number
  show: boolean
}

type OptionalProps = {
  /**
   * Whether this instance should be centered horizontally on the screen.
   * Note that using this setting will override any "x" value.
   */
  centeredX: boolean
  color: string
  font: string
  fontSize: number
}

type RequiredProps = {
  x: number
  y: number
}

type RequiredChildProps = { shadowText: OptionalShadowTextProps }
type Props = GameObjectProps &
  RequiredProps &
  OptionalProps &
  RequiredChildProps

type OptionalChildProps = { shadowText?: Partial<OptionalShadowTextProps> }
export type LabelProps = GameObjectProps &
  RequiredProps &
  Partial<OptionalProps> &
  OptionalChildProps

const DEFAULT_PROPS: OptionalProps & RequiredChildProps = Object.freeze({
  centeredX: false,
  color: 'white',
  font: 'serif',
  fontSize: 24,
  shadowText: Object.freeze({
    color: 'black',
    offsetX: -2,
    offsetY: 2,
    show: false,
  }),
})

export class Label extends GuiObject<Props> {
  /**
   * Whether the text has updated since last frame.
   * If it has, this will trigger a re-draw of the Label.
   */
  private textHasUpdated: boolean = false

  /** The text to be displayed by this instance */
  private _text: string = ''

  get text() { return this._text } // prettier-ignore

  constructor(text: string, props: LabelProps) {
    super()

    const myProps = mergeWhereDefined<Props>(DEFAULT_PROPS, props)
    myProps.shadowText = mergeWhereDefined(
      DEFAULT_PROPS.shadowText,
      props.shadowText || {},
    )
    this._props = mergeWhereDefined(this._props, myProps)

    // initialize the instance
    const { fontSize, x, y } = this._props
    this.setText(text)
    this._pos.setTo(x, y)
    this._height = fontSize
  }

  protected _updateDirtyState() {
    super._updateDirtyState()
    // additional dirty checks if it passed all from parent class
    if (!this._dirty) {
      if (this.textHasUpdated) {
        this._dirty = true
      }
    }
  }

  /**
   * Updates the text being displayed by this instance.
   * @param newText
   */
  public setText(newText: string) {
    if (newText === this._text) return

    this._text = newText
    this.textHasUpdated = true
  }

  public drawGUI(ctx: CanvasRenderingContext2D, forceDraw: boolean = false) {
    if (!this._dirty && !forceDraw) return

    const { color, font, fontSize, shadowText } = this._props

    ctx.save()

    // set font and re-cache text measurements
    ctx.font = `${fontSize}px ${font}`
    this._width = Math.ceil(ctx.measureText(this._text).width)

    const labelX = LabelHelpers.getDrawX(this)
    const labelY = this.pos.y

    if (shadowText.show) {
      ctx.fillStyle = shadowText.color
      ctx.fillText(
        this.text,
        labelX + shadowText.offsetX,
        labelY + shadowText.offsetY,
      )
    }

    ctx.fillStyle = color
    ctx.fillText(this.text, labelX, labelY)

    ctx.restore()
    this.textHasUpdated = false
    this._dirty = false
  }
}
