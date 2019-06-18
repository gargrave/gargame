export default class Game {
  private running = false
  private lastUpdate = 0

  mainLoop = () => {
    const now = Date.now()
    const dt = now - this.lastUpdate
    this.lastUpdate = now

    this.update(dt)
    this.render(dt)

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

  render(dt: number) {
    console.log(`Game -> render(): ${dt}`)
  }
}
