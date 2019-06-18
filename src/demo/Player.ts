import { Entity, Keyboard } from '../engine'

const D = 68
const A = 65
const W = 87
const S = 83

export default class Player extends Entity {
  private pos = { x: 10, y: 10 }

  constructor() {
    super()
    this.speed = 200
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

    this.pos = {
      x: this.pos.x + vel.x * this.speed * dt,
      y: this.pos.y + vel.y * this.speed * dt,
    }
  }

  draw(ctx: CanvasRenderingContext2D, dt: number) {
    super.draw(ctx, dt)
    ctx.fillStyle = 'rgb(255, 0, 0)'
    ctx.fillRect(this.pos.x, this.pos.y, 24, 24)
  }
}
