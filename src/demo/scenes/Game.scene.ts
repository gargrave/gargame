import { Label, Scene } from '../../engine'

import Player from '../Player'

export class GameScene extends Scene {
  public enter() {
    super.enter()

    const player = new Player()

    this.entities = [player]
    this.guiObjects = [new Label('This is a label!', { x: 100, y: 100 })]

    if (process.env.NODE_ENV === 'development') {
      const w = window as any // eslint-disable-line
      w.player = player
    }
  }
}
