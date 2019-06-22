import { Sprite } from '.'
import { Entity } from '../core'
import { Drawable, Updateable } from '../interfaces'
import { Texture } from '../resources'

// TODO: implement wrap()!
const wrap = (min, max, val) => {
  if (val < min) return max
  if (val > max) return min
  return val
}

export type AnimationConfig = {
  firstFrame: number
  frameDuration?: number
  height: number
  lastFrame?: number
  src: Texture
  width: number
}

export default class Animation implements Drawable, Updateable {
  private frames: Sprite[] = []
  private currentFrame: number
  private currentFrameTime: number = 0

  constructor(private host: Entity, private config: AnimationConfig) {
    this.currentFrame = config.firstFrame

    const baseConfig = {
      height: config.height,
      src: config.src,
      width: config.width,
    }
    const start = { x: config.width * config.firstFrame, y: 0 }
    const lastFrame = config.lastFrame || config.firstFrame
    const range = lastFrame - config.firstFrame + 1

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

  start() {
    this.currentFrame = 0
    this.currentFrameTime = 0
  }

  incrementFrame() {
    this.currentFrame = wrap(0, this.frames.length - 1, this.currentFrame + 1)
    this.currentFrameTime = 0
  }

  update(dt: number) {
    if (!this.config.frameDuration) return

    this.currentFrameTime += dt
    if (this.currentFrameTime >= this.config.frameDuration) {
      this.incrementFrame()
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.frames[this.currentFrame].draw(ctx)
  }
}
