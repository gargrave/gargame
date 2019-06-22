import { Animation, Assets, Entity, Keyboard, WithAnimation } from '../engine'

const D = 68
const A = 65
const W = 87
const S = 83

export default class Player extends Entity {
  private animator: WithAnimation

  constructor() {
    super()
    this.speed = 300

    const texture = Assets.texture('player')
    const height = 66
    const width = 34
    const frameDuration = 100
    const animations = {
      fall: new Animation(this, {
        firstFrame: 3,
        height,
        src: texture,
        width,
      }),
      idle: new Animation(this, {
        firstFrame: 0,
        height,
        src: texture,
        width,
      }),
      run: new Animation(this, {
        firstFrame: 1,
        frameDuration,
        height,
        lastFrame: 2,
        src: texture,
        width,
      }),
    }
    this.animator = new WithAnimation(animations, 'idle')
    this.addBehavior(this.animator)
  }

  update(dt: number) {
    super.update(dt)

    const vel = { x: 0, y: 0 }
    const i = (window as any).input as Keyboard // eslint-disable-line

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
    this.pos.translate(vel.x * speed, vel.y * speed)
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx)
    // ctx.fillStyle = 'rgb(255, 0, 0)'
    // ctx.fillRect(this.pos.x, this.pos.y, 48, 48)
    // ctx.clearRect(this.prevPos.x, this.prevPos.y, 34, 66)
    // ctx.drawImage(this.sprite, 0, 0, 34, 66, this.pos.x, this.pos.y, 34, 66)
  }
}
