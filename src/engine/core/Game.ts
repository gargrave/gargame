import { Entity } from '.'
import { Keyboard } from '../input'

export default class Game {
  private running = false
  private lastUpdate = 0
  private ctx: CanvasRenderingContext2D
  private entities: Entity[] = []
  private input: Keyboard

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    console.log('Initializing game...')
    this.input = new Keyboard()
    window.input = this.input
  }

  mainLoop = () => {
    const now = Date.now()
    const dt = now - this.lastUpdate
    this.lastUpdate = now

    this.update(dt / 1000.0)
    this.render(this.ctx, dt)

    if (this.running) {
      requestAnimationFrame(this.mainLoop)
    }
  }

  start() {
    if (this.running) return
    console.log('=== STARTING GAME LOOP ===')
    this.running = true
    requestAnimationFrame(this.mainLoop)
  }

  stop() {
    if (!this.running) return
    console.log('=== STOPPING GAME LOOP ===')
    this.running = false
  }

  add(e: Entity) {
    this.entities.push(e)
  }

  update(dt: number) {
    // console.log(`Game -> update(): ${dt}`)
    this.input.update(dt)
    for (const e of this.entities) {
      e.update(dt)
    }

    this.input.lateUpdate(dt)
    for (const e of this.entities) {
      e.lateUpdate(dt)
    }
  }

  render(ctx: CanvasRenderingContext2D, dt: number) {
    ctx.clearRect(0, 0, 640, 480)
    // console.log(`Game -> render(): ${dt}`)
    for (const e of this.entities) {
      e.draw(ctx, dt)
    }
  }
}
