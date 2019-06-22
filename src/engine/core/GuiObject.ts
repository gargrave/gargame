import { GameObject } from '.'
import { DrawableGUI } from '../interfaces'

export default abstract class GuiObject extends GameObject
  implements DrawableGUI {
  public drawGUI(ctx: CanvasRenderingContext2D) {}
}
