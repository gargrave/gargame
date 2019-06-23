export interface Drawable {
  draw: (ctx: CanvasRenderingContext2D) => void
  debugDraw?: (ctx: CanvasRenderingContext2D) => void
}
