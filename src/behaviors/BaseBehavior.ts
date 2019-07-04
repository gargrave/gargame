import { GameObject } from '../core/GameObject'
import { Behavior } from '../interfaces/Behavior'

export abstract class BaseBehavior implements Behavior {
  protected constructor(protected host: GameObject) {}

  public update(dt: number) {}

  public draw(ctx: CanvasRenderingContext2D) {}
}
