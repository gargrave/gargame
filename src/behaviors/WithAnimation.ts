import { Behavior } from '../interfaces/Behavior'
import { Animation } from '../rendering/Animation'

export class WithAnimation implements Behavior {
  private animations: { [key: string]: Animation }
  private anim: Animation
  private currentAnimationKey: string
  private defaultAnimationKey: string

  constructor(
    animations: { [key: string]: Animation },
    defaultAnimationKey: string,
  ) {
    this.animations = animations
    // TODO: throw an error if defaultAnimationKey does not exist in animations
    this.currentAnimationKey = defaultAnimationKey
    this.defaultAnimationKey = defaultAnimationKey
    this.anim = animations[defaultAnimationKey]
  }

  public setCurrent(next: string) {
    if (this.currentAnimationKey === next) return

    this.currentAnimationKey = next
    this.anim =
      this.animations[this.currentAnimationKey] ||
      this.animations[this.defaultAnimationKey]

    this.anim.start()
  }

  public update(dt: number) {
    this.anim.update(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.anim.draw(ctx)
  }
}
