import { Input } from '../input/Input'
import { Assets } from '../resources/Assets'
import { Loader } from '../resources/Loader'
import { Sound } from '../sound/Sound'
import { getNewCanvasContext, initGameWrapper } from '../utils/domHelpers'
import { Log } from '../utils/Log'
import { Globals as gl } from '../Globals'

import { Scene } from './Scene'

const ENV = process.env.NODE_ENV

export type CollisionMap = {
  [key: string]: {
    collidesWith?: string[]
  }
}

export type GameConfig = {
  collisionGroups?: CollisionMap
  debug?: boolean
  height?: number
  initialScene: string
  scenes: {
    [key: string]: typeof Scene
  }
  width?: number
}

export class Game {
  private config

  private bgCtx!: CanvasRenderingContext2D
  private mainCtx!: CanvasRenderingContext2D
  private guiCtx!: CanvasRenderingContext2D

  private scene!: Scene
  private nextScene?: string
  private sceneHasTransitioned = false

  private running = false
  private lastUpdate = 0

  get collGroups(): CollisionMap { return this.config.collisionGroups } // prettier-ignore

  constructor(config: GameConfig) {
    Log.info('Initializing game...')

    this.config = config
    this.setupDOM()

    Input.init()
    Sound.init()

    gl.debug = config.debug || false
    gl.game = this

    if (ENV === 'development') {
      Log.info('Adding "gg" helper to window for development mode!')
      // eslint-disable-next-line
      ;(window as any).gg = {
        assets: Assets.allAssets,
        debug: d => (gl.debug = d),
        game: this,
      }
    }
  }

  private setupDOM() {
    const gameWrapper = initGameWrapper()
    const w = this.config.width
    const h = this.config.height
    const bgConfig = { id: 'bg', styles: { background: '#666' } }
    this.bgCtx = getNewCanvasContext(gameWrapper, w, h, bgConfig)
    this.mainCtx = getNewCanvasContext(gameWrapper, w, h, { id: 'main' })
    this.guiCtx = getNewCanvasContext(gameWrapper, w, h, { id: 'gui' })
  }

  private _instantiateSceneFromKey(key: string): Scene {
    const map = this.config.scenes
    if (key in map) {
      const sceneCtor = map[key]
      return new sceneCtor(this) as Scene
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
      await loader.loadAll()
      this.gotoScene(this.config.initialScene)
      return true
    } catch (e) {
      return false
    }
  }

  public mainLoop = () => {
    const now = Date.now()
    const dt = now - (this.lastUpdate || now)
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
    Input.earlyUpdate(dt)
    this._handlePendingSceneTransition()
    this.scene.earlyUpdate(dt)
  }

  public update(dt: number) {
    Input.update(dt)
    this.scene.update(dt)
  }

  public lateUpdate(dt: number) {
    Input.lateUpdate(dt)
    this.scene.lateUpdate(dt)
    this.sceneHasTransitioned = false
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.config.width, this.config.height)
    this.scene.draw(ctx)
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    if (this.sceneHasTransitioned) {
      ctx.clearRect(0, 0, this.config.width, this.config.height)
    }

    this.scene.drawGUI(ctx)
  }
}
