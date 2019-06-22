import { Entity, GuiObject, Loader } from '.'
import { Keyboard } from '../input'
import { Log } from '../utils'

export default class Game {
  private running = false
  private lastUpdate = 0
  private ctx: CanvasRenderingContext2D
  private entities: Entity[] = []
  private guiObjects: GuiObject[] = []
  private input: Keyboard

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx

    Log.info('Initializing game...')
    this.input = new Keyboard()
    ;(window as any).input = this.input // eslint-disable-line
  }

  async load(assets) {
    const loader = new Loader(assets)
    try {
      Log.info('Game -> Beginning load()')
      await loader.loadAll()
      Log.info('Game -> Successful load()')
      return true
    } catch (e) {
      Log.info('Game -> Failure on load()')
      return false
    }
  }

  mainLoop = () => {
    const now = Date.now()
    const dt = now - this.lastUpdate
    this.lastUpdate = now

    this.earlyUpdate(dt)
    this.update(dt)
    this.draw(this.ctx)
    this.drawGUI(this.ctx) // TODO: this needs to be a separate canvas
    this.lateUpdate(dt)

    if (this.running) {
      requestAnimationFrame(this.mainLoop)
    }
  }

  start() {
    if (this.running) return
    Log.info('=== STARTING GAME LOOP ===')
    this.running = true
    requestAnimationFrame(this.mainLoop)
  }

  stop() {
    if (!this.running) return
    Log.info('=== STOPPING GAME LOOP ===')
    this.running = false
  }

  add(e: Entity) {
    this.entities.push(e)
  }

  addGuiObject(g: GuiObject) {
    this.guiObjects.push(g)
  }

  earlyUpdate(dt: number) {
    this.input.earlyUpdate(dt)
    for (const e of this.entities) e.earlyUpdate && e.earlyUpdate(dt)
    for (const g of this.guiObjects) g.earlyUpdate && g.earlyUpdate(dt)
  }

  update(dt: number) {
    this.input.update(dt)
    for (const e of this.entities) e.update(dt)
    for (const g of this.guiObjects) g.update(dt)
  }

  lateUpdate(dt: number) {
    this.input.lateUpdate(dt)
    for (const e of this.entities) e.lateUpdate && e.lateUpdate(dt)
    for (const g of this.guiObjects) g.lateUpdate && g.lateUpdate(dt)
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const e of this.entities) {
      e.draw(ctx)
    }
  }

  drawGUI(ctx: CanvasRenderingContext2D) {
    for (const g of this.guiObjects) {
      g.drawGUI(ctx)
    }
  }
}
