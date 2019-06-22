import { Game, Label } from '../engine'
import Player from './Player'

import assetMap from './assets'

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
canvas.style.backgroundColor = 'white'

const game = new Game(ctx!) // eslint-disable-line

game.load(assetMap).then(() => {
  const player = new Player()
  game.add(player)

  game.addGuiObject(new Label('This is a label!', { x: 100, y: 100 }))

  const w = window as any // eslint-disable-line
  w.game = game
  w.player = player
  w.go = () => game.start()
  w.no = () => game.stop()

  game.start()
})
