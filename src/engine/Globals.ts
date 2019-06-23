import { Game } from './core'
import { Keyboard } from './input'

let _game: Game
let _input: Keyboard

class Globals {
  static get game() { return _game } // prettier-ignore
  static set game(game: Game) { _game = game } // prettier-ignore

  static get input() { return _input } // prettier-ignore
  static set input(input: Keyboard) { _input = input } // prettier-ignore
}

export default Globals
