import { get, mergeWhereDefined, wrap } from '@gargrave/growbag'

import { Entity } from '../core/Entity'
import { Drawable } from '../interfaces/Drawable'
import { Updateable } from '../interfaces/Updateable'
import { Texture } from '../resources/Texture'

import { Sprite } from './Sprite'

export type AnimationCallbacks = {
  start?: (frame: number) => void
  [key: number]: (frame: number) => void
}

type OptionalProps = {
  callbacks: AnimationCallbacks
  frameDuration: number
  lastFrame: number
}

type RequiredProps = {
  firstFrame: number
  height: number
  texture: Texture
  width: number
}

type Props = OptionalProps & RequiredProps
export type AnimationProps = RequiredProps & Partial<OptionalProps>

const DEFAULT_PROPS: OptionalProps = Object.freeze({
  callbacks: {},
  frameDuration: 0,
  lastFrame: 0,
})

export class Animation implements Drawable, Updateable {
  private readonly wrapFrames: (x: number) => number

  private props: Props
  private frames: Sprite[] = []
  private currentFrame: number
  private currentFrameTime: number = 0

  constructor(private host: Entity, props: AnimationProps) {
    this.props = mergeWhereDefined(
      DEFAULT_PROPS,
      { lastFrame: props.firstFrame },
      props,
    )

    this.currentFrame = props.firstFrame

    const baseConfig = {
      height: props.height,
      texture: props.texture,
      width: props.width,
    }

    const start = { x: props.width * props.firstFrame, y: 0 }
    const lastFrame = props.lastFrame || props.firstFrame
    const range = lastFrame - props.firstFrame + 1

    for (let i = 0; i < range; i += 1) {
      this.frames.push(
        new Sprite(host, {
          ...baseConfig,
          x: start.x + props.width * i,
          y: start.y,
        }),
      )
    }

    this.wrapFrames = (frame: number) => wrap(0, range - 1, frame)
  }

  /**
   * Attempts to call a callback for the current frame. Note that callbacks
   * are not required for ANY frames, so if no callbacks are defined, this will
   * simply do nothing.
   */
  private callCurrentFrameCallback(key: string | number) {
    const cb = get(this, ['props', 'callbacks', `${key}`])
    if (typeof cb === 'function') {
      cb(key)
    }
  }

  /**
   * Advances the Animation to the next frame, or handles "end of animation"
   * behavior if the last frame has been reached.
   * This will also call any callbacks associated with the new current frame.
   */
  private incrementFrame() {
    this.currentFrame = this.wrapFrames(this.currentFrame + 1)
    this.currentFrameTime = 0
    this.callCurrentFrameCallback(this.currentFrame)
  }

  /**
   * Resets the Animation and starts playing from the first frame.
   * Also triggers the special "start" frame callback when defined.
   */
  public start() {
    this.currentFrame = 0
    this.currentFrameTime = 0
    this.callCurrentFrameCallback('start')
  }

  public update(dt: number) {
    if (!this.props.frameDuration) return

    this.currentFrameTime += dt
    if (this.currentFrameTime >= this.props.frameDuration) {
      this.incrementFrame()
    }
  }

  /**
   * Draws the Sprite associated with the current frame
   * @param ctx
   */
  public draw(ctx: CanvasRenderingContext2D) {
    this.frames[this.currentFrame].draw(ctx)
  }
}
