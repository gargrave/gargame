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

/**
 * A GuiObject extension class to manage multiple GuiObjects together.
 *
 * This is useful for creating a set of GuiObjects that should function together,
 * like a menu/HUD/etc. You can group your GuiObject together, and add this one
 * instance to your Scene instead of all of the individual ones.
 *
 * It is recommended to only show one GuiSet on a given layer at any time. If you are
 * using the same canvas for multiple GuiSets, it is best to ensure that they will
 * never need to be shown at the same time. Either that, or just define a new GUI
 * Layer.
 *
 * The most important thing to note here is that "dirty state" checking is grouped.
 * If the parent itself or ANY of the children have dirty state, all children will
 * be updated.
 */
export class GuiSet extends GuiObject {
  protected readonly guiSetProps: Props
  protected children: GuiObject[] = []

  constructor(props: GuiSetProps) {
    super({})
    this.guiSetProps = mergeWhereDefined(DEFAULT_PROPS, props)
  }

  protected _updateDirtyState() {
    super._updateDirtyState()
    if (!this._dirty) {
      // if this wrapper instance itself is not dirty, check if any children are
      // if any children are dirty, we will simply re-draw them all
      this._dirty = any(this.children, child => child.dirty)
    }
  }

  public show() {
    this._active = true
    this._visible = true
    this.forceDirtyState()
  }

  public hide() {
    this._active = false
    this._visible = false
  }

  // ============================================================
  //  Update methods
  // ============================================================
  public earlyUpdate(dt: number) {
    super.earlyUpdate(dt)
    // TODO: move "children" handling to base GameObject class
    for (const go of this.children) {
      if (GuiObject.canUpdate(go, 'earlyUpdate')) {
        go.earlyUpdate(dt)
      }
    }
  }

  public update(dt: number) {
    super.update(dt)
    for (const go of this.children) {
      if (GuiObject.canUpdate(go, 'update')) {
        go.update(dt)
      }
    }
  }

  public lateUpdate(dt: number) {
    super.lateUpdate(dt)
    for (const go of this.children) {
      if (GuiObject.canUpdate(go, 'lateUpdate')) {
        go.lateUpdate(dt)
      }
    }
  }

  // ============================================================
  //  Draw methods
  // ============================================================
  public drawGUI(ctx: CanvasRenderingContext2D) {
    if (!this._dirty) return

    const { showBackdrop } = this.guiSetProps

    ctx.save()
    ctx.clearRect(0, 0, gl.game.width, gl.game.height)

    // TODO: maybe move backdrop handling to a separate guiLayer/class
    if (showBackdrop) {
      ctx.fillStyle = 'rgba(0, 0, 0, .55)'
      ctx.fillRect(0, 0, gl.game.width, gl.game.height)
    }

    for (const go of this.children) {
      if (GuiObject.canDraw(go)) {
        go.drawGUI(ctx, true)
      }
    }

    ctx.restore()
  }
}
