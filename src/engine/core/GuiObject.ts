import { DrawableGUI } from '../interfaces'
import GameObject, { GameObjectConfig } from './GameObject'

export default abstract class GuiObject extends GameObject
  implements DrawableGUI {
  constructor(config: GameObjectConfig = {}) {
    super(config)
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {}
}
