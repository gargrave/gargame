import { Game, GameConfig } from '../engine'

import { collisionGroups } from './config/collisionGroups'
import { assetMap } from './assets'
import { GameScene } from './scenes/Game.scene'
import { TitleScene } from './scenes/Title.scene'

const config: GameConfig = {
  collisionGroups,
  debug: false,
  height: 600,
  initialScene: 'game',
  scenes: {
    game: GameScene,
    title: TitleScene,
  },
  width: 960,
}

const game = new Game(config) // eslint-disable-line

game.load(assetMap).then(() => {
  const w = window as any // eslint-disable-line
  w.go = () => game.start()
  w.no = () => game.stop()
  game.start()
})
