import { any, mergeWhereDefined } from '@gargrave/growbag'

import { GuiObject } from './GuiObject'
import { Globals as gl } from '../Globals'

type RequiredProps = {}

type OptionalProps = {
  showBackdrop?: boolean
}

type Props = RequiredProps & OptionalProps
export type GuiSetProps = RequiredProps & Partial<OptionalProps>

const DEFAULT_PROPS: OptionalProps = Object.freeze({
  showBackdrop: false,
})

export class GuiSet extends GuiObject {
  protected props: Props
  protected children: GuiObject[] = []

  constructor(props: GuiSetProps) {
    super({})

    this.props = mergeWhereDefined(DEFAULT_PROPS, props)
  }

  public show() {
    this.forceDirtyState()
  }

  protected _updateDirtyState() {
    super._updateDirtyState()
    if (!this._dirty) {
      // if this wrapper instance itself is not dirty, check if any children are
      // if any children are dirty, we will simply re-draw them all
      this._dirty = any(this.children, child => child.dirty)
    }
  }

  // ============================================================
  //  Update methods
  // ============================================================
  public earlyUpdate(dt: number) {
    super.earlyUpdate(dt)
    // TODO: add "children" handling to base GameObject class
    for (const go of this.children) {
      go.earlyUpdate && go.earlyUpdate(dt)
    }
  }

  public update(dt: number) {
    super.update(dt)
    for (const go of this.children) {
      go.update(dt)
    }
  }

  public lateUpdate(dt: number) {
    super.lateUpdate(dt)
    for (const go of this.children) {
      go.lateUpdate && go.lateUpdate(dt)
    }
  }

  // ============================================================
  //  Draw methods
  // ============================================================
  public drawGUI(ctx: CanvasRenderingContext2D) {
    if (!this._dirty) return

    const { showBackdrop } = this.props

    ctx.save()
    ctx.clearRect(0, 0, gl.game.width, gl.game.height)

    if (showBackdrop) {
      ctx.fillStyle = 'rgba(0, 0, 0, .55)'
      ctx.fillRect(0, 0, gl.game.width, gl.game.height)
    }

    for (const go of this.children) {
      go.drawGUI(ctx, true)
    }

    ctx.restore()
  }
}
