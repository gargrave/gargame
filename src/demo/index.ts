import { Game, GameConfig } from '../engine'

import { collisionGroups } from './config/collisionGroups'
import { assetMap } from './config/assets'
import { GameScene } from './scenes/Game.scene'
import { TitleScene } from './scenes/Title.scene'
import { TileSprites } from './config/TileSprites'

const config: GameConfig = {
  collisionGroups,
  debug: false,
  height: 720,
  initialScene: 'game',
  scenes: {
    game: GameScene,
    title: TitleScene,
  },
  width: 1280,
}

const game = new Game(config) // eslint-disable-line

game.load(assetMap).then(() => {
  const w = window as any // eslint-disable-line
  w.go = () => game.start()
  w.no = () => game.stop()
  TileSprites.init()
  game.start()
})
