import { wrap } from '@gargrave/growbag'

import { Entity } from '../core/Entity'
import { Drawable } from '../interfaces/Drawable'
import { Updateable } from '../interfaces/Updateable'
import { Texture } from '../resources/Texture'

import { Sprite } from './Sprite'

export type AnimationConfig = {
  firstFrame: number
  frameDuration?: number
  height: number
  lastFrame?: number
  texture: Texture
  width: number
}

export class Animation implements Drawable, Updateable {
  private readonly wrapFrames: (x: number) => number

  private frames: Sprite[] = []
  private currentFrame: number
  private currentFrameTime: number = 0

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
    for (let i = 0; i < range; i += 1) {
      this.frames.push(
        new Sprite(host, {
          ...baseConfig,
          x: start.x + config.width * i,
          y: start.y,
        }),
      )
    }

    this.wrapFrames = (frame: number) => wrap(0, range - 1, frame)
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
