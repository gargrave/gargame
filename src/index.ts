import { Game } from './core'

const canvas = document.getElementsByTagName('canvas')[0]
canvas.style.backgroundColor = 'white'

const game = new Game()

window.game = game
window.go = () => game.start()
window.no = () => game.stop()
