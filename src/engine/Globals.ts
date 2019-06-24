import { Game } from './core/Game'
import { Keyboard } from './input/Keyboard'
import { Log } from './utils/Log'

const ENV = process.env.NODE_ENV

let _debug = false
let _game: Game
let _input: Keyboard

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

  static get input() { return _input } // prettier-ignore
  static set input(input: Keyboard) { _input = input } // prettier-ignore
}
