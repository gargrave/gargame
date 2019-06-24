import { Globals as gl, Label, Scene } from '../../engine'

export class TitleScene extends Scene {
  public enter() {
    super.enter()
    this.guiObjects = [
      new Label('This is the title scene', { fontSize: 40, x: 250, y: 100 }),
    ]
  }

  public update(dt: number) {
    const i = gl.input // eslint-disable-line
    if (i.wasPressed(32)) {
      gl.game.gotoScene('game')
    }
  }
}
