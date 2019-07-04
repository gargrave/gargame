import { Game } from './core/Game'
import { Scene } from './core/Scene'
import { Log } from './utils/Log'

const ENV = process.env.NODE_ENV

let _debug = false
let _game: Game
let _scene: Scene

export class Globals {
  static get debug() { return _debug } // prettier-ignore
  static set debug(debug: boolean) {
    // do not allow debug unless we are in dev mode
    if (ENV !== 'development') {
      _debug = false
    } else {
      if (debug) {
        Log.info('Enabling DEBUG mode for development environment.')
      }

      _debug = debug
    }
  }

  static get game() { return _game } // prettier-ignore
  static set game(game: Game) { _game = game } // prettier-ignore

  static get scene() { return _scene } // prettier-ignore
  static set scene(scene: Scene) { _scene = scene } // prettier-ignore
}
