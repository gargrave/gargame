import { Entity, GuiObject, Loader } from '.'
import { Keyboard } from '../input'
import { getNewCanvasContext, Log } from '../utils'

export type GameConfig = {
  height?: number
  width?: number
}

const defaultGameConfig: GameConfig = Object.freeze({
  height: 480,
  width: 640,
})

export default class Game {
  private config

  private bgCtx!: CanvasRenderingContext2D
  private mainCtx!: CanvasRenderingContext2D
  private guiCtx!: CanvasRenderingContext2D

  private running = false
  private lastUpdate = 0
  private entities: Entity[] = []
  private guiObjects: GuiObject[] = []
  private input: Keyboard

  constructor(config: GameConfig) {
    Log.info('Initializing game...')

    this.config = {
      ...defaultGameConfig,
      ...config,
    }

    this.setupDOM()
    this.input = new Keyboard()
    ;(window as any).input = this.input // eslint-disable-line
  }

  private setupDOM() {
    const gameWrapper = document.createElement('div')
    gameWrapper.style.margin = 'auto'
    gameWrapper.style.marginTop = '56px'

    const config = {
      height: this.config.height,
      styles: {
        background: 'transparent',
      },
      width: this.config.width,
    }
    const bgConfig = {
      ...config,
      styles: {
        ...config.styles,
        background: 'white',
      },
    }
    this.bgCtx = getNewCanvasContext(gameWrapper, bgConfig, 'bg')
    this.mainCtx = getNewCanvasContext(gameWrapper, config, 'main')
    this.guiCtx = getNewCanvasContext(gameWrapper, config, 'gui')

    document.body.appendChild(gameWrapper)
  }

  public async load(assets) {
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
    this.draw(this.mainCtx)
    this.drawGUI(this.guiCtx)
    this.lateUpdate(dt)

    if (this.running) {
      requestAnimationFrame(this.mainLoop)
    }
  }

  public start() {
    if (this.running) return
    Log.info('=== STARTING GAME LOOP ===')
    this.running = true
    requestAnimationFrame(this.mainLoop)
  }

  public stop() {
    if (!this.running) return
    Log.info('=== STOPPING GAME LOOP ===')
    this.running = false
  }

  public add(e: Entity) {
    this.entities.push(e)
  }

  public addGuiObject(g: GuiObject) {
    this.guiObjects.push(g)
  }

  public earlyUpdate(dt: number) {
    this.input.earlyUpdate(dt)
    for (const e of this.entities) e.earlyUpdate && e.earlyUpdate(dt)
    for (const g of this.guiObjects) g.earlyUpdate && g.earlyUpdate(dt)
  }

  public update(dt: number) {
    this.input.update(dt)
    for (const e of this.entities) e.update(dt)
    for (const g of this.guiObjects) g.update(dt)
  }

  public lateUpdate(dt: number) {
    this.input.lateUpdate(dt)
    for (const e of this.entities) e.lateUpdate && e.lateUpdate(dt)
    for (const g of this.guiObjects) g.lateUpdate && g.lateUpdate(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (const e of this.entities) {
      e.draw(ctx)
    }
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    for (const g of this.guiObjects) {
      g.drawGUI(ctx)
    }
  }
}
