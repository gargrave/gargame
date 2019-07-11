import { Input } from '../input/Input'
import { Assets } from '../resources/Assets'
import { Loader } from '../resources/Loader'
import { Sound } from '../sound/Sound'
import { getNewCanvasContext, initGameWrapper } from '../utils/domHelpers'
import { Log } from '../utils/Log'
import { Globals as gl } from '../Globals'

import { Scene } from './Scene'
import { mergeWhereDefined } from '@gargrave/growbag'

const ENV = process.env.NODE_ENV

export type CollisionMap = {
  [key: string]: { collidesWith?: string[] }
}

type OptionalProps = {
  collisionGroups: CollisionMap
  debug: boolean
  enableSound: boolean
  height: number
  width: number
}

type RequiredProps = {
  initialScene: string
  scenes: { [key: string]: typeof Scene }
}

type Props = RequiredProps & OptionalProps
export type GameProps = RequiredProps & Partial<OptionalProps>

const DEFAULT_PROPS: OptionalProps = Object.freeze({
  collisionGroups: {},
  debug: false,
  enableSound: true,
  height: 640,
  width: 480,
})

export class Game {
  private props: Props

  private bgCtx!: CanvasRenderingContext2D
  private mainCtx!: CanvasRenderingContext2D
  private guiCtx!: CanvasRenderingContext2D

  private scene!: Scene
  private nextScene?: string
  private sceneHasTransitioned = false

  private running = false
  private lastUpdate = 0

  get collGroups(): CollisionMap { return this.props.collisionGroups } // prettier-ignore

  constructor(props: GameProps) {
    Log.info('Initializing game...')

    this.props = mergeWhereDefined(DEFAULT_PROPS, props) as Props
    const { enableSound } = this.props

    this.setupDOM()

    Input.init()
    if (enableSound) {
      Sound.init()
    }

    gl.debug = props.debug || false
    gl.game = this
    gl.settings = this.props

    if (ENV === 'development') {
      Log.info('Adding "gg" helper to window for development mode!')
      // eslint-disable-next-line
      ;(window as any).gg = {
        assets: Assets.allAssets,
        debug: d => (gl.debug = d), // toggle debug mode from console
        game: this,
        settings: this.props,
      }
    }
  }

  private setupDOM() {
    const gameWrapper = initGameWrapper()
    const w = this.props.width
    const h = this.props.height
    const bgConfig = { id: 'bg', styles: { background: '#666' } }
    this.bgCtx = getNewCanvasContext(gameWrapper, w, h, bgConfig)
    this.mainCtx = getNewCanvasContext(gameWrapper, w, h, { id: 'main' })
    this.guiCtx = getNewCanvasContext(gameWrapper, w, h, { id: 'gui' })
  }

  private _instantiateSceneFromKey(key: string): Scene {
    const map = this.props.scenes
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
      this.gotoScene(this.props.initialScene)
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
    ctx.clearRect(0, 0, this.props.width, this.props.height)
    this.scene.draw(ctx)
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    if (this.sceneHasTransitioned) {
      ctx.clearRect(0, 0, this.props.width, this.props.height)
    }

    this.scene.drawGUI(ctx)
  }
}
