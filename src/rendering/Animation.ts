import { mergeWhereDefined, wrap } from '@gargrave/growbag'

import { Entity } from '../core/Entity'
import { Drawable } from '../interfaces/Drawable'
import { Updateable } from '../interfaces/Updateable'
import { Texture } from '../resources/Texture'

import { Sprite } from './Sprite'

export type AnimationCallbacks = {
  [key: number]: () => void
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
    ) as Props

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

  private incrementFrame() {
    this.currentFrame = this.wrapFrames(this.currentFrame + 1)
    this.currentFrameTime = 0
  }

  public start() {
    this.currentFrame = 0
    this.currentFrameTime = 0
  }

  public update(dt: number) {
    if (!this.props.frameDuration) return

    this.currentFrameTime += dt
    if (this.currentFrameTime >= this.props.frameDuration) {
      this.incrementFrame()
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.frames[this.currentFrame].draw(ctx)
  }
}
