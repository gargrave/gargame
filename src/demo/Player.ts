import { Animation, Assets, Entity, Keyboard, Sprite, Texture } from '../engine'

const D = 68
const A = 65
const W = 87
const S = 83

export default class Player extends Entity {
  private sprite: Sprite
  private anim: Animation

  constructor() {
    super()
    this.speed = 300

    // const texture = new Texture('assets/player.png')
    this.sprite = new Sprite(this, {
      src: Assets.texture('player'),
      height: 66,
      width: 34,
    })

    const texture = Assets.texture('player')
    const height = 66
    const width = 34
    const frameDuration = 100
    // TODO: entities should be able to auto-update any arbitrary number of "children"
    this.anim = new Animation(this, {
      firstFrame: 1,
      frameDuration,
      height,
      lastFrame: 2,
      src: texture,
      width,
    })
  }

  update(dt: number) {
    super.update(dt)

    const vel = { x: 0, y: 0 }
    const i = window.input as Keyboard
    if (i.isDown(D)) {
      vel.x += 1
    }
    if (i.isDown(A)) {
      vel.x -= 1
    }

    if (i.isDown(W)) {
      vel.y -= 1
    }
    if (i.isDown(S)) {
      vel.y += 1
    }

    this.pos.translate(vel.x * this.speed * dt, vel.y * this.speed * dt)
    this.anim.update(dt)
  }

  draw(ctx: CanvasRenderingContext2D, dt: number) {
    super.draw(ctx, dt)
    // this.sprite.draw(ctx, dt)
    this.anim.draw(ctx, dt)
    // ctx.fillStyle = 'rgb(255, 0, 0)'
    // ctx.fillRect(this.pos.x, this.pos.y, 48, 48)
    // ctx.clearRect(this.prevPos.x, this.prevPos.y, 34, 66)
    // ctx.drawImage(this.sprite, 0, 0, 34, 66, this.pos.x, this.pos.y, 34, 66)
  }
}
