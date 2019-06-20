import { Game } from '../engine'
import Player from './Player'

import assetMap from './assets'

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
canvas.style.backgroundColor = 'white'

const game = new Game(ctx)

game.load(assetMap).then(() => {
  const player = new Player()
  game.add(player)

  window.game = game
  window.player = player
  window.go = () => game.start()
  window.no = () => game.stop()
})
