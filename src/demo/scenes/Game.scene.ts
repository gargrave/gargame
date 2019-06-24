import { Label, Scene } from '../../engine'

import { Player } from '../Player'
import { Tile } from '../Tile'

export class GameScene extends Scene {
  public enter() {
    super.enter()

    const player = new Player()
    const tile = new Tile(16, 8)

    this.entities = [player, tile]
    this.guiObjects = [new Label('This is a label!', { x: 10, y: 24 })]

    if (process.env.NODE_ENV === 'development') {
      const w = window as any // eslint-disable-line
      w.player = player
    }
  }
}
