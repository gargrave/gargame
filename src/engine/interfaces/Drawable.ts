export default interface Drawable {
  draw: (ctx: CanvasRenderingContext2D, dt: number) => void
}
