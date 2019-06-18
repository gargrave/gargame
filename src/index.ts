import { Game } from './core'

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
canvas.style.backgroundColor = 'white'

const game = new Game(ctx)

window.game = game
window.go = () => game.start()
window.no = () => game.stop()
