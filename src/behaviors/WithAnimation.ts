import { Behavior } from '../interfaces/Behavior'
import { Animation } from '../rendering/Animation'
import { Log } from '../utils'

// eslint-disable-next-line @typescript-eslint/camelcase
const err__invalidDefault = (key: string): string =>
  `WithAnimation :: defaultAnimationKey ${key} does not exist.`

export class WithAnimation implements Behavior {
  private readonly animations: { [key: string]: Animation }
  private readonly _defaultAnimationKey: string

  private anim: Animation
  private _currentAnimationKey: string

  get defaultAnimationKey() { return this._defaultAnimationKey } // prettier-ignore
  get currentAnimationKey() { return this._currentAnimationKey } // prettier-ignore

  constructor(
    animations: { [key: string]: Animation },
    defaultAnimationKey: string,
  ) {
    // ensure that we have a valid a default key, and if not, just use the first one from the list
    if (defaultAnimationKey in animations) {
      this._defaultAnimationKey = defaultAnimationKey
    } else {
      Log.warn(err__invalidDefault(defaultAnimationKey))
      this._defaultAnimationKey = Object.keys(animations)[0]
    }

    this.animations = animations
    this._currentAnimationKey = this._defaultAnimationKey
    this.anim = animations[this._currentAnimationKey]
  }

  public setCurrent(next: string): void {
    if (this._currentAnimationKey === next) return

    this._currentAnimationKey = next
    this.anim =
      this.animations[this._currentAnimationKey] ||
      this.animations[this._defaultAnimationKey]

    this.anim.start()
  }

  public update(dt: number): void {
    this.anim.update(dt)
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.anim.draw(ctx)
  }
}
