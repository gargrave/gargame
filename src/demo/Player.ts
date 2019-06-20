import { Assets, Entity, Keyboard, Sprite, Texture } from '../engine'

const D = 68
const A = 65
const W = 87
const S = 83

export default class Player extends Entity {
  private sprite: Sprite

  constructor() {
    super()
    this.speed = 300

    // const texture = new Texture('assets/player.png')
    this.sprite = new Sprite(this, {
      src: Assets.texture('player'),
      height: 66,
      width: 34,
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
  }

  draw(ctx: CanvasRenderingContext2D, dt: number) {
    super.draw(ctx, dt)
    this.sprite.draw(ctx, dt)
    // ctx.fillStyle = 'rgb(255, 0, 0)'
    // ctx.fillRect(this.pos.x, this.pos.y, 48, 48)
    // ctx.clearRect(this.prevPos.x, this.prevPos.y, 34, 66)
    // ctx.drawImage(this.sprite, 0, 0, 34, 66, this.pos.x, this.pos.y, 34, 66)
  }
}
