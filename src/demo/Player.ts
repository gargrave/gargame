import {
  Animation,
  Assets,
  Entity,
  Globals as gl,
  WithAnimation,
} from '../engine'

const D = 68
const A = 65
const W = 87
const S = 83

export default class Player extends Entity {
  private animator: WithAnimation

  constructor() {
    super({
      height: 66,
      speed: 300,
      width: 34,
      x: 100,
      y: 100,
    })

    const h = this._height
    const w = this._width
    const texture = Assets.texture('player')
    const frameDuration = 100

    const animations = {
      fall: new Animation(this, {
        firstFrame: 3,
        height: h,
        texture: texture,
        width: w,
      }),
      idle: new Animation(this, {
        firstFrame: 0,
        height: h,
        texture: texture,
        width: w,
      }),
      run: new Animation(this, {
        firstFrame: 1,
        frameDuration,
        height: h,
        lastFrame: 2,
        texture: texture,
        width: w,
      }),
    }

    this.animator = new WithAnimation(animations, 'idle')
    this.addBehavior(this.animator)
  }

  public update(dt: number) {
    super.update(dt)

    const vel = { x: 0, y: 0 }
    const i = gl.input

    if (i.isDown(D)) vel.x += 1
    if (i.isDown(A)) vel.x -= 1

    if (i.isDown(W)) vel.y -= 1
    if (i.isDown(S)) vel.y += 1

    if (vel.y !== 0) {
      this.animator.setCurrent('fall')
    } else if (vel.x !== 0) {
      this.animator.setCurrent('run')
    } else {
      this.animator.setCurrent('idle')
    }

    const speed = this.speed * (dt / 1000.0)
    this.move(vel.x * speed, vel.y * speed)
  }
}
