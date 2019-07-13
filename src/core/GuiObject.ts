import { Log } from '../utils/Log'

import { DrawableGUI } from '../interfaces/DrawableGUI'

import { GameObject, GameObjectProps } from './GameObject'

export abstract class GuiObject<PropsShape> extends GameObject<PropsShape>
  implements DrawableGUI {
  protected constructor(props: GameObjectProps = {}) {
    super(props)
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
