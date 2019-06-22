import { Keyboard } from '../input'
import { getNewCanvasContext, Log } from '../utils'

import Loader from './Loader'
import Scene from './Scene'
import gl from '../Globals'

export type GameConfig = {
  height?: number
  initialScene: string
  scenes: {
    [key: string]: typeof Scene
  }
  width?: number
}

export default class Game {
  private config

  private bgCtx!: CanvasRenderingContext2D
  private mainCtx!: CanvasRenderingContext2D
  private guiCtx!: CanvasRenderingContext2D

  private scene: Scene
  private nextScene?: string
  private sceneHasTransitioned = false

  private running = false
  private lastUpdate = 0
  private input: Keyboard

  constructor(config: GameConfig) {
    Log.info('Initializing game...')

    this.config = config
    this.setupDOM()
    this.input = new Keyboard()
    ;(window as any).input = this.input // eslint-disable-line

    gl.game = this
    gl.input = this.input
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

  private _instantiateSceneFromKey(key: string): Scene {
    const map = this.config.scenes
    if (key in map) {
      const sceneCtor = map[key]
      return new sceneCtor() as Scene
    }

    throw new Error(`Scene '${key} does not exist.`)
  }

  private _handlePendingSceneTransition() {
    if (!this.nextScene) return

    if (this.scene) {
      this.scene.exit()
    }

    this.scene = this._instantiateSceneFromKey(this.nextScene)
    this.scene.enter()
    this.nextScene = undefined
    this.sceneHasTransitioned = true
  }

  public async load(assets) {
    const loader = new Loader(assets)
    try {
      Log.info('Game -> Beginning load()')
      await loader.loadAll()
      Log.info('Game -> Successful load()')
      this.gotoScene(this.config.initialScene)
      return true
    } catch (e) {
      Log.info('Game -> Failure on load()')
      return false
    }
  }

  public mainLoop = () => {
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

  public gotoScene(scene: string) {
    this.nextScene = scene
  }

  public earlyUpdate(dt: number) {
    this._handlePendingSceneTransition()
    this.scene.earlyUpdate(dt)
  }

  public update(dt: number) {
    this.input.update(dt)
    this.scene.update(dt)
  }

  public lateUpdate(dt: number) {
    this.input.lateUpdate(dt)
    this.scene.lateUpdate(dt)
    this.sceneHasTransitioned = false
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.sceneHasTransitioned) {
      ctx.clearRect(0, 0, this.config.width, this.config.height)
    }

    this.scene.draw(ctx)
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    if (this.sceneHasTransitioned) {
      ctx.clearRect(0, 0, this.config.width, this.config.height)
    }

    this.scene.drawGUI(ctx)
  }
}
