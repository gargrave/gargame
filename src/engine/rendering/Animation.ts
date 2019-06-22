import { Sprite } from '.'
import { Entity } from '../core'
import { Drawable, Updateable } from '../interfaces'
import { Texture } from '../resources'
import { wrap } from '../utils'
import { CurriedNumberFn } from '../utils/mathHelpers'

export type AnimationConfig = {
  firstFrame: number
  frameDuration?: number
  height: number
  lastFrame?: number
  texture: Texture
  width: number
}

export default class Animation implements Drawable, Updateable {
  private frames: Sprite[] = []
  private currentFrame: number
  private currentFrameTime: number = 0
  private wrapFrames: CurriedNumberFn

  constructor(host: Entity, private config: AnimationConfig) {
    this.currentFrame = config.firstFrame

    const baseConfig = {
      height: config.height,
      texture: config.texture,
      width: config.width,
    }

    const start = { x: config.width * config.firstFrame, y: 0 }
    const lastFrame = config.lastFrame || config.firstFrame
    const range = lastFrame - config.firstFrame + 1
    this.wrapFrames = wrap(0, range - 1) as CurriedNumberFn

    for (let i = 0; i < range; i += 1) {
      this.frames.push(
        new Sprite(host, {
          ...baseConfig,
          x: start.x + config.width * i,
          y: start.y,
        }),
      )
    }
  }

  private incrementFrame() {
    this.currentFrame = this.wrapFrames(this.currentFrame + 1)
    this.currentFrameTime = 0
  }

  public start() {
    this.currentFrame = 0
    this.currentFrameTime = 0
  }

  public update(dt: number) {
    if (!this.config.frameDuration) return

    this.currentFrameTime += dt
    if (this.currentFrameTime >= this.config.frameDuration) {
      this.incrementFrame()
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.frames[this.currentFrame].draw(ctx)
  }
}
