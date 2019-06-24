import { DrawableGUI } from '../interfaces/DrawableGUI'

import { GameObject, GameObjectConfig } from './GameObject'

export abstract class GuiObject extends GameObject implements DrawableGUI {
  constructor(config: GameObjectConfig = {}) {
    super(config)
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {}
}
