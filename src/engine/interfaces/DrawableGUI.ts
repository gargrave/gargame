export default interface DrawableGUI {
  readonly dirty: boolean
  drawGUI: (ctx: CanvasRenderingContext2D) => void
}
