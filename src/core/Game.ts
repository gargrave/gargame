export default class Game {
  private running = false
  private lastUpdate = 0
  private ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  mainLoop = () => {
    const now = Date.now()
    const dt = now - this.lastUpdate
    this.lastUpdate = now

    this.update(dt)
    this.render(this.ctx, dt)

    if (this.running) {
      requestAnimationFrame(this.mainLoop)
    }
  }

  start() {
    console.log('=== STARTING GAME LOOP ===')
    this.running = true
    requestAnimationFrame(this.mainLoop)
  }

  stop() {
    console.log('=== STOPPING GAME LOOP ===')
    this.running = false
  }

  update(dt: number) {
    console.log(`Game -> update(): ${dt}`)
  }

  render(ctx: CanvasRenderingContext2D, dt: number) {
    console.log(`Game -> render(): ${dt}`)
    ctx.fillStyle = 'rgb(255, 0, 0)'
    ctx.fillRect(10, 10, 24, 24)
  }
}
