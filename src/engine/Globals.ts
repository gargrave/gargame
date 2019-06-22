import { Game } from './core'
import { Keyboard } from './input'

let _game: Game
let _input: Keyboard

class Globals {
  get game() { return _game } // prettier-ignore
  set game(game) { _game = game } // prettier-ignore
  get input() { return _input } // prettier-ignore
  set input(input) { _input = input } // prettier-ignore
}

const instance = new Globals()
export default instance
