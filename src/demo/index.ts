import { Game } from '../engine'
import Player from './Player'

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
canvas.style.backgroundColor = 'white'

const game = new Game(ctx)
const player = new Player()
game.add(player)

window.game = game
window.player = player
window.go = () => game.start()
window.no = () => game.stop()
