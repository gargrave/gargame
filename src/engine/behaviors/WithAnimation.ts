import { Behavior } from '../interfaces'
import { Animation } from '../rendering'

export default class WithAnimation implements Behavior {
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

  setCurrent(next: string) {
    if (this.currentAnimationKey === next) return

    this.currentAnimationKey = next
    this.anim =
      this.animations[this.currentAnimationKey] ||
      this.animations[this.defaultAnimationKey]

    this.anim.start()
  }

  update(dt: number) {
    this.anim.update(dt)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.anim.draw(ctx)
  }
}
