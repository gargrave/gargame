import { Label, Scene } from '../../engine'

import { Player } from '../Player'
import { Star } from '../Star'
import { Tile } from '../Tile'

export class GameScene extends Scene {
  public enter() {
    super.enter()

    const player = new Player()
    this.add(player)

    const star = new Star()
    this.add(star)

    const size = 32
    this.add(new Tile(16 * size, 10 * size, size))
    this.add(new Tile(16 * size, 11 * size, size))

    this.guiObjects = [new Label('This is a label!', { x: 10, y: 24 })]

    if (process.env.NODE_ENV === 'development') {
      const w = window as any // eslint-disable-line
      w.player = player
    }
  }
}
