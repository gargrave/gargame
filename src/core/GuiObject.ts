import { get } from '@gargrave/growbag'
import { Log } from '../utils/Log'

import { DrawableGUI } from '../interfaces/DrawableGUI'

import { GameObject, GameObjectConfig } from './GameObject'

export abstract class GuiObject extends GameObject implements DrawableGUI {
  /**
   * Returns whether the provided GuiObject can update based on the provided update
   * function name. Note that this is safe, in that if anything is null/undefined
   * (even the GuiObject instance itself), it will simply return false.
   * @param go
   * @param updateFn
   */
  public static canUpdate(go: GuiObject, updateFn: string) {
    return !!go && get(go, updateFn)
  }

  /**
   * Returns whether the provided GuiObject is in a state that can be drawn.
   * @param go
   */
  public static canDraw(go: GuiObject) {
    return !!go && get(go, 'isActive') && get(go, 'isVisible')
  }

  protected constructor(config: GameObjectConfig = {}) {
    super(config)
  }

  public show() {
    Log.info(`"show()" not implemented in ${this.constructor.name}`)
  }

  public hide() {
    Log.info(`"hide()" not implemented in ${this.constructor.name}`)
  }

  public drawGUI(ctx: CanvasRenderingContext2D, forceDraw: boolean = false) {
    Log.info(`"drawGUI()" not implemented in ${this.constructor.name}`)
  }
}
