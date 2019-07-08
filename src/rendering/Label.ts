import { mergeWhereDefined } from '@gargrave/growbag'

import { GuiObject } from '../core/GuiObject'

type OptionalShadowTextProps = {
  color: string
  offsetX: number
  offsetY: number
  show: boolean
}

type OptionalProps = {
  color: string
  font: string
  fontSize: number
}

type RequiredProps = {
  x: number
  y: number
}

// Internal config type with all props required (use default values where necessary)
type RequiredChildProps = { shadowText: OptionalShadowTextProps }
type Props = RequiredProps & OptionalProps & RequiredChildProps

// External config with appropriate optional props (will use default config as fallback)
type OptionalChildProps = { shadowText?: Partial<OptionalShadowTextProps> }
export type LabelProps = RequiredProps &
  Partial<OptionalProps> &
  OptionalChildProps

const DEFAULT_PROPS: OptionalProps & RequiredChildProps = Object.freeze({
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

export class Label extends GuiObject {
  private props!: Props

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
    this._mergeProps(props)
    this._init(text)
  }

  /**
   * Merges incoming props/config with default values, ensuring all entries have a valid value
   * @param props
   */
  protected _mergeProps(props: LabelProps) {
    this.props = mergeWhereDefined(DEFAULT_PROPS, props) as Props
    this.props.shadowText = mergeWhereDefined(
      DEFAULT_PROPS.shadowText,
      props.shadowText || {},
    ) as OptionalShadowTextProps
  }

  /**
   * Initializes the Label with incoming props.
   * @param text
   */
  protected _init(text: string) {
    const { fontSize, x, y } = this.props

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

  public drawGUI(ctx: CanvasRenderingContext2D) {
    if (!this.dirty) return

    const { color, font, fontSize, shadowText } = this.props
    ctx.save()

    // set font and re-cache text measurements
    ctx.font = `${fontSize}px ${font}`
    this._width = Math.ceil(ctx.measureText(this._text).width)

    const { x: px, y: py } = this.prevPos
    // TODO: this might need to be expanded to account for shadow text
    ctx.clearRect(px, py + 1, this._width, -this._height)

    if (shadowText.show) {
      ctx.fillStyle = shadowText.color
      ctx.fillText(
        this.text,
        this.pos.x + shadowText.offsetX,
        this.pos.y + shadowText.offsetY,
      )
    }

    ctx.fillStyle = color
    ctx.fillText(this.text, this.pos.x, this.pos.y)

    ctx.restore()
    this.textHasUpdated = false
  }
}
