import { Rect } from '../math/Rect'

export class Primitive {
  public static Stroke = {
    rect(
      ctx: CanvasRenderingContext2D,
      color: string,
      bounds: Rect,
      offset: number = 0,
    ) {
      ctx.strokeStyle = color
      ctx.strokeRect(
        bounds.x + offset,
        bounds.y + offset,
        bounds.w - offset * 2,
        bounds.h - offset * 2,
      )
    },
  }

  public static Fill = {
    rect(
      ctx: CanvasRenderingContext2D,
      color: string,
      bounds: Rect,
      offset: number = 0,
    ) {
      ctx.fillStyle = color
      ctx.fillRect(
        bounds.x + offset,
        bounds.y + offset,
        bounds.w - offset * 2,
        bounds.h - offset * 2,
      )
    },
  }
}
